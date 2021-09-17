import './App.css';
import MainEditor from './mainEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { StateProvider } from './store.js';
import FileManager from './components/fileManager';
import FileManager3 from './components/fileManager3';
import 'semantic-ui-css/semantic.min.css';


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
            {/* <FileManager/> */}
            <FileManager3/>
          </div>
        </div>
        <MainEditor/>
      </div>
    </StateProvider>
  );
}

export default App;
