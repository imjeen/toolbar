
var JSONP = require('./_JSONP.js').getJSONP;
var login = require('./_login.js');
var coupon = require('./_coupon.js');

var popupTooltip = coupon.popupTooltip;
var loadMore = coupon.loadMore;
var getCoupon = coupon.getCoupon;

function getCouponEntryImage($root){

	var $activityTab = $root.find('.j_toolbarActivity');

	var ajaxDone = function(data){

		var activityBgPath = data.imageBaseUrl + data.couponEntryImage;
		var $tip = $activityTab.siblings('.activity-tip').hide();
		var linkHTML = '<a href="' + data.advertiseLink + '" target="_blank" tjjj="rightBar.ad.link"><img src="' + (data.imageBaseUrl + data.advertiseImage) + '" alt=""></a>'

		if(data.isShow){
			if(data.isCoupon){
				$activityTab.removeClass('disabled-tab').siblings('.activity-bg').html('<img src="' + activityBgPath + '" />');
			}else{
				
				$tip.find('a').remove().end().append(linkHTML);

				$activityTab.addClass('disabled-tab').siblings('.activity-bg').html('<img src="' + activityBgPath + '" />');

				$activityTab.bind('mouseenter',function(e){ 
								$activityTab.not('.hover') && $tip.fadeIn(function(){ $activityTab.addClass("hover"); });
							})
							.bind('mouseleave',function(e){
								var isTab = $(e.target).is($activityTab);
								var isTip =  $(e.relatedTarget).closest($tip).length === 1;
								if( !isTab || !isTip ){ 
									$tip.fadeOut(function(){  $activityTab.removeClass("hover"); });
								}
							});
				$tip.bind('mouseleave',function(e){
					$(e.relatedTarget).closest($activityTab).length === 0 && $tip.fadeOut(function(){$activityTab.removeClass("hover");});
				});
				$tip.find('.close').click(function(){ $activityTab.trigger("mouseleave"); })
				$tip.find('a').click(function(){ $activityTab.trigger("mouseleave"); })
			}
		}else{
			$activityTab.addClass('disabled-tab');
		}
	};

	JSONP({
		url: '/activity/configTab',
		done: ajaxDone
	});
		
}


module.exports = {
	init: function($root){
		getCouponEntryImage($root);
	},
	mountPopupTooltip: function($root){
		// open activity tip 
		$root.delegate('.j_activityBox .j_activityTooltip', 'mouseenter', function(e){ 
	        popupTooltip(e);
		});
		// close  activity tip
		$root.delegate('.j_activityBox .j_activityTooltip', 'mouseleave', function(e){ 
			var $cur = $(e.target).closest("a");
			var $li = $cur.closest('li');
			if($(e.relatedTarget).closest('.tooltip').length === 0){
				$li.find('.tooltip').fadeOut(300).queue(function(){ $(this).remove(); });
			}
			
		});
	},

	moreCoupon: function($root){
		$root.delegate('.j_activityBox .j_couponMore', 'click', function(e){ 
			loadMore(e);
		});
	},

	mountGetCoupon: function($root){
		$root.delegate(".j_activityBox .j_couponObtain",'click',function(e){
			login(function(){
				getCoupon(e);
			});
		});
	}

};
