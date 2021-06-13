import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import Header from './components/Header/Header'
import Catalog from './components/Catalog/Catalog'
import Footer from './components/Footer/Footer'
import Men from './components/Men/Men'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/'> {/* Route для главной страницы содержит prop exact, благодаря которому пути сравниваются строго*/}
            <Catalog />
          </Route>
          <Route path='/cart'>
            
          </Route>
          <Route path='/men'>
            <Men />
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
