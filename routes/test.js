var util        = require('util');
var querystring = require('querystring');
var mysql       = require('../models/mysql.async');
var express     = require("express"),
    router      = express.Router();


//async连接mysql    
async function get() {
    await mysql.queryAll('select * from tb_admin').then(res=>{
        console.log(res);
    })
    console.log(13)
}
// get();

router.get('/', (req, res)=>{
    var body = req.query;
    console.log(body)
    var data = querystring.stringify(body)
    console.log(data)
    res.send({id:1, name: "Access-Control-Allow-Origin"});
})

router.post('/', (req, res)=>{
    var body = req.body;
    console.log(body);
    var data = querystring.stringify(body)
    res.end("Hi:" + data);
})


module.exports = router;