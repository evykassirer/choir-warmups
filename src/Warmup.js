import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';

import './Warmup.css';

class Warmup extends Component {
  renderDescription(description) {
    return <ListItem
      key={"description"}
      disabled={true}
      children={<div className="warmup-description">
          {description}
      </div>}
    />
  }

  renderImage(imageName, name) {
    return <ListItem
      key={"image"}
      disabled={true}
      children={<img
        src={`${process.env.PUBLIC_URL}/warmup_images/${imageName}`}
        alt={name}
        className="warmup-image"
      />}
    />
  }

  renderLoveBecause(loveBecause) {
    return <ListItem
        key={"love_because"}
        disabled={true}
        children={<div className="warmup-love">
          <span className="warmup-section-title">
            I love this warmup because:
          </span> {loveBecause}
        </div>}
      />
  }

  renderSources(warmup_sources) {
    let source_elements = [];

    for (let i = 0; i < warmup_sources.length; i++) {
      const source = warmup_sources[i];
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

    // if there's more than one source, it's displayed as a bulleted list
    if (source_elements.length > 1) {
      source_elements = <ul className="warmup-source-list">
        {source_elements.map(source => <li>{source}</li>)}
      </ul>;
    }

    return <ListItem
      key={"source"}
      disabled={true}
      children={<div className="warmup-source">
        <span className="warmup-section-title">
          {source_elements.length === 1 ? "Source: " : "Sources:"}
        </span>
        {source_elements}
      </div>}
    />;
  }

  render() {
    const data = this.props.data;
    const nestedItems = [];

    if (data.description) {
      nestedItems.push(this.renderDescription(data.description));
    }

    if (data.image) {
      nestedItems.push(this.renderImage(data.image, data.name));
    }

    if (data.love_because) {
      nestedItems.push(this.renderLoveBecause(data.love_because));
    }

    if (data.warmup_sources && data.warmup_sources.length) {
      nestedItems.push(this.renderSources(data.warmup_sources));
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

export default Warmup;
