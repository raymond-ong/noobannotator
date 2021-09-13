import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding} from 'draft-js';

export class EditorHelper
{
    static getInitialContent = (state) => {
        if (state.docs && state.docs.length > 0) {
          console.log('EditorHelper.getInitialContent()...', state.docs[state.docs.length-1].name);          
          return {
            content: convertFromRaw(state.docs[state.docs.length-1].docContent),
            fileName: state.docs[state.docs.length-1].name
          }
        }
        return null;
    }

    static convertToRawContent = convertToRaw;

    static setContent = (state, name) => {
        if (!state.docs || state.docs.length <= 0) {
          return;
        }
        
        let findDoc = state.docs.find(d => d.name === name);
        if (!findDoc) {
            return;
        }

        state.editorContent = convertFromRaw(findDoc.docContent);

    }

}
