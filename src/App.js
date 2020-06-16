import React, { Component } from 'react';

import './index.css';
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path='/orders' component={Orders}/>
            <Route path='/auth' component={Auth}/>

          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
