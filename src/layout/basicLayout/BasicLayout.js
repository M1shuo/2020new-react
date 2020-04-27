import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import NavMenu from './../component/NavMenu';
import UserInfo from './../component/UserInfo';
import BreadcrumbHeader from './../component/BreadcrumbHeader';
import Logo from './../component/Logo';
// 权限组件
import { withPermission } from 'sdcube/permissions';

import { menu as menuData } from './../../data/menu';
import { Routes } from 'sdcube';
import config from 'config';

import './../styles.less';
import './basicLayout.less';

const { Header, Sider, Content, Footer } = Layout;
const copyright = config.app.copyright;



class BasicLayout extends Component {
    state = {
        collapsed: false,
        menu: menuData
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { location, routes } = this.props;
        const state = this.state;
        return (
            <Layout className="common-layout basic-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={state.collapsed}
                    width={250}
                >
                    <Logo />
                    <NavMenu
                        menus={state.menu}
                        collapsed={state.collapsed}
                        location={location}
                    />
                </Sider>
                <Layout>
                    <Header className="header-content">
                        <Icon
                            className="trigger fold menu-trigger"
                            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <UserInfo />
                    </Header>
                    <Content className="main-content">
                        <BreadcrumbHeader
                            menus={state.menu}
                            location={location}
                            routes={routes}
                        />
                        <div className="sub-main-content">
                            <Routes routes={routes} />
                        </div>
                    </Content>
                    <Footer className="footer-content">{copyright}</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(withPermission(config.permission)(BasicLayout));