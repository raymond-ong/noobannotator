import React, { useState } from 'react';
import '../mainEditor.css';
import StyleButton from '../components/styleButton';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator} from 'draft-js';
import { Button, Popup } from 'semantic-ui-react';
import Picker from 'emoji-picker-react';

const styles = {
    link: {
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderRadius: '3px',
        cursor: 'pointer',
    },
  };

const ANNOTATOR_TYPES = [
    {label: 'Comment', style: 'Comment', icon: 'faCommentDots', showIconAndLabel: true},
    {label: 'Yes', style: 'Yes', icon: 'faCheck', showIconAndLabel: true},
    {label: 'No', style: 'No', icon: 'faTimes', showIconAndLabel: true},
    {label: 'Emoji', style: 'Emoji', popup: true, icon: 'faGrin', showIconAndLabel: true},    
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
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );    
  }

  // Set Pointer-Events to none for the SVG to avoid interfering with the mouse cursor and events
export const Link = (props) => {
  console.log("NEW LINKK!!!!", props);
  const {url} = props.contentState.getEntity(props.entityKey).getData();

    return (
        <>
        <span id={'comment-span-'+props.entityKey} style={styles.link}>
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
          <line id={'svg-line1-'+props.entityKey} x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 0, 255, 0.4)" strokeWidth="1"/>
          <line id={'svg-line2-'+props.entityKey} x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 0, 255, 0.4)" strokeWidth="1"/>
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
        logState();
        // const {editorState, urlValue} = this.state;
        const commentText = '';
        const contentState = editorState.getCurrentContent();
    
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {
            comment: commentText,
            color: 'green', // default
            isNew: true, 
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

    const onEmojiClick = (event, emojiObject) => {
        insertEmoji(emojiObject.emoji);
    };

    const logState = () => {
        const content = props.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    return (
        <div className="RichEditor-controls">
        {ANNOTATOR_TYPES.map((type) => {
            if (type.label === 'Emoji') {
                return <Popup
                key={type.label}
                content={<Picker onEmojiClick={onEmojiClick} />}
                on='click'
                pinned
                position='bottom center'
                // There is a bug in semantic ui react that popup does not show when putting react component. Workaround is to surround with a div
                trigger={<span><StyleButton 
                    {...type}
                    onToggle={onClick}
                    />
                    </span>}
                  />
            }
            else {
                return <StyleButton 
                key={type.label}
                {...type}                
                onToggle={onClick}
                />
            }
        } // map function
        ) // map
        }
        </div>
    );
};

export default AnnotatorControls;