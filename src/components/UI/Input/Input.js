import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
  const inputClasses = [styles.InputElement];
  let validationError = null;
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(styles.Invalid);
    
//can use switch later
    if(props.element == 'zipcode'){
    validationError = <p style={{color:"red"}}> Zipcode must be 5 digits!</p>;
  } 

  if(props.element == 'password'){
    validationError = <p style={{color:"red"}}> Password must be at least 6 digits</p>;
  } 

  }

  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
    case('select'):
    inputElement = <select
     className={inputClasses.join(' ')} 
     value={props.value} onChange={props.changed}>
      {props.elementConfig.options.map(option=>(
        <option key={option.value} value={option.value} onChange={props.changed}>{option.displayValue}</option>
      ))}
       
       </select>;
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    
    </div>
  )



}


export default input;