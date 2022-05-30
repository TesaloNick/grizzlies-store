
import React from 'react';
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'

export default function Nav() {

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul>
          <NavLink to='/men'>
            <li>MEN</li>
          </NavLink>
          <NavLink to='/women'>
            <li>WOMEN</li>
          </NavLink>
          <NavLink to='/kids'>
            <li>KIDS</li>
          </NavLink>
          <NavLink to='/jersey'>
            <li>JERSEY</li>
          </NavLink>
          <NavLink to='/t-shirts'>
            <li>T-SHIRTS</li>
          </NavLink>
          <NavLink to='/footwear'>
            <li>FOOTWEAR</li>
          </NavLink>
          <NavLink to='/accesories'>
            <li>ACCESORIES</li>
          </NavLink>

        </ul>
      </nav>
    </div>
  );
}