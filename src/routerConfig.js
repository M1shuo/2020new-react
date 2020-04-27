// 引入react
import React from 'react';

// import React_router from 'react-router-dom';

// 布局组件
// import layouts from './layout';


import Home from '../views/home';

import About from '../views/home'

// 配置文件
import config from './config';

const routePrefix = config.routePrefix;

const NotFound = () => {
    return (
        <h1>Not Found</h1>
    )
}

const router = [
    {
        tag: 'Route',
        // component: layouts[config.app.layout],
        routes: [
            {
                tag: 'about',
                from: `${routePrefix}`,
                to: `${routePrefix}/home`,
                exact: true,
            },
            {
                name: '首页',
                tag: 'Route',
                path: `${routePrefix}/home`,
                component: Home,
                exact: true,
            },
            {
                name: 'about',
                tag: 'Route',
                path: `${routePrefix}/about`,
                component: About,
                exact: true,
            },
            // 查询不到路由显示NotFound
            {
                tag: 'Route',
                component: NotFound
            },
        ]
    },
    // 查询不到路由显示NotFound
    {
        tag: 'Route',
        component: NotFound
    }
]
export default router