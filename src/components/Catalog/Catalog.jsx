import React from 'react';
import styles from './Catalog.module.css'
import Catalog1 from './CatalogData.jsx'

export default function Catalog() {
  return (
    <div className={styles.catalogContainer}>
      {Catalog1.map(item => (
        <div className={styles.product}>
          <img src={item.img[0]}  className={styles.productImg} alt={item.title} />
          <p className={styles.price}>US$ {item.price.toFixed(2)}</p>
          <p className={styles.title}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}