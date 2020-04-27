/**
 *  [layout] 布局类型
 *      可选参数：
 *          base    【左侧菜单布局】
 *          classic 【顶部菜单布局】
 *          topLeft 【上左菜单布局】
 *          app     【移动端布局】
 */

const config = {
    apiContext: '/api',                     // 接口前缀
    routePrefix: '/sdIncubator',            // 路由前缀
    app: {
        name: 'sd-incubator',              // 项目名称
        title: '前端开发平台',              // 项目名称
        layout: 'topLeft',                // 布局类型
        logoUrl: '',                      // 图标地址
        version: '',                      // 版本
        copyright: `xxx有限公司 ©${new Date().getFullYear()}`                     // 声明
    },
    permission: {
        url: '/permission.json'             //获取权限接口
    }

}
export default config;