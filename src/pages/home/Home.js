import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { Page } from 'sdcube';
import config from 'config';

import { Card, Layout, Tabs, Icon } from 'antd';
// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './index.css'

// 引入echarts
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



const routePrefix = config.routePrefix;
const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export default class home extends Component {
    // componentDidMount = () => {
    // };
    componentWillUnmount = () => {
        // 解决组件被销毁后，state改变时引发的告警（组件已被销毁，但状态仍在更新）
        this.setState = (state, callback) => { return; };
    };
    componentDidMount() {
        var _this = this;
        //在这里设一个定时器是因为react在component的时候拿到数据但是父元素没有渲染呢所有给父元素设置的宽度会不生效
        setTimeout(function () {
            _this.initChart();
        }, 20);
    }
    initChart() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('main'));
        var myChart2 = echarts.init(document.getElementById('mains'));
        // 绘制图表
        var option1 = {
            title: {
                text: '销售目标完成状况',
                padding: [
                    20,  // 上
                    10, // 右
                    5,  // 下
                    20, // 左
                ]
            },
            backgroundColor: '#ffffff',
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '25%',
                containLabel: true
            },
            legend: {
                show: true,
                data: ['目标销售额', '当前销售额'],
                right: 50,
                top: 50,
                type: 'plain',
                textStyle: {
                    color: "#ccc"
                },
                itemWidth: 120,
                itemHeight: 20,
                // itemGap: 35
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#a6a6a6'
                    }
                },
                axisLabel: {
                    // interval: 0,
                    // rotate: 40,
                    textStyle: {
                        fontFamily: 'Microsoft YaHei'
                    }
                },
            },

            yAxis: {
                type: 'value',
                max: '1200',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a6a6a6'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#adadad'
                    }
                },
                axisLabel: {}
            },
            "dataZoom": [{
                "show": true,
                "height": 12,
                "xAxisIndex": [
                    0
                ],
                bottom: '8%',
                "start": 10,
                "end": 90,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#d3dee5",

                },
                textStyle: {
                    color: "#fff"
                },
                borderColor: "#90979c"
            }, {
                "type": "inside",
                "show": true,
                "height": 15,
                "start": 1,
                "end": 35
            }],
            series: [
                {
                    name: '目标销售额',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: '#a0a4e8'
                            }, {
                                offset: 1,
                                color: '#8889de'
                            }]),
                            // barBorderRadius: 11,
                        }
                    },
                    data: [400, 600, 700, 700, 1000, 400, 400, 600, 700, 600, 400, 900]
                },
                {
                    name: '当前销售额',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fbb273'
                            }, {
                                offset: 1,
                                color: '#f5957f'
                            }]),
                            // barBorderRadius: 12,
                        },
                    },
                    data: [400, 400, 300, 300, 300, 400, 400, 400, 300, 500, 400, 700]
                },
            ]
        };
        var option2 = {
            title: {
                text: '全省地市累计销售额统计',
                top: '5%',
                left: '1%',
                textStyle: {
                    color: '#747474',
                    align: 'center',
                }
            },
            backgroundColor: '#ffffff',
            grid: {
                left: '5%',
                right: '5%',
                top: '25%',
                bottom: '5%',
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                show: true,
                x: 'center',
                top: '12%',
                y: '35',
                icon: 'stack',
                itemWidth: 120,
                itemHeight: 20,
                textStyle: {
                    color: '#1bb4f6'
                },
                data: ['当前销售额', '目标销售额']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color:'#d9d9d9'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#397cbc'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#195384'
                        }
                    },
                    data: ['珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    max: '2000',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#a6a6a6'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#adadad'
                        }
                    },
                    axisLabel: {}
                }
            ],

            series: [
                {
                    name: '目标销售额',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fef0af'
                            }, {
                                offset: 0.8,
                                color: '#ffffff'
                            }], false),
                            shadowColor: '#fef0af',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {

                            color: '#f2ec93',
                            borderColor: '#f2ec93',
                            borderWidth: 12
                        }
                    },
                    data: [1500, 1200, 800, 500, 700, 830, 1510, 920, 710, 1234, 960, 200, 1880, 1020, 710, 634, 160, 1034, 360]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#74a2ff'
                            }, {
                                offset: 0.8,
                                color: '#ffffff'
                            }], false),
                            shadowColor: '#fff',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#5990ff',
                            borderColor: '#fff',
                            borderWidth: 12

                        }
                    },
                    data: [1200, 800, 400, 700, 900, 1230, 1210, 820, 910, 834, 260, 880, 1210, 820, 910, 834, 260, 834, 260]
                },
            ]
        };

        var app = {
            currentIndex: -1,
            currentIndexs: -1,
        };
        setInterval(function () {
            var dataLen = option1.series[0].data.length;
            var dataLens = option2.series[0].data.length;
            // 取消之前高亮的图形
            myChart1.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            myChart2.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app.currentIndexs
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            app.currentIndexs = (app.currentIndexs + 1) % dataLens;
            //console.log(app.currentIndex);
            // 高亮当前图形
            myChart1.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndex,
            });
            myChart2.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndexs,
            });
            // 显示 tooltip
            myChart1.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            myChart2.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndexs
            });


        }, 10000);
        myChart1.setOption(option1);
        myChart2.setOption(option2)
    }
    render() {
        return (
            <Layout>
                <Content>
                    {/* <Link to={`${routePrefix}/home/homedetail/1`} style={{float: 'right','margin-right': '1.5%'  }}>子页面</Link> */}
                    <div style={{ 'font-size': '18px' }}>
                        <span className='heads_title'>我参与的</span>
                        <Link to={`${routePrefix}/home/homedetail/1`} style={{ float: 'right', 'margin-right': '1.5%' }}>子页面</Link>
                    </div>
                    <div style={{ 'margin-top': '20px' }}>
                        <Card style={{ width: '30%', display: 'inline-block', 'margin-left': '3%', 'background': '-webkit-linear-gradient(left,#a5a8ea,#8486dc)', 'color': '#f2f2fc', 'margin-bottom': '20px' }}>
                            {/* style={{'font-size':'18px',width: '100%','white-space':'nowrap'}} */}
                            <p className='title_head'>8月 “战狼” 行动</p>
                            <p className='title_text'>超级日租卡用户获取活动，一元一天800M</p>
                            <p className='title_text'>循环叠加，全国流量不封顶</p>
                            <div className='modelbottom'>
                                <span className='modeldiv'></span>
                                <span className='modelnum'>55%</span>
                            </div>
                        </Card>
                        <Card style={{ width: '30%', display: 'inline-block', 'margin-left': '1.5%', 'background': '-webkit-linear-gradient(left,#7cc1fd,#769cfc)', 'color': '#f2f2fc' }}>
                            <p className='title_head'>3G升4G大冲锋</p>
                            <p className='title_text'>超级日租卡用户获取活动，一元一天800M</p>
                            <p className='title_text'>循环叠加，全国流量不封顶</p>
                            <div className='modelbottom' style={{ 'background': '#698dd4' }}>
                                <span className='modeldiv'></span>
                                <span className='modelnum'>55%</span>
                            </div>
                        </Card>
                        {/* title="Default size card" extra={<a href="#">More</a>} */}
                        <Card style={{ width: '30%', display: 'inline-block', 'margin-left': '1.5%', 'background': '-webkit-linear-gradient(left,#fbb173,#f79f7b,#f49181)', 'color': '#f2f2fc' }}>
                            <p className='title_head'>异网获取，“飓风” 活动</p>
                            <p className='title_text'>超级日租卡用户获取活动，一元一天800M</p>
                            <p className='title_text'>循环叠加，全国流量不封顶</p>
                            <div className='modelbottom' style={{ 'background': '#ce836f' }}>
                                <span className='modeldiv'></span>
                                <span className='modelnum'>55%</span>
                            </div>
                        </Card>
                    </div>
                    {/* 第二模块 */}
                    <div style={{ 'font-size': '18px' }}>
                        <span className='heads_title'>我参与的</span>
                    </div>
                    <div id="main"></div>
                    <div id="mains"></div>
                </Content>
                <Sider width='350' style={{ background: '#f4f4f4', width: '500' }}>
                    <div className='hititle'>
                        {/* <img src="../../assets/images/Shape 1.png" alt=""/> */}
                        <div className='imageicon'></div>
                        <span className='hitetxttitle'>我的消息</span>
                        <span className='orginnum'>12</span>
                        <a href="#" style={{'margin-right':'5px'}}>更多>></a>
                    </div>
                    <div className='modeltitle'>我的待办</div>
                    <Card className='cardboody'>
                        <p className='title_text' style={{ color: '#000' }}>地市约谈:广州市电信分公司,关于省</p>
                        <p className='title_text' style={{ color: '#000' }}>公司集约活动参与情况积极性问题约...</p>
                        <p className='timenum'>2018-08-11  14:30:22</p>
                    </Card>
                    <Card className='cardboody'>
                        <p className='title_text' style={{ color: '#000' }}>地市约谈:广州市电信分公司,关于省</p>
                        <p className='title_text' style={{ color: '#000' }}>公司集约活动参与情况积极性问题约...</p>
                        <p className='timenum'>2018-08-11  14:30:22</p>
                    </Card>
                    <Card className='cardboody'>
                        <p className='title_text' style={{ color: '#000' }}>地市约谈:广州市电信分公司,关于省</p>
                        <p className='title_text' style={{ color: '#000' }}>公司集约活动参与情况积极性问题约...</p>
                        <p className='timenum'>2018-08-11  14:30:22</p>
                    </Card>
                    <Tabs className='cardboodys' defaultActiveKey="1">
                        <TabPane tab={
                            <span>
                                <Icon type="windows" />
                            公告
                            </span>
                        } key="1">
                            <div className='list_body'><div className='balls'></div><span>超级日租卡获取活动</span><span className='times'>08-11</span> </div>
                            <div className='list_body'><div className='balls'></div><span>宽带新装限时优惠活动</span><span className='times'>08-03</span> </div>
                            <div className='list_body'><div className='balls'></div><span>政企专线提速</span><span className='times'>08-01</span> </div>
                            <div className='list_body'><div className='balls'></div><span>三季度各地市销售额季...</span><span className='times'>07-26</span> </div>
                            <div className='list_body'><div className='balls'></div><span>明日活动发布事项,通知...</span><span className='times'>08-17</span> </div>

                        </TabPane>
                        <TabPane tab={
                            <span>
                                <Icon type="link" />
                            动态
                            </span>
                        } key="2">
                            <div className='list_body'><div className='balls'></div><span>超级日租卡获取活动</span><span className='times'>08-11</span> </div>
                            <div className='list_body'><div className='balls'></div><span>宽带新装限时优惠活动</span><span className='times'>08-03</span> </div>
                            <div className='list_body'><div className='balls'></div><span>政企专线提速</span><span className='times'>08-01</span> </div>
                            <div className='list_body'><div className='balls'></div><span>三季度各地市销售额季...</span><span className='times'>07-26</span> </div>
                            <div className='list_body'><div className='balls'></div><span>明日活动发布事项,通知...</span><span className='times'>08-17</span> </div>

                        </TabPane>
                    </Tabs>
                </Sider>
            </Layout>

        )
    }
}


