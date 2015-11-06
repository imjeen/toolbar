
var body = document.body || document.documentElement;
var isWebkit = typeof body.style['webkitTransition'] === 'string';

var scrollBarWidth = isWebkit ? 5 : 15;

module.exports = function($toolbar){
	var $myBox = $toolbar.find('.toolbar-box').filter(":visible");
	var $scroll = $myBox.find('.scroll-section');
	var $extra = $scroll.siblings();

	var _top = $scroll.scrollTop();
	var contentHeight = $scroll.filter(":visible").height('auto').height();
	var bottomHeight = $extra && $extra.length ? $extra.outerHeight(true) : 0;
	var maxHeight = $myBox.height()- bottomHeight;
	
	if(contentHeight > maxHeight){
		$scroll.height(maxHeight);
		$scroll.scrollTop(_top);
		
		$toolbar.css('margin-right',scrollBarWidth);
		$toolbar.find('.j_toolbarMain').width(280+scrollBarWidth);
	}else{
		$toolbar.css('margin-right',0);
		$toolbar.find('.j_toolbarMain').width(280);
	}
	
};
