var request = require('request');
var cheerio = require('cheerio');



exports.curl = function (user,pwd,callback){
var results = [];
let headers ={
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
};


var options={
 url:'http://115.24.110.3/SportScore/default.aspx',
 method: 'POST', 
 headers:headers,
 form:{txtuser: user,
       txtpwd: pwd,
       __EVENTTARGET:'',
       __EVENTARGUMENT:'',
       __LASTFOCUS:'',
       __VIEWSTATE:'/wEPDwUKLTM4NjY5Mzc1Ng9kFgJmD2QWCmYPEGRkFgFmZAICDw8WAh4HVmlzaWJsZWhkZAIDDw8WAh4EVGV4dAXfDjxzcGFuIHN0eWxlPSJGT05ULUZBTUlMWTog5a6L5L2TOyBCQUNLR1JPVU5EOiB3aGl0ZTsgQ09MT1I6IHJlZDsgRk9OVC1TSVpFOiAxMy41cHQ7IG1zby1oYW5zaS1mb250LWZhbWlseTogQXJpYWw7IG1zby1iaWRpLWZvbnQtZmFtaWx5OiBBcmlhbDsgbXNvLWFzY2lpLWZvbnQtZmFtaWx5OiBBcmlhbCI+PHNwYW4gc3R5bGU9IkZPTlQtRkFNSUxZOiDlrovkvZM7IEZPTlQtU0laRTogMTJwdCIgbGFuZz0iRU4tVVMiPjxvOnA+DQo8cCBhbGlnbj0iY2VudGVyIj48c3Ryb25nPjxmb250IGNvbG9yPSIjMDAwMDAwIiBzaXplPSI1Ij48Zm9udCBzdHlsZT0iQkFDS0dST1VORC1DT0xPUjogI2UwZGI5ZSIgZmFjZT0iQXJpYWwiPjxmb250IHN0eWxlPSJCQUNLR1JPVU5ELUNPTE9SOiAjZTBkYjllIiBmYWNlPSJBcmlhbCI+PHNwYW4gc3R5bGU9IkZPTlQtRkFNSUxZOiDlrovkvZM7IEJBQ0tHUk9VTkQ6IHdoaXRlOyBDT0xPUjogcmVkOyBGT05ULVNJWkU6IDEzLjVwdDsgbXNvLWhhbnNpLWZvbnQtZmFtaWx5OiBBcmlhbDsgbXNvLWJpZGktZm9udC1mYW1pbHk6IEFyaWFsOyBtc28tYXNjaWktZm9udC1mYW1pbHk6IEFyaWFsIj48c3BhbiBzdHlsZT0iRk9OVC1GQU1JTFk6IOWui+S9kzsgRk9OVC1TSVpFOiAxMnB0IiBsYW5nPSJFTi1VUyI+PG86cD4mbmJzcDsgPC9vOnA+PC9zcGFuPjwvc3Bhbj48L2ZvbnQ+PC9mb250PjwvZm9udD48L3N0cm9uZz48L3A+DQo8cCBhbGlnbj0iY2VudGVyIj48c3Ryb25nPjxmb250IGNvbG9yPSIjMDAwMDAwIiBzaXplPSI1Ij7pgJrnn6U8L2ZvbnQ+PC9zdHJvbmc+PC9wPg0KPHAgYWxpZ249ImNlbnRlciI+PGZvbnQgY29sb3I9IiMwMDAwMDAiPiZuYnNwOzwvZm9udD48L3A+DQo8cD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgc2l6ZT0iNCI+PC9mb250PjwvcD4NCjxwPjxmb250IGNvbG9yPSIjMDAwMDAwIiBzaXplPSI0Ij48L2ZvbnQ+PC9wPg0KPHA+PGZvbnQgc2l6ZT0iNCI+PGZvbnQgY29sb3I9IiMwMDAwMDAiPjEuMjAxNS0yMDE25a2m5bm056ysMuWtpuacn+S9k+iCsuivvuaIkOe7qeW3suabtOaWsO+8jOi/m+WFpeafpeivouezu+e7n+WQjuivt+eCueWHuyZsZHF1bzvljoblj7LkvZPogrLmiJDnu6nkv6Hmga8mcmRxdW876L+b6KGM5p+l6K+i77yBPC9mb250PiZuYnNwOzwvZm9udD48L3A+DQo8cD48Zm9udCBzaXplPSI0Ij4yLuWtpueUn+eZu+W9lei0puWPt+S4uuWtpuWPt++8jOWvhueggeS4uueUn+aXpeWFq+S9jeOAgjwvZm9udD48L3A+DQo8cD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgc2l6ZT0iNCI+PC9mb250PjwvcD4NCjxwPjxmb250IGNvbG9yPSIjMDAwMDAwIiBzaXplPSI0Ij48L2ZvbnQ+PC9wPg0KPHA+PGZvbnQgY29sb3I9IiMwMDAwMDAiIHNpemU9IjQiPjwvZm9udD48L3A+DQo8cD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgc2l6ZT0iNCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7IOWFseS9k+mDqDwvZm9udD48L3A+DQo8cD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgc2l6ZT0iNCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MjAxNuW5tDnmnIgxMuaXpTwvZm9udD48L3A+DQo8L286cD48L3NwYW4+PC9zcGFuPmRkAgQPDxYCHwEFEjIwMTYtMi0yMyAxODowMDowMGRkAgUPDxYCHwEFEjIwMjAtMy0yNiAyMzowNDo0MGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQVidG5va5XoZBKrg3o8ecM6KR5Hk5FVdEvu',
       __EVENTVALIDATION:'/wEWCALdr4DxCQKBwaG/AQLMrvvQDQLd8tGoBALWwdnoCALB2tiCDgKd+7q4BwL9kpmqCiqkts8uGgg92XCVJce3KG7zZAef',
       dlljs:'st',
       'btnok.x':'4',
       'btnok.y':'12',
   },
};

 
request(options, function(error, response, body) {
    
    var datas = [];

    if (!error && response.statusCode == 200) {
     callback({
     'status':response.statusCode,
     err:true,
     results:null
             });
    //console.log(body);
   // console.log(response.statusCode);
    }
    else if(!error && response.statusCode == 302){
     //console.log(response.headers['set-cookie']);
     options = {
         url:'http://115.24.110.3/SportScore/stScore.aspx',
         headers: {  
           'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`, 
           Cookie: response.headers['set-cookie'],
         }
     },
     request(options,(e, r, b) => {
     var $ = cheerio.load(b,{decodeEntities:false})


//定义数据
     var datas=[];
     var className=[];
     var data0=[];
     var stuName=[];
  //如上所示
    
   stuName.push($('#lblname').html().replace(/\s+/g,""));

    
  
   let tyb = $('#pAll tr:nth-child(9) tbody')
     //体育班分析
      tyb.find('tr').each(function (item0){
        let values = new Array();
        let tr = $(this);
        let len = tr.html().split('<td').length-1;
           //console.log(len)
           if (item0 <4){
           tr.find('td').each(function (item1){
           let td = $(this);
           if(len >1){
                 html=td.html().replace(/\s+/g,"").replace(/<spanclass="fontbold">|<\/span\>/g,"")
                if (html!=""){
               values.push(html);
               
                         }else{len--;};
             }else{
                    className.push(td.html().replace(/\s+|<strong>体育班名称：|<\/strong\>/g,""))
                  };
                       
  
           });};

//push位置
if (len!=1){
    for(let i=0;i<len;i+=2){
       n=i
      data0.push({ subject:values[n],score:values[++n]})
     }};
   //console.log(len)
         //console.log(className)
     });
     //console.log(data0,className,stuName)
     //健康测试成成绩

    let name = $('#pAll tr:nth-child(14) table')
   
      name.find('tr').each(function (item2){
        
        let tr = $(this);
        let values = new Array();

        //var href =dd.find('a').attr('href');
        tr.find('td').each(function (item3){
           let td = $(this);
           html=td.html().replace(/\s+/g,"").replace(/<spanclass="fontbold">|<\/span\>|<red>|<\/red>/g,"")
           if (html!=""){
               values.push(html);
	       //console.log(html);
               
            }else{
              
            }
        });
       datas.push({ subName:values[0],subScore:values[1],subSingle:values[2],subAssess:values[3]})
      });

        //var webconnect =dd.find('a').html()
        //datas.push({ href:href,connect:webconnect})

     //var name = $('.line>a').attr('id')
    
     
     callback({
     'status':r.statusCode,
     'err':false,
     'className':className[0],
      'stuName':stuName[0],
     'data0':data0,
     'data1':datas
       })

   // console.log(datas);
     })

    }else{
     callback({
         'status':response.statusCode,
          err:true,
          results:null
     });
     console.log('post false')
    }

})

};
//module.exports = curlweb;
//curlweb(20151105822,19950826)
