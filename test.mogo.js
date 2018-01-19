var User = require('./DB/mongodb.js');

//增
/* let user = new User({
  name:'lonves',
  age: 33
})
user.save((err, res)=>{
  if(err){
    console.log(err);
    return;
  }
  console.log(res);
}) */
//改
User.findById("574e4af67e1d7c0d1b9cdb67", (err, res)=>{
  console.log(res);
})
User.find({}, null, {limit:10}, (err, res)=>{
  console.log(res.length)
})
//删
// User.findByIdAndRemove();
//User.remove()
