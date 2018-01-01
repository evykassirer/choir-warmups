import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';

// TODO : set up database
import warmups from './warmups.json';

class App extends Component {
  render() {
    const warmupList = warmups["warmups"];
    const warmupComponents = warmupList.map(
      warmup => <Warmup key={warmup.name} data={warmup}/>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Choir Warmups</h1>
        </header>
        {warmupComponents}
      </div>
    );
  }
}

class Warmup extends Component {
  render() {
    const data = this.props.data;
    return <div>{data.description}</div>;
  }
}

export default App;
