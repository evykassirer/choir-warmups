import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';

import './App.css';
import logo from './logo.gif';
import warmups from './warmups.json';

class App extends Component {
  render() {
    const warmupList = warmups["warmups"];
    const warmupComponents = [<Divider/>];
    for (const warmup of warmupList) {
      warmupComponents.push(<Warmup key={warmup.name} data={warmup}/>);
      warmupComponents.push(<Divider/>);
    }
    return <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Choir Warmups</h1>
        </header>
        <div className="warmups-list">
          <List>
            {warmupComponents}
          </List>
        </div>
      </div>
    </MuiThemeProvider>;
  }
}

class Warmup extends Component {
  render() {
    const data = this.props.data;
    const nestedItems = [];

    if (data.description) {
      nestedItems.push(<ListItem
        key={"description"}
        disabled={true}
        children={<div className="warmup-description">
            {data.description}
        </div>}
      />)
    }

    if (data.image) {
      nestedItems.push(<ListItem
        key={"image"}
        disabled={true}
        children={<img
          src={`${process.env.PUBLIC_URL}/warmup_images/${data.image}`}
          alt={data.name}
          className="warmup-image"
        />}
      />)
    }

    if (data.love_because) {
      nestedItems.push(<ListItem
        key={"love_because"}
        disabled={true}
        children={<div className="warmup-love">
          <span className="warmup-section-title">
            I love this warmup because:
          </span> {data.love_because}
        </div>}
      />)
    }

    if (data.warmup_source && data.warmup_source.text) {
      let source = data.warmup_source.text;
      if (data.warmup_source.url) {
        source = <a href={data.warmup_source.url} className="warmup-source-link">
          {source}
        </a>
      }
      nestedItems.push(<ListItem
        key={"source"}
        disabled={true}
        children={<div className="warmup-source">
          <span className="warmup-section-title">
            Source:
          </span> {source}
        </div>}
      />)
    }

    const nameAndTags = <div>
      <div className="warmup-title">
        {data.name}
      </div>
      {data.tags && <div className="warmup-tags">
        tags: {data.tags.join(", ")}
      </div>}
    </div>

    return <ListItem
      children={nameAndTags}
      initiallyOpen={false}
      primaryTogglesNestedList={true}
      nestedItems={nestedItems}
    />;
  }
}

export default App;
