var express    = require("express");
var router     = express.Router();
var formidable = require("formidable");
var fs         = require("fs");
var path       = require("path");

TITLE_REG = "注册";
UPLOAD_DIR = "uploads";

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}

/* GET home page. */
router.get("/", function(req, res) {
    res.render("upload", {
        title: TITLE_REG
    });
});

function getDateName(){
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    m = m < 10 ? '0' + m: m;
    d = d < 10 ? '0' + d: d;
    h = h < 10 ? '0' + h: h;
    i = i < 10 ? '0' + i: i;
    s = s < 10 ? '0' + s: s;
    
    return [y, m, d, h, i, s].join('');
}

console.log(__dirname);

//TODO
router.post("/", function(req, res) {
    var folder_Name     = uuid();               //个人文件夹的名称
    var file_Name       = uuid();               //上传照片的文件名称

    var form = new formidable.IncomingForm();       //创建上传表单
        form.encoding       = 'utf-8';              //设置编辑
        form.uploadDir      = path.join('public', UPLOAD_DIR);//设置上传目录
        form.keepExtensions = true;                 //保留后缀
        form.maxFieldsSize  = 2 * 1024 * 1024;      //文件大小
    
    //目录是否存在
    fs.exists(form.uploadDir, function(exists) {
        if (!exists) {
            fs.mkdir(form.uploadDir, function() {
                console.log(form.uploadDir);
            });
        } else {
            console.log("上传文件夹目录已存在！");
        }
    });

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render("login", { title: TITLE_REG });
            return;
        }
        console.log(fields, files);

        var extName = path.extname(files.uploadImg.name);   //name = uploadImg
        
        if(extName.length == 0){
              res.locals.error = '只支持png和jpg格式图片';
              res.render('login', { title: TITLE });
              return;                   
        }
        var fileName = getDateName() + extName;
        var newPath = path.join(form.uploadDir, fileName);
        fs.renameSync(files.uploadImg.path, newPath);       //重命名

        res.locals.success = "上传成功";
        res.render("register", { title: TITLE_REG, url: '../' + UPLOAD_DIR + "/" + fileName });
        /*
            res.writeHead(200, {"Content-type": "text/html"});
            res.write("Received image:<br>");
            res.write("<image src=/show />");
            res.end();
        */
    });
    form.on('progress', function(bytesReceived, totals) {
        console.log(bytesReceived, totals)
    });
});
module.exports = router;
