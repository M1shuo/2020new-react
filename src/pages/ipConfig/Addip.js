import React from 'react'
import {Input, Form,Button} from 'antd';
// Select,
export default function Addip(props) {
    const { TextArea } = Input;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      
      const validateMessages = {
        required: '${IPname} is required!',
        types: {
          email: '${IPtype} is not validate email!',
          number: '${IPnumber} is not a validate number!',
        },
        number: {
          range: '${IPnumber} must be between ${min} and ${max}',
        },
      };
      const onFinish = values => {
        console.log(values);
      };
    
    return(
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{width:'500px'}}>
        <Form.Item name={['user', 'IPname']} label="IP地址" rules={[{ required: false }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'IPtype']} label="IP类型" rules={[{ type: 'email' }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'IPnumber']} label="IP网段" rules={[{ required: true}]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', '描述']} label="IP网段">
            <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
}
