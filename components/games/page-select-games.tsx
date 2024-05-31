import { getAllGames as get } from '@/lib/action';
import { on } from 'events';
import React, { useState, useEffect } from 'react';
interface IGame {
  id: number;
  title: string;
}

const SelectGames = ({ onChange }: any) => {
  const [games, setGames] = useState<IGame[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await get();
      setGames(data);
    };
    fetch();
  }, []);
  return (
    <main>
      <select onChange={onChange} multiple>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.title}
          </option>
        ))}
      </select>
    </main>
  );
};
export default SelectGames;
