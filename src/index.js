import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, } from 'react-router-dom';
import { LocaleProvider } from 'antd';

// 设置antdesign默认中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './App';
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Router>
            <App />
        </Router>
    </LocaleProvider>,
    document.getElementById('root')
);
