import React, { useContext, useState, useRef } from 'react';
import styles from './CatalogBlock.module.css'
import { Link } from 'react-router-dom'
import CartData from '../../../context';

export default function CatalogBlock(props) {
  const data = useContext(CartData)
  const sizeRef = useRef()
  const buyButtonRef = useRef()
  const [states, setStates] = useState({
    modalProduct: {},
    isModal: false,
    isCloseModal: false,
    isSelectSize: [],
  })
  const { modalProduct, isModal, isCloseModal, isSelectSize } = states

  const addToCart = (event, product) => {
    event.preventDefault()
    const productsInCart = data.cartProducts
    if (!productsInCart.map(item => item.title).includes(product.title)) { // проверка на наличие в корзине
      const updateCart = [...productsInCart, product]
      localStorage.setItem('cartProducts', JSON.stringify(updateCart))
      data.setCartProducts(updateCart)
    } else {
      const i = productsInCart.findIndex(item => item.title === product.title) // находим индекс повторяющегося элемента в корзине
      data.cartProducts[i].quantity += modalProduct.quantity // увеличение количества товара в корзине при повторном нажатии
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
    }, 2000)
    setStates({
      ...states,
      isCloseModal: true,
    })
  }

  const openModalWindow = (product) => {
    setStates({
      ...states,
      modalProduct: { ...product, quantity: 1 },
      isModal: true,
      isSelectSize: new Array(product.size.length).fill(false)
    })
  }

  const closeModalWindow = () => {
    setStates({
      ...states,
      isModal: false,
      isCloseModal: false,
    })
  }

  const changeQuantity = (event) => { // изменение количества товаров в корзине
    setStates({
      ...states,
      modalProduct: {
        ...modalProduct,
        quantity: event.target.value === '' ? '' : +event.target.value
      },
    })
  }

  const selectSize = (size, index) => { // выбор размера в модольном окне и зименение стилей
    sizeRef.current.innerHTML = size
    setStates({
      ...states,
      isSelectSize: isSelectSize.map((item, idx) => index === idx ? true : false)
    })
  }

  return (
    <div className={styles.catalogBlock}>
      {props.catalog.map((item, index) => (
        <div className={styles.product} key={index}>
          <img src={item.img[0]} className={styles.productImg} alt={item.title} onClick={() => openModalWindow(item)} />
          <div className={styles.productInfo}>
            <p className={styles.price}>US$<span>{item.price.toFixed(2)}</span></p>
            <p className={styles.title} onClick={() => openModalWindow(item)}>{item.title}</p>
          </div>
        </div>
      ))}

      {isModal && <div className={styles.modalContainer}>
        <div className={styles.modalBlockClose} onClick={() => closeModalWindow()}></div>
        <div className={styles.modalBlock}>
          <div className={styles.close} onClick={() => closeModalWindow()}></div>
          <div className={styles.modalProduct}>
            <div className={styles.modalImage}>
              <img src={modalProduct.img[0]} alt="" />
            </div>
            <div className={styles.modalProductInfo}>
              <h3 className={styles.modalTitle}>{modalProduct.title}</h3>
              <p className={styles.modalPrice}>Your Price: US${modalProduct.price.toFixed(2)}</p>
              <div className={styles.modalSelectBlock}>
                {modalProduct.size.length ?
                  <div className={styles.modalSelectSize}>
                    <div className={styles.modalSizeTitle}>
                      <p>Size</p>
                      <p ref={sizeRef}></p>
                    </div>
                    <ul>
                      {modalProduct.size.map((item, index) => <li className={isSelectSize[index] ? styles.sizeOnClick : styles.sizeOffClick} onClick={() => selectSize(item, index)} key={index}>{item}</li>)}
                    </ul>
                  </div> :
                  <p></p>}
                <p>Quantity</p>
                <form className={styles.modalSelectQuantity}>
                  <input type="number" min='1' value={modalProduct.quantity} onChange={(event) => changeQuantity(event)} />
                  <button onClick={(event) => addToCart(event, modalProduct)} ref={buyButtonRef}>Add to Cart</button>
                </form>
                {isCloseModal && <div className={styles.modalLinksAfterBuying}>
                  <p onClick={() => closeModalWindow()}>Return to catalog</p>
                  <Link to='/cart'>Go to cart</Link>
                </div>
                }
              </div>
              <div className={styles.modalInformationBlock}>
                <h2>Details</h2>
                <ul>
                  {modalProduct.details.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div className={styles.modalInformationBlock}>
                <h2>Description</h2>
                <p>{modalProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>

  );
}