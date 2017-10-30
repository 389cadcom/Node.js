/*
 * @Author: Lonves 
 * @Date: 2017-10-30 20:18:49 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-10-30 20:33:33
 * 
 * 连接池侦听connect事件
 */
var mysql = require("mysql");
var DB_NAME = "db_admin";

var pool = mysql.createPool({
    host    : "localhost",
    user    : "root",
    password: "",
    port    : "3306"
});

pool.on("connection", function(connection) {
    connection.query("SET SESSION auto_increment_increment=1");
});

function User(user) {
    this.username = user.username;
    this.userpass = user.userpass;
}
module.exports = User;

//创建连接
pool.getConnection(function(err, connection) {
    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function(err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log("USE succeed");
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            username: this.username,
            userpass: this.userpass
        };

        var insertUser_Sql = "INSERT INTO tb_admin(id,users,pwd) VALUES(0,?,?)";

        connection.query(
            insertUser_Sql,
            [user.username, user.userpass],
            function(err, result) {
                if (err) {
                    console.log("insertUser_Sql Error: " + err.message);
                    return;
                }

                //connection.release();

                console.log("invoked[save]");
                callback(err, result);
            }
        );
    };

    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(username, callback) {
        var getUserNumByName_Sql =
            "SELECT COUNT(1) AS num FROM tb_admin WHERE users = ?";

        connection.query(getUserNumByName_Sql, [username], function(
            err,
            result
        ) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getUserNumByName]");
            callback(err, result);
        });
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserNumByName(username, callback) {
        var getUserByUserName_Sql = "SELECT * FROM tb_admin WHERE users = ?";

        connection.query(getUserByUserName_Sql, [username], function(
            err,
            result
        ) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getUserByUserName]");
            callback(err, result);
        });
    };

    //查询所有用户列表
    User.getUsrList = function getUsrList(callback) {
        var getUsrList_Sql = "Select * from tb_admin";
        connection.query(getUsrList_Sql, function(err, result) {
            if (err) {
                console.log("getUsrList_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getUsrList]");
            callback(err, result);
        });
    };
});
