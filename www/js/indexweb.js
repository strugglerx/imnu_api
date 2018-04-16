axios.get("https://lab.daybreak.world/getVcode").then(response => {
    console.log(response);
    window.session = response.data.session;
    document.getElementById("vcode").src=response.data.imgbuf;
})


    //调用接口
     function openUrl()
     {
        user=document.getElementById("user").value;

        //window.location.href="https://lab.daybreak.world/clc.json";
         axios.get('https://lab.daybreak.world/clc.json',{
                      params:{
                        random:user
                      }
                    })
            var pp=tim.then(function(res){
                          console.log(res.data.value);

                       })
return pp
         /*
        if (stu_id) {
            window.location.href="/";
        }else
        {
            alert("账号密码必须得是数字才成！")
        }
        */
     }
     function getcode(){
         axios.get("https://lab.daybreak.world/getVcode").then(response => {window.session = response.data.session;document.getElementById("vcode").src=response.data.imgbuf;})

     }
     function login() {

            stu_id=document.getElementById("user").value;


            if (stu_id) {
            document.loginform.action = "/#";
            document.loginform.submit();
            }else
            {
            alert("禁止恶意空提交！")
            }

        }

const vm = new Vue({
    el: '#pdd',
    data: {
        results:"just do it！",
        items :'',
        item:''

    },
    methods:{
        open: function() {
            document.getElementById("preloader").style.display="block";
            let user=document.getElementById("user").value;
            let pwd=document.getElementById("pwd").value;
            let code=document.getElementById("code").value;
            if (user.length != 11||code.length !=4){
                setTimeout(function(){alert('数据填写错误，请检查！');document.getElementById("preloader").style.display="none";},1000);

            }else {

                document.getElementById("preloader").style.display="block";
                axios.get("https://lab.daybreak.world/api/score",
                    {
                        params: {
                            user: user,
                            pwd: pwd,
                            vrcode: code,
                            session: window.session
                        }
                    }).then(response => {console.log(response);
                let res = response.data.datas.err;
                console.log(typeof(res), typeof('false'));
                if (!res) {
                    var num=response.data.datas.title.length-1;
                    console.log(num)
                    document.getElementById("page1").style.display='none';
                    document.getElementById("page2").style.display='block';
                    document.getElementById("info").className='label label-primary';
                    document.getElementById("preloader").style.display="none";
                    this.items = response.data.datas.title;
                    this.results = '请求成功！数据已获取';


                } else {
                    var that=this;
                    document.getElementById("page1").style.display='none';
                    document.getElementById("page2").style.display='block';
                    setTimeout(function(){that.results = '请求失败，未返回数据';document.getElementById("preloader").style.display="none";},1000);
              
                    this.items = [];
                    

                }

            })

            }
        }

    }
});