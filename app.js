let express = require("express")
let app = express();
let path = require("path")

//引入model层
let model = require("./libs/connect")

//使用ejs模板 
app.set("view engine", "ejs")
app.set("views", __dirname + "/view")
//不必把html改成ejs，还继续使用ejs模板
app.engine("html", require("ejs").__express)
// console.log(__dirname + "/view")
    //加载静态资源 css js等
app.use("/assets", express.static(path.resolve("./assets")))
    // console.log(path.resolve("./assets"))

//加载upload中图片资源
// let picPath = path.join(__dirname,".","upload")
// console.log(picPath)
// app.use(express.static(picPath))
app.use("/upload", express.static(path.resolve("./upload")))
app.use("/photo", express.static(path.resolve("./photo")))



//加载body-parser中间件
let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false })) //false 只接受String或Array类型


//加载cookie-session 安装后引入session
let cookie_session = require("cookie-session")

app.use(cookie_session({
    name: "sessionId",
    keys: ['aaaaaaaaa', 'fsdfgdgsdasd']
}))




let userRouter = require("./controller/userController")
app.use("/user", userRouter)

let photoRouter = require("./controller/photoMangeController")
app.use("/user", photoRouter)





//404 错误提示 
app.use((req, res) => {
    res.render("wait.html", {
        wait: "2",
        content: "404 Not Found",
        href: "./login"
    })
})








app.listen(3000, (err) => {
    if (!err) {
        console.log("端口开启成功")

    }
})