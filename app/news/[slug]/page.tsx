import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findArticleBySlug } from '@/lib/action';
import Image from 'next/image';
import classes from '@/components/games/page-game.module.css';
import Link from 'next/link';
import Head from 'next/head';
import SliderArticle from '@/components/slider_for_article/page-slider-article';
import SvgTag from '@/components/svg_tag_img/page-svg-tag-img';
export const generateMetadata = async ({ params }: any) => {
  const article = await findArticleBySlug(params.slug);
  return {
    title: article?.seo_title ?? '',
    description: article?.seo_content ?? '',
  };
};

const Article = async ({ params }: { params: { slug: string } }) => {
  const article = await findArticleBySlug(params.slug);
  const createMarkup = (html: any) => ({ __html: html });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article?.title ?? '',
    image: `${process.env.URL_AWS}${article?.url_image ?? ''}`,
    datePublished: article?.date ?? '',
    dateModified: article?.date ?? '',
    author: {
      '@type': 'Person',
      name: 'GameForYouOnline',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GameForYouOnline',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    description: article?.seo_content ?? '',
    articleBody: article?.content ?? '',
  };

  return (
    <main>
      <Head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article?.seo_title ?? ''} />
        <meta property="og:description" content={article?.seo_content ?? ''} />
        <meta
          property="og:image"
          content={`${process.env.URL_AWS}${article?.url_image ?? ''}`}
        />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/articles/${params.slug}`}
        />
        <meta property="og:site_name" content="GameForYouOnline" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.seo_title ?? ''} />
        <meta name="twitter:description" content={article?.seo_content ?? ''} />
        <meta
          name="twitter:image"
          content={`${process.env.URL_AWS}${article?.url_image ?? ''}`}
        />
        <meta name="twitter:site" content="@GameForYouOnline" />
      </Head>
      <PageHeader />
      <PageNave />
      <section className={`flex flex-col  mt-[70px]`}>
        <div
          className={`relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]`}
        >
          {article?.url_image && (
            <Image
              src={`${process.env.URL_AWS}${article.url_image}`}
              fill
              alt={article.title ?? ''}
              className={`rounded-[5px]`}
            />
          )}
        </div>
        <div
          className={`border-b w-[300px] lg:w-[700px] block mx-auto pb-[15px]`}
        >
          <h1 className={` font-bold text-center mt-[30px]`}>
            {article?.title}
          </h1>
          <div className="flex justify-center space-x-4 mt-[20px] bg-[orange] p-[5px] w-[23%] rounded">
            <div className={`w-[32px] h-[32px] fill-white`}>
              <SvgTag />
            </div>
            <span>{article?.category.title}</span>
          </div>
        </div>
        <div
          className={`font-normal  pl-[30px] pr-[30px] lg:pt-[70px] lg:pl-[250px] lg:pr-[250px] break-words`}
        >
          <div
            dangerouslySetInnerHTML={createMarkup(article?.content ?? '')}
            className={`${classes.content_img}`}
          />
        </div>
        <div className={`flex flex-col items-center `}>
          {article?.game && (
            <div
              className={`flex flex-col  lg:flex-row lg:justify-center mt-[70px] lg:space-x-[10px] bg-[#000] bg-opacity-50 p-[10px] lg:p-[50px] lg:w-[50%] rounded-[10px]`}
            >
              <div
                className={`w-[300px] h-[150px]  lg:w-[400px] lg:h-[200px] relative`}
              >
                <Image
                  src={`${process.env.URL_AWS}${article.game.url_image}`}
                  fill
                  alt={article.game.title ?? ''}
                  className={`rounded-[20px]`}
                />
              </div>
              <div className={`flex flex-col`}>
                <h4>
                  <Link href={`/games/${article.game.slug}`}>
                    {article.game.title}
                  </Link>
                </h4>
                <span>
                  Platform:{' '}
                  <Link href={`/platforms/${article.game.platform.title}`}>
                    {article.game.platform.title}
                  </Link>
                </span>
                <span>Genre: {article.game.tag.title}</span>
              </div>
              <div className={`border-l-[1px]`}>
                <span className={'p-[30px]'}>Rating</span>
              </div>
            </div>
          )}
        </div>
        <SliderArticle />
      </section>
      <Footer />
    </main>
  );
};

export default Article;
