
var activityHtmlString = require('../../template/toolbar/_activity.html');
var orderHtmlString = require('../../template/toolbar/_order.html');
var cartHtmlString = require('../../template/toolbar/_cart.html');
var assetHtmlString = require('../../template/toolbar/_asset.html');
var recordHtmlString = require('../../template/toolbar/_record.html');
var favoriteShopHtmltring = require('../../template/toolbar/_favoriteShop.html');
var favoriteProductHtmString = require('../../template/toolbar/_favoriteProduct.html');

module.exports = {
	activity: {
		url: '/activity',
        name: "activity",
		html: activityHtmlString
	},
	cart: {
		url: '/cart',
		name: 'cart',
		html: cartHtmlString
	},
	order: {
		url: '/order',
		name: 'order',
		html: orderHtmlString
	},
	asset: {
		url: '/asset',
		name: 'asset',
		html: assetHtmlString
	},
	record:{
	 	url: '/record',
	 	name: 'record',
	 	html: recordHtmlString
	},
	favoriteShop:{
		url: '/favoriteShop',
		name: 'favoriteShop',
		html: favoriteShopHtmltring
	},
	favoriteProduct: {
		url: '/favoriteProduct',
		name: 'favoriteProduct',
		html: favoriteProductHtmString
	}
};
