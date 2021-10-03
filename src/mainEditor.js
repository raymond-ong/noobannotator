import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
            //console.log('[getComments by block]', entityObj);
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

  const drawConnectorLines = () => {
    let entities = commentsAndEntities;  
    let editorElem = document.getElementById('RichEditor-editor');
    if (!editorElem) {
      console.log('[drawConnectorLines] Editor element is not found.  Most likely because editor is empty.');
      return;
    }
    let editorChildElem = editorElem.firstChild;

    let editorRect = editorElem.getBoundingClientRect();    
    let editorChildRect = editorChildElem.getBoundingClientRect();    

    // reset all svgElem sizes first to get rid of scrollbars intervening during window resize (e.g. reducing window height causes a scrollbar)
    // Tip: Was able to figure this out by adding a setTimeout in calling this function.
    // Without calling setTimeout, the DOMS have not been repainted during window resize when this function is called. 
    //    DOM value manipulations as we step through the code are also just being cached and does not take effect visually (although DOM measurement values given seem to be updated)
    // After adding a setTimeout, the repainting with the new window size has been performed and we can see what's really happening as we step through the code
    //    (e.g. saw a temporary scrollbar during breakpoint, that disappears later).
    entities.forEach(entObj => {   
      const {key, entity} = entObj;
      let svgElem = document.getElementById(`svg-span-${key}`);
      svgElem.style.height = '0px';
      svgElem.style.top = '0px'
    });

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
        console.log('[drawConnectorLines] span iter', key, entity.data.comment, 'not found');
        return;
      }
      if (!divElem) {
        console.log('[drawConnectorLines] div iter', key, entity.data.comment, 'not found');
        return;
      }

      console.log("===========drawConnectorLines for comments Start...===========", entity.data.comment.substring(0, 3));
     
      let divRect = divElem.getBoundingClientRect();
      let spanRect = spanElem.getBoundingClientRect();          
      let spanParentRect = spanParentElem.getBoundingClientRect();     
      let svgRect = svgElem.getBoundingClientRect();    

      //console.log('svg orig top', svgRect.top);
      svgElem.style.height = `${editorRect.height - 20}px`; // -20 to account for paddings and new line, and prevent unnecessary scrollbar when the content is just few
      svgElem.style.top = `${editorRect.top - spanParentRect.top}px`;

      // Debug borders
      // spanElem.style.border = '1px solid red';
      // editorElem.style.border = '1px solid blue';
      // svgElem.style.border = '1px solid magenta';

      // Draw a line from:
      // [a] span bottom-right to editor right
      // [b] editor right to div top
      let editorRight = editorElem.getBoundingClientRect().right;
      console.log('editorRect', editorRect.left);
      console.log('editorChildRect', editorChildRect.left);
      console.log('spanRect', spanRect.left);
      console.log('svgRect', svgRect.left);
      console.log('divRect', divRect.left);

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
    });
  }

  const willCauseOverlflow = (adjustmentFromPrevBot, divHeight, editorHeight, remainingDivHeight) => {
    return adjustmentFromPrevBot + divHeight + remainingDivHeight > editorHeight;
  }

  // Main goal is try to align the span and the div so that it will be easier to see.
  // If main goal cannot be achieved due to space constraints:
  // try to move some comments up to lessen the scrolling
  const adjustDivPositions = () => {
    let entities = commentsAndEntities;  
    let editorElem = document.getElementById('RichEditor-editor');
    if (!editorElem) {
      console.log('[adjustDivPositions] Editor element is not found. Most likely because editor is empty.');
      return;
    }
    let editorRect = editorElem.getBoundingClientRect();    
    const marginBottomComment = 10; // margin-bottom value for each comment 

    const sumDivHeights = entities.reduce( (prev, currEnt) => {
      const {key, entity} = currEnt;
      let divElem = document.getElementById(`comment-div-${key}`);
      let divRect = divElem.getBoundingClientRect();
      return prev + divRect.height + marginBottomComment;
    }, 0);

    console.log('[adjustDivPositions] start, total height divs', sumDivHeights, 'VS Editor Height', editorRect.height);

    let prevBottom = editorRect.top;
    let sumDivsPrev = 0;
    for (let i = 0; i < entities.length; i++) {
      let entObj = entities[i];
      const {key, entity} = entObj;
      let spanElem = document.getElementById(`comment-span-${key}`);
      let divElem = document.getElementById(`comment-div-${key}`);
      if (!spanElem) {
        console.log('[adjustDivPositions] span iter', key, entity.data.comment, 'not found');
        continue;
      }
      if (!divElem) {
        console.log('[adjustDivPositions] div iter', key, entity.data.comment, 'not found');
        continue;
      }

      let divRect = divElem.getBoundingClientRect();
      let spanRect = spanElem.getBoundingClientRect();

      let diffSpanDiv = spanRect.top - divRect.top;
      let supposedTop = spanRect.top;
      let adjustmentFromPrevBot = supposedTop - prevBottom; // margin needed to make exactly align the span and div...but this may be too much so there are more handling below
      if (adjustmentFromPrevBot > 0) {
        let remainingDivHeight = sumDivHeights - sumDivsPrev - divRect.height - marginBottomComment;
        //let willOverflow = willCauseOverlflow(adjustmentFromPrevBot, divRect.height, editorRect.height, sumDivHeights-sumDivsPrev);
        //let willOverflow = prevBottom + adjustmentFromPrevBot + divRect.height + marginBottomComment + remainingDivHeight + 30 > editorRect.height;
        let spaceRequired = editorRect.bottom - prevBottom - divRect.height - marginBottomComment - remainingDivHeight - 10 - 20; // -10 for extra space below, -20 for edit mode
        let willOverflow = spaceRequired < adjustmentFromPrevBot;
        if (willOverflow) {          
          // console.log('[adjustDivPositions] willOverflow adding ', adjustmentFromPrevBot, entity.data.comment.substring(0, 3) + '...space required', spaceRequired);
          // console.log('editorRect.bottom', editorRect.bottom);
          // console.log('divRect.bottom', divRect.bottom);
          // console.log('prevBottom', prevBottom);
          // console.log('remainingDivHeight', remainingDivHeight);
          if (spaceRequired > 0) {
            divElem.style.marginTop = spaceRequired + 'px';
          } 
          else {
            console.log('[adjustDivPositions] Space required is not enough...dont adjust');
          }
        }
        else {
          //console.log('[adjustDivPositions] Adjusted element', entity.data.comment.substring(0, 3), 'by', adjustmentFromPrevBot, 'height', divRect.height);
          divElem.style.marginTop = adjustmentFromPrevBot + 'px';
        }
      }
      else {
        // means there will be overlap with previous element; do nothing
        //console.log(`[adjustDivPositions] We cannot adjust this elem (${entity.data.comment.substring(0, 3)}) because will overlap with previous elements`, adjustmentFromPrevBot);
        // Just remove the previously set marginTop. There is a rerender (editorStateChange) right before a new comment is added. This pre-render could set the marginTop.
        divElem.style.marginTop = ''; 
      }
      
      sumDivsPrev += divRect.height + marginBottomComment;
      prevBottom = divElem.getBoundingClientRect().bottom;
    }
  }

  // For drawing line or repositioning comment blocks    
  useLayoutEffect(() => {        
    console.log("===========UseEffect for All comments Start...===========");
    
    // Call the SVG function drawing asynchronously because it is relies on DOM element already in-place/repainted.
    // During Window resize (via double click of window header), this function is called before actual repainting has been done (even after changing to useLayoutEffect)
    setTimeout(() => {
      adjustDivPositions();
      drawConnectorLines();
    }, 0);

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