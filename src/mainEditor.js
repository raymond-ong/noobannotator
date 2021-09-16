import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding, CompositeDecorator} from 'draft-js';
import { store } from './store.js';
import 'draft-js/dist/Draft.css';
import './mainEditor.css';
import StyleButton from './components/styleButton';
import BlockStyleControls, {getBlockStyle} from './richTextComponents/blockComponents';
import InlineStyleControls from './richTextComponents/inlineComponents';
import AnnotatorControls, {findLinkEntities, Link} from './richTextComponents/annotatorComponents';
import Comment from './components/commentComponent';
import {colorToRgbString} from './helpers/colorHelper';

const MainEditor = () => {
  const {state, dispatch} = useContext(store); // Warning: everytime there is a change in the store, will force a re-render
  console.log('MainEditor render', state);
  const decoratorLink = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
]);

  const getInitialState = () => {    
    if (state.editorContent === null) {
      console.log('[MainEditor] getInitialState, createEmpty');
      return EditorState.createEmpty(decoratorLink);
      //return EditorState.createEmpty();
    }
    //return EditorState.createWithContent(convertFromRaw(state.docs[state.docs.length-1].docContent));
    console.log('[MainEditor] getInitialState', convertToRaw(state.editorContent));
    return EditorState.createWithContent(state.editorContent, decoratorLink);
    //return EditorState.createWithContent(state.editorContent);
  }

  // Fix for loading other documents when documents Dropdown is changed
  // TODO: may not be needed if we use proper reducer
  useEffect(() => {
    console.log("useEffect for file name changes:", state.docCurreFileName);
    //setEditorState(getInitialState());
    // TODO: remove this for now as this causes unnecessary rerender...anyways, we will refactor the file loading/saving machanism
  }, [state.docCurreFileName]);

  // If comment changes, need to redraw the lines to make sure they are still pointing to the correct coordinates
  const [commentRerender, setCommentReRender] = useState(false);
  const [editorState, setEditorState] = React.useState(() => getInitialState()); // pass in a function to avoid re-running the function unnecessarily
  console.log('MainEditor', convertToRaw(editorState.getCurrentContent()));


  // For drawing line or repositioning comment blocks    
  useEffect(() => {
    
    let currContent = editorState.getCurrentContent();
    let blocks = currContent.getBlockMap();
    let entities = currContent.getAllEntities();    
    let editorElem = document.getElementById('RichEditor-editor');
    entities.forEach((value, key, map) => {      
      let spanElem = document.getElementById(`comment-span-${key}`);
      let line1Elem = document.getElementById(`svg-line1-${key}`);
      let line2Elem = document.getElementById(`svg-line2-${key}`);
      let divElem = document.getElementById(`comment-div-${key}`);
      let svgElem = document.getElementById(`svg-span-${key}`);
      let color = value.data.color;
      
      if (!spanElem) {
        console.log('[UseEffect] span iter', key, value.data.comment, 'not found');
        return;
      }
      if (!divElem) {
        console.log('[UseEffect] div iter', key, value.data.comment, 'not found');
        return;
      }

      console.log("===========UseEffect for comments Start...===========", value.data.comment);
     
      //console.log('[UseEffect] div iter', key, value.data.comment, divElem);
      //console.log('[UseEffect] span iter', key, value.data.comment, spanElem);
      let divRect = divElem.getBoundingClientRect();
      let spanRect = spanElem.getBoundingClientRect();    
      let editorRect = editorElem.getBoundingClientRect();    

      svgElem.style.top = `${editorRect.top - spanRect.top}px`;
      svgElem.style.height = editorRect.height - 20; // -20 to account for paddings and new line, and prevent unnecessary scrollbar when the content is just few
      // console.log('span top', spanRect.top, 'result top:', svgElem.style.top);
      // console.log('top', svgElem.style.top, 'editorRect.height', editorRect.height, 'editorElem.clientHeight', editorElem.clientHeight);
      //svgElem.style.height = editorElem.clientHeight;

      // Draw a line from:
      // [a] span bottom-right to editor right
      // [b] editor right to div top
      let editorRight = editorElem.getBoundingClientRect().right;
      //console.log('editorElem right', editorRight, 'spanRect', spanRect, 'divRect', divRect);
      //console.log('editorRect', editorRect);
      // console.log('divRect', divRect.left);
      // console.log('spanRect', spanRect.left);
      if (divRect.left === 679) {
        //debugger
      }
      //console.log('------', divRect.top - editorRect.top);

      const paddingLeft = 15;
      const paddingRightLeft = 20 + paddingLeft;
      // Use 0.5 to smooth out the lines -- SVG thingy
      const offsetEditorAndSpan = spanRect.top - editorRect.top;
      line1Elem.setAttribute("x1", spanRect.right-paddingLeft);
      line1Elem.setAttribute("x2", editorRight-paddingRightLeft);
      line1Elem.setAttribute("y1", 0.5 + offsetEditorAndSpan);
      line1Elem.setAttribute("y2", 0.5 + offsetEditorAndSpan);

      line2Elem.setAttribute("x1", editorRight-paddingRightLeft);
      line2Elem.setAttribute("x2", editorRight-paddingRightLeft + 25);
      line2Elem.setAttribute("y1", 0.5 + offsetEditorAndSpan);
      line2Elem.setAttribute("y2", divRect.top - editorRect.top);      

      // Set the colors
      line1Elem.setAttribute("stroke", colorToRgbString(color, 0.5));
      line2Elem.setAttribute("stroke", colorToRgbString(color, 0.5));
      spanElem.style.backgroundColor = colorToRgbString(color, 0.3);      
    });    
    console.log("===========UseEffect for comments End...===========");
  }, [commentRerender, editorState]);
   
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

  const updateComment = (key, data) => {
    const contentState = editorState.getCurrentContent();
    contentState.replaceEntityData(key, data)
    EditorState.set(editorState, { currentContent: contentState });
    onChange(editorState);
  }

  const getComments = () => {
    let currContent = editorState.getCurrentContent();
    let blocks = currContent.getBlockMap();
    let entities = currContent.getAllEntities();
    let ret = [];

    // traverse each block
    blocks.forEach((block) => {
      block.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          if (!entityKey) {
            return;
          }
          const entityObj = currContent.getEntity(entityKey);
          if (entityKey !== null && currContent.getEntity(entityKey).getType() === 'LINK') {
            console.log('[getComments by block]', currContent.getEntity(entityKey));
            ret.push(<Comment 
              key={entityKey} 
              entityKey={entityKey} 
              parentRerender={() => setCommentReRender(!commentRerender)}
              parentUpdateComment={updateComment}
              {...entityObj.data}
              />);
          }          
        },
        null
      );    
      // console.log('[getComments by block] block', block);
      // if (!block.entityRanges || block.entityRanges.length == 0) {
      //   return;
      // }

      // value.entityRanges.forEach(entity => {
      //   let key = entity.key;
      //   console.log('[getComments by block] entity', key, entities[key]);
      // });      
    });

    // entities.forEach((value, key, map) => {
    //   console.log('[getComments] iter', key, value.data.comment)
    //   ret.push(<Comment 
    //     key={key} 
    //     entityKey={key} 
    //     parentRerender={() => setCommentReRender(!commentRerender)}
    //     parentUpdateComment={updateComment}
    //     {...value.data}
    //     />);
    // });
    return ret;
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
      <AnnotatorControls 
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
    <div className="EditorAndCommentContainer">
      <div className={className} onClick={focusEditor} id={className}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onTab={onTab}
          placeholder="Write Something..."
          ref={editor}
          spellCheck={true}
        />
      </div>
      <div className="CommentAreaContainer">{getComments()}</div>
    </div>
  </div>
}

export default MainEditor;