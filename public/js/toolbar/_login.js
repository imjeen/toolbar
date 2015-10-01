
var loginfunc = require('../_util/public_login.js');

module.exports = function(loginCallback){
	$.ajax({
		url: '/login',
		type: "GET",
		dataType: 'jsonp',
		jsonp: 'callback'
	 })
	.done(function(data){
		if(data.isLogin){
			typeof loginCallback === "function" && loginCallback.apply(loginCallback,arguments);
		}else{
			loginfunc(data.casUrl);
		}
	})
};
