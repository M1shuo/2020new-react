
import React, { Component } from 'react';
import { Button, Input } from "antd";

import axios from 'axios';

import { api } from 'api';
import { utils } from 'sdcube';
import config from 'config';

import './login.less';

const { sha1 } = utils;
const IMAGE = require("assets/images/login/login-img.png");
const EMPTY_USERINFO = `用户名或密码不能为空`;

const LOGIN_STATUS = {
    NORMAL: '登录',
    PROCESSING: '登录中...'
};

class Login extends Component {
    state = {
        loginMsg: '',                       // 登录信息提示
        loginStatus: LOGIN_STATUS.NORMAL,   // 按钮文字显示
        username: '',                       // 账号
        password: '',                       // 密码
        identifyingCode: '',                // 验证码
        identifyingImage: ''                // 验证码图片
    };

    componentDidMount() {
        this.getIndentifyIamge();
    }

    getIndentifyIamge = () => {             // 获取验证码图片
        axios.get(api.indentifyIamge)
            .then(response => response.data)
            .then(res => {
                this.setState({
                    identifyingImage: 'data:image/png;base64,' + res
                });
            })
            .catch(err => console.error(err));
    };

    loginHandler = (e) => {             // 登录函数
        const state = this.state;
        if (state.username && state.password) {
            this.setState({
                loginStatus: LOGIN_STATUS.PROCESSING,
            }, () => {
                const params = {
                    login_style: 'rest',
                    login_username: state.username,
                    login_password: sha1(state.password),
                    login_rand: state.identifyingCode,
                };
                axios.post(api.login, params)
                    .then(response => response.data)
                    .then(res => {
                        if (res.userid) {
                            localStorage.setItem('userid', res.userid);
                            localStorage.setItem('roleid', res.roleid);
                            localStorage.setItem('username', res.username);
                            localStorage.setItem('rolename', res.rolename);
                            localStorage.setItem('sysresource', JSON.stringify(res.sysresource));
                            this.props.history.push(`${config.routePrefix}/`)
                        } else {
                            this.setState({
                                loginMsg: res.loginMSG,
                                password: '',
                                loginStatus: LOGIN_STATUS.NORMAL
                            })
                        }
                    })
                    .catch(err => console.error(err));
            });
        } else {
            this.setState({
                loginMsg: EMPTY_USERINFO,
                loginStatus: LOGIN_STATUS.NORMAL
            });
        }
    };
    onInputChange = (stateType, e) => {
        this.setState({
            [stateType]: e.target.value
        });
    };
    render() {
        const state = this.state;
        return (
            <div className="login-container">
                <div className="login-main">
                    <div className="login-header">
                        <img src={require("assets/images/login/logo.png")} alt="" />
                    </div>
                    <div className="login-body">
                        <div className="login-bg">
                            <img src={IMAGE} alt="" />
                        </div>
                        <div className="login-form">
                            <div className="login-info">
                                <div>
                                    <span>用户名 ：</span>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        onChange={this.onInputChange.bind(this, 'username')}
                                        value={state.username}
                                    />
                                </div>
                                <div>
                                    <span>密&nbsp;&nbsp;&nbsp;码 ：</span>
                                    {/* 防止浏览器自动填充账号密码 */}
                                    <Input
                                        name="password"
                                        type="password"
                                        style={{ display: 'none' }}
                                    />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.onInputChange.bind(this, 'password')}
                                        value={state.password}
                                    />
                                </div>
                                <p className="identifying-code-box">
                                    <Input
                                        id="loginIdentifyingCode"
                                        name="loginIdentifyingCode"
                                        type="text"
                                        placeholder="验证码"
                                        onChange={this.onInputChange.bind(this, 'identifyingCode')}
                                    />
                                    <img className="identifying-code-img" src={state.identifyingImage} alt="code" />
                                    <span onClick={this.getIndentifyIamge}>换一张</span>
                                </p>
                            </div>
                            <p className="login-user-info">{state.loginMsg}</p>
                            <Button className="login-btn" type="primary" onClick={this.loginHandler}>{state.loginStatus}</Button>
                        </div>
                    </div>
                </div>
                <div className="login-footer">
                    <p>{config.app.copyright}</p>
                </div>
            </div>
        )
    }
}

export default Login;