
module.exports = function($section,$extra){
	var $toolbar = $('.j_asideToolbar');
	var contentHeight = $section.find('.scroll-section').height('auto').height();
	var bottomHeight = $extra && $extra.length ? $extra.innerHeight() : 0;
	var maxHeight = $toolbar.find('.toolbar-box').filter(":visible").height()- bottomHeight;
	
	if(contentHeight > maxHeight){
		$section.find('.scroll-section').height(maxHeight);
		$toolbar.css('margin-right',10);
		$toolbar.find('.j_toolbarMain').width(280+15);
	}else{
		$toolbar.css('margin-right',0);
		$toolbar.find('.j_toolbarMain').width(280);
	}
};
