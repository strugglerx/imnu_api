
var express = require('express');
var bodyParser=require('body-parser');//body中间件接受post数据
var api_router = require('./router/api_router');
var static=require('express-static');
var app = express();


app.use(bodyParser.urlencoded({extended:true}));//中间件
app.use('/zeus',static('./www'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.use('/api',api_router);





app.use('*',function(req, res,next){
    res.send('access denied');

});

app.use(function(req, res){
    res.send('500');
});

var server = app.listen(8081,"0.0.0.0", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
