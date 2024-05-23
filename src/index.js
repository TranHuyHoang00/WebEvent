import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from "react-router-dom";
import { Provider } from 'react-redux';
import reduxStore from './store/redux';
import { ConfigProvider } from 'antd';
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <Provider store={reduxStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
