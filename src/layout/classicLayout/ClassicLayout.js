
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

import HorizontalMenu from './../component/HorizontalMenu';
import UserInfo from './../component/UserInfo';
import BreadcrumbHeader from './../component/BreadcrumbHeader';
import Logo from './../component/Logo';
// 权限组件
import { withPermission } from 'sdcube/permissions';

import { menu as menuData } from './../../data/menu';
import { Routes } from 'sdcube';
import config from 'config';

import './../styles.less';
import './classicLayout.less';

const { Header, Content, Footer } = Layout;
const copyright = config.app.copyright;

class ClassicLayout extends Component {
    state = {
        menu: menuData
    }
    render() {
        const { location, routes } = this.props;
        const state = this.state;

        return (
            <Layout className="common-layout classic-layout">
                <Header>
                    <Logo />
                    <HorizontalMenu
                        menus={state.menu}
                        location={location}
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
        )
    }
}


export default withRouter(withPermission(config.permission)(ClassicLayout));