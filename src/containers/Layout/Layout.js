import React, { Component } from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state={
    showSideDrawer:false,
  }

  sideDrawerClosedHandler = () =>{
    this.setState({showSideDrawer:false});
  }

sideDrawerToggleHandler=()=>{
  this.setState((prevState)=>{
    return {showSideDrawer:!prevState.showSideDrawer};
  });
}

  render() {
    return (
      <>
        <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuth={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
        <main className={styles.Content}>{this.props.children}</main>
      </>
    )
  }
}


const mapsStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token !== null,
  }
}

export default connect(mapsStateToProps)(Layout);