import React from 'react';
import sytles from './Backdrop.module.css';


const backdrop = (props) =>(

  props.show? <div className={sytles.Backdrop} onClick={props.clicked}></div> : null

)


export default backdrop;