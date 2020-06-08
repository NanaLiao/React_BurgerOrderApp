
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false,
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false,
      },

      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:5
        },
        valid:false,
        touched:false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your mail'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false,
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        validation:{
          required:false
        },
        value:'fastest',
        touched:false,
        valid:true,
      },
    },
    formIsValid:false,
    loading:false

  }

  orderHandler = (e) => {
      e.preventDefault();
      this.setState({ loading: true });
      const formData = {};
      for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData:formData,
      }

      axios.post('/orders.json', order)
        .then(res => {
          this.setState({ loading: false });
          this.props.history.push('/');
        })
        .catch(err => this.setState({ loading: false }));
    }

    
      checkValidity (value, rules) {
        let isValid = [];
        
        if(rules.required) {
            isValid.push(value.trim() !== '');
        }
 
        if(rules.minLength) {
            isValid.push(value.length >= rules.minLength);
        }
 
        if(rules.maxLength) {
            isValid.push(value.length <= rules.maxLength);
        }
 
        return isValid.reduce((acc, el) => {
            return acc && el;
        },true);
    }


  
    inputChangedHandler =(e,identifier) =>{
      const updatedOrderForm = {
        ...this.state.orderForm
      }
     const updatedFormElement =  {
       ...updatedOrderForm[identifier]}

       updatedFormElement.value=e.target.value;
       updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
       updatedFormElement.touched=true;
    
       updatedOrderForm[identifier] = updatedFormElement;
       let formIsValid=true;
       for (let inputIdentifier in updatedOrderForm ){
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
       console.log(formIsValid);

       this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    }

  render() {

    const formElementsArray = [];

    for(let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config : this.state.orderForm[key],
      });

    }

      let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement=>(

            <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={e=>this.inputChangedHandler(e,formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            elementName={formElement.id}

            />
          ))}

          <Button btnType='Success' disabled = {!this.state.formIsValid}>ORDER</Button>
        </form>
      );

      if (this.state.loading) {
        form = <Spinner />
      }
      return (
        <div className={styles.ContactData}>
          <h4>Enter your Contact Data</h4>
          {form}
        </div>
      )

    }

  }

  export default ContactData;