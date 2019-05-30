# zhengqiangbao_frontend

挣钱宝web前端源码，使用React框架实现。

## Quick Start

```javascript
npm install
npm start
```

## Usage

先给出src 文件夹说明：

* components: 定义了常用的子组件，可以直接调用，或者直接使用material-ui组件库的组建；
* view：主界面层的组件，点击边界栏对应导航按钮即可界面跳转；
* layouts：顶层组件，包括了sidebar组件和主界面组件等；
* routes：路由跳转逻辑，以字典的形式定义。

npm start之后，不用关闭进程，可以边修改代码，边预览界面效果。
现在的工作主要是：

1. 编写主界面的组件，见view文件夹（注：已经给出了四个主界面的文件，需要根据需求和设计进行更改。）
2. 增加登录注册界面。
