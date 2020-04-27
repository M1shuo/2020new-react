# 室内热力图API

1. svgMapURL  室内地图底图
2. type  图类型   heatmap || graph
3. data  数据
## 热力图

```js
<IndoorHeatMap
    svgMapURL={require('../data/0062.svg')}
    type="heatmap"
    data={
        [
            { x: 50, y: 80, value: 4 },
            { x: 63, y: 80, value: 4 },
            { x: 150, y: 80, value: 4 }
        ]}
  /> 
```


## 轨迹图

```jsx
<IndoorHeatMap
    svgMapURL={require('../data/0062.svg')}
    type="graph"
    data={{
        points: [
            { x: 50, y: 80, name: 'gg' },
            { x: 63, y: 80, name: 'll' },
            { x: 150, y: 80, name: 'kk' }
        ],
        lines: [
            { source: 'gg', target: 'll' },
            { source: 'll', target: 'kk' },
        ]
    }}
/>
```