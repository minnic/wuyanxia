# 屋檐下

关于屋檐下的介绍……

- [系统需求 (System Requirements)](#system-requirements)
- [安装 (Setup)](#setup)
- [部署（Build and Deploy）](#build-and-deploy)
- [约定 (Convention)](#convention)
- [学习资源 (Resources)](#resources)

## System Requirements

- [Node.js](https://nodejs.org/) 0.12+
- [Android SDK](http://developer.android.com/sdk/installing/index.html?pkg=tools)

在安装完 Node 后，请通过 npm 安装如下全局包：

```
$ sudo npm install -g gulp bower cordova ionic
```

如果你是在 windows 环境下，请去掉前面的 sudo 。如果安装失败，请分多次逐个安装。

在安装完 Android SDK 之后，请打开 SDK Manager 安装如下内容：

- Android 5.1.1 (API 22) platform SDK
- Android SDK Build-tools version 19.1.0 or higher
- Android Support Repository (Extras)

## Setup

首先通过 git 将代码复制到本地：

```
$ git clone https://github.com/meniac/wuyanxia.git
```

接下来通过 Cordova CLI 添加 Android 平台的支持，在这之前请确保完成了 Android SDK 的配置。其中 plugin 部分是开发过程中可能用到的 Cordova 插件，所以推荐安装一下（觉得麻烦的话暂时不装也没关系）。

```
$ cd wuyanxia
$ mkdir www
$ cordova platform add android

$ cordova plugin add cordova-plugin-device
$ cordova plugin add cordova-plugin-console
$ cordova plugin add cordova-plugin-whitelist
$ cordova plugin add cordova-plugin-splashscreen
$ cordova plugin add com.ionic.keyboard
$ cordova plugin add cordova-plugin-camera
```

安装项目依赖的第三方包和框架（可以同时开两个命令行运行以下命令）：

```
$ npm install
$ bower install
```

## Build and Deploy

以后每次修改代码只需要看这部分就可以了。

```
$ gulp build
```

该命令会把源文件（app 目录中的文件）复制到 www 目录中，然后将这些资源打包成 apk 文件。由于打包 apk 需要一定时间（大概 5 - 10 秒的样子），所以如果只是希望复制文件，可以用以下命令替代 gulp build：

```
$ gulp copy
```

最后，通过以下命令可以在模拟器上运行该 apk，在运行之前，Cordova 会再编译一次 apk 文件，以保证它是最新版本。

```
$ cordova run android
```

注意：运行该命令之前，请先打开模拟器！

在开发过程中，为了方便，我们可以在浏览器端先调试。首先，运行以下命令将代码部署到 www 目录：

```
$ gulp copy:dev
```

与 gulp copy 命令不同的是，它只会将 js 和 css 文件合并，而不会压缩，以便在浏览器上调试。然后，使用以下命令启动静态文件服务器：

```
$ gulp serve
```

通过 http://localhost:3000 可以在浏览器访问 www 目录下的内容。

```
$ gulp watch
```

通过该命令可以监控 app 目录中的修改，当修改发生时自动运行 copy:dev 任务，更新 www 目录，因此不需要每次修改后都手动执行 gulp copy:dev 。

## Convention

- 所有的代码请放在 app 目录中，需要的第三方包请通过 bower 安装，不要修改 app/lib 中的任何内容。比如

```
$ bower install --save jquery
```

- HTML, CSS, JavaScript 的编写请采用 **2 个空格**作为 1 个缩进级别。
- 想到了再写……

## Resources
- [Cordova 官方文档](http://cordova.apache.org/docs/en/5.0.0/)
- [Ionic 官方文档](http://ionicframework.com/docs/)
- [AngularJS中文网](http://www.apjs.net)
- [AngularJS另一个中文网](http://www.ngnice.com/)
