import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount () {
    console.log(this.props);
    this.props.onInitIngredients();
}

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => sum + el, 0);
    return sum>0 ;

  }

  purchasingHandler = () => {
    if (this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      console.log(this.props.redirectPath)
      this.props.history.push('/auth');
    } 
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ings) {
      burger =(
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasingHandler}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
          />
        </>
      );
      orderSummary = <OrderSummary
      ingredients={this.props.ings}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
    />
  }
 
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps =state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token !== null,
    redirectPath:state.auth.authRedirectPath
  }
}

const mapDispatchToProps =dispatch=>{
    return{
      onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
      onInitIngredients:()=>dispatch(actions.initIngredients()),
      onInitPurchased:() =>dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);