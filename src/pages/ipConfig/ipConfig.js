import React, { useReducer } from 'react';
import { Table, Input, Select, Form,Button } from 'antd';



export default function ipConfig(props) {
    // console.log(props)
    // 定义表头
    const { Option } = Select
    const [state, dispatch] = useReducer((state, actions) => ({ ...state, ...actions }), {
        data: [
            { '1': '1' }
        ]
    })
    const timeout = setTimeout(() => {
        dispatch({
            data: [
                {
                    'id': '1',
                    'ip': '10.157.128.1',
                    'type': 'IPV4',
                    'status': '待启用',
                    'segment': '10.157.128.0',
                    'room': '服务器管理室01',
                    'system': '网管系统',
                },
                {
                    'id': '2',
                    'ip': '10.157.128.2',
                    'type': 'IPV4',
                    'status': '待启用',
                    'segment': '10.157.128.0',
                    'room': '服务器管理室01',
                    'system': '网管系统',
                }
            ]
        })
        clearTimeout(timeout)
    }, 5000)
    const columns = [
        {
            title: 'IP地址',
            dataIndex: 'ip',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 1,
            },
        },
        {
            title: 'IP类型',
            dataIndex: 'type',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 2,
            },
        },
        {
            title: '使用状态',
            dataIndex: 'status',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'IP网段',
            dataIndex: 'segment',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 4,
            },
        },
        {
            title: '机房名称',
            dataIndex: 'room',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 5,
            },
        },
        {
            title: '业务名称',
            dataIndex: 'system',
            width: 120,
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 6,
            },
        }
    ]

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    function onChanges(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    return (
        <div>
            <Form layout='inline' style={{display:'inline'}}>
                <Form.Item
                label="IP地址"
                name="IP地址"
                >
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="IP类型" name="IP类型">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={onChanges}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        allowClear={true}
                    // filterOption={(input, option) =>
                    //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                        <Option value="IPV2">IPV2</Option>
                        <Option value="IPV4">IPV4</Option>
                        <Option value="IPV6">IPV6</Option>
                    </Select>
                </Form.Item>
                <Form.Item></Form.Item>
            </Form>
            <Button
            type="primary"
            style={{background:'green'}}
            href='http://localhost:3000/sdIncubator/ipConfig/Addip'>新增</Button>
            <Table
                columns={columns}
                dataSource={state.data}
                onChange={onChange}
            />
        </div>
    )


}