
define(['jquery','myutil','app/myfn'],function($,x,myUrl){
	//写我们模块的代码
	$('#search_icon,#keyword').on('mousemove',function(){
		$('#keyword').css('width','200px').css('display','block')
	})
	$('#search_icon,#keyword').on('mouseleave',function(){
		if($('#keyword').val() ==''){
			console.log($('#keyword').val())
			$('#keyword').css('width','0').css('display','none')	
		}else{
//			$(document).not('#search_icon,#keyword').on('click',function(){
//				$('#keyword').css('width','0').css('display','none')	
//				
//			})
			
		}
	})
	$('#page1').click(function(e){
		$('.go1').css('display','block')
		$('.go2').css('display','none')
		$('#up').css('display','none')
		$('#down').css('display','inline-block')
		$(this).css('background','#00b081')
		$('#page2').css('background','none')
		
		e.preventDefault()
	})
	$('#up').click(function(e){
		$('.go1').css('display','block')
		$('.go2').css('display','none')
		$('#up').css('display','none')
		$('#down').css('display','inline-block')

		e.preventDefault()
	})
	$('#page2').click(function(e){
		$('.go1').css('display','none')
		$('.go2').css('display','block')
		$('#up').css('display','inline-block')
		$('#down').css('display','none')
		$(this).css('background','#00b081')
		$('#page1').css('background','none')
		e.preventDefault()
		
	})
	$('#down').click(function(e){
		$('.go1').css('display','none')
		$('.go2').css('display','block')
		$('#up').css('display','inline-block')
		$('#down').css('display','none')

		e.preventDefault()
		
	})
	$("#keyword").keyup(function(){
		var str = $(this).val();
		$.ajax({
			type:"get",
			url: myUrl.getBaseURL()+'/sitesearch?kw='+str,
   	        dataType: 'json',//服务器返回数据的类型为json  '
			success:function(text){
//					console.log(text)

				console.log(text['data']['list']);	
				var select = text['data']['list']
				$('#searchBox').empty();
				var ul = $('<ul></ul>')
				$('#searchBox').css('box','1px 1px 1px #000')
				$('#searchBox').append(ul)
				select.forEach(function(elem,index){
					if(elem['cn_name'] != undefined){
						var li = $('<li></li>');
						ul.append(li)
						var a= $('<a></a>')
						li.append(a)
						a.attr('href',elem['url'])
						var img = $('<img />')
						img.attr('src',elem['src'])
						a.append(img)
						var p = $('<p></p>')
						a.append(p)
						p.html(elem['cn_name']+'<br />'+elem['belong_name'])
					}			
				})
			}
		})
	})


});