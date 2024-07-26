'use client';
import CustomSlider from '@/components/slider_component_def/page-custom-slider';

const SliderNewsForGame = ({ news }: { news: any[] }) => {
  return news.length > 0 ? (
    <CustomSlider
      items={news}
      nameHeadSlider="News for game"
      url_article="news"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default SliderNewsForGame;
