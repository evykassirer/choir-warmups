import React, { Component } from 'react';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Warmup from './Warmup.js';
import './App.css';
import logo from './logo.gif';
import githubIcon from './github-icon.png';
import warmups from './warmups.json';

class App extends Component {
  state = {
    warmupFilterText: "",
    selectedFilterTags: [],
  }


  tagSearchChanged = (selectedTags) => {
    this.setState({selectedFilterTags: selectedTags});
  }


  sortedWarmupList() {
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
    return warmupList;
  }


  sortedFilteredWarmupList() {
    return this.sortedWarmupList().filter(warmup => {
      if (!warmup.name.includes(this.state.warmupFilterText)) {
        return false;
      }

      for (const tag of this.state.selectedFilterTags) {
        if (!warmup.tags.includes(tag.value)) {
          return false;
        }
      }

      return true;
    });
  }


  tagsList() {
    const warmupList = warmups["warmups"];
    const tags = new Set();
    for (const warmup of warmupList) {
      warmup.tags.forEach(t => tags.add(t));
    }
    return Array.from(tags);
  }


  renderFilters() {
    return <div className="App-search">
      <AutoComplete
        floatingLabelText="Search by warmup name"
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.sortedWarmupList().map(w => w.name)}
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
        options={this.tagsList().map(t => {
          return {value: t, label: t};
        })}
      />
    </div>;
  }


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
    const warmupComponents = [];
    this.sortedFilteredWarmupList().forEach(warmup => {
      warmupComponents.push(<Warmup key={warmup.name} data={warmup}/>);
      warmupComponents.push(<Divider/>);
    });

    return <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Choir Warmups</h1>
        </header>

        { this.renderFilters() }

        <div className="warmups-list">
          <List>
            {warmupComponents}
          </List>
        </div>
      </div>

      { this.renderViewSource() }
    </MuiThemeProvider>;
  }
}


export default App;
