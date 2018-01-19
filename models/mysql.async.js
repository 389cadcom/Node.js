/*
 * @Author: Lonves 
 * @Date: 2017-11-17 12:37:55 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-12-15 16:55:12
 * 
 * async/await的实现原理是基于 Promise, 
 */
let mysql = require('mysql');

let pool = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: '',
    port    : 3306,
    database: 'db_admin'
});

function getConnection(sql, resolve, reject){
    pool.getConnection((err, connection)=>{
        if(err){
            reject(err);
            return ;
        }
        connection.query(sql, (err, res)=>{
            connection.release();
            if(err){
                reject(err);
                return ;
            }
            resolve(res);
        })
    })
}

//执行代码，返回结果
let execute = (sql, ...params)=>{
    return new Promise((resolve, reject)=>{
        getConnection(sql, resolve, reject);
    })
}

//查询所有
let queryAll = (sql, ...params)=>{
    return new Promise((resolve, reject)=>{
        getConnection(sql, resolve, reject);
    });
}

//查找首条数据
let queryFirst = (sql, ...params)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                reject(err);
                return ;
            }
            connection.query(sql, (err, res)=>{
                connection.release();
                if(err){
                    reject(err);
                    return ;
                }
                resolve(res[0] || null);
            })
        })
    })
}

module.exports = {
    execute,
    queryAll,
    queryFirst
}