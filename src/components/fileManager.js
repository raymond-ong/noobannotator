import React, { useContext, useReducer } from 'react';
import { store } from '../store.js';
import './fileManager.css';

/**
 * Constructs the <options> child elements for the given list of documents
 * @param {*} docs List of documents from the state
 * @returns 
 */
const getDocumentListOptions = (docs) => {
    console.log('getDocumentListOptions', docs);
    return docs.map((doc, index) => <option key={doc.name} value={doc.name}>{doc.name}</option>)
}

const FileManager  = () => {
    const {state, dispatch} = useContext(store);
    const onSaveClicked = () => {
        console.log("onSaveClicked");
        dispatch({type: 'save', data: {}});
    }

    const onSelectionChange = (evt) => {
        // TODO: Warn user if there is any unsaved changes
        let currText = evt.target.value;
        let docNames = state.docs.map(doc => doc.name);
        // if it does not match any of the dropdown value, set the Save button text to "Save New"
        if (docNames.indexOf(currText) === -1) {
            dispatch({type: "docInputChanged", data: {isDocNameNew: true, fileName: currText}});
        }
        else {
            dispatch({type: "docInputChanged", data: {isDocNameNew: false, fileName: currText}});
        }
    }

    const defaultVal = state.docs && state.docs.length > 0 ? state.docs[state.docs.length-1].name : null;
    const btnText = state.isDocNameNew ? "Save New" : "Save"; // TODO: Disable button if textbox is empty

    return <div className="FileManagerContainer">
        <input list="docsOptions" 
            name="docsDropDown" 
            className="DocsDropdown" 
            defaultValue={defaultVal}
            onChange={onSelectionChange}
        />
        <datalist id="docsOptions">
            {getDocumentListOptions(state.docs)}
        </datalist>
        
        <div className="SaveButton" onClick={onSaveClicked}>{btnText}</div>
    </div>
}

export default FileManager;
