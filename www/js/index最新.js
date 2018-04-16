 getVcode=function(){
         axios.get("https://lab.daybreak.world/getVcode").then(response => {
             console.log(response);
         window.session = response.data.session;
         document.getElementById("vcode").src = response.data.imgbuf;
     });};
    getVcode();
    document.getElementById("tScore").style.display="none";

 function login() {
            user=document.getElementById("user").value;
            pwd=document.getElementById("pwd").value;
            if (user&&pwd) {
            document.loginform.action = "/";
            document.loginform.submit();
            }else
            {
            alert("禁止恶意空提交！")
            }
        };

const vm = new Vue({
    el: '#pdd',
    data: {
        results:"just do it！",
        items :'',
        items1 :'',
        item:'',
        ts:false,
        tsScore:''
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
                axios.get("https://lab.daybreak.world/api/score",{params: {user: user, pwd: pwd, vrcode: code, session: window.session}})
                    .then(response => {console.log(response);
                                        let res = response.data.datas.err;
                                        console.log(typeof(res), typeof('false'));
                                        if (!res) {
                                            var num=response.data.datas.title.length-1;
                                            console.log(num);
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
                                                 };
                                             });}
                                             },

        login: function() {
            document.getElementById("preloader").style.display="block";
            let user=document.getElementById("user").value;
            let pwd=document.getElementById("pwd").value;
            if (user.length != 11){
                setTimeout(function(){alert('数据填写错误，请检查！');document.getElementById("preloader").style.display="none";},1000);

            }else {

                document.getElementById("preloader").style.display="block";
                axios.get("https://lab.daybreak.world/api/st",{params: {user: user, pwd: pwd}})
                    .then(response => {console.log(response);
                                        let res = response.data.datas.err;
                                        //console.log(res);
                                        if (!res) {
                                            document.getElementById("page1").style.display='none';
                                            document.getElementById("page3").style.display='block';
                                            document.getElementById("info1").className='label label-primary';
                                            document.getElementById("preloader").style.display="none";
                                            this.items1 = response.data.datas;
                                            this.tsScore = response.data.datas.data0[8];
                                            console.log(this.items1);

                                            } else {
                                                var that=this;
                                                document.getElementById("page1").style.display='none';
                                                document.getElementById("page3").style.display='block';
                                                setTimeout(function(){that.results = '请求失败，未返回数据';document.getElementById("preloader").style.display="none";},1000);
                                                this.items1 = [];
                                                 };
                                             });}

        },

        select: function() {
            if(!this.ts) {
                console.log('test');
                document.getElementById("tScore").style.display="block";
                document.getElementById("jScore").style.display="none";
                document.getElementById("codeing").style.display="none";
                document.getElementById("pwd").placeholder="默认出生年份加生日8位";
                this.ts=true;
            }else{
                document.getElementById("tScore").style.display="none";
                document.getElementById("jScore").style.display="block";
                document.getElementById("codeing").style.display="block";
                document.getElementById("pwd").placeholder="信息门户默认2007";
                this.ts=false;
            }
        }

    }
})
