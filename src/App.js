import React, {useState, useReducer} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import Header from './components/Header/Header'
import Catalog from './components/Catalog/Catalog'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import LogIn from './components/Registration/LogIn'
import SignUp from './components/Registration/SignUp'
import CartData from './context';
import CatalogData from './components/Catalog/CatalogData'

function App() {
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cartProducts')) || [])
  const [users, setUsers] = React.useState(JSON.parse(localStorage.getItem('usersData')) || [])
  const [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem('loginState')) || false)


  return (
    <div className="App">
      <BrowserRouter>
        <CartData.Provider value={{cartProducts, setCartProducts, users, setUsers, loginState, setLoginState}}>
          <Header />
            <Switch>
              <Route exact path='/'> {/* Route для главной страницы содержит prop exact, благодаря которому пути сравниваются строго*/}
                <Catalog catalog={CatalogData} />
              </Route>
              <Route path='/sign-up'>
                <SignUp />
              </Route>
              <Route path='/log-in'>
                <LogIn />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/men'>
                <Catalog catalog={CatalogData.filter(item => item.shopFor.includes('Men'))} />
              </Route>
              <Route path='/women'>
                <Catalog catalog={CatalogData.filter(item => item.shopFor.includes('Women'))} />
              </Route>
              <Route path='/kids'>
                <Catalog catalog={CatalogData.filter(item => item.shopFor.includes('Kid'))} />
              </Route>
              <Route path='/jersey'>
                <Catalog catalog={CatalogData.filter(item => item.department.includes('Jerseys'))} />
              </Route>
              <Route path='/t-shirts'>
                <Catalog catalog={CatalogData.filter(item => item.department.includes('T-Shirts'))} />
              </Route>
              <Route path='/footwear'>
                <Catalog catalog={CatalogData.filter(item => item.department.includes('Footwear'))} />
              </Route>
              <Route path='/accesories'>
                <Catalog catalog={CatalogData.filter(item => item.department.includes('Accessories'))} />
              </Route>
              <Route path='/filter'>
                <Catalog catalog={CatalogData.filter(item => item.department.includes('Accessories'))} />
              </Route>
            </Switch>
          <Footer />
        </CartData.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
