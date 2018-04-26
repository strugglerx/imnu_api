var curlweb = require('../imnuapi/login');

var library = require('../imnuapi/library');
var loginto = require('../imnuapi/loginTo');

var getVcode = require("../imnuapi/getVcode");

exports.code=function (req,res) {
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
};
exports.st=function(req,res){
if (req.url=="/api/st"){
res.send('api web');
}else if (req.body.user&&req.body.pwd){
//console.log(req.headers)
var user = req.body.user;
var pwd = req.body.pwd;
curlweb.curl(user,pwd,function(obj){
  res.json({host:req.headers.host,'user-agent':req.headers['user-agent'],datas:obj});
   //console.log(obj);
    })
}else{
res.send('key1:user,key2:pwd');
}

console.log(user,pwd);
};
exports.score=function(req,res){
if (req.url=="/api"){
res.send('score web');
}else if (req.body.user&&req.body.pwd&&req.body.session&&req.body.vrcode){
//console.log(req.headers)
let session = req.body.session;
let vrcode = req.body.vrcode;
let user = req.body.user;
let pwd = req.body.pwd;
loginto(user,pwd,vrcode,session,function(obj){
    //console.log(obj);
   return res.json({host:req.headers.host,'user-agent':req.headers['user-agent'],datas:obj})
    });
console.log(user,pwd);
}else{
res.send('http://localhost:8081/api/score?user=&pwd=&session=&vrcode=');
}

};
exports.search=function (req,res) {
   // console.log(req.url);

    if (req.url=="/api/search"){
res.send('search web');
}else if (req.query.book){
let book = req.query.book;
library.searchBook(book,function(obj){
    //console.log(obj);
  return res.json(obj);

    });
}else{
res.send('http://localhost:8081/api/?book=xxxx');
}

};
exports.bookinfo=function (req,res) {
    //console.log(req.url);

    if (req.url=="/api/bookinfo"){
res.send('bookinfo web');
}else if (req.query.book&&req.query.id){
let book = req.query.book;
let id = req.query.id;
library.bookInfo(book,id,function(obj){
    //console.log(obj);
  return res.json(obj);

    });
}else{
res.send('http://localhost:8081/api/?book=xxxx&id=xxxx');
}

};

