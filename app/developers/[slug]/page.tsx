import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findDeveloperBySlug } from '@/lib/action';
import Image from 'next/image';
import classes from '@/components/games/page-game.module.css';
import SliderGame from '@/components/slider_for_game/page-game-slider';
export const generateMetadata = async ({ params }: any) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const developer = await findDeveloperBySlug(decodedSlug);

  return {
    title: developer?.seo_title,
    description: developer?.seo_content,
  };
};
const Developer = async ({ params }: { params: { slug: string } }) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const developer = await findDeveloperBySlug(decodedSlug);

  const createMarkup = (html: any) => ({ __html: html });
  return (
    <>
      <PageHeader />
      <PageNave />
      <section className={`flex flex-col  mt-[70px]`}>
        <div
          className={`relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]`}
        >
          {developer?.url_image && (
            <Image
              src={`${process.env.URL_AWS}${developer?.url_image}`}
              fill
              alt={developer.title}
              className={`rounded-[5px]`}
            />
          )}
        </div>
        <div
          className={`border-b w-[300px] lg:w-[700px] block mx-auto pb-[15px]`}
        >
          <h1 className={` font-bold text-center mt-[30px]`}>
            {developer?.title}
          </h1>
        </div>
        <div
          className={`font-normal  pl-[30px] pr-[30px] lg:pt-[70px] lg:pl-[250px] lg:pr-[250px]`}
        >
          <article
            dangerouslySetInnerHTML={createMarkup(developer?.content)}
            className={`${classes.content_img}`}
          />
        </div>
      </section>
      <SliderGame />
      <Footer />
    </>
  );
};

export default Developer;
