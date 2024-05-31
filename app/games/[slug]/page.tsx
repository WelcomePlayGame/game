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
import {
  AspectRatio,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
} from '@chakra-ui/react';
import PageGrid from '@/components/news_slug/page-grid-news';
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
    return <div>Loading...</div>;
  }
  const createMarkup = (html: any) => ({ __html: html });
  return (
    <main>
      <PageHeader />
      <PageNave />
      <section
        className={`block mx-auto w-[300px] md:w-[600px]  lg:w-[900px] mt-[60px]`}
      >
        <div
          className={`relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]`}
        >
          <Image
            src={`${process.env.URL_AWS}${game?.url_image}`}
            fill
            alt={game!.title}
            className={`rounded-[5px]`}
          />
        </div>
        <div>
          <h1 className={`text-center mt-[20px]`}>{game?.title}</h1>
        </div>
        <div>
          <Tabs>
            <TabList className={`flex justify-between mt-[30px] mb-[30px]`}>
              <Tab
                className={`uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem]`}
              >
                describe
              </Tab>
              <Tab
                className={`uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem]  lg:text-[1.1rem]`}
              >
                <p className={`tracking-[2px]`}>news of {game?.title}</p>
              </Tab>
              <Tab
                className={`uppercase border-b-[1px] text-[0.6rem] md:text-[0.9rem]  lg:text-[1.1rem]`}
              >
                Video
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel className={` min-h-[500px] italic`}>
                <div
                  dangerouslySetInnerHTML={createMarkup(game?.content)}
                  className={`${classes.content_img}`}
                />
              </TabPanel>
              <TabPanel className={`min-h-[500px]`}>
                <PageGrid articles={game.articles} />
              </TabPanel>
              <TabPanel>
                <AspectRatio ratio={16 / 9}>
                  <VideoPlayer url={game?.video_url} />
                </AspectRatio>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <AddComment slug={params.slug} />
        <ListComment />
      </section>
      <Footer />
    </main>
  );
};
export default Game;
