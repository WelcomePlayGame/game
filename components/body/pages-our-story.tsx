import Link from 'next/link';
import classes from './page-our-story.module.css';
import Image from 'next/image';
const OurStory = () => {
  return (
    <main
      className={`${classes.our_container} flex flex-col items-center lg:flex lg:flex-row lg:justify-center mt-[50px] lg:space-x-[10rem]`}
    >
      <div className={`${classes.our_story_left} flex flex-col`}>
        <div
          className={`w-[300px] h-[200px] lg:w-[400px] lg:h-[200px] relative`}
        >
          <Image src={'/images/image/1.webp'} fill alt="our story game one" />
        </div>
        <div className={` lg:mt-[30px] lg:ml-[280px]`}>
          <span className={` uppercase text-[1.3rem] text-[#6ec1e4] `}>
            our story
          </span>
        </div>
      </div>
      <div className={`${classes.our_story_right}`}>
        <div className={`mb-[30px] text-[1.3rem] break-words`}>
          <h2
            className={`text-[1.3rem] break-words w-[300px] lg:w-[600px] text-center`}
          >
            Where Every Click Leads to Adventure - Dive into Your Next Great
            Game!
          </h2>
        </div>
        <div
          className={`w-[300px] h-[150px] lg:w-[600px] lg:h-[300px] relative`}
        >
          <Image src={'/images/image/2.webp'} fill alt="our story game two" />
        </div>
      </div>
    </main>
  );
};
export default OurStory;
