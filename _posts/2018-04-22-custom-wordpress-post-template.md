---
ID: 249
post_title: >
  Select Custom WordPress Post Type
  Template
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/custom-wordpress-post-template/
published: true
post_date: 2018-04-22 05:37:01
---
So you're building a custom WordPress theme and you're just about finished. You have our HTML templates created but you want to convert them into WordPress. You have different page styles and designs, so you'll need custom page templates for all of the different page layouts. An easy solution for this is to simply create the page templates in PHP and either write in the content and images in HTML. But, let's say you want to be able to edit the content or images from within the Wordpress dashboard using their editor or, likely a common case for most WordPress developers: your client wants to be able to edit the page's content. Now, the chances of them having experience with editing HTML or using an FTP client are probably pretty slim. To create an editable page template, your workflow might look a little something like this: 
1.  Create a PHP page template in your theme
2.  Add the <a href="https://www.advancedcustomfields.com/" target="_blank" rel="noopener">Advanced Custom Fields</a> plugin and create your fields
3.  Create the page in WordPress
4.  Select the page template you want to use when editing that page

<img src="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/custom-wordpress-page-template-selector.png" alt="custom wordpress page template selector" style="width: 250px; margin: auto; display: block;" /> When it comes to adding templates to pages, the process is pretty straightforward. But adding the same functionality to WordPress Posts seems to be a common question asked in the development community. One of the greatest things about using WordPress is the ever-growing community willing to help one another. It seems like there is a plugin for every issue or need developers may have. 
## Plugins for selecting custom post templates in WordPress

1.  <a href="https://wordpress.org/plugins/wp-custom-post-template/" target="_blank" rel="noopener">WP Custom Post Template</a>
2.  <a href="https://wordpress.org/plugins/templatic-singletemplate/" target="_blank" rel="noopener">Custom Post Template By Templatic</a>
3.  [Custom Post Type Page Template][1] While plugins can solve issues you may not be able to solve on your own (and potentially save you a shitload of time), sometimes we want to do stuff on our own. There is also a handful of other reasons why you want to avoid using a WordPress plugins like security, pagespeed, etc. When I first started learning WordPress development, I took to Google to find out how to create custom post templates, but finding an answer was a little more difficult than I expected. 

**Luckily, the solution is actually very simple.** 
## How to add a custom template selector to a WordPress Post

1.  Access your website via FTP
2.  Create a page template (let's say full-width-post.php)
3.  Open the file and add the content below   

<div class="blogtextpad">
  <pre><code>
&lt;textarea readonly="readonly" style="color: #03fc96; height: 350px; background: transparent;">/*
Template Name: Full-Width Template
Template Post Type: post, page, product
*/
get_header();
?&gt;

/*---Add your content here---*/

&lt;!--?php get_footer(); ?--&gt;
&lt;/textarea> </code></pre>
</div> And that's it! Now you can create a new post and on then you'll see the "Post Attributes" box with a dropdown arrow to select your custom post template. You shouldn't have to add anything to your functions.php file. Simply having a php file with "Template Name: Full-Width Template Template Post Type: post, page, product" in the meta info will do the trick. Check out more of our 

[WordPress tips, tutorials, and resources][2].

 [1]: https://wordpress.org/plugins/custom-post-type-page-template/
 [2]: http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/