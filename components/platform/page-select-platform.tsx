import { getAllPlatform as get } from '@/lib/action';
import { useState, useEffect } from 'react';
interface IPlatform {
  id: number;
  title: string;
}
const SelectPlatform = ({ onChange }: any) => {
  const [platforms, setPlatform] = useState<IPlatform[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await get();
      setPlatform(data);
    };
    fetch();
  }, []);
  return (
    <section>
      <select onChange={onChange} multiple>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.title}
          </option>
        ))}
      </select>
    </section>
  );
};
export default SelectPlatform;
