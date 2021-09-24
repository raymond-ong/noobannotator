import React, {createContext, useReducer} from 'react';
import {localSaveContent, locaDeleteContent} from './helpers/localStorageHelper.js';
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
         * TODO: can be deleted already as we have a new UI
         */
        isDocNameNew: false,
        /**
         * Current active document name
         */
        docCurreFileName: null,        
    }

    // Get the list of documents from localStorage
    ret.docs = localListDocs();
    if (ret.docs.length > 0) {
        //ret.activeDoc = ret.docs[ret.docs.length -1]; // set the last one as the active document
        let {content, fileName} = EditorHelper.getInitialContent(ret);
        ret.editorContent = content;
        ret.docCurreFileName = fileName;
    }
    else {
        // create a sample document
        ret.editorContent = EditorHelper.createDemoContent();
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
            const newStateSave = {...state};
            let fileName = action.data.newFileName ? action.data.newFileName : state.docCurreFileName;
            let rawContent = EditorHelper.convertToRawContent(state.editorContent);
            let newDocs = localSaveContent(rawContent, fileName);
            newStateSave.docs = newDocs;
            newStateSave.docCurreFileName = fileName;

            return newStateSave;
        case 'editorStateChanged':
            console.log("[reducer] editorStateChanged");
            const newStateEditor = {...state}
            newStateEditor.editorContent = action.data;
            return newStateEditor;
        //case 'docInputChanged': // todo: remove this
            // [1] Rename Save/Save New button
            // let {isDocNameNew, fileName} = action.data;
            // console.log("[reducer] docInputChanged", isDocNameNew, fileName);
            // if (isDocNameNew === state.isDocNameNew && fileName === state.docCurreFileName) {
            //     return state; // optimize
            // }
            // const newStateDocName = {...state}
            // newStateDocName.isDocNameNew = isDocNameNew;
            // newStateDocName.docCurreFileName = fileName;        

            // // [2] Load the existing document that matches (TODO: should not come here if there are unsaved changes)
            // EditorHelper.setContent(newStateDocName, fileName);

            // return newStateDocName;
        case 'selectedDocChanged':
            let selectedDocName = action.data;
            console.log("[reducer] selectedDocChanged", selectedDocName);
            const newStateDocChanged = {...state};
            newStateDocChanged.docCurreFileName = selectedDocName;
            EditorHelper.setContent(newStateDocChanged, selectedDocName);

            return newStateDocChanged
        case 'delete':
            let deletedDoc = action.data;
            const newStateDelete = {...state};
            console.log("[reducer] Doc to be deleted", deletedDoc);
            let docsAfterDelete = locaDeleteContent(deletedDoc);
            newStateDelete.docs = docsAfterDelete;
            if (newStateDelete.docCurreFileName === deletedDoc) {
                newStateDelete.docCurreFileName = null;
                newStateDelete.editorContent = null;
            }
            return newStateDelete;
        default:
          throw new Error();
          console.log('Reducer detected Save');
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };
  
  export { store, StateProvider }