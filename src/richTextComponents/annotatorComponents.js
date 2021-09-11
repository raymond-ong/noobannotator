import React, { useState } from 'react';
import '../noobAnnotator.css';
import StyleButton from '../components/styleButton';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding} from 'draft-js';
import { Button, Popup } from 'semantic-ui-react';
import Picker from 'emoji-picker-react';



const ANNOTATOR_TYPES = [
    {label: 'Comment', style: 'Comment'},
    {label: 'Yes', style: 'Yes'},
    {label: 'No', style: 'No'},
    {label: 'Emoji', style: 'Emoji', popup: true},    
];

export const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': 
      console.log('blockquote!');
        return 'RichEditor-blockquote';
      default: return null;
    }
  }

const AnnotatorControls = (props) => {    
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const onClick = (style) => {
        console.log("[AnnotatorControls] onClick", style);
        if (style === 'Yes') {
            insertEmoji('✅')
        }
        else if (style === 'No') {
            insertEmoji('❌')
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