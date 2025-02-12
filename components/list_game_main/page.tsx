import { getAllGames as get } from '@/lib/action';
import GamesGridList from './page_games_grid_list';

const GamesFetch = async () => {
  const games = (await get()).slice(0, 6);
  return <GamesGridList games={games} />;
};
const ListGame = async () => {
  return (
    <section>
      <GamesFetch />
    </section>
  );
};
export default ListGame;
