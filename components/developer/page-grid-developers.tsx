import DevelopersItem from './page-item-developers';

const DevelopersGrid = ({ developers }: any) => {
  return (
    <main
      className={`flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly`}
    >
      {developers.map((developer: any, index: number) => (
        <DevelopersItem key={index} {...developer} />
      ))}
    </main>
  );
};
export default DevelopersGrid;
