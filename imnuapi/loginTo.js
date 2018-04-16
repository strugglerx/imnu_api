var  request = require('request');


var getScores = require('./getScores');

function login(username, password, verCode, session, callback) {

    if (!username&&!password&&!verCode&&!session) {
        callback({
            err: true,
            errtInfo:"i don't  get param"
        })
    }
    else {
        request({
            url: 'http://eip.imnu.edu.cn/EIP/syt/login/Login.htm',
            method: 'post',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
                'Cookie': session
            },
            form: {
                 'username': username,
                 'password': password,
                 'verification':verCode
            }
        }, function (err,res,body) {
            if (body.length > 1) {
                callback({
                    err: true,
                    errtInfo: "verification code is not right"
                });
            }else{
                //console.log(res.statusCode);
/*教务首页数据
          request({
            url: 'http://eip.imnu.edu.cn/EIP/user/index.htm',
            method: 'get',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
                'Cookie': session
            }
            }, function (err,res,body) {
                   console.log(body);
            });
 */
      newSession = 'username='+username+';'+session;
      console.log(newSession);
      request({
            url: 'http://eip.imnu.edu.cn/EIP/sytsso/other.htm?appId=NEWJWXT&url=http://210.31.186.13/auth/main?url=/qbcj&ticket=',
            method: 'get',
            headers: {
                  'Accept': '*/*',
                  'Accept-Encoding': 'gzip, deflate',
                  'Accept-Language': 'zh-CN,zh;q=0.9',
                  'Connection': 'keep-alive',
                  'Content-Length': '0',
                  'Origin': 'http://eip.imnu.edu.cn',
                  'Referer': 'http://eip.imnu.edu.cn/EIP//elobby/service/portlet.htm?_t=349433&_winid=w8904',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
                  'Cookie': newSession
                    }
              },function(err,res,body) {
                  //var newbody=iconv.decode(body,'GBK');
                  //console.log(body,res.statusCode);
                  //console.log(res.headers);
                 var COOKIE = (res.headers['set-cookie']);
                 var d1=COOKIE[0].substr(0,COOKIE[0].indexOf(";"));
                 var d2=COOKIE[2].substr(0,COOKIE[2].indexOf(";"));
                 var newSession1 =d1+';'+d2;
                 console.log(newSession1);

                 getScores(newSession1,function (obj){
                      return callback({
                             err: false,
                             title: obj.title
                             });
                 });

              });
            }
        });
    }
}

module.exports = login;
