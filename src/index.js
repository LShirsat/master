import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { runWithAdal } from 'react-adal';
import adalContext from "./adalConfig";
import 'bootstrap/dist/css/bootstrap.min.css'

const DO_NOT_LOGIN = false;
//set to true to disable login, might lead to errors in profile page

runWithAdal(adalContext.AuthContext, () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}, DO_NOT_LOGIN);