import Image from 'next/image';
import Link from 'next/link';
export const generateMetadata = async () => {
  return {
    title: 'dwd',
    description: 'd',
  };
};
const PageItem = ({
  title,
  url_image,
  slug,
  category_title,
}: {
  title: string;
  url_image: string;
  slug: string;
  category_title: string;
}) => {
  return (
    <section>
      <div className={`flex flex-col items-center`}>
        <div
          className={`relative w-[300px] h-[200px] lg:w-[600px] lg:h-[300px] object-contain`}
        >
          <Image
            src={`${process.env.URL_AWS}${url_image}`}
            fill
            alt={title}
            className={`rounded-[5px]`}
          />
        </div>
        <h2 className={`mt-[17px] mb-[15px]`}>
          {title.length < 30 ? title : `${title.slice(0, 30)} ...`}
        </h2>
        <span
          className={`mt-[20px] mb-[20px] bg-[#6ec1e4] w-[150px] h-[30px] rounded flex flex-col items-center`}
        >
          <Link href={`/news/${slug}`}>Read news...</Link>
        </span>
      </div>
    </section>
  );
};
export default PageItem;
