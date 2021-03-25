import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <Banner />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
