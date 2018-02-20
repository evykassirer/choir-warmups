import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';

import WarmupList from './WarmupList.js';
import About from './About.js';

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

  renderHeader() {
    return <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/">
        <h1 className="App-title">Choir Warmups</h1>
      </Link>
      <Link to="/about">[[ about ]]</Link>
    </header>
  }

  render() {
    return <MuiThemeProvider>
      <div className="App">
        { this.renderHeader() }
        { this.props.page === "about" && <About/> }
        { this.props.page === "warmups" && <WarmupList/> }
        { this.renderViewSource() }
      </div>
    </MuiThemeProvider>;
  }
}


export default App;
