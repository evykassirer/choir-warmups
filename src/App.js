import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './App.css';
import logo from './logo.gif';
import githubIcon from './github-icon.png';
import warmups from './warmups.json';

class App extends Component {
  state = {
    warmupFilterText: "",
    selectedFilterTags: [],
  }

  tagSearchChanged = (selected) => {
    this.setState({selectedFilterTags: selected});
  }

  render() {
    const warmupList = warmups["warmups"];
    warmupList.sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
    });

    const tags = new Set();
    for (const warmup of warmupList) {
      warmup.tags.forEach(t => tags.add(t));
    }

    const warmupComponents = [];
    for (const warmup of warmupList) {
      if (!warmup.name.includes(this.state.warmupFilterText)) {
        continue;
      }
      if (this.state.selectedFilterTags.length > 0) {
        let tagsMatch = true;
        for (const tag of this.state.selectedFilterTags) {
          if (!warmup.tags.includes(tag.value)) {
            tagsMatch = false;
          }
        }
        if (!tagsMatch) {
          continue;
        }
      }
      warmupComponents.push(<Warmup key={warmup.name} data={warmup}/>);
      warmupComponents.push(<Divider/>);
    }

    return <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Choir Warmups</h1>
        </header>
        <div className="App-search">
          <AutoComplete
            floatingLabelText="Search by warmup name"
            filter={AutoComplete.fuzzyFilter}
            dataSource={warmupList.map(w => w.name)}
            maxSearchResults={3}
            fullWidth
            onUpdateInput={text => this.setState({warmupFilterText: text})}
          />

          <Select
            name="tag-search-field"
            placeholder="Filter by tags"
            value={this.state.selectedFilterTags}
            onChange={this.tagSearchChanged}
            multi={true}
            options={Array.from(tags).map(t => {
              return {value: t, label: t};
            })}
          />
        </div>

        <div className="warmups-list">
          <List>
            {warmupComponents}
          </List>
        </div>
      </div>
      <div className="view-source">
        <img src={githubIcon} className="github-icon" alt="github icon"/>
        <a
          href="https://github.com/evykassirer/choir-warmups"
          className="view-source-link">
          View source code on GitHub
        </a>
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

    if (data.warmup_sources && data.warmup_sources.length) {
      let source_elements = [];

      for (let i = 0; i < data.warmup_sources.length; i++) {
        const source = data.warmup_sources[i];
        let source_text = source.text;
        if (!source_text) continue;

        if (source.url) {
          source_elements.push(
            <a href={source.url} className="warmup-source-link">
              {source_text}
            </a>
          );
        }
        else {
          source_elements.push(<span>{source_text}</span>);
        }
      }

      if (source_elements.length > 1) {
        source_elements = <ul className="warmup-source-list">
          {source_elements.map(source => <li>{source}</li>)}
        </ul>;
      }

      nestedItems.push(<ListItem
        key={"source"}
        disabled={true}
        children={<div className="warmup-source">
          <span className="warmup-section-title">
            {source_elements.length === 1 ? "Source: " : "Sources:"}
          </span>
          {source_elements}
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
