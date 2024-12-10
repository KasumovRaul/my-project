import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdAddShoppingCart } from "react-icons/md";
import './chairPhoto.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoStarSharp } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { useCart } from '../contextApi/CartContext';

const ChairPhoto = () => {
    
    const {addToCart} = useCart(); // addToCart fonksiyonunu context'ten alıyoruz

    const { id } = useParams(); // URL'den parametre olarak ürün ID'sini alıyoruz.
    const [photos, setPhotos] = useState([]); // Fotoğrafları saklayacak state
    const [modalOpen, setModalOpen] = useState(false); // Modal'ın açık olup olmadığını kontrol eden state
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Seçilen fotoğraf
    const [selectedSize, setSelectedSize] = useState(null); // Seçilen boyut
    const [open, setOpen] = useState(false); // Snackbar açma durumu
    const [currentPage, setCurrentPage] = useState(1); // Sayfa numarasını saklayan state
    const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısını saklayan state
    const [loading, setLoading] = useState(false); // Yükleme durumunu saklayan state
    const [searchQuery, setSearchQuery] = useState(''); // Arama sorgusu
    const [filteredPhotos, setFilteredPhotos] = useState([]); // Filtrelenmiş fotoğraflar


    const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
    const url = 'https://api.pexels.com/v1/search?query=bedroom&per_page=18&page='; // Sayfalama için URL

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [currentPage]); 


    useEffect(() => {
        const fetchChairPhoto = async () => {
            setLoading(true); // Yükleme başladığında loading'i true yap
            try {
                const response = await axios.get(url + currentPage, {
                    headers: {
                        Authorization: API_KEY,
                    }
                });

            //Fiyatları bir kez hesaplayarak fotoğraflarla birlikte saklıyoruz
             const photosWithPrice = response.data.photos.map(photo=>({
                ...photo,
                price: (Math.random() * (1000 - 10) + 100).toFixed(0),  // Fiyatı burada bir kez hesapla
             }));

                setPhotos(photosWithPrice);
                setFilteredPhotos(photosWithPrice);
                setTotalPages(Math.ceil(response.data.total_results / 18)); // Toplam sayfa sayısını hesapla
            } catch (error) {
                console.error('Fetching Error:', error);
            }
            setLoading(false); // Yükleme tamamlandığında loading'i false yap
        };
        fetchChairPhoto();
    }, [currentPage]);

    const randomPrice = () => {
        return (Math.random() * (1000 - 10) + 100).toFixed(0);
    };

    //!Modal
    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setModalOpen(false);
        setSelectedSize(null);
    };

    const handleOutsideClick = (e) =>{
        if(e.target.classList.contains('modal')){
            closeModal();
        }
    };

    useEffect(()=>{
        if(modalOpen){
            document.body.style.overflow="hidden";
        }else{
            document.body.style.overflow="auto";

        }
    },[openModal]);
    

    //!Size
    const handleSizeClick = (size) => {
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    //favorites
    const handleAddToFavorites = (photo) => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
        if (existingFavorites.some(fav => fav.id === photo.id)) {
          setMessage({open:true, message:'This product is already in your favorites!', severity:'wraning'});
          return;
        }
      
        const newFavorites = [photo, ...existingFavorites];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setMessage({open:true, message:'Product added to favorites!', severity:'success'});
       
      };
      
      //SnackBar close
     const [message, setMessage] = useState({open : false, message: '', severity:'success'});

    const handleSnackBarClose = (event, reason)=>{
        if(reason === 'clickaway') return;
        setMessage((prev)=>({...prev, open:false}));
    };

   

    //! Pagination 
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };


    //!AddToCart 
    const handleAddToCart = () =>{
        if(!selectedSize){
            setMessage({
                message:'Please select a size before adding to cart!',
                open: true,
                severity: 'warning',
            });
          
            return;
        };
  
     addToCart({
        id:selectedPhoto.id,
        name: selectedPhoto.alt || 'Italic Bedroom set',
        src: selectedPhoto.src.medium,
        price: randomPrice(),
        size: selectedSize,
     });


     setMessage({
        open: true,
        message: 'Product added to cart!',
        severity: 'success',
     });
       closeModal();
  };


//   //! Search
//   useEffect(()=>{
//     if (searchQuery) {
//        const filtered = photos.filter(photo=> photo.alt?.toLowerCase().includes(searchQuery.toLowerCase()) // Arama sorgusuna göre filtreleme
//         );
//         setPhotos(filtered);  // Filtrelenmiş fotoğrafları güncelle

//     } else {
//         setPhotos(photos); // Eğer arama boşsa, tüm fotoğrafları göster
//     }
//   },[searchQuery, photos]);

    return (
        <div>
            <div className="photo-gallery">
                <div className="head-search">
                  
                </div>
                <div className="photo-wrapper">
                    {photos.map((photo) => (
                        <div key={photo.id} className="photo-item">
                            <div className="photo-img">
                                <Link to={`/product-details/${photo.id}`}>
                                    <img src={photo.src.medium} alt={photo.alt || "Chair"} />
                                </Link>
                            </div>
                            <div className="product-name">
                                <b>Italian Bedroom Set</b>
                                <ul>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarHalfSharp /></b>
                                </ul>
                            </div>
                            <div className="photo-description">
                                <p>{photo.alt || "No description available"}</p>
                            </div>
                            <div className="photo-content">
                                <div className="photo-price">
                                    <h4>${randomPrice()}</h4>
                                </div>
                                <div className="photo-bag">
                                    <i onClick={() => openModal(photo)}><MdAddShoppingCart /></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {
                modalOpen && selectedPhoto && (
                    <div className="modal" onClick={handleOutsideClick}>
                        <div className="modal-content">
                            <div className="modal-img">
                                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
                            </div>
                            <div className="modal-title">
                                <p>{selectedPhoto.alt}</p>
                                <div className="modal-stars">
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarSharp /></b>
                                    <b><IoStarHalfSharp /></b>
                                    <h5>(66 Reviews)</h5>
                                </div>
                                <div className="modal-price">
                                    <h4>${randomPrice()}</h4>
                                </div>
                                <div className='modal-size'>
                                    <ul>
                                        {
                                            ['Twin', 'Double ', 'Queen ', 'King ', 'Super King '].map((size) => (
                                                <li key={size}
                                                    className={selectedSize === size ? 'active' : ''}
                                                    onClick={() => handleSizeClick(size)}>
                                                    {size}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="modal-button-section">
                                    <div className="modal-btn">
                                        <button onClick={handleAddToCart}>ADD TO CART</button>
                                    </div>
                                    <div className="modal-heartIcon">
                                        <Tooltip title='Add to Favorite' placement='left-start' arrow>
                                            <i onClick={() => handleAddToFavorites(selectedPhoto)}><FaRegHeart /></i>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="close-modal" onClick={closeModal}>
                                    <span> <HiXMark /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Yükleniyor Mesajı */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            )}

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><FcPrevious /></button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FcNext />
                </button>
            </div>

            <Snackbar open={message.open} autoHideDuration={5000} onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnackBarClose} severity={message.severity} variant='filled' 
                        sx={{ backgroundColor: message.severity === 'success' ? '#28a741' : '#f0ad4e' }}>
                    {message.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ChairPhoto;
