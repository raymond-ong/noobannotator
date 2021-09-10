import '../noobAnnotator.css';
import StyleButton from '../components/styleButton';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding} from 'draft-js';

const ANNOTATOR_TYPES = [
    {label: 'Comment', style: 'Comment'},
    {label: 'YesNo', style: 'YesNo'},
    {label: 'Emoji', style: 'Emoji'},    
];

export const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': 
      console.log('blockquote!');
        return 'RichEditor-blockquote';
      default: return null;
    }
  }

const AnnotatorControls = (props) => {    
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const onClick = () => {
        console.log("[AnnotatorControls] onClick");
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        //const txt = '&#x' + text + ';';
        let nextEditorState = EditorState.createEmpty();
        if (selection.isCollapsed()) {
            const nextContentState = Modifier.insertText(contentState, selection, String.fromCharCode(0xd83d, 0xde04));
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
                );
        } 
        else {
            const nextContentState = Modifier.replaceText(contentState, selection, String.fromCharCode(0xd83d, 0xde04));
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            );
        } //else
        props.onChange(nextEditorState);
    }// onclick - end

    return (
        <div className="RichEditor-controls">
        {ANNOTATOR_TYPES.map((type) =>
            <StyleButton 
                label={type.label}
                key={type.label}
                onToggle={onClick}
            />
        )}
        </div>
    );
};

export default AnnotatorControls;