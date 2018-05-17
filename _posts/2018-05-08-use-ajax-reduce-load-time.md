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
### This post is part of a series on reducing your Wordpress websites loading time. To see more, refer to the links below.

1.  [Deregistering plugin scripts where they're not being used][1]
2.  [Creating responsive images based on screen dimensions][2]
3.  [Using Lazy Load to get images based on view port position][3]
4.  [Using AJAX to dynamically serve content using a 'Load More' button][4]

**AJAX** stands for **A**synchronous **J**avascript **a**nd **X**ML. In short, AJAX is a way for the browser to submit additional requests to the server for content after the page has loaded. So with that out of the way, let's get started! What we're going to make is a Load More button for loading more posts. The transfer of data will be in the following order: **View > Logic > Model > Back to view** 
## 1\. View First, you'll want to go go into the template file that you want the posts to appear and place the following code: 

    
    <div id="more_posts" data-type="freebies" data-category="<?php echo esc_attr($cat_id); ?>"><?php esc_html_e('Load More', 'creativesfeed') ?></div> What this will do is create a Load More button at the bottom of the page that the user can click in order to request additional posts from the server. This will reduce the amount of strain on your server as opposed to loading possibly several hundred posts at once. Looking at this, take note that the variables here will be passed to the PHP function so you'll want to set them to the types/categories of posts that you want the page to show. Furthermore, ensure that the data value of the button on the page itself has the correct values because they'll be passed to this JS function. Note that the data-* attribute isn't a predefined attribute, it's something you can follow with anything you'd like and then load that data later on in jQuery like we'll be doing. In this case, we'll be using 'data-type' to specify the post-type and data-category to specify the category. 'echo esc attr($cat_id) will be used to create posts that are the same category as the page itself so use 

     $cat_id = $category[0] -> cat_ID; To attain the category in ID format. Now let's add the container in which posts will appear, to do that, go to the same template file you added the above code and paste this: 

    <main id="main" class="site-main ajax_posts" role="main"></main> The php function will find this element place the newly loaded posts within it. Now that we've created the view, it's time to move on to the Jquery where we'll add an event to this button along with initial posts to appear in the 'main' element upon the page loading. 

## 2\. Logic

    var $content = $('.ajax_posts');
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
    } So we've added a click event to the load button and told it to load 17 posts upon triggered. We've also added an onLoad event to the $(window) object to ensure that the page isn't empty when the user first sees it. Next, we're going to create the php function which will receive these variables. 

#### **Related Article:** [How to Use Srcset to Serve Responsive Images][2]

## 3\. Model Go into your functions.php and paste this inside the function where you've que'd your scripts. 

    
    $ajaxurl = admin_url( 'admin-ajax.php');
     
    wp_localize_script( 'main', 'screenReaderText', array(
    	'expand'   => __( 'expand child menu', 'mytheme' ),
    	'collapse' => __( 'collapse child menu', 'mytheme' ),
    	'ajaxurl'  => $ajaxurl,
    	'noposts'  => esc_html__('No older posts found', 'mytheme'),
    	'loadmore' => esc_html__('Load more', 'mytheme')
    ) );
     'main' is the handle of the js file in which you've appended the prior jquery code so 

    wp_enqueue_script('main' , get_style_sheet_directory_uri() . '/js/main.js'); Assuming this is the file in which you've placed your jQuery function, the handle is 'main'. Now let's create the actual php function itself. Go to the bottom of your functions.php and paste this: 

    add_action('wp_ajax_nopriv_mytheme_more_post_ajax', 'mytheme_more_post_ajax');
    add_action('wp_ajax_mytheme_more_post_ajax', 'mytheme_more_post_ajax');
    $t = 0;
    if (!function_exists('mytheme_more_post_ajax')) {
    	function mytheme_more_post_ajax(){
    
    	    $ppp     = (isset($_POST['ppp'])) ? $_POST['ppp'] : 3;
    	    $cat     = (isset($_POST['cat'])) ? $_POST['cat'] : '';
    	    $offset  = (isset($_POST['offset'])) ? $_POST['offset'] : 0;
    	    $post_type = (isset($_POST['post_type'])) ? $_POST['post_type'] : '';
    
    	    $args = array(
    	        'post_type'      => $post_type,
    	        'posts_per_page' => $ppp,
              'post_status' => 'publish',
              'post__not_in' => $do_not_duplicate,
    	        'cat'            => $cat,
    	        'offset'          => $offset,
    	    );
    
    	    $loop = new WP_Query($args);
    
    	    $out = '';
    
    	    if ($loop -> have_posts()) :
    	    	while ($loop -> have_posts()) :
    	    		$loop -> the_post();
    
    		    	$category_out = array();
    		    	$categories = get_the_category();
    				foreach ($categories as $category_one) {
    					$category_out[] ='<a href="'.esc_url( get_category_link( $category_one->term_id ) ).'" class="'.strtolower($category_one->name).'">' .$category_one->name.'</a>';
    				}
    				$category_out = implode(', ', $category_out);
    				$cat_out = (!empty($categories)) ? '<span class="cat-links"><span class="screen-reader-text">'.esc_html__('Categories', 'creativesfeed').'</span>'.$category_out.'</span>' : '';
    $id = get_the_ID();
    if ($t == 2) :
      $out .= '<div class="col-md-4 col-sm-12">
                <div class="adinspire">
                </div>
               </div>';
               elseif ($t == 5) :
                 $out .= '<div class="col-sm-12">
                            <div class="adlong2">
                            </div>
                          </div>';
             endif;
             if ($t == 9 || $t == 16) :
               $out .= '<div class="col-md-4 col-sm-12">';
               else :
                 $out .= '<div class="col-md-4 col-sm-6">';
               endif;
    				  	$out .=    '<div class="squarepost hvrlines">
                            <div class="noflow">';
                $out .= '<a class="postLink" href="'.esc_url(get_permalink()).'" aria-hidden="true" style="opacity: 1;">';
                $out .= srcset_post_thumbnail();
                $out .= '</a>';
    						$out .=		'</div>
                          <h4 class="info"><span>'.print_categories().'</span></h4>
    											<h2 class="head3"><a>'.get_the_title().'</h2>
    											<p class="smallp">By: '.get_field('design_company', $id).'</p>
                          </div>
                        </div>';
              $t  ;
    	    	endwhile;
    
    	    endif;
    
    	    wp_reset_postdata();
    
    	    wp_die($out);
    	}
    })
     This is the HTML that will appear around each instantiation of the post. As you'll see, I created an iterater 't' in order to create html that is dependent upon which post the function is currently loading. You can also see that I've created some custom functions, these are optional, one is print_categories(); which as the name implies, prints the categories of each post, separated by a comma. 

[Wordpress][5] has a native function for doing this but unfortunately it makes the returned string a bit choppy and out of place so it's preferable to use this instead: 
    function print_categories() {
      foreach((get_the_category()) as $category) {
        $the_string .= $category->cat_name . ', ';
      }
    return substr($the_string, 0, -2);
    };
     The other is 'srcset_post_thumbnail();', which is a function I created, you can learn more about it 

[here][2] but in short, it's a convenient way of placing responsive images into the template or function without having to list several sizes and srcset values for each which can become a bit tedious and overwhelming. If all is well, you should have a button at the bottom of your template that users can press to see more of your wonderful posts Have a [WordPress][5] of [web development blog topic][6] you'd like us to cover? Have a development topic you'd like to write about? Submit your topic and we'll get it covered!

 [1]: http://127.0.0.1:8080/wordpress/how-to-deregister-javascript-files-to-increase-page-loading-speed/
 [2]: http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/
 [3]: http://127.0.0.1:8080/wordpress/how-to-use-lazyload-to-increase-page-speed/
 [4]: http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/
 [5]: http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/
 [6]: http://127.0.0.1:8080/wordpress/topics/dev-code/