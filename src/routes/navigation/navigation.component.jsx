import {Outlet, Link} from 'react-router-dom'
import { Fragment , useContext} from 'react';
import { UserContext } from '../../context/user.context';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { CartContex } from '../../context/cart.context';
import './navigation.styles.scss'

const Navigation = ()=>{
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} =  useContext(CartContex)
    return(
      <Fragment >
        <div className='navigation'>
            <Link>
                <CrwnLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link'  to='/shop'>
                   SHOP
                </Link>
                {
                  currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) 
                    :  (
                      <Link className='nav-link'  to='/auth'>
                        SING IN
                      </Link>)
                }
                <CartIcon/>
            </div>
           { isCartOpen && <CartDropDown/>}
        </div>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation;