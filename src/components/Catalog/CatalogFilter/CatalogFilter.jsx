import React, {useContext} from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';

export default function CatalogFilter() {
  const data = useContext(CartData)
  const Filters = [
    {
      title: 'Shop For',
      filter: ['Kids', 'Men', 'Women', 'Baby'],
    },
    {
      title: 'Featured Departments',
      filter: ['Face Coverings', 'Headwear', 'Hoodies & Sweatshirts', 'Jerseys', 'T-Shirts'],
    },
    {
      title: 'Trending',
      filter: ['NBA On Court Gear'],
    },
    {
      title: 'Department',
      filter: ['Accessories', 'Face Coverings', 'Footwear', 'Headwear', 'Home & Office', 'Hoodies & Sweatshirts', 'Jackets', 'Jerseys', 'T-Shirts', 'Tailgating'],
    },
    {
      title: 'Featured Brands',
      filter: ['Fanatics Branded', 'Jordan Brand', 'New Era', 'Nike'],
    },
    {
      title: 'Personalised Products',
      filter: ['Personalised'],
    },
    {
      title: 'Players',
      filter: ['Ja Morant', 'Jonas Valanciunas', 'Yuta Watanabe', 'Andre Iguodala'],
    },
  ]
  return (
    <div className={styles.filterContainer}>
      {Filters.map(item => (
        <div className={styles.filterSeparateContainer}>
          <h2>{item.title}</h2>
          {item.filter.map(filter => (
            <div className={styles.filterSeparate}>
              <input type="radio" id={filter} name={item.title} value={filter} className={styles.filterButton} />
              <label for={filter} className={styles.filterLabel}>{filter}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

}