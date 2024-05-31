import Image from 'next/image';
import Link from 'next/link';

const GamesItems = ({ id, title, slug, url_image }: any) => {
  return (
    <main className={`flex flex-col items-center`}>
      <div
        className={`relative w-[300px] h-[200px] lg:w-[600px] lg:h-[300px] object-contain`}
      >
        <Image src={`${process.env.URL_AWS}${url_image}`} fill alt={title} />
      </div>
      <h2 className={`mt-[15px] border-b-2`}>{title}</h2>
      <span
        className={`mt-[20px] mb-[20px] bg-[#6ec1e4] w-[150px] h-[30px] rounded flex flex-col items-center`}
      >
        <Link href={`/games/${slug}`}>Read more</Link>
      </span>
    </main>
  );
};
export default GamesItems;
