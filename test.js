var db = require('./models/db');

// var sql = 'SELECT count(*) as count FROM tb_admin';
var sql = 'SELECT * FROM tb_admin';

db.query(sql, (err, rows, fields)=>{
    if(err){
        console.log(err);
        return;
    }
    //console.dir(rows);
    console.dir(fields);
});
var sql = 'SELECT * FROM tb_admin where id =1';
db.query(sql, (err, rows, fields)=>{
    if(err){
        console.log(err);
        return;
    }
    console.dir(rows);
});