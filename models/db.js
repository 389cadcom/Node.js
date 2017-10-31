/*
 * @Author: Lonves 
 * @Date: 2017-10-31 17:49:03 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-10-31 17:53:48
 * 
 * 封装方法：TODO 执行连接、关闭连接
 */

var db = {};
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'db_admin'
});
var destory = function(){
    pool.end(err => {
        console.log('关闭连接');
    })
}

db.query = (sql, callback)=>{
    if(!sql){
        callback();
        return;
    }
    pool.query(sql, (err, results, fields)=>{
        if(err){
            console.log(err);  
            callback(err, null);  
            return;  
        }
        callback(null, results, fields);
        destory();
    });
}


/*
pool.getConnection((err, conn)=>{
    var sql = "select * from tb_admin";
    conn.query(sql, (err, results)=>{
        console.log(results);
    })
})
*/

module.exports = db;