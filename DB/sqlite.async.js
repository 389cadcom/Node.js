/**
 * 使用sqlite3持久化数据
 * 需求：把一个数组中的每个对象,每个对象中的属性,存到xxx.db文件中去,像数据库一样的去操作它
 * 功能：1. 创建数据库(数据库存在的话，那就直接打开)
 *       2. 创建一个表(表存在的话就不用创建啦)
 *       3. 有了数据库和表, 最最基础的功能就是：
 *          插入数据(单个数据插入或者多个并行插入)
 *          更新数据(根据不同的条件更新每列数据)
 *          删除数据(根据不同的条件来删除每列数据)
 *          查询数据(单个数据查询，多个数据查询)
 */
var SQLite3 = require('sqlite3').verbose();

class SQLiteDB {
  constructor(options) {
    this.file = (options && options.file) || `./test.db3`; // 数据库文件(文件路径+文件名)
    this.table = (options && options.table) || `notes`; // 表名

    this.db = null; // 打开的数据库对象
    this.init().then(res=>{
      console.log(res);
    })
  }

  // 连接数据库(不存在就创建,存在则打开)
  init() {
    return new Promise((resolve, reject) => {
      this.db = new SQLite3.Database(this.file, function(err) {
        if (err) reject(new Error(err));
        resolve('数据库连接成功');
      });
    });
  }

  createTable(sentence) {
    return new Promise((resolve, reject) => {
      this.db.exec(sentence, function(err) {
        if (err) reject(new Error(err));
        resolve(`表创建成功已存在,不需要重新创建该表`);
      });
    });
  }

  sql(sql, param, mode) {
    mode = mode == 'all' ? 'all' : mode == 'get' ? 'get' : 'run';
    return new Promise((resolve, reject) => {
      //执行
      this.db[mode](sql, param, function(err, data, fields) {
        // data: Array, Object
        if (err) {
          reject(new Error(err));
        } else {
          console.log(fields);
          if (data) {
            resolve(data); // 返回数据查询成功的结果
          } else {
            resolve('success'); // 提示 增 删 改 操作成功
          }
        }
      });
    });
  }
}

module.exports = SQLiteDB;
