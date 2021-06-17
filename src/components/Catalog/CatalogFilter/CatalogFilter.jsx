import React, {useContext} from 'react';
import styles from './CatalogFilter.module.css'
import CartData from '../../../context';

export default function CatalogFilter() {
  const data = useContext(CartData)
  const filters = [
    {
      title: 'Shop For',
      filter: ['Kids', 'Men', 'Women', 'Baby']
    },
    {
      title: 'Featured Departments',
      filter: ['Face Coverings', 'Headwear', 'Hoodies & Sweatshirts', 'Jerseys', 'T-Shirts']
    },
    {
      title: 'Trending',
      filter: ['NBA On Court Gear']
    },
    {
      title: 'Department',
      filter: ['Accessories', 'Face Coverings', 'Footwear', 'Headwear', 'Home & Office', 'Hoodies & Sweatshirts', 'Jackets', 'Jerseys', 'T-Shirts', 'Tailgating']
    },
    {
      title: 'Featured Brands',
      filter: ['Fanatics Branded', 'Jordan Brand', 'New Era', 'Nike']
    },
    {
      title: 'Personalised Products',
      filter: ['Personalised']
    },
    {
      title: 'Players',
      filter: ['Ja Morant', 'Jonas Valanciunas', 'Yuta Watanabe', 'Andre Iguodala']
    },
  ]
  return (
    <div>
      {filters.map(item => (
        <div>
          <h2>{item.title}</h2>
          <div>
            {item.filter.map(aim => (
              <div>
                <input type="radio" id="huey" name="drone" value="huey" checked>
                <label for="huey"></label>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  )
}