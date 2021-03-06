import React from 'react';
import './styleButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faIcon from "@fortawesome/free-solid-svg-icons";

class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
      if(this.props.isDisabled) {
        className += ' RichEditor-disabledButton';
      }

      return (
        <span className={className} 
          onMouseDown={this.onToggle}
          title={this.props.title}
        >
          {this.props.icon && <FontAwesomeIcon icon={faIcon[this.props.icon]}/>}
          {(this.props.showIconAndLabel || !this.props.icon) && `   ${this.props.label}`}
        </span>
      );
    }
  }

  export default StyleButton