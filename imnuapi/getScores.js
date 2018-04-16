var  request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function getScores (session,callback) {
    if (session){
    request({
        encoding: null,
        url: 'http://210.31.186.13/qbcj',
        method: 'post',
        headers: {
            'Host': '210.31.186.13',
            'Connection': 'keep-alive',
            'Content-Length': '0',
            'Cache-Control': 'max-age=0',
            'Origin': 'http://210.31.186.13',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'http://210.31.186.13/auth/main?url=/qbcj&ticket=0h@2FA0H.JQa01WCYNBF7P3M4NLA2BANVQKZ',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
            'Cookie': session
        }

    }, function (err, res, body) {
        var newbody = iconv.decode(body, 'GBK').toString();
        var $ = cheerio.load(newbody, {decodeEntities: false});
        let grades = $('.cur');
        //定义数据
        //let  stuAll=[];
        let stuP = [];
        //定义数据
        grades.find('.col-sm-12').each(function (item0) {
            let class_ = $(this);
            let stuAll = [];
            let value0 = new Array();
            class_.find('p').each(function (item1) {
                let p = $(this);
                value0.push(p.html().replace(/\s+/g, ""));
            });
            //修改stuP.push({term:value0[0],state:value0[1]});
            //class_
            class_.find('.gradeX').each(function (item2) {
                let class_1 = $(this);
                let value1 = new Array();
                //console.log(item2,class_1.html());
                //这里显示成绩详情
                class_1.find('td').each(function (item3) {
                    let td = $(this);
                    if (item3 == 2 || item3 == 5 || item3 == 6 || item3 == 7) {
                        value1.push(td.html().replace(/\s+/g, "").replace(/<fontcolor="red">|<\/font>/g, ""));
                    }
                    ;
                });
                stuAll.push({course: value1[0], credit: value1[1], attributes: value1[2], score: value1[3]});
            });
//上面是class_1
            stuP.push({term: value0[0], state: value0[1], values: stuAll});
        });
        //console.log(stuP);

        callback({
            err: false,
            title: stuP
            // scores:stuAll
        });
    });
    }else{};
}

module.exports = getScores;