import GamesGrid from '@/components/games/page-games-grid';
import { getAllGames as get } from '@/lib/action';
import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
export const generateMetadata = async () => {
  return {
    title: 'Discover Top Games | Browse New Releases and Popular Titles',
    description:
      'Explore our comprehensive collection of top games, including the latest releases and all-time favorites. Find detailed game descriptions, reviews, and ratings. Start your gaming adventure with our expertly curated selection.',
  };
};
const GamesFetch = async () => {
  const games = await get();
  return <GamesGrid games={games} />;
};
const Games = () => {
  return (
    <main>
      <PageHeader />
      <PageNave />
      <GamesFetch />
      <Footer />
    </main>
  );
};
export default Games;
