import React, { useContext, useReducer, useState, useRef } from 'react';
import { store } from '../store.js';
import Select from 'react-select'
import './fileManager3.css';
import CreatableSelect from 'react-select/creatable';

let options = [
    { value: 'chocolate', label: 'Chocolate'},
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

const customStyles = {  
     option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'darkgray' : 'gray',
      }),
}
  
const FileManager3  = (props) => {
    console.log('[FileManager3] render');
    const [deletedItem, setDeletedItem] = useState(false);
    const [selVal, setSelVal] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [focusedVal, setFocusedVal] = useState(false);
    const selRef = useRef(null);
    //const [options, setOptions] = useState(optionsFood);

    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if (deletedItem) {
            return;
        }

        if (actionMeta.action === 'create-option') {
            //setOptions([...options, newValue]);
            options.push(newValue);
        }
        else if (actionMeta.action === 'select-option') {
            setSelVal(newValue);
            setShowMenu(false);
            setFocusedVal(false);
            selRef.current.blur();
        }
        else if (actionMeta.action === 'clear') {
            setSelVal(null);
        }
      };
    const handleInputChange = (inputValue, actionMeta) => {
        // console.group('Input Changed');
        // console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
        if (actionMeta.action === 'create-option') {
            //setOptions([...options, inputValue]);
            options.push(inputValue);
        }
        //console.groupEnd();
      };

    const handleDelete = (e, optVal) => {
        console.log("Trying to delete ", optVal);
        let findIndex = options.findIndex(opt => opt.value === optVal);
        if (findIndex < 0) {
            return;
        }
        options.splice(findIndex, 1);
        setDeletedItem(true);
        e.preventDefault();
    }

    const formatOptionLabel = ({ value, label, }, metadata) => (
        <div style={{ display: "flex" }}>
          <div>{label}</div>
          {metadata.context === 'menu' &&
          <div style={{ 
              marginLeft: "auto", // right-align
              color: "white", 
              backgroundColor: "rgba(255,0,0,0.8)",
              fontSize: "10px",
              borderRadius: "3px",
              padding: "3px",
              cursor: "pointer",              
               }}
               onMouseDown={ (e) => handleDelete(e, value)}>
            Delete
          </div>}
        </div>
      );

    return <CreatableSelect 
        isClearable
        className="selectDropdown" 
        options={options} 
        styles={customStyles}
        onChange={handleChange}
        onInputChange={handleInputChange}
        formatOptionLabel={formatOptionLabel}
        closeMenuOnSelect={false}
        value={selVal}
        menuIsOpen={showMenu}
        onBlur={() => {
            setShowMenu(false);
            setFocusedVal(false);
        }}
        blurInputOnSelect={false}
        onFocus={() => {
            setShowMenu(true);
            setFocusedVal(true);
        }}
        ref={selRef}
    />
        
}

export default FileManager3;
