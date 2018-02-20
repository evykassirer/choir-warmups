import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from './App.js';


const RouterComponent = () => (
  <Router>
    <div>
      <Route exact path="/" render={() => <App page="warmups"/>}/>
      <Route path="/about" render={() => <App page="about"/>}/>
    </div>
  </Router>
)
export default RouterComponent;
