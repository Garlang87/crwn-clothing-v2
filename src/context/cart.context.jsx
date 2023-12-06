import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItems = cartItems.find((cartItem) => cartItem.id=== productToAdd.id);
    if(existingCartItems){
        return cartItems.map ((cartItem)=> cartItem.id === productToAdd.id  ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }
    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, productToRemove) =>{
    const existingCartItems = cartItems.find((cartItem) => cartItem.id=== productToRemove.id);
    
    if(existingCartItems.quantity === 1){
        return cartItems.filter(cartItem=> cartItem.id !== productToRemove.id)
    }
    return cartItems.map ((cartItem)=> cartItem.id === productToRemove.id  ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
}

const clearCartItem = (cartItems, productToClear) =>{
   return cartItems.filter(cartItem=> cartItem.id !== productToClear.id); 
}

export const CartContex =  createContext({
    isCartOpen: false,
    setIsCartOpen: () =>{},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    totalCart: 0,
    cartCount : 0
});



export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCart, setTotalCart] = useState(0);
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=>total +cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=>{
        const newTotalCart = cartItems.reduce((total,cartItem)=> total + (cartItem.quantity * cartItem.price),0);
        setTotalCart(newTotalCart);
    },[cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    }
    
    const removeItemFromCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove))
    }
    const clearItemFromCart = (productToRemove) =>{
        setCartItems(clearCartItem(cartItems,productToRemove))
    }
    const value = {isCartOpen,setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, totalCart}

    return(
        <CartContex.Provider value={value}>{children}</CartContex.Provider>
    )
}