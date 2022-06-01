import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';
import FiltersData from './FiltersData';
import CatalogData from './../CatalogBlock/CatalogData'
import Download from './../../../assets/img/Catalog/CatalogFilter/download.png'
import Upload from './../../../assets/img/Catalog/CatalogFilter/upload.svg'
import { NavLink } from 'react-router-dom'

export default function CatalogFilter() {
  const data = useContext(CartData)
  const [isShowFiltersBlock, setIsShowFiltersBlock] = useState(new Array(FiltersData.length).fill(true))
  const [isShowFiltersBlockModal, setIsShowFiltersBlockModal] = useState(new Array(FiltersData.length).fill(false))
  let filtersTitleArray = []
  const [isModalFilters, setIsModalFilters] = useState(false) // открытие модального окна с фильтрами

  const applyFilter = (allFilters, filter) => {
    const filterGroup = data.filters.find(item => allFilters.title === item.title)
    const filtersChecked = filterGroup.filters.map(item => filter.name === item.name ? { ...item, isChecked: true } : { ...item, isChecked: false })
    const repeatFiltersGroup = { ...filterGroup, filters: filtersChecked }
    const changedFilters = data.filters.map(item => repeatFiltersGroup.title === item.title ? repeatFiltersGroup : item)
    data.setFilters(changedFilters)
    localStorage.setItem('filters', JSON.stringify(changedFilters))

    const filtersTitle = allFilters.title.replace(/\s+/g, '')[0].toLowerCase() + allFilters.title.replace(/\s+/g, '').slice(1)
    const catalogFiltered = CatalogData.filter(item => item[filtersTitle].length > 0)
    const filtersTitleArray1 = filtersTitleArray.length > 0 ? [...filtersTitleArray, filtersTitle] : [...filtersTitle]
    const catalogGroupFiltered = catalogFiltered.filter(item => item[filtersTitle].includes(filter.name))
    data.setCatalogData(catalogGroupFiltered)
    setTimeout(() => setIsModalFilters(false), 200)
  }

  const сlearFilters = () => {
    data.setFilters(FiltersData)
    localStorage.setItem('filters', JSON.stringify(FiltersData))
    data.setCatalogData(CatalogData)
    localStorage.setItem('catalogData', JSON.stringify(CatalogData))
  }

  const showFiltersBlock = (index) => {
    const newShowFiltersBlock = isShowFiltersBlock.map((item, idx) => index === idx ? false : item)
    setIsShowFiltersBlock(newShowFiltersBlock)
  }
  const closeFiltersBlock = (index) => {
    const newShowFiltersBlock = isShowFiltersBlock.map((item, idx) => index === idx ? true : item)
    setIsShowFiltersBlock(newShowFiltersBlock)
  }

  const showFiltersBlockModal = (index) => {
    const newShowFiltersBlock = isShowFiltersBlockModal.map((item, idx) => index === idx ? false : item)
    setIsShowFiltersBlockModal(newShowFiltersBlock)
  }
  const closeFiltersBlockModal = (index) => {
    const newShowFiltersBlock = isShowFiltersBlockModal.map((item, idx) => index === idx ? true : false)
    setIsShowFiltersBlockModal(newShowFiltersBlock)
  }

  const openModalFilters = () => { // открытие и закрытие модального окна с фильтрами
    setIsModalFilters(true)
  }
  const closeModalFilters = () => {
    setIsModalFilters(false)
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.сlearFilters} onClick={() => сlearFilters()}>Сlear filters</div>
      {data.filters.map((item, index) => (
        isShowFiltersBlock[index] ?
          <div className={styles.filterSeparateContainer}>
            <div className={styles.filterSeparateContainerTitle}>
              <h2>{item.title}</h2>
              <img className={styles.filterArrowImg} onClick={() => showFiltersBlock(index)} src={Download} alt='Download' />
            </div>
            {item.filters.map(filter => (
              <div className={styles.filterSeparate}>
                <input
                  type="radio"
                  id={filter.name}
                  name={item.title}
                  value={filter.name}
                  className={styles.filterRadioButton}
                  onChange={() => applyFilter(item, filter)}
                  checked={filter.isChecked}
                />
                <label for={filter.name} className={styles.filterLabel}>{filter.name}</label>
              </div>
            ))}
          </div> :
          <div className={styles.filterSeparateContainer}>
            <div className={styles.filterSeparateContainerTitle}>
              <h2>{item.title}</h2>
              <img className={styles.filterArrowImg} onClick={() => closeFiltersBlock(index)} src={Upload} alt='Upload' />
            </div>
          </div>
      ))}
      <div className={styles.filtersButton} onClick={() => openModalFilters()}>
        <div className={styles.filtersInsideImg}></div>
        Filters
      </div>
      {isModalFilters ?
        <div className={styles.modalFiltersContainer}>
          <div className={styles.modalFiltersBlockClose} onClick={() => closeModalFilters()}></div>
          <div className={styles.modalFiltersBlock}>
            <h2>Filters</h2>
            {data.filters.map((item, index) => (
              isShowFiltersBlockModal[index] ?
                <div className={styles.filterModalSeparateContainer}>
                  <div className={styles.filterSeparateContainerTitle} onClick={() => showFiltersBlockModal(index)}>
                    <h2>{item.title}</h2>
                    <img className={styles.filterArrowImg} src={Download} alt='Download' />
                  </div>
                  {item.filters.map(filter => (
                    <p onClick={() => applyFilter(item, filter)}>{filter.name}</p>
                  ))}
                </div> :
                <div className={styles.filterModalSeparateContainer}>
                  <div className={styles.filterSeparateContainerTitle} onClick={() => closeFiltersBlockModal(index)}>
                    <h2>{item.title}</h2>
                    <img className={styles.filterArrowImg} src={Upload} alt='Upload' />
                  </div>
                </div>
            ))}
          </div>
          <div className={styles.closeFiltersModal} onClick={() => closeModalFilters()}></div>
        </div> :
        <React.Fragment></React.Fragment>
      }


    </div>
  )
}