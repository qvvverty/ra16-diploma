import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import About from './components/About';
import Contacts from './components/Contacts';

function App() {
  return (
    <Router>
      <Header />
      <MainContainer>
        <Banner />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
      </MainContainer>
      <Footer />
    </Router>
  );
}

export default App;
