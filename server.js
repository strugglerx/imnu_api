//express_demo.js 文件
var express = require('express');
var bodyParser=require('body-parser');//body中间件接受post数据
var curlweb = require('./imnuapi/login');
var loginto = require('./imnuapi/loginTo');
var getVcode = require("./imnuapi/getVcode");
var static=require('express-static');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));//中间件

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res,next) {
        res.send('get');


});
app.post('/', function (req, res,next) {
    res.send('post api');

});

app.get('/api/st',function(req,res,next){
if (req.url=="/api/st"){
res.send('api web');
}else if (req.query.user&&req.query.pwd){
//console.log(req.headers)
var user = req.query.user;
var pwd = req.query.pwd;
curlweb.curl(user,pwd,function(obj){
  res.json({host:req.headers.host,'user-agent':req.headers['user-agent'],datas:obj});
   //console.log(obj);
    })
}else{
res.send('key1:user,key2:pwd');
}

console.log(user,pwd);
});

app.get('/api/getVcode',function (req,res) {
    getVcode(function(err, result){
        if(err){
            res.json('{"ok": "false","result":"null"}');
        }else{
            var vcodeInfo ={
                session:result.session,
                imgbuf:result.verCode
            }
            res.json(vcodeInfo);
        }
    });
});



app.get('/api/score',function(req,res,next){
if (req.url=="/api"){
res.send('score web');
}else if (req.query.user&&req.query.pwd&&req.query.session&&req.query.vrcode){
//console.log(req.headers)
let session = req.query.session;
let vrcode = req.query.vrcode;
let user = req.query.user;
let pwd = req.query.pwd;
loginto(user,pwd,vrcode,session,function(obj){
    //console.log(obj);
   return res.json({host:req.headers.host,'user-agent':req.headers['user-agent'],datas:obj})
   
    });
console.log(user,pwd);
}else{
res.send('http://localhost:8081/api/score?user=&pwd=&session=&vrcode=');
}

});


//app.use(express.static('www'));
app.use('/',static('./www'));

app.use('*',function(req, res){
     res.header("Content-Type", "text/html; charset=UTF-8");
    res.sendfile('./www/404/404.html');
});

app.use(function(req, res, next){
    res.send('500');
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
