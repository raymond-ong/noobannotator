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
    
    useEffect(() => {
        if (!isNewHandled) {
            refElem.current.focus();
            setHandledNew(true);
        }
    })

    const onFocusHandler = () => {
        console.log('Focused comment', commentVal);
        // set to Edit mode
        setEditMode(true);
        props.parentRerender();
    }

    const onBlurHandler = () => {
        console.log('Blurred comment', commentVal);
        setEditMode(false);
        props.parentRerender();
        //refElem.current.spellCheck = false;
        // Remove Edit Mode
    }

    const onCommentChanged = (evt) => {
        setCommentVal(evt.target.value);
        props.parentRerender();
    }

    const refElem = useRef(null);

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
    
    const getCommentFooterElement = (isEditMode) => {
        if (!isEditMode) {
            return null;
        }
    
        return <div className="CommentFooter">
        <div className="CommentFooterButton" onMouseDown={onClickOk}>OK</div>
        <div className="CommentFooterButton">Cancel</div>
        <div className="CommentFooterButton CommentFooterButtonDelete">Delete</div>
        </div>
    }
    
    console.log('comment: ', commentVal, 'isEditMode', isEditMode);

    return <div id={'comment-div-' + props.entityKey} 
        className="CommentContainer" 
        onFocus={onFocusHandler} 
        onBlur={onBlurHandler}
        // ref={refElem => refElem && props.isNew && refElem.focus()}
        >
        {getCommentHeaderElement(isEditMode)}
        <div className="CommentBody">
            <TextareaAutosize 
                className="CommentTextArea" 
                value={commentVal} 
                onChange={onCommentChanged}
                ref={refElem}
                placeholder="Comments..."
                spellCheck={false}
            />
        </div>
        {getCommentFooterElement(isEditMode)}
    </div>
}

export default Comment;