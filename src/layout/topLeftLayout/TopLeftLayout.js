import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';



import TopLevelMenu from './../component/TopLevelMenu';
import LeftMenu from './../component/LeftMenu';
import UserInfo from './../component/UserInfo';
import BreadcrumbHeader from './../component/BreadcrumbHeader';
import Logo from './../component/Logo';
// 权限组件
import { withPermission } from 'sdcube/permissions';

import { menu } from './../../data/menu';
import { Routes } from 'sdcube';
import config from 'config';
import routes from '../../routeConfig';


import { getRoutesConfig, getAllMenuConfig, getSelectKeys, getIFrameSelectKeys, getQueryString } from './../match_routes';


import './../styles.less';
import './topLeftLayout.less';

const { Header, Sider, Content, Footer } = Layout;
const copyright = config.app.copyright;

class TopLeftLayout extends Component {
    constructor() {
        super()
        this.state = {
            menu: menu,
            sideMenu: [],
            selectedKeys: [],
        }
    }
    componentDidMount = () => {
        let pathname = this.props.location.pathname;
        this.handleMenu(pathname)
    }
    componentWillReceiveProps = (nextprops) => {
        if (nextprops.location.pathname !== this.props.location.pathname) {
            this.handleMenu(nextprops.location.pathname)
        }
    }
    handleMenu = (pathname) => {
        const state = this.state;
        // 获取导航栏数组（包括孩子节点）
        const menuData = getAllMenuConfig('', state.menu);
        // 获取路由配置地址
        const routesConfig = getRoutesConfig(routes);
        let currentKey = []
        // 如果是iframe则直接匹配菜单，非iframe则结合路由进行匹配
        if (pathname === `${config.routePrefix}/iframe`) {
            pathname = getQueryString('url')
            currentKey = getIFrameSelectKeys(pathname, menuData);
        } else {
            currentKey = getSelectKeys(routesConfig, pathname, menuData);
        }
        if (currentKey.length > 0) {
            const currentMenu = this.findFirstParents(menuData, currentKey[0])
            this.changeMenuState(currentMenu.ID)
        }
    }
    findFirstParents = (menu, id) => {
        let result = _.find(menu, { ID: id });
        if (result && result.pKey) {
            result = this.findFirstParents(menu, result.pKey);
        }
        return result;
    }
    // 点击横向菜单
    changeTopLevelMenu = (e) => {
        this.changeMenuState(e.key, true)
    }
    changeMenuState = (key, clickStatus) => {
        const { menu } = this.state;
        const currentMenu = _.find(menu, { ID: key });
        const sideMenu = currentMenu.children;
        // 如果是点击事件
        if (clickStatus) {
            // 获取切换时定向地址，如果没有子菜单，则直接获取当前菜单地址，若存在子菜单，则遍历获取子菜单首个地址
            let path = ''
            if (currentMenu.URL) {
                path = currentMenu.URL
            } else {
                path = this.mathDefaultPath(sideMenu);
            }
            this.props.history.push(path);
        }


        this.setState({
            sideMenu,
            selectedKeys: [key]
        })
    }
    // 获取默认的第一个地址
    mathDefaultPath = (menu) => {
        let defaultPath = '';
        menu.every(item => {
            if (item.children && item.children.length && !defaultPath) {
                defaultPath = this.mathDefaultPath(item.children)
            } else if (item.URL && !defaultPath) {
                defaultPath = item.URL
                return false;
            }
            return item
        })
        return defaultPath;
    }
    render() {
        const { location, routes } = this.props;
        const state = this.state;

        return (
            <Layout className="common-layout topleft-layout">
                <Header>
                    <Logo />
                    <TopLevelMenu
                        menus={state.menu}
                        location={location}
                        selectedKeys={state.selectedKeys}
                        onChange={this.changeTopLevelMenu}
                    />
                    <UserInfo />
                </Header>
                <Layout>
                    {
                        state.sideMenu.length ? (
                            <Sider
                                trigger={null}
                                collapsible
                                collapsed={state.collapsed}
                                width={200}
                            >
                                <LeftMenu
                                    menus={state.sideMenu}
                                    collapsed={state.collapsed}
                                    location={location}
                                />
                            </Sider>
                        ) : null
                    }

                    <Content className="main-content">
                        <BreadcrumbHeader
                            menus={state.menu}
                            location={location}
                            routes={routes}
                        />
                        <div className="sub-main-content">
                            <Routes routes={routes} />
                        </div>
                        <Footer className="footer-content">{copyright}</Footer>
                    </Content>
                </Layout>

            </Layout>
        )
    }
}


export default withRouter(withPermission(config.permission)(TopLeftLayout));