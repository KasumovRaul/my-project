import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ChairPhoto from './page/chairPhoto/ChairPhoto';
import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/navbar/Navbar';
//import BedroomPhoto from './page/bedroomPhoto/BedroomPhoto';
import BedroomCurtains from './page/bedroomCurtains/BedroomCurtains';
import Favorites from './page/favorites/Favorites';
import ChairPhotoDetails from './page/chairPhotoDetails/ChairPhotoDetails';
import Footer from './components/footer/Footer';
import BedroomCurtainsDetails from './page/bedroomCurtainsDetails/BedroomCurtainsDetails';
import { CartProvider } from './page/contextApi/CartContext';
import CartPage from './page/cartPage/CartPage';

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chairPhoto" element={<HeroSection />} />
        <Route path="/chairPhoto/:id" element={<ChairPhoto />} />
        {/* <Route path="/bedroomPhoto/:id" element={<BedroomPhoto />} /> */}
        <Route path="/bedroomCurtains/:id" element={<BedroomCurtains />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product-details/:id" element={<ChairPhotoDetails />} />
        <Route path="/CurtainsProduct-details/:id" element={<BedroomCurtainsDetails />} />
        <Route path="/curtains/:id" element={<BedroomCurtainsDetails />} />
        <Route path="/Bedroom/:id" element={<ChairPhotoDetails />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
      <Footer/> 
    </Router>
    </CartProvider>
  );
}

export default App;
