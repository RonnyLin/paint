/**
 * Created by haita on 2017/12/15 0015.
 */
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/print-datas';
mongoose.connect(DB_URL);
const models = {
    users:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':String,
        //头像
        'avatar':String,
        //个人简介
        'desc':String,
        'title':String,
        'company':String,
        'score':String,
        // 登录次数
        'loginNum': Number
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,default:""},
        'create_time':{type:Number,default:Date.now}
    }
};

for(let m in models){
    let everyModel = mongoose.model(m, new mongoose.Schema(models[m]));

};
module.exports = {
    getModel(name){
        return mongoose.model(name)
    }
}