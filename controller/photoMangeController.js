/**
 * 从数据库中渲染数据到publish 页面
 */
let express = require("express")
let app = express()
let fs = require("fs")

//加载body-parser中间件


//使用加载二级路由方法 Router
let router = express.Router();



//引入formidable 获取上传文件域内容
let formidable = require("formidable")

//加密
var crypto = require("crypto")

//设置加密内容
const secret = 'jglhjrrqwwqrasdasd213153'
    //uuid 随机生成图片名字
let uuid = require("uuid/v1")



//引入path
let path = require("path")

//引入model层  photo

let photoModel = require("../model/photoModel")

//显示上传页面 get
router.get("/photoManage", (req, res) => {
    photoModel.find({}, {}, {}, (err, result) => {
        if (!err) {
            res.render('photoManage.html', { result: result })

        }
    })


})

//处理上传
router.post("/photoManage", (req, res) => {

    let form = formidable.IncomingForm()
        //临时上传目录
    form.uploadDir = path.normalize(__dirname + '/../tempDir')
        // console.log(form.uploadDir)
        //解析上传文件
    form.parse(req, (err, fileds, files) => {
        //  console.log(fileds)//Object {essayName: "", description: "", logo_big: ""}属性
        //  console.log(files)//Object {file: File}
        let uoLoadFile = files.file;


        console.log(files.file)

        if (uoLoadFile.size != 0) {
            //传图片时
            let extname = path.extname(uoLoadFile.name) //后缀名
            let filename = uuid() + extname //文件名
            let oldPath = uoLoadFile.path
            let newPath = path.join(__dirname, "..", "photo", filename)

            fileds.url = filename
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.render('wait.html', {
                        wait: "1",
                        content: "发布失败",
                        href: "/user/photoManage"
                    })
                }
                photoModel.create(fileds, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.render("wait.html", {
                            wait: "1",
                            content: "发布失败",
                            href: "/user/photoManage"
                        })
                    } else {
                        res.render("wait.html", {
                            wait: "1",
                            content: "发布成功",
                            href: "/user/photoManage"
                        })

                    }
                })




            })
        } else { //不传图片时

            photoModel.create(fileds, (err, result) => {
                if (err) {
                    console.log(err)
                    res.render("wait.html", {
                        wait: "1",
                        content: "发布失败",
                        href: "/user/photoManage"
                    })
                } else {
                    res.render("wait.html", {
                        wait: "1",
                        content: "发布成功",
                        href: "/user/photoManage"
                    })

                }
            })
        }


    })


})


//显示相册修改页面edit  get

router.get("/photo-edit", (req, res) => {
        let id = req.query.id
        console.log(id)

        photoModel.findById(id, (err, result) => {
            if (!err) {
                res.render('photo-edit.html', { result: result })
                    // console.log(1111)
            }
        })
    })
    //修改相册页面photo-edit  post
router.post("/photo-edit", (req, res) => {

    let form = formidable.IncomingForm()
    form.uploadDir = path.normalize(__dirname + '/../tempDir')
    form.parse(req, (err, fileds, files) => {
        console.log(fileds)
        let title = fileds.title;
        let desc = fileds.desc;
        let id = fileds.id


        let uoLoadFile = files.file;
        console.log(fileds)

        if (uoLoadFile.size != 0) {
            let extname = path.extname(uoLoadFile.name) //后缀名
            let filename = uuid() + extname //文件名
            console.log(11111111111)
            let oldPath = uoLoadFile.path
            let newPath = path.join(__dirname, "..", "photo", filename)
                //有图片时
            fileds.url = filename
            var url = fileds.url
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.render('wait.html', {
                        wait: "1",
                        content: "发布失败",
                        href: "/user/photoManage"
                    })
                }

                fileds.url = filename
                photoModel.update(id, { title, desc, url }, (err, data) => {

                    if (!err) {
                        res.render("wait.html", {
                            wait: "2",
                            content: "修改成功",
                            href: "/user/photoManage"
                        }), { result: data }

                    }
                })

            })


        } else {
            var url = ''
            console.log(22222222222222222222)
            photoModel.update(id, { title, desc, url }, (err, data) => {

                if (!err) {
                    res.render("wait.html", {
                        wait: "2",
                        content: "修改成功",
                        href: "/user/photoManage"
                    }), { result: data }

                }
            })
        }

    })

})

//删除功能

router.get("/photo-del", (req, res) => {
    let id = req.query.id
    console.log(id)
    photoModel.remove(id, (err, result) => {
        if (err) {
            console.log("删除失败");

        } else {
            res.render('wait.html', {
                wait: "2",
                content: "删除成功",
                href: "./photoManage"
            })
            return;
        }
    })
})







module.exports = router