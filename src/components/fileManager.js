import React, { useContext, useReducer } from 'react';
import { store } from '../store.js';
import './fileManager.css';

/*
const reducer = (state, action) => {
    const { type } = action;
    switch(type) {
        case 'save':
            const newState = {...state};
            console.log('Reducer detected Save');
            return newState;
        default:
            throw new Error()
      }
}
*/

const getDocumentListOptions = () => {

}

const FileManager  = () => {
    const {state, dispatch} = useContext(store);
    // const [state, dispatch] = useReducer(reducer, globalState);
    const onSaveClicked = () => {
        console.log("onSaveClicked");
        dispatch({type: 'save', data: {}});
    }

    return <div className="FileManagerContainer">
        <select name="cars" id="cars" className="DocsDropdown">
    const {state, dispatch} = useContext(store);
            {getDocumentListOptions(state.docs)}
        </select>
        <div className="SaveButton" onClick={onSaveClicked}>Save As...</div>
        <div className="SaveButton" onClick={onSaveClicked}>Save</div>
    </div>
}

export default FileManager;
