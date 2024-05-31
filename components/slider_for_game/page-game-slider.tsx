'use client';
import { useEffect, useState } from 'react';
import { getAllGames } from '@/lib/action';
import CustomSlider from '@/components/slider_component_def/page-custom-slider';

const SliderGame = () => {
  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const games = await getAllGames();
      setGames(games);
    };

    fetchArticles();
  }, []);

  return games.length > 0 ? (
    <CustomSlider
      items={games}
      nameHeadSlider="Popular Games"
      url_article="games"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default SliderGame;
