import React from 'react';
import styles from './Header.module.css'
import logoImg from './../../assets/img/Header/logo.svg'
import cartImg from './../../assets/img/Header/cart-2-64.png'
import Nav from './Nav/Nav'
import {NavLink} from 'react-router-dom'

export default function Header() {
  
  return (
    <header>
      <div className={styles.head}>
        <NavLink to='/'>
          <img src={logoImg} alt="logo" className={styles.logoImg} />
        </NavLink>
        <div className={styles.cart}>
          <img src={cartImg} alt="cart-image" className={styles.cartImg} />
          <span>12</span>
        </div>
      </div>
      <Nav />
    </header>
  );
}