import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = props => {
  let sidebarClasses = 'sidebar';

  if (props.show) {
    sidebarClasses = 'sidebar open';
  }
  
  

  // <!-- A vertical navbar -->
    return (
      <div className="wrapper">
        <nav className={sidebarClasses}>  
          <div className="sidebar-header">
            <h3>MENU</h3>
          </div>

          <ul className="list-unstyled components">
            <li className="active">
              <a href="#profileSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" id="dropdown-toggle">Profile</a>
              <ul className="collapse list-unstyled" id="profileSubmenu">
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/Dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/Violations">Violations</a>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
          <li>
              <a href="https://parking.ucf.edu/" target="_blank" className="parking-services">Parking Services</a>
            </li> 
          </ul>
        {/* <ul>
          <li className="side-item">
            <a className="dropdown-toggle side-link" data-toggle="collapse" aria-expanded="false" href="#profileSubmenu">Profile</a>
            <ul className="collapse" id="profileSubmenu">
              <li><a href="#">My Account</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
          <li className="side-item"><a className="side-link" href="#">Link 2</a></li>
          <li className="side-item"><a className="side-link" href="#">Link 3</a></li>
        </ul> */}
        </nav>
      </div>
    );
};

export default Sidebar;