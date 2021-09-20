import '../mainEditor.css';
import StyleButton from '../components/styleButton';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faIcon from "@fortawesome/free-solid-svg-icons";

const BLOCK_TYPES = [
{label: 'Normal', style: 'normal'},
{label: 'Blockquote', style: 'blockquote', icon: 'faQuoteLeft'},
{label: 'Bulleted', style: 'unordered-list-item', icon: 'faListUl'},
{label: 'Numbered', style: 'ordered-list-item', icon: 'faListOl'},
{label: 'Code Block', style: 'code-block', icon: 'faCode'},
{label: 'Header 1', style: 'header-one'},
{label: 'Header 2', style: 'header-two'},
{label: 'Header 3', style: 'header-three'},
{label: 'Header 4', style: 'header-four'},
{label: 'Header 5', style: 'header-five'},
{label: 'Header 6', style: 'header-six'},
];

const customStyles = {  
  option: (provided, state) => ({
  ...provided,
  color: state.isSelected ? 'darkgray' : 'gray',
  }),
  container: base => ({ 
      ...base, 
      fontSize: '14px',
      width: '150px',
      fontFamily: 'Arvo-Bold'
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
  menu: base => ({ 
    ...base, 
    zIndex: 9999,
  })
}

export const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': 
      console.log('blockquote!');
        return 'RichEditor-blockquote';
      default: return null;
    }
  }

const getOptions = () => {
  return BLOCK_TYPES.map(block => {
    return {
    value: block.style,
    label: block.label,
    icon: block.icon
    }
  });
}

const formatOptionLabel = ({ value, label, icon}, metadata) => {
  
  return <div style={{ display: "flex" }}>
    {icon && <FontAwesomeIcon style={{marginRight: '5px'}} icon={faIcon[icon]}/>}
    <div>{label}</div>
  </div>
};   

const BlockStyleControls = (props) => {        
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    
    const findOption = (optVal) => {
      const indexFind = optionsList.findIndex(opt => opt.value === optVal);
      if (indexFind < 0) {
        return null;
      }
      return optionsList[indexFind];
    }

    const handleChange = (newValue, actionMeta) => {
      if (actionMeta.action === 'select-option') {
          props.onToggle(newValue.value);
      }
    };

    const optionsList = getOptions();
    let optionVal = blockType ==='unstyled' ? findOption('normal') : findOption(blockType);
    console.log('BlockStyleControls', blockType, optionVal);      

    return (
        <div className="RichEditor-controls">
          <Select 
            options={optionsList}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}        
            value={optionVal}    
            onChange={handleChange}
          />
        </div>
    );
};

export default BlockStyleControls;