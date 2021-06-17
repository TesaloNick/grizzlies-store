import React, {useContext} from 'react';
import CatalogBlock from './CatalogBlock/CatalogBlock'
import CatalogFilter from './CatalogFilter/CatalogFilter'
import CartData from '../../context';
import styles from './Catalog.module.css'

export default function Catalog() {
  const data = useContext(CartData)

  return (
    <div className={styles.catalogContainer}>
      <CatalogFilter />
      <CatalogBlock />
    </div>
  );
}