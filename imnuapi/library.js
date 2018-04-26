var request =require('request');
var cheerio = require('cheerio');
//var async=require('async');




function bookInfo(name,id,callback) {
     request({method:'get',
        url:'http://219.225.185.187:8080/opac/ajax_item.php?marc_no='+id},(e,r,b)=>{
            if(b.length > 359)
    {
        let $ = cheerio.load(b, {decodeEntities: false});
        let info = new Array();

        let status0 = $('tr[class="whitetext"]').each(function (item0) {
            let tr = $(this);
            let values = new Array();
            let code = tr.find('td[width="10%"]').html();
            tr.find('td[width="25%"]').each(function (item1) {
                let td = $(this);
                values.push(td.text());
                //console.log(td.text());
            });
            info.push({code:code,location: values[0], status: values[1]});
        });
        callback({err:false,"name": name, "info": info});
    }else{
        callback({err:true,"name": name, "info": null});
    }
        });

};


function searchBook(book,callback) {
    let url='http://219.225.185.187:8080/opac/openlink.php?title='+encodeURI(book)+'&displaypg=50&orderby=desc';
    let options = {
        url:url,
        method: 'get'
        // headers:
        //form:
    };
    request(options, function (errors, response, body) {
        //console.log(body);
        let $ = cheerio.load(body, {decodeEntities: false});
        var searchbooks = $('#search_book_list');
        //console.log(searchbooks.length);
        if (searchbooks.length>0){
        let bookStatus = new Array();
        //console.log(searchbooks.find('h3').text());
        searchbooks.find('h3 a').each(function (item) {
            let a = $(this);
            //console.log($(this));
            let name=a.html().split(".")[1];
            let url = a.attr('href').split('=')[1];
            bookStatus.push({bookName:name,infoUrl:url});
            /*
            books1(name,url, function (obj) {
                //console.log(obj);
               bookstatus.push(obj);
               callback(obj);
            });
*/

        });
        callback({err:false,datas:bookStatus});
        }else{
            callback({err:true,datas:null});
        }
    });

};

/*
searchBook('python',function(obj){
    console.log(obj);
    bookInfo(obj[1].bookName,obj[1].infoUrl,function(location){
       console.log(location);
    });
 });
*/
exports.searchBook=searchBook;
exports.bookInfo=bookInfo;