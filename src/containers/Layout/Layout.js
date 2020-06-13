import React, { Component } from 'react';
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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
        <main className={styles.Content}>{this.props.children}</main>
      </>
    )
  }
}

export default Layout;