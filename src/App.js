import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import Header from './components/Header/Header'
import Catalog from './components/Catalog/Catalog'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import LogIn from './components/Registration/LogIn'
import SignUp from './components/Registration/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/'> {/* Route для главной страницы содержит prop exact, благодаря которому пути сравниваются строго*/}
            <Catalog />
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
            
          </Route>
          <Route path='/women'>

          </Route>
          <Route path='/kids'>

          </Route>
          <Route path='/jersey'>

          </Route>
          <Route path='/t-shirts'>

          </Route>
          <Route path='/kids'>

          </Route>
          <Route path='/footwear'>

          </Route>
          <Route path='/accesories'>

          </Route>
          <Route path='/sale'>

          </Route>
        </Switch>
      <Footer />
    </BrowserRouter>

    </div>
  );
}

export default App;
