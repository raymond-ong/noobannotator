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

    // renderIcon() {
    //   return <FontAwesomeIcon icon={faCommentDots}/>
    // }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <span className={className} 
          onMouseDown={this.onToggle}
        >
          {this.props.icon && <FontAwesomeIcon icon={faIcon[this.props.icon]}/>}
          {(this.props.showIconAndLabel || !this.props.icon) && `   ${this.props.label}`}
        </span>
      );
    }
  }

  export default StyleButton