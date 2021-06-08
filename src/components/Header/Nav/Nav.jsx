import React from 'react';
import styles from './Nav.module.css'

export default function Nav() {
  
  return (
    <nav className={styles.nav}>
      <ul>
        <li>MEN</li>
        <li>WOMEN</li>
        <li>KIDS</li>
        <li>JERSEY</li>
        <li>T-SHIRTS</li>
        <li>KIDS</li>
        <li>FOOTWEAR</li>
        <li>ACCESORIES</li>
        <li>SALE</li>
      </ul>
    </nav>
  );
}