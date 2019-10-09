// 安装数据库

let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/manage",{useNewUrlParser:true})//第二个消除警告