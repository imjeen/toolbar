
module.exports.getJSONP = function(options){

	var defaults = {
		url: '',
		before: function(){},
		done: function(){},
		fail: function(){},
		always: function(){}
	};

	options = $.extend(defaults,options);

	typeof options.before === "function" && options.before();

	try{
		$.ajax({
			url: options.url,
			type: "GET",
			dataType: 'jsonp',
			jsonp: 'callback'
		})
		.done(function(data){ 
			// console.log(1);
			typeof options.done === "function" && options.done.apply(options.done,arguments); })
		.fail(function(err){ 
			// console.log(2);
			typeof options.fail === "function" && options.fail(err); })
		.always(function(){ 
			// console.log(3);
			typeof options.always === "function" && options.always(); })

	}catch(e){
		console.log(e);
	}

};
