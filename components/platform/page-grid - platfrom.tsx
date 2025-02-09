import PlatformItem from './page-item-platform';

const PlatformsGrid = ({ platforms }: any) => {
  return (
    <div>
      <div
        className={`flex text-center justify-center mt-[50px] text-[0.8rem]  lg:text-[1.3rem]`}
      >
        <h1>Gaming Platforms Overview</h1>
      </div>
      <section className="flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly">
        {platforms.map((platform: any, index: number) => (
          <div key={index}>
            <PlatformItem {...platform} />
          </div>
        ))}
      </section>
    </div>
  );
};
export default PlatformsGrid;
