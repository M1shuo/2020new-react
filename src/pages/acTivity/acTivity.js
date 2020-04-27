//引入react
import React from 'react';
// 引入antd
import { DatePicker, Layout, Input, Button, Radio, Tabs, Table , Pagination  } from 'antd';
// 引入日期控件
import moment from 'moment';
//引入样式
import './index.css'

//定义日期格式
const dateFormat = 'YYYY/MM/DD';
// 定义布局组件
const { Content } = Layout;
// 定义切换标签
const { TabPane } = Tabs;
// Header, Footer, Sider,

//定义表格文件
const columns = [
    {
        title: '活动编码',
        dataIndex: 'name',
        sorter: (a, b) => a.name - b.name,
        className:'bluesclous',
        defaultSortOrder: ['descend'],
    },
    {
        title: '活动名称',
        dataIndex: 'tiele',
        key: 'tiele',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.tiele.length - b.tiele.length,
    },
    {
        title: '业务场景',
        dataIndex: 'model',
        defaultSortOrder: 'descend',
        className:'bluesclous',
        // sorter: (a, b) => a.model.length - b.model.length,
    },
    {
        title: '活动状态',
        dataIndex: 'address',
        // onFilter: (value, record) => record.address.indexOf(value) === 0,
        // sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '开始日期',
        dataIndex: 'Begintime',
        key: 'Begintime',
        className:'bluesclous',
    },
    {
        title: '结束日期',
        dataIndex: 'Endtime',
        key: 'Endtime',
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
           <span><span style={{'display':'none'}}>{text}</span><a href="#" >评估表现</a></span>
        ),
    }
];

const data = [
    {
        key: '1',
        name: '2018072110001',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '用户换机',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '1'
    },
    {
        key: '2',
        name: '2018072110002',
        age: 42,
        tiele: '超级日租卡用户获取活动',
        model: '用户换机',
        address: '已结束',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '2'
    },
    {
        key: '3',
        name: '2018072110003',
        age: 22,
        tiele: '超级日租卡用户获取活动',
        model: '信用租机',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '3'
    },
    {
        key: '4',
        name: '2018072110004',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '3G升4G',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '4'
    },
    {
        key: '5',
        name: '2018072110005',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '3G升4G',
        address: '已结束',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '5'
    },
    {
        key: '6',
        name: '2018072110006',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '用户换机',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '6'
    },
    {
        key: '7',
        name: '2018072110007',
        age: 42,
        tiele: '超级日租卡用户获取活动',
        model: '用户换机',
        address: '已结束',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '7'
    },
    {
        key: '8',
        name: '2018072110008',
        age: 22,
        tiele: '超级日租卡用户获取活动',
        model: '信用租机',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '8'
    },
    {
        key: '9',
        name: '2018072110009',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '3G升4G',
        address: '运行中',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '9'
    },
    {
        key: '10',
        name: '20180721100010',
        age: 22,
        tiele: '战狼_异网获取活动电竞',
        model: '3G升4G',
        address: '已结束',
        Begintime: '2018.7.21',
        Endtime: '2018.7.31',
        id: '10'
    },
];

const pagination = {
    defaultPageSize:5,
    defaultCurrent:1,

}

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    // });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
}


//导出文件
export default function acTivity(props) {

    return (
        // <div>hello,world</div>
        <Layout>

            <Layout>
                <Content style={{ background: '#fff' }}>
                    <div className='titles'>活动列表</div>
                    <div className='modeltop'>
                        <span>活动时间：</span>
                        <DatePicker id='Begintime' defaultValue={moment('2019/10/21', dateFormat)} format={dateFormat} />
                        <DatePicker id='Endtime' defaultValue={moment('2019/10/21', dateFormat)} format={dateFormat} />
                    </div>
                    <div className='modeltwo'>
                        <span>活动名称：</span>
                        <Input id='textmodel' className='inputcontent' placeholder="请输入关键字" />
                    </div>
                    <div className='modelbutton'>
                        <Button type="primary">查询</Button>
                        <Button>重置</Button>
                    </div>
                    <div className='modeltop'>
                        <span>业务场景：</span>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">3G升4G</Radio.Button>
                            <Radio.Button value="b">用户换机</Radio.Button>
                            <Radio.Button value="c">信用租机</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='modeltwo'>
                        <span>活动状态：</span>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">运行中</Radio.Button>
                            <Radio.Button value="b">已结束</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Tabs className='tabstop' defaultActiveKey="1">
                        <TabPane
                            tab={<span>我创建的模型</span>} key="1">
                            <Table className='activetable' columns={columns} pagination={pagination}  dataSource={data} onChange={onChange} />
                        </TabPane>
                        <TabPane
                            tab={<span>上架模型</span>} key="2">
                           <Table className='activetable' columns={columns} pagination={pagination}  dataSource={data} onChange={onChange} />
                        </TabPane>
                        <TabPane
                            tab={<span>未上架模型</span>} key="3">
                           <Table className='activetable' columns={columns} pagination={pagination}  dataSource={data} onChange={onChange} />
                        </TabPane>
                        <TabPane
                            tab={<span>最新模型</span>} key="4">
                            <Table className='activetable' columns={columns} pagination={pagination}  dataSource={data} onChange={onChange} />
                        </TabPane>
                        <TabPane
                            tab={<span>最热模型</span>} key="5">
                           <Table className='activetable' columns={columns} pagination={pagination}  dataSource={data} onChange={onChange} />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    )
}


