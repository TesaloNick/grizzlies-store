import React, { useContext, useState, useRef } from 'react';
import styles from './Header.module.css'
import logoImg from './../../assets/img/Header/logo.svg'
import cartImg from './../../assets/img/Header/cart1.png'
import Nav from './Nav/Nav'
import { Link, useHistory } from 'react-router-dom'
import CartData from './../../context';
import CatalogData from './../Catalog/CatalogBlock/CatalogData'
import FiltersData from './../Catalog/CatalogFilter/FiltersData'
import ModalMenu from './ModalMenu/ModalMenu';
// ---

export default function Header() {
  const data = useContext(CartData)
  const [isSearch, setIsSearch] = useState(false)
  const inputSearchRef = useRef()
  const { push } = useHistory()

  const exitFromAccount = () => {
    data.setLoginState(false)
    localStorage.setItem('loginState', JSON.stringify(false))
  }

  const searchOnMainPage = (event) => {
    const searchText = event.target.value;
    if (!searchText) {
      data.setCatalogData(CatalogData)
      return
    }

    push('/')
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
    inputSearchRef.current.focus()
  }
  const closeSearchInput = () => {
    setIsSearch(false)
    data.setCatalogData(CatalogData)
  }

  return (
    <header className={styles.header}>
      <div className={styles.nbaHeadWrapper}>
        {!isSearch && <div className={styles.nbaHead}>
          <div className={styles.nbaHeadLeft}>
            <ModalMenu />
            <Link to='/' onClick={() => clearFiltersAndCatalog()}><div className={styles.nbaLogo}></div></Link>
          </div>
          <div className={styles.nbaHeadRight}>
            {data.loginState ?
              <ul className={styles.registerButtons}>
                <Link to='/account'><li>My account</li></Link>
                <li onClick={() => exitFromAccount()}>Exit</li>
              </ul> :
              <ul className={styles.registerButtons}>
                <Link to='/sign-up'><li>Sign Up</li></Link>
                <Link to='/log-in'><li>Log In</li></Link>
              </ul>
            }
            <div className={styles.searchButtons} onClick={() => openSearchInput()}></div>
            {data.loginState ?
              <Link to='/account'><div className={styles.accountButtons}></div></Link> :
              <Link to='/log-in'><div className={styles.accountButtons}></div></Link>
            }
            <Link to='/cart' className={styles.cart}>
              <img src={cartImg} alt="cart" className={styles.cartImg} />
              <span>{data.cartProducts.length}</span>
            </Link>
          </div>
        </div>
        }
        <div className={isSearch ?
          `${styles.searchBlockLittle} ${styles.active}` :
          styles.searchBlockLittle
        }>
          <input type="text" className={styles.searchInputLittle} placeholder='Search' onChange={searchOnMainPage} ref={inputSearchRef} />
          <div className={styles.searchLittleClose} onClick={() => closeSearchInput()}></div>
        </div>
      </div>
      <div className={styles.grizzliesHeadWrapper}>
        <div className={styles.grizzliesHead}>
          <Link to='/' onClick={() => clearFiltersAndCatalog()}><img src={logoImg} alt="logo" className={styles.logoImg} /></Link>
          <div className={styles.searchBlock}>
            <input type="text" className={styles.searchInput} placeholder='Search' onChange={searchOnMainPage} />
            <div className={styles.searchLogo}></div>
          </div>
        </div>
      </div>
      <Nav />
    </header >
  );
}