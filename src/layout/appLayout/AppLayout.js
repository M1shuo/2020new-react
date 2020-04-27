import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

import { withRouter, NavLink } from 'react-router-dom';

import NavMenu from './../component/NavMenu';
import { menu } from './../../data/menu';
import { withPermission } from 'sdcube/permissions';
import { Routes } from 'sdcube';
import config from 'config';

const { Header, Content, Sider } = Layout;


class AppLayout extends Component {
    constructor(props) {
        super(props);
        const selectedKeys = this.getSelectedKeys(this.props.location.pathname);
        const result = menu.find(obj => obj.ID === selectedKeys[0]);
        const children = (result && result.children && result.children.length) ? result.children : [];
        this.state = {
            secondaryMenu: children || []
        }
    }
    getSelectedKeys(path) {
        const selectedKeys = [];
        menu.forEach(item => {
            if (item.URL === path)
                selectedKeys.push(item.pKey)
        });
        return selectedKeys;
    }


    state = {
        secondaryMenu: []
    }

    clickTopMenu = id => e => {
        // e.preventDefault();
        const children = menu.find(obj => obj.ID === id).children;
        this.setState(prevState => ({
            secondaryMenu: children || []
        }), e => {
            // if (children.length) {
            //     this.props.history.push(children[0].URL);
            // }
        });
    }
    render() {
        return (
            <Layout className="app-layout">
                <Header className="header">
                    <div className="logo">
                        <h1>申迪前端开发平台</h1>
                    </div>
                    <div className="header-menu">
                        {
                            menu.map(obj =>

                                <NavLink
                                    to={obj.URL ? obj.URL : '#'}
                                    key={obj.ID}
                                    className="menu"
                                    activeClassName="active"
                                    onClick={this.clickTopMenu(obj.ID)}
                                >
                                    {obj.NAME}
                                </NavLink>
                            )
                        }
                    </div>
                </Header>

                {
                    (this.state.secondaryMenu && this.state.secondaryMenu.length) ? (
                        <Layout>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <NavMenu menus={this.state.secondaryMenu} location={this.props.location} />
                            </Sider>
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                    <Routes routes={this.props.routes} />
                                </Content>
                            </Layout>
                        </Layout >) : (<Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <Routes routes={this.props.routes} />
                            </Content>
                        </Layout>)
                }

            </Layout>

        )
    }
}
export default withRouter(withPermission(config.permission)(AppLayout))