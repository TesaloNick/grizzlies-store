import React from 'react';
import styles from './Nav.module.css'
import { Link } from 'react-router-dom'

export default function Nav() {

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul>
          <Link to='/men'><li>MEN</li></Link>
          <Link to='/women'><li>WOMEN</li></Link>
          <Link to='/kids'><li>KIDS</li></Link>
          <Link to='/jersey'><li>JERSEY</li></Link>
          <Link to='/t-shirts'><li>T-SHIRTS</li></Link>
          <Link to='/footwear'><li>FOOTWEAR</li></Link>
          <Link to='/accesories'><li>ACCESORIES</li></Link>
        </ul>
      </nav>
    </div>
  );
}