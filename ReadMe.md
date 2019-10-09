国庆的一个小项目遇到的一些坑


1.npm安装spm报错:network If you are behind a proxy

解决 npm config set registry http:*//registry.npmjs.org/*







2.input框type=file设置cursor:pointer的问题

==为了让美化上传文件框，设置了cursor:pointer;,然而不起作用，然后百度找到了解决方法，设置font-size:0，这样就可以了。==



3.表单验证错误，阻止上传

```js
$("#login").on("click",function(ev){
if(!lzw.test(mobile.value) ||! lzw.checkPwd(pword.value)){
    ev.preventDefault()//阻止跳转
}
})
注：lzw.test(mobile.value) 在 lzw.js中验证boolean值


```

4.表单中上传图片

```js
enctype="multipart/form-data"
```



5.格式化mongoose中schema的日期格式

```js
1. 安装mongoose
?
1
$ npm install mongoose co moment --save
说明：
mongoose： mongodb 的nodejs 数据库驱动
co： 一个自动执行的generate函数容器
moment: 时间格式化

const mongoose = require('mongoose')
const co = require('co')
const Schema = mongoose.Schema
const PersonSchema = new Schema({
 name: String,
 age: String,
 createAt: {
  type: Date,
  default: Date.now,
  get: v => moment(v).format('YYYY-MM-DD HH:mm')
 }
})
```



5.router无法使用body-parser中间件

```html
body-parser中间件为app级别中间件，
router要使用form中间件
let form = formidable.IncomingForm()
 form.parse(req,(err,fileds,files)=>{...})
```

6.发布时间与更新时间

```js
使用time-stamp,timestamps选项会在创建文档时自动生成createAt和updateAt两个字段，值都为系统当前时间。并且在更新文档时自动更新updateAt字段的值为系统当前时间。如果想自定义这两个字段的名称，则可以使用上述高亮部分的定义方法。如果使用默认的字段名 
createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
```

7.整理了两个canvas特效....

8.鼠标自定义设置样式

```css
   cursor: url("/mouse.cur"),default;
	第一个参数为自定义的图标自定义鼠标显示图标，需注意下面几个问题

图标的格式：

IE支持cur,ani,ico这三种格式，FF支持bmp,gif,jpg,cur,ico这几种格式，不支持ani格式，也不支持gif动画格式，因此来说一般将url引用的图片存为ico或cur格式比较好！


图标的大小：

鼠标图片的尺寸推荐尺寸是32*32，否则可能会导致图标大小不一致的问题！


另外对于在浏览器中鼠标图片不显示的问题，问题大多出在对鼠标图片URL路径的引用上， 可以分别尝试下绝对和相对路径的引用。
第二个参数为备用，必加
```

9.aplayer的坑

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    theme: '#e9e9e9',
    fixed: true,
    lrcType: 3, //歌词传递方式 (显示歌词必加)
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: '/hikarunara.jpg',
        lrc:"/1.lrc"
    }, {
        name: 'name2',
        artist: 'artist2',
        url: 'url2.mp3',
        cover: 'cover2.jpg'
    }]
});

```

10.修改网页title的坑,title 要放到js文件上，否则找不到

```js
var OriginTitle = document.title;
console.log(OriginTitle)
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/trhx2.png");
         document.title = 'ヽ(●-`Д´-)ノ你丑你就走！';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/trhx2.png");
         document.title = 'ヾ(Ő∀Ő3)ノ你帅就回来！' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });



```

11.引用aplayer时 报错，找不到map文件

```html
什么是source map文件
source map文件是js文件压缩后，文件的变量名替换对应、变量所在位置等元信息数据文件，一般这种文件和min.js主文件放在同一个目录下。 比如压缩后原变量是map，压缩后通过变量替换规则可能会被替换成a，这时source map文件会记录下这个mapping的信息，这样的好处就是说，在调试的时候，如果有一些JS报错，那么浏览器会通过解析这个map文件来重新merge压缩后的js,使开发者可以用未压缩前的代码来调试，这样会给我们带来很大的方便！
而这种还原性调试功能，目前只有chorme才具有，所以就会出现标题说的问题，我引入jquery-1.10.2.min.js的时候，在firefox下或者其他浏览器下是好的，在chorme下会报错找不到jquery-1.10.2.min.map文件，404，就是因为以上说的情况，jquery会检测浏览器是否支持source map功能，如果支持的话，那就去下载source map文件，而这个时候如果你引用的是官网的min.js那没问题，它会去自己的目录下找source map文件，而如果jquery.min.js文件在你的服务器上而服务器上又没有source map的话，那就会报错了！
```



![1570418278896](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1570418278896.png)

==bug==

```html
当点击修改时，如果图片没有更改，则原图片会消失
```

