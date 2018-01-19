var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var multer       = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var ejs          = require('ejs');

var routes   = require('./routes/index');
var register = require('./routes/register');
var login    = require('./routes/login');
var userlist = require('./routes/userlist');
var main     = require('./routes/main');
// var upload   = require('./routes/upload-multer');
var upload   = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);    //renderFile

app.use(favicon());
app.use(logger('dev'));                             //不记录静态文件请求(内容提前)
app.use(cookieParser());
app.use(express.static('public'))

app.use(bodyParser.json());                         //application/json
app.use(bodyParser.urlencoded());                   //application/x-www-urlencodeed
// app.use(multer({dest: 'temp'}).array('image'))   //multipart/form-data


//这里传入了一个密钥加session id
// app.use(cookieParser('Wilson'));                 //默认空值cookieParser()？？
app.use(session({ secret: 'wilson'}));

//app.use(require("cors")())                          // allow Cross-domain requests 
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "Orgin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/test', require('./routes/test.js'));

app.use('/', routes);
app.use('/', login);                        //指定首级, 路由中设置多个路径
app.use('/main', main);
app.use('/reg', register);
app.use('/userlist', userlist);
app.use('/upload', upload);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误中间件
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.listen(8000, function(){
     console.log("Server has strart! Port: 8000");
});

/*
app.listen = function(){
    var server = http.createServer(this);
    return server.listen.apply(server, arguments)
}
*/

module.exports = app;
