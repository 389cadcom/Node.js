//sqlite3 API
db = new sqlite3.Database(filename, [mode], [callback])

//执行DDL和DML语句，DQL不能使用这个命令run
db.run(sql, [param, ...], [callback])               //建表、删表、删除行数据、插入行数据、更新
db.get(sql, [param, ...], [callback])
db.all(sql, [param, ...], [callback])               //#all首先检索所有结果行并将其存储在内存, #each, #prepare
db.each(sql, [param, ...], [callback], [complete])

db.exec(sql, [callback])                            //执行多条

//序列化
db.serialize(()=>{
    db.run("CREATE TABLE if not exists lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for(let i=0; i<10; i++){
        stmt.run('info' + i);
    }
    stmt.finalize();
})


//sqlite API
const sqlite = require('sqlite');
const [mainDb, usersDb] = await Promise.all([
    sqlite.open('./main.sqlite', { Promise }),
    sqlite.open('./users.sqlite', { Promise })
]);

db = sqlite.open('./main.sqlite', { Promise });
db.all(sql)
db.get(sql)
db.each(sql)

db.run(sql)
db.exec(sql)

db.prepare(sql)
//db.migrate()

let stmt = await db.run('update lorem set info = "info-i"');
stmt.sql
stmt.lastID
stmt.changes

//实例
db.run("UPDATE tb_admin SET name = ? WHERE id = ?", [ "bar", 2 ]);
db.run("UPDATE tbl SET name = $name WHERE id = $id", {
    $id: 2,
    $name: "bar"
});

//Exec 循环生成sql语句，批次插入多条数据
db.run("CREATE TABLE foo (id INT)", function(e){
    if(e !== null){ throw e; }
    var sql = "";
    for(var i = 0 ; i < 500; i ++){
        sql += 'INSERT INTO foo VALUES(' + i + ');'
    }
    db.exec(sql, done)
});

//事务处理--sqlite3并没有提供特殊API去实现的事务相关的操作，只能靠SQL语句去控制事务
var db = new sqlite3.Database(db_path);
db.run("CREATE TABLE foo (id INT, txt TEXT)");
db.run("begin transaction");
var stmt = db.prepare("INSERT INTO foo VALUES(?, ?)");
for (var i = 0; i < count; i++) {
    stmt.run(i, randomString());
}
db.run("commit transaction");
