---
ID: 534
post_title: '[How To] Use AJAX To Dynamically Serve Content and Decrease Load Time'
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/
published: true
post_date: 2018-05-08 12:52:59
---
<h3>This post is part of a series on reducing your Wordpress websites loading time. To see more, refer to the links below.</h3>
<ol>
 	<li><a href="http://127.0.0.1:8080/wordpress/how-to-deregister-javascript-files-to-increase-page-loading-speed/">Deregistering plugin scripts where they're not being used</a></li>
 	<li> <a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">Creating responsive images based on screen dimensions</a></li>
        <li><a href="http://127.0.0.1:8080/wordpress/how-to-use-lazyload-to-increase-page-speed/">Using Lazy Load to get images based on view port position</a></li>
<li><a href="http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/">Using AJAX to dynamically serve content using a 'Load More' button</a></li>

</ol>
<strong>AJAX</strong> stands for <strong>A</strong>synchronous <strong>J</strong>avascript <strong>a</strong>nd <strong>X</strong>ML. In short, AJAX is a way for the browser to submit additional requests to the server for content after the page has loaded. So with that out of the way, let's get started!

What we're going to make is a Load More button for loading more posts. The transfer of data will be in the following order:
<strong>View &gt; Logic &gt; Model &gt; Back to view</strong>
<h2>1. View</h2>
First, you'll want to go go into the template file that you want the posts to appear and place the following code:
<pre><code>
&lt;div id="more_posts" data-type="freebies" data-category="&lt;?php echo esc_attr($cat_id); ?&gt;"&gt;&lt;?php esc_html_e('Load More', 'creativesfeed') ?&gt;&lt;/div&gt;</code></pre>
What this will do is create a Load More button at the bottom of the page that the user can click in order to request additional posts from the server.

This will reduce the amount of strain on your server as opposed to loading possibly several hundred posts at once. Looking at this, take note that the variables here will be passed to the PHP function so you'll want to set them to the types/categories of posts that you want the page to show.

Furthermore, ensure that the data value of the button on the page itself has the correct values because they'll be passed to this JS function.

Note that the data-* attribute isn't a predefined attribute, it's something you can follow with anything you'd like and then load that data later on in jQuery like we'll be doing. In this case, we'll be using 'data-type' to specify the post-type and data-category to specify the category.

'echo esc attr($cat_id) will be used to create posts that are the same category as the page itself so use
<pre><code> $cat_id = $category[0] -&gt; cat_ID;</code></pre>
To attain the category in ID format. Now let's add the container in which posts will appear, to do that, go to the same template file you added the above code and paste this:
<pre><code>&lt;main id="main" class="site-main ajax_posts" role="main"&gt;&lt;/main&gt;</code></pre>
The php function will find this element place the newly loaded posts within it. Now that we've created the view, it's time to move on to the Jquery where we'll add an event to this button along with initial posts to appear in the 'main' element upon the page loading.
<h2>2. Logic</h2>
<pre><code>var $content = $('.ajax_posts');
var $loader = $('#more_posts');
var cat = $loader.data('category');
var post_type = $loader.data('type');
var ppp = 17;
var offset = $('#main').find('.post').length;
$loader.on('click', function() {
  load_ajax_posts(ppp);
});
$(window).on( 'load', load_ajax_posts(ppp));
function load_ajax_posts(ppp) {
	if (!($loader.hasClass('post_loading_loader') || $loader.hasClass('post_no_more_posts'))) {
		$.ajax({
			type: 'POST',
			dataType: 'html',
			url: screenReaderText.ajaxurl,
			data: {
        'post_type': post_type,
				'cat': cat,
				'ppp': ppp,
				'offset': offset,
				'action': 'mytheme_more_post_ajax'
			},
			beforeSend : function () {
				$loader.addClass('post_loading_loader').html('');
			},
			success: function (data) {
				var $data = $(data);
				if ($data.length) {
					var $newElements = $data.css({ opacity: 0 });
					$content.append($newElements);
					$newElements.animate({ opacity: 1 });
					$loader.removeClass('post_loading_loader').html(screenReaderText.loadmore);
				} else {
					$loader.removeClass('post_loading_loader').addClass('post_no_more_posts').html(screenReaderText.noposts);
				}
			},
			error : function (jqXHR, textStatus, errorThrown) {
				$loader.html($.parseJSON(jqXHR.responseText) + ' :: ' + textStatus + ' :: ' + errorThrown);
				console.log(jqXHR);
			},
		});
	}
	offset += ppp;
	return false;
}</code></pre>
So we've added a click event to the load button and told it to load 17 posts upon triggered. We've also added an onLoad event to the $(window) object to ensure that the page isn't empty when the user first sees it.

Next, we're going to create the php function which will receive these variables.
<h4><strong>Related Article:</strong> <a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">How to Use Srcset to Serve Responsive Images</a></h4>
<h2>3. Model</h2>
Go into your functions.php and paste this inside the function where you've que'd your scripts.
<pre><code>
$ajaxurl = admin_url( 'admin-ajax.php');
 
wp_localize_script( 'main', 'screenReaderText', array(
	'expand'   =&gt; __( 'expand child menu', 'mytheme' ),
	'collapse' =&gt; __( 'collapse child menu', 'mytheme' ),
	'ajaxurl'  =&gt; $ajaxurl,
	'noposts'  =&gt; esc_html__('No older posts found', 'mytheme'),
	'loadmore' =&gt; esc_html__('Load more', 'mytheme')
) );
</code></pre>
'main' is the handle of the js file in which you've appended the prior jquery code so
<pre><code>wp_enqueue_script('main' , get_style_sheet_directory_uri() . '/js/main.js');</code></pre>
Assuming this is the file in which you've placed your jQuery function, the handle is 'main'. Now let's create the actual php function itself. Go to the bottom of your functions.php and paste this:
<pre><code>add_action('wp_ajax_nopriv_mytheme_more_post_ajax', 'mytheme_more_post_ajax');
add_action('wp_ajax_mytheme_more_post_ajax', 'mytheme_more_post_ajax');
$t = 0;
if (!function_exists('mytheme_more_post_ajax')) {
	function mytheme_more_post_ajax(){

	    $ppp     = (isset($_POST['ppp'])) ? $_POST['ppp'] : 3;
	    $cat     = (isset($_POST['cat'])) ? $_POST['cat'] : '';
	    $offset  = (isset($_POST['offset'])) ? $_POST['offset'] : 0;
	    $post_type = (isset($_POST['post_type'])) ? $_POST['post_type'] : '';

	    $args = array(
	        'post_type'      =&gt; $post_type,
	        'posts_per_page' =&gt; $ppp,
          'post_status' =&gt; 'publish',
          'post__not_in' =&gt; $do_not_duplicate,
	        'cat'            =&gt; $cat,
	        'offset'          =&gt; $offset,
	    );

	    $loop = new WP_Query($args);

	    $out = '';

	    if ($loop -&gt; have_posts()) :
	    	while ($loop -&gt; have_posts()) :
	    		$loop -&gt; the_post();

		    	$category_out = array();
		    	$categories = get_the_category();
				foreach ($categories as $category_one) {
					$category_out[] ='&lt;a href="'.esc_url( get_category_link( $category_one-&gt;term_id ) ).'" class="'.strtolower($category_one-&gt;name).'"&gt;' .$category_one-&gt;name.'&lt;/a&gt;';
				}
				$category_out = implode(', ', $category_out);
				$cat_out = (!empty($categories)) ? '&lt;span class="cat-links"&gt;&lt;span class="screen-reader-text"&gt;'.esc_html__('Categories', 'creativesfeed').'&lt;/span&gt;'.$category_out.'&lt;/span&gt;' : '';
$id = get_the_ID();
if ($t == 2) :
  $out .= '&lt;div class="col-md-4 col-sm-12"&gt;
            &lt;div class="adinspire"&gt;
            &lt;/div&gt;
           &lt;/div&gt;';
           elseif ($t == 5) :
             $out .= '&lt;div class="col-sm-12"&gt;
                        &lt;div class="adlong2"&gt;
                        &lt;/div&gt;
                      &lt;/div&gt;';
         endif;
         if ($t == 9 || $t == 16) :
           $out .= '&lt;div class="col-md-4 col-sm-12"&gt;';
           else :
             $out .= '&lt;div class="col-md-4 col-sm-6"&gt;';
           endif;
				  	$out .=    '&lt;div class="squarepost hvrlines"&gt;
                        &lt;div class="noflow"&gt;';
            $out .= '&lt;a class="postLink" href="'.esc_url(get_permalink()).'" aria-hidden="true" style="opacity: 1;"&gt;';
            $out .= srcset_post_thumbnail();
            $out .= '&lt;/a&gt;';
						$out .=		'&lt;/div&gt;
                      &lt;h4 class="info"&gt;&lt;span&gt;'.print_categories().'&lt;/span&gt;&lt;/h4&gt;
											&lt;h2 class="head3"&gt;&lt;a&gt;'.get_the_title().'&lt;/h2&gt;
											&lt;p class="smallp"&gt;By: '.get_field('design_company', $id).'&lt;/p&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;';
          $t  ;
	    	endwhile;

	    endif;

	    wp_reset_postdata();

	    wp_die($out);
	}
})
</code></pre>
This is the HTML that will appear around each instantiation of the post.

As you'll see, I created an iterater 't' in order to create html that is dependent upon which post the function is currently loading.

You can also see that I've created some custom functions, these are optional, one is print_categories(); which as the name implies, prints the categories of each post, separated by a comma.

<a href="http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/">Wordpress</a> has a native function for doing this but unfortunately it makes the returned string a bit choppy and out of place so it's preferable to use this instead:
<pre><code>function print_categories() {
  foreach((get_the_category()) as $category) {
    $the_string .= $category-&gt;cat_name . ', ';
  }
return substr($the_string, 0, -2);
};
</code></pre>
The other is 'srcset_post_thumbnail();', which is a function I created, you can learn more about it <a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">here</a> but in short, it's a convenient way of placing responsive images into the template or function without having to list several sizes and srcset values for each which can become a bit tedious and overwhelming.

If all is well, you should have a button at the bottom of your template that users can press to see more of your wonderful posts

Have a <a href="http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/">WordPress</a> of <a href="http://127.0.0.1:8080/wordpress/topics/dev-code/">web development blog topic</a> you'd like us to cover? Have a development topic you'd like to write about? Submit your topic and we'll get it covered!