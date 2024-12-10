import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './GridHero2.css'
import { useNavigate } from 'react-router-dom';

const GridHero2 = () => {

    const [photo, setPhoto] = useState([]);
    const navigate = useNavigate();

    const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
    const url = `https://api.pexels.com/v1/search?query=curtains&per_page=150&page=1`;

    useEffect(()=>{
       const fetchCurtains = async () =>{
        try {
            const response = await axios.get(url, {
                headers:{
                    Authorization:API_KEY,
                }
            });

            setPhoto(response.data.photos);

        } catch (error) {
            console.error('Fetching error Photos', error);
        }
       };

        fetchCurtains();
    },[]);

    const handlePhotoClick = (id) =>{
        navigate(`/curtains/${id}`);
    };

  return (


    <>
    <h1>Most Preffered <b>Curtains</b></h1>
    <div className="gridHero2">
        <div className="gridHero2-wrapper">
            {
             photo.concat(photo).map((item, index)=>{
                 return <div className="gridHero2-image" key={index}>
                    <img src={item.src.medium} alt={item.id} onClick={()=> handlePhotoClick(item.id)}/>
                </div>
                })
            }
        </div>
    </div>
    </>
  )
}

export default GridHero2