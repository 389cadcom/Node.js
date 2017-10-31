var express = require("express");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var router = express.Router();

var formidable = require("formidable");
const FILES_DIR = 'upload';

router.use(multer({dest: '/tmp/'}).array('image'));

TITLE_REG = "注册";

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
router.post("/", function(req, res) {
    var file = req.files[0];
    var d = new Date();
    var time = [d.getFullYear(), (d.getMonth() + 1), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('');
    
    var ext      = path.extname(file.originalname);
    var fileDir  = path.join('public', FILES_DIR);
    var fileName = time + ext;
    //var imgDir  = path.join(fileDir, uuid());
    //console.log(file);

    //上传目录
    fs.exists(fileDir, function(exists) {
        if (!exists) {
            fs.mkdirSync(fileDir);                      //新建文件夹
        }
        fs.readFile(file.path, (err, data)=>{           //读写图片文件
            if(err) {
                console.log(err);
                return false;
            }
            fs.writeFile(path.join(fileDir, fileName), data, err=>{
                if(err){
                    console.log(err);
                    return false;
                }
            })
        })
    });
    res.locals.success = "上传成功";

    //当前路径渲染注册页面
    res.render("register", {
        title: TITLE_REG,
        url: path.join('../upload', fileName)
    });
});
module.exports = router;
