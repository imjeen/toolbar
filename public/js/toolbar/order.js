
// 单选项
function singleChange($input){
	// 保留两位小数
	var price = parseFloat($input.data('price')).toFixed(2);

	var $dl = $input.closest("dl");
	var $bar = $dl.closest('.j_orderBox').find('.j_orderCount');
	var $count = $bar.find('.order-count');
	var $total = $bar.find('.order-total');

	var _count = parseInt($count.text());
	// 保留两位小数
	var _total = parseFloat($total.text()).toFixed(2);

	var $allInput = $input.closest(".j_orderBox").find(".j_selectInput");

	if($input.prop('checked')){
		$("#orderButton").removeClass("disabled");
		// $input.prop('checked',true);
		$dl.addClass("dl-selected");
		$count.text(_count + 1);
		// 保留两位小数
		$total.text((parseFloat(_total) + parseFloat(price)).toFixed(2));

		// 全选
		if($allInput.length === $allInput.filter(":checked").length){
			$dl.closest(".j_orderBox").find('.j_allInput').prop('checked',true);
		}
		
	}else{
		// $input.prop('checked',false);
		$dl.removeClass("dl-selected");
		$count.text(_count - 1);
		// 保留两位小数
		$total.text((parseFloat(_total) - parseFloat(price)).toFixed(2));
		
		$dl.closest(".j_orderBox").find('.j_allInput').prop('checked',false);
		// 全取消
		if($allInput.length === $allInput.not(":checked").length){
			$("#orderButton").addClass("disabled");
		}
	}

}

// 多选项
function multipleChnage($input){

	var $itemInput = $input.closest('.j_orderBox').find('.j_selectInput');

	var $bar = $input.closest('.j_orderBox').find('.j_orderCount');
	var $count = $bar.find('.order-count');
	var $total = $bar.find('.order-total');
	var _count = $itemInput.length;
	// 保留两位小数
	var _total = 0.00;

	$input.closest('.j_orderBox').find('.j_selectInput').each(function(key,item){
		_total = (parseFloat($(item).data('price')) + parseFloat(_total)).toFixed(2);
	});

	if($input.prop('checked')){
		$itemInput.prop('checked',true).closest("dl").addClass("dl-selected");

		$count.text(_count);
		// 保留两位小数
		$total.text(parseFloat(_total).toFixed(2));

		$("#orderButton").removeClass("disabled");

	}else{
		$itemInput.prop('checked',false).closest("dl").removeClass("dl-selected");

		$count.text(0);
		// 保留两位小数
		$total.text(parseFloat(0.00).toFixed(2));

		$("#orderButton").addClass("disabled");
	}
		
}

// 订单按钮： 按照所选项拼接URL
function orderButton($btn){

	var $inputChecked = $btn.closest(".j_orderBox").find('.j_selectInput').filter(":checked");

	var url = "";

	if($inputChecked.length ==0 ){
		
		$btn.attr('href', 'javascript:void(0);');
	}else{
		var temp = [];
		$inputChecked.each(function(){
			temp.push('orderIds[]=' + $(this).data('order-number'));
		});
		url = temp.join('&');
		$btn.attr({
			'href':'/order/order_submit_suc?' + url
		});
		// $("body").trigger('click.toolbar');
	}
}


module.exports.mountSingleChange = function($root){
	$root.delegate(".j_orderBox .j_selectInput","change",function(e){
		singleChange($(this));
	});
};

module.exports.mountMultipleChange = function($root){
	$root.delegate(".j_orderBox .j_allInput","change",function(e){
		multipleChnage($(this));
	});
};

module.exports.mountOrderIt = function($root){
	$root.delegate("#orderButton",'click',function(){
		orderButton($(this));
		return true;
	});
};
