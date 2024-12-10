import React, { useState } from 'react'
import { useCart } from '../contextApi/CartContext'
import { Button } from '@mui/material';
import './CartPage.css'
import { RiShoppingBagLine } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { TiPlus, TiMinus } from "react-icons/ti";

const CartPage = () => {

    const {cartItems, removeFromCart, updateCartItemQuantity } = useCart();
   

    const totalPrice = cartItems.reduce((total, item)=>{
        return total + item.price * item.quantity;
    }, 0);

    const handleIncreaseQuantity = (id) =>{
        updateCartItemQuantity(id, 1); // Miktarı artırmak için `updateCartItemQuantity` kullanılıyor
    }

    const handleDecreaseQuantity = (id) =>{
        updateCartItemQuantity(id, -1);  // Miktarı azaltmak için `updateCartItemQuantity` kullanılıyor
    }

  return (
    <div>
        <div className="cartPage">
            <div className="cartPage-wrapper">
        <h1>Your Shopping Cart <i><RiShoppingBagLine /></i> </h1>
        {
            cartItems.length === 0 ? (
                <>
                <p>Your Cart is empty.</p>
                <div className="startShop-btn">
                    <Link to='/chairPhoto'>
                    <button>Start Shopping <span><RiShoppingCart2Fill /></span></button>
                    </Link>
                </div>
                </>
            ) : (
                <ul>
                    {
                        cartItems.map((item, index)=>(
                            <div className="cartPage-content">
                             <div className="cartPage-image" key={index}>
                                <img src={item.src} alt={item.name} />
                             </div>
                             <div className="cartPage-item">
                             <li key={item.id}>
                             {item.name} - ${item.price} x <span>{item.quantity}</span> 
                       
                          </li> 
                          <div className="cartPage-list">
                          <div className="details-quantity">
                            <p><b onClick={()=>handleDecreaseQuantity(item.id)}><TiMinus /></b>
                                <h3>{item.quantity}</h3>
                                <b onClick={()=>handleIncreaseQuantity(item.id)}><TiPlus /></b>
                            </p>
                        </div>
                        <Button onClick={()=> removeFromCart(item.id)}>Remove</Button>
                        </div>
                          </div>
                        </div>
                        ))
                    }
                </ul>
            )
        }
           <section>
            <div className="checkout">
                <div className="checkout-section">
                    <h2>Order Summary</h2>
                    <div className="checkout-details">
                        <p>Total Items: <b>{cartItems.length}</b></p>
                        <p>Total Price: <b>${totalPrice}</b> </p>
                    </div>
                    <div className="checkout-button">
                        <Button variant='contained' color='primary' size='large'>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
           </section>
         </div>
         </div>
    </div>
  )
}

export default CartPage