import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Search({ setItems, setLoading, setHasMoreItems }) {
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const { searchQuery } = useParams();

  useEffect(() => {
    if (searchQuery) {
      setSearchFieldValue(searchQuery);
    }
  }, [searchQuery]);

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
