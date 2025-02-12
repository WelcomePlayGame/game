import Image from 'next/image';
import Link from 'next/link';
const GamesItemsList = ({ id, title, slug, url_image }: any) => {
  return (
    <section className={`flex flex-col items-center`}>
      <div
        className={`relative w-[100px] h-[100px] lg:w-[200px] lg:h-[100px] object-contain rounded-[5px]`}
      >
        <Image src={`${process.env.URL_AWS}${url_image}`} fill alt={title} />
      </div>
      <h2 className={`mt-[15px] border-b-2`}>{title}</h2>
      <span
        className={`mt-[10px] mb-[10px] bg-[#6ec1e4] w-[100px] h-[30px] rounded flex flex-col items-center`}
      >
        <Link href={`/games/${slug}`}>Read more</Link>
      </span>
    </section>
  );
};
export default GamesItemsList;
