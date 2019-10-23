

## 猫眼电影App(vue)

项目预览地址：[vue-movie-app](http://49.232.12.131/)

二维码：

![](https://upload-images.jianshu.io/upload_images/8562733-f6085d8a4fecd42f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

### 项目目录

前端

```
Vue-Movie-APP

|-- app

|   |-- src

|   |   |-- App.vue(入口文件)

|   |   |-- assets(静态文件)

|   |   |   |-- css(全局CSS覆盖)

|   |   |   |   |-- my-vant.scss

|   |   |   |   `-- reset.css

|   |   |   |-- font(字体图标)

|   |   |   |   `-- iconfont.css

|   |   |   `-- images(项目图片)

|   |   |-- components(公用组件)

|   |   |   |-- cinemaMap.vue(头部地图)

|   |   |   |-- cinemaSection.vue(影院列表)

|   |   |   |-- commentSection.vue(评论列表)

|   |   |   |-- empty.vue(空状态)

|   |   |   |-- filter-nav.vue(过滤影院导航)

|   |   |   |-- header.vue(全局头部)

|   |   |   |-- movieSection.vue(电影列表)

|   |   |   |-- my-video.vue(封装的video播放器)

|   |   |   |-- navFooter.vue(底部导航)

|   |   |   |-- select-movie.vue(电影切换)

|   |   |   `-- select-time.vue(观影时间切换)

|   |   |-- main.js

|   |   |-- mixin(混入，处理一些复用逻辑)

|   |   |   |-- handleImgandStars.js(处理评论star)

|   |   |   `-- handleUrl.js(处理不合法url)

|   |   |-- router.js(路由)

|   |   |-- store.js(vuex)

|   |   |-- utils(功能函数)

|   |   |   |-- citys.js(城市列表)

|   |   |   |-- request.js(请求封装)

|   |   |   |-- seat.js(选座逻辑接口)

|   |   |   |-- storage.js(localstoage封装)

|   |   |   `-- util.js(其他常用函数)

|   |   `-- views

|   |       |-- 404.vue(404页面)

|   |       |-- about-page.vue(关于我)

|   |       |-- auth.vue(登录注册主页面)

|   |       |-- buy-snack.vue(购买零食)

|   |       |-- buy-ticket.vue(买票)

|   |       |-- cinema-detail.vue(电影详情)

|   |       |-- cinema.vue(首页影院)

|   |       |-- city-select.vue(选择城市)

|   |       |-- comment-detail.vue(评论详情页)

|   |       |-- expected-movie.vue(首页期待电影)

|   |       |-- hot-movie.vue(首页热映)

|   |       |-- login.vue(登录页面)

|   |       |-- movie-detail.vue(电影详情)

|   |       |-- movie-order-detail.vue(我的电影订单详情)

|   |       |-- movie-order.vue(我的电影订单)

|   |       |-- movie.vue(首页电影)

|   |       |-- register.vue(注册)

|   |       |-- search-page.vue(搜索页面)

|   |       |-- select-cinema.vue(影院选择页面)

|   |       |-- select-seat.vue(选择页面)

|   |       |-- snack-order.vue(我的零食订单)

|   |       |-- snack-page.vue(订单详情页面)

|   |       |-- user.vue(我的)

|   |       `-- video-page.vue(video播放页)

|   |-- vue.config.js(wabpack配制文件)

```
服务端

```
|-- server

|   |-- app.js(处理公共逻辑)

|   |-- assets

|   |   `-- movie.json

|   |-- controller

|   |   |-- cinemas.js(影院逻辑处理)

|   |   `-- movie.js(电影逻辑处理)

|   |-- routes

|   |   |-- cinemas.js(影院路由)

|   |   `-- movie.js(电影路由)

|   |   |-- request.js(请求封装)

|   |   `-- util.js
```

### 技术栈

#### 前端

 \- vue

 \- vue-router

 \- vuex

 \- axios

 \- vant

 \- vue-cli3

 \- scss

 \- px-to-vw(移动端适配)

 \- fastClick(移动端300ms延迟)

#### 后端

 \- koa

 \- axios

 \- koa-cors(跨域问题)

 \- nginx(反向代理)

 \- pm2(服务器部署)

 \- jwt(逻辑和缓存相似)



### 项目截图



![](https://upload-images.jianshu.io/upload_images/8562733-9a5662dee18ca227.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
![](https://upload-images.jianshu.io/upload_images/8562733-cbb32bea56d24e44.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
![](https://upload-images.jianshu.io/upload_images/8562733-985e813651a8998c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
![](https://upload-images.jianshu.io/upload_images/8562733-46358348b0f81157.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

## 启动

```
// 启动前端

cd app && yarn serve

// 启动服务端 需要改为本地3005端口

cd server && yarn dev
```

## 后记

本来写了`uni-app` 版本，由于发布总是失败，所以写了移动端的 vue 版本。下面说说踩的几个坑。
+ 封装video
原来想使用video.js来处理视频页面，但是相关文档和实例太少，所以自己封装了一个兼容微信X5的移动端播放器，后期也准备对组件迭代，已经建仓完成。
+ vant中 `imagePreview`问题 
需要配合导航的声明周期进行销毁，要不会出现页面倒退bug
+ 登录鉴权
主要是利用导航钩子，对特权路由进行`meta`声明。但是遇到权限页面会出现后退后，再次出现登录页面的情况，我这边利用路由参数来判断，需要倒退几页解决了这个问题。
+ 后端部署
第一次在前后端分离项目，并不是很懂部署，自己依靠搜索完成了`nginx`配置，pm2部署，还算小有成就感。
用 `koa2` 后，又研究了一下 `egg`,自带集成TS，也不用自己建立`controll`,嗯，真香~。

后续准备用 `egg` 和 `React` 搭建一个后台管理平台，总之继续加油学习吧!!!

