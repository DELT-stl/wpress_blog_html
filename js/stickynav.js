var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (is_chrome) {
//var bdh = $("body").height();
//var products = new Array($(".products").length);
//var spacing = $('.main-nav-list').offset().top * -1;
//$('.main-nav-list').sticky({
//    topSpacing: 710,
//    zIndex: 100,
//    stopper: "#footer",
//    stickyClass: "main-nav-scrolled"
//});
var e = 0;
var l = $("#ux_prototyping").offset().top;
var y = $('.mainNavList').offset().top - $(window).scrollTop();
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 600 && e == 0) {
        $('.mainNavList').css({ "top" : y});
        $('.mainNavList').css({ "position" : "fixed"});
        e = 1;
    }
    else if ($(window).scrollTop() < 600 && e == 1) {
        $('.mainNavList').css({ "position" : "relative"});
        e = 0;
    }
    else {}
})    


//$('.mainNavList').css({ "position" : "fixed"});
    
}
else {
    //EXECUTES ONLY ONCE
//function once(fn, context) { 
//	var result;
//	return function() { 
//		if(fn) {
//			result = fn.apply(context || this, arguments);
//			fn = null;
//		}
//		return result;
//	};
//}


stickyNav();
//$(window).on('resize', stickyNav("something"));
window.onresize = function() {
    stickyNav("something");
}
var l = "nothing";
function stickyNav(l) {
var mainNav = $('footer').offset().top * -1 + 500 + $('.main-nav-list').height() + $('.main-nav-list').offset().top;
var navList = mainNav * -1 + 500;
$('#main-nav').css({ 'margin-top' : mainNav });
$('.main-nav-list').css({ 'margin-top' : navList });
    console.log(l);
};
var links = $('.main-nav-list li');
$(window).on('scroll', function() {
    $('.products').each(function(i, obj) {
        if($(window).scrollTop() + $(window).innerHeight() >= $(this).offset().top + $(this).height()) {
             var id = $(this).attr('id');
            $('li').removeClass('hi-lited');
            $(links.eq(i)).addClass('hi-lited');
           }
        if ($(window).scrollTop() + $(window).innerHeight() <= $('.products_content').offset().top ) {
            $('li').removeClass('hi-lited');
}
    });
});
}