import pathToRegexp from 'path-to-regexp';

// 获取路由配置地址
const getRoutesConfig = (routes) => {
    let routesConfig = [];
    routes.forEach(item => {
        if (item.tag === 'Route' && item.path) {
            routesConfig.push(item.path);
        }
        if (item.routes) {
            routesConfig = routesConfig.concat(getRoutesConfig(item.routes))
        }
    });
    return routesConfig;
};
// 获取菜单栏数组(包括children节点,仅url有链接的)
const getMenuConfig = (pKey, menu) => {
    let menuConfig = [];
    menu.forEach(item => {
        item.pKey = pKey;
        if (item.URL) {
            menuConfig.push(item);
        }
        if (item.children) {
            menuConfig = menuConfig.concat(getMenuConfig(item.ID, item.children))
        }
    });
    return menuConfig;
}

// 获取菜单栏数组(包括children节点)
const getAllMenuConfig = (pKey, menu) => {
    let menuConfig = [];
    menu.forEach(item => {
        item.pKey = pKey;
        menuConfig.push(item);
        if (item.children) {
            menuConfig = menuConfig.concat(getMenuConfig(item.ID, item.children))
        }
    });
    return menuConfig;
}

/**
 * 获取选中的key值
 * @param {Array} routerConfig  路由配置信息
 * @param {String} pathname 当前路由地址
 * @param {Array} menuConfig 菜单栏数据
 * @return 返回路由高亮的ID
 */
const getSelectKeys = (routesConfig = [], pathname, menuConfig = []) => {
    let selectedKeys = [];

    // 遍历路由地址，匹配与当前页面url匹配的地址
    routesConfig.forEach((path) => {
        const pathRegexp = pathToRegexp(path);
        // 匹配成功后，遍历菜单栏地址，获取高亮的id
        if (pathRegexp.test(pathname)) {
            menuConfig.forEach(item => {
                if (pathRegexp.test(item.URL)) {
                    selectedKeys.push(item.ID);
                };
            });
        }
    });
    // 如果精准匹配不到，则路由地址可能属于某个页面的子页面，不存在于菜单栏，移除一层route，再次遍历
    if (selectedKeys.length === 0) {
        const pathnameArr = pathname.split('/');
        if (pathnameArr.length > 1) {
            const nextPathName = pathnameArr.slice(0, pathnameArr.length - 1).join('/');
            selectedKeys = [...getSelectKeys(routesConfig, nextPathName, menuConfig)]
        }
    }
    return selectedKeys;
}
const getIFrameSelectKeys = (pathname, menuConfig = []) => {
    let selectedKeys = [];
    menuConfig.forEach(item => {
        if (item.URL === pathname) {
            selectedKeys.push(item.ID);
        };
    });
    return selectedKeys;
}
// 获取url上参数
const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);  // 解密   加密：escape()
    return null;
}

export {
    getRoutesConfig,
    getMenuConfig,
    getAllMenuConfig,
    getSelectKeys,
    getIFrameSelectKeys,
    getQueryString
}