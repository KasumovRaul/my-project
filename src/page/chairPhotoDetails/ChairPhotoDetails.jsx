import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './ChairPhotoDetails.css'
import Tooltip from '@mui/material/Tooltip';
import { FaRegHeart } from "react-icons/fa6";
import Zoom from 'react-medium-image-zoom'; // Zoom bileşeni
import 'react-medium-image-zoom/dist/styles.css'; // Zoom stilleri
import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";
import { TiPlus, TiMinus } from "react-icons/ti";
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCart } from '../contextApi/CartContext';

const ChairPhotoDetails = () => {

    const location = useLocation();
    const { cartItems, addToCart } = useCart();
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [quantity, setQuantity] = useState(1); 
    const [relatedPhotos, setRelatedPhotos] = useState([]); // Related photos
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Ana fotoğrafı değiştirmek için yeni state
    const [comments, setComments] = useState([]); // comment
    const [newComment, setNewComment] = useState(''); // comment
    const [newRating, setNewRating] = useState(1); // comment
    const [firstName, setFirstName] = useState(''); // comment
    const [lastName, setLastName] = useState(''); // comment
    const [message, setMessage] = useState({ open: false, message: '', severity: 'success' });

    const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
    const url = `https://api.pexels.com/v1/search?query=bedroom&per_page=50&page=1`;

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: API_KEY,
                    }
                });

                // Ürün ID'sine göre veriyi bul
                const foundProduct = response.data.photos.find(photo => photo.id.toString() === id);
                setProductDetails(foundProduct);

                // Related photos
                setRelatedPhotos(response.data.photos.slice(0, 6));

                // İlk fotoğrafı ana fotoğraf olarak seçelim
                setSelectedPhoto(foundProduct.src.large);
            } catch (error) {
                console.error('Fetching error', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!productDetails) {
        return <div className='loading'>Loading...</div>;
    }

    //! Size 
    const handleSizeClick = (size) => {
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    const handleAddToFavorites = (photo) => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (existingFavorites.some(fav => fav.id === photo.id)) {
            setMessage({ open: true, severity: 'warning', message: 'This product is already added in your favorites!' });
            return; 
        }
        const newFavorites = [photo, ...existingFavorites];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setMessage({ open: true, severity: 'success', message: 'Product added to favorites!' });
    };

     // Ürün miktarını artır
    // const handleIncreaseQuantity = () => {
    //     setQuantity(prevQuantity => {
    //         if (prevQuantity < 10) {
    //             return prevQuantity + 1;
    //         } else {
    //             alert('You reached the maximum quantity limit!');
    //             return prevQuantity;
    //         }
    //     });
    // };

     // Ürün miktarını azalt
    // const handleDecreaseQuantity = () => {
    //     setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : prevQuantity);
    // };

    //! Fotoğraf tıklandığında ana fotoğrafı değiştirme
    const handleRelatedPhotoClick = (photo) => {
        setSelectedPhoto(photo.src.medium); 
    };
    

    //! Comment handling
    const handleCommentSubmit = () => {
        if (!firstName.trim() || !lastName.trim() || !newComment.trim()) {
            alert('Please fill in all fields!');
            return;
        }

            const updatedComments = [
                 ...comments, 
                  { 
                    comment: newComment, 
                    rating: newRating, 
                    firstName, lastName }
            ];
            setComments(updatedComments);
            setNewComment('');
            setNewRating(1);
            setFirstName('');
            setLastName('');
       
    };

    //! SnackBar handling
    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setMessage({ ...message, open: false });
        }
    };

    //! Add to cart
    const handleAddToCart = () => {
        if (!selectedSize) {
            setMessage({
                open: true,
                message: 'Please select a size before adding to cart!',
                severity: 'warning',
            });
            return;
        }

        addToCart({
            id: productDetails.id,
            name:productDetails.alt,
            src: selectedPhoto,
            price: (Math.random() * (1000 - 10) + 100).toFixed(0),
            size: selectedSize,
            quantity: quantity,
        });
        setMessage({
            message: 'Product added to cart!',
            open: true,
            severity: 'success',
        });
    };

    return (
        <>
            <div className="chairProductDetails">
                <div className="chairProductDetails-wrapper">
                    <div className="chairProductDetails-image">
                        <Zoom>
                            <img src={selectedPhoto} alt="Selected Photo" />
                        </Zoom>
                    </div>
                    <div className="chairProductDetails-title">
                        <div className="details-desc">
                            <div className="related-photo-name">
                                <p><Link to='/chairPhoto'><span>Home / </span></Link> Bedroom Set Model</p>
                            </div>
                            <p>{productDetails.alt}</p>
                        </div>
                        <div className="chairProductDetails-stars">
                            <div className="stars">
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarSharp /></b>
                                <b><IoStarHalfSharp /></b>
                            </div>
                            <div className="reviews">
                                <p>(66 Reviews)</p>
                            </div>
                        </div>
                        <div className="details-price">
                            <h3>${(Math.random() * (1000 - 10) + 100).toFixed(0)} <span>Free Shipping</span></h3>
                        </div>
                        <div className="details-size">
                            <ul>
                                {['Twin', 'Double ', 'Queen ', 'King ', 'Super King '].map((size) => (
                                    <li
                                        key={size}
                                        className={selectedSize === size ? 'active' : ''}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="quantity-select">
                          <select>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option>
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                    <option >10</option>
                         </select>
                         </div>
                        <div className="details-btn-section">
                            <div className="details-btn">
                                <button onClick={handleAddToCart}>Add To Cart</button>
                            </div>
                            <div className="details-favorites" onClick={() => handleAddToFavorites(productDetails)}>
                                <Tooltip title='Add to Favorite' placement='left-start' arrow>
                                    <i><FaRegHeart /></i>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related-Section */}
            <div className="related">
                <h1>Related Products</h1>
                <div className="related-wrapper">
                    {relatedPhotos.length > 0 ? (
                        relatedPhotos.map((photo) => (
                            <div className="related-item" key={photo.id} onClick={() => handleRelatedPhotoClick(photo)}>
                                <div className="related-image">
                                    <img src={photo.src.medium} alt={photo.alt} />
                                </div>
                                <p>{photo.alt}</p>
                                <div className="related-title">
                                    <div className="related-price">
                                        <h3>${(Math.random() * (1000 - 10) + 100).toFixed(0)}</h3>
                                    </div>
                                    <div className="stars">
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarSharp /></b>
                                        <b><IoStarHalfSharp /></b>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Related Photos found...</p>
                    )}
                </div>
            </div>

            {/* Comments Section */}
            <div className="product-comments">
                <h2>Customer Reviews</h2>
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div className='comment' key={index}>
                                <p><strong>{comment.firstName} {comment.lastName}</strong></p>
                                <p>{comment.comment}</p>
                                <div className="comment-rating">
                                    {['1', '2', '3', '4', '5'].map((star) => (
                                        <span key={star} className={comment.rating >= star ? 'active' : ''}> ★ </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Reviews Yet!</p>
                    )}
                </div>
                <div className="add-comment">
                    <input type="text" value={firstName} placeholder='First Name'
                        onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" value={lastName} placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)} />
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Write a Comment..'
                    />
                    <div className="rating">
                        <p>Rate this Product</p>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}
                                className={newRating >= star ? 'active' : ''}
                                onClick={() => setNewRating(star)}> ★ </span>
                        ))}
                    </div>
                    <button onClick={handleCommentSubmit}>Submit</button>
                </div>
            </div>

            <Snackbar open={message.open} autoHideDuration={5000} onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnackBarClose} severity={message.severity} variant='filled'>
                    {message.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ChairPhotoDetails;
