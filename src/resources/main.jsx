import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Reducers
import Reducers from './reducers'

// Sagas
import { filesSaga } from './middlewares/files'
import { sidebarSaga } from './middlewares/sidebar'
import { configSaga } from './middlewares/config'

// App component
import App from './components/app/app.jsx'

import { loadConfig } from './actions/config'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
    Reducers,
    applyMiddleware(sagaMiddleware)
  )

sagaMiddleware.run(filesSaga)
sagaMiddleware.run(sidebarSaga)
sagaMiddleware.run(configSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)

store.dispatch(loadConfig())


const defautButtons = ()=>{
  
  const remote = require('electron').remote;
  
  document.getElementById("min-btn").addEventListener("click", e => {
    const window = remote.getCurrentWindow();
    window.minimize();
  });

  document.getElementById("close-btn").addEventListener("click", e => {
    const window = remote.getCurrentWindow();
    window.close();
  });
}

/**
 * Disable refresh
 */
const disableRefresh = () => {
  document.onkeydown = () => {
    switch (event.keyCode) {
      case 116 :
        event.returnValue = false;
        event.keyCode = 0;
        return false;
      case 82 :
        if (event.ctrlKey) {
          event.returnValue = false;
          event.keyCode = 0;
          return false;
        } break;
      default: console.log('otherKey');
    }
  };
};


(() => {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      defautButtons();
      disableRefresh();
    }
  };
})();
