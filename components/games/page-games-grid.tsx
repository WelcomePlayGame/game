import GamesItems from './page-games-items';
const GamesGrid = ({ games }: any) => {
  return (
    <div>
      <div
        className={`flex text-center justify-center mt-[50px] text-[0.8rem]  lg:text-[1.3rem]`}
      >
        <h1>Top Games to Play Now</h1>
      </div>
      <main className="flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly">
        {games.map((article: any, index: number) => (
          <div key={index}>
            <GamesItems {...article} />
          </div>
        ))}
      </main>
    </div>
  );
};
export default GamesGrid;
