import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding, CompositeDecorator, SelectionState} from 'draft-js';
import { store } from './store.js';
import 'draft-js/dist/Draft.css';
import './mainEditor.css';
import StyleButton from './components/styleButton';
import BlockStyleControls, {getBlockStyle} from './richTextComponents/blockComponents';
import InlineStyleControls from './richTextComponents/inlineComponents';
import AnnotatorControls, {findLinkEntities, Link} from './richTextComponents/annotatorComponents';
import Comment from './components/commentComponent';
import {colorToRgbString} from './helpers/colorHelper';
import {useWindowSize} from './helpers/windowHelper';

const MainEditor = () => {
  const {state, dispatch} = useContext(store); // Warning: everytime there is a change in the store, will force a re-render
  const [width, height] = useWindowSize();
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
    setEditorState(getInitialState());
    // TODO: remove this for now as this causes unnecessary rerender...anyways, we will refactor the file loading/saving machanism
    // Can use useRef to skip initial render
    // https://medium.com/swlh/prevent-useeffects-callback-firing-during-initial-render-the-armchair-critic-f71bc0e03536
    // TODO2: Need to wipe out all entities when document is changed...or use a different way of travering the entities (via convertToRaw)
  }, [state.docCurreFileName]);

  // If comment changes, need to redraw the lines to make sure they are still pointing to the correct coordinates
  const [commentRerender, setCommentReRender] = useState(0);

  const updateComment = (key, data) => {
    const contentState = editorState.getCurrentContent();
    contentState.replaceEntityData(key, data)
    EditorState.set(editorState, { currentContent: contentState });
    setCommentReRender(value => value + 1); // use the parameter passed instead of directly referencing commentRerender state value as it might be stale due to closure
    onChange(editorState);
  }

  const deleteComment = (entityKey, blockKey) => {
    const contentState = editorState.getCurrentContent();
    let blockObj = contentState.getBlockForKey(blockKey);
    blockObj.findEntityRanges(
      (character) => {
        const currEntityKey = character.getEntity();
        if (!currEntityKey || currEntityKey !== entityKey) {
          return false;
        }

        return true;
      },
      (start, end) => {
        console.log('found entity yo remove', start, end);
        var selectionState = SelectionState.createEmpty(blockKey);
        var updatedSelection = selectionState.merge({
          focusOffset: end,
          anchorOffset:start,
        });
        let updatedState = RichUtils.toggleLink(editorState, updatedSelection, null);
        console.log("new state after delete", convertToRaw(updatedState.getCurrentContent()));
        onChange(updatedState);
      }
    );
  }

  const getCommentsAndEntities = () => {
    let currContent = editorState.getCurrentContent();
    let blocks = currContent.getBlockMap();
    let entities = currContent.getAllEntities();
    let ret = [];
  
    // traverse each block
    blocks.forEach((block) => {
      const blockKey = block.key;
      block.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          if (!entityKey) {
            return;
          }
          const entityObj = currContent.getEntity(entityKey);
          if (entityKey !== null && currContent.getEntity(entityKey).getType() === 'COMMENT') {
            console.log('[getComments by block]', entityObj);
            let newObj = {
              key: entityKey,
              entity: entityObj,
              blockKey: blockKey,
              div: <Comment 
              key={entityKey} 
              entityKey={entityKey} 
              entity={entityObj}
              blockKey={blockKey}
              parentRerender={() => setCommentReRender(value => value + 1) }
              parentUpdateComment={updateComment}
              parentDeleteComment={deleteComment}
              {...entityObj.data}
              />
            }
            ret.push(newObj);
          }          
        },
        null
      );    
    });
  
    return ret;
  }

  const [editorState, setEditorState] = useState(() => getInitialState()); // pass in a function to avoid re-running the function unnecessarily
  console.log('MainEditor', convertToRaw(editorState.getCurrentContent()));

  const commentsAndEntities = getCommentsAndEntities(editorState);


  // For drawing line or repositioning comment blocks    
  useEffect(() => {    
    // let currContent = editorState.getCurrentContent();
    // let blocks = currContent.getBlockMap();
    let entities = commentsAndEntities;  
    //console.log("===========UseEffect for All comments Start...===========", 'rerender', commentRerender);
    console.log("===========UseEffect for All comments Start...===========", 'entities count', entities.length);
    let editorElem = document.getElementById('RichEditor-editor');
    let editorChildElem = editorElem.firstChild;

    let editorRect = editorElem.getBoundingClientRect();    
    let editorChildRect = editorChildElem.getBoundingClientRect();    
    entities.forEach(entObj => {    
      const {key, entity} = entObj;
      let spanElem = document.getElementById(`comment-span-${key}`);
      let spanParentElem = document.getElementById(`comment-span-${key}`).parentElement; // for computation related to SVG because SVG and comment-span are siblings
      let line1Elem = document.getElementById(`svg-line1-${key}`);
      let line2Elem = document.getElementById(`svg-line2-${key}`);
      let divElem = document.getElementById(`comment-div-${key}`);
      let svgElem = document.getElementById(`svg-span-${key}`);
      let color = entity.data.color;
      
      if (!spanElem) {
        console.log('[UseEffect] span iter', key, entity.data.comment, 'not found');
        return;
      }
      if (!divElem) {
        console.log('[UseEffect] div iter', key, entity.data.comment, 'not found');
        return;
      }

      console.log("===========UseEffect for comments Start...===========", entity.data.comment);
     
      //console.log('[UseEffect] div iter', key, entity.data.comment, divElem);
      //console.log('[UseEffect] span iter', key, entity.data.comment, spanElem);
      let divRect = divElem.getBoundingClientRect();
      let spanRect = spanElem.getBoundingClientRect();          
      let spanParentRect = spanParentElem.getBoundingClientRect();     
      let svgRect = svgElem.getBoundingClientRect();    

      console.log('svg orig top', svgRect.top);
      svgElem.style.top = `${editorRect.top - spanParentRect.top}px`;
      console.log('svg supposed top', editorRect.top - spanRect.top, svgElem.style.top);
      //svgElem.style.left = '0px'
      svgElem.style.height = editorRect.height - 20; // -20 to account for paddings and new line, and prevent unnecessary scrollbar when the content is just few
      // console.log('span top', spanRect.top, 'result top:', svgElem.style.top);
      // console.log('top', svgElem.style.top, 'editorRect.height', editorRect.height, 'editorElem.clientHeight', editorElem.clientHeight);
      //svgElem.style.height = editorElem.clientHeight;

      // Debug borders
      // spanElem.style.border = '1px solid red';
      // editorElem.style.border = '1px solid blue';
      // svgElem.style.border = '1px solid magenta';

      // Draw a line from:
      // [a] span bottom-right to editor right
      // [b] editor right to div top
      let editorRight = editorElem.getBoundingClientRect().right;
      //console.log('editorElem right', editorRight, 'spanRect', spanRect, 'divRect', divRect);
      console.log('editorRect', editorRect.top);
      console.log('editorChildRect', editorChildRect.top);
      //console.log('divRect', divRect.left);
      console.log('spanRect', spanRect.top);
      console.log('svgRect', svgRect.top);
      if (divRect.left === 679) {
        //debugger
      }
      //console.log('------', divRect.top - editorRect.top);

       // for those with indents (e.g. bulletted), the svg element's left side is also indented
       // -1 because editorChildRect and svgRect in normal scenario differs by 1
      const svgOffset = svgRect.left - editorChildRect.left-2;

      const paddingLeft = 15;
      const paddingRightLeft = 20 + paddingLeft;
      // Use 0.5 to smooth out the lines -- SVG thingy
      const offsetEditorAndSpan = spanRect.top - editorRect.top;
      line1Elem.setAttribute("x1", spanRect.right-paddingLeft-svgOffset);
      line1Elem.setAttribute("x2", editorRight-paddingRightLeft-svgOffset);
      line1Elem.setAttribute("y1", 2.5 + offsetEditorAndSpan);
      line1Elem.setAttribute("y2", 2.5 + offsetEditorAndSpan);

      const divHeightHalf = divRect.height / 2;
      line2Elem.setAttribute("x1", editorRight-paddingRightLeft-svgOffset);
      line2Elem.setAttribute("x2", editorRight-paddingRightLeft + 24 - svgOffset);
      line2Elem.setAttribute("y1", 2.5 + offsetEditorAndSpan);
      line2Elem.setAttribute("y2", divRect.top - editorRect.top + divHeightHalf);      

      // Set the colors
      line1Elem.setAttribute("stroke", colorToRgbString(color, 0.15));
      line2Elem.setAttribute("stroke", colorToRgbString(color, 0.15));
      spanElem.style.backgroundColor = colorToRgbString(color, 0.15);      
      //divElem.style.transform = `rotate(${Math.random()-0.5}deg)`; // -0.5 to 0.5
    });    
    console.log("===========UseEffect for comments End...===========");
  }, [commentRerender, editorState, width, height]); // Note: editorState added to fix issue where user edited some text....but it has side effect about additional re-render
   
  const onChange = (editState) => {       
    setEditorState(editState);
    dispatch({type: 'editorStateChanged', data: editState.getCurrentContent()}); // dispatch so that it's ready to be saved    
  }

  const editor = React.useRef(null);
  const focusEditor =  () => {
    editor.current.focus();
  }

  const toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(
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

  // const handleMouseOverLink = (linkRef) => {
  //   linkRef.current.style.backgroundColor = 'green'
  // }

  // const handleMouseOutLink = () => {
    
  // }

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
      <div className="blockInlineContainer">
        <AnnotatorControls 
          editorState={editorState}
          onChange={setEditorState}
          parentRerender={() => setCommentReRender(!commentRerender)}
          // parentMouseOverLink={handleMouseOverLink }
          // parentMouseOutLink={handleMouseOutLink }
        />
      </div>
      <div className="blockInlineContainer">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
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
      <div className="CommentAreaContainer">{commentsAndEntities.map(ent => ent.div)}</div>
    </div>
  </div>
}

export default MainEditor;