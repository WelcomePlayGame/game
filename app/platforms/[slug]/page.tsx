import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findPlatformBySlug } from '@/lib/action';
import Image from 'next/image';
import classes from '@/components/games/page-game.module.css';
import Head from 'next/head';

export const generateMetadata = async ({ params }: any) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const platform = await findPlatformBySlug(decodedSlug);

  return {
    title: platform?.seo_title,
    description: platform?.seo_content,
  };
};

const Platform = async ({ params }: { params: { slug: string } }) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const platform = await findPlatformBySlug(decodedSlug);

  const createMarkup = (html: any) => ({ __html: html });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: platform?.title ?? '',
    image: `${process.env.URL_AWS}${platform?.url_image ?? ''}`,
    description: platform?.seo_content ?? '',
    url: `https://gameforyou.online/platforms/${params.slug}`,
  };

  return (
    <section>
      <Head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={platform?.seo_title ?? ''} />
        <meta property="og:description" content={platform?.seo_content ?? ''} />
        <meta
          property="og:image"
          content={`${process.env.URL_AWS}${platform?.url_image ?? ''}`}
        />
        <meta
          property="og:url"
          content={`https://gameforyou.online/platforms/${params.slug}`}
        />
        <meta property="og:site_name" content="GameForYouOnline" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={platform?.seo_title ?? ''} />
        <meta
          name="twitter:description"
          content={platform?.seo_content ?? ''}
        />
        <meta
          name="twitter:image"
          content={`${process.env.URL_AWS}${platform?.url_image ?? ''}`}
        />
        <meta name="twitter:site" content="@GameForYouOnline" />
      </Head>
      <PageHeader />
      <PageNave />
      <section className="flex flex-col mt-[70px]">
        <div className="relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]">
          {platform?.url_image && (
            <Image
              src={`${process.env.URL_AWS}${platform?.url_image}`}
              fill
              alt={platform.title}
              className="rounded-[5px]"
            />
          )}
        </div>
        <div className="border-b w-[300px] lg:w-[700px] block mx-auto pb-[15px]">
          <h1 className="font-bold text-center mt-[30px]">{platform?.title}</h1>
        </div>
        <div className="font-normal pl-[30px] pr-[30px] lg:pt-[70px] lg:pl-[250px] lg:pr-[250px]">
          <section
            dangerouslySetInnerHTML={createMarkup(platform?.content)}
            className={classes.content_img}
          />
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Platform;
