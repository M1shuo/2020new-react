import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import config from 'config';


// 导航菜单
export default class HorizontalMenu extends Component {
    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e)
        }
    };
    // 生成导航栏
    createNavMenu(menus) {
        return (
            menus.map(menu => {
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
        const { menus, selectedKeys } = this.props;
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                onClick={this.handleChange}
                selectedKeys={selectedKeys}
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