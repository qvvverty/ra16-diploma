import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

export default function Header() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const history = useHistory();

  const searchBtnHandler = () => {
    if (searchFieldValue) {
      searchSubmitHandler();
    } else {
      setSearchExpanded(!searchExpanded);
    }
  };

  const inputHandler = event => {
    setSearchFieldValue(event.target.value);
  };

  const searchSubmitHandler = event => {
    if (event) event.preventDefault();
    if (searchFieldValue) {
      history.push('/catalog?' + searchFieldValue);
    }
    setSearchFieldValue('');
    setSearchExpanded(false);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={searchBtnHandler}
                  />
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${searchExpanded ? '' : 'invisible'}`}
                  onSubmit={searchSubmitHandler}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    onChange={inputHandler}
                    value={searchFieldValue}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
