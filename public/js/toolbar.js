'use strict';

var toolbarHtmlString = require('../template/toolbar/toolbar.html');

var activity = require('./toolbar/activity.js');
var cart = require('./toolbar/cart.js');
var order = require('./toolbar/order.js');
var asset = require('./toolbar/asset.js');
var favorite = require('./toolbar/favorite.js');
var record = require('./toolbar/record.js');
var feedback = require('./toolbar/feedback.js');

var tab = require('./toolbar/tab.js');

var globalEvent = require('./toolbar/globalEvent.js');

// 抛物线  GLOBAL varilbe
window.parabola =  require('./_util/flyToCart.js');

// jQuery 1.6.2
$(function(){

	$('body').append(toolbarHtmlString);

	var $toolbar = $('.j_asideToolbar');

	// ==========================
	// change among the TAB items
	// 选项卡

	// hover event 
	tab.mountHover($toolbar);
	// click(tab) event
	tab.mountTab($toolbar);
	tab.initByTrigger($toolbar);
	
	// ==========================
	// EVENT: CONTENT of TAB
	// 选项卡的内容块

	// activity
	activity.init($toolbar);
	activity.mountPopupTooltip($toolbar);
	activity.moreCoupon($toolbar);
	activity.mountGetCoupon($toolbar);
	
	// cart
	cart.mountDelete($toolbar);
	cart.setNumber();

	// order
	order.mountSingleChange($toolbar);
	order.mountMultipleChange($toolbar);
	order.mountOrderIt($toolbar);

	// favorite
	favorite.mountTab($toolbar);
	favorite.mountDeleteShop($toolbar);
	favorite.mountDeleteProduct($toolbar);
	favorite.mountAddToCart($toolbar);

	// asset
	asset.mountPopupTooltip($toolbar);
	asset.moreCoupon($toolbar);
	
	// record
	record.mountCleanRecord($toolbar);
	record.mountAddToCart($toolbar);

	// feedback
	feedback.popupFeedback($toolbar);

	// ===========================
	// 窗口和文档上挂载的事件
	globalEvent.mountBodyClick();
	globalEvent.mountBackTop();
	globalEvent.mountWinResize();

});
