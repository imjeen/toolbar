
var fs = require('fs');

var count = 0;
module.exports = function(app){

	// pre handle
	app.use(function (req, res, next) {
	  console.log('Time: %d', Date.now());
	   console.log('Count: %d', count++);
	  next();
	});

	// test
	app.get('/test',function(req,res,next){
		res.jsonp({"success": true});
		next();
	});

	// index
	app.get('/',function(req,res,next){
		res.render('index',{'title':'home page'});
		next();
	});

	// login
	app.get('/login',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/login.json'));
		res.jsonp(obj);
		next();
	});

	// activity
	app.get('/activity',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/activity.json'));
		res.jsonp(obj);
		next();
	});

	// activity TAB cofiguired
	app.get('/activity/configTab',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/configuredActivityTab.json'));
		res.jsonp(obj);
		next();
	});

	// favorite product
	app.get('/favoriteProduct',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/favoriteProduct.json'));
		res.jsonp(obj);
		next();
	});

	// favorite shop
	app.get('/favoriteShop',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/favoriteShop.json'));
		res.jsonp(obj);
		next();
	});

	// asset
	app.get('/asset',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/asset.json'));
		res.jsonp(obj);
		next();
	});
	// tracking
	app.get('/record',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/record.json'));
		res.jsonp(obj);
		next();
	});

	// order
	app.get('/order',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/order.json'));
		res.jsonp(obj);
		next();
	});

	// cart
	app.get('/cart',function(req,res,next){
		var obj = JSON.parse(fs.readFileSync('./config/data/cart.json'));
		res.jsonp(obj);
		next();
	});

};
