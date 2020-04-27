// 配置文件
// import config from './config';
const proxy = require('http-proxy-middleware');
// fix:无法通过import引入变量，只能通过require引入变量
const apiContext = 'api';
module.exports = function (app) {
    // 未固定接口前缀的不需要加apiContext
    app.use(proxy('/oauth2', {
        "target": 'http://192.168.62.58:15003/',
        "secure": false
    }));
    // 固定接口前缀
    app.use(proxy(`${apiContext}/nav`, {
        "target": 'http://192.168.62.58:15004/',
        "secure": false
    }));
}