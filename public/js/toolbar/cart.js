
var JSONP = require('./_JSONP.js').getJSONP;

var config = require('./_config.js');
var render = require('./_render.js');

// delete cart item
function deleteCartItem(e){
	var $dd = $(e.target).closest('dd');
	var id = $dd.data('item-id') + "_NORMAL";
	var url = '/shoppingCart/delete/'+ id;

	var ajaxDone = function(){

		var $dl = $dd.parent('dl');
		var isLast = $dl.siblings('dl').length === 0;

		if($dl.children("dd").length === 1){
			$dl.remove();

			if(isLast){
				// empty
				var obj = config.cart();
				render(obj.html, obj.name, null);
			}
			
		}else{
			$dd.remove();
		}

		// toolbar cart number
		$('.j_asideToolbar').find('.j_toolbarCart').trigger("mouseleave.toolbar");
		// page cart number
		$('#header').find('.cartTxt').trigger("mouseleave");
	
	};
	
	JSONP({
		url: url,
		done: ajaxDone
	});

}

// for cart number
function setCartNumber(){

	$.ajax({
		url: '/shoppingCart/getCartCount',
		type: "GET",
		dataType: 'jsonp',
		jsonp: 'callback'
	 })
	 .done(function(data){
	 	$("#cartNumber").text(data.count)
	 })
	 // .fail(function(){ });
}


module.exports.mountDelete = function($root){
	$root.delegate(".j_cartBox .j_deleteCartItem",'click',function(e){
		deleteCartItem(e);
	});
};

module.exports.setNumber = function(){
	setCartNumber();
};
