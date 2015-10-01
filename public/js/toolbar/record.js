
// var _ = require('underscore');
var _  = require('../bower_components/underscore/underscore-min.js');

var flyToCart = require('../_util/flyToCart.js');
var popup = require('../_util/popup.js');

var failPopup = popup.failPopup;
var successPopup = popup.successPopup;
var warnPopup = popup.warnPopup;

var JSONP = require('./_JSONP.js').getJSONP;
var scroll = require('./_scroll.js');
var config = require('./_config.js');
var login = require('./_login.js');
var render = require('./_render.js');

var warnContent = '<p>是否确认删除？</p><p class="warn-btn-group"><a href="javascript:void(0);" class="certain-btn">确&nbsp;定</a><a href="javascript:void(0);" class="cancel-btn j_close">取&nbsp;消</a></p>';

// clean
function cleanItem(){
	
	login(function(){

		 var url = '/record/clear';
		 var ajaxDone = function(){
		 	var obj = config.record;
			render(obj.html, obj.name, null);
		 };

		warnPopup(warnContent).delegate('.certain-btn','click',function(){
	 		var $close = $(this).siblings(".j_close");
	 		// clear
			JSONP({
				url: url,
				done: function(){
					$close.trigger("click");
					ajaxDone();
				}
			});
	 	});

	});
}

//  add to cart
function addTocart(e,$cur){
	
	var $tar = $('#cartNumber');
	var $li = $(e.target).closest('li');

	var itemID = $li.data('item-id');
	var shopID = $li.data('shop-id');
	var price = $li.data('item-price');
	var inventory = $li.data('item-inventory');
	var promotionId = $li.data('item-promotionid');
	var maxpurchasecount = $li.data('item-maxpurchasecount');


	// 添加到购物车
	var addToCart = function(maxCountPerPerson){
		$.ajax({
			url: '/shoppingCart/addMyCart',
			type: "GET",
			dataType: 'jsonp',
			data: {"itemId": itemID, "shopId": shopID, "price": price, "inventory" : inventory, "maxCountPerPerson" : maxCountPerPerson, "buyNum": 1},
			jsonp: 'callback'
		 })
		 .done(function(data){
		 	
			if(data.type === -1){
				failPopup('购物车内商品已到上限');
				return;
			}
            if(data.type === -2){
				failPopup('购物车里该商品超过库存总量');
				return;
			}
			if(data.type === -3){
				failPopup('您不能购买自己店铺的商品');
				return;
			}
			if(data.type === -4){
				failPopup('添加失败，请重试');
				return;
			}
			if(data.type === -5){
				
				failPopup('此商品每位用户限购' + maxCountPerPerson + '件，您的购物车中已经有' + data.limitedItemInCartCount + '件此商品了');
				return;
			}
			
			// 抛物线
			flyToCart($cur,$tar);

			$('#header').find('.cartTxt').trigger("mouseleave");

		 });

	};
	
	//秒杀 IP 和 每天限购数量 判断
	var checkByIpAndUser = function(){
		//  秒杀 IP 和 每天限购数量 判断
		$.ajax({ 
			url: '/shoppingCart/checkByIpAndUser', 
			type: "GET", 
			dataType: 'jsonp', 
			data:{"itemId": itemID, "promotionId": promotionId,"maxPerPurchase":maxpurchasecount}, 
			jsonp: 'callback' 
		}) 
		.done(function(data){ 
			if(data.statusCode === "200" ){
				addToCart(maxpurchasecount);
			}else{
				failPopup(data.msg);
			}
		
		})
		.fail(function(){ failPopup('添加失败，请重试'); });
	};

	login(function(){ // 登录成功后

		var isSeckilling = $li.data('item-isseckilling');
		var isSpecialShop = $li.data('item-isspecialshop');
		var promotionInventory = $li.data('item-promotioninventory');
		if(isSeckilling === true){
			if(isSpecialShop || promotionInventory > 0){
				checkByIpAndUser();
			}
			else if(maxCountPerPerson > 0 && isSpecialShop && 1 > maxCountPerPerson){
				failPopup('此商品每位用户限购' + maxCountPerPerson + '件');
			}
			else if(promotionInventory > 0 || isSpecialShop){
				addToCart(maxCountPerPerson)
			}else{
				addToCart(0)
			}
		}else{
			addToCart(0);
		}

   });
	
}

function needLogin(needLoginCallback){
	var needLogin = Boolean($("#needLogin").val());
	if (needLogin) {
		login(needLoginCallback);
	} else {
		needLoginCallback.apply(needLoginCallback,arguments);
	}
}


module.exports = {
	mountCleanRecord: function($root){
		$root.delegate(".j_recordBox .j_recordClean",'click',function(){
			needLogin(function(){ cleanItem(); });
		});
	},
	mountAddToCart: function($root){
		$root.delegate(".j_recordBox .j_addToCart",'click',function(e){
			e.preventDefault();
			var $cur = $(this);
			addTocart(e,$cur);
		});
	}
};
