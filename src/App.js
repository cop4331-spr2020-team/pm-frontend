import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import './index.css'
import Main from './components/Main';
// const NavRoute = ({exact, path, component: Component}) => (
// 	<Route exact={exact} path={path} render={(props) => (
// 		 <div className="fullscreen">
// 			  <MainNavbar/>
// 				<Component {...props}/>
// 		 </div>
// 	)}/>
// )

function App() {

  return (
      <div className="App">
        <Main/>
      </div>
  );
}

export default App;
