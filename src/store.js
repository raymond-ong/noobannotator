import React, {createContext, useReducer} from 'react';
import {localSaveContent} from './helpers/localStorageHelper.js';
import {localListDocs} from './helpers/localStorageHelper.js'


const GetInitialState = () => {
    let ret = {
        docs: [],
        activeDoc: null,
        editorContent: null        
    }

    

    return ret;
}

const initialState = {
    docs: [],
    activeDoc: null,
    editorContent: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case 'save':
            console.log("[reducer] save");
            const newStateSave = {...state}// do something with the action
            localSaveContent(state.editorContent, 'testSave');
            return newStateSave;
        case 'editorStateChanged':
            console.log("[reducer] editorStateChanged");
            const newStateEditor = {...state}// do something with the action
            newStateEditor.editorContent = action.data;
            return newStateEditor;
        default:
          throw new Error();
          console.log('Reducer detected Save');
      };
    }, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };
  
  export { store, StateProvider }