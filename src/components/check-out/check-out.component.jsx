import { useContext } from "react";
import { CartContex } from "../../context/cart.context";

import CheckOutItem from "../check-out-item/check-out-item.component"
import "./checkout.styles.scss"

const CheckOut = ()  =>{
    const {cartItems,totalCart}  =  useContext(CartContex);
    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span >Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {   cartItems.length > 0 ?
                cartItems.map((item)=>(<CheckOutItem key={item.id} cartItem={item} />)) :
                <h1>The cart is empty</h1>
            }{
                cartItems.length > 0 ? 
                <span className="total">Total: {totalCart}</span>:
                <br/>
            }

        </div>
        
    )
}
export default CheckOut;