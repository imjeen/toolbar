var localUrl = encodeURIComponent(window.location.href);

function shortLoginFn_New() {

    var fastLoginHtml = "";
    fastLoginHtml += "<div class=\"fast_login_new\">";
    fastLoginHtml += "<div id=\"popupLoginMask\"></div>";
    fastLoginHtml += "<div class=\"popupLogin\" id=\"popupLogin\">";
    fastLoginHtml += "<span class=\"close\"></span>";
    fastLoginHtml += "</div>";
    fastLoginHtml += "</div>";
    $("body").append(fastLoginHtml);
    //弹窗定位
    var posLogin = function (eleId, popupId) {
        var bodyWidth = $("body").outerWidth(true),
            bodyHeight = $("body").outerHeight(true),
            winWidth = $(window).width(),
            winHeight = $(window).height(),
            scrollTop = $(document).scrollTop(),
            scrollLeft = $(document).scrollLeft(),
            eleWidth = 490,//$(eleId).outerWidth()
            eleHeight = 495,//$(eleId).outerHeight()
            popWidth, popHeight;
        popWidth = winWidth > bodyWidth ? winWidth : bodyWidth;
        popHeight = winHeight > bodyHeight ? winHeight : bodyHeight;
        $(popupId).css({"width": popWidth, "height": popHeight});
        $(eleId).stop().animate({
            "left": (winWidth > eleWidth ? (winWidth - eleWidth) / 2 + scrollLeft : scrollLeft + 15),
            "top": (winHeight > eleHeight ? (winHeight - eleHeight) / 2 + scrollTop : scrollTop + 15)
        });
    };

    posLogin("#popupLogin", "#popupLoginMask");
    $(window).resize(function () {
        posLogin("#popupLogin", "#popupLoginMask");
    });
    $(window).scroll(function () {
        posLogin("#popupLogin", "#popupLoginMask");
    });


    //隐藏快速登录框
    $(".fast_login_new .close").click(function () {
        $(".fast_login_new").hide();
        return false;
    });


}

//弹出快速登录框
function fast_login_new_show(url) {
    
    var iframeMsg = "<iframe width=\"490px\" height=\"495px\" frameborder=\"no\" border=\"0\" src= \"" + url + "&frame=true&service=" + localUrl + "\"></iframe>";
    if ($("#popupLogin").find("iframe").length > 0) {
        $("#popupLogin").find("iframe").remove();
    }
    $("#popupLogin").prepend(iframeMsg);
    $(".fast_login_new").show();
}

shortLoginFn_New();

module.exports = function(url){
    fast_login_new_show(url);
};