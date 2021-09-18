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
    container: base => ({ 
        ...base, 
        fontSize: '14px',
        // padding: '0px'
    }),
    control: base => ({ 
        ...base, 
        // border: '1px solid blue',
        // padding: '0px',
        minHeight: '30px'
    }),
    valueContainer: base => ({ 
        ...base, 
        // border: '1px solid pink',
        paddingTop: '0px',
        paddingBottom: '0px',
        height: '100%'
    }),
    singleValue: base => ({ 
        ...base, 
        marginTop: '0px',
        marginBottom: '0px',
    }),
    indicatorsContainer: base => ({ 
        ...base, 
        // padding: '0px',
    }),
    indicatorSeparator: base => ({ 
        ...base, 
        height: '100%',
        marginTop: '0px',
        marginBottom: '0px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // width: '1px',
        // border: '0px',
        // boxSizing: 'content-sizing'
    }),   
    clearIndicator : base => ({ 
        ...base, 
        // height: '100%',
        marginTop: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        // width: '1px',
        // border: '0px',
        // boxSizing: 'content-sizing'
    }),   
    dropdownIndicator: base => ({ 
        ...base, 
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px',
        marginBottom: '0px',
    }),
    // menuPortal: base => ({ ...base, zIndex: 9999 }),
    // menu: provided => ({ ...provided, zIndex: "9999 !important" }),
    input: () => ({        
        margin: '0px'
    }),
    // control: () => ({
    //     // none of react-select's styles are passed to <Control />
    //     fontSize: 12,
    //     width: 300
    //   }),
}
  
const FileManager3  = (props) => {
    console.log('[FileManager3] render');
	const [deletedItem, setDeletedItem] = useState(false);
    const [selVal, setSelVal] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const selRef = useRef(null);
    const {state, dispatch} = useContext(store);

    const onSaveClicked = () => {
        console.log("onSaveClicked");
        dispatch({type: 'save', data: {}});
    }

    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if (deletedItem) {
            setDeletedItem(false);
            console.log('handleChange detected deletedItem...returning early');
            return;
        }
        if (actionMeta.action === 'create-option') {
            //setOptions([...options, newValue]);
            options.push(newValue);
        }
        else if (actionMeta.action === 'select-option') {
            setSelVal(newValue);
            setShowMenu(false);
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

        if (selVal && selVal.value === optVal) {
            console.log("set value to null as deleting selected item");
            setSelVal(null);
        }
        options.splice(findIndex, 1);
		setDeletedItem(true);
        //e.preventDefault(); // might not be needed anymore....setDeletedItem updates deletedItem just in time for handleChange() using onMouseDown instead of onClick
        console.log("Done removing", optVal);
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

    return <div className="FileManagerContainer">
        <CreatableSelect 
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
        }}
        blurInputOnSelect={false}
        onFocus={() => {
            setShowMenu(true);
        }}
        ref={selRef}
    />
    <div className="SaveButton" onClick={onSaveClicked}>Save</div>
    </div>
        
}

export default FileManager3;
