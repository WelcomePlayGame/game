import DevelopersItem from './page-item-developers';

const DevelopersGrid = ({ developers }: any) => {
  return (
    <div>
      <div
        className={`flex text-center justify-center mt-[50px] text-[0.8rem]  lg:text-[1.3rem]`}
      >
        <h1>Game Developers Hub</h1>
      </div>
      <main className="flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly">
        {developers.map((article: any, index: number) => (
          <div key={index}>
            <DevelopersItem {...article} />
          </div>
        ))}
      </main>
    </div>
  );
};
export default DevelopersGrid;
