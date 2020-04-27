#  申迪前端编码规范(React)

## 项目结构
```
my_project
|-- config   webpack 配置文件
|-- doc      项目文档
|-- node_modules   项目依赖
|-- public   静态文件目录
|-- scripts  脚手架自动化脚本
|-- src      项目源码目录
    |--- assets         项目资源文件目录
         |---  images       项目图片资源
         |---  js           项目通用js
         |---  css|less     项目通用样式
    |--- components     通用组件
    |--- config         项目配置文件
    |--- data           测试数据目录
    |--- layout         项目布局
    |--- lib            内部依赖库
        |--- sdcube         申迪组件库
    |--- pages          项目页面组件
        |---  module1         一级项目模块
            |---  XXX.js        页面组件
            |---  XXX.less      页面样式
        |---  module2         多级项目模块
            |---  subModule1    页面模块1
                |---  XXX2.js
                |---  XXX2.less
            |---  subModule1    页面模块2
                |---  XXX2.js
                |---  XXX2.less
    |--- api.js         数据接口
    |--- App.js         应用级组件
    |--- index.js       项目入口文件
    |--- NotFound.js    404页面组件
    |--- routeConfig.js   路由配置
|-- .gitignore      gitlab提交忽略规则
```

## 项目命名规范
* 名字全部小写 demo / my_project 
* 多个单词以下划线分割 sendi_cloud_project
* 不要以拼音命名
```
    // bad
    sendi_yun_project

    // good
    sendi_cloud_project 
```  

## import规范
* 先import第三方依赖
* 再import本地依赖
* 最后import样式依赖
* 不同种类的import之间用空行隔开
```js
    // 第三方依赖
    import React , { Component } from 'react';
    import { connect } from 'redux';

    // 本地依赖
    import ChatWindow from './ChatWindow';
    import UserPage from './UserPage';
    
    // 样式
    import './user.less';
```

## javascript 

> 命名规范

* 普通js文件命名参考目录命名规范
* **React组件** 命名，大写开头,多个单词则每个单词开头大写
```js

    // bad
    image.js

    // good
    Image.js

    // bad 
    imageUpload.js

    // good
    ImageUpload.js
```

* 变量声明统一用 const, 需要修改变量值可以改用let
```js
    // bad 
    var name = 'Mike';

    // good
    const name = 'Mike';

    // good 
    for(let i = 0; i < 10; i++){
        // ...
    };
```

* 变量声明不用 , 分隔声明多个变量
```js
    // bad
    const name, age, job;

    // good
    const name = null;
    const age = null;
    const job = null;
```


* 常量命名,名字全部大写，单词以下划线分割,普通变量以驼峰命名法为准
```js
    //bad
    const  Repo_url = 'http:xxxx';
   
    //good
    const REPO_URL = 'http:xxxx';

    //bad 
    const menudata = [];
    const menu_data =[];

    //good
    const menuData = [];
```

* 使用对象方法的简写
```js

    // bad
    const atom = {
        value: 1,
        addValue: function (value) {
            return atom.value + value;
        },
    };

    // good
    const atom = {
        value: 1,
        addValue(value) {
            return atom.value + value;
        },
    };
```

* 使用对象属性值简写,且简写属性写在最前面

```js
    const lukeSkywalker = 'Luke Skywalker';
    const episodeOne = 'episodeOne';

    // bad
    const obj = {
        lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
    };

    // bad
    const obj = {
        episodeOne,
        value:12,
        lukeSkywalker,
    };

    // good
    const obj = {
        episodeOne,
        lukeSkywalker,
        value:12,
    };

```

* 浅拷贝对象的时候使用 … 操作符而不是 Object.assign
``` js
    // bad
    const original = {
        a: 1,
        b: 2,
    };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // good
    const original = {
        a: 1,
        b: 2
    };
    const copy = {
        ...original,
        c: 3,
    }; // copy => { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```


* 使用字面量创建数组
```js
    // bad
    const items = new Array();

    // good
    const items = [];
```

* 如果数组有多行，则在打开位置使用换行符，然后在关闭数组括号之前使用换行符
```js
    // bad
    const arr = [
        [0, 1], [2, 3], [4, 5],
    ];

    // good
    const arr = [[0, 1], [2, 3], [4, 5]];
    
    const arr = [
        [0, 1],
        [2, 3],
        [4, 5]
    ];

    // bad
    const objectInArray = [{
        id: 1,
    }, {
        id: 2,
    }];

    // good
    const objectInArray = [
        {
            id: 1,
        },
        {
            id: 2,
        },
    ];
```

* 使用 === 和 !== 优先于 == 和 !=
```js
    // bad
    if(number == 10){
        // ...
    }

    // good
    if(number === 10){
        // ...
    } 
```

* 三元表达式不能嵌套，通常写成单行表达式
```js
    // bad
    foo = maybe1 > maybe2 ? "bar" : value1 > value2 ?  "baz"  :  null;

    // good
    const maybeNull = value1 > value2 ?  'baz'  :  null;
    const foo = maybe1 > maybe2 ?  'bar' : maybeNull;

  ```

* 当运算符混合在一个语句中时，请将其放在括号内。混合算术运算符时，不要将 ** 和 % 与 + ， -，*，/ 混合在一起
```js

    // bad
    const foo = a && b <  0  || c >  0  || d +  1  ===  0;

    // bad
    const bar = a ** b -  5  % d;

    // bad
    if  (a || b && c)  {
        return d;
    }

    // good
    const foo =  (a && b <  0)  || c >  0  ||  (d +  1  ===  0);

    // good
    const bar =  (a ** b)  -  (5  % d);

    // good
    if  ((a || b)  && c)  {
        return d;
    }

    // good
    const bar = a + b / c * d;
```

* 使用 // FIXME: 来标识需要修正的问题
```js
    // FIXME: 不可用for in 对数据进行遍历，需更换方式
    for(key in data){
        // ...
    }

```


* 使用 // TODO: 来标识需要实现的的问题
```js
    onSearch = (e) => {
        // TODO: 校验查询查询，对接接口
        // ...
    }

```

* 使用 // XXX: 来标识功能已实现，但方式是否可优化存在疑惑的地方
```js
    onSearch = (e) => {
        // TODO: 校验查询查询，对接接口
        // ...
    }

```

* 避免存储this引用，使用箭头函数，或Function.prototype.bind()

```js

    // bad
    function foo()  {
        const  self  =  this;
        return  function  ()  {
            console.log(self);
        };
    }

    // bad
    function foo()  {
        const that =  this;
        return  function  ()  {
            console.log(that);
        };
    }

    // good
    function foo()  {
        return  ()  =>  {
            console.log(this);
        };
    }



```


> 格式

* 空格
```js
    // bad
    for(leti=0;i<10;i++){

    };

    // good  
    for(let i = 0; i < 10; i++) {

    };

    //bad
    const person ={
        name:'Mike'
    };
 
    //good
    const person = {
        name: 'Mike'
    };

    //bad
    function test(){

    }
    //good
    function test() {

    }

    //bad
    const test = ()=>{

    };

    //good
    const test = () => {

    };
```

* 缩进 （4个空格）
```js
    function test () {
        console.log('testing'...);
    }
```

* *要求写分号*
* 换行
```js
    //bad
    const person = { name : 'Mike'};

    //good
    const person = {
        name: 'Mike'
    };
```
* 字符串使用单引号或者字符串模板声明，不用双引号，书写html属性使用双引号



> React代码组织规范

* state 声明在构造函数之后，没有构造函数，则置顶
```js

    class Image extends Component {
        constructor(props){
            super(props);
        }
        state = {
            // ...
        }
    }


    class Image extends Component {
        state = {
            // ...
        }
    }
```


* 生命周期函数编写的位置要集中，采取以下顺序
```js
    componentWillMount
    componentDidMount
    componentWillReceiveProps
    shouldComponentUpdate
    componentWillUpdate
    componentDidUpdate
    componentWillUnmount
```

* 组件有多个属性，每个属性要换行
```js
    <Foo
        bar="bar"
        baz="baz"
    />
```


* 注释规范

```js

    //bad
    var  num = 10;   // comment

    //good 

    //comment
    var num = 10;
```

