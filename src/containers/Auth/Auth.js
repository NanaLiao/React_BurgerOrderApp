import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styels from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },

      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup:true
  };

  componentDidMount(){
    // means we are trying to redirect to checkout, even if we are not building a burger
    if(!this.props.buildingBurger && this.props.authRedirectPatch !=='/'){
      this.props.onSetAuthRedirectPath();
    }

  }

  checkValidity(value, rules) {
    let isValid = [];

    if (rules.required) {
      isValid.push(value.trim() !== '');
    }

    if (rules.minLength) {
      isValid.push(value.length >= rules.minLength);
    }

    if (rules.maxLength) {
      isValid.push(value.length <= rules.maxLength);
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid.push(pattern.test(value));
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid.push(pattern.test(value));
    }

    return isValid.reduce((acc, el) => {
      return acc && el;
    }, true);
  };


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
  }

  switchAuthModeHandler = () =>{
    this.setState(prevState=>{
      return {isSignup:!prevState.isSignup};
    })
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        element={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={e => this.inputChangedHandler(e, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ));

    if (this.props.loading){
      form = <Spinner/>
    };

    let errorMessage = null;
    if (this.props.error){
    errorMessage = <p>{this.props.error.message}</p>
    }

    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={styels.Auth}>
        {authRedirect}
        <p style={{color:'red'}}>{errorMessage}</p>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
    <Button clicked={this.switchAuthModeHandler} 
             btnType='Danger'>
               SWITCH TO {this.state.isSignup ? 'SIGNIN':'SIGNUP'}
               </Button>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger:state.burgerBuilder.building,
    authRedirectPath:state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
    onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);