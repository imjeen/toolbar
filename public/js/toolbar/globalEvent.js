
var slideHide = require('./_slider.js').slideHide;

module.exports = {
	mountBodyClick: function(){

		var $toolbar = $('.j_asideToolbar');

		$(document).delegate("body",'click.toolbar',function(e){
			// var isToolbar = $(e.target).closest(self.element).length === 0 ;
			var isClose = $(e.target).closest('.no-close-toolbar').length === 0;
			if(isClose){
				$toolbar.find(".toolbar-tab-item").removeClass("tab-selected tab-hover");
				slideHide();
			}
		});

	},
	mountBackTop: function(){
		var $toolbar = $('.j_asideToolbar');
		// backtop
		$toolbar.delegate('.j_backtop','click',function(){
			// (window.opera)?(document.compatMode == "CSS1Compat"?jQuery('html'):jQuery('body')):jQuery('html,body'); 
			$('html,body').animate({scrollTop:0},200);
		});
	},
	mountWinResize: function(){

		var $toolbar = $('.j_asideToolbar');

		$(window).bind('resize.toolbar',function(){
			var winHeight = $(window).height();
			var $item = $toolbar.find('.activity-item');
			// console.log(winHeight);
			if(winHeight < 692){
				$item.css({'margin-top': '20px'});
				// $item.animate({'margin-top': '30px'},400);
			}else{
				$item.css({'margin-top': '100px'});
				// $item.animate({'margin-top': '100px'},400);
			}
		});

	}
};
