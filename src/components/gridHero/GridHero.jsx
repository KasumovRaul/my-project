import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GridHero.css';  // CSS dosyasını burada oluşturacağız
import { useNavigate } from 'react-router-dom';

const PhotoScroller = () => {

  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
  const url = `https://api.pexels.com/v1/search?query=bedroom&per_page=150&page=1`;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: API_KEY,
          },
        });
        setPhotos(response.data.photos);  // Fotoğrafları state'e kaydet
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (id) =>{
    navigate(`/Bedroom/${id}`)
  }

  return (
    <>
    <h1>Most Preffered <b>Bedroom</b> Set</h1>
    <div className="photo-scroller-container">
       
      <div className="photo-scroller">
        {photos.concat(photos).map((photo, index) => (
          <img key={index} src={photo.src.medium} alt={photo.alt} onClick={()=> handlePhotoClick(photo.id)}/>
        ))};
      </div>
    </div>
    </>
  );
};

export default PhotoScroller;
