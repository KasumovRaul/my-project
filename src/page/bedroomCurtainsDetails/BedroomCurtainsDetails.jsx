import React, { useEffect, useState } from 'react'
import './BedroomCurtainsDetails.css'
import Zoom from 'react-medium-image-zoom'; // Zoom bileşeni
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoStarSharp } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import Tooltip from '@mui/material/Tooltip';
import { FaRegHeart } from "react-icons/fa6";
import { Rating } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/CartContext';

const BedroomCurtainsDetails = () => {

  const {addToCart} = useCart();

  const {id} = useParams();
  const [productDetails, setProductDetails] = useState(null); //details
  const [selectedSize, setSelectedSize] = useState(null); //size
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [relatedPhotos,  setRelatedPhotos] = useState([]); // Related photos
  const [selectedPhoto, setSelectedPhoto] = useState([]); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(1); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = useState(false); //Snackbar
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState({open:false, message:'', severity:'success'}); // Snackbar mesajı için state


  const API_KEY = 't8XHDLEirXhklpLXOBMcd9pnkZ8Wph3AWtYFTvC7WmnXBKcSKwcuZMX6';
  const url = `https://api.pexels.com/v1/search?query=curtains&per_page=60&page=1`;
  //const url2 = `https://api.pexels.com/v1/photos/${id}`; // Tek bir fotoğrafı çekmek için endpoint


  useEffect(()=>{
     const fetchProductDetails = async () => {

        try {
          const response = await axios.get(url, {
            headers:{
              Authorization:API_KEY,
            }
          });
         
            
          // Ürün ID'sine göre veriyi bul
          const foundProduct = response.data.photos.find(photo=> photo.id.toString() === id );
          setProductDetails(foundProduct);
            console.log('foto', foundProduct);

          //Related
           setRelatedPhotos(response.data.photos.slice(0,6));

            // İlk fotoğrafı ana fotoğraf olarak seçelim
            setSelectedPhoto(foundProduct.src.large); // İlgili ürünün ilk fotoğrafını seçiyoruz
            
        } catch (error) {
          console.error('Fetching error', error);
        }
     }

     fetchProductDetails();
  },[id]);

  if(!productDetails || relatedPhotos.length === 0){
     return <div>Loading..</div>
  };

  //!Favorites
  const handleAddToFavorites = (photo) =>{
    const existingFavorites = JSON.parse( localStorage.getItem('favorites'));

    if(!existingFavorites.some(fav=> fav.id === photo.id)){
        setMessage({open:true, severity:'warning',  message:'This product is already added in your favorites!'});
       
      }
      const newFavorites = [photo, ...existingFavorites];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      //! SnackBar
     setMessage({open:true, severity:'success', message:'Product added to favorites!'});
     
  }

  //! Size
   const handleSizeClick = (size) => {
     setSelectedSize(prevSize => prevSize === size ? null : size);
   }


      // !Fotoğraf tıklandığında ana fotoğrafı değiştirme
      const handleRelatedPhotoClick = (photo) =>{
        setSelectedPhoto(photo.src.large);
      }

    //!Commet
    const handleCommentSubmit = () => {
      
      if (!firstName.trim() || !lastName.trim() || !newComment.trim()) {
        alert('Please fill in all fields!');
          return;
      }
          const updatedComments = [
              ...comments, { comment: newComment, rating: newRating, firstName, lastName }
          ];
          setComments(updatedComments);
          setNewComment('');
          setNewRating(1);
          setFirstName('');
          setLastName('');
     
  };

     //! SnackBar
     const handleSnackBarClose = (event, reason) =>{
      if(event === 'awayclick') return;
        setMessage({...message, open:false});
    };


    //!AddToCart
    const handleAddToCart = () =>{
      if(!selectedSize){
        setMessage({
          open:true,
          message:'Please select a size before add to cart!',
          severity:'warning',
        });
        return;
      }

      addToCart({
        id:productDetails.id,
        name:productDetails.alt,
        size:selectedSize,
        src: selectedPhoto,
        price: (Math.random()*(1000 - 100) + 10).toFixed(0),
        quantity:quantity
      });

      setMessage({
        open:true,
        message:'Product added to cart!',
        severity:'success'
      });
     
    }


    const handleButtonClick = () =>{
      if(isButtonDisabled) return; // Eğer buton devre dışıysa, işlem yapma

      setIsButtonDisabled(true);// Butonu devre dışı bırak

  // Sepete ekleme işlemini yap
  addToCart({
    id: productDetails.id,
    name: productDetails.alt,
    size: selectedSize,
    src: selectedPhoto,
    price: (Math.random() * (1000 - 100) + 10).toFixed(0),
    quantity: quantity,
  });

  setMessage({
    open: true,
    message: 'Product added to cart!',
    severity: 'success',
  });

  setIsButtonDisabled(false);
}
  return (

    <>
     <div className="bedroomCurtainsDetails">
      <div className="bedroomCurtainsDetails-wrapper">
        <div className="bedroomCurtainsDetails-image">
          <Zoom>
          <img src={selectedPhoto} alt={selectedPhoto.alt || "Curtain image"} />
          </Zoom>
        </div>
        <div className="bedroomCurtainsDetails-title">
        <div className="related-photo-name">
            <p><Link to='/chairPhoto'><span>Home / </span></Link> Curtain Model</p>
         </div>
           <div className="details-desc">
            <p>{productDetails.alt}</p>
           </div>
           <div className="bedroomCurtainsDetails-stars">
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
              <h3>${(Math.random() * (1000 - 20) + 100).toFixed(0)} <span>Free Shipping</span></h3>
            </div>
             <div className="details-size">
              <ul>
                {
                  ['Twin', 'Double ', 'Queen ', 'King ', 'Super King '].map((size)=>{
                    return <li key={size}
                         className={selectedSize === size ? 'active' : ''}
                         onClick={() => handleSizeClick(size)}>
                            {size}
                    </li>
                  })
                }
              </ul>
             </div>
             {/* <div className="details-quantity">
                <p><span onClick={handleDeacreaseQuantity}><TiMinus /></span>
                  <h3>{quantity}</h3>
                  <span onClick={handleIncreaseQuantity}><TiPlus /></span></p>
                </div> */}
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
                    <button onClick={handleAddToCart} disabled={isButtonDisabled}>Add To Cart</button>
                </div>
                <div className="details-favorites" onClick={()=>handleAddToFavorites(productDetails)}>
                <Tooltip title='Add to Favorite' placement='left-start' arrow>
                    <i ><FaRegHeart /></i>
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
          {
            relatedPhotos.length > 0 ? (
              relatedPhotos.map((photo)=>(
                <div className="related-item">
                  <div className="related-image"  key={photo.id}
                  onClick={() => handleRelatedPhotoClick(photo)}>
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
              <p>Loading Related Photos..</p>
            )
          }
         </div>
       </div>

        {/* Commets */}
        <div className="product-comments">
        <h2>Customer Reviews</h2>
        <div className="comments-list">
          {
            comments.length > 0 ? (
              comments.map((comment, index)=>(
                <div className="comment" key={index}>
                 <p><strong>{comment.firstName} {comment.lastName}</strong></p>
                 <p >{comment.comment}</p>
                 <div className="comment-rating">
                  {
                    ['1', '2', '3', '4', '5'].map((star)=>{
                    <span key={star}
                     className={comment.rating >= star ? 'active' : ''}
                    >★</span>
                    })
                  }
                 </div>
                </div>
              ))
            ) : (
              <p>No Reviws Yet!</p>
            )
          }
        </div>
        <div className="add-comment">
          <input type="text" placeholder='FirstName'
           value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

           <input type="text" placeholder='LastName' 
            value={lastName} onChange={(e) => setLastName(e.target.value)}/>

           <textarea value={newComment} 
           onChange={(e) => setNewComment(e.target.value)} placeholder='Write a Comment..'>

           </textarea>
           <div className="rating">
                    <p>Rate this Product</p>
                    {
                       [1, 2, 3, 4, 5].map((star)=>(
                        <span
                         key={star}
                         className={newRating >= star ? 'active' : ''} 
                         onClick={() => setNewRating(star)}
                        > ★ </span>
                       ))
                    }
                </div>
           <button onClick={handleCommentSubmit}>Submit</button>
        </div>
        
        <Snackbar open={message.open} autoHideDuration={5000} onClose={handleSnackBarClose}
                        anchorOrigin={{vertical:'top', horizontal:'right'}}
                        >
                    <Alert onClose={handleSnackBarClose} severity={message.severity} variant='filled'
                           sx={{ backgroundColor: '#28a745', color:'white' }}>
                            {message.message}
                    </Alert>
              </Snackbar>
      </div>
    </>
  )
}

export default BedroomCurtainsDetails