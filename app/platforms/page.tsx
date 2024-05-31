import PlatformsGrid from '@/components/platform/page-grid - platfrom';
import { getAllPlatform } from '@/lib/action';
import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
export const generateMetadata = async () => {
  return {
    title:
      'Top Gaming Platforms 2024: Reviews and Rankings of Consoles and PCs',
    description:
      'Looking for the perfect gaming platform? Check out our ranking of the best gaming platforms of 2024. Detailed reviews of consoles and PCs will help you choose the right device for the ultimate gaming experience.',
  };
};
const PlatformFetch = async () => {
  const platforms = await getAllPlatform();

  return <PlatformsGrid platforms={platforms} />;
};
const Platforms = () => {
  return (
    <main>
      <PageHeader />
      <PageNave />
      <PlatformFetch />
      <Footer />
    </main>
  );
};
export default Platforms;
