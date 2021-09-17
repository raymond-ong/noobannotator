import React, { useContext, useReducer, useState } from 'react';
import { store } from '../store.js';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import './fileManager2.css';

const options = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
  ]

  const getDocumentListOptions = (docs) => {
    console.log('getDocumentListOptions', docs);
    return <Dropdown.Item>
        Important
        <Icon name='conversation' className='right floated' onMouseUp={() => {
            console.log('icon clicked!')
            //setDeleteClicked(true);
            }
        }/>
    </Dropdown.Item>
}

const FileManager2  = () => {
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
    const [openVal, setOpenval] = useState(false);
    const [isDeleteClicked, setDeleteClicked] = useState(false);
    const [currentValue, setCurrentValue] = useState(null);

    return <div>
        <Dropdown
            className="semanticDropdown"
            // options={options}
            placeholder='Choose Language'
            search
            selection
            allowAdditions
            value={currentValue}
            onAddItem={(evt) => {
                    console.log('onAddItem', evt);
            }}
            onChange={(evt) => {
                    console.log('onChange', evt);
            }}
        >
            {getDocumentListOptions(options)}
        </Dropdown>
      </div>
}

export default FileManager2;
