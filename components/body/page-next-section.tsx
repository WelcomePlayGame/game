import classes from './page-our-story.module.css';
const NextSection = () => {
  return (
    <section
      className={`${classes.next_section_container} flex flex-col items-center  lg:items-end h-[600px] w-[100%] relative mt-[30px] lg:mt-[50px]`}
    >
      <div className={` lg:pr-[5%] lg:pt-[5%]`}>
        <h3
          className={`uppercase text-[3rem]  lg:text-[5rem]  font-bold text-center`}
        >
          game portal
        </h3>
        <div className={`text-center`}>
          <span className={` uppercase  text-[1.8rem]  lg:text-[2rem]  z`}>
            Level Up Your Game: Stay Ahead with Every Play!
          </span>
        </div>
      </div>
    </section>
  );
};
export default NextSection;
