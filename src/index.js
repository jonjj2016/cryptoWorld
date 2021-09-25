import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css';
import Store from './app/store';


const Main = () => (
    <Router>
        <Provider store={Store}>
          <App/>
        </Provider>
    </Router>
)
ReactDOM.render(<Main/>,document.getElementById('root'));