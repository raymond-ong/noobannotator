import './App.css';
import NoobAnnotator from './noobAnnotator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { StateProvider } from './store.js';
import FileManager from './components/fileManager';

function App() {
  return (
    <StateProvider>
      <div className="App">          
        <div className="AppHeader">
          <div className="AppTitleArea">
            <FontAwesomeIcon icon={faCommentDots}/>
            <span className="AppTitleText">Noob Annotator</span>
          </div>

          <div className="DocTitleArea"></div>

          <div className="SettingsArea">
            <FileManager/>
          </div>
        </div>
        <NoobAnnotator/>
      </div>
    </StateProvider>
  );
}

export default App;
