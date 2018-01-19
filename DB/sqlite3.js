/*
 * @Author: Lonves 
 * @Date: 2017-12-18 10:02:36 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-12-26 17:06:19
 * 
 * SQL3 API
 * db.run(sql, params, cb)   --insert, update, delete
 * db.get                    -- 只查一条
 * db.each, db.all           --
 * db.exec
 */
var fs      = require('fs');
var SQLite3 = require("sqlite3").verbose();

var file = './bin/db.db3';
/* 
SQLite默认--不存在就创建,存在则打开
var exists = fs.existsSync(file);
if(!exists){
    console.log('create db file');
    fs.openSync(file, 'w');
} */

var db = new SQLite3.Database(file);    //:memory:

//TODO 序列化事务处理，无法回滚。 在sql执行工具中，使用“begin; commit; rollback;”是可以控制事务的
/* db.serialize(function() {
    db.run("CREATE TABLE if not exists lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");

    db.run('begin;');
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);     // TODO:这里直接将事务提交了，控制不了事务！！！stmt对象并没看见能否设置自动提交！
    }
    db.run('commit;');
    stmt.finalize();                //销毁prepare创建的准备语句

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
}); */

/* db.get('SELECT count(*) as count from lorem', (err, rows)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(rows);
})
var stmt = db.run('update lorem set info = ?', ['info2'], function(err){
    console.log(err, this);
}) */
var arr = [];
db.each('SELECT * from lorem', (err, row)=>{
    console.log(row)
})

db.close();
