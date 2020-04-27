import React, { Component } from 'react';
import { Table } from 'antd';


const columns = [
    {
        key: 'name',
        width: 60,
        title: '产品名',
        dataIndex: 'name',
        // render: text => <a href="javascript:;">{text}</a>,
    },
    {
        key: "province",
        width: 60,
        title: '省份',
        dataIndex: 'value',
    },
    {
        key: "sum",
        width: 120,
        title: '销量(汇总)',
        dataIndex: 'value',
    },
    //  {
    //     width: 60,
    //     title: '操作',
    //     dataIndex: 'value',
    // }
];
let data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        name: i,
        key: i,
        value: `name${i}`
    })
};

/**
 *  table 表格错位注意点
 * 1.设置横向滚动条后，横向滚动条的值必须大于或者等于列宽总和
 * 2.设置.ant-table td { white-space: nowrap;}的情况下，每一列设置的宽度一定要大于自身内容的宽度
 * 3.设置fixed情况下，必须设置宽度，非fixed的其中一行宽度可不设置(用于适配剩余宽度)
 * 4.内容过长的情况下，利用Tooltip显示完整的
 */
export default class TestTable extends Component {
    render() {
        return (
            <div style={{ width:'100%' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    // scroll={{ y: 200, x: true }}
                />
            </div>
        )
    }
}
