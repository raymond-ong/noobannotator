import React, { useContext, useReducer, useState, useRef } from 'react';
import { store } from '../store.js';
import './fileManager3.css';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faFileAlt } from "@fortawesome/free-solid-svg-icons";

// let options = [
//     { value: 'chocolate', label: 'Chocolate'},
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

const customStyles = {  
    option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'darkgray' : 'gray',
    }),
    container: base => ({ 
        ...base, 
        fontSize: '14px',
        fontFamily: 'Arvo-Bold'
    }),
    control: base => ({ 
        ...base, 
        minHeight: '30px',
    }),
    valueContainer: base => ({ 
        ...base, 
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
    }),
    indicatorSeparator: base => ({ 
        ...base, 
        height: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    }),   
    clearIndicator : base => ({ 
        ...base, 
        marginTop: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
    }),   
    dropdownIndicator: base => ({ 
        ...base, 
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px',
        marginBottom: '0px',
    }),
    input: () => ({        
        margin: '0px'
    }),
}
  
const FileManager3  = (props) => {
    console.log('[FileManager3] render');
    const {state, dispatch} = useContext(store);
	const [deletedItem, setDeletedItem] = useState(false);
    
    const [showMenu, setShowMenu] = useState(false);
    const selRef = useRef(null);

    const getOptions = (docs) => {
        console.log('getDocumentListOptions', docs);
        return docs.map((doc, index) => ({value: doc.name, label: doc.name}));
    }
    const options = getOptions(state.docs);
    const [optionsVal, setOptions] = useState(options);

    const getDefaultVal = () => options && options.length > 0 ? options[options.length - 1] : null;
    const [selVal, setSelVal] = useState(getDefaultVal());

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
            optionsVal.push(newValue);
            setOptions(optionsVal);
            setSelVal(newValue);
            dispatch({type: 'save', data: {newFileName: newValue.value}});
        }
        else if (actionMeta.action === 'select-option') {
            setSelVal(newValue);
            setShowMenu(false);
            selRef.current.blur();
            dispatch({type: 'selectedDocChanged', data: newValue.value});
        }
        else if (actionMeta.action === 'clear') {
            setSelVal(null);
        }
      };
    const handleInputChange = (inputValue, actionMeta) => {
        // console.group('Input Changed');
        // console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
        // if (actionMeta.action === 'create-option') {
        //     //setOptions([...options, inputValue]);
        //     options.push(inputValue);
        // }
        //console.groupEnd();
      };

    const handleDelete = (e, optVal) => {
        console.log("Trying to delete ", optVal);
        let findIndex = optionsVal.findIndex(opt => opt.value === optVal);
        if (findIndex < 0) {
            return;
        }

        if (selVal && selVal.value === optVal) {
            console.log("set value to null as deleting selected item");
            setSelVal(null);
        }
        optionsVal.splice(findIndex, 1);
        setOptions(optionsVal);
		setDeletedItem(true);
        dispatch({type: 'delete', data: optVal});
        //e.preventDefault(); // might not be needed anymore....setDeletedItem updates deletedItem just in time for handleChange() using onMouseDown instead of onClick
        console.log("Done removing", optVal);
    }

    const formatOptionLabel = ({ value, label, }, metadata) => {
        const isCreateMenuItem = metadata.inputValue && metadata.inputValue.length > 0 && value !== label;
        
        return <div style={{ display: "flex" }}>
          {!isCreateMenuItem && <FontAwesomeIcon icon={faFileAlt} style={{marginRight:"8px", marginTop: "2px"}}/>}
          <div>{label}</div>
          {metadata.context === 'menu' && !isCreateMenuItem &&
          <div style={{ 
              marginLeft: "auto", // right-align
              color: "white", 
              backgroundColor: "rgba(255,0,0,0.8)",
              fontSize: "11px",
              borderRadius: "3px",
              padding: "3px",
              cursor: "pointer",              
              fontFamily: 'Segoe UI'
               }}
               onMouseDown={ (e) => handleDelete(e, value)}>
            Delete
          </div>}
          {metadata.context === 'menu' && isCreateMenuItem &&
          <div style={{ 
              marginLeft: "auto", // right-align
              color: "white", 
              backgroundColor: "rgba(50,150,50,0.8)",
              fontSize: "11px",
              borderRadius: "3px",
              padding: "3px",      
              fontFamily: 'Segoe UI'    
               }}>
            New
          </div>}
        </div>
    };   
          
    console.log("File Current Value:", selVal);
    let classBtnSave = "SaveButton";
    if (!selVal) {
        classBtnSave += " btnDisabled"
    }

    return <div className="FileManagerContainer">
        <CreatableSelect 
        placeholder="Select an item or type in a new file..."
        isClearable
        className="selectDropdown" 
        options={optionsVal} 
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
        defaultValue={selVal}
    />
    <div className={classBtnSave} onClick={selVal && onSaveClicked} title="Save to Local Storage">
        <FontAwesomeIcon icon={faSave}/>
    </div>
    </div>
        
}

export default FileManager3;
