import React from 'react';
// import asyncComponent from './components/AsyncComponent';

// 配置文件
import config from './config';
// 组件
import Login from './pages/login/Login';
// 布局组件
import layouts from './layout';
// 首页
import Home from './pages/home/Home';
import HomeDetail from './pages/home/HomeDetail';


// 系统管理
// 角色管理
import RoleManagement from './pages/system/roleManagement/RoleManagement';
import RoleDetail from './pages/system/roleManagement/RoleDetail';
// 用户管理
import UserManagement from './pages/system/userManagement/UserManagement';
// 权限管理
import AuthorityManagement from './pages/system/authorityManagement/AuthorityManagement';
// iframe 页面
import Iframe from './pages/iframe/Iframe';



// 示例组件（正式开发可删除）
// IP输入框demo
import IpInputDemo from './pages/example/ipInput/IpInput';
// 多选下拉
import DropDownSelect from './pages/example/dropDownSelect/DropDownSelect';
// Promise
import PromiseNestTest from './pages/example/PromiseNestTest';
// 权限
import PemissionTest from './pages/example/PemissionTest'
// form 校验规则
import FormExample from './pages/example/formExample/FormExample'
// table 注意事项
import TestTable from './pages/example/TestTable'
// 按需加载
// 首页
// const Home = asyncComponent(() => import('./pages/home/Home'));

//IP管理
import ipConfig from './pages/ipConfig/ipConfig';
//新增
import Addip from './pages/ipConfig/Addip';
//echarts测试
import Echarts from './pages/ipConfig/Echarts'

//活动管理
import acTivity from './pages/acTivity/acTivity';
//标签库管理
import Lable from './pages/acTivity/Lable'
//用户群管理
import userModel from './pages/acTivity/userModel'


const routePrefix = config.routePrefix;

const NotFound = () => {
    return (
        <h1>Not Found</h1>
    )
}
const routes = [
    {
        tag: 'Redirect',
        from: '/',
        to: `${routePrefix}`,
        exact: true,
    },
    {
        tag: 'Route',
        component: layouts[config.app.layout],
        routes: [
            {
                tag: 'Redirect',
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
                name: '首页子页面',
                tag: 'Route',
                path: `${routePrefix}/home/homedetail/:id?`,
                component: HomeDetail,
                exact: true,
            },
            {
                name: '登录',
                tag: 'Route',
                path: `${routePrefix}/Login`,
                component: Login,
                exact: true,
            },
            // 系统管理
            {
                name: '角色管理',
                tag: 'Route',
                path: `${routePrefix}/system/roleManagement`,
                component: RoleManagement,
                exact: true,
            },
            {
                name: '角色管理子页面',
                tag: 'Route',
                path: `${routePrefix}/system/roleManagement/roleDetail`,
                component: RoleDetail,
                exact: true,
            },
            {
                name: '用户管理',
                tag: 'Route',
                path: `${routePrefix}/system/userManagement`,
                component: UserManagement,
                exact: true,
            },
            //ip管理
            {
                name: 'ip管理',
                tag: 'Route',
                path: `${routePrefix}/ipConfig`,
                component: ipConfig,
                exact: true,
            },
            //ip新增
            {
                name: 'ip新增',
                tag: 'Route',
                path: `${routePrefix}/ipConfig/Addip`,
                component: Addip,
                exact: true,
            },
            //测试echarts
            {
                name: 'echarts测试',
                tag: 'Route',
                path: `${routePrefix}/ipConfig/Echarts`,
                component: Echarts,
                exact: true,
            },
            //活动管理
            {
                name: '活动管理',
                tag: 'Route',
                path: `${routePrefix}/acTivity`,
                component: acTivity,
                exact: true,
            },
            //标签库管理
            {
                name: '标签库管理',
                tag: 'Route',
                path: `${routePrefix}/acTivity/Lable`,
                component: Lable,
                exact: true,
            },
            //用户群管理
            {
                name: '用户群管理',
                tag: 'Route',
                path: `${routePrefix}/acTivity/userModel`,
                component: userModel,
                exact: true,
            },
            {
                name: '权限管理',
                tag: 'Route',
                path: `${routePrefix}/system/authorityManagement`,
                component: AuthorityManagement,
                exact: true,
            },
            // iframe页面
            {
                name: '',
                tag: 'Route',
                path: `${routePrefix}/iframe`,
                component: Iframe,
                exact: true,
            },


            // 示例组件（正式开发可删除）
            {
                name: 'IpInputDemo',
                tag: 'Route',
                path: `${routePrefix}/example/ipinput`,
                component: IpInputDemo,
                exact: true,
            },
            {
                name: 'DropDownSelect',
                tag: 'Route',
                path: `${routePrefix}/example/dropDownSelect`,
                component: DropDownSelect,
                exact: true,
            },
            {
                name: 'PromiseNestTest',
                tag: 'Route',
                path: `${routePrefix}/example/promiseNestTest`,
                component: PromiseNestTest,
                exact: true,
            },
            {
                name: 'PemissionTest',
                tag: 'Route',
                path: `${routePrefix}/example/pemissionTest`,
                component: PemissionTest,
                exact: true,
            },
            {
                name: 'Form校验',
                tag: 'Route',
                path: `${routePrefix}/example/formExample`,
                component: FormExample,
                exact: true,
            },
            {
                name: 'Table错位',
                tag: 'Route',
                path: `${routePrefix}/example/testTable`,
                component: TestTable,
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

export default routes;
