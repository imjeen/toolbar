
function feedback(){
	var temp = [];
	temp.push('<div class="toolbar-popup no-close-toolbar">');
	temp.push('<div class="toolbar-popup-mask"></div>');
	temp.push('<div class="toolbar-popup-box feedback-popup"><div>');
	temp.push('<h2>反馈</h2>');
	temp.push('<textarea name="" maxlength="200" placeholder="我们非常重视您的建议，请在这里填写告诉我们"></textarea>');
	temp.push('<p class="popup-button-group"><a href="javascript:void(0);" class="cancel-button popup-button j_close">取&nbsp;消</a><a href="javascript:void(0);" class="submit-button popup-button j_submit">提&nbsp;交</a></p>');
	// temp.push('<span class="close j_close"></span>');
	temp.push('</div></div></div>');

	$('body').find('.toolbar-popup').remove();
	var $popupHTML = $(temp.join('')).appendTo('body');
	$popupHTML
		.find('.j_close').bind('click',function(){ $popupHTML.remove(); })
		.end().find('.j_submit').bind('click',function(){
			var val = $popupHTML.find('textarea').val();
			var $msgTip = $('<span class="msg-tip" style="color: red"></sapn');
			var $bottom = $(this).parent();
			$bottom.find('.msg-tip').remove();
			if(val.trim() == ''){
				$msgTip.text('内容不能为空');
				$bottom.prepend($msgTip);
				return;
			}
			
			if(val.length > 200){
				$msgTip.text('内容不能超过200字');
				$bottom.prepend($msgTip);
				return;
			}
			
			// submit and close
			$.ajax({
				url: '/feedback/submit',
				type: "GET",
				dataType: 'jsonp',
				data: {content: val},
				jsonp: 'callback'
			 })
			 .done(function(data){

			 	$popupHTML.find('.feedback-popup').children().hide().end().append('<i class="box-icon"></i><div style="display: table-cell; vertical-align: middle; height: 195px; padding-left: 120px; font-size: 20px;">谢谢您的反馈！</div>');

			 	setTimeout(function(){ $popupHTML.find('.j_close').trigger("click"); },2000);

			 })
			
		})
}

module.exports.popupFeedback = function($root){
	$root.delegate('.j_toolbarFeedback','click.feedback', function(e){
		feedback();
	});
};

	