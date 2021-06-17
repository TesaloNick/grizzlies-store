import React, {useContext} from 'react';
import styles from './Catalog.module.css'
import CatalogData from './CatalogData.jsx'
import CartData from './../../context';

export default function Catalog() {
  const data = useContext(CartData)

  const addToCart = (index) => {
    const productsInCart = data.cartProducts
    if (!productsInCart.map(item => item.title).includes(CatalogData[index].title)) { // проверка на наличие в корзине
      const updateCart = [...productsInCart, CatalogData[index]]
      localStorage.setItem('cartProducts', JSON.stringify(updateCart))
      data.setCartProducts(updateCart)
    }

  }
  console.log(data.cartProducts);
  return (
    <div className={styles.catalogContainer}>
      {CatalogData.map((item, index) => (
        <div className={styles.product}>
          <img src={item.img[0]}  className={styles.productImg} alt={item.title} />
          <p className={styles.price}>US$<span onClick={() => addToCart(index)}>{item.price.toFixed(2)}</span></p>
          <p className={styles.title}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}