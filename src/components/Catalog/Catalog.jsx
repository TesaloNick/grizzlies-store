import React from 'react';
import CatalogBlock from './CatalogBlock/CatalogBlock'
import CatalogFilter from './CatalogFilter/CatalogFilter'
import styles from './Catalog.module.css'

export default function Catalog(props) {

  return (
    <div className={styles.catalogContainerWrapper}>
      <div className={styles.catalogContainer}>
        <CatalogFilter />
        <CatalogBlock catalog={props.catalog} />
      </div>
    </div>
  );
}