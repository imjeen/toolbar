
var config = require('./_config.js');
var login = require('./_login.js');
var sliderTab = require('./_slider.js').sliderTab;
var setCartNumber = require('./cart.js').setNumber;

module.exports = {
	initByTrigger: function($root){
		// 相关的事件必须在此之前绑定
		// init cart
		$root.find('.j_toolbarCart').trigger("mouseleave.toolbar");
	},
	mountHover: function($root){
		// enter
		$root.delegate('.j_tabHover','mouseenter.toolbar',function(){
			var $this = $(this); 
			$this.addClass("tab-hover");
			if(!$this.hasClass("tab-selected")){
				$this.find('.toolbar-tab-tip').show().stop().animate({left: -90},300,function(){ }); 
			}
			
		});
		// leave
		$root.delegate('.j_tabHover','mouseleave.toolbar',function(){ 
			$(this).removeClass("tab-hover").find('.toolbar-tab-tip').stop().animate({left: 0},200,function(){
				$(this).hide();
			});
		});

		// cart TAB hover event
		$root.delegate('.j_toolbarCart','mouseenter.toolbar',function(){
			$(this).addClass("tab-hover");
			setCartNumber();

		});

		$root.delegate('.j_toolbarCart','mouseleave.toolbar',function(){ 
			$(this).removeClass("tab-hover").find('.toolbar-tab-tip');
			setCartNumber();
		});


	},
	mountTab: function($root){

		// activity
		$root.delegate('.j_toolbarActivity', 'click.activity', function(e){
			if($(this).hasClass('disabled-tab')) return; 
			sliderTab(e,config.activity);
		});

		// cart
		$root.delegate('.j_toolbarCart', 'click.cart', function(e){ 
			sliderTab(e,config.cart);
		});

		// order
		$root.delegate('.j_toolbarOrder', 'click.order', function(e){
			login(function(){
				sliderTab(e,config.order);
			});
		});

		// asset
		$root.delegate('.j_toolbarAsset', 'click.asset', function(e){ 
			login(function(){
				sliderTab(e,config.asset);
			});
		});

		// record
		$root.delegate('.j_toolbarRecord', 'click.record', function(e){ 
			sliderTab(e,config.record); 
		});

		// favorite
		$root.delegate('.j_toolbarFavorite','click.favorite', function(e){ 
			login(function(){
				sliderTab(e,null,function(){
					// trigger first favorite (product) TAB
					$root.find('.j_favoriteBox').siblings('.toolbar-box').hide();
					$root.find('.favorite-section .tab-title').removeClass('active').first().trigger('click');
				});
			});
		});
		

	}
}
