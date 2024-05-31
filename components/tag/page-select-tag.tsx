import { getAllTag as get } from '@/lib/action';
import { useState, useEffect } from 'react';
interface ITag {
  id: number;
  title: string;
}
const SelectTag = ({ onChange }: any) => {
  const [tags, setTags] = useState<ITag[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await get();
      setTags(data);
    };
    fetch();
  }, []);
  return (
    <main>
      <select onChange={onChange} multiple>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.title}
          </option>
        ))}
      </select>
    </main>
  );
};
export default SelectTag;
