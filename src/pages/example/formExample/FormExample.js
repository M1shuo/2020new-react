import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

import { Page } from 'sdcube';

const FormItem = Form.Item;


class FormExample extends Component {
    state = {
        confirmDirty: false,
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], {
                force: true
            });
        }
        callback();
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="账号"
                >
                    {getFieldDecorator('account', {
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                pattern: new RegExp(/^[a-zA-Z0-9_-]{4,16}$/),
                                message: '账号只能是4到16位(只可包含字母,数字,下划线,减号)'
                            }
                        ]
                    })(
                        <Input type="text" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="昵称"
                >
                    {getFieldDecorator('username', {
                        initialValue: '',
                        rules: [{
                            required: true,
                            pattern: new RegExp(/^[a-zA-Z0-9\u4e00-\u9f5a_-]{4,16}$/),
                            message: '昵称只能是4到16位(只可包含字母,数字,下划线,减号)'
                        }]
                    })(
                        <div>

                            <Input type="text" />

                        </div>
                    )}
                </FormItem>
                {/* 解决火狐浏览器自动填充问题 */}
                <Input type="password" style={{ display: "none" }} autoComplete="new-password" />
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {
                        getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '请输入新密码！' },
                                { validator: this.checkConfirm },
                            ]
                        })(
                            // autoComplete="new-password" 解决谷歌自动填充密码问题
                            <Input
                                type="password"
                                autoComplete="new-password"
                            />
                        )
                    }
                </FormItem>
                <FormItem label="确认密码" {...formItemLayout} >
                    {getFieldDecorator('confirmPassword', {
                        rules: [
                            { required: true, message: '请再次输入新密码！' },
                            { validator: this.checkPassword }
                        ],
                    })(
                        <Input
                            placeholder=""
                            type="password"
                            onBlur={this.handleConfirmBlur}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {
                        getFieldDecorator('phone', {
                            initialValue: "",
                            rules: [{
                                required: true,
                                pattern: new RegExp(/^[1][0-9]{10}$/),
                                message: '请输入正确的手机号码'
                            }]
                        })(
                            <Input type="text" />
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {
                        getFieldDecorator('email', {
                            initialValue: '',
                            rules: [{
                                // ant 自带类型中包含邮箱校验
                                type: 'email',
                                required: true,
                                message: '请输入正确的邮箱'
                            }]
                        })(
                            <Input type="text" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">登记</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedFormExample = Form.create()(FormExample)


export default class FormExampleMain extends Component {

    render() {
        return (
            <Page>
                <div style={{ margin: "10px auto", width: "380px" }}>
                    <WrappedFormExample />
                </div>
            </Page>
        )
    }
}