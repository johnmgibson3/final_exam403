import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/Book/GetBookTypes');
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((c) => c !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updatedCategories);
    console.log('Selected categories (on click):', updatedCategories);
  };

  return (
    <div className="category-filter">
      <h5>Categories</h5>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <input
              type="checkbox"
              id={category}
              value={category}
              className="category-checkbox"
              onChange={handleCheckboxChange}
              checked={selectedCategories.includes(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
