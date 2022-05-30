import React, { useContext, useRef, useEffect } from 'react';
import styles from './Cart.module.css'
import close from './../../assets/img/Cart/close.svg'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CartData from './../../context';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Cart() {
  const data = useContext(CartData)
  const totalPriceRef = useRef(localStorage.getItem('cartProducts') ?  // значение общей суммы товаров в корзине
    (JSON.parse(localStorage.getItem('cartProducts')).length > 0 ?
      data.cartProducts.reduce(function (a, b) {
        return a + b.price * b.quantity
      }, 0).toFixed(2) :
      '0') :
    '0'
  )

  const classes = useStyles();
  const [state, setState] = React.useState({ size: '' });

  const handleChange = (event) => {
    setState({ size: event.target.value });
  };

  const deleteFromCart = (index) => {
    data.cartProducts[index].quantity = 1
    const updateProductsCart = data.cartProducts.filter((item, idx) => index !== idx)
    data.setCartProducts(updateProductsCart)
    localStorage.setItem('cartProducts', JSON.stringify(updateProductsCart))
  }

  const changeQuantity = (event, index) => { // изменение количества товаров в корзине
    const cartProducts = data.cartProducts.map((item, idx) => idx === index ? { ...item, quantity: +event.target.value } : item)
    data.setCartProducts(cartProducts)
    localStorage.setItem('cartProducts', JSON.stringify(data.cartProducts))
    totalPriceRef.current.innerHTML = data.cartProducts.reduce(function (a, b) {
      return a + b.price * b.quantity
    }, 0).toFixed(2)
  }
  const clearCart = () => {
    data.setCartProducts([])
    localStorage.setItem('cartProducts', JSON.stringify([]))
  }

  return (
    <div className={styles.mainCartBlockWrapper}>
      <div className={styles.mainCartBlock}>
        <h2>Your Items</h2>
        <div className={styles.cartBlock}>
          <div>
            {data.cartProducts.map((item, index) => (
              <div className={styles.productBlock}>
                <div className={styles.productImgBlock}>
                  <img src={item.img[0]} alt="" />
                </div>
                <div className={styles.productInformationBlock}>
                  <p>{item.title}</p>
                  <div className={styles.productSelectorBlock}>
                    {item.size.length > 0 ?
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Size</InputLabel>
                        <Select
                          native
                          value={state.size}
                          onChange={handleChange}
                          label="Size"
                          inputProps={{
                            name: 'size',
                            id: 'outlined-age-native-simple',
                          }}
                        >
                          {item.size.map(size => <option value={size}>{size}</option>)}
                        </Select>
                      </FormControl> :
                      <p></p>
                    }
                    <TextField
                      id="outlined-number"
                      value={item.quantity}
                      InputProps={{
                        inputProps: {
                          min: 1
                        }
                      }}
                      label="Quantity"
                      type="number"
                      InputLabelProps={{ shrink: true, }}
                      variant="outlined"
                      onChange={(event) => changeQuantity(event, index)}
                      className={styles.input}
                    />
                  </div>

                </div>
                <div className={styles.productPriceBlock}>
                  <p>US$ <span>{item.price.toFixed(2)}</span></p>
                </div>
                <div className={styles.productCloseButtonBlock}>
                  <img src={close} alt="" onClick={() => deleteFromCart(index)} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalResultCartBlock}>
            <div className={styles.clearCart} onClick={() => clearCart()}>Clear cart</div>
            <div className={styles.totalPriceBlock}>
              <p>Cart Total</p>
              <p>US$
                <span ref={totalPriceRef} >
                  {localStorage.getItem('cartProducts') ?
                    (JSON.parse(localStorage.getItem('cartProducts')).length > 0 ?
                      data.cartProducts.reduce(function (a, b) {
                        return a + b.price * b.quantity
                      }, 0).toFixed(2) :
                      '0') :
                    '0'
                  }
                </span>
              </p>
            </div>
            <div className={styles.checkoutBlock}>
              <div className={styles.checkoutImg}></div>
              <p>Checkout</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
