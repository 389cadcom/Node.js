var mysqldb      = require('./DB/mysql.js');
var dbAsync = require('./DB/mysql.async.js');

/* mysqldb.query('select * from tb_admin', (err, results, fields)=>{
  console.log(results[0]);
}) */

//async方式
/* async function getFirst(arams) {
  var result = await dbAsync.queryFirst('select * from tb_admin');
  console.log(result);
}
getFirst(); */

//promise方式
/* dbAsync.queryFirst('SELECT 1 + 1 as solution')
  .then(row=>{
    console.log(row)
    return dbAsync.queryFirst('select * from tb_admin');
  }).then(row => {
    console.log(row)
  }).catch( err =>{
    console.log(err)
  }) */
/*
var SQLite3 = require('./DB/sqlite.async.js');
var db = new SQLite3({
  file: './bin/test.db3'
})

let sentence = `
  create table if not exists ${db.table}(
    id integer not null primary key autoincrement,
    name varchar,
    age int,
    sex char(1)
  );`;
db.createTable(sentence)
  .then(res =>{
    console.log(res);
  })
 db.sql(`insert into ${db.table} values (?, ?, ?, ?)`, [null, 'yu', '33', 0], 'run')
  .then(res => {
    console.log(res)
  }) 

async function query() {
  let row = await db.sql(`select * from ${db.table}`, [], 'get');
  console.log(row);
}
query();
*/

//ES7 + sqlite
var sqlite = require('sqlite');


async function main() {
  const db = await sqlite.open('./bin/db.db3', { Promise });
  
  var stmt = await db.run('update lorem set info = "info-i"');
  console.log(stmt.changes, stmt.lastID)
}
main();

//Express
/* router.get("/", async(req, res, next)=> {
  let file = path.join(__dirname, '../db.db3');
  let db   = await sqlite.open(file, { Promise });
  let rows = await db.get('select id, info from lorem');
  console.log(rows);
}) */