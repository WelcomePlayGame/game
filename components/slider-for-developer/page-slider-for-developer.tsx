'use client';
import { useEffect, useState } from 'react';
import { getAllDeveloper } from '@/lib/action';
import CustomSlider from '@/components/slider_component_def/page-custom-slider';

const SliderDeveloper = () => {
  const [developers, setDevelopers] = useState<any>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const developers = await getAllDeveloper();
      setDevelopers(developers);
    };

    fetchArticles();
  }, []);

  return developers.length > 0 ? (
    <CustomSlider
      items={developers}
      nameHeadSlider="Popular Developers"
      url_article="developers"
    />
  ) : (
    <div>
      <img
        src={`/animation.gif`}
        alt="animation"
        style={{ display: 'block', margin: 'auto' }}
      />
    </div>
  );
};

export default SliderDeveloper;
