var request = require("request");
//var async = require("async");
function getVcodeInfo(callback){
    var options = {
        //url: "http://222.24.62.120/CheckCode.aspx",
         url:'http://eip.imnu.edu.cn/EIP/syt/login/captcha.htm',
        encoding: null,
    };
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
             //console.log(res.headers)
             console.log(res.headers['set-cookie'])
            var session = res.headers['set-cookie'][0];
            var vcodeSrc = "data:image/JPG;base64," + body.toString('base64');
            session = session.substr(0, session.indexOf(";"));
            if (!session) {
                callback("Server Error session  is null",null);
                return;
            }else{
                callback(false,{
                    session : session,
                    verCode : vcodeSrc
                });
            }
        }else {
            callback("server err!",err,null);
            return;
        }
    });
}
module.exports = getVcodeInfo;
