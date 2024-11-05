import classes from './page-follow.module.css';
const Follow = () => {
  return (
    <section className={`flex flex-col  items-center mt-[50px]`}>
      <span className={`uppercase text-[1rem] lg:text-[1.5rem]`}>
        follow us
      </span>
      <h5
        className={`${classes.follow_h5} uppercase text-[2.5rem] lg:text-[5rem]`}
      >
        @ gameforyou
      </h5>
    </section>
  );
};
export default Follow;
