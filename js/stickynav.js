var bdh = $("body").height();
var products = new Array($(".products").length);

$('.main-nav-list').sticky({
    topSpacing: 410,
    zIndex: 100,
    stopper: "#footer",
    stickyClass: ".main-nav-scrolled"
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
$(window).on('scroll', function() {
    $('.products').each(function(i, obj) {
        if($(window).scrollTop() >= $(this).offset().top) {
             var id = $(this).attr('id');
            $('li').removeClass('hi-lited');
            $(links.eq(i)).addClass('hi-lited');
           }
    });
});