// import { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const CartProvider = ({children}) =>{
//     const [cart, setCart] = useState([]); // Sepetteki ürünler

//      // Sepete ürün eklemek için fonksiyon
//     const addToCart = (product) =>{
//         setCart([...cart, product]);
//     };


//     // Sepetteki ürünleri almak için fonksiyon
//     const getCartItems = () => cart;

//     return(
//         <CartContext.Provider value={{addToCart, getCartItems}}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// // CartContext'ten veri almak için custom hook
// export const useCart = () => useContext(CartContext);