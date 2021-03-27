import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import About from './components/About';
import Contacts from './components/Contacts';
import Page404 from './components/Page404';

function App() {
  return (
    <Router>
      <Header />
      <MainContainer>
        <Banner />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route exact path="/" />
          <Route path="*" component={Page404} />
        </Switch>
      </MainContainer>
      <Footer />
    </Router>
  );
}

export default App;
