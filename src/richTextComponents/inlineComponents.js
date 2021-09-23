import '../mainEditor.css';
import StyleButton from '../components/styleButton';

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', icon: 'faBold', title: 'Bold'},
    {label: 'Italic', style: 'ITALIC', icon: 'faItalic', title: 'Italicize'},
    {label: 'Underline', style: 'UNDERLINE' ,icon: 'faUnderline', title: 'Underline'},
    {label: '{ }', style: 'CODE', title: 'Monospace'},
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            onToggle={props.onToggle}
            {...type}
          />
        )}
      </div>
    );
  };

  export default InlineStyleControls;