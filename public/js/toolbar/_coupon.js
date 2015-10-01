
// var _ = require('underscore');
var _  = require('../bower_components/underscore/underscore-min.js');

var JSONP = require('./_JSONP.js').getJSONP;

var popup = require('../_util/popup.js');
var failPopup = popup.failPopup;
var successPopup = popup.successPopup;

// 提示框
module.exports.popupTooltip = function(e){
	var $cur = $(e.target).closest("a");
	var $li = $cur.closest('li');
    var firstShopUrl = $cur.data("shop-firstshopurl");
	var isUniqueShop = $cur.data("shop-isuniqueshop");
	var platformRestrict = $cur.data("platformrestrict");
	var shopName  = $cur.data("shop-firstshopname");
	var subShopName = shopName;
	var hasItemLimit = $cur.data("hasitemlimit");
	if(shopName.length > 7){ subShopName = shopName.substring(0,7);}
	if(!isUniqueShop){
		subShopName = subShopName + "等"; 
	}

	var curOffset = $cur.offset();
	var liOffset = $li.offset();

	var tipTop = curOffset.top - liOffset.top;
	var tipLeft = curOffset.left - liOffset.left;

	var temp = [];
	temp.push('<div class="tooltip" role="tooltip"><div class="tooltip-inner">');
	temp.push('<p>限&nbsp;<a href="'+ firstShopUrl +'" target="_blank" title="' + shopName + '">'+ subShopName + '</a>&nbsp;使用</p>');
	if(hasItemLimit){
		temp.push('<p>限部分商品使用</p>');
	}
	//temp.push('<p>'+ platformRestrict +'</p>');
	temp.push('</div></div>');

	var tipHtml = temp.join('');

	$li.siblings("li").andSelf().find('.tooltip').remove();

	$li.append(tipHtml);

	$li.find('.tooltip').css({
		'top': tipTop,
		'left': tipLeft
	}).fadeIn(300).bind('mouseleave',function(e){ 
		// if($(e.toElement).closest('.j_activityTooltip, j_assetTooltip').length === 0 ){
			$(this).fadeOut(300).queue(function(){ $(this).remove();});
		// }
		 
	});
};

// 加载更多
module.exports.loadMore = function(e){

	var $tar = $(e.target);
	var $section = $(e.target).parent();
	var $box = $tar.closest('.j_activityBox, .j_assetBox');
	var oldHeight = 0;
	$box.find('ul').each(function(index,item){
		oldHeight = oldHeight + $(item).height() + 20;
	});

	var cur = $tar.data('current-page') || 1;
	var total = $tar.data('total-page') || 1;

	if(cur === total){
		$section.hide(); 
		return ; 
	}

	if($tar.hasClass("disabled")){ return;}

	var next = cur + 1;
	var urlPage = "";

	$tar.addClass("disabled").text('加载中...');

	if($box.hasClass("j_activityBox")){
		urlPage = "/coupon/list/" + next;
		var html = require('../../template/toolbar/_activityCoupon.html');
		var name = 'activityCoupon';

	}else{
		urlPage = "/coupon/user/list/" + next;
		var html = require('../../template/toolbar/_assetCoupon.html');
		var name = 'assetCoupon';

	}
	//
	$.ajax({
		url: urlPage, //'/activity',
		type: "GET",
		dataType: 'jsonp',
		jsonp: 'callback'
	 })
	.done(function(data){

		var compiled  = _.template(html);
		var objData = {};
		objData[name] = data;
		var templateHtml = compiled(objData);

		$tar.data('current-page',data.currentPage);
		$tar.data('total-page',data.totalPage);

		$tar.removeClass('disabled').text('查看更多');

		$section.before(templateHtml);
		self.scroll($box,null);
		var scrollTop = parseInt(oldHeight - $box.height()) + 48;
		$box.find('.scroll-section').scrollTop(scrollTop);
		
		if(data.totalPage === data.currentPage){
			$section.hide();
		}

	});

};

// 弹出优惠券popup相关信息
module.exports.getCoupon = function(e){
	var $li = $(e.target).closest('li');
	var $link = $(e.target).closest('a');
	var promotionId = $li.data('promotion-id');
	var url = '/coupon/obtain/'+ promotionId;

	if($link.hasClass("disabled")){ return; }

	var ajaxDone = function(data){
		
		// var content = '<h3>领取成功！</h3><p>已领取' + 2 + '次，您还可以领取<span class="highlight">' + 3 + '</span>次</p>'
		// successPopup(content);
		
		if(data.success){
			var content = '<h3>领取成功！</h3><p>已领取' + data.customerClaimTimes + '次，您还可以领取<span>' + data.customerSurplusClaimTimes + '</span>次</p>'
			successPopup(content);
			if(data.customerSurplusClaimTimes === 0 ){
				$link.addClass("disabled");
				$link.children('span').text('已领' + data.maxClaimNumber + '次');
			}

		}else{
			if(data.status ==='INVALID'){
				failPopup("抱歉，该券无法领取！");
				return;
			}
			if(data.status ==='NOTHING_CAN_CLAIM'){
				failPopup("抱歉，您晚了一步，券码已经被领光！");
				return;
			}
			failPopup("抱歉，该券无法领取！");					
		}
	 };

	JSONP({
		url: url,
		done: ajaxDone
	});
	
};

