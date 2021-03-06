var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user.js");

router.get("/", function(req, res) {
    User.getUsrList(function(err, results) {
        if (err) {
            res.locals.error = err;
            res.render("index", {
                title: TITLE_REG
            });
            return;
        }
        //console.dir(results);

        //渲染页面
        res.render("userlist", {
            title: "用户列表",
            result: results
        });
    });
});

module.exports = router;
