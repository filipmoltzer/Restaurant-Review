import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* Starts the App */
ReactDOM.render(<App />, document.getElementById('root'));
/* Registers the serviceWorker
 The serviceWorker only runs in product mode */
registerServiceWorker();
