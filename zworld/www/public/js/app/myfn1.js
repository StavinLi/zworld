define(['jquery','myutil','app/myfn'], function($,x,myUrl) {
	function style1() {
		$(document).ready(function() {
			for(var i = 0; i < $('.horse_top').length; i++) {
				(function(index) {
					$('.horse_top:eq(' + index + ')').add($('.smallmenu:eq(' + index + ')')).on('mouseenter',function(){
						$('.horse_top:eq(' + index + ')').css('background', '#fff');
						$('.horse_top:eq(' + index + ') dt').css('color', '#323232');
						$('.smallmenu').eq(index).css('display', 'block')
					}).on('mouseleave', function() {
						$('.horse_top:eq(' + index + ')').css('background', 'rgba(0,0,0,0)');
						$('.horse_top:eq(' + index + ') dt').css('color', '#FFFFFF');
						$('.horse_top span').css('color', '#silver');
						$('.smallmenu').eq(index).css('display', 'none')
					})
				})(i)
			}

		})
		var ul = document.querySelector('#horse ul')
		var timer = setInterval(function() {
			if(ul.offsetLeft <= -5464) {
				ul.style.left = '-1366px';
			} else {
				ul.style.left = ul.offsetLeft - 1366 + 'px'
			}
		}, 2000);
		$('#horse ul,#after,#before').on('mouseover', function() {
			clearInterval(timer)
		})
		$('#horse ul').on('mouseout', function() {
			clearInterval(timer)
			timer = setInterval(function() {
				if(ul.offsetLeft <= -5464) {
					ul.style.left = '-1366px';
				} else {
					ul.style.left = ul.offsetLeft - 1366 + 'px'
				}
			}, 2000)
		})
		$('#before').on('click', function() {
			ul.style.left = (ul.offsetLeft + 1366) + 'px';
			clearInterval(timer)
		})
		$('#after').on('click', function() {
			ul.style.left = (ul.offsetLeft - 1366) + 'px'
		})

//		$('#keyword').keyup(function(){
////			console.log(myUrl.getBaseURL()+'/?action=new_search&keyword='+$(this).val());
//         
//          var inputText= $.trim(this.value);
//          if(inputText!=""){//检测键盘输入的内容是否为空，为空就不发出请求  
//	            $.ajax({  
//	                type: 'get',  
//	                url: myUrl.getBaseURL()+'/sitesearch/'+inputText,  
//	                cache:false,//不从浏览器缓存中加载请求信息  
//	       	        dataType: 'json',//服务器返回数据的类型为json  '
//	                success: function (json) {  
//						console.log(json)
//	                }  
//	  
//	            });   
//	        }  
//	  	})
	
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
	}
	return style1;
})