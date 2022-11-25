import React, { useContext, useState } from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';
import FiltersData from './FiltersData';
import CatalogData from './../CatalogBlock/CatalogData'
import Download from './../../../assets/img/Catalog/CatalogFilter/download.png'
// ---
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// ---

export default function CatalogFilter() {
  const data = useContext(CartData)
  const [isShowFiltersBlock, setIsShowFiltersBlock] = useState(new Array(FiltersData.length).fill(true))
  const [isShowFiltersBlockModal, setIsShowFiltersBlockModal] = useState(new Array(FiltersData.length).fill(false))

  const applyFilter = (allFilters, filter) => {
    const filterGroup = data.filters.find(item => allFilters.title === item.title)
    const filtersChecked = filterGroup.filters.map(item => filter.name === item.name ? { ...item, isChecked: true } : { ...item, isChecked: false })
    const repeatFiltersGroup = { ...filterGroup, filters: filtersChecked }
    const changedFilters = data.filters.map(item => repeatFiltersGroup.title === item.title ? repeatFiltersGroup : item)
    data.setFilters(changedFilters)
    localStorage.setItem('filters', JSON.stringify(changedFilters))

    const filtersTitle = allFilters.title.replace(/\s+/g, '')[0].toLowerCase() + allFilters.title.replace(/\s+/g, '').slice(1)
    const catalogFiltered = CatalogData.filter(item => item[filtersTitle].length > 0)
    const catalogGroupFiltered = catalogFiltered.filter(item => item[filtersTitle].includes(filter.name))
    data.setCatalogData(catalogGroupFiltered)
  }

  const сlearFilters = () => {
    data.setFilters(FiltersData)
    localStorage.setItem('filters', JSON.stringify(FiltersData))
    data.setCatalogData(CatalogData)
    localStorage.setItem('catalogData', JSON.stringify(CatalogData))
  }

  const toggleFiltersBlock = () => {
    return {
      close: (index) => setIsShowFiltersBlock(isShowFiltersBlock.map((item, idx) => index === idx ? false : item)),
      show: (index) => setIsShowFiltersBlock(isShowFiltersBlock.map((item, idx) => index === idx ? true : item)),
    }
  }

  const toggleFiltersBlockModal = () => {
    return {
      close: (index) => setIsShowFiltersBlockModal(isShowFiltersBlockModal.map((item, idx) => index === idx ? false : item)),
      show: (index) => setIsShowFiltersBlockModal(isShowFiltersBlockModal.map((item, idx) => index === idx ? true : false)),
    }
  }
  // ------------------------
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const filtersHead = (item, index, isShow, toggle) => {
    return (
      <div className={styles.filterSeparateContainerTitle}
        onClick={isShow[index] ?
          () => toggle.close(index) :
          () => toggle.show(index)}
      >
        <h2>{item.title}</h2>
        <img className={isShow[index] ? styles.filterArrowImgUp : styles.filterArrowImgDown} src={Download} alt='Download' />
      </div>
    )
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={styles.modalFiltersBlock}>
        {data.filters.map((item, index) => (
          <div className={styles.filterModalSeparateContainer} key={item.title}>
            {filtersHead(item, index, isShowFiltersBlockModal, toggleFiltersBlockModal(index))}
            <div className={isShowFiltersBlockModal[index] ? styles.modalFilterWrapperActive : styles.modalFilterWrapper}>
              {item.filters.map(filter => (
                <p className={styles.modalFiltersItem} onClick={() => applyFilter(item, filter)} key={filter.name}>
                  <span onClick={toggleDrawer(anchor, false)}>{filter.name}</span>
                </p>
              ))}
            </div>
          </div>
        ))
        }
      </List >
    </Box >
  );
  // -----------------------

  return (
    <div className={styles.filterContainer}>
      <div className={styles.сlearFilters} onClick={() => сlearFilters()}>Сlear filters</div>
      {data.filters.map((item, index) => (
        <div className={styles.filterSeparateContainer} key={item.title}>
          {filtersHead(item, index, isShowFiltersBlock, toggleFiltersBlock(index))}
          {isShowFiltersBlock[index] && item.filters.map(filter => (
            <div className={styles.filterSeparate} key={filter.name}>
              <input
                type="radio"
                id={filter.name}
                name={item.title}
                value={filter.name}
                className={styles.filterRadioButton}
                onChange={() => applyFilter(item, filter)}
                checked={filter.isChecked}
              />
              <label htmlFor={filter.name} className={styles.filterLabel}>{filter.name}</label>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.filtersButton}>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className={styles.menuButtons}>
              <div className={styles.filtersInsideImg}></div>
              Filters
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              className={styles.nbaModalMenu}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}