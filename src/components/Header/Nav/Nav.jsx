
import React from 'react';
import styles from './Nav.module.css'
import {NavLink} from 'react-router-dom'

export default function Nav() {
  
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to='/men'>
          <li>MEN</li>
        </NavLink>
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