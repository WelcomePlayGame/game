import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from '@/components/slider_component_def/page-custom-slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

interface SliderItem {
  image: string;
  title: string;
  date: Date;
  description: string;
  url_image: string;
  slug: string;
}

interface CustomSliderProps {
  items: SliderItem[];
  nameHeadSlider: string;
  url_article: string;
}

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
});

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} ${styles.arrow} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      &lt;
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} ${styles.arrow} ${styles.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      &gt;
    </button>
  );
};

const CustomSlider: React.FC<CustomSliderProps> = ({
  items,
  nameHeadSlider,
  url_article,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    className: 'custom-slider',
  };
  const createMarkup = (html: any) => ({ __html: html });
  return (
    <article className={styles.sliderContainer}>
      <h2 className={styles.heading}>{nameHeadSlider}</h2>
      <Slider {...settings}>
        {items.map((item: any, index: number) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageWrapper}>
              {url_article !== 'developers' && url_article !== 'platforms' ? (
                <Link href={`/${url_article}/${item.slug}`}>
                  <Image
                    src={`${process.env.URL_AWS}${item.url_image}`}
                    alt={item.title}
                    layout="fill"
                    className={`${styles.image} p-[20px] rounded-[] object-contain lg:object-cover`}
                  />
                </Link>
              ) : (
                <Link href={`/${url_article}/${item.title}`}>
                  <Image
                    src={`${process.env.URL_AWS}${item.url_image}`}
                    alt={item.title}
                    layout="fill"
                    className={`${styles.image} p-[20px] rounded-[] object-contain lg:object-cover`}
                  />
                </Link>
              )}
            </div>
            <div className={styles.caption}>
              <h3>
                {item.title.length > 30
                  ? `${item.title.slice(0, 25)} ...`
                  : item.title}
              </h3>
              {item.date && <p>{item.date.toLocaleDateString('en-US')}</p>}
            </div>
          </div>
        ))}
      </Slider>
    </article>
  );
};

export default CustomSlider;
