// eslint-disable-next-line
import config from './config';
//api公共前缀,开发时取消注释
// const context = config.apiContext;

export const api = {
    // 示例
    // post 登录接口
    // login: `${context}/loginController.do?login`,
    login: `/bigdata/loginController.do?login`,
    logout: `/bigdata/loginController.do?logout`,
    indentifyIamge: `/bigdata/loginController/getIndentifyIamge`, // 登录验证码
    menu: `/bigdata/nav/menu`,
};
