import React, {useContext} from 'react';
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

  const product = JSON.parse(localStorage.getItem('cartProducts')) || []

  const classes = useStyles();
  const [state, setState] = React.useState({
    size: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const deleteFromCart = (index) => {
    const updateProductsCart = data.cartProducts.filter((item, idx) => index !== idx)
    localStorage.setItem('cartProducts', JSON.stringify(updateProductsCart))
    data.setCartProducts(updateProductsCart)
  }
  const changeQuantity = (event) => {
    console.log(event);
  }
  
  let sumOfMoney = []
  product.map(item => sumOfMoney.push(item.price))

  return (
    <div className={styles.mainCartBlock}>
      <h2>Your Items</h2>
      <div className={styles.cartBlock}>
        <div>
          {product.map((item, index) => (
            <div className={styles.productBlock}>
              <div className={styles.productImgBlock}>
                <img src={item.img[0]} alt="" />
              </div>
              <div className={styles.productInformationBlock}>
                <p>{item.title}</p>
                <div className={styles.productSelectorBlock}>
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
                  </FormControl>
                  <TextField
                    id="outlined-number"
                    label="Quantity"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={() => changeQuantity()}
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
        <div className={styles.totalPriceBlock}>
          <p>Cart Total</p>
          <p>US$<span>{sumOfMoney.reduce((a,b) => a+b).toFixed(2)}</span></p>
        </div>
      </div>


    </div>
  );
}