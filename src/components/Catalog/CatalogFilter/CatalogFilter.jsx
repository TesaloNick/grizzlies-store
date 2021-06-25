import React, {useContext, useState, useEffect} from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';
import {NavLink} from 'react-router-dom'

export default function CatalogFilter() {
  const data = useContext(CartData)
  const Filters = [
    {
      title: 'Shop For',
      filters: [
        {name: 'Kids', isChecked: false}, 
        {name: 'Men', isChecked: false}, 
        {name: 'Women', isChecked: false}, 
        {name: 'Baby', isChecked: false}
      ],
    },
    {
      title: 'Featured Departments',
      filters: [
        {name: 'Face Coverings', isChecked: false}, 
        {name: 'Headwear', isChecked: false}, 
        {name: 'Hoodies & Sweatshirts', isChecked: false}, 
        {name: 'Jerseys', isChecked: false},
        {name: 'T-Shirts', isChecked: false}
      ],
    },
    {
      title: 'Trending',
      filters: [
        {name: 'NBA On Court Gear', isChecked: false}
      ],
    },
    {
      title: 'Department',
      filters: [
        {name: 'Accessories', isChecked: false}, 
        {name: 'Face Coverings', isChecked: false}, 
        {name: 'Footwear', isChecked: false}, 
        {name: 'Headwear', isChecked: false},
        {name: 'Home & Office', isChecked: false}, 
        {name: 'Hoodies & Sweatshirts', isChecked: false}, 
        {name: 'Jackets', isChecked: false}, 
        {name: 'Jerseys', isChecked: false},
        {name: 'T-Shirts', isChecked: false},
        {name: 'Tailgating', isChecked: false},
      ]
    },
    {
      title: 'Featured Brands',
      filters: [
        {name: 'Fanatics Branded', isChecked: false}, 
        {name: 'Jordan Brand', isChecked: false}, 
        {name: 'New Era', isChecked: false}, 
        {name: 'Nike', isChecked: false}
      ],
    },
    {
      title: 'Personalised Products',
      filters: [
        {name: 'Personalised', isChecked: false}, 
      ],
    },
    {
      title: 'Players',
      filters: [
        {name: 'Ja Morant', isChecked: false}, 
        {name: 'Jonas Valanciunas', isChecked: false}, 
        {name: 'Yuta Watanabe', isChecked: false}, 
      ],
    },
  ]
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(Filters))
  })

  // localStorage.setItem('filters', JSON.stringify(Filters))

  const changeHandler = (allFilters, filter) => {
    const filterGroup = data.filters.find((item) => allFilters.title === item.title)
    const filter1 = filterGroup.filters.map((item, idx) => filter.name === item.name ? {...item, isChecked: true} : {...item, isChecked: false})
    const a = {...filterGroup, filters: filter1}
    const filter2 = data.filters.map(item => a.title === item.title ? a : item)
    console.log(filter2);
    // map((item, idx) => allFilters.title === item.title && allFilters.filter.name === item.filter.name ? {...item, filter.isChecked: true} : item)
    // setFilterName(filterRadio)
    data.setFilters(filter2)
    // localStorage.setItem('filters', JSON.stringify(data.filters))

  }

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(data.filters))

  }, [changeHandler])

  return (
    <div className={styles.filterContainer}>
      {JSON.parse(localStorage.getItem('filters')).map(item => (
        <div className={styles.filterSeparateContainer}>
          <h2>{item.title}</h2>
          {item.filters.map(filter => (
            <NavLink to='/filter/' className={styles.filterSeparate}>
              <input 
                type="radio" 
                id={filter.name}
                name={item.title} 
                value={filter.name} 
                className={styles.filterButton} 
                onChange={() => changeHandler(item, filter)} 
                checked={filter.isChecked} 
              />
              <label for={filter.name} className={styles.filterLabel}>{filter.name}</label>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  )

}