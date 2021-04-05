import { useEffect, useState } from "react";

export default function Categories({ activeCategory, setActiveCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API + 'categories');
        setCategories(await response.json());
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFilters();
  }, []);

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <button
          className={`nav-link-button ${activeCategory ? '' : 'active'}`}
          onClick={() => setActiveCategory('')}>
          Все
        </button>
      </li>
      {categories.map(category => {
        return (
          <li key={category.id} className="nav-item">
            <button
              className={`nav-link-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}>
              {category.title}
            </button>
          </li>
        );
      })}
    </ul>
  )
}
