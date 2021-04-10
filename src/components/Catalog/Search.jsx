import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Search({ setItems, setLoading, setHasMoreItems }) {
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      setSearchFieldValue(location.search.slice(1));
      submitHandler();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const inputHandler = event => {
    setSearchFieldValue(event.target.value);
  };

  const submitHandler = async event => {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API + 'items?q=' + searchFieldValue);
      const items = await response.json();
      setItems(items);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      setHasMoreItems(false);
    }
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={submitHandler}>
      <input
        className="form-control"
        onChange={inputHandler}
        value={searchFieldValue}
        placeholder="Поиск"
      />
    </form>
  )
}
