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



export default App;
