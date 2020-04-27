### 开发指南
> 务必遵从代码规范


1. 克隆项目 git clone git@192.168.60.133:sendife/sd_incubator.git 
2. 新建本地分支
3. 贡献代码（功能开发，bug修改...）
3. 提交代码,并把本地分支推送到远程
4. 发出合并请求
5. git pull origin master 更新最新代码，重复步骤3，4，5


### package.json proxy 代理
```json     
"proxy": {
    //  匹配不包含/bigdata/modules或/DashboardEditor且不等于/bigdata/login的字符串;
    "^(?!(/bigdata/modules)|(/DashboardEditor)|((/bigdata/login)$))": {
        "target": "http://192.168.60.145:8999/",
        "secure": false
    },
    // 匹配/api/;
    "/api/": {
        "target": "http://192.168.60.145:8999/",
        "secure": false
    }
}
```