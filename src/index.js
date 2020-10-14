import React from 'react'; //library from node_modules folder
import ReactDOM from 'react-dom'; //library from node_modules folder
import './index.css';     
import App from './App'; //subcomponent
import * as serviceWorker from './serviceWorker'; //make application modern and compatible with mobile devices

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
