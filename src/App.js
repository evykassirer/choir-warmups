import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WarmupList from './WarmupList.js';

import './App.css';
import logo from './logo.gif';
import githubIcon from './github-icon.png';

class App extends Component {
  renderViewSource() {
    return <div className="view-source">
      <img src={githubIcon} className="github-icon" alt="github icon"/>
      <a
        href="https://github.com/evykassirer/choir-warmups"
        className="view-source-link">
        View source code on GitHub
      </a>
    </div>
  }

  render() {
    return <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Choir Warmups</h1>
        </header>

        <WarmupList/>
      </div>

      { this.renderViewSource() }
    </MuiThemeProvider>;
  }
}


export default App;
