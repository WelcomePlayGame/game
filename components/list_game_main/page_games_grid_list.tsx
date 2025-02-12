import GamesItemsList from './page_games_items_list';
import classes from './page_list_game.module.css';
const GamesGridList = ({ games }: any) => {
  return (
    <div>
      <div
        className={`flex text-center justify-center mt-[50px] text-[0.8rem]  lg:text-[1.3rem]`}
      >
        <h2>Favorite Games</h2>
      </div>
      <section
        className={`${classes.container_list} flex flex-col flex-wrap mt-[30px] lg:mt-[40px] lg:flex-row lg:justify-evenly`}
      >
        {games.map((game: any, index: number) => (
          <div key={index}>
            <GamesItemsList {...game} />
          </div>
        ))}
      </section>
    </div>
  );
};
export default GamesGridList;
