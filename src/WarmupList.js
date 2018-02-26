import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import Select from 'react-select';
import Toggle from 'material-ui/Toggle';
import 'react-select/dist/react-select.css';

import Warmup from './Warmup.js';
import warmups from './warmups.json';
import exercises from './exercises.json';

class WarmupList extends Component {
	state = {
	  warmupFilterText: "",
	  selectedFilterTags: [],
	  showExercises: false,
	  showWarmups: true,
	}


	tagSearchChanged = (selectedTags) => {
	  this.setState({selectedFilterTags: selectedTags});
	}


	toggleExercises = (event, isInputChecked) => {
		this.setState({showExercises: isInputChecked});
	}

	toggleWarmups = (event, isInputChecked) => {
		this.setState({showWarmups: isInputChecked});
	}


	sortedWarmupList() {
	  const warmupList = warmups["warmups"];
	  warmupList.forEach(warmup => warmup["isExercise"] = false);
	  const exerciseList = exercises["exercises"];
	  exerciseList.forEach(exercise => exercise["isExercise"] = true);
	  const list = warmupList.concat(exerciseList);
	  list.sort(function(a, b) {
	      if (a.name.toLowerCase() < b.name.toLowerCase()) {
	        return -1;
	      }
	      if (a.name.toLowerCase() > b.name.toLowerCase()) {
	        return 1;
	      }
	      return 0;
	  });
	  return list;
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

	    if (!this.state.showExercises) {
	    	if (warmup.isExercise) {
	    		return false;
	    	}
	    }

	    if (!this.state.showWarmups) {
	    	if (!warmup.isExercise) {
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
	  return <div className="warmups-search">
	    <AutoComplete
	      floatingLabelText="Search by name"
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

	    <div className="warmupExercisetoggles">
		    <Toggle
	        label="Show warmups"
	        toggled={this.state.showWarmups}
		    	onToggle={this.toggleWarmups}
	      />
  	    <Toggle
          label="Show exercises"
          toggled={this.state.showExercises}
  	    	onToggle={this.toggleExercises}
        />
	    </div>
	    <div className="exerciseHelpText">
	      (exercises are used to teach in rehearsal instead of warmup time)
	     </div>
	  </div>;
	}


	render() {
		const warmupComponents = [];
		this.sortedFilteredWarmupList().forEach(warmup => {
		  warmupComponents.push(<Warmup key={warmup.name} data={warmup}/>);
		  warmupComponents.push(<Divider/>);
		});
		return <div className="warmups">
			{ this.renderFilters() }

			 <div className="warmups-list">
			  <List>
			    {warmupComponents}
			  </List>
			</div>
		</div>;
	}
}

export default WarmupList;
