import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadScript } from '../../assets/js/utils';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/graph';
import './index.less';

function getCoord(key, targetArray = []) {
    for (let i = 0; i < targetArray.length; i++) {
        if (key === targetArray[i].name) {
            return {
                coord: targetArray[i].value
            };
        }
    }
    throw new Error('no  mapped point');
}
// 深克隆
function deepClone(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepClone(source[item]) : source[item];
    }
    return sourceCopy;
}
/**
 * 
 */
export default class IndoorHeatMap extends Component {
    heatmap = null;
    renderHeatMap = (data) => {
        if (typeof window.h337 !== 'undefined') {
            if (!this.heatmap) {
                this.heatmap = window.h337.create({
                    container: this.heatmapLayer
                });
            }
            this.heatmap.setData({
                max: 5,
                data
            });
        } else {
            loadScript('/libs/heatmap.js-master/build/heatmap.js', 2, () => {
                this.heatmap = window.h337.create({
                    container: this.heatmapLayer
                });
                this.heatmap.setData({
                    max: 5,
                    data
                });
            });
        }

    }
    renderGraph = (x, y, data) => {
        const myChart = echarts.init(this.heatmapLayer);
        let pointData = null;
        let lineData = null;
        const { points, lines } = data;
        if (points && lines) {
            pointData = points.map(item => {
                item.y = y - item.y;
                item.value = [item.x, item.y];
                return item;
            });
            lineData = lines.map(item => {
                const source = getCoord(item.source, pointData);
                const target = getCoord(item.target, pointData);
                return [source, target];
            });
        } else {
            throw new Error('wrong data format for graph');
        }

        // const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
        myChart.setOption({
            grid: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            xAxis: {
                show: false,
                type: 'value',
                min: 0,
                max: x

            },
            yAxis: {
                show: false,
                type: 'value',
                min: 0,
                max: y
            },
            series: [{
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 10,
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: pointData,
                itemStyle: {
                    normal: {
                        label: {
                            position: ['20%', '100%'],
                            show: false,
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#a0a0a0',
                        opacity: 1,
                        width: 2,
                        // curveness: 0.1
                    }
                }
            }, {

                type: 'lines',
                coordinateSystem: 'cartesian2d',
                effect: {
                    show: true,
                    smooth: false,
                    trailLength: 0,
                    symbol: "arrow",
                    color: '#3dff02',
                    symbolSize: 6
                },
                lineStyle: {
                    normal: {

                        color: '#3dff02',
                        width: 2,
                        opacity: 1,
                        curveness: 0.1//贝塞尔曲线度
                    }
                },
                data: lineData
            }]
        }, true)
    }

    componentDidMount() {
        const svgLayer = this.svglayer;
        const heatmapLayer = this.heatmapLayer;
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        let originTX = -(containerWidth / 2);
        let originTY = -(containerHeight / 2);
        const offset = [];
        this.img.onload = () => {
            const cssStyle = window.getComputedStyle(svgLayer, null);
            heatmapLayer.style.width = cssStyle.width;
            heatmapLayer.style.height = cssStyle.height;
            originTX = - parseInt(cssStyle.width, 10) / 2;
            originTY = - parseInt(cssStyle.height, 10) / 2;
            // ？？？？？
            // setTimeout(() => {
            //     _this.render0(this.props.type, this.props.data);
            // }, 3000);
        }

        /**
         * todo
         * default enabled = true
         */
        if (!this.props.enabled) {
            return;
        }
        let status = 0;
        let origin = [];
        let lastFactor = 1;
        this.container.onmousedown = function (event) {
            status = 1;
            origin[0] = event.clientX;
            origin[1] = event.clientY;
            if (status === 1)
                this.style.cursor = 'move'
        }
        this.container.onmouseup = function (event) {
            status = 0;
            originTX = offset[0];
            originTY = offset[1];
            this.style.cursor = 'default';
        }
        this.container.onmousemove = function (event) {
            if (status === 1) {
                offset[0] = event.clientX - origin[0] + originTX;
                offset[1] = event.clientY - origin[1] + originTY;
                heatmapLayer.style.transform = svgLayer.style.transform = 'scale(' + lastFactor + ') translate(' + offset[0] + 'px,' + offset[1] + 'px)';
            }
        }

        this.container.onmousewheel = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var scrollFactor = event.wheelDelta / 1200;
            if (Math.abs(scrollFactor) > 1) {
                return;
            }
            var testFactor = parseFloat(lastFactor) + parseFloat(scrollFactor);
            testFactor = testFactor.toFixed(1);
            if (testFactor > 2 || testFactor < 0.5) {
                return;
            }
            lastFactor = testFactor;
            const transform = `translate(${originTX}px,${originTY}px) scale(${testFactor})`;
            heatmapLayer.style.transform = svgLayer.style.transform = transform;
        }
    }
    componentWillReceiveProps(nextProps) {
        this.render0(nextProps.type, nextProps.data);
    }
    render0 = (type, data) => {
        if (type === 'heatmap') {
            this.renderHeatMap(data);
        } else if (type === 'graph') {
            if (this.heatmapLayer.style.width) {
                data = deepClone(data);
                this.renderGraph(parseInt(this.heatmapLayer.style.width, 10), parseInt(this.heatmapLayer.style.height, 10), data);
            }
        }
    }
    componentWillUnmount() {
        this.heatmap = null;
        this.container.onmousedown = null;
        this.container.onmouseup = null;
        this.container.onmousemove = null;
    }
    render() {
        return (
            <div
                className="map-container"
                ref={(container) => { this.container = container }}
            >
                <div
                    className="ih svg-layer"
                    ref={(svglayer) => { this.svglayer = svglayer }}
                >
                    <img
                        src={this.props.svgMapURL}
                        ref={(img) => { this.img = img }} alt=""
                    />
                </div>
                <div
                    className="ih heatmap-layer"
                    ref={(heatmapLayer) => { this.heatmapLayer = heatmapLayer }}
                >
                </div>
            </div>
        )
    }
}

IndoorHeatMap.propTypes = {
    data: PropTypes.any.isRequired,
    svgMapURL: PropTypes.string,
    enabled: PropTypes.bool
}