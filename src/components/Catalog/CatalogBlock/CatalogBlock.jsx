import React, {useContext, useState} from 'react';
import styles from './CatalogBlock.module.css'
import CatalogData from '../CatalogData.jsx'
import { NavLink } from 'react-router-dom'
import CartData from '../../../context';

export default function CatalogBlock(props) {
  const data = useContext(CartData)
  const [isModal, setIsModal] = useState(false)
  const [modalProduct, setModalProduct] = useState({})

  const addToCart = (index) => {
    const productsInCart = data.cartProducts
    if (!productsInCart.map(item => item.title).includes(data.catalogData[index].title)) { // проверка на наличие в корзине
      const updateCart = [...productsInCart, data.catalogData[index]]
      localStorage.setItem('cartProducts', JSON.stringify(updateCart))
      data.setCartProducts(updateCart)
    } else{
      const i = productsInCart.findIndex(item => item.title === data.catalogData[index].title) // находим индекс повторяющегося элемента в корзине
      data.cartProducts[i].quantity++ // увеличение количества товара в корзине при повторном нажатии
      data.setCartProducts(data.cartProducts)
      localStorage.setItem('cartProducts', JSON.stringify(data.cartProducts))
    }
  }

  const openModalWindow = (index) => {
    const productInModalWindow = data.catalogData[index]
    setModalProduct(productInModalWindow)
    setIsModal(true)
  }

  const closeModalWindow = () => {
    setIsModal(false)
  }

  return (
    <div className={styles.catalogBlock}>
      {props.catalog.map((item, index) => (
        <div className={styles.product}>
          <img src={item.img[0]}  className={styles.productImg} alt={item.title} onClick={() => openModalWindow(index)} />
          <p className={styles.price}>US$<span onClick={() => addToCart(index)}>{item.price.toFixed(2)}</span></p>
          <p className={styles.title} onClick={() => openModalWindow(index)}>{item.title}</p>
        </div>
      ))}
      {isModal ? 
        <div className={styles.modalContainer}>
          <div className={styles.modalBlock}>
            <div className={styles.close} onClick={() => closeModalWindow()}></div>
            <div className={styles.modalProduct}>
              <div className={styles.modalImage}>
                <img src={modalProduct.img[0]} alt="" />
              </div>
              <div>
                <h3 className={styles.modalTitle}>{modalProduct.title}</h3>
                <p>US$ {modalProduct.price}</p>
                <div>
                  <p>Size</p>
                  <ul>
                    {modalProduct.size.map(item => <li>{item}</li>)}
                  </ul>
                  <p>Quantity</p>
                  <form>
                    <input type="number" />
                    <button>Add to Cart</button>
                  </form>
                </div>
                <div>
                  <h2>Details</h2>
                  <ul>
                    {modalProduct.details.map(item => <li>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h2>Description</h2>
                  <p>{modalProduct.description}</p>
                </div>
              </div>

            </div>
          </div>
        </div> : 
        <div></div>
      }
    </div>

  );
}