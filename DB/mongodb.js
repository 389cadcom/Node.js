/*
 * @Author: lonves 
 * @Date: 2017-12-25 17:15:48 
 * @Last Modified by:   lonves.zheng 
 * 
 * 连接数据库，不存在则创建
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27018/test', {useMongoClient:true});
// var db = mongoose.createConnection('localhost','test')
db.on('open',function(){
  console.log('连接成功');
})
db.on('error',function(e){
  console.log(e);
  console.log('连接出错');
})

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  age: {
    type: Number,
/*     required: true,
    default: 18 */
  }
}, {collection:'test'})
var User = mongoose.model('test', UserSchema);

module.exports = User;
/* db.collection('mamals').find().toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
}); */