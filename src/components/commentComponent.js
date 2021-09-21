import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize';
import {colorToRgbString} from '../helpers/colorHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import './commentComponent.css';

/**
 * For showing the comment of a particular text on the right side of the editor
 * @param {*} props 
 * @returns 
 */
const Comment = (props) => {
    let [isNewHandled, setHandledNew] = useState(!props.isNew);
    let [isEditMode, setEditMode] = useState(!!props.isNew);
    let [colorVal, setColorVal] = useState(props.color);
    let [commentVal, setCommentVal] = useState(props.comment);

    
    const refCommentTxtArea = useRef(null);
    const refWrapper = useRef(null);
    //const randomTilt = useRef(Math.random()-0.5);
    const randomTilt = useRef(0);

    let styleCommentContainer = {
        //border: `1px solid ${colorToRgbString(colorVal, 1)}`,
        //borderLeft: `16px solid ${colorToRgbString(colorVal, 1)}`,
        // background: "-webkit-linear-gradient(315deg, transparent 5px, #c00 5px)", 
        transform: `rotate(${randomTilt.current}deg)`
    }

    let styleColorIcon = {
        color: `${colorVal}`
    }

    let styleTextArea = {
        backgroundColor: 'rgba(0,0,0,0)',
        
    }

    let styleCommentBody = {
        backgroundColor: colorToRgbString(colorVal, 0.15),
    }    
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          console.log('[commentComponent][handleClickOutside]', commentVal, 'isEditMode', isEditMode, refWrapper.current && !refWrapper.current.contains(event.target));
          if (refWrapper.current && !refWrapper.current.contains(event.target)) {
              if (!isNewHandled) {
                refCommentTxtArea.current.focus();
                setHandledNew(true);                
                console.log('[commentComponent][handleClickOutside] processing for new components done');
              }
              else if (isEditMode){
                setEditMode(false);
                props.parentRerender();
                console.log('[commentComponent][handleClickOutside] processing for non-new components done');
              }
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [refWrapper, isEditMode, isNewHandled]);

    const onFocusHandler = () => {
        console.log('[commentComponent] Focused comment', commentVal);
        // set to Edit mode
        setEditMode(true);
        props.parentRerender();
    }

    const onCommentChanged = (evt) => {
        setCommentVal(evt.target.value);
        props.parentRerender();
        let newData = {
            comment: evt.target.value,
            color: colorVal
        }
        props.parentUpdateComment(props.entityKey, newData);
    }

    const onColorChanged = (evt) => {
        setColorVal(evt.target.value);
        props.parentRerender();
        let newData = {
            comment: commentVal,
            color: evt.target.value
        }
        props.parentUpdateComment(props.entityKey, newData);
    }

    const handleDeleteComment = () => {
        props.parentDeleteComment(props.entityKey, props.blockKey);
    }

    const getCommentHeaderElement = (isEditMode) => {
        if (!isEditMode) {
            return null;
        }
    
        return <div className="CommentHeader">
                <div className="CommentHeaderCaption">Edit Comment</div>
                <div className="CommentHeaderColor">
                    <div className="ColorField">
                        <input className="CommentHeaderColorInput" placeholder="Color" onChange={onColorChanged} defaultValue={colorVal}></input>
                        <Icon style={styleColorIcon} name="square"/>
                    </div>
                    <div className="deleteCommentBtn" onClick={handleDeleteComment}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </div>
                </div>                                    
            </div>;
    }
   
    console.log('[commentComponent render]', commentVal, 'isEditMode', isEditMode);
    return <div id={'comment-div-' + props.entityKey} 
        className="CommentContainer" 
        style={styleCommentContainer}
        onFocus={onFocusHandler} 
        ref={refWrapper}
        >
        {getCommentHeaderElement(isEditMode)}
        <div className="CommentBody" style={styleCommentBody}>
            <TextareaAutosize 
                className="CommentTextArea" 
                value={commentVal} 
                onChange={onCommentChanged}
                ref={refCommentTxtArea}
                placeholder="Comments..."
                spellCheck={false}
                style={styleTextArea} 
                autoFocus={isEditMode}
            />
        </div>
    </div>
}

export default Comment;