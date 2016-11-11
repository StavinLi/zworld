//先安装npm install express --save
var express = require('express');
var app = express();
var fs = require('fs');
//存储从文件读取的数据
var gdata = null//同步需要，异步不要
var gdata1 = null//同步需要，异步不要
//读取数据
	//导航
fs.readFile('data/index/headnav.json',function(err,data){
	if(err)
		console.log(err)
	//相对路径
	gdata = data;
})
//菜单
fs.readFile('data/index/menu.json',function(err,data1){
	if(err)
		console.log(err)
	//相对路径
	gdata1 = data1;
})
//轮播图
fs.readFile('data/index/banner.json',function(err,data2){
	if(err)
		console.log(err)
	//相对路径
	gdata2 = data2;
})
fs.readFile('data/index/freeWalk.json',function(err,data3){
	if(err)
		console.log(err)
	//相对路径
	gdata3 = data3;
	console.log('服务器已经启动...')
})
fs.readFile('data/citywalk/cityWalkList.json',function(err,data4){
	if(err)
		console.log(err)
	//相对路径
	gdata4 = data4;
	console.log('服务器已经启动...')
})
app.listen(9000);
//提供web服务功能
app.use(express.static('www'))

app.all("/*",function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
   });
// 
   //导航
app.get('/znav',function(req,res,next){//cross限制只支持新版浏览器
	res.header("Content-type","application/json");	console.log(JSON.parse(gdata));
	res.send(gdata);
})
	//菜单
app.get('/menu',function(req,res,next){//cross限制只支持新版浏览器
	res.header("Content-type","application/json");
	res.send(gdata1);
})
	//轮播图
app.get('/banner',function(req,res,next){//cross限制只支持新版浏览器
	res.header("Content-type","application/json");
	res.send(gdata2);
})
app.get('/freeWalk',function(req,res,next){//cross限制只支持新版浏览器
	res.header("Content-type","application/json");
	res.send(gdata3);
})

app.get('/cityWalkList',function(req,res,next){//cross限制只支持新版浏览器
	res.header("Content-type","application/json");
	res.send(gdata4);
})
//app.get('/remote',(req,res)=>{
//	var cbName = req.query['callback'];
//	console.log(cbName);
//	var obj = "{name:'tom',age:22}";
//	var data = cbName +'('+obj+')';
//	res.send(data)
//})
var http = require('http');
//suggest组件
// app.get('/sitesearch/:keyword',function(req,res){
// 	var url = req.params.keyword;  //req.param获取pathinfo中参数 /api/users/{id}
// 	var sreq = http.request({
// 		host:   'z.qyer.com',//目标主机
// 		path: 	'/qcross/home/ajax?action=sitesearch&keyword='+url, //目标路径
// 		method: 'get' //请求方式
// 	},function(sres){
// 		sres.pipe(res);
// 		sres.on('end',function(){
// 			console.log('done');
// 		});
// 	});
// 	if(/POST|PUT/i.test(req.method)){
// 		req.pipe(sreq);
// 	}else{
// 		sreq.end();
// 	}
// })

app.get('/sitesearch',function(req,res){
	//获取用户传递过来的参数
	var arg = req.query['kw']; //req.query获取查询参数 /api/users?name=wwx
	httpSearch(arg,function(info){
		res.send(JSON.parse(info));
	});
	console.log(req.query['kw']);
});
function httpSearch(kwVal,callback){
	http.get('http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword='+kwVal,function(httpRes){
		var buffers = [];
		httpRes.on('data',function(chunk){
			buffers.push(chunk);
		});
		httpRes.on('end',function(chunk){
		 	var wholeData = Buffer.concat(buffers);
            var dataStr = wholeData.toString('utf8');
            callback(wholeData);
		});
	}).on('error',function(e){
		console.log(e);
	})
}
