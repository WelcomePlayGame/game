import RSS from 'rss';
import { findAllArticle } from '@/lib/action';

const MAX_POSTS = 100;

export async function GET() {
  const { articles } = await findAllArticle(1, MAX_POSTS);

  const feed = new RSS({
    title: `Unlock Your Next Adventure: Game Portal to Infinite Possibilities!`,
    description:
      'Where Every Click Leads to Adventure - Dive into Your Next Great Game!. GameForOnline',
    site_url: process.env.BASE_URL,
    feed_url: `${process.env.BASE_URL}/feed.xml`,
    copyright: `${new Date().getFullYear()} GameForYou`,
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  articles
    .reverse()
    .slice(0, MAX_POSTS)
    .map((article) => {
      feed.item({
        title: article.title,
        guid: `${process.env.BASE_URL}/news/${article.slug}`,
        url: `${process.env.BASE_URL}/news/${article.slug}`,
        date: article.date,
        description: article.description,
        author: 'GameForYou',
        categories: [article.category],
        enclosure: {
          url: `${process.env.URL_AWS}${article.url_image}`,
          type: 'image/*',
          length: '51200',
        },
      });
    });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
