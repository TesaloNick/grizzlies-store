import React, {useContext, useEffect, useState} from 'react';
// import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import styles from './Header.module.css'
import logoImg from './../../assets/img/Header/logo.svg'
import nbaLogo from './../../assets/img/Header/nbalogo.svg'
import search from './../../assets/img/Header/search.svg'
import cartImg from './../../assets/img/Header/cart.png'
import Nav from './Nav/Nav'
import {NavLink} from 'react-router-dom'
import CartData from './../../context';
import CatalogData from './../Catalog/CatalogBlock/CatalogData'
import FiltersData from './../Catalog/CatalogFilter/FiltersData'

export default function Header() {
  const data = useContext(CartData)
  const [isSearch, setIsSearch] = useState(false)
  const [isModalMenu, setIsModalMenu] = useState(false)

  const exitFromAccount = () => {
    data.setLoginState(false)
  }

  useEffect(() => {
    localStorage.setItem('loginState', JSON.stringify(data.loginState))
  }, [exitFromAccount])
  
  const searchOnMainPage = (event) => {
    const searchText = event.target.value;
    if (!searchText) {
      data.setCatalogData(CatalogData)
      return
    }
    data.setCatalogData(CatalogData.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())))
  }

  const clearFiltersAndCatalog = () => {
    data.setFilters(FiltersData)
    localStorage.setItem('filters', JSON.stringify(FiltersData))
    data.setCatalogData(CatalogData)
    localStorage.setItem('catalogData', JSON.stringify(CatalogData))
  }

  const openSearchInput = () => { // открытие и закрытие поисковой строки
    setIsSearch(true)
  }
  const closeSearchInput = () => {
    setIsSearch(false)
    data.setCatalogData(CatalogData)
  }

  const openModalMenu = () => { // открытие и закрытие модального меню
    setIsModalMenu(true)
  }
  const closeModalMenu = () => {
    setIsModalMenu(false)
  }

  return (
    <header>
        {isSearch ?
          <div className={styles.searchBlockLittle}>
            <input type="text" className={styles.searchInputLittle} placeholder='Search' onChange={searchOnMainPage} />
            <div className={styles.searchLittleClose} onClick={() => closeSearchInput()}></div>
          </div> :
          <div className={styles.nbaHead}>
            <div className={styles.nbaHeadLeft}>
              {isModalMenu ?
                <div className={styles.modalMenuContainer}>
                  <div className={styles.modalMenuBlock}>
                    <NavLink to='/' onClick={() => {
                      clearFiltersAndCatalog();
                      closeModalMenu();
                    }}>
                      <div className={styles.nbaModalLogo}></div>
                    </NavLink>
                    <ul className={styles.nbaModalMenu}>
                      <NavLink to='/men'>
                        <li onClick={() => closeModalMenu()}>Men</li>
                      </NavLink>
                      <NavLink to='/women'>
                        <li onClick={() => closeModalMenu()}>Women</li>
                      </NavLink>
                      <NavLink to='/kids'>
                        <li onClick={() => closeModalMenu()}>Kids</li>
                      </NavLink>
                      <NavLink to='/jersey'>
                        <li onClick={() => closeModalMenu()}>Jersey</li>
                      </NavLink>
                      <NavLink to='/t-shirts'>
                        <li onClick={() => closeModalMenu()}>T-Shirts</li>
                      </NavLink>
                      <NavLink to='/footwear'>
                        <li onClick={() => closeModalMenu()}>Footwear</li>
                      </NavLink>
                      <NavLink to='/accesories'>
                        <li onClick={() => closeModalMenu()}>Accesories</li>
                      </NavLink>
                    </ul>
                  </div>
                  <div className={styles.close} onClick={() => closeModalMenu()}></div>
                </div> :
                <div className={styles.menuButtons} onClick={() => openModalMenu()}></div>
              }
              <NavLink to='/' onClick={() => clearFiltersAndCatalog()}><div className={styles.nbaLogo}></div></NavLink> 
            </div>
            <div className={styles.nbaHeadRight}>
              {data.loginState ?
              <ul className={styles.registerButtons}>
                <NavLink to='/account'>
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
              <div className={styles.searchButtons} onClick={() => openSearchInput()}></div>
              {data.loginState ?
                <NavLink to='/account'>
                  <div className={styles.accountButtons}></div>
                </NavLink> :
                <NavLink to='/log-in'>
                  <div className={styles.accountButtons}></div>
                </NavLink>
              }
              <NavLink to='/cart' className={styles.cart}>
                <div>
                  <img src={cartImg} alt="cart-image" className={styles.cartImg} />
                  <span>{data.cartProducts.length}</span>
                </div>
              </NavLink>
            </div>
          </div>
        }

      <div className={styles.grizzliesHead}>
        <NavLink to='/' onClick={() => clearFiltersAndCatalog()}>
          <img src={logoImg} alt="logo" className={styles.logoImg} />
        </NavLink>
        <div className={styles.searchBlock}>
          <input type="text"  className={styles.searchInput} placeholder='Search' onChange={searchOnMainPage} />
          <div className={styles.searchLogo}></div>
        </div>
      </div>
      <Nav />
    </header>
  );
}