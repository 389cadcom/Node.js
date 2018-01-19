/* var mysql = require('mysql');
var opts = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_admin'
}

var connect = mysql.createConnection(opts);
connect.connect(function(err, arg){
  console.log('连接中...');
})
connect.query('SELECT * from tb_admin', (err, results, fields)=>{
  if(err){
    throw err;
  }
  console.log('count:' + results[0], fields)
});  

connect.end();

var pool = mysql.createPool(opts);
pool.getConnection((err, connect)=>{
  if(err) throw err;
  connect.query('select * from tb_admin', (err, results, fields)=>{

  })
})
 */
var mysql = require('./models/mysql.async');

async function getFirst(){
  var pm = await mysql.queryFirst('SELECT * from tb_admin');
  console.log(pm.users);
}
getFirst()
