jQuery(document).ready(function ($) {
var bdh = $("body").height();
var products = new Array($(".products").length);

$('.main-nav-list').sticky({
    topSpacing: 410,
    zIndex: 100,
    stopper: "footer",
    stickyClass: "main-nav-scrolled"
});
    //EXECUTES ONLY ONCE
function once(fn, context) {
	var result;
	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}
		return result;
	};
}

var links = $('.main-nav-list li');
var p = $('.products');
$(window).on('scroll', function() {
    $('.products').each(function(i, obj) {
        if($(window).scrollTop() >= $(this).offset().top - $(this).height()) {
             var id = $(this).attr('id');
            $('li').removeClass('hi-lited');
            $(links.eq(i)).addClass('hi-lited');
           }
        if ($(window).scrollTop()+$(window).height() <= $('.products').eq(1).offset().top) {
            $('li').removeClass('hi-lited');
        }

    });
});

});