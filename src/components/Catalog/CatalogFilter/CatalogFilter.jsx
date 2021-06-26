import React, {useContext, useState, useEffect} from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';
import FiltersData from './FiltersData';
import CatalogData from './../CatalogBlock/CatalogData'
import {NavLink} from 'react-router-dom'

export default function CatalogFilter() {
  const data = useContext(CartData)
  let filtersTitleArray = []

  const changeHandler = (allFilters, filter) => {
    const filterGroup = data.filters.find(item => allFilters.title === item.title)
    const filtersChecked = filterGroup.filters.map(item => filter.name === item.name ? {...item, isChecked: true} : {...item, isChecked: false})
    const repeatFiltersGroup = {...filterGroup, filters: filtersChecked}
    const changedFilters = data.filters.map(item => repeatFiltersGroup.title === item.title ? repeatFiltersGroup : item)
    // console.log(changedFilters);
    data.setFilters(changedFilters)
    localStorage.setItem('filters', JSON.stringify(changedFilters))

    const filtersTitle = allFilters.title.replace(/\s+/g, '')[0].toLowerCase() + allFilters.title.replace(/\s+/g, '').slice(1)
    const catalogFiltered = CatalogData.filter(item => item[filtersTitle].length > 0)
    const filtersTitleArray1 = filtersTitleArray.length>0 ? [...filtersTitleArray, filtersTitle] : [...filtersTitle]
    console.log(filtersTitleArray1);
    const catalogGroupFiltered = catalogFiltered.filter(item => item[filtersTitle].includes(filter.name))
    // console.log(catalogGroupFiltered);
    data.setCatalogData(catalogGroupFiltered)
  }
  // console.log(data.filters);

  const сlearFilters = () => {
    data.setFilters(FiltersData)
    localStorage.setItem('filters', JSON.stringify(FiltersData))
    data.setCatalogData(CatalogData)
    localStorage.setItem('catalogData', JSON.stringify(CatalogData))
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.сlearFilters} onClick={() => сlearFilters()}>Сlear filters</div>
      {data.filters.map(item => (
        <div className={styles.filterSeparateContainer}>
          <h2>{item.title}</h2>
          {item.filters.map(filter => (
            <div className={styles.filterSeparate}>
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
            </div>
          ))}
        </div>
      ))}
    </div>
  )

}