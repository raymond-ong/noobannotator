import React, { useRef, useState } from 'react';
import '../mainEditor.css';
import StyleButton from '../components/styleButton';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator} from 'draft-js';
import { Button, Popup } from 'semantic-ui-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart';
import { Popover } from 'react-tiny-popover'
import {handleHoverLink} from '../helpers/hoverHelper';

const styles = {
    link: {
        border: "2px solid rgba(50, 50, 50, 0.1)", // grayish outline
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderRadius: '5px',
        cursor: 'pointer',
        transform: "rotate(-1deg)",
        lineHeight: '1.7', // to avoid overlapping with possible comment below
        // transition: "all 0.3s"
    },
  };

const ANNOTATOR_TYPES = [
    {label: 'Comment', style: 'Comment', icon: 'faCommentDots', showIconAndLabel: true, title: 'Highlight text to add Comments', requiresSelection: true},
    {label: 'Yes', style: 'Yes', icon: 'faCheck', showIconAndLabel: true, title: 'Add Check Mark', requiresSelection: false},
    {label: 'No', style: 'No', icon: 'faTimes', showIconAndLabel: true, title: 'Add X Mark', requiresSelection: false},
    {label: 'Emoji', style: 'Emoji', popup: true, icon: 'faGrin', showIconAndLabel: true, title: 'Add Emoji', requiresSelection: false},    
];

export function findLinkEntities(contentBlock, callback, contentState) {
    
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey)
        {
            console.log('findLinkEntities', entityKey, contentState.getEntity(entityKey).getType());
        }
        
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'COMMENT'
        );
      },
      callback
    );    
  }



  // Set Pointer-Events to none for the SVG to avoid interfering with the mouse cursor and events
export const Link = (props) => {
  console.log("NEW LINKK!!!!", props);
  //const data = props.contentState.getEntity(props.entityKey).getData();
  const linkRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

    return (
        <>
        <span id={'comment-span-'+props.entityKey} 
          style={styles.link} 
          ref={linkRef} 
          onMouseOver={() => handleHoverLink(linkRef, props.entityKey, line1Ref, line2Ref, props.contentState.getEntity(props.entityKey).getData(), true )}
          onMouseOut={() => handleHoverLink(linkRef, props.entityKey, line1Ref, line2Ref, props.contentState.getEntity(props.entityKey).getData(), false )}>
        {props.children}
        </span>
        <svg id={'svg-span-'+props.entityKey} style={{position: "absolute", 
                                                width: "calc(100% + 100px)", 
                                                height: "500px", 
                                                left: "0", 
                                                cursor: "default", 
                                                zIndex: "100",
                                                marginRight: "-200px",
                                                display: "float",                                                 
                                                pointerEvents: "none"}}>
          <line id={'svg-line1-'+props.entityKey} x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 0, 255, 0.4)" strokeWidth="2" ref={line1Ref}/>
          <line id={'svg-line2-'+props.entityKey} x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 0, 255, 0.4)" strokeWidth="2"ref={line2Ref}/>
        </svg>
        </>
    
    );
  };


const AnnotatorControls = (props) => {    
    const {editorState} = props;
    const selection = editorState.getSelection();
    /** Link/Comment Start */
    const decoratorLink = new CompositeDecorator([
        {
          strategy: findLinkEntities,
          component: Link,
        },
    ]);
    //EditorState.set(editorState, {decorator: decoratorLink});

    const confirmLink = () => {
        console.log('confirmLink start');
        if (editorState.getSelection().isCollapsed()) {
          console.log('confirmLink: no selection is made. Exiting function.');
          return;
        }
        logState();
        // const {editorState, urlValue} = this.state;
        const commentText = '';
        const contentState = editorState.getCurrentContent();
    
        const contentStateWithEntity = contentState.createEntity(
          'COMMENT',
          'MUTABLE',
          {
            comment: commentText,
            color: 'green', // default
            isNew: true, 
            parentMouseOver: props.parentMouseOverLink,
            parentMouseOut: props.parentMouseOutLink,
          }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        
        // Apply entity
        let nextEditorState = EditorState.set(editorState, 
          { currentContent: contentStateWithEntity }
        );
    
        // Apply selection
        nextEditorState = RichUtils.toggleLink( nextEditorState, 
          nextEditorState.getSelection(), entityKey 
        );
        props.onChange(nextEditorState);
        props.parentRerender();
        console.log('confirmLink after onChange');
        // logState();
      }
      /** Link/Comment End */

    

    const onClick = (style) => {
        console.log("[AnnotatorControls] onClick", style);
        if (style === 'Yes') {
            insertEmoji('✅')
        }
        else if (style === 'No') {
            insertEmoji('❌')
        }
        else if (style === 'Comment') {
            confirmLink();
        }
        // else if (style === 'Emoji') {
        //   setIsPopoverOpen(!isPopoverOpen);
        // }
    }// onclick - end

    const insertEmoji = (emoji) => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        //const txt = '&#x' + text + ';';
        let nextEditorState = EditorState.createEmpty();
        if (selection.isCollapsed()) {
            const nextContentState = Modifier.insertText(contentState, selection, emoji);
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
                );
        } 
        else {
            const nextContentState = Modifier.replaceText(contentState, selection, emoji);
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            );
        } //else
        props.onChange(nextEditorState);

    }

    const onEmojiSelect = (emojiObject) => {
      console.log("onEmojiSelect", emojiObject);
      insertEmoji(emojiObject.native);
    };

    const logState = () => {
        const content = props.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div className="RichEditor-controls">
        {ANNOTATOR_TYPES.map((type) => {
            if (type.label === 'Emoji') {
                return <Popover
                key={type.label}
                isOpen={isPopoverOpen}
                positions={['bottom']}
                onClickOutside={() => setIsPopoverOpen(false)}
                containerStyle={{zIndex: 9999}}
                // content={<div>Hi! I'm popover content.</div>}
                content={<Picker
                  onSelect={onEmojiSelect}
                  title={"Select Emoji"}
                />}
                // There is a bug in semantic ui react that popup does not show when putting react component. Workaround is to surround with a div
                >
                  <span onClick={() => {
                    console.log('Popover trigger clicked');
                    setIsPopoverOpen(true)}}> 
                    <StyleButton 
                    {...type}
                    onToggle={onClick}
                    />
                    </span>
              </Popover>
            }
            else {
                return <StyleButton 
                key={type.label}
                {...type}                
                onToggle={onClick}
                isDisabled={type.requiresSelection && selection.isCollapsed()}
                />
            }
        } // map function
        ) // map
        }
        </div>
    );
};

export default AnnotatorControls;