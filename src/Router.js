import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from './App.js';


const RouterComponent = () => (
  <Router>
    <div>
      <Route exact path={process.env.PUBLIC_URL + "/"} render={() => <App page="warmups"/>}/>
      <Route path={process.env.PUBLIC_URL + "/about"} render={() => <App page="about"/>}/>
    </div>
  </Router>
)
export default RouterComponent;
