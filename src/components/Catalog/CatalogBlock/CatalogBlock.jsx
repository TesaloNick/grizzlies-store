import React, {useContext} from 'react';
import styles from './CatalogBlock.module.css'
import CatalogData from '../CatalogData.jsx'
import CartData from '../../../context';

export default function CatalogBlock(props) {
  const data = useContext(CartData)

  const addToCart = (index) => {
    const productsInCart = data.cartProducts
    if (!productsInCart.map(item => item.title).includes(CatalogData[index].title)) { // проверка на наличие в корзине
      const updateCart = [...productsInCart, CatalogData[index]]
      localStorage.setItem('cartProducts', JSON.stringify(updateCart))
      data.setCartProducts(updateCart)
      // console.log('1');
    } else{
      const i = productsInCart.findIndex(item => item.title === CatalogData[index].title) // находим индекс повторяющегося элемента в корзине
      data.cartProducts[i].quantity++ // увеличение количества товара в корзине при повторном нажатии
      data.setCartProducts(data.cartProducts)
      localStorage.setItem('cartProducts', JSON.stringify(data.cartProducts))
      // console.log('2');
    }
    // console.log(data);
  }
  // console.log(catalog.catalog.catalog);
  // console.log(CatalogData.filter(item => item.shopFor.includes('Men')));
  return (
    <div className={styles.catalogBlock}>
      {props.catalog.map((item, index) => (
        <div className={styles.product}>
          <img src={item.img[0]}  className={styles.productImg} alt={item.title} />
          <p className={styles.price}>US$<span onClick={() => addToCart(index)}>{item.price.toFixed(2)}</span></p>
          <p className={styles.title}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}