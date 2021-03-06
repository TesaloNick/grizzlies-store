import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './CatalogBlock.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import CartData from '../../../context';
import CatalogData from './CatalogData'


export default function CatalogBlock(props) {
  const data = useContext(CartData)
  const [modalProduct, setModalProduct] = useState({}) // добавление продукта в модальное окно
  const [isModal, setIsModal] = useState(false) // открытие модального окна
  const [isCloseModal, setIsCloseModal] = useState(false) // открытие модального окна
  const sizeRef = useRef()
  const buyButtonRef = useRef()
  const [isSelectSize, setIsSelectSize] = useState([])

  const addToCart = (event, product) => {
    event.preventDefault()
    const productsInCart = data.cartProducts
    if (!productsInCart.map(item => item.title).includes(product.title)) { // проверка на наличие в корзине
      const updateCart = [...productsInCart, product]
      localStorage.setItem('cartProducts', JSON.stringify(updateCart))
      data.setCartProducts(updateCart)
    } else {
      const i = productsInCart.findIndex(item => item.title === product.title) // находим индекс повторяющегося элемента в корзине
      data.cartProducts[i].quantity = data.cartProducts[i].quantity + modalProduct.quantity // увеличение количества товара в корзине при повторном нажатии
      data.setCartProducts(data.cartProducts)
      localStorage.setItem('cartProducts', JSON.stringify(data.cartProducts))
    }

    buyButtonRef.current.style.backgroundColor = '#5D76A9' // взаимодейсвие после нажатия на кнопку добавления в корзину
    buyButtonRef.current.innerHTML = 'Added'
    setTimeout(() => {
      try {
        buyButtonRef.current.style.backgroundColor = '#e61a4d'
        buyButtonRef.current.innerHTML = 'Add to Cart'
      } catch { }
    }, 1500)
    setIsCloseModal(true)
  }

  const openModalWindow = (product) => {
    const modalProductNew = { ...product, quantity: 1 }
    setModalProduct(modalProductNew)
    setIsModal(true)
    const arraySize = new Array(product.size.length) // создание массива для изменения размеров
    setIsSelectSize(arraySize.fill(false))
  }

  const closeModalWindow = () => {
    setIsModal(false)
    setIsCloseModal(false)
  }

  const changeQuantity = (event) => { // изменение количества товаров в корзине
    const modalProductNew = { ...modalProduct, quantity: +event.target.value }
    setModalProduct(modalProductNew)
  }

  const selectSize = (size, index) => { // выбор размера в модольном окне и зименение стилей
    sizeRef.current.innerHTML = size
    const arraySize = isSelectSize.map((item, idx) => index === idx ? true : false)
    setIsSelectSize(arraySize)
  }

  return (
    <div className={styles.catalogBlock}>

      {props.catalog.map((item, index) => (
        <div className={styles.product}>
          <img src={item.img[0]} className={styles.productImg} alt={item.title} onClick={() => openModalWindow(item)} />
          <div>
            <p className={styles.price}>US$<span>{item.price.toFixed(2)}</span></p>
            <p className={styles.title} onClick={() => openModalWindow(item)}>{item.title}</p>
          </div>
        </div>

      ))}

      {isModal ?
        <div className={styles.modalContainer}>
          <div className={styles.modalBlockClose} onClick={() => closeModalWindow()}></div>
          <div className={styles.modalBlock}>
            <div className={styles.close} onClick={() => closeModalWindow()}></div>
            <div className={styles.modalProduct}>
              <div className={styles.modalImage}>
                <img src={modalProduct.img[0]} alt="" />
              </div>
              <div>
                <h3 className={styles.modalTitle}>{modalProduct.title}</h3>
                <p className={styles.modalPrice}>Your Price: US${modalProduct.price.toFixed(2)}</p>
                <div className={styles.modalSelectBlock}>
                  {modalProduct.size.length ?
                    <div>
                      <div className={styles.modalSizeTitle}>
                        <p>Size</p>
                        <p ref={sizeRef}></p>
                      </div>
                      <ul>
                        {modalProduct.size.map((item, index) => <li className={isSelectSize[index] ? styles.sizeOnClick : styles.sizeOffClick} onClick={() => selectSize(item, index)}>{item}</li>)}
                      </ul>
                    </div> :
                    <p></p>}
                  <p>Quantity</p>
                  <form className={styles.modalSelectQuantity}>
                    <input type="number" min='1' value={modalProduct.quantity} onChange={(event) => changeQuantity(event)} />
                    <button onClick={(event) => addToCart(event, modalProduct)} ref={buyButtonRef}>Add to Cart</button>
                  </form>
                  {isCloseModal ?
                    <div className={styles.modalLinksAfterBuying}>
                      <a onClick={() => closeModalWindow()}>Return to catalog</a>
                      <NavLink to='/cart'>Go to cart</NavLink>
                    </div> :
                    <React.Fragment></React.Fragment>
                  }
                </div>
                <div className={styles.modalInformationBlock}>
                  <h2>Details</h2>
                  <ul>
                    {modalProduct.details.map(item => <li>{item}</li>)}
                  </ul>
                </div>
                <div className={styles.modalInformationBlock}>
                  <h2>Description</h2>
                  <p>{modalProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <React.Fragment></React.Fragment>
      }
    </div>

  );
}