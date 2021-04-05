import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API + 'categories');
        const categories = await response.json();
        console.log(categories);
        setCategories(categories);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFilters();
  }, []);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" />
      </form>

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

      <Preloader />
    </section>
  )
}
