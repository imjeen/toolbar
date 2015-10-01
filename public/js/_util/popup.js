
var temp = [];

temp.push('<div class="toolbar-popup no-close-toolbar">');
temp.push('<div class="toolbar-popup-mask"></div>');
temp.push('<div class="toolbar-popup-box">');
temp.push('<div class="box-content"></div>');
temp.push('<i class="box-icon"></i>');
temp.push('<span class="close j_close"></span>');
temp.push('</div>');
temp.push('</div>');

var html = temp.join('');

function statusPopup(className,content){
	var content = content || '';
	$('body').find('.toolbar-popup').remove();
	var $popupHTML =$(html).addClass(className)
							.find('.box-content').addClass("midlle-content").append(content)
							.end().appendTo('body');
	$popupHTML.find('.j_close').bind('click',function(){ $popupHTML.remove(); });

	return $popupHTML;
}

module.exports = {
	failPopup: function($content){
		return statusPopup('toolbar-popup-fail',$content);
	},
	successPopup: function($content){
		return statusPopup('toolbar-popup-success',$content);
	},
	warnPopup: function($content){
		return statusPopup('toolbar-popup-warn',$content);
	}
};
