import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { CartContex } from '../../context/cart.context'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'

const CartDropDown = () => {
    const {cartItems} =  useContext(CartContex);
    const navigate = useNavigate();

    const goToCheckOutHandler = () =>{
        navigate('/checkout');
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { 
                    cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))
                }
            </div>
           <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropDown
