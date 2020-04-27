import './assets/css/common.less';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';

// import axios from 'axios';

import routeConfig from './routeConfig';
import { Routes } from './lib/sdcube';



class App extends Component {
    render() {
        return (
            <Layout>
                <Routes routes={routeConfig} />
            </Layout>
        );
    }
}


export default withRouter(App)
