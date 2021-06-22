import React, {useContext, useState, useEffect} from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';
import {NavLink} from 'react-router-dom'

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
      filter: ['Ja Morant', 'Jonas Valanciunas', 'Yuta Watanabe'],
    },
  ]
  const [value1, setValue1] = useState();
  const changeHandler = (event) => {
    event.preventDefault()
    // console.log(event.target.value);
    setValue1(event.target.value)
  }
  useEffect(() => {
    setValue1(value1)
    // console.log('1');
  }, [value1])
  // console.log(value1);
  return (
    <div className={styles.filterContainer}>
      {Filters.map(item => (
        <div className={styles.filterSeparateContainer}>
          <h2>{item.title}</h2>
          {item.filter.map(filter => (
            <NavLink to='/filter/' className={styles.filterSeparate}>
              <div >
                <input 
                  type="radio" 
                  id={filter}
                  name={item.title} 
                  value={filter} 
                  className={styles.filterButton} 
                  onChange={(event) => changeHandler(event)} 
                  checked={value1 === filter ? true : false} 
                />
                <label for={filter} className={styles.filterLabel}>{filter}</label>
              </div>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  )

}