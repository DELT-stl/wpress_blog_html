---
ID: 1105
post_title: '[How To] Use LazyLoad To Increase WordPress Page Speed'
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/wordpress-lazyload/
published: true
post_date: 2018-05-11 13:17:05
---
<h3>This post is part of a series on reducing your Wordpress websites loading time. To see more, refer to the links below.</h3>
<ol>
 	<li><a href="http://127.0.0.1:8080/wordpress/how-to-deregister-javascript-files-to-increase-page-loading-speed/">Deregistering plugin scripts where they're not being used</a></li>
 	<li><a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">Creating responsive images based on screen dimensions</a></li>
 	<li><a href="http://127.0.0.1:8080/wordpress/how-to-use-lazyload-to-increase-page-speed/">Using Lazy Load to get images based on view port position</a></li>
 	<li><a href="http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/">Using AJAX to dynamically serve content using a 'Load More' button</a></li>
</ol>
This is a part of a series of tutorials on decreasing page load time in Wordpress, if you haven't already, I recommend you check out my previous post on creating images with srcset attributes <a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">here</a>.

There are several implementations of Lazy Load that one can use but the one we're going to be talking about is a <a href="https://wordpress.org/plugins/rocket-lazy-load/">stand-alone plugin made by WP Rocket</a> made for the sole purpose of lazy loading things like iframes, images and videos.

In most cases, I'm not keen on using plugins to get things done but this is an exception due to the fact that this one is fairly light-weight (Less than 10 kb) and doesn't even need jQuery.

Lazy Load functions by allowing the page to load before all of the images have been retrieved.

This decreases bounce rate in that the objects within the users immediate view port will be loaded, followed by the objects further down when the users begins scrolling.

This is good because if a page has to be loaded in its entirety before anything is shown to the user, it can become tedious and the user might become impatient.

So without further ado, here's how we'll implement Lazy Load on our <a href="http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/">Wordpress</a> Site:

First, download the plugin <a href="https://wordpress.org/plugins/rocket-lazy-load/">here</a>, after you've downloaded and activated the plugin go to Settings &gt; LazyLoad &gt; Check the box that says 'Images' &gt; Save.

Next, go to the srcset_post_thumbnail(); function we made earlier and after the if else statements, replace
<pre><code>$html .= 'srcset="';</code></pre>
with
<pre><code>$html .= 'data-lazy-srcset="';</code></pre>
This is the attribute that lazy load will look for to act upon.

The src attribute in this case is little more than a place holder but because any animation affects we use between src and data-lazy-src will not function correctly, we're not going to be using it for more than ensuring that content doesn't jump after the image is loaded.

What I mean by this is that we're going to set the src attribute to a transparent image, about 3kb in size that will give way to the background image that we'll be using as the actual placeholder.

Download <a href="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/05/placeholder.png">this</a> image. It's a transparent 1200 x 800 png file that will ensure that anything under your image doesn't jump downwards after the object has been loaded. After downloading the image, upload it to your media library and paste its url into the src value, ie:
<pre><code>$html .= 'src="'.$thumbMedium[0].'" alt="' . $alt . '" class="'.$classes.'"&gt;&lt;/div&gt;';</code></pre>
Will become
<pre><code>$html .= 'src="path/to/placeholder.png" alt="' . $alt . '" class="'.$classes.'"&gt;&lt;/div&gt;';</code></pre>
Next we'll set the the <strong>actual</strong> place holder image for which I highly recommend using an svg. They're a lightweight format and can be loaded very quickly so they won't hinder page speed. Go to the srcset_post_thumbnail() function we created earlier and take note of the div with class 'ph'. We'll set the background image of this div to the svg so it's not just a blank space that the user sees while the image is loading. In your css file, paste this:
<pre><code> .ph {
	height:100%;
	background-image: url('domain-name/wp-content/themes/yourtheme/img/filename.svg');
	background-repeat: no-repeat;
	background-position: center center;
	background-color:black;
	border-radius: 6px
}
</code></pre>
Wordpress has restrictions on whether or not svg's can be uploaded due to security vulnerabilities, they can be circumvented but it's not necessary to actually upload the svg to your media library, you can simply paste it in a folder as shown above. Now, we're going to add a fade in effect to the image once it's loaded. Go to your css file and paste this:
<pre><code>img[src] {
   opacity: 0;
}
img.lazyloaded {
   -webkit-transition: opacity .2s linear 0.2s;
   -moz-transition: opacity .2s linear 0.2s;
   transition: opacity .2s linear 0.2s;
   opacity: 1;
}
</code></pre>
Finally, you can specify the distance from the viewport that you'd like images to be loaded from by going to your functions file and adding this:
<pre><code>function rocket_lazyload_custom_threshold( $threshold ) {
	return 1500;
}
add_filter( 'rocket_lazyload_threshold', 'rocket_lazyload_custom_threshold' );</code></pre>
Where 1500 is a number in pixels of how far away the image should be before being loaded.

<a href="http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/">Next, we're going to see how to implement AJAX in your Wordpress site with a 'Load More' button</a>