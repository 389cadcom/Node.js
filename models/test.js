/*
 * @Author: Lonves 
 * @Date: 2017-10-31 10:23:50 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-10-31 10:45:39
 * 
conn.beginTransaction
conn.commit
conn.rollback
conn.pause
conn.resume
conn.escape

var query = conn.query(sql)
query.sql
 */

var mysql = require('mysql');

var conn = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    port    : '3306',
    database: 'db_admin'
});

//创建一个连接
conn.connect((err)=>{
    if(err) {
        console.log(err);
        return;
    }
    console.log('connect success!');
});

//查询
var query = 'SELECT 1+1 AS tow;'
conn.query(query, (err, results)=>{
    if(err){
        console.log(err);
        return;
    }
    console.dir(results);
});
//新增
var addSql = "INSERT INTO tb_admin(users, pwd) VALUES(?, ?)";
var params = ['林九', '123456'];
conn.query(addSql, params, (err, result)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('影响行数：' + result.affectedRows, result.insertId);
});
//修改
var updateSql = "update tb_admin set users = ?, pwd = ? where users = 'lonves'";
params = ['lonve', '123456'];
conn.query(updateSql, params, (err, result)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('影响行数：' + result.affectedRows);
});
//删除
var delSql = "DELETE FROM tb_admin WHERE users = ?";
var params = ['lonves']
conn.query(delSql, params, (err, result)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('影响行数：' + result.affectedRows);
});

//事务
conn.beginTransaction(function(err) {
    if (err) {
        throw err;
    }
    var sql  = "INSERT INTO posts SET title=?";
    conn.query(sql, title, function(err, result) {
        if (err) {
            conn.rollback(function() {
                throw err;
            });
        }

        var log = "Post " + result.insertId + " added";
        conn.query("INSERT INTO log SET data=?", log, function(err, result) {
            if (err) {
                conn.rollback(function() {
                    throw err;
                });
            }
            conneconnction.commit(function(err) {
                if (err) {
                    conn.rollback(function() {
                        throw err;
                    });
                }
                console.log("success!");
            })
        })
    })
});  


//关闭连接
conn.end(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('连接关闭');
})