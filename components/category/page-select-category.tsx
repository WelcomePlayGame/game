import { getAllCategory as get } from '@/lib/action';
import { title } from 'process';
import { useState, useEffect } from 'react';
interface Category {
  id: number;
  title: string;
}
const SelectCategory = ({ onChange }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await get();
      setCategories(data);
    };
    fetch();
  }, []);
  return (
    <main>
      <select onChange={onChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </main>
  );
};
export default SelectCategory;
