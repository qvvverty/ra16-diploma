import { useEffect, useState } from "react";
import Categories from "./Categories";
import Product from "../Product";
import Preloader from "../Preloader";
import Search from "./Search";
// import { useLocation } from "react-router";

export default function Catalog() {
  // const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    // if (location.search) return;
    const fetchItems = async () => {
      setHasMoreItems(true);
      setLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_API
          + 'items'
          + '?categoryId=' + activeCategory
        );
        const items = await response.json();
        if (items.length < 6) setHasMoreItems(false);
        setItems(items);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchMoreItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API
        + 'items'
        + '?categoryId=' + activeCategory
        + '&offset=' + items.length
      );
      const moreItems = await response.json();
      if (moreItems.length < 6) setHasMoreItems(false);
      setItems([...items, ...moreItems]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const loadMoreBtnHandler = () => {
    fetchMoreItems();
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <Search
        setItems={setItems}
        setLoading={setLoading}
        setHasMoreItems={setHasMoreItems}
      />

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="row">
        {items.map(item => {
          return (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              images={item.images}
            />
          )
        })}
      </div>

      {loading && <Preloader />}

      {hasMoreItems && <div className="text-center">
        <button
          className="btn btn-outline-primary"
          onClick={loadMoreBtnHandler}
          disabled={loading}>
          Загрузить ещё
        </button>
      </div>}
    </section>
  )
}
