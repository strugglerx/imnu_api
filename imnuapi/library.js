var request =require('request');
var cheerio = require('cheerio');

let options = {
        url: 'http://219.225.185.187:8080/opac/openlink.php?location=ALL&title=%E6%97%B6%E9%97%B4&doctype=ALL&lang_code=ALL&match_flag=forward&displaypg=100&showmode=list&orderby=DESC&sort=CATA_DATE&onlylendable=no&count=33&with_ebook=on&page=1',
        method: 'get'
        // headers:
        //form:
    };




    request(options, function (errors, response, body) {
        //console.log(body);
        let $ = cheerio.load(body, {decodeEntities: false});
        let books = [];
        var searchbooks = $('#search_book_list');
        searchbooks.find('h3 a').each(function (item) {
            let a = $(this);
            //console.log($(this).html());

            let url = 'http://219.225.185.187:8080/opac/ajax_item.' + a.attr('href').split('.')[1];
            let bookstatus = new Array();
            //console.log(source);
            books1(url, function (obj) {
                console.log(obj);
                bookstatus.push({'location': obj[0], 'status': obj[1]});

            });

            books.push({name: a.html(), info: bookstatus});
            //console.log(a.html());
        });

        console.log(books);

    });

function books1(url,callback) {

     request({method:'get',
        url:url.toString()},(e,r,b)=>{
            let $ = cheerio.load(b,{decodeEntities:false});
            let status0=$('tr[class="whitetext"]').each(function(item0) {
                let tr=$(this);
                let values = new Array();
                tr.find('td[width="25%"]').each(function (item1) {
                    let td = $(this);
                    values.push(td.text());
                    //console.log(td.text());
                });
                //console.log(values+'-----------------');
                callback(
                    values
                );
            });
        });

}