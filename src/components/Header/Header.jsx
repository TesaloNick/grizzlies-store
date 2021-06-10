import React from 'react';
import styles from './Header.module.css'
import logoImg from './../../assets/img/logo.svg'
import cartImg from './../../assets/img/cart-2-64.png'
import Nav from './Nav/Nav'

export default function Header() {
  
  return (
    <header>
      <div className={styles.head}>
        <img src={logoImg} alt="logo" className={styles.logoImg} />
        <div className={styles.cart}>
          <img src={cartImg} alt="cart-image" className={styles.cartImg} />
          <span>12</span>
        </div>
      </div>
      <Nav />
    </header>
  );
}