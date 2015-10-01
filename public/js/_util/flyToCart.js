// 抛物线
var parabola = require('./_parabola.js');

module.exports = function($cur,$tar,option){

	// if($cur.length !== 1 ) return;

	 $tar = $tar && ($cur.length !== 0) ? $tar : $('#cartNumber');

	var curOffset = $cur.offset();
	var tarOffset = $tar.offset();

	var scrollTop = $(window).scrollTop();

	var curTop = curOffset.top - scrollTop -20;
	var curLeft = curOffset.left + $cur.width() / 2 - 20;

	var tarTop = tarOffset.top - scrollTop;
	var tarLeft = tarOffset.left;

	var $fly = $("<div id='flyCartTip' class='fly-cart' style='position: fixed; top:" + curTop + "px; left:" + curLeft + "px;'></div>").appendTo("body").show();

	var myParabola = parabola($fly.get(0), $tar.get(0), {
		speed: 400, //抛物线速度
		curvature: 0.0008, //控制抛物线弧度
		complete: function() {
			$fly.remove();
			$('#toolbarCart').trigger("mouseleave.toolbar");
		}
	});

	myParabola.position().move();

};