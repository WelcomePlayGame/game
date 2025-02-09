import PageHeader from '@/components/head/page-header';
import PageNave from '../components/head/page-nav-header';
import Image from 'next/image';
import Footer from '@/components/footer/page-footer';

const NotFound = () => {
  return (
    <>
      <section className={`flex-1`}>
        <PageHeader />
        <PageNave />
        <div
          className={`relative m-auto w-[300px] h-[150px]  lg:w-[600px] lg:h-[300px] `}
        >
          <Image src={'/images/image/404.png'} fill alt="404 error" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
