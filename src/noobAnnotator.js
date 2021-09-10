import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding} from 'draft-js';
import { store } from './store.js';
import 'draft-js/dist/Draft.css';
import './noobAnnotator.css'
import StyleButton from './components/styleButton';
import BlockStyleControls, {getBlockStyle} from './richTextComponents/blockComponents';
import InlineStyleControls from './richTextComponents/inlineComponents';
import AnnotatorControls from './richTextComponents/annotatorComponents';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import '@draft-js-plugins/emoji/lib/plugin.css';


const NoobAnnotator = () => {
  const {state, dispatch} = useContext(store); // Warning: everytime there is a change in the store, will force a re-render
  const getInitialState = () => {    
    if (state.editorContent === null) {
      console.log('[NoobAnnotator] getInitialState, createEmpty');
      return EditorState.createEmpty();      
    }
    //return EditorState.createWithContent(convertFromRaw(state.docs[state.docs.length-1].docContent));
    console.log('[NoobAnnotator] getInitialState', convertToRaw(state.editorContent));
    return EditorState.createWithContent(state.editorContent);
  }

  // Fix for loading other documents when documents Dropdown is changed
  // TODO: may not be needed if we use proper reducer
  useEffect(() => {
    console.log("useEffect", state.docCurreFileName);
    setEditorState(getInitialState());
  }, [state.docCurreFileName]);
  

  const [editorState, setEditorState] = React.useState(() => getInitialState()); // pass in a function to avoid re-running the function unnecessarily
  console.log('NoobAnnotator', convertToRaw(editorState.getCurrentContent()));
  //const [editorState, setEditorState] = React.useState(state.editorContent);


  const onChange = (editState) => {    
    setEditorState(editState);
    const contentState = editorState.getCurrentContent();
    dispatch({type: 'editorStateChanged', data: contentState});
  }

  const editor = React.useRef(null);
  const focusEditor =  () => {
    editor.current.focus();
  }

  const toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }

  const onTab = (e) => {
    const maxDepth = 4;
    setEditorState(RichUtils.onTab(e, editorState, maxDepth));
  }

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const emojiPlugin = createEmojiPlugin({
  });
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

  return <div className="RichEditor-root">
    <div className="draftToolBar">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <AnnotatorControls 
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
    <div className={className} onClick={focusEditor}>
      <Editor
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        //onChange={setEditorState}
        onTab={onTab}
        placeholder="Write Something..."
        ref={editor}
        spellCheck={true}
        plugins={[emojiPlugin]}
      />
      <EmojiSuggestions />
      <EmojiSelect />
    </div>
  </div>
}

export default NoobAnnotator;