import './App.css';
import NoobAnnotator from './noobAnnotator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">    
    
      <div className="AppTitle">
        <FontAwesomeIcon icon={faCommentDots}/>
        <span className="AppTitleText">Noob Annotator</span>
      </div>
      <NoobAnnotator/>
    </div>
  );
}

export default App;
