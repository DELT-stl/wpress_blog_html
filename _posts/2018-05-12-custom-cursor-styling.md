---
ID: 1150
post_title: 'Custom Mouse Cursor with CSS &#038; GSAP Demo {May Download}'
author: Matt McKenna
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/custom-cursor-styling/
published: true
post_date: 2018-05-12 20:31:16
---
<div class="addedpad">
  [sdm_download_counter id="1168"] <a href="http://127.0.0.1:8080/wordpress/?smd_process_download=1&download_id=1168" class="dlb"><button class="dlbuddy">Download Files</button></a><a href="http://127.0.0.1:8080/wordpress/code/custom-cursors/index.html" class="dlb"><button class="dlbuddy">View demo</button></a>
</div> For May's free code tutorial and download (and our first ever), we have put together several variations displaying custom cursors. Built using HTML, CSS, and JS, this freebie utilizes the powerful "TweenMax" GSAP animation by Greensock. For those of you who are not members of Club Greensock, we also have one created without GSAP. 

## How to create a custom website cursor using CSS The first thing we need to do is hide the default / standard mouse that displays on a website. To do this we simply put: 

    
    *{
    	cursor: none;
    }
     Simple enough. Next we'll add some new classes to the HTML like so: 

    <textarea readonly="readonly" style="color: #03fc96; height: auto; background: transparent;">
    <div class='your-cursor'></div>
    </textarea>  It is usually best to put it towards the bottom of your page. Now we'll create some CSS to style our new custom cursor. 

    
    .your-cursor {
    	position: absolute;
    	background-color: deeppink;
    	width: 20px;
    	height: 20px;
    	transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform, 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
    	user-select: none;
    	pointer-events: none;
    	z-index: 10000;
            border-radius: 100%;
    }
     As you can see, here we created a 

**deeppink** circle that will be **20px ** X **20px**. We'll set the position to **absolute** and we want to make sure the z-index is at a high number to avoid it being hidden behind any other elements on your site. 
## Creating a custom cursor that can click links and buttons When I first started creating this tutorial, I was having some issues. I got the cursor styling down, but I couldn't get it show function as a cursor for things like clicking links or buttons - I eventually found the solution. You will need to set both the user-select and pointer-events to 

**none**. This then allowed the new cursor to function properly. 
## Creating a custom web site cursor using Jquery Now we need to add the javascript to get this bitch moving. 

`` 
<pre>$(document)
	.mousemove(function(e) {
	$('.your-cursor4')
		.eq(0)
		.css({
		left: e.pageX,
		top: e.pageY
	});
});
$(document).on("mousemove", function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

</pre> This will now display pink circle instead of a standard mouse on your website. Note: this particular example is built using only Jquery and no GSAP. In this live demo and download folder, we also created other variations using squares, trailing / double cursors, and a spotlight effect on hover that do use GSAP / TweenMax. It is a pretty straightforward approach. We have a list of additional custom cursor tutorials we plan to add in the future. Have a tutorial you'd like to see? Contact us and we'll be sure to add it to our list ! If you like it, please be sure to share it. 

#### Resources and thanks Pictures: 

[The Raid 2][1] GSAP: [Greensock][2] <div class="addedpad">
  [sdm_download_counter id="1168"] <a href="http://127.0.0.1:8080/wordpress/?smd_process_download=1&download_id=1168" class="dlb"><button class="dlbuddy">Download Files</button></a><a href="http://127.0.0.1:8080/wordpress/code/custom-cursors/index.html" class="dlb"><button class="dlbuddy">View demo</button></a>
</div>

 [1]: http://sonyclassics.com/theraid2/
 [2]: https://greensock.com/