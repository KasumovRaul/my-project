import React, { useEffect, useState } from 'react';
import './Favorites.css';
import { MdDeleteSweep } from 'react-icons/md';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Favorites = () => {
  
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan favorileri çekme
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
     setFavorites(savedFavorites);  // favorileri state'e kaydet

  }, []);

   //! Favoriden öğe silme
   const handleRemoveFavorite = (photoId) =>{
    const updatedFavorites = favorites.filter(fav => fav.id !== photoId);
     setFavorites(updatedFavorites);
     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
   };

   const handlePhotoClick = (id) =>{
     navigate(`/Bedroom/${id}`)
   }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Products</h2>
      {favorites.length === 0 ? (
        <>
        <h1>No favorites added yet.</h1>
        <div className="back-btn">
           <h3><Link to='/chairPhoto'> <button>Back To Shop </button></Link></h3>
           
        </div>
        </>
         
      ) : (
        <div className="favorites-list">
          {favorites.map((item, index) => (
            <div key={index} className="favorite-item">
                  <img src={item?.src?.medium} 
                       alt={item.alt || 'Favorite Item'} onClick={()=>handlePhotoClick(item.id)}/>
              <div className="favorite-info">
                <div className="favorite-desc">
                  <p>{item.alt || 'No description available'}</p>
                </div>
                <div className="favorite-price">
                  <p>Price: ${(Math.random() * (1000 - 10) + 100).toFixed(0)}</p>
                </div>
                <div className="favorites-removeBtn">
                  <button onClick={()=>handleRemoveFavorite(item.id)}><MdDeleteSweep /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;