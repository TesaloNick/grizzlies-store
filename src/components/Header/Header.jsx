import React from 'react';
import styles from './Header.module.css'
import logoImg from './../../assets/img/Header/logo.svg'
import nbaLogo from './../../assets/img/Header/nbalogo.svg'
import cartImg from './../../assets/img/Header/cart.png'
import Nav from './Nav/Nav'
import {NavLink} from 'react-router-dom'

export default function Header() {
  
  return (
    <header>
      <div className={styles.nbaHead}>
        <div>
          <a href="https://global.nbastore.com/"><img src={nbaLogo} alt="nbaLogo" /></a>  
        </div>
        <ul className={styles.registerButtons}>
          <NavLink to='/sign-up'>
            <li>Sign Up</li>
          </NavLink>
          <NavLink to='/log-in'>
            <li>Log In</li>
          </NavLink>
        </ul>
        <NavLink to='/cart' className={styles.cart}>
          <div>
            <img src={cartImg} alt="cart-image" className={styles.cartImg} />
            <span>12</span>
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