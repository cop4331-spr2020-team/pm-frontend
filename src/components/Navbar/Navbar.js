import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaBell, FaUser, FaParking } from 'react-icons/fa'
import axios from 'axios';
import NavbarToggleButton from  '../NavbarToggleButton/NavbarToggleButton';
import './Navbar.css'
const Navbar = props => (

    <header className="toolbar">
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        {/* Show this on mobile to medium screens */}
        <a className="navbar-brand d-lg-none brand" href="#"><FaParking style={{color: '#d39e00', fontSize:'24px'}}/></a>
        {/* Navbar Content */}
        <div className="toolbar-toggle-button">
            <NavbarToggleButton click={props.navbarToggleHandler}/>
        </div>
        <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {/* Hamburger Button */}
                <li className="nav-item">
                    <a href="#" className="nav-link">
                    <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    // data-target="#sidbarMenu"
                    // aria-controls="sidebarMenu" 
                    // aria-expanded="false" 
                    // aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </a>
                </li>
            </ul>
            {/* Show this on large screens */}
            {/* Brand */}
            <a className="navbar-brand d-none d-lg-block brand" href="#"><FaParking style={{color: '#d39e00', fontSize:'24px'}}/><span id="brand-text">arking Services</span></a>
            {/* Nav links */}
            <ul className="navbar-nav list-unstyled ml-auto" id="toolbar-nav-items">
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <FaBell/>
                    </a>
                </li>
                 <li className="nav-item dropdown">
                    <a href="#" 
                    className="nav-link dropdown-toggle mr-2" 
                    id="navbarDropdownMenuLink-3" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    >
                        <FaUser style={{transform: 'scale(1.1)'}}/><span className="ml-2" id="profile-text">Profile</span>
                    </a>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li><a href="#" className="dropdown-item">My Account</a></li>
                            <li><a href="#" className="dropdown-item">Logout</a></li>
                        </ul>
                </li>
            </ul>
        </div>
    </nav>
    </header>
);



export default Navbar;