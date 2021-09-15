import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize';
import './commentComponent.css';

/**
 * For showing the comment of a particular text on the right side of the editor
 * @param {*} props 
 * @returns 
 */
const Comment = (props) => {
    let [isNewHandled, setHandledNew] = useState(!props.isNew);
    let [isEditMode, setEditMode] = useState(!!props.isNew);
    let [color, setColor] = useState('blue');
    let [commentVal, setCommentVal] = useState(props.comment);

    
    const refCommentTxtArea = useRef(null);
    const refWrapper = useRef(null);
    
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
              }
          }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("click", handleClickOutside);
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
            color: 'green'
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
                        <input className="CommentHeaderColorInput" placeholder="Color"></input>
                        <Icon style={{color:"#0000ff"}} name="square"/>
                    </div>
                </div>                    
            </div>;
    }

    const onClickOk = () => {
        // need to tell parent to persist the comment and color into the Editor State
        let newData = {
            comment: commentVal,
            color: 'green'
        }
        props.parentUpdateComment(props.entityKey, newData);
    }
    
    console.log('[commentComponent render]', commentVal, 'isEditMode', isEditMode);
    return <div id={'comment-div-' + props.entityKey} 
        className="CommentContainer" 
        onFocus={onFocusHandler} 
        //onBlur={onBlurHandler}
        ref={refWrapper}
        >
        {getCommentHeaderElement(isEditMode)}
        <div className="CommentBody">
            <TextareaAutosize 
                className="CommentTextArea" 
                value={commentVal} 
                onChange={onCommentChanged}
                ref={refCommentTxtArea}
                placeholder="Comments..."
                spellCheck={false}
            />
        </div>
    </div>
}

export default Comment;