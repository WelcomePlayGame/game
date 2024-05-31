import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findArticleBySlug } from '@/lib/action';
import Image from 'next/image';
export const generateMetadata = async ({ params }: any) => {
  const article = await findArticleBySlug(params.slug);
  return {
    title: article?.seo_title,
    description: article?.seo_content,
  };
};
const Article = async ({ params }: { params: { slug: string } }) => {
  const article = await findArticleBySlug(params.slug);
  const createMarkup = (html: any) => ({ __html: html });
  return (
    <main>
      <PageHeader />
      <PageNave />
      <section className={`flex flex-col  mt-[70px]`}>
        <div
          className={`relative object-contain w-[300px] h-[150px] block mx-auto md:w-[600px] md:h-[300px]`}
        >
          {article?.url_image && (
            <Image
              src={`${process.env.URL_AWS}${article?.url_image}`}
              fill
              alt={article.title}
              className={`rounded-[5px]`}
            />
          )}
        </div>
        <div className={`border-b w-[300px] block mx-auto pb-[15px]`}>
          <h2 className={` font-bold text-center mt-[30px]`}>
            {article?.title}
          </h2>
        </div>
        <div
          className={`font-normal  pl-[30px] pr-[30px] lg:pt-[70px] lg:pl-[250px] lg:pr-[250px]`}
        >
          <span dangerouslySetInnerHTML={createMarkup(article?.content)} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Article;
