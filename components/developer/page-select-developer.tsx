import { useState, useEffect } from 'react';
import { getAllDeveloper as get } from '@/lib/action';
import { on } from 'events';
interface IDeveloper {
  id: number;
  title: string;
}
const SelectDeveloper = ({ onChange }: any) => {
  const [developers, setDevelopers] = useState<IDeveloper[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await get();
      setDevelopers(data);
    };
    fetch();
  }, []);
  return (
    <section>
      <select onChange={onChange} multiple>
        {developers.map((developer) => (
          <option key={developer.id} value={developer.id}>
            {developer.title}
          </option>
        ))}
      </select>
    </section>
  );
};
export default SelectDeveloper;
