import '../mainEditor.css';
import StyleButton from '../components/styleButton';

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', icon: 'faBold', showIconAndLabel: true},
    {label: 'Italic', style: 'ITALIC', icon: 'faItalic'},
    {label: 'Underline', style: 'UNDERLINE' ,icon: 'faUnderline'},
    {label: '{ }', style: 'CODE',},
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            icon={type.icon}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  export default InlineStyleControls;