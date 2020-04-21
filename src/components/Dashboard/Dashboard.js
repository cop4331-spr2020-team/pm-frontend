import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import FilterBar from '../Dashboard/FilterBar';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../NavbarToggleButton/Sidebar';
import Overlay from '../Overlay/Overlay';

class Dashboard extends Component {

        // constructor(props){
        //     super(props);
        // }
    state = {
        sideBarOpen: false,
        msg: ""
    };

    navbarToggleHandler = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: !prevState.sideBarOpen,
                msg: "activated"
            };
        });
    };

    overlayClickHandler = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: false,
                msg: "deactivated"
            };
        });
    };

    render(){
        let overlay;

        if (this.state.sideBarOpen){
            overlay = <Overlay click={this.overlayClickHandler}/>;
        }

        return(
            <div style={{height: '100vh'}}>
            <Navbar navbarToggleHandler={this.navbarToggleHandler} />
            <h2 style={{marginLeft: 15}}>Dashboard</h2>
            <hr/>
            <FilterBar />
            <Sidebar show={this.state.sideBarOpen}/>
            {overlay}
            </div>

        );
    }
}

export default Dashboard;