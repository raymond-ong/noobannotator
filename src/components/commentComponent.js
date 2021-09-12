import { Icon, Input } from 'semantic-ui-react'
import './commentComponent.css';

const Comment = (props) => {
    return <div className="CommentContainer">
        <div className="CommentHeader">
            <div className="CommentHeaderCaption">New Comment</div>
            <div className="CommentHeaderColor">
                <div className="ColorField">
                    <input className="CommentHeaderColorInput" placeholder="Color"></input>
                    <Icon style={{color:"#0000ff"}} name="square"/>
                </div>
            </div>                    
        </div>
        <div className="CommentBody">
            <textarea className="CommentTextArea" resize="none" defaultValue="Some comment"/>
        </div>
        <div className="CommentFooter">
            <div className="CommentFooterButton">OK</div>
            <div className="CommentFooterButton">Cancel</div>
        </div>
    </div>
}

export default Comment;