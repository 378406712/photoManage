/**
 * 用户数据库查询和封装
 */

let mongoose = require("mongoose")

//创建一个视图
let view = new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    userreg: {
        type: Date,
        default: Date.now //设置时间类型

    }
})

//  /实例得到mdel  创建一个集合

let model = mongoose.model("user", view)

//封装查询的方法
/**
 * 封装查询方法 find()
 * query:查询的条件
 * fileds:查询字段内容
 * select:查询
 * callback:回调函数，返回查询的数据
 */
function find(query, fileds, select, callback) {
    /**
     * err :返回错误的信息
     * result:得到查询的内容
     */
    model.find(query, fileds, select, (err, result) => {
        if (!err) {
            callback(null, result)
        } else {
            callback(err)
        }
    })
}

// 封装添加的方法
/**
 * post :获取表单提交的数据内容 
 * callback：返回添加的内容
 */
function create(post, callback) {
    model.create(post, (err, result) => {

        if (!err) {
            callback(null, result)
        } else {
            callback(err)
        }
    })
}




module.exports = {
    find: find,
    create: create
}