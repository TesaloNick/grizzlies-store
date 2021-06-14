import React from 'react';
import styles from './Cart.module.css'
import MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth1 from './../../assets/img/Catalog/memphis-grizzlies-nike-association-swingman-jersey-custom-youth_ss4_p-11913891+u-kdua2vcr2i74wv33jpdx+v-667e4f6dc84846de8550c4dae1c6af85.webp'
import MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth2 from './../../assets/img/Catalog/memphis-grizzlies-nike-association-swingman-jersey-custom-youth_ss4_p-11913891+pv-1+u-kdua2vcr2i74wv33jpdx+v-64bd3ffa81fd426ba817b050525b2e4a.webp'
import MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth3 from './../../assets/img/Catalog/memphis-grizzlies-nike-association-swingman-jersey-custom-youth_ss4_p-11913891+pv-2+u-kdua2vcr2i74wv33jpdx+v-62eff6cd35cc49b781eb33c25bb14556.webp'
import uuid from 'react-uuid'
import close from './../../assets/img/Cart/close.svg'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

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
  const product = [{ 
    id: uuid(), 
    img: [
      MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth1,
      MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth2, 
      MemphisGrizzliesNikeAssociationSwingmanJerseyCustomYouth3 
    ],
    title: "Memphis Grizzlies Nike Association Swingman Jersey - Custom - Youth", 
    description: "The Memphis Grizzlies Nike Association Youth Swingman Jersey recreates the authentic detailing of the on-court jersey.", 
    price: 62.95, 
    size: ['S', 'M', 'L'], 
    details: [
      'Machine wash at 30', 
      'Wash inside out separately or with like colours', 
      'Do not Tumble Dry', 
      'Do not iron on print', 
      'Fanatics Branded', 
      '100% cotton', 
    ],
  }]

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Your Items</h2>
      {product.map(item => (
        <div>
          <div>
            <img src={item.img[0]} alt="" />
          </div>
          <div>
            <p>{item.title}</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                label="Age"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                {item.size.map(size => <option value={10}>{size}</option>)}
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
            />
          </div>
          <div>
            <p>US$ <span>{item.price}</span></p>
          </div>
          <div><img src={close} alt="" /></div>
        </div>
      ))}
    </div>
  );
}