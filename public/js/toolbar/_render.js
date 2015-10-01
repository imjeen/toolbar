
// var _ = require('underscore');
var _  = require('../bower_components/underscore/underscore-min.js');


module.exports = function(html,name,data){

	var $toolbar = $('.j_asideToolbar');

	var compiled  = _.template(html);
	var objData = {};
	objData[name] = data;
	var templateHtml = compiled(objData);
	var selector = '.j_' + name + 'Box';

	$toolbar.find('.j_toolbarMain').children(".toolbar-box").hide()
		.filter(selector).html(templateHtml).show();
			
};
