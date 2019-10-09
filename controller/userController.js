/**
 * 定义二级路由
 */

 let express = require("express")
let app = express()
 let fs = require ("fs")
 
//加载body-parser中间件


 //使用加载二级路由方法 Router
 let router = express.Router();



//引入formidable 获取上传文件域内容
 let formidable  = require("formidable")

 //加密
var crypto = require("crypto")

//设置加密内容
 const secret = 'jglhjrrqwwqrasdasd213153'
//uuid 随机生成图片名字
let uuid = require("uuid/v1")



 //引入path
 let path = require("path")

 //登录经过这里
 router.use((req,res,next)=>{
    
     if(req.url=="/reg"||req.url == '/login'){
            return next()
     }
     else if(req.session.username == null ){
      res.render("wait.html",{
         wait:"2",
         content:"你没有登录,请登录",
         href:"/user/login"
     })
     }

     else{
        return next()
     }
    
 })


 //引入model层
 let userModel = require("../model/userModel")
 let publishModel = require("../model/publishModel")



//显示注册页面 get
router.get("/reg",(req,res)=>{
   res.render("reg.html")
})

//以post方式注册 post 
router.post("/reg",(req,res)=>{

   let username = req.body.username;
   let password = req.body.password;

   //加密
   req.body.password = crypto.createHmac('sha256', secret).update(password).digest("hex")
   userModel.find({username},{},{},(err,result)=>{
      if(result.length){//如果查到了，则result.length有长度
         res.render('wait.html', {
            wait: "1",
            content: "已经被注册过",
            href: "/user/reg"
        })
      }
       //创建
       userModel.create(req.body, (err, result) => {
         console.log(req.body)
        
      if (err) {
          res.render("wait.html", {
              wait: "1",
              content: "注册失败",
              href: "/user/reg"
          })
      }
    
    
      else {
          res.render("wait.html", {
              wait: "1",
              content: "注册成功",
              href: "./login"
          })

      }
  })

   })
})

//加载登录页面 get
router.get("/login",(req,res)=>{
   res.render("login.html")
})

//登录处理 post
router.post("/login",(req,res)=>{
   let post = req.body
   let {username,password} = post
   console.log(req.url)
  password = crypto.createHmac('sha256', secret).update(password).digest("hex")
   userModel.find({username},{},{},(err,result)=>{
      if(!result.length){
         return res.render('wait.html', {
            wait: "1",
            content: "不存在该用户,请注册",
            href: "/user/reg"
        })
        
      }
      console.log(result[0].nickname)
    console.log(result[0].password)
    if(password!=result[0].password){
      return res.render('wait.html', {
         wait: "1",
         content: "密码错误",
         href: "/user/login"
     })
    }
    else{
       req.session.username=username //存为session
       req.session.password =password
       req.session.id=result[0].id
       console.log( req.session.username=username)
       return  res.render('wait.html', {
         wait: "1",
         content: "登录成功",
         href: "./photoManage"
     })
      //  console.log(req.session.id);
      //  console.log( req.session.username)
    }

   })

})



//显示上传页面 get
router.get("/publish",(req,res)=>{
   publishModel.find({},{},{},(err,result)=>{
    if(!err){
       res.render('publish.html',{result:result})
     
    }
    
   })
   // userModel.find({username:"18655906033"},{},{},(err,result)=>{
   // res.render('publish.html',{data:result[0].nickname})
   // })


   
})

//处理上传
router.post("/publish",(req,res)=>{

   let form = formidable.IncomingForm()
//临时上传目录
form.uploadDir = path.normalize(__dirname+'/../tempDir')
// console.log(form.uploadDir)
//解析上传文件
 form.parse(req,(err,fileds,files)=>{
      //  console.log(fileds)//Object {essayName: "", description: "", logo_big: ""}属性
      //  console.log(files)//Object {file: File}
       let uoLoadFile = files.file;
       let extname = path.extname(uoLoadFile.name)//后缀名
       let filename = uuid()+extname//文件名
       let oldPath = uoLoadFile.path
       let newPath =path.join(__dirname,"..","upload",filename)
       
       fs.rename(oldPath,newPath,(err)=>{
          if(err){
            res.render('wait.html', {
               wait: "1",
               content: "发布失败",
               href: "/user/publish"
           })
          }

          fileds.url = filename
          publishModel.create(fileds,(err,result)=>{
            if (err) {
               console.log(err)
               res.render("wait.html", {
                   wait: "1",
                   content: "发布失败",
                   href: "/user/publish"
               })
           } else {
               res.render("wait.html", {
                   wait: "1",
                   content: "发布成功",
                   href: "/user/publish"
               })
   
           }
          })
         
       })

 })


})
//显示修改页面edit  get

router.get("/edit",(req,res)=>{
   let id = req.query.id

   publishModel.findById(id,(err,result)=>{
      if(!err){
         res.render('edit.html',{result:result})
         // console.log(1111)
      }
     })
})
//修改页面edit  post
router.post("/edit",(req,res)=>{

   let form = formidable.IncomingForm()
   form.uploadDir = path.normalize(__dirname+'/../tempDir')
   form.parse(req,(err,fileds,files)=>{
      console.log(fileds)
      let title = fileds.title;
      let desc = fileds.desc;
      let id = fileds.id
 
      let uoLoadFile = files.file;
      let extname = path.extname(uoLoadFile.name)//后缀名
      let filename = uuid()+extname//文件名
      fileds.url = filename

      let oldPath = uoLoadFile.path
      let newPath =path.join(__dirname,"..","upload",filename)

      let url = fileds.url
      // console.log( fileds.url,1111)
      // console.log(url,22222)
      fs.rename(oldPath,newPath,(err)=>{
         if(err){
           res.render('wait.html', {
              wait: "1",
              content: "发布失败",
              href: "/user/publish"
          })
         }

         fileds.url = filename
      
        
      })
      publishModel.update(id,{title,desc,url },(err,data)=>{

  if(!err){
   res.render("wait.html",{
      wait:"2",
      content:"修改成功",
      href:"/user/publish"
  }),{result:data}
         
      }
      })
   })

})

//删除功能

router.get("/del",(req,res)=>{
   let id = req.query.id
   publishModel.remove(id,(err,result)=>{
      if(err){
         console.log("删除失败");
         
     }else{
         res.render('wait.html',{
             wait:"2",
             content:"删除成功",
             href:"./publish"
         })
         return;
     }
   })
})














 //暴露路由
 module.exports = router;



