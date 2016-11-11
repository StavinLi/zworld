
define(['jquery','myutil','app/myfn',],function($,x,url){
	function getNavData(){//放导航数据的根元素
		
//		导航
		var xhr= x();//创建ajax对象
		//发送ajax导航请求
		xhr.open('get',url.getBaseURL()+'/znav');
		xhr.send(null);
		xhr.onreadystatechange = function(e){
			if(xhr.readyState === 4){
	//			$('div').html(xhr.responseText).css(mystyle)
//				f(xhr.responseText)
				var navs = JSON.parse(xhr.responseText);
				navs.forEach(function(elem,index){
					var as = $('nav a');
					as.eq(index).html(elem['title']);
					as.eq(index).attr('href',elem['Url']);
				})
			}
		}
		
		//菜单
		var xhr1= x();//创建ajax对象
		//发送ajax菜单请求
		xhr1.open('get',url.getBaseURL()+'/menu');
		xhr1.send(null);
		xhr1.onreadystatechange = function(e){
			if(xhr1.readyState === 4){
				var menus = JSON.parse(xhr1.responseText);
				menus.forEach(function(elem,index){
					var dts = $('#horse dt');
					var dds  = $('#horse dd')
					dts.eq(index).html(elem['title']);
					for(var p in elem['mainCity']){
						var menua = $("<a href='#'></a>")
						menua.html(elem['mainCity'][p])	
						dds.eq(index).append(menua)
					}
					var divs = $('.smallmenu')
					var ul = $('<ul></ul>')
					divs.eq(index).append(ul)
					elem['moreCity'].forEach(function(ele,index){	
						var li =$('<li></li>')
						var h3 = $('<h3></h3>')
						h3.html(ele.cityName)
						li.append(h3)
						ul.append(li)
						var div = $('<div></div>')
						li.append(div)
						for(var p in ele['items']){
							if(ele['items'][p].length>30){
								var menimg = $('<img/>')
								var mena = $("<a href='#'></a>")
								var menimg = $('<img/>')
								menimg.attr('src',ele['items'][p])
								mena.append(menimg)
								div.append(mena)
								
							}else{
								var men = $("<a href='#'></a>")
								men.html(ele['items'][p])	
								div.append(men)
							}
						}	
					})
					var cityImg = $('<img/>')
					var cityImgA = $("<a href='#'></a>")
					cityImgA.append(cityImg)
					if(index !=5){
						
						$('.smallmenu:eq('+index+') li:last').append(cityImgA)
					}
					cityImg.attr('src',elem['moreCityImg'])
					
				})
			}
		}
		
		//轮播图
		var xhr2= x();//创建ajax对象
		//发送ajax菜单请求
		xhr2.open('get',url.getBaseURL()+'/banner');
		xhr2.send(null);
		xhr2.onreadystatechange = function(e){
			if(xhr2.readyState === 4){
				var banners = JSON.parse(xhr2.responseText);
				var li = $('#horse ul li ')
				var aa = $('#horse ul li a')
				banners.forEach(function(elem,index){
					for(var p in elem){
						li.eq(index).css('background','url('+elem.imgUrl+') center')
						aa.eq(index).attr('href',elem['href']);
					}
				})
			}
		}
		//freeWalk
		var xhr3= x();//创建ajax对象
		//发送ajax菜单请求
		xhr3.open('get',url.getBaseURL()+'/freeWalk');
		xhr3.send(null);
		xhr3.onreadystatechange = function(e){
			if(xhr3.readyState === 4){
				var freeWalks = JSON.parse(xhr3.responseText);
				var hu;
				freeWalks.forEach(function(elem,index){
					$('#airport li a').eq(index).html(elem['title'])
					$('#airport li a').eq(index).data('data',elem['data']).mouseenter(function(){
//jQuery 数据 - jQuery.data() 方法
//$(selector).data(name,value)
//name	必需。规定要设置的数据的名称。
//value	必需。规定要设置的数据的值。
						var erhua = $(this).data('data')
						var ul = $('<ul></ul>')
						$('#erhu').append(ul)
						ul.attr('id','free')
						//第一个li
						var li1 = $('<li></li>')
						ul.append(li1)
						li1.attr('class','autoget')
						li1.attr('id','big')
						var div1 = $('<div></div>')
						li1.append(div1)
						var p1 = $('<p></p>')
						div1.append(p1)
						p1.html('机+酒')
						var p2 = $('<p></p>')
						div1.append(p2)
						var span = $('<span></span>')
						span.attr('class','freeprice')
						var span2 = $('<span></span>')
						span2.html('元起')
						p2.append(span)
						p2.append(span2)
						var div2 = $('<div></div>')
						li1.append(div2)
						var p3 = $('<p></p>')
						div2.append(p3)
						p3.attr('class','freetitle')
						var p4 = $('<p></p>')
						div2.append(p4)
						p4.attr('class','freetime').html(erhua['time'])
						
						for(var i = 0 ;i < 5 ; i++){
							var li2 = $('<li></li>')
							ul.append(li2)
							li2.attr('class','autoget')
							var a = $('<a href=\'#\'></a>')
							li2.append(a)
							var div3 = $('<div></div>')
							a.append(div3)
							div3.attr('class','brother')
							var p5 = $('<p></p>')
							div3.append(p5)
							p5.html('机票')
							var p6 = $('<p></p>')
							div3.append(p6)
							var span1 = $('<span></span>')
							var span3 = $('<span></span>')
							p6.append(span1)
							p6.append(span3)
							span3.html('元起')
							span1.attr('class','freeprice')
							var p7 = $('<p></p>')
							li2.append(p7)
							p7.attr('class','title freetitle')
						}
						var li3 = $('<li></li>')
						ul.append(li3)
						li3.attr('id','big')
						li3.attr('class','small')
						var p8 = $('<p></p>')
						li3.append(p8)
						p8.html('查看更多<br />机酒自由行')
						var p9 = $('<p></p>')
						li3.append(p9)
						var p10 = $('<p></p>')
						li3.append(p10)
						p10.html('<a href="#">机票</a>|<a href="#">酒店</a>|<a href="#">机+酒</a>|<a href="#">邮轮</a>')
						erhua.forEach(function(elem,index){
//							console.log(elem)
							for(var p in elem){
								$('.freetitle').eq(index).html(elem['title'])
								$('.freeprice').eq(index).html(elem['price'])
								$('.freetime').html(elem['time'])
								$('.autoget').eq(index).css('background','url('+elem['imgUrl']+') no-repeat') 
							}
						})
						
						
					})
					$('#airport li a:first').trigger('mouseenter')
					
					
				})
			}
		}
	}
	return getNavData;
	
	
})