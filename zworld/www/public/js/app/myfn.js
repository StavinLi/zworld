
//定义一个模块
define({
	baseUrl : 'http://10.0.161.141',
	port:'9000',
	getBaseURL:function(){
		return this.baseUrl + ':' + this.port
	}
})

