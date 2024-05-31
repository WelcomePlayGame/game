import {
  getAllPlatform,
  findAllArticle as getArticle,
  getAllDeveloper,
} from '@/lib/action';
import { getAllGames as getGames } from '@/lib/action';
export default async function sitemap() {
  // Сделать функцию асинхронной
  const { articles } = await getArticle(1, 5000);
  const games = await getGames();
  const platforms = await getAllPlatform();
  const developers = await getAllDeveloper();
  const mappedArticles = articles.map((article) => ({
    url: `${process.env.BASE_URL}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }));

  const mappedGames = games.map((game) => ({
    url: `${process.env.BASE_URL}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }));
  const mappedPlatfroms = platforms.map((platform) => ({
    url: `${process.env.BASE_URL}/platforms/${platform.title}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }));
  const mappedDevelopers = developers.map((developer) => ({
    url: `${process.env.BASE_URL}/developers/${developer.title}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }));

  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/platforms`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/developers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${process.env.BASE_URL}/feed`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },

    ...mappedArticles,
    ...mappedGames,
    ...mappedPlatfroms,
    ...mappedDevelopers,
  ];
}
