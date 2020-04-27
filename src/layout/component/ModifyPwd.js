import React, { Component } from 'react'
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

class ModifyPwd extends Component {
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
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }

    afterClose = e => {
        this.setState({
            confirmDirty: false
        })
    }

    render() {
        const { modifyPwdVisible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal
                visible={modifyPwdVisible}
                title="修改密码"
                onOk={onCreate}
                onCancel={onCancel}
                maskClosable={false}
                width={400}
                afterClose={this.afterClose}
            >
                <Form >
                    <FormItem {...formItemLayout} label="旧密码">
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true,
                                message: '请输入旧密码!'
                            }],
                        })(
                            <Input
                                type="password"
                                placeholder="请输入旧密码"
                            />
                        )}
                    </FormItem>
                    <FormItem label="新密码" {...formItemLayout} >
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入新密码！'
                                },
                                { validator: this.checkConfirm },
                            ],
                        })(
                            <Input
                                placeholder="请输入新密码"
                                type="password"
                            />
                        )}
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout} >
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次输入新密码！'
                                },
                                {
                                    validator: this.checkPassword
                                }
                            ],
                        })(
                            <Input
                                placeholder="请再次输入新密码"
                                type="password"
                                onBlur={this.handleConfirmBlur}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}
export default Form.create()(ModifyPwd)