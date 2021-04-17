import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import About from './components/About';
import Contacts from './components/Contacts';
import Page404 from './components/Page404';
import TopSales from './components/TopSales';
import Catalog from './components/Catalog/Catalog';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart/Cart';
import CartProvider from './contexts/CartProvider';

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <MainContainer>
          <Banner />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/cart" component={Cart} />
            {/* <Route path="/catalog/search/:searchQuery" component={Catalog} /> */}
            <Route path="/catalog/:id" component={ProductCard} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/contacts" component={Contacts} />
            <Route exact path="/">
              <TopSales />
              <Catalog />
            </Route>
            <Route path="*" component={Page404} />
          </Switch>
        </MainContainer>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
