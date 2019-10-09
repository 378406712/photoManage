/**
 * 用户数据库查询和封装
 * publish发布
 * 
 *  mongoose： mongodb 的nodejs 数据库驱动
    co： 一个自动执行的generate函数容器
    moment: 时间格式化
 */


let mongoose = require("mongoose")
const co = require("co")
const moment = require("moment")

let timeStamp = require("time-stamp")

//创建一个视图
let view = new mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    // publishtime: {
    //     type: Date,//注册之后给个当前时间
    //     default: Date.now,
    //     get: v => moment(v).format('YYYY-MM-DD HH:mm')//格式化时间
    // },
    // updatetime:{
    //     type: Date,//注册之后给个当前时间
    //     default: Date.now,
    //     get: v => moment(v).format('YYYY-MM-DD HH:mm')//格式化时间
    // }
    publishtime: {
        type: Date,
        default: Date.now,
        get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') //格式化时间

    },
    updatetime: {
        type: Date,
        default: Date.now,
        get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') //格式化时间
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'publishtime', updatedAt: 'updatetime' }
})

//  /实例得到mdel  创建一个集合

let model = mongoose.model("picUpload", view)

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

/**
 * 
 * id查询
 */

function findById(id, callback) {
    model.findById(id, (err, result) => {
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

// 封装修改的方法
function update(id, updatestr, callback) {
    model.findByIdAndUpdate(id, updatestr, (err, result) => {

        if (!err) {
            callback(null, result)
        } else {
            callback(err)
        }
    })
}

// /封装删除的方法

function remove(id, callback) {
    model.findByIdAndDelete(id, (err, result) => {
        if (!err) {
            callback(null, result)
        } else {
            callback(err)
        }
    })

}





module.exports = {
    find: find,
    create: create,
    findById: findById,
    update: update,
    remove: remove
}