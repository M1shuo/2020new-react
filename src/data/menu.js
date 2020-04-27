export const menu = [{
    "ID": "ff8080816101ebd5016101f665a20000",
    "ICONCLS": "home",
    "NAME": "首页",
    "SEQ": 1,
    "TARGET": "",                              // XXX: 字段无用处，可以删除？
    "URL": "/sdIncubator/home",
    "SYRESOURCE_ID": "",
    "SYRESOURCETYPE_ID": "0",
    "open_way": "",                           // [Replace_Tab] 替换当前窗口；[Iframe] iframe内嵌；[New_Tab] 弹出新窗口；[] 切换页面
    "color": null,
    "iconClass": null,
    "children": []
},
{
    "ID": "example",
    "ICONCLS": "paper-clip",
    "NAME": "测试模块",
    "TARGET": "",
    "URL": "",
    "open_way": "",
    "children": [
        {
            "ID": "ipinput",
            "ICONCLS": "paper-clip",
            "NAME": "ipinput",
            "TARGET": "",
            "URL": "/sdIncubator/example/ipinput",
            "open_way": "",
            "children": []
        }, {
            "ID": "dropDownSelect",
            "ICONCLS": "paper-clip",
            "NAME": "dropDownSelect",
            "TARGET": "",
            "URL": "/sdIncubator/example/dropDownSelect",
            "open_way": "",
            "children": []
        }, {
            "ID": "Form校验",
            "ICONCLS": "paper-clip",
            "NAME": "Form校验",
            "TARGET": "",
            "URL": "/sdIncubator/example/formExample",
            "open_way": "",
            "children": []
        }, {
            "ID": "Table错位",
            "ICONCLS": "paper-clip",
            "NAME": "Table错位",
            "TARGET": "",
            "URL": "/sdIncubator/example/testTable",
            "open_way": "",
            "children": []
        }, {
            "ID": "promiseNestTest",
            "ICONCLS": "paper-clip",
            "NAME": "promiseNestTest",
            "TARGET": "",
            "URL": "/sdIncubator/example/promiseNestTest",
            "open_way": "",
            "children": []
        }, {
            "ID": "iframe1",
            "ICONCLS": "paper-clip",
            "NAME": "解决方案(Iframe)",
            "TARGET": "",
            "URL": "http://www.baidu.com",
            "open_way": "Iframe",
            "children": []
        }, {
            "ID": "iframe2",
            "ICONCLS": "paper-clip",
            "NAME": "成功案例(Iframe)",
            "TARGET": "",
            "URL": "http://www.baidu.com",
            "open_way": "Iframe",
            "children": []
        }
    ]
},
{
    "ID": "onesfor",
    "ICONCLS": "windows",
    "NAME": "活动管理",
    "TARGET": "",
    "URL": "/sdIncubator/acTivity",
    "open_way": "",
    "children": [
        {
            "ID": "onesfors",
            "ICONCLS": "read",
            "NAME": "活动列表",
            "TARGET": "",
            "URL": "/sdIncubator/acTivity",
            "open_way": "",
            "children": []
        },
        {
            "ID": "onesforse",
            "ICONCLS": "carry-out",
            "NAME": "标签库管理",
            "TARGET": "",
            "URL": "/sdIncubator/acTivity/Lable",
            "open_way": "",
            "children": []
        },
        {
            "ID": "onesforsa",
            "ICONCLS": "usergroup-add",
            "NAME": "用户群管理",
            "TARGET": "",
            "URL": "/sdIncubator/acTivity/userModel",
            "open_way": "",
            "children": []
        },
    ]
},
{
    "ID": "ff8080816101ebd5016101f88c7f0005",
    "ICONCLS": "home",
    "NAME": "系统管理",
    "SEQ": 5,
    "TARGET": "",
    "URL": "",
    "SYRESOURCE_ID": "",
    "SYRESOURCETYPE_ID": "0",
    "open_way": "",
    "color": null,
    "iconClass": null,
    "children": [{
        "ID": "ff8080816101ebd5016101f97eb70008",
        "ICONCLS": "home",
        "NAME": "角色管理",
        "SEQ": 1,
        "TARGET": "",
        "URL": "/sdIncubator/system/roleManagement",
        "SYRESOURCE_ID": "ff8080816101ebd5016101f88c7f0005",
        "SYRESOURCETYPE_ID": "0",
        "open_way": "Replace_Tab",
        "color": null,
        "iconClass": null,
        "children": [{
            "ID": "角色管理子页面",
            "ICONCLS": "home",
            "NAME": "角色管理子页面",
            "SEQ": 1,
            "TARGET": "",
            "URL": "/sdIncubator/system/roleManagement/roleDetail",
            "SYRESOURCE_ID": "ff8080816101ebd5016101f88c7f0005",
            "SYRESOURCETYPE_ID": "0",
            "open_way": "Replace_Tab",
            "color": null,
            "iconClass": null,
            "children": []
        }]
    }, {
        "ID": "ff8080816101ebd5016101f9bcf70009",
        "ICONCLS": "home",
        "NAME": "用户管理",
        "SEQ": 2,
        "TARGET": "",
        "URL": "/sdIncubator/system/userManagement",
        "SYRESOURCE_ID": "ff8080816101ebd5016101f88c7f0005",
        "SYRESOURCETYPE_ID": "0",
        "open_way": "Replace_Tab",
        "color": null,
        "iconClass": null,
        "children": []
    }, {
        "ID": "ff8080816101ebd5016101f9f9ad000a",
        "ICONCLS": "home",
        "NAME": "权限管理",
        "SEQ": 3,
        "TARGET": "",
        "URL": "/sdIncubator/system/authorityManagement",
        "SYRESOURCE_ID": "ff8080816101ebd5016101f88c7f0005",
        "SYRESOURCETYPE_ID": "0",
        "open_way": "Replace_Tab",
        "color": null,
        "iconClass": null,
        "children": []
    }]

},
{
    "ID": "examples",
    "ICONCLS": "paper-clip",
    "NAME": "IP配置",
    "TARGET": "",
    "URL": "/sdIncubator/ipConfig",
    "open_way": "",
    "children": [
        {
            "ID": "indexip",
            "ICONCLS": "paper-clip",
            "NAME": "首页",
            "TARGET": "",
            "URL": "/sdIncubator/ipConfig",
            "open_way": "",
            "children": []
        },
        {
            "ID": "addips",
            "ICONCLS": "paper-clip",
            "NAME": "新增",
            "TARGET": "",
            "URL": "/sdIncubator/ipConfig/Addip",
            "open_way": "",
            "children": []
        },
        {
            "ID": "newecharts",
            "ICONCLS": "paper-clip",
            "NAME": "Echarts",
            "TARGET": "",
            "URL": "/sdIncubator/ipConfig/Echarts",
            "open_way": "",
            "children": []
        }
    ]
},
]