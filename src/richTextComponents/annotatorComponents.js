import React, { useState } from 'react';
import '../noobAnnotator.css';
import StyleButton from '../components/styleButton';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator} from 'draft-js';
import { Button, Popup } from 'semantic-ui-react';
import Picker from 'emoji-picker-react';

const styles = {
    link: {
      color: '#3b5998',
      textDecoration: 'underline',
      border: '1px solid red'
    },
  };

const ANNOTATOR_TYPES = [
    {label: 'Comment', style: 'Comment'},
    {label: 'Yes', style: 'Yes'},
    {label: 'No', style: 'No'},
    {label: 'Emoji', style: 'Emoji', popup: true},    
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

export const Link = (props) => {
    console.log("LINKKKKKKKKKKKKKKK!!!!");
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link}>
        {props.children}
      </a>
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
        const urlValue = 'my comment';
        const contentState = editorState.getCurrentContent();
    
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
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
                    label={type.label}
                    style={type.style}
                    key={type.label}
                    onToggle={onClick}
                    />
                    </span>}
                  />
            }
            else {
                return <StyleButton 
                label={type.label}
                style={type.style}
                key={type.label}
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