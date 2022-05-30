import React, { useContext } from 'react';
import CatalogBlock from './CatalogBlock/CatalogBlock'
import CatalogFilter from './CatalogFilter/CatalogFilter'
import CartData from '../../context';
import styles from './Catalog.module.css'

export default function Catalog(props) {
  const data = useContext(CartData)

  // console.log(props.catalog);
  return (
    <div className={styles.catalogContainerWrapper}>
      <div className={styles.catalogContainer}>
        <CatalogFilter />
        <CatalogBlock catalog={props.catalog} />
      </div>
    </div>
  );
}