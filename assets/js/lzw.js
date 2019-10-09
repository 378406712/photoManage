var lzw = (function () {

    //获取非行间样式
    /* obj:元素
        attr:样式
     */
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
    }


    //获取id
    function getByid(obj) {
        return document.getElementById(obj)
    }

    //运动框架
    /*
     * 参数说明:
     * obj: 运动对象
     * json(json形式): 需要修改的属性
     * options(json形式): 
     *       duration: 运动时间
     *       easing: 运动方式（匀速、加速、减速）
     *       complete: 运动完成后执行的函数
     */
    function animate(obj, json, options) {
        var options = options || {};
        var duration = options.duration || 500; //运动时间,默认值为500ms;
        var easing = options.easing || 'linear'; //运动方式,默认为linear匀速
        var start = {};
        var dis = {};

        for (var name in json) {
            start[name] = parseFloat(getStyle(obj, name)); //起始位置
            dis[name] = json[name] - start[name]; //总距离
        }

        var count = Math.floor(duration / 18); //总次数
        var n = 0; //次数

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            if (n > count) {
                clearInterval(obj.timer);
                options.complete && options.complete();
            } else {
                for (var name in json) {
                    switch (easing) {
                        //匀速
                        case 'linear':
                            var a = n / count;
                            var cur = start[name] + dis[name] * a; //当前位置
                            break;
                        //加速
                        case 'ease-in':
                            var a = n / count;
                            var cur = start[name] + dis[name] * a * a * a;
                            break;
                        //减速
                        case 'ease-out':
                            var a = 1 - n / count;
                            var cur = start[name] + dis[name] * (1 - a * a * a);
                            break;
                    }
                    if (name == 'opacity') {
                        obj.style.opacity = cur;
                        obj.style.filter = 'alpha(opacity=' + cur * 100 + ')'; //兼容IE8及以下
                    } else {
                        obj.style[name] = cur + 'px';
                    }
                }
            }
            n++;
        }, 15);
    }

    //设置cookie
    /*key:名
      value：值
       day：过期天数 */
    function setCookie(key, value, day) {


        var date = new Date();
        date.setDate(date.getDate() + day)
        document.cookie = key + '=' + value + ';expires=' + date

    }
    //封装获取cookie
    function getCookie(key) {

        var obj = {}
        var cookie = document.cookie.split("; ")
        for (i = 0; i < cookie.length; i++) {
            var arr = cookie[i].split("=")
            obj[arr[0]] = arr[1]

        }
        return obj[key]

    }


    //删除cookie
    function removeCookie(key) {
        setCookie(key, 1, -1)
    }

    //登录页面 用户名 密码 确认按钮验证
    /**
     * 
     * @确认按钮 {*} btnLogin 
     * @用户名框 {*} userName 
     * @密码框 {*} userPass 
     * @提示信息 {*} login_message 
     * @用户名框后的清空叉号 {*} clearUser
     * @密码框后的清空叉号  {*} clearPass 
     */
    function yanzheng(btnLogin, userName, userPass, login_message, clearUser, clearPass) {
        btnLogin.onclick = function () {
            // var passes=  getCookie(userName.value)获取cookie
            if (userName.value == '') {
                login_message.innerHTML = '请输入账号'
            } else if (userPass.value == '') {
                login_message.innerHTML = '请输入密码'
            } else if (userPass.value == passes) {
                alert('登录成功')
                setTimeout(function () { window.location = 'jump.html' }, 1000)
            } else {
                login_message.innerHTML = '用户名或密码错误'
            }
        }
        userName.onkeyup = function () {
            if (userName.value == '') {
                clearUser.style.display = 'none'
            } else {
                clearUser.style.display = 'block'
            }

        }
        userPass.onkeyup = function () {
            if (userPass.value == '') {
                clearPass.style.display = 'none'
            } else {
                clearPass.style.display = 'block'
            }

        }

    }

    //封装post 和 get
    function ajax(json) {
        var ajax = new XMLHttpRequest(); //创建异步对象
        ajax.open(json.method, json.url) //设置请求的url参数
        if (json.method == "get") {
            ajax.send()
        }
        if (json.method == "post") {
            ajax.setRequestHeader("Content-type", json.type)
            ajax.send(json.data)
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                json.success(ajax.responseText)
            }
        }


    }

    //注册 验证手机号
    function test(mobile) {
        register_message.style = "color:red"
        if (mobile.length == 0) {
            register_message.innerHTML = '手机号格式不正确'

            return false;
        }
        if (mobile.length != 11) {
            register_message.innerHTML = '请输入有效的手机号码！';

            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(mobile)) {
            register_message.innerHTML = '请输入有效的手机号码！';

            return false;
        } else {
            register_message.innerHTML = '手机号正确';
            register_message.style = "color: #337ab7;"
            return true;
        }
    }

    //注册 验证密码
    function checkPwd(pword) {
        register_message.style = "color:red"
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/
        var re = new RegExp(reg)
        if (!re.test(pword)) {
            register_message.innerHTML = '请输入6-32位英文、数字和符号的组合密码';
            return false;

        } else {
            register_message.innerHTML = '密码可用'
            register_message.style = "color: #337ab7;"
            return true;
        }
    }

    /**
     * 
     * @滚动的大盒子 {*} menulist 
     * @滚动的内容盒子 {*} menu_window 
     * @滚动条 {*} scroller 
     */
    function rolling(menulist, menu_window, scroller) {


        //封装滚轮事件-----------------------------------------------------
        function mouseWheel(obj, fn) { //封装滚轮
            if (window.navigator.userAgent.indexOf('Firefox') != -1) {
                obj.addEventListener('DOMMouseScroll', wheelFn, true);

            } else obj.onmousewheel = wheelFn;

            function wheelFn(ev) {
                ev = ev || event;
                var direct = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
                fn && fn(direct); //将direct作为参数传递出去
                if (window.event) { //IE
                    ev.returnValue = false; //ie 阻止默认事件
                    return false; //ie9 以上阻止
                } else {
                    ev.preventDefault(); //阻止默认事件 firefox
                }
            };
        };

        //滚轮滚动----------------------------------------


        var dis_p = menu_window.offsetHeight - menulist.offsetHeight; //p的高度减去box的高度
        var dis_span = menulist.offsetHeight - scroller.offsetHeight; //滑块移动距离

        //滚轮比率
        var wheel_rate = dis_span / dis_p;
        mouseWheel(menulist, function (dir) {
            if (dir) {
                var t = menu_window.offsetTop - 30;
                if (t < -dis_p) t = -dis_p;
                menu_window.style.top = t + 'px';
                scroller.style.top = -t * wheel_rate + 'px';
            } else {
                var t = menu_window.offsetTop + 30;
                if (t > 0) t = 0;
                menu_window.style.top = t + 'px';
                scroller.style.top = -t * wheel_rate + 'px';
            }
        });


        //拖拽----------------------------------------------
        scroller.onmousedown = function (ev) {
            ev = ev || window.event;
            var mt = ev.clientY - this.offsetTop; //只取Y方向

            document.onmousemove = function (ev) {
                ev = ev || window.event;
                var t = ev.clientY - mt;
                if (t <= 0) t = 0; //限制顶部位置
                if (t >= dis_span - 2) t = dis_span; //限制底部位置
                //计算移动比率
                move_rate = t / dis_span;
                menu_window.style.top = -dis_p * move_rate + 'px'; //移动比率
                scroller.style.top = t + 'px';
            };
            document.onmouseup = function () {
                document.onmousemove = null;
            };
            return false; //阻止选中文字
        };

    }

    //回到顶部 
    /** 
     * 
     * @点击的元素回到顶部 {*} obj 
     */
    function upTop(obj) {

        obj.style.display = 'none'
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 0) {
                obj.style.display = 'block'
            } else {
                obj.style.display = 'none'
            }

        }

        obj.onclick = function () {
            document.documentElement.scrollTop = 0;
            obj.style.display = 'none'
        }

    }

    //滚动轮播
    //无缝轮播效果(右侧按钮点击有小问题，待修)
    /**
     * 
     * @轮播位置大盒子 {*} photo 
     * @装小图片/圆点的盒子 {*} circle 
     * @装小图片或者小圆点的li结构 {*} li 
     * @ {*} bright 
     * @滚动的ul 每秒向左移动 {*} ul 
     * left:左侧按钮
     * right:右侧按钮
     */
    function lunbo(photo, circle, li, bright, ul, left, right) {

        // var photo = document.querySelector(".photo")
        // var circle = document.querySelector(".circle")
        // var li = circle.getElementsByTagName("li")
        // var bright= circle.getElementsByTagName("img")
        // var ul = document.getElementsByClassName("photo-ul")



        var left = document.getElementById("left");
        var right = document.getElementById("right");
        var n = 0

        //span,li动态增加
        var str1 = '';
        var str2 = '';
        for (i = 0; i < imgarr.length; i++) {

            // str1+='<li><a href="#"><img src="'+ s_imgarr[i]+'" alt=""></a></li>'

            str2 += "<li> <a href='./html/playPage.html'><img src=' " + imgarr[i] + "'alt=''></a></li>"
            ul[0].innerHTML = str2;

        }

        for (i = 0; i < imgarr.length; i++) {
            str1 += '<li><a href="' + linkArr[i] + '"><img src="' + s_imgarr[i] + '" alt=""></a></li>'
        }
        ul[0].style.width = imgarr.length * 1100 + "px"

        circle.innerHTML = str1;
        bright[0].className = 'bright';
        //清除最后一张图片
        circle.lastElementChild.style.display = 'none'


        var n = 0
        var c = 0
        var timer = setInterval(autoNext, 2000)

        function autoNext() {
            n++
            if (n > imgarr.length - 1) {
                n = 1;
                ul[0].style.left = '0px'

            }
            animate(ul[0], { left: -1100 * n }, { dutation: "300ms", easing: "linear", })
            c++
            if (c >= li.length - 1) {
                c = 0;
            }
            for (i = 0; i < li.length - 1; i++) {
                bright[i].className = ''
            }
            bright[c].className = "bright"

        }


        //鼠标悬停 停止
        //鼠标离开 轮播
        photo.onmouseover = function () {
            clearInterval(timer)
        }
        photo.onmouseout = function () {
            timer = setInterval(autoNext, 2000)
        }



        //左侧按钮

        left.onclick = function () {
            n--;

            if (n < 0) {

                n = imgarr.length - 2;
                ul[0].style.left = '-9900px'
            }
            for (i = 0; i < li.length; i++) {
                bright[i].className = ''

            }


            bright[n].className = "bright"



            animate(ul[0], { left: -1100 * n }, { dutation: "1500ms", easing: "linear", })

        }
        //右侧侧按钮

        right.onclick = function () {
            n++;

            if (n == imgarr.length) {
                n = 1;
                ul[0].style.left = '0px'
            }
            for (i = 0; i < li.length; i++) {
                bright[i].className = ''

            }
            bright[n].className = "bright"

            animate(ul[0], { left: -1100 * n }, { dutation: "500ms", easing: "linear", })
        }


        //小图片
        for (i = 0; i < bright.length; i++) {
            bright[i].index = i; //自定义索引
            bright[i].onmouseover = function () { //鼠标滑过，再次遍历，清除类名




                for (i = 0; i < li.length; i++) {
                    bright[i].className = '' //内部i=6


                }


                this.className = 'bright'; //滑过 用this 表示具体哪一个
                // Num.innerHTML= this.index+1+'/6'   //上面p标签切换数字
                // describe.innerHTML= 'image0'+(this.index+1);//下面p标签切换数字
                // img.src = imgarr[this.index];// 鼠标滑过,改变图片

                n = this.index; //获取此时n的值--------返回到左右箭头判断
                c = n
                animate(ul[0], { left: -1100 * n }, { dutation: "500ms", easing: "linear", })
            }




            // }



        }




    }

    //遮罩
    function cover(obj1, obj2, times) {
        $(obj1).each(function (index, value) {
            $(this).on("click", function () {

                var windowW = $(window).width(); //获取当前窗口宽度
                var windowH = $(window).height(); //获取当前窗口高度
                var realWidth = this.width; //获取图片真实宽度
                var realHeight = this.height; //获   取图片真实高度
                var imgWidth, imgHeight;
                var scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

                if (realHeight > windowH * scale) { //判断图片高度
                    //  console.log(111)
                    imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
                    imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
                    if (imgWidth > windowW * scale) { //如宽度仍然大于窗口宽度
                        imgWidth = windowW * scale; //再对宽度进行缩放
                        //  console.log(222)
                    }
                } else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
                    console.log(333)
                    imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
                    imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
                } else { //如果图片真实高度和宽度都符合要求，高宽不变
                    imgWidth = realWidth * times;
                    imgHeight = realHeight * times;
                    // console.log(444)
                }
                var w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
                var h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
                //  console.log(w)
                //  console.log(h)
                //  $("#max_img").css("width",imgWidth);//以最终的宽度对图片缩放
                $(innerdiv).css({ "top": h, "left": w }); //设置#innerdiv的top和left属性

                //  $("#max_img").attr("src",value.src)



                //图片效果
                var fnName = 'fragmentImg';

                var _default = {
                    width: 1200,
                    line: 5,
                    column: 12,
                    img: value.src,
                    animeTime: 3000
                };

                window[fnName] = function (changeConfig) {

                    //改变属性值
                    if (typeof (changeConfig) == "object") {

                        for (var n in changeConfig) {

                            _default[n] = changeConfig[n];
                        }
                    }

                    if (!_default.container) {

                        alert('未选择显示容器(div.class or div#id)的类');
                        return false;
                    }

                    var container = $(_default.container);
                    container.append("<ul class='clearfix'></ul>");

                    container.css({
                        width: _default.width
                    });

                    var containerUl = container.find(" > ul");
                    for (var i = 0; i < (_default.line * _default.column); i++) {

                        containerUl.append("<li></li>");
                    }
                    var containerItem = containerUl.find("li");

                    //加载图片
                    var Img = new Image();
                    Img.src = _default.img;
                    //图片加载完成时
                    Img.onload = function () {

                        var multiple = container.width() / Img.width,
                            width = Img.width * multiple,
                            height = Img.height * multiple,
                            findWidth = width / _default.column,
                            findHeight = height / _default.line;

                        var windowWidth = screen.width,
                            windowHeight = screen.height;

                        containerItem.css({
                            width: findWidth,
                            height: findHeight,
                            'background-image': 'url(' + Img.src + ')',
                            'background-size': width + 'px ' + height + 'px',
                            opacity: 0
                        });

                        container.css({
                            left: '50%',
                            top: '50%',
                            'margin-top': -height / 2,
                            'margin-left': -width / 2
                        });

                        var x, y;
                        for (i = 0; i < containerItem.length; i++) {

                            x = i % _default.column;
                            y = Math.floor(i / _default.column);
                            containerItem.eq(i).css({

                                'background-position': -x * findWidth + 'px ' + (-y * findHeight) + 'px',
                                left: Math.ceil(Math.random() * windowWidth * 2) - windowWidth,
                                top: Math.ceil(Math.random() * windowHeight * 2) - windowHeight
                            }).animate({

                                left: 0,
                                top: 0,
                                opacity: 1
                            }, Math.ceil(Math.random() * (0.66 * _default.animeTime)) + (0.33 * _default.animeTime));
                        }

                    }
                }
                var fragmentConfig = {

                    container: '#innerdiv', //显示容器
                    line: 10, //多少行
                    column: 24, //多少列
                    width: 600, //显示容器的宽度

                    animeTime: 2500, //最长动画时间,图片的取值将在 animeTime*0.33 + animeTime*0.66之前取值 
                    img: value.src //图片路径
                };
                fragmentImg(fragmentConfig);



                $(".cover-bgc").fadeIn("fast"); //淡入显示#outerdiv及.pimg



            })
        })

        //点击遮罩消失
        $(obj2).click(function () { //再次点击淡出消失弹出层
            $(this).fadeOut("fast");
            $("#innerdiv").empty()
        });
    }
    //滚动文字特效



    function binft(r) {
        function t() {
            return b[Math.floor(Math.random() * b.length)]
        }
        function e() {
            return String.fromCharCode(94 * Math.random() + 33)
        }
        function n(r) {
            for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
                var l = document.createElement("span");
                l.textContent = e(), l.style.color = t(), n.appendChild(l)
            }
            return n
        }
        function i() {
            var t = o[c.skillI];
            c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
        }
        var l = "",
            o = ["风雨送春归，飞雪迎春到。","已是悬崖百丈冰，犹有花枝俏。",  " 俏也不争春，只把春来报。","待到山花烂漫时，她在丛中笑。"].map(function (r) {
                    return r + ""
                }),
            a = 2,
            g = 1,
            s = 5,
            d = 75,
            b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
            c = {
                text: "",
                prefixP: -s,
                skillI: 0,
                skillP: 0,
                direction: "forward",
                delay: a,
                step: g
            };
        i()
    };





    return {
        getStyle,
        getByid,
        animate,
        setCookie,
        getCookie,
        removeCookie,
        yanzheng,
        ajax,
        test,
        checkPwd,
        rolling,
        upTop,
        lunbo,
        cover,
        binft
    }






})()