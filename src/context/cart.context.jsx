import { createContext, useState } from "react";

export const CartContex =  createContext({
    isCartOpen: false,
    setIsCartOpen: () =>{}
})

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen,setIsCartOpen}
    return(
        <CartContex.Provider value={value}>{children}</CartContex.Provider>
    )
}