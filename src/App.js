import './App.css';
import MainEditor from './mainEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { StateProvider } from './store.js';
import FileManager from './components/fileManager';
import FileManager3 from './components/fileManager3';
import 'semantic-ui-css/semantic.min.css';
import { useState } from 'react';


function App() {
  const [isActiveHamburger, setHamburger] = useState(false);
  let hamClassNames = "hamburger";
  let hamBarClassNames = "bar-hamburger";
  let settingsAreaClassNames = "SettingsArea"
  if (isActiveHamburger) {
    hamClassNames += " hamburger-active";
    hamBarClassNames += " bar-hamburger-active";
    settingsAreaClassNames += " SettingsArea-active";
  }

  return (
    <StateProvider>
      <div className="App">          
        <div className="AppHeader">
          <div className="AppTitleArea">
            <FontAwesomeIcon icon={faCommentDots}/>
            <span className="AppTitleText">Noob Annotator</span>
          </div>

                    
            <div className={settingsAreaClassNames}>
              <FileManager3/>
            </div>
            <div className={hamClassNames} onClick={ () => setHamburger(!isActiveHamburger)}>
              <span className={hamBarClassNames}></span>
              <span className={hamBarClassNames}></span>
              <span className={hamBarClassNames}></span>
            </div>          
        </div>
        <MainEditor/>
      </div>
    </StateProvider>
  );
}

export default App;
