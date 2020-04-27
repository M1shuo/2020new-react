import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
// 导航菜单
export default class FlatMenu extends Component {



    createNavMenu(menus) {
        return (
            menus.map((menu, index) => {

                let linkProps = !menu.target ? { to: menu.URL } : { to: menu.URL, target: menu.target }
                return (<Menu.Item key={menu.ID}>
                    {
                        !menu.URL ? (<span><Icon type="barcode" />{menu.NAME}</span>) : (<Link {...linkProps}><span><Icon type="barcode" /><span>{menu.NAME}</span></span></Link>)
                    }
                </Menu.Item>)

            })
        )
    };

    getDefaultOpenKeys(selectedKey) {
        let openKeys = [];
        for (let i = 0; i < this.menuData.length; i++) {
            if (this.menuData[i].ID === selectedKey) {
                if (this.menuData[i].pKey !== '') {
                    openKeys.push(this.menuData[i].pKey);
                    const rs = this.getDefaultOpenKeys(this.menuData[i].pKey)
                    openKeys = openKeys.concat(rs);
                }
            }
        }
        return openKeys;
    }

    getSelectedKeys(path) {
        const selectedKeys = [];
        console.log(this.menuData)
        this.menuData.forEach(item => {

            if (item.URL === path)
                selectedKeys.push(item.ID)
        });
        return selectedKeys;
    }

    render() {
        const { menus, location: { pathname }, collapsed } = this.props;
        if (!menus) {
            return false;
        }

        if (menus.length) {
            this.rootSubmenuKeys = [];
            menus.map((menu) => this.rootSubmenuKeys.push(menu.ID))
        }

        const menuProps = collapsed ? {} : {
            openKeys: this.state.openKeys
        };
        console.log(pathname)
        const selectedKeys = this.getSelectedKeys(pathname);
        console.log(selectedKeys)
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                onOpenChange={this.handleOpenChange}
                {...menuProps}
                selectedKeys={selectedKeys}
                style={{ lineHeight: '64px', display: 'inline-block' }}>
                {
                    this.createNavMenu(menus)
                }
            </Menu>
        )

    }
}