import PageHeader from '@/components/head/page-header';
import PageNave from '../components/head/page-nav-header';
import PageStage from '@/components/head/page-stage';
import OurStory from '@/components/body/pages-our-story';
import Footer from '@/components/footer/page-footer';
import NextSection from '@/components/body/page-next-section';
import Follow from '@/components/follow/page-follow';
export default function Home() {
  return (
    <main>
      <PageHeader />
      <PageNave />
      <PageStage />
      <OurStory />
      <NextSection />
      <Follow />
      <Footer />
    </main>
  );
}
