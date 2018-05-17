---
ID: 964
post_title: '[How To] Dequeue Javascript Files In WordPress'
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/dequeue-javascript-wordpress/
published: true
post_date: 2018-05-10 14:17:07
---
### This post is part of a series on reducing your Wordpress websites loading time. To see more, refer to the links below.

1.  [Dequeue plugin scripts where they're not being used][1]
2.  [Creating responsive images based on screen dimensions][2]
3.  [Using Lazy Load to get images based on view port position][3]
4.  [Using AJAX to dynamically serve content using a 'Load More' button][4] When installing plugins in Wordpress, you might notice that behind the scenes they're registering Javascript files on pages that clearly don't need them. For instance, a contact plugin might register several Javascript files on every page of your website when these files are only needed in a specific context (the Contact page). These scripts can become a burden if you have several plugin's installed. As of right now, there have been a few requests from users to get plugin developers to deque these scripts on pages where they're not needed but this idea has yet to take hold and so you'll see these scripts even on pages that they have no use. What we're going to do is deque these scripts using PHP and a local copy of the plugin. First what you want to do is go to any page that you suspect might be loading scripts from a plugin where they're not needed and right click > View page source. If you come across any js files, have a look at them and make sure that they're absolutely necessary, if not, take note of their name and any identifying information about them. From the file path, you should be able to deduce which plugin is including them. What we'll need is the handle of these scripts which can be found by looking through their respective wp_enqueue_script() function. Different plugins include scripts in different files so it might be a bit tedious trying to find their corresponding include function without doing a few things first. What we'll want to do is get a copy of the plugin on our local server, there are two ways of doing this: 

*   Download the plugin externally as a zip(Through the developers page)
*   Use ftp to connect to your remote server Chances are that if you're familiar with using an IDE, the IDE you're using has a method of connecting to remote servers. Do a quick search through your IDE's extension manager for "remote ftp" and you should find one that works for you. Otherwise, you can use Filezilla. Once you have the plugin locally, open its folder in a file explorer and do a search for "wp_enqueue_script" (without quotes). This should return a list of all the files which contain a call to this function. Once you have this list, take a look at the string that follow opening bracket of the function call. You're looking for the handle of the script, here's an example: 

    wp_enqueue_script( 'main', get_stylesheet_directory_uri() . '/js/main.js'); In this case, the handle is 'main'. After you've found the handles of the files that you wish to deque, go into your functions.php and paste this: 

    add_action( 'wp_print_scripts', 'my_deregister_javascript', 100 );
    
    function my_deregister_javascript() {
       if ( !is_page('Contact') ) {
    	wp_deregister_script( 'handle1' );
    	wp_deregister_script( 'handle2 );
    	wp_deregister_script( 'handle3' );
         }
    }
     Replace 'Contact' with the name of the page you want to deque the scripts on and the handles with the strings you found previously. Another thing to note is that if you've included these scripts by using something like 

    <script src='url'></script> In the actual template file that these scripts will not be dequed. It's best to include scripts in the functions.php file for a few reasons: 

1.  Ensures that if a script with an identical handle has been registered that it will not be que'd twice.
2.  (As opposed to using inline scripting) The browser will only have to load the file once at which point it becomes cache'd.
3.  As the project grows in scale, readability will not be compromised as all of your scripts will be able to be found in one central location. This is one of many ways to ensure that your Wordpress page loading time stays below four seconds, for more idea's, check out some other of my posts. 

[Next, we're going to create a function to serve responsive images][2] Also, be sure to check out the rest of our [WordPress blog posts][5]!

 [1]: http://127.0.0.1:8080/wordpress/how-to-deregister-javascript-files-to-increase-page-loading-speed/
 [2]: http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/
 [3]: http://127.0.0.1:8080/wordpress/how-to-use-lazyload-to-increase-page-speed/
 [4]: http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/
 [5]: http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress