import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import './BedroomCurtains.css';
import { Link, useParams } from 'react-router-dom';
import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip';
import { FaRegHeart } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FcNext, FcPrevious } from "react-icons/fc";
import { useCart } from '../contextApi/CartContext';

const BedroomCurtains = () => {

    const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
    const url = 'https://api.pexels.com/v1/search?query=curtains&per_page=18&page=1';

    const {addToCart} = useCart();  // addToCart fonksiyonunu context'ten alıyoruz

    const [photos, setPhotos] = useState([]); // Photos for display
    const [modalOpen, setModalOpen] = useState(false);  // Modal visibility
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Selected photo for modal
    const [selectedSize, setSelectedSize] = useState(null); // Selected size in modal
    const [favorites, setFavorites] = useState([]); // Favorites list
    const [open, setOpen] = useState(false); // Snackbar visibility
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [loading, setLoading] = useState(false); // Loading state

   
    useEffect(() => {
        const fetchCurtains = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: API_KEY,
                    },
                    params: {
                        page: currentPage,
                    },
                });

                setPhotos(response.data.photos); // Update photos state
                setTotalPages(Math.ceil(response.data.total_results / 18)); // Update total pages
            } catch (error) {
                console.error('Error fetching curtains images', error);
            }
            setLoading(false);
        };

        fetchCurtains();
    }, [currentPage]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // Random price generator for curtains
    const CurtainsRandomPrice = () => {
        return (Math.random() * (7000 - 100) + 100).toFixed(0);
    };

    // Open modal with selected photo details
    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedPhoto(null);
        setModalOpen(false);
    };

    // Close modal if clicked outside of modal
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal')) {
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

    // Toggle size selection in modal
    const handleSizeClick = (size) => {
        setSelectedSize((prevSize) => (prevSize === size ? null : size));
    };

    // Add to favorites
    const handleAddToFavorites = (photo) => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (existingFavorites.some(fav => fav.id === photo.id)) {
            setMessage({open:true, severity:'warning', message:'This product is already added in your favorites!'});
            return;
        };

        const newFavorites = [photo, ...existingFavorites];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        setMessage({open:true, severity:'success', message:'Product added to favorites!'});    
    };

    const [message, setMessage] = useState({open:false, severity:'success', message:''}); // Snackbar message

    // Handle Snackbar close
    const handleSncakBarClose = (event, reason) => {
        if (reason === 'clickaway') return; 
        setMessage({...message, open:false});
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };


    //! Add to cart
    const handleAddToCart = () =>{
        if(!selectedSize){
            setMessage({
            open: true,
            message: 'please select a size before add to cart!',
            severity: 'warning',
         });
          return;
     };

        addToCart({
            id: selectedPhoto.id,
            name: selectedPhoto.alt || 'Curtains Model',
            src: selectedPhoto.src.medium,
            price: CurtainsRandomPrice(),
            size: selectedSize,
        });

        setMessage({
            message:'Product added to cart!',
            open: true,
            severity:'success',
        });
        closeModal();
    }

    return (
        <>
            <div className="curtains">
                <div className="curtains-wrapper">
                    {photos.map((photo) => (
                        <div key={photo.id} className="curtains-item">
                            <div className="curtains-image">
                                <Link to={`/CurtainsProduct-details/${photo.id}`}>
                                    <img src={photo.src.medium} alt={photo.alt || 'curtains'} />
                                </Link>
                                <div className="curtains-model">
                                    <p>Italic Curtains Model</p>
                                    <ul>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarHalfSharp /></b>
                                    </ul>
                                </div>
                                <p>{photo.alt || 'No Available'}</p>
                            </div>
                            <div className="curtains-title">
                                <div className="price">
                                    <span>${CurtainsRandomPrice()}</span>
                                </div>
                                <div className="bedroom-bag">
                                    <MdAddShoppingCart onClick={() => openModal(photo)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedPhoto && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-wrapper">
                        <div className="modal-image">
                            <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
                        </div>
                        <div className="modal-item">
                            <p>{selectedPhoto.alt}</p>
                            <div className="modal-stars">
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarHalfSharp /></b>
                                <p>(66 Reviews)</p>
                            </div>
                            <div className="modal-price">
                                <h4>${CurtainsRandomPrice()}</h4>
                            </div>
                            <div className="modal-size">
                                <ul>
                                    {['Twin', 'Double ', 'Queen ', 'King ', 'Super King '].map((size) => (
                                        <li
                                            key={size}
                                            onClick={() => handleSizeClick(size)}
                                            className={selectedSize === size ? 'active' : ''}
                                        >
                                            {size}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-button-section">
                                <div className="modal-btn" >
                                    <button onClick={handleAddToCart}>ADD TO CART</button>
                                </div>
                                <div className="modal-heartIcon">
                                    <Tooltip title="Add to Favorite" placement="left-start" arrow>
                                        <i onClick={() => handleAddToFavorites(selectedPhoto)}>
                                            <FaRegHeart />
                                        </i>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="close-modal" onClick={closeModal}>
                                <span><HiXMark /></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Loading..</p>
                </div>
            )}

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FcPrevious />
                </button>
                
                <span>Page {currentPage} of {totalPages}</span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FcNext />
                </button>
            </div>

            {/* Snackbar for notifications */}
            <Snackbar
                open={message.open}
                autoHideDuration={5000}
                onClose={handleSncakBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSncakBarClose}
                    severity={message.success}
                    variant="filled"
                    sx={{ backgroundColor: message.severity === 'success' ? '#28a741' : '#f0ad4e' }}
                >
                    {message.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BedroomCurtains;
