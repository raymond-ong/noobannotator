import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize';
import {colorToRgbString} from '../helpers/colorHelper';
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

    let styleCommentContainer = {
        border: `1px solid ${colorToRgbString(colorVal, 1)}`,
        borderLeft: `4px solid ${colorToRgbString(colorVal, 1)}`
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
          console.log('[handleClickOutside]', commentVal, 'isEditMode', isEditMode, refWrapper.current && !refWrapper.current.contains(event.target));
          if (refWrapper.current && !refWrapper.current.contains(event.target) && isEditMode) {
              if (!isNewHandled) {
                refCommentTxtArea.current.focus();
                setHandledNew(true);                
              }
              else {
                setEditMode(false);
                props.parentRerender();
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
        console.log('Focused comment', commentVal);
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
            />
        </div>
    </div>
}

export default Comment;