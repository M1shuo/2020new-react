import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';

import { getQueryString } from './../match_routes'

import config from 'config';

const routePrefix = config.routePrefix
export default class BreadcrumbHeader extends Component {
    state = {
        pageIndex: []
    }
    // 获取菜单栏列表(包括children节点)
    getMenuList = (pKey, menu) => {
        let menuConfig = [];
        menu.forEach(item => {
            item.pKey = pKey;
            menuConfig.push({
                id: item.ID,
                pKey: pKey,
                name: item.NAME,
                url: item.URL,
            });
            if (item.children) {
                menuConfig = menuConfig.concat(this.getMenuList(item.ID, item.children));
            };
        });
        return menuConfig;
    }

    // 获取路由地址、名称列表
    getRouterList = (routes) => {
        let routesConfig = [];
        routes.forEach(item => {
            if (item.tag === 'Route' && item.path) {
                routesConfig.push({
                    name: item.name,
                    path: item.path,
                });
            };
            if (item.routes) {
                routesConfig = routesConfig.concat(this.getRouterList(item.routes));
            };
        });
        return routesConfig;
    }
    // 匹配子页面以及菜单栏当前所在页面模块
    mathMenus = (pathname, menuConfig, routesConfig) => {
        // 路由匹配成功的数据
        let mathedRoutes = [];
        // 菜单匹配成功的数据
        let mathedMenu = null;
        routesConfig.forEach((pathItem) => {
            const pathRegexp = pathToRegexp(pathItem.path);
            // 路由配置匹配成功，则匹配菜单栏，
            if (pathRegexp.test(pathname)) {
                menuConfig.forEach(item => {
                    // 如果菜单栏匹配成功，记录当前所处菜单信息
                    if (pathRegexp.test(item.url)) {
                        mathedMenu = item
                    };
                });
                // 如果菜单栏匹配不到，而路由配置匹配到，则该页码为某个页面的子页面，记录该页面的信息，减少一层路由，继续查询
                if (mathedMenu === null) {
                    pathItem.url = pathname
                    // 保存route匹配到的页面信息
                    mathedRoutes.push(pathItem)
                    // 获取下一级的路由地址，再次匹配
                    const pathnameArr = pathname.split('/');
                    if (pathnameArr.length > 1) {
                        const nextPathName = pathnameArr.slice(0, pathnameArr.length - 1).join('/');
                        const nextResult = this.mathMenus(nextPathName, menuConfig, routesConfig);
                        mathedRoutes = mathedRoutes.concat(nextResult.mathedRoutes);
                        mathedMenu = nextResult.mathedMenu;
                    };
                };
            };
        });
        return {
            mathedRoutes,
            mathedMenu
        }
    }
    // 根据pKey匹配父级菜单
    mathAllMenu = (currentMenu, menuConfig) => {
        if (currentMenu) {
            let mathedMenus = [currentMenu];
            menuConfig.forEach(menu => {
                if (menu.id === currentMenu.pKey) {
                    mathedMenus.push(menu);
                    if (menu.pKey !== '') {
                        mathedMenus = [...mathedMenus, ...this.mathAllMenu(menu, menuConfig)];
                        mathedMenus = new Set(mathedMenus)
                    }
                }
            })
            return mathedMenus;
        } else {
            return [];
        }

    }
    // json去重
    uniqueJsonArr(array, key) {
        if (array.length === 0) {
            return array
        }
        const result = [array[0]];
        for (let i = 1; i < array.length; i++) {
            const item = array[i];
            let repeat = false;
            for (let j = 0; j < result.length; j++) {
                if (item[key] === result[j][key]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                result.push(item);
            }
        }
        return result;
    }
    getMenuLevel = (pathname, menus, routes) => {
        const menuConfig = this.getMenuList('', menus);
        const routesConfig = this.getRouterList(routes);
        const { mathedRoutes, mathedMenu } = this.mathMenus(pathname, menuConfig, routesConfig);
        const mathedMenus = this.mathAllMenu(mathedMenu, menuConfig);
        const pageIndex = [...this.uniqueJsonArr(mathedRoutes, 'path'), ...mathedMenus].reverse();
        this.setState({
            pageIndex,
        })
    }
    getIFrameMenuLevel = (pathname, menus) => {
        const menuConfig = this.getMenuList('', menus);
        let currentMenu = null
        menuConfig.forEach(item => {
            // 如果菜单栏匹配成功，记录当前所处菜单信息
            if (item.url === pathname) {
                currentMenu = item
            };
        });
        const mathedMenus = this.mathAllMenu(currentMenu, menuConfig);
        const pageIndex = [...mathedMenus].reverse();
        this.setState({
            pageIndex,
        })
    }
    componentDidMount = () => {
        let { location: { pathname }, menus, routes } = this.props;
        if (pathname === `/${routePrefix}/iframe`) {
            pathname = getQueryString('url');
            this.getIFrameMenuLevel(pathname, menus);
        } else {
            this.getMenuLevel(pathname, menus, routes);
        }
    }
    componentWillReceiveProps = (nextprops) => {
        if (nextprops.location.pathname !== this.props.location.pathname || nextprops.location.pathname === `/${routePrefix}/iframe`) {
            let { location: { pathname }, menus, routes } = nextprops;
            if (pathname === `/${routePrefix}/iframe`) {
                pathname = getQueryString('url');
                this.getIFrameMenuLevel(pathname, menus);
            } else {
                this.getMenuLevel(pathname, menus, routes);
            }
        }
    }
    render() {
        const { pageIndex } = this.state
        return (
            <Breadcrumb separator=">" className="system-path">
                {
                    pageIndex.map((item, key) => {
                        if (key === pageIndex.length - 1) return <Breadcrumb.Item key={key}>{item.name}</Breadcrumb.Item>;

                        if (item.url) return (
                            <Breadcrumb.Item key={key}>
                                <Link to={item.url}>
                                    {item.name}
                                </Link>
                            </Breadcrumb.Item>
                        );
                        return <Breadcrumb.Item key={key}>{item.name}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        )
    }
}
