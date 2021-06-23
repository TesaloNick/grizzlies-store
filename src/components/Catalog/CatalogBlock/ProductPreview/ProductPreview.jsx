import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProductPreview.module.css'
import CartData from '../../../../context';


const ProductPreview = ( {match} ) => {
    const data = useContext(CartData)
    // const catalog = JSON.parse(localStorage.getItem('catalogData')) 
    const [product, setProduct] = useState(data.catalogData.find(item => item.id === match.params.id))

    
    // useEffect(() => {
    //     console.log(match);
    //     const id = match.params.id;
    //     const newProduct = catalog.find(item => item.id === id)
    //     setProduct(newProduct);
    // }, [])
    
    console.log(product);
    
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBlock}>
                <NavLink to='/'>
                    <div className={styles.close}>Вернуться на главную</div>
                </NavLink>
                <div className={styles.modalProduct}>
                    <h3 className={styles.modalTitle}>{product.title}</h3>
                    <div className={styles.modalImage}>
                        <img src={product.img[0]} alt="" />
                    </div>
                    <p>{product.description}</p>
                    <p>US$ {product.price}</p>
                </div>
            </div>
        </div>

    )
}

export default ProductPreview