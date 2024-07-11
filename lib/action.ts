'use server';
import slugify from 'slugify';
import { getClient } from './client';
import xss from 'xss';
import { S3, S3ClientConfig } from '@aws-sdk/client-s3';
import { hashPassword } from './auth';
import { get } from 'http';
import { revalidatePath } from 'next/cache';
import { sendPing } from './server_ping';
const PING_SERVERS = [
  {
    url: 'http://pingomatic.com/ping/',
    method: 'POST',
    params: {
      title: 'MySite',
      blogurl: 'https://example.com',
      rssurl: 'https://example.com/rss',
    },
  },
  {
    url: 'http://rpc.pingomatic.com/',
    method: 'GET',
  },
  // Добавьте другие ping-серверы по необходимости
];
const s3 = new S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as S3ClientConfig);

export const addArticle = async (formData: FormData) => {
  const title = formData.get('title');
  const seo_title = formData.get('seo_title');
  const content = formData.get('content');
  const category_id = Number(formData.get('category_id'));
  const game_id = formData.get('game_id');
  const seo_content = formData.get('seo_content');
  const image = formData.get('image') as File;

  if (
    typeof title !== 'string' ||
    typeof seo_title !== 'string' ||
    typeof seo_content !== 'string' ||
    typeof content !== 'string'
  ) {
    throw new Error('All text fields are required and must be strings');
  }
  if (!(image instanceof File)) {
    throw new Error('Image must be an uploaded file');
  }

  const extension = image.name.split('.').pop();
  const slug = slugify(title, { lower: true }).replace(/[:.?!"+\s]+/g, '');
  const fileName = `${slug}.${extension}`;
  const bufferImage = await image.arrayBuffer();

  try {
    const client = await getClient();
    await s3.putObject({
      Bucket: 'games-for-you-img',
      Key: fileName,
      Body: Buffer.from(bufferImage),
      ContentType: image.type,
    });

    const category = await client.category.findUnique({
      where: {
        id: category_id,
      },
    });

    if (!category) {
      throw new Error(`Category with id ${category_id} not found`);
    }

    const articleData: any = {
      title,
      content,
      seo_title,
      seo_content,
      url_image: fileName,
      slug,
      category: {
        connect: {
          id: category_id,
        },
      },
    };

    if (game_id) {
      const gameIdNumber = Number(game_id);
      const game = await client.games.findUnique({
        where: {
          id: gameIdNumber,
        },
      });

      if (game) {
        articleData.game = {
          connect: {
            id: gameIdNumber,
          },
        };
      } else {
        throw new Error(`Game with id ${gameIdNumber} not found`);
      }
    }

    const article = await client.article.create({
      data: articleData,
    });
    await sendPing(PING_SERVERS);
    revalidatePath('/', 'layout');
    // return article;
  } catch (error) {
    throw error;
  }
};

export const findArticleBySlug = async (slug: string) => {
  try {
    const client = await getClient();
    const article = await client.article.findFirst({
      where: {
        slug: slug,
      },
      include: {
        game: {
          include: {
            platform: true,
            tag: true,
          },
        },
      },
    });
    return article;
  } catch (error) {
    throw error;
  }
};
export const deleteArticleBySlug = async (slug: string, url: string) => {
  let client;
  try {
    client = await getClient();
    await client.article.delete({
      where: {
        slug: slug,
      },
    });
    await s3.deleteObject({
      Bucket: 'games-for-you-img',
      Key: url,
    });
  } catch (error) {
    console.error(`Error deleting article with slug ${slug}:`, error);
    throw new Error(`Failed to delete article with slug ${slug}`);
  } finally {
    if (client) {
      await client.$disconnect();
    }
  }
};
// export const findAllArticle = async () => {
//   try {
//     const client = await getClient();
//     const articles = await client.article.findMany({
//       include: {
//         category: true,
//       },
//     });

//     return articles.map((article: any) => ({
//       ...article,
//       category_title: article.category?.title,
//     }));
//   } catch (error) {
//     throw error;
//   }
// };
export const findAllArticle = async (page: number, pageSize: number) => {
  try {
    const client = await getClient();
    const articles = await client.article.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const totalArticles = await client.article.count();

    return {
      articles: articles.map((article: any) => ({
        ...article,
        category_title: article.category?.title,
      })),
      totalArticles,
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      totalArticles: 0,
    };
  }
};

export const updateArticle = async (oldslug: string, formData: FormData) => {
  const title = formData.get('title') as string;
  const seo_title = formData.get('seo_title') as string;
  const content = formData.get('content') as string;
  const seo_content = formData.get('seo_content') as string;
  const category_id = Number(formData.get('category_id'));
  const game_id = Number(formData.get('game_id'));
  const image = formData.get('image') as File;

  try {
    const extension = image.name.split('.').pop();
    const slug = slugify(title, { lower: true }).replace(/[:.?!"+\s]+/g, '');
    const fileName = `${slug}.${extension}`;
    const bufferImage = await image.arrayBuffer();
    const client = await getClient();
    await s3.putObject({
      Bucket: 'games-for-you-img',
      Key: fileName,
      Body: Buffer.from(bufferImage),
      ContentType: image.type,
    });
    await client.article.update({
      where: { slug: oldslug },
      data: {
        title: title,
        seo_title: seo_title,
        content: content,
        seo_content: seo_content,
        category: {
          connect: {
            id: category_id,
          },
        },
        game: game_id
          ? {
              connect: {
                id: Number(game_id),
              },
            }
          : undefined,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//section method for Category
export const saveCategory = async (formData: FormData) => {
  const title = formData.get('title');
  if (typeof title !== 'string') {
    throw new Error('Title is required and must be a string');
  }
  try {
    const client = await getClient();
    const category = client.category.create({
      data: {
        title: title.trim(),
      },
    });
    return category;
  } catch (error) {
    throw error;
  }
};
export const getAllCategory = async () => {
  try {
    const client = await getClient();
    const categories = client.category.findMany();
    return categories;
  } catch (error) {
    throw error;
  }
};

//Method for Developer
export const getAllDeveloper = async () => {
  try {
    const client = await getClient();
    const developers = client.developer.findMany();
    return developers;
  } catch (error) {
    throw error;
  }
};
export const findDeveloperBySlug = async (slug: string) => {
  try {
    const client = await getClient();
    const developer = await client.developer.findFirst({
      where: {
        title: slug,
      },
    });
    return developer;
  } catch (error) {
    throw error;
  }
};

export const addDeveloper = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const seo_title = formData.get('seo_title') as string;
  const seo_content = formData.get('seo_content') as string;
  const image = formData.get('image') as File;

  if (!(image instanceof File)) {
    throw new Error('Image must be an uploaded file');
  }

  const extension = image.name.split('.').pop();
  const slug = slugify(title, { lower: true }).replace(/[:.?!"+\s]+/g, '');
  if (typeof slug !== 'string') {
    throw new Error('Slug should be string');
  }
  const fileName = `${slug}.${extension}`;
  const bufferImage = await image.arrayBuffer();
  try {
    const client = await getClient();
    await s3.putObject({
      Bucket: 'games-for-you-img',
      Key: fileName,
      Body: Buffer.from(bufferImage),
      ContentType: image.type,
    });
    const developer = client.developer.create({
      data: {
        title: title.trim(),
        content: content,
        seo_title: seo_title,
        seo_content: seo_content,
        slug: slug,
        url_image: fileName,
      },
    });
    return developer;
  } catch (error) {
    throw error;
  }
};
//Method for Platform
export const getAllPlatform = async () => {
  try {
    const client = await getClient();
    const platforms = client.platform.findMany();
    return platforms;
  } catch (error) {
    throw error;
  }
};
export const findPlatformBySlug = async (slug: string) => {
  try {
    const client = await getClient();
    const platform = await client.platform.findFirst({
      where: {
        title: slug,
      },
    });
    return platform;
  } catch (error) {
    throw error;
  }
};

export const savePlatform = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const seo_title = formData.get('seo_title') as string;
  const seo_content = formData.get('seo_content') as string;
  const image = formData.get('image') as File;

  if (!(image instanceof File)) {
    throw new Error('Image must be an uploaded file');
  }
  const extension = image.name.split('.').pop();
  const slug = slugify(title, { lower: true }).replace(/[:.?!"+\s]+/g, '');
  const fileName = `${slug}.${extension}`;
  const bufferImage = await image.arrayBuffer();
  try {
    const client = await getClient();
    await s3.putObject({
      Bucket: 'games-for-you-img',
      Key: fileName,
      Body: Buffer.from(bufferImage),
      ContentType: image.type,
    });
    const platform = client.platform.create({
      data: {
        title: title,
        content: content,
        seo_title: seo_title,
        seo_content: seo_content,
        url_image: fileName,
      },
    });
    return platform;
  } catch (error) {
    throw error;
  }
};

// Method for Tag
export const getAllTag = async () => {
  try {
    const client = await getClient();
    const tags = client.tag.findMany();
    return tags;
  } catch (error) {
    throw error;
  }
};

export const saveTag = async (formData: FormData) => {
  const title = formData.get('title');
  if (typeof title !== 'string') {
    throw new Error('All fields will be string');
  }
  try {
    const client = await getClient();
    const tag = client.tag.create({
      data: {
        title: title,
      },
    });
    return tag;
  } catch (error) {
    throw error;
  }
};
//Method for Games
export const getAllGames = async () => {
  try {
    const client = await getClient();
    const games = client.games.findMany();
    return games;
  } catch (error) {
    throw error;
  }
};
export const saveGame = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const seo_title = formData.get('seo_title') as string;
  const seo_content = formData.get('seo_content') as string;
  const image = formData.get('image') as File;
  const video_url = formData.get('video_url') as string;
  const developerId = Number(formData.get('developerId'));
  const platformId = Number(formData.get('platformId'));
  const tagId = Number(formData.get('tagId'));
  const additionalImages = JSON.parse(formData.get('images') as string);

  if (!(image instanceof File)) {
    throw new Error('Image must be an uploaded file');
  }
  const extension = image.name.split('.').pop();
  const slug = slugify(title, { lower: true }).replace(/[:.?!"+\s]+/g, '');
  const fileName = `${slug}.${extension}`;
  const bufferImage = await image.arrayBuffer();
  await s3.putObject({
    Bucket: 'games-for-you-img',
    Key: fileName,
    Body: Buffer.from(bufferImage),
    ContentType: image.type,
  });

  try {
    const client = await getClient();
    const game = await client.games.create({
      data: {
        title,
        content,
        seo_title,
        seo_content,
        url_image: fileName,
        slug,
        video_url,
        developer: {
          connect: {
            id: developerId,
          },
        },
        platform: {
          connect: {
            id: platformId,
          },
        },
        tag: {
          connect: {
            id: tagId,
          },
        },
      },
    });
    revalidatePath('/', 'layout');
    // return game;
  } catch (error) {
    throw error;
  }
};

export const findGameBySlug = async (slug: string) => {
  try {
    const client = await getClient();
    const game = await client.games.findUnique({
      where: {
        slug: slug,
      },
      include: {
        articles: true,
        developer: true,
        platform: true,
        tag: true,
      },
    });
    return game;
  } catch (error) {
    throw error;
  }
};

//Method for Users
export const userByEmail = async (email: string) => {
  try {
    const client = await getClient();
    const user = await client.users.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const addUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await hashPassword(password);
    const client = await getClient();
    const user = await client.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: 'guest',
        image: '',
      },
    });
    return {
      id: user.id,
      name: user.name,
    };
  } catch (error) {
    return error;
  }
};
//Method for Comments
export const addComment = async (
  slug: string,
  name: string,
  content: string,
  email: string
) => {
  try {
    const client = await getClient();
    const comment = await client.comments.create({
      data: {
        name: name,
        content: content,
        available: false,
        userEmail: email,
        gameSlug: slug,
      },
    });
    return { id: comment.id, content: comment.content };
  } catch (error) {
    throw error;
  }
};
export const getAllComment = async () => {
  try {
    const client = await getClient();
    const comments = client.comments.findMany();
    return comments;
  } catch (error) {
    throw error;
  }
};

//Method for Video Stream
export const addVideo = async (title: string, url: string) => {
  try {
    const client = await getClient();
    await client.video.create({
      data: {
        title,
        url,
      },
    });
    return { message: 'Added video' };
  } catch (error) {
    throw error;
  }
};
export const getVideos = async () => {
  try {
    const client = await getClient();
    const videos = await client.video.findMany();
    return videos;
  } catch (error) {
    throw error;
  }
};
