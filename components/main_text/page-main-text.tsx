import classes from '@/components/games/page-game.module.css';
const MainText = () => {
  return (
    <section
      className={`${classes.content_img} flex flex-col items-center p-[50px]`}
    >
      <div className={`w-[100%] lg:w-[900px] text-[1.1rem]`}>
        <h2 className={`text-center text-[1.5rem] mb-[30px]`}>
          Welcome to GAMEFORYOU - Your Ultimate Gaming Hub!
        </h2>
        <p>
          Dive into the thrilling world of gaming with GAMEFORYOU, where passion
          meets the latest in gaming news, reviews, and updates. Whether
          you&rsquore a casual player or a hardcore enthusiast, we&rsquo;ve got
          everything you need to stay ahead in the gaming universe.
        </p>
        <u>Stay Informed</u>
        <p>
          Get the freshest news straight from the gaming industry. From major
          releases to indie gems, we cover it all. Be the first to know about
          game launches, updates, and groundbreaking developments.
        </p>
        <u>In-Depth Reviews</u>
        <p>
          Our expert team delivers comprehensive reviews to help you make
          informed choices. Discover the best titles, explore detailed
          critiques, and find out what makes each game unique.
        </p>
        <u>Connect with the Community</u>
        <p>
          Join a vibrant community of gamers. Share your experiences, engage in
          lively discussions, and connect with like-minded individuals who share
          your passion for gaming.
        </p>
        <u>Exclusive Previews and Trailers</u>
        <p>
          Get a sneak peek at upcoming games with exclusive previews and
          trailers. See what’s on the horizon and get hyped for the next big
          thing in gaming.
        </p>
        <u>Tips, Tricks, and Guides</u>
        <p>
          Master your favorite games with our tips, tricks, and in-depth guides.
          Whether you&rsquore looking to improve your skills or just starting,
          we&rsquove got you covered.
        </p>
        <u>Why Choose GAMEFORYOU?</u>
        <ul className={`list-disc`}>
          <li>Up-to-Date News: Never miss out on important updates.</li>
          <li>Expert Reviews: Reliable and insightful game reviews.</li>
          <li>Engaging Community: Connect and share with other gamers.</li>
          <li>
            Exclusive Content: Get access to previews and trailers before anyone
            else.
          </li>
          <li>
            Comprehensive Guides: Enhance your gameplay with our detailed
            guides.
          </li>
        </ul>
        <p className={``}>
          Explore GAMEFORYOU today and elevate your gaming experience. Your
          adventure starts here!
        </p>
      </div>
    </section>
  );
};
export default MainText;
