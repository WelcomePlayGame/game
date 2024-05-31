import GamesGrid from '@/components/games/page-games-grid';
import { getAllGames as get } from '@/lib/action';
import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
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
