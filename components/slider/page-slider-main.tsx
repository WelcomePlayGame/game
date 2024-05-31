'use client';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';

interface Slide {}

interface DataSlide {
  data: Slide[];
}
const SlideMain: React.FC<DataSlide> = ({ data }) => {
  return (
    <main>
      <Swiper
        navigation
        pagination={{ type: 'bullets', clickable: true }}
        autoplay={true}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
      ></Swiper>
    </main>
  );
};
