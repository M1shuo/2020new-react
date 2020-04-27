import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import routes from '../../routeConfig';
import config from 'config';

import { getRoutesConfig, getMenuConfig, getSelectKeys, getIFrameSelectKeys, getQueryString } from './../match_routes'

const { SubMenu } = Menu;
const routePrefix = config.routePrefix;

// 导航菜单
export default class HorizontalMenu extends Component {
    state = {
        openKeys: []
    }
    componentDidMount = () => {
        this.handleRoute(this.props);
    }
    componentWillReceiveProps(nextprops) {
        if (this.props.location.pathname !== nextprops.location.pathname || nextprops.location.pathname === `/${routePrefix}/iframe`) {
            this.handleRoute(nextprops)
        }
    }
    // 获取导航栏展开的key值
    getDefaultOpenKeys(selectedKey) {
        let openKeys = [];
        const menuData = this.menuData
        for (let i = 0; i < menuData.length; i++) {
            const element = menuData[i];
            if (element.ID === selectedKey) {
                if (element.pKey !== '') {
                    openKeys.push(element.pKey);
                    const rs = this.getDefaultOpenKeys(element.pKey)
                    openKeys = openKeys.concat(rs);
                }
            }
        }
        return openKeys;
    }
    handleRoute = (props) => {
        let { location: { pathname }, menus } = props;
        if (!menus) {
            return false;
        }

        if (menus.length) {
            this.rootSubmenuKeys = [];
            menus.map((menu) => this.rootSubmenuKeys.push(menu.ID))
        }

        // 获取导航栏数组（包括孩子节点）
        this.menuData = getMenuConfig('', menus);
        // 获取路由配置地址
        const routesConfig = getRoutesConfig(routes);

        // 如果是iframe则直接匹配菜单，非iframe则结合路由进行匹配
        if (pathname === `${config.routePrefix}/iframe`) {
            pathname = getQueryString('url')
            this.selectedKeys = getIFrameSelectKeys(pathname, this.menuData);
        } else {
            // 高亮导航id
            this.selectedKeys = getSelectKeys(routesConfig, pathname, this.menuData);
        }


        // 展开导航id
        const openKeys = this.getDefaultOpenKeys(this.selectedKeys[0]);
        this.setState({
            openKeys: [...openKeys]
        });
    }
    // 切换导航栏的展开状态
    handleOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys
            });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    // 生成导航栏
    createNavMenu(menus) {
        return (
            menus.map(menu => {
                if (menu.children && menu.children.length > 0) {
                    return (
                        <SubMenu
                            type={menu.ICONCLS}
                            key={menu.ID}
                            title={<span><Icon type={menu.ICONCLS} /><span>{menu.NAME}</span></span>}
                        >
                            {this.createNavMenu(menu.children)}
                        </SubMenu>
                    )
                }

                // 处理菜单栏各类打开页面方式
                let linkProps = {};
                if (menu.URL) {
                    switch (menu.open_way) {
                        case 'Replace_Tab': // 替换当前窗口
                            linkProps.to = menu.URL;
                            break;
                        case 'Iframe': // iframe内嵌
                            linkProps.to = {
                                pathname: `${config.routePrefix}/iframe`,
                                search: `url=${escape(menu.URL)}`
                            };
                            break;
                        case 'New_Tab': // 弹出新窗口
                            linkProps = {
                                to: menu.URL,
                                target: '_blank',
                            };
                            break;
                        default:
                            linkProps.to = menu.URL;
                            break;
                    }
                }
                return (
                    <Menu.Item key={menu.ID}>
                        {
                            !menu.URL ?
                                (
                                    <span>
                                        <Icon type={menu.ICONCLS} />{menu.NAME}
                                    </span>
                                ) :
                                (
                                    <Link {...linkProps}>
                                        <span>
                                            <Icon type={menu.ICONCLS} />
                                            <span>{menu.NAME}</span>
                                        </span>
                                    </Link>
                                )
                        }
                    </Menu.Item>
                )
            })
        )
    };

    render() {
        const { menus } = this.props;

        return (
            <Menu
                theme="dark"
                mode="horizontal"
                onOpenChange={this.handleOpenChange}
                selectedKeys={this.selectedKeys}
                style={{
                    lineHeight: '64px',
                    display: 'inline-block',
                    verticalAlign: "top"
                }}
            >
                {
                    this.createNavMenu(menus)
                }
            </Menu>
        )

    }
}