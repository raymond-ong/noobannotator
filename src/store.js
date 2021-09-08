import React, {createContext, useReducer} from 'react';
import {localSaveContent} from './helpers/localStorageHelper.js';
import {localListDocs} from './helpers/localStorageHelper.js'
//
import {EditorHelper} from './helpers/editorHelper';

/**
 * Gets the initial state for the store
 * @returns 
 */
const GetInitialState = () => {
    let ret = {
        /**
         * List of documents from the Local Storage (raw content)
         */
        docs: [],
        /**
         * Currently active document; 
         * Only used for initialization...TODO may not be needed
         */
        //activeDoc: null,
        /**
         * Current Editor Content (not raw)
         */
        editorContent: null,
        /**
         * Is the current editor dirty
         */
        editorDirty: false,
        /**
         * To set the Save button text as either "Save" or "Save New" when user inputs something 
         */
        isDocNameNew: false,
        docCurreFileName: null,
    }

    // Get the list of documents from localStorage
    ret.docs = localListDocs();
    if (ret.docs.length > 0) {
        //ret.activeDoc = ret.docs[ret.docs.length -1]; // set the last one as the active document
        ret.editorContent = EditorHelper.getInitialContent(ret);
    }

    return ret;
}

const initialState = GetInitialState();
const store = createContext(initialState);
const { Provider } = store;

/**
 * Use this to encapsulate React child elements that need to access context api data and reducer
 * @param {children} React child elements
 * @returns 
 */
const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case 'save':
            console.log("[reducer] save");
            const newStateSave = {...state}// do something with the action
            let rawContent = EditorHelper.convertToRawContent(state.editorContent);
            let newDocs = localSaveContent(rawContent, state.docCurreFileName);
            if (newStateSave.isDocNameNew) {
                newStateSave.isDocNameNew = false;
                newStateSave.docs = newDocs;
            }

            //localSaveContent(state.editorContent, state.docCurreFileName);
            return newStateSave;
        case 'editorStateChanged':
            console.log("[reducer] editorStateChanged");
            const newStateEditor = {...state}// do something with the action
            newStateEditor.editorContent = action.data;
            return newStateEditor;
        case 'docInputChanged':
            // [1] Rename Save/Save New button
            let {isDocNameNew, fileName} = action.data;
            console.log("[reducer] docInputChanged", isDocNameNew, fileName);
            if (isDocNameNew === state.isDocNameNew && fileName === state.docCurreFileName) {
                return state; // optimize
            }
            const newStateDocName = {...state}// do something with the action
            newStateDocName.isDocNameNew = isDocNameNew;
            newStateDocName.docCurreFileName = fileName;        

            // [2] Load the existing document that matches (TODO: should not come here if there are unsaved changes)
            EditorHelper.setContent(newStateDocName, fileName);

            return newStateDocName;            
        default:
          throw new Error();
          console.log('Reducer detected Save');
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };
  
  export { store, StateProvider }