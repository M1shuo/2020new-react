import React, { Component } from 'react';
import { Menu, Dropdown, message, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import { api } from 'api';

import config from 'config';

const routePrefix = config.routePrefix;

class UserInfo extends Component {
    logoutHandler = (e) => {
        e.preventDefault();
        axios.post(api.login.loginout)
            .then(response => response.data)
            .then(json => {
                if (json.success) {
                    localStorage.clear();
                    this.props.history.push(`${routePrefix}/login`);
                } else {
                    message.error('登出失败');
                }
            }).catch(err => {
                console.error(err);
            })
    };
    goLogin = (e) => {
        e.preventDefault();
        this.props.history.push(`${routePrefix}/login`);
    };

    render() {

        const menu = (
            <Menu>
                {/*
                    <Menu.Item>
                        <a href="">用户信息</a>
                    </Menu.Item>
                */}
                <Menu.Item>
                    <a href="" style={{ color: 'red' }} onClick={this.logoutHandler}>退出登录</a>
                </Menu.Item>
            </Menu>
        )

        return (
            localStorage.getItem('username') ? (
                <Dropdown overlay={menu}>
                    <a href="" className="ant-dropdown-link userinfo" onClick={e => e.preventDefault()}>
                        <Icon type="user" className="user-icon" />
                        <span>{localStorage.getItem('username')}</span>
                    </a>
                </Dropdown>
            ) : (
                    <a href="" className="userinfo" onClick={this.goLogin}>
                        <Icon type="user" className="user-icon" />
                        <span>未登录</span>
                    </a>
                )

        )
    }
}

export default withRouter(UserInfo)
