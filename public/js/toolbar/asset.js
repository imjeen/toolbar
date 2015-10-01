
var JSONP = require('./_JSONP.js').getJSONP;
var coupon = require('./_coupon.js');

var popupTooltip = coupon.popupTooltip;
var loadMore = coupon.loadMore;

module.exports = {
	mountPopupTooltip: function($root){
		// open activity tip 
		$root.delegate('.j_assetBox .j_assetTooltip', 'mouseenter', function(e){ 
	        popupTooltip(e);
		});
		// close  activity tip
		$root.delegate('.j_assetBox .j_assetTooltip', 'mouseleave', function(e){ 
			var $cur = $(e.target).closest("a");
			var $li = $cur.closest('li');
			if($(e.relatedTarget).closest('.tooltip').length === 0){
				$li.find('.tooltip').fadeOut(300).queue(function(){ $(this).remove(); });
			}
			
		});
	},

	moreCoupon: function($root){
		$root.delegate('.j_assetBox .j_couponMore', 'click', function(e){ 
			loadMore(e);
		});
	}

};