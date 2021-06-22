import React, {useContext, useEffect} from 'react';
import styles from './Header.module.css'
import logoImg from './../../assets/img/Header/logo.svg'
import nbaLogo from './../../assets/img/Header/nbalogo.svg'
import cartImg from './../../assets/img/Header/cart.png'
import Nav from './Nav/Nav'
import {NavLink} from 'react-router-dom'
import CartData from './../../context';

export default function Header() {
  const data = useContext(CartData)

  const exitFromAccount = () => {
    data.setLoginState(false)
  }

  useEffect(() => {
    localStorage.setItem('loginState', JSON.stringify(data.loginState))
  }, [exitFromAccount])
  
  return (
    <header>
      <div className={styles.nbaHead}>
        <div>
          <NavLink to='/'><img src={nbaLogo} alt="nbaLogo" /></NavLink> 
        </div>
        {data.loginState ?
          <ul className={styles.registerButtons}>
            <NavLink to='/my-account'>
              <li>My account</li>
            </NavLink>
            <li onClick={() => exitFromAccount()}>Exit</li>
          </ul> :
          <ul className={styles.registerButtons}>
            <NavLink to='/sign-up'>
              <li>Sign Up</li>
            </NavLink>
            <NavLink to='/log-in'>
              <li>Log In</li>
            </NavLink>
          </ul>
        }
        <NavLink to='/cart' className={styles.cart}>
          <div>
            <img src={cartImg} alt="cart-image" className={styles.cartImg} />
            <span>{data.cartProducts.length}</span>
          </div>
        </NavLink>
      </div>
      <div className={styles.grizzliesHead}>
        <NavLink to='/'>
          <img src={logoImg} alt="logo" className={styles.logoImg} />
        </NavLink>
      </div>
      <Nav />
    </header>
  );
}