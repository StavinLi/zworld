define(['jquery','myutil','app/myfn',],function($,x,url){
	function getCityData(){//放导航数据的根元素
		//导航
		var xhr1= x();//创建ajax对象
		//发送ajax导航请求
		xhr1.open('get',url.getBaseURL()+'/znav');
		xhr1.send(null);
		xhr1.onreadystatechange = function(e){
			if(xhr1.readyState === 4){
				var ltitles = JSON.parse(xhr1.responseText);
				ltitles.forEach(function(elem,index){
					$('.ltitle').eq(index).html(elem['title'])
					$('.ltitle').eq(index).attr('href',elem['Url'])
				})
			}
		}
//		地方
		var xhr= x();//创建ajax对象
		//发送ajax导航请求
		xhr.open('get',url.getBaseURL()+'/cityWalkList');
		xhr.send(null);
		xhr.onreadystatechange = function(e){
			if(xhr.readyState === 4){
				var list = JSON.parse(xhr.responseText);
				list.forEach(function(elem,index){
					$('.imgurl').eq(index).attr('src',elem['imgurl'])
					$('.address').eq(index).html(elem['address'])
					$('.title').eq(index).html(elem['title'])
					$('.oldPrice').eq(index).html(elem['oldPrice']+'元')
					$('.newPrice').eq(index).html(elem['newPrice'])
					$('.browseCount').eq(index).html(elem['browseCount']+' '+'次浏览')
					$('.soldCount').eq(index).html(elem['soldCount']+' '+'件已售')
					for(var p in elem['introduce']){
						$('.introduce:eq('+index+') ul li').eq(p).html(elem['introduce'][p])
					}
				})
				
			}
		}
	}
	return getCityData;	
})