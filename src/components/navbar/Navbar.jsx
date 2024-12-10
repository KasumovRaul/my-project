import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import ShopNavbar from '../ShopNavbar/ShopNavbar';
import SofaNavbar from '../sofaNavbar/SofaNavbar';
import ChairNavbar from '../chairNavbar/ChairNavbar';
import AccessoriesNavbar from '../accessoriesNavbar/AccessoriesNavbar';
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useCart } from '../../page/contextApi/CartContext';
// import { useCart } from '../../ContextApi.jsx';

const Navbar = () => {

  const {cartItems} = useCart() || {cartItems: []}; // cartItems'i context'ten al
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeNav, setActiveNav] = useState(false);
    const [favorites, setFavorites] = useState([]);  // Favori ürünleri state'de tut
    const [favoritesCount, setFavoritesCount] = useState(0); // Favori sayısını state'de tut

    //! Favorileri localStorage'dan al
    useEffect(()=>{
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);

          // Favori sayısını güncelle
         setFavoritesCount(savedFavorites.length);
    },[]);

   const handleMenuClick = (state) =>{

        setActiveMenu(prevState => prevState === state ? null : state); // Aynı menüye tıklayınca kapatılır

        setActiveNav(prevState => prevState === state ? null : state);
    }

      const [search, setSearch] = useState(false);

      const handleSearchClick = () =>{
        setSearch(!search);
      }

  return (
    <nav>
    <div className="navbar">
      <div className="navbar-wrapper">
          <div className="navbar-logo">
            <Link to='/'>
             <h1>BOSS Decor</h1>
             </Link>
          </div>
          
          <div className={`navbar-input ${search ? 'active' : ''}`}>
               <input type="text" placeholder='Search'/>
               <i><IoSearch /></i>
             </div>
            <div className="navbar-RightSide">
              <Link to='/favorites'>
              <Tooltip title='Favorite' placement='bottom' >
              <a href=''><FaRegHeart /></a></Tooltip>
            </Link>
            {favoritesCount > 0 && <span className='favCount'>{favoritesCount}</span> }

              <Link to='/cart'>
               <Tooltip title='Cart' placement='bottom' >
              <i><RiShoppingBagLine /> </i></Tooltip>
              </Link>
              {cartItems && cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}

              <div className="checkout-btn">
                <button>Sign in</button>
              </div>
            </div>
        </div>
        <div className="navbar-choice">
            <ul >
                <li className={` ${activeNav === 'shop' ? 'active' : '' }`}
                onClick={() => handleMenuClick('shop')}> Shop </li>

                <li className={`${activeNav === 'sofa' ? 'active' : ''}`}
                onClick={() => handleMenuClick('sofa')}>Furniture</li>

                <li className={`${activeNav === 'chair' ? 'active' : ''}`}
                onClick={() => handleMenuClick('chair')}>Curtains</li>

                <li className={`${activeNav === 'table' ? 'active' : ''}`}
                 onClick={() => handleMenuClick('table')}>Table</li>
            </ul>
        </div>
    </div>
     
        {activeMenu === 'shop' && <ShopNavbar isVisible={activeMenu}/>}
        {activeMenu === 'sofa' && <SofaNavbar isVisible={activeMenu}/> }
        {activeMenu === 'chair' && <ChairNavbar isVisible={activeMenu}/>}
        {activeMenu === 'table' && <AccessoriesNavbar isVisible={activeMenu}/>}
    </nav>
  )
}

export default Navbar