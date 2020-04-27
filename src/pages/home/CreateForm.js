import React, { useImperativeHandle } from 'react';
import { Form, Input } from 'antd';

const CreateForm = Form.create({
    name: 'createForm'
})(
    React.forwardRef((props, ref) => {
        const { form } = props;
        const { getFieldDecorator } = form;

        useImperativeHandle(ref, () => ({
            form
        }));

        return (
            <div>
                <Form>
                    <Form.Item label="name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please type your name!' }]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </div>
        );
    })
);

export default CreateForm;
