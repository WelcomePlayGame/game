const Footer = () => {
  return (
    <main
      className={`flex flex-col  lg:flex-row lg:justify-around border-t-[1px] border-solid border-[#fff] mt-[50px] p-[50px]`}
    >
      <div className={``}>
        <span
          className={`text-center uppercase text-[1.8rem] text-[var(--global-accent-color)] font-rubik`}
        >
          our social
        </span>
        <div
          className={`flex flex-col items-start lg:flex-row lg:justify-between uppercase text-[1.1rem] lg:space-x-3`}
        >
          <span>instargam</span>
          <span>facebook</span>
          <span>telegram</span>
          <span>youtube</span>
        </div>
      </div>
      <div></div>
      <div></div>
    </main>
  );
};
export default Footer;
