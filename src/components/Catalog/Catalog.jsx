import React from 'react';
import styles from './Catalog.module.css'
import Catalog1 from './CatalogData.jsx'

export default function Catalog() {
  return (
    <div className={styles.catalogContainer}>
      {Catalog1.map(item => (
        <div>
          <img src={item.img2}  className={styles.productImg} alt="Memphis Grizzlies Fanatics Branded Iconic Splatter Graphic T-Shirt" />
          <h2>{item.title}</h2>
          <p>US${item.price}</p>
        </div>
      ))}
    </div>
  );
}