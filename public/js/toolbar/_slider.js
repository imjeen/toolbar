
var JSONP = require('./_JSONP.js').getJSONP;
var scroll = require('./_scroll.js');
// var config = require('./_config.js');
var render = require('./_render.js');

function hide($root,cb){
	$root.removeClass("j_toolbarOpen").stop().animate({'right':-282,'margin-right':0},200,function(){ cb && cb(); });
}

function show($root,cb){
	$root.addClass("j_toolbarOpen").stop().animate({'right':0},150,function(){ cb && cb(); });
}


module.exports.sliderTab = function(e,config,callback){
	var $toolbar = $('.j_asideToolbar');

	var $tab = $(e.target).closest(".toolbar-tab-item");
	var $old = $tab.siblings(".tab-selected");
	// var isOpen = $toolbar.hasClass("j_toolbarOpen");

	var $main = $toolbar.find('.j_toolbarMain');

	if($tab.hasClass("tab-selected")){
		// 关闭当前
		// stop: close 
		$tab.removeClass("tab-selected tab-hover");
		hide($toolbar);
	}else{
		// 打开新的
		$old.removeClass("tab-selected");
		$tab.addClass("tab-selected").removeClass("tab-hover");

		// var self = this;

		show($toolbar);
		
		if(config){
			var obj =  config;
			var $box = $toolbar.find('.j_' + obj.name + 'Box');
			var $mask;
			var ajaxBefore = function(){
				$toolbar.find('.j_toolbarMain').children(".toolbar-box").hide()
					.filter($box).show().children().hide();
				
				if($box.find(".toolbar-mask").length){
					$box.find(".toolbar-mask").show();
				}else{
					$mask = $('<div class="toolbar-mask"><span class="mask-tip">正在努力加载...</span></div>').appendTo($box);
				}
			}; 
			var ajaxDone = function(data){ 
				// 异步得到的几个TAB数据，只有在当前激活的TAB被渲染显示
				if($tab.hasClass("tab-selected")){
					render(obj.html,obj.name,data);
					// only for order
					$main.find('.j_allInput').prop('checked',true).trigger("change");
				}
				
			 };
			var ajaxAlways = function(){
				scroll($toolbar);
				$mask && $mask.remove();
			};
			
			JSONP({
				url: obj.url,
				before: ajaxBefore,
				done: ajaxDone,
				always:ajaxAlways
			});
		
		}
		
		typeof callback === 'function'  && callback();

	}
};

module.exports.slideHide = function(cb){ hide($('.j_asideToolbar'),cb); };

module.exports.slideShow = function(cb){ show($('.j_asideToolbar'),cb); };
