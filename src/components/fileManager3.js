import React, { useContext, useReducer, useState, useRef } from 'react';
import { store } from '../store.js';
import Select from 'react-select'
import './fileManager3.css';
import CreatableSelect from 'react-select/creatable';

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
    }),
    control: base => ({ 
        ...base, 
        minHeight: '30px'
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
            options.push(newValue);
            dispatch({type: 'createdDoc', data: {}});
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
        dispatch({type: 'delete', data: {item: optVal}});
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
          
    console.log("File Current Value:", selVal);

    return <div className="FileManagerContainer">
        <CreatableSelect 
        placeholder="Select an item or type in a new file..."
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
        defaultValue={selVal}
    />
    <div className="SaveButton" onClick={onSaveClicked}>Save</div>
    </div>
        
}

export default FileManager3;
