import GamesItems from './page-games-items';
const GamesGrid = ({ games }: any) => {
  return (
    <main className={`flex justify-evenly flex-wrap mt-[50px]`}>
      {games.map((game: any, index: number) => (
        <div key={index}>
          <GamesItems {...game} />
        </div>
      ))}
    </main>
  );
};
export default GamesGrid;
