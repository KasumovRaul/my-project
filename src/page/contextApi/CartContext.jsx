import React, { createContext, useState, useContext, useEffect } from "react";

// Context oluştur
const CartContext = createContext();

// Custom hook (Kolay erişim için)
export const useCart = () => useContext(CartContext);

// CartProvider oluştur
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //! Sepet verilerini localStorage'a kaydetme
    useEffect(() => {
        // localStorage'dan veri okuma
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart)); // Veriyi güvenli bir şekilde al
            } catch (error) {
                console.error("Error parsing cart items from localStorage:", error);
                setCartItems([]);  // Hata durumunda boş dizi ile başlat
            }
        }
    }, []);

    // Sepet verilerini localStorage'a güncelleme
    useEffect(() => {
        if (cartItems.length > 0) {
            // Sepet doluysa kaydet
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            // Sepet boşsa sil
            localStorage.removeItem('cartItems');
        }
    }, [cartItems]);

    //! Ürün sepete ekleme fonksiyonu
    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            // Eğer ürün zaten varsa, miktarını artır
            setCartItems((prev) =>
                prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1,  }
                        : cartItem
                )
            );
        } else {
            // Yeni ürün ekle
            setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
        }
    };

    // Sepetten ürün çıkarma fonksiyonu
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Sepet verilerini sıfırlama fonksiyonu
    const clearCart = () => setCartItems([]);

    // Sepetteki ürün miktarını güncelleme fonksiyonu
    const updateCartItemQuantity = (id, change) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

