import { useState, useRef, useEffect } from 'react';
import {colorToRgbString} from '../helpers/colorHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import {handleHoverComment} from '../helpers/hoverHelper';
import autosize from 'autosize';

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
        //transform: `rotate(${randomTilt.current}deg)`
    }

    let styleColorIcon = {
        color: `${colorVal}`,
        marginRight: '4px'
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
          console.log('[commentComponent][handleClickOutside]', commentVal.substring(0, 3), 'isEditMode', isEditMode, refWrapper.current && !refWrapper.current.contains(event.target));
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
              autosize(refCommentTxtArea.current);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        autosize(refCommentTxtArea.current);
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
                <div className="CommentHeaderCaption" title="Edit Comment">Edit Comment</div>
                <div className="CommentHeaderColor">
                    <div className="ColorField" title="Input CSS Color (e.g. #f00, red)">
                        <input className="CommentHeaderColorInput" placeholder="Color" onChange={onColorChanged} defaultValue={colorVal}></input>
                        <FontAwesomeIcon style={styleColorIcon} icon={faSquare}/>
                    </div>
                    <div className="deleteCommentBtn" onClick={handleDeleteComment} title="Delete Comment">
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </div>
                </div>                                    
            </div>;
    }
   
    console.log('[commentComponent render]', commentVal.substring(0, 3), 'isEditMode', isEditMode);
    return <div id={'comment-div-' + props.entityKey} 
        className="CommentContainer" 
        style={styleCommentContainer}
        onFocus={onFocusHandler} 
        onMouseOver={() => handleHoverComment(refWrapper, props.entityKey, colorVal, true)}
        onMouseOut={() => handleHoverComment(refWrapper, props.entityKey, colorVal, false)}
        ref={refWrapper}
        >
        {getCommentHeaderElement(isEditMode)}
        <div className="CommentBody" style={styleCommentBody}>
            <textarea
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