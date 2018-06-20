![carbon (5).png](https://www.cocoyo.xin/storage/201806/10/783pUTGETRSGus9W3DLfEPxmWfxJra10mweDX9QD.png)

闲暇之余本想了解一下小程序，刚好看到社区发布了小程序教程，果断买了看了起来，自己也怼了这个小程序。收获颇多:laughing:

先上个图了解一下：

![wonderfully.gif](https://www.cocoyo.xin/storage/201806/10/jY6xDbBR3tbrqCizXrWIjxzsQ7g9qVK99Dq2kzn3.gif)

里面的功能都是基于自己的博客网站写的[cocoyo](https://www.cocoyo.xin)，然后根据自己的审美美化了样式，`css`样式定义的有点糟糕:joy:。

文章的列表和详情样式是参考[我的第一个微信小程序（Discuz!! + 微信小程序)](https://laravel-china.org/articles/7881/my-first-wechat-small-program-discuz-wechat-applet),其它的页面有参考支付宝的排版样式。总之，自己感觉该可以:joy:

#### 声明

> 你应该和[https://github.com/ningge123/cocoyo](https://github.com/ningge123/cocoyo) 配套使用,所有小程序接口都是这个提供。

#### 安装

```shell
git clone git@github.com:ningge123/wonderfully.git
```

```shell
npm install
```

修改文件`wepy.config.js`里的接口地址` replace: prod ? "'https://www.cocoyo.xin'" : "'http://cocoyo.test'"`

```shell
npm run dev
```

然后打开微信开发者工具指向`dist`目录就可以啦!

#### 已知问题

* `npm run build`的时候引用的`wxss`和`wxml`会被忽略，所以你应该自己从复制过去,引用的`wxss`和`wxml`的文件有`markdown`目录下所有`wxss`和`wxml`文件，记得复制哦！不然文章详情没法渲染出来，我找了好久也没有找到问题所在！！

* ~~真机环境`ios`下编辑个人信息和个人详情页面头像一闪而过，就不显示了，`android`测试没有问题,也一直找原因。。。。~~

有知道这些问题的大神可以私信的，非常感谢:kissing_closed_eyes:

最后附上`github`地址和小程序二维码

[github](https://github.com/ningge123/wonderfully)

![gh_3db691dfba9d_1280.jpg](https://www.cocoyo.xin/storage/201806/10/nz4Vq3gV2KWM7JkgeLwAHxmD50c4mvuXi8TvTkdN.jpeg)