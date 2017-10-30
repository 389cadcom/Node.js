var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    crypto = require("crypto"),
    TITLE_LOGIN = "登录";

router.get("/login", function(req, res) {
    if (req.cookies.islogin) {
        res.redirect("/");
    } else {
        res.render("login", { title: TITLE_LOGIN });
    }
});

router.post("/login", function(req, res) {
    var userName = req.body["txtUserName"],
        userPwd = req.body["txtUserPwd"],
        isRem = req.body["chbRem"],
        md5 = crypto.createHash("md5");

    User.getUserByUserName(userName, function(err, results) {
        if (results == "") {
            res.locals.error = "用户不存在";
            res.render("login", { title: TITLE_LOGIN });
            return;
        }

        userPwd = md5.update(userPwd).digest("hex");
        if (results[0].users != userName || results[0].pwd != userPwd) {
            res.locals.error = "用户名或密码有误";
            res.render("login", { title: TITLE_LOGIN });
            console.log(1);
            return;
        } else {
            if (isRem) {
                res.cookie("islogin", userName, { maxAge: 60000 });
            }

            res.locals.username = userName;
            req.session.username = res.locals.username;
            console.log(req.session.username);
            res.redirect("/");
            return;
        }
    });
});

router.get("/logout", function(req, res) {
    res.clearCookie("Wilson");
    req.session.destroy();

    res.redirect("/login");
});

module.exports = router;