import PageHeader from '@/components/head/page-header';
import PageNave from '../components/head/page-nav-header';
import PageStage from '@/components/head/page-stage';
import OurStory from '@/components/body/pages-our-story';
import Footer from '@/components/footer/page-footer';
import NextSection from '@/components/body/page-next-section';
import Follow from '@/components/follow/page-follow';
import SliderArticle from '@/components/slider_for_article/page-slider-article';
import MainText from '@/components/main_text/page-main-text';

export default function Home() {
  return (
    <section className={``}>
      <PageHeader />
      <PageNave />
      <PageStage />
      <MainText />
      <OurStory />
      <SliderArticle />
      <NextSection />
      <Follow />
      <Footer />
    </section>
  );
}
