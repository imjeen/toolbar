
var path = require('path');

// model
var express = require('express');
var ejs = require('ejs');
// just for ejs@1.0.0 [see: TJ-ejs](https://github.com/tj/ejs)
ejs.open = '{{';
ejs.close = '}}';

// instance
var app  = express();
var port = process.env.PORT || 80;

// setting
app.set('views',process.cwd()+'/views');

// 使用ejs模板引擎 并将默认后缀.ejs更改为.html
app.engine('.html', ejs.__express);
app.set('view engine','html');

// router
require('./config/router.js')(app);

app.listen(port);

app.use(express.static(__dirname+'/public'));

console.log('app started on port ', port);
