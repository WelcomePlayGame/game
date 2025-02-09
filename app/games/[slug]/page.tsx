import { findGameBySlug as get } from '@/lib/action';
import Image from 'next/image';
import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import VideoPlayer from '@/components/video_player/VideoPlayer';
import AddComment from '@/components/comment/page-add-comment';
import ListComment from '@/components/comment/page-list-comment';
import 'react-quill/dist/quill.snow.css';
import classes from '@/components/games/page-game.module.css';
import SliderDeveloper from '@/components/slider-for-developer/page-slider-for-developer';
import {
  AspectRatio,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
} from '@chakra-ui/react';

import Link from 'next/link';
import SliderNewsForGame from '@/components/slider_news_for_game/page-game-slider';
import Head from 'next/head';

export const generateMetadata = async ({ params }: any) => {
  const game = await get(params.slug);
  return {
    title: game?.seo_title,
    description: game?.seo_content,
  };
};

const Game = async ({ params }: { params: { slug: string } }) => {
  const game = await get(params.slug);
  if (!game) {
    return (
      <div>
        <img
          src={`/animation.gif`}
          alt="animation"
          style={{ display: 'block', margin: 'auto' }}
        />
      </div>
    );
  }
  const createMarkup = (html: any) => ({ __html: html });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game?.title ?? '',
    image: `${process.env.URL_AWS}${game?.url_image ?? ''}`,
    description: game?.seo_content ?? '',
    author: {
      '@type': 'Organization',
      name: 'GameForYouOnline',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GameForYouOnline',
    },
    datePublished: new Date(),
    genre: game?.tag?.title ?? '',
    platform: game?.platform?.title ?? '',
    video: {
      '@type': 'VideoObject',
      name: `Gameplay of ${game?.title}`,
      thumbnailUrl: `${process.env.URL_AWS}${game?.url_image ?? ''}`,
      uploadDate: new Date(),
      contentUrl: game?.video_url ?? '',
      description: `Gameplay video of ${game?.title}`,
    },
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
        <meta property="og:type" content="video.game" />
        <meta property="og:title" content={game?.seo_title ?? ''} />
        <meta property="og:description" content={game?.seo_content ?? ''} />
        <meta
          property="og:image"
          content={`${process.env.URL_AWS}${game?.url_image ?? ''}`}
        />
        <meta
          property="og:url"
          content={`${process.env.URL_AWS}/games/${params.slug}`}
        />
        <meta property="og:site_name" content="GameForYouOnline" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={game?.seo_title ?? ''} />
        <meta name="twitter:description" content={game?.seo_content ?? ''} />
        <meta
          name="twitter:image"
          content={`${process.env.URL_AWS}${game?.url_image ?? ''}`}
        />
        <meta name="twitter:site" content="@GameForYouOnline" />
      </Head>
      <PageHeader />
      <PageNave />
      <section className="flex flex-col">
        <div className="block mx-auto w-[300px] md:w-[600px] lg:w-[900px] mt-[60px]">
          <div className="relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]">
            <Image
              src={`${process.env.URL_AWS}${game?.url_image}`}
              fill
              alt={game!.title}
              className="rounded-[5px]"
            />
          </div>
          <div>
            <h1 className="text-center mt-[20px]">{game?.title}</h1>
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20 mt-[25px] p-[20px] bg-[#000] bg-opacity-55 rounded">
            <div>
              <Link href={`/developers/${game.developer.title}`}>
                {game.developer.title}
              </Link>
            </div>
            <div>
              <Link href={`/platforms/${game.platform.title}`}>
                {game.platform.title}
              </Link>
            </div>
            <div>{game.tag.title}</div>
          </div>
          <div>
            <Tabs>
              <TabList className="flex justify-between mt-[30px] mb-[30px]">
                <Tab className="uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem]">
                  Describe
                </Tab>
                <Tab className="uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem]">
                  <p className="tracking-[2px]">News of {game?.title}</p>
                </Tab>
                <Tab className="uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem]">
                  Video
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel className="min-h-[500px] italic">
                  <section
                    dangerouslySetInnerHTML={createMarkup(game?.content)}
                    className={classes.content_img}
                  />
                </TabPanel>
                <TabPanel className="min-h-[500px]">
                  <SliderNewsForGame news={game.articles} />
                </TabPanel>
                <TabPanel>
                  <AspectRatio ratio={16 / 9}>
                    <VideoPlayer url={game?.video_url} />
                  </AspectRatio>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        <SliderDeveloper />
        <div className="flex justify-center">
          <AddComment slug={params.slug} />
          <ListComment />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Game;
