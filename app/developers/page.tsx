import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import DevelopersGrid from '@/components/developer/page-grid-developers';
import { getAllDeveloper } from '@/lib/action';
export const generateMetadata = async () => {
  return {
    title:
      'Top Game Developers - Comprehensive List of Leading Game Development Studios',
    description:
      'Discover the ultimate list of top game developers. Explore profiles of leading game development studios, their most popular games, and insights into their creative processes. Stay updated with the best in the industry.',
  };
};
const DevelopersFetch = async () => {
  const developers = await getAllDeveloper();
  return <DevelopersGrid developers={developers} />;
};
const Developers = () => {
  return (
    <main>
      <PageHeader />
      <PageNave />
      <DevelopersFetch />
      <Footer />
    </main>
  );
};
export default Developers;
