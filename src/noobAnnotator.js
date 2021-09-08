import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding} from 'draft-js';
import { store } from './store.js';
import 'draft-js/dist/Draft.css';
import './noobAnnotator.css'
import StyleButton from './components/styleButton';


function NoobAnnotator() {
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
    //const rawContent = convertToRaw(contentState);
    //dispatch({type: 'editorStateChanged', data: rawContent});
  }

  const editor = React.useRef(null);
  const focusEditor =  () => {
    editor.current.focus();
  }

  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];

  const BlockStyleControls = (props) => {    
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

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

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': 
      console.log('blockquote!');
        return 'RichEditor-blockquote';
      default: return null;
    }
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
      />
    </div>
  </div>
}

export default NoobAnnotator;