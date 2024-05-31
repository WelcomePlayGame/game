import PlatformItem from './page-item-platform';

const PlatformsGrid = ({ platforms }: any) => {
  return (
    <main
      className={`flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly`}
    >
      {platforms.map((platform: any, index: number) => (
        <PlatformItem key={index} {...platform} />
      ))}
    </main>
  );
};
export default PlatformsGrid;
