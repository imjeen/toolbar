
// var _ = require('underscore');
var _  = require('../bower_components/underscore/underscore-min.js');

var JSONP = require('./_JSONP.js').getJSONP;
var scroll = require('./_scroll.js');
var config = require('./_config.js');
var login = require('./_login.js');

var flyToCart = require('../_util/flyToCart.js');
var failPopup = require('../_util/popup.js').failPopup

function favoriteTab(e,$favoriteTab){

	var $tab = $(e.target).closest(".tab-title");

	if($tab.hasClass("active")){ return ;}

	var name = $tab.data('name');
	var selector = '.j_' + name + 'Box';

	var obj = name === 'favoriteShop' ?  config.favoriteShop : config.favoriteProduct;

	var url = obj.url;
	var name = obj.name;
	var html = obj.html;

	$tab.addClass("active").siblings().removeClass("active");

	var $box = $tab.closest('.j_favoriteBox').find('.inner-box').filter(selector);
	var $mask;
	var ajaxBefore = function(){
		$tab.closest('.j_favoriteBox').show().find('.inner-box').hide().filter(selector).show();
		$box.children().hide();
		if($box.find(".toolbar-mask").length){
			$box.find(".toolbar-mask").show();
		}else{
			$mask = $('<div class="toolbar-mask"><span class="mask-tip">正在努力加载...</span></div>').appendTo($box);
		}

	}; 

	var ajaxDone = function(data){
		// 异步得到的几个TAB数据，只有在当前激活的TAB被渲染显示
		if($favoriteTab.hasClass("tab-selected") && $tab.hasClass("active")){
			var compiled  = _.template(html);
			var objData = {};
			objData[name] = data;
			var templateHtml = compiled(objData);
			$tab.closest('.j_favoriteBox').show().find('.inner-box').hide().filter(selector).html(templateHtml).show();
		}
	};

	var ajaxAlways = function(){
		scroll($('.j_jiaToolbar'));
		$mask && $mask.remove();
	};

	JSONP({
		url: url,
		before: ajaxBefore,
		done: ajaxDone,
		always:ajaxAlways
	});
}

//delete favorite shop
function deleteShop(e){

	login(function(){
		 var $li = $(e.target).closest('li');
		 var $tab = $li.closest('.favorite-section').find('.tab-title');
		 var id = $li.data('shop-id');
		 var url = '/favourite/shop/delete/'+ id;

		 var ajaxDone = function(){
			$li.remove();
			$tab.filter(".active").removeClass("active").trigger('click');
		 };
	
		JSONP({
			url: url,
			done: ajaxDone
		});

	});
	
}

// delete favorite product
function deleteProduct(e){

	login(function(){
		 var $li = $(e.target).closest('li');
		 var $tab = $li.closest('.favorite-section').find('.tab-title');
		 var id = $li.data('item-id');
		 var url = '/favourite/item/delete/'+ id;

		 var ajaxDone = function(){
			
			$li.remove();
			$tab.filter(".active").removeClass("active").trigger('click');
		
		 };

		JSONP({
			url: url,
			done: ajaxDone
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
	var favoriteAddToCart = function(maxCountPerPerson){
		$.ajax({
			url: '/shoppingCart/addMyCart',
			type: "GET",
			dataType: 'jsonp',
			data: {"itemId": itemID, "shopId": shopID, "price": price, "inventory" : inventory, "maxCountPerPerson" : maxCountPerPerson, "buyNum": 1},
			jsonp: 'callback'
		 })
		 .done(function(data){
			// console.log(1);
			// var num = parseInt($('#cartNumber').text());
			// $('#cartNumber').text(++num);
			// $li.remove();
			
			// failPopup('购物车内商品已到上限');

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

		 })
		 .fail(function(){ failPopup('添加失败，请重试'); });

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
				favoriteAddToCart(maxpurchasecount);
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
				favoriteAddToCart(maxCountPerPerson)
			}else{
				favoriteAddToCart(0)
			}
		}else{
			favoriteAddToCart(0);
		}

   });
	
}



module.exports = {
	mountTab: function($root){
		$root.delegate('.favorite-section .tab-title','click',function(e){
			var $favoriteTab = $root.find('.j_toolbarFavorite');
			favoriteTab(e,$favoriteTab);
		});
	},
	mountDeleteShop: function($root){
		$root.delegate(".j_favoriteBox .j_deleteFavoriteShop",'click',function(e){
			deleteShop(e);
		});
	},
	mountDeleteProduct: function($root){
		$root.delegate(".j_favoriteBox .j_deleteFavoriteItem",'click',function(e){
			deleteProduct(e);
		});
	},
	mountAddToCart: function($root){
		$root.delegate(".j_favoriteBox .j_addToCart",'click',function(e){
			e.preventDefault();
			var $cur = $(this);
			addTocart(e,$cur);
		});
	}
};
