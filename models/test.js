var mysql = require('mysql');

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    port    : '3306',
    database: 'db_admin'
});

//创建一个连接
connection.connect((err)=>{
    if(err) {
        console.log(err);
        return;
    }
    console.log('connect success!');
});

//查询
var query = 'SELECT 1+1 AS tow;'
connection.query(query, (err, results)=>{
    if(err){
        console.log(err);
        return;
    }
    console.dir(results);
});

//关闭连接
connection.end(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('连接关闭');
})