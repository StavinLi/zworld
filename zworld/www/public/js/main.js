requirejs.config({
	baseUrl:'js/lib',//模块加载的根路径
	paths:{
		'app':'../app',
		'jquery':'jquery-3.1.1',//不用加js格式，系统会自动加载
		'myutil':'../app/myutil'
	},
	shim:{
		'myutil':{
			exports:'createXHR'
		}
	}
});

//我定义的模块(只能放一个模块)
define(['app/index','app/myfn1'],function(nav,mystyle){//前者依赖声明，后者依赖注入
	//调用nav模块方法
	nav();
	mystyle();
	
});




//所有的依赖都放入数组中  ***加根的话一定要写文件格式
//define(['jquery','app/myfn','js/app/myfn1.js','myutil','app/index4nav'],function($,url,mystyle,xhr,nav){//1参表示描述依赖，2参为依赖完成回调函数
////	$('div').html('hello')
////	console.log(mystyle)
//	var xhr = xhr();
//	xhr.open('get',url.getBaseURL()+'/znav')
//	xhr.send(null)
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState == 4){
////			$('div').html(xhr.responseText).css(mystyle)
//			console.log(xhr.responseText)
//			console.log(typeof xhr.responseText)
//		
//		}
//	}
//});


