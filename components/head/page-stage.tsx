import classes from './page-header.module.css';
const PageStage = () => {
  return (
    <section
      className={`${classes.stage_container} flex flex-col items-center mt-[30px] h-[200px] lg:mt-[70px] lg:h-[600px] w-[100%]`}
    >
      <div>
        <h2
          className={`${classes.h2_container} uppercase text-[1.7rem] lg:text-[5rem] text-center pt-[50px] font-bold`}
        >
          Game Portal
        </h2>
      </div>
      <div className={`lg:pt-[20px]`}>
        <h1
          className={`${classes.h2_subheader_container} text-[1.2rem] p-[20px]  lg:text-[2.1rem] text-center `}
        >
          Unlock Your Next Adventure: Game Portal to Infinite Possibilities!
        </h1>
      </div>
    </section>
  );
};
export default PageStage;
