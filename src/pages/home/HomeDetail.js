import React, { useRef } from "react";
import { Button } from "antd";

import CreateForm from "./CreateForm";

const Landing = () => {
    const formRef = useRef(null);

    const onOk = () => {
        console.log(formRef);
        let form = formRef.current.form;
        form.validateFields((err, values) => {
            if (err) {
                console.log('Error: ', values);
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
        });
    };

    return (
        <div>
            <h1>测试函数式form组件获取数据</h1>
            <Button onClick={onOk}>获取数据</Button>
            <CreateForm
                onOk={onOk}
                wrappedComponentRef={formRef}
            />
        </div>
    );
};

export default Landing;
