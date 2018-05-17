---
ID: 697
post_title: '[How To] Use Srcset to Create Responsive Images'
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/
published: true
post_date: 2018-05-08 10:20:42
---
<h3>This post is part of a series on reducing your Wordpress websites loading time. To see more, refer to the links below.</h3>
<ol>
 	<li><a href="http://127.0.0.1:8080/wordpress/how-to-deregister-javascript-files-to-increase-page-loading-speed/">Deregistering plugin scripts where they're not being used</a></li>
 	<li> <a href="http://127.0.0.1:8080/wordpress/responsive-images-with-srcset/">Creating responsive images based on screen dimensions</a></li>
        <li><a href="http://127.0.0.1:8080/wordpress/how-to-use-lazyload-to-increase-page-speed/">Using Lazy Load to get images based on view port position</a></li>
<li><a href="http://127.0.0.1:8080/wordpress/use-ajax-reduce-load-time/">Using AJAX to dynamically serve content using a 'Load More' button</a></li>

</ol>
When it comes to decreasing the load time for pages, the majority of the time spent loading comes from images. I don't want to get too much into technicalities — because as a web designer, you probably don’t care, but consider the following:
<ul>
 	<li>A bit has two values: one or zero.</li>
 	<li><span>An ASCII character in 8-bit ASCII encoding is </span><b>8</b><span> bits (1 byte).</span></li>
 	<li>One kilobyte = 1,000 bytes.</li>
 	<li>One megabyte = 1,000 kilobytes. (This continues up the ladder with MB, GB, and TB)</li>
</ul>
So we've narrowed down that a single character in ASCII 8-bit encoding requires only 8 bits. That's the amount of data needed to be computed to display a single character, but considering modern data transfer techniques, this is an easy feat, but now let's look at a typical PNG-8.
<ul>
 	<li>Considered a light-weight format.</li>
 	<li>Has 256 color possibilities.</li>
 	<li>8 bits per pixel.(You get the picture, no pun intended)</li>
</ul>
<img style="width: 100px; height: 100px;" src="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/tiny_png-8.png" class="aligncenter" />
Let's compare a typical sentence versus a 100 x 100 place holder image in PNG-8 (Note: this placeholder image has been compressed, if you couldn't already tell). In PNG-8 format, a 100 x 100 with 8 bits per pixel would equal out to be 80,000 bits or 10 kilobytes. The sentence before this was comprised of one-hundred and one characters, so 101(8) = 808 bits, or 0.101 of a kilobyte.

I'd have to write almost ten-thousand sentences to rival the amount of data this tiny png-8 image takes. <strong>That's almost as many sentences as there are in the Facebook Data Policy!</strong>

Let's take a look at an image element with srcset and size attributes:
<pre><code>
&lt;img sizes="(max-width: 991px) 98vw,
    (min-width: 992px) 29vw 
"srcset="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther.jpg 1920w, http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-1400x800.jpg 1400w, http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-1200x630.jpg 1200w, http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-645x780.jpg 645w, http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-750x650.jpg 750w, http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-300x200.jpg 300w" src="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/Black-Panther-645x780.jpg" alt="Black Panther Painting" class=""&gt;
</code></pre>
The sizes attribute will tell the browser what portion of the viewport the image will occupy given a width parameter. '(max-width: 991px) 98vw" means on a viewport that is below 991px the image will occupy 98% of the window. '(min-width: 992px) 29vw' is saying that on a screen larger than 992px, the image will occupy 29% of the viewport. The srcset attribute is giving the browser several different options to choose from depending on the size parameters. The browser will choose the smallest image that still matches the specified size parameters.

After each srcset property is a url followed by a number and a 'w'. This is a way of letting the browser know how wide the image is as this is something the browser is unable to gather without actually downloading the entire image.
<h2>Creating a srcset function in Wordpress</h2>
Now that we've learned about the various facets of srcsetting an image, you might be thinking "Well that's great and all but am I going to have to write all of that out every time?"

The answer is no, we can make a function to do this for us. Go into your functions.php and define a function called 'srcset_post_thumbnail' and give it two parameters: $sizes and $classes
<pre><code>function srcset_post_thumbnail($sizes, $classes) { </pre></code>
What we're going to do is create a function that you can simply specify the size of the containing element using the tried-and-tested Bootstrap classes to determine what size image to serve.

Between the curly brackets, create two arrays, one for your specified image sizes, and the other for their corresponding widths. Use the handles given to your image sizes for the first array and their width in pixels for the second. Make sure that you order them either ascending or descending. It's important that if you order the first in ascending or descending, that you do the same for the second, they need to match up.
<pre><code>    
$defaultSize = 'medium';
$thumbnailSizes = [
        'full',
        'l',
        'm',
        's',
        'xs',
        'thumb'
    ];
    $thumbnailWidths = [
       1920,
       1400,
       1200,
       645,
       750,
       300
    ];
</code></pre>
Now is where we'll define what to do with the given parameters (col-4, col-6, col-8). Add this just under your thumbnailWidths array:
<pre><code>
    $html = '&lt;div class="ph"&gt;';
    if ($sizes == 'col-12') {
    $html .= '&lt;img sizes="(min-width: 1px) 100vw "';
    }
    else if ($sizes == 'col-4') {
    $html .= '&lt;img sizes="(max-width: 991px) 98vw,
    (min-width: 992px) 29vw "';
    }
    else if ($sizes == 'col-9' || $sizes == 'col-8') {
    $html .= '&lt;img sizes="(max-width: 767px) 100vw,
    (min-width: 768px) 72vw "';
    }
    else if ($sizes == 'sidefeed') {
    $html .= '&lt;img sizes="(max-width: 767px) 48vw,
    (min-width: 768px) 15vw "';
    }
    else if ($sizes == 'col-6') {
    $html .= '&lt;img sizes="(max-width: 767px) 95vw,
    (min-width: 768px) 41vw "';
    }
    else if ($sizes == 'col-3') {
    $html .= '&lt;img sizes="(max-width: 767px) 98vw,
    (min-width: 768px) 22vw "';
    }
    else {
    $html .= '&lt;img sizes="(max-width: 991px) 98vw,
    (min-width: 992px) 29vw "';
    }
    $html .= 'srcset="';
</code></pre>
You don't have to make these identical to what you see here, feel free to change them to sizes that are most common to your website. These just happen to be some often used sizes, especially if you're using Bootstrap. Another neat thing about this is that if you want change something about the images on your site, you can just come to this function and add/edit your changes here. For instance, I've encapsulated the image element in a div class called 'ph' which I can use to specify various properties.
Now that we have our arrays and sizes written out, let's get into the loop. Just under the last $html assignment, add this:
<pre><code>
for ($i = 0; $i &lt; count($thumbnailSizes); $i++) {
        $thumb = wp_get_attachment_image_src($thumb_id, $thumbnailSizes[$i], true);

        $url = $thumb[0];

        $html .= $url . ' ' . $thumbnailWidths[$i] . 'w';
        if ($i &lt; count($thumbnailSizes) - 1) {
            $html .= ', ';
        }
    }
</code></pre>
This is going to iterate through the thumbnailSizes array we created earlier and add there respective url, width, and attributes to the $html stream. Here's an idea of the logic between one iteration: By this point, the string is something like '&lt;img sizes="(max-width:991px) 98vw, (min-width:992px) 29vw ", the loop is then going to get the thumbnail as specified by its size, add it to the string, then concatenate its width followed by 'w' and finally, a comma.
We're almost there, we're just going to add an alt attribute for SEO purposes along with a few other things. After the closing bracket of the loop, add this:
<pre><code>
    $alt = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);

    $thumbMedium = wp_get_attachment_image_src($thumb_id, $defaultSize, true);

    $html .= '" ';
    $html .= 'src="' . $thumbMedium[0] . '" alt="' . $alt . '" class="'.$classes.'"&gt;&lt;/div&gt;';

    return $html;
</code></pre>
This is where the $classes argument we gave the function earlier comes into play. When calling the function, you can specify a list of classes in string format to give the image in addition to its needed size. Be sure that when you call the function, you echo it's return, here's an example:
<pre><code>&lt;php echo srcset_post_thumbnail('col-4', 'width100 alignLeft'); ?&gt;</code></pre>
<a href="http://127.0.0.1:8080/wordpress/wordpress-lazyload/">Next we'll take a look at Lazy Load and how you can easily add it to your website</a></br>
Check out more of our <a href="http://127.0.0.1:8080/wordpress/topics/dev-code/">web development</a> and <a href="http://127.0.0.1:8080/wordpress/topics/dev-code/wordpress/">Wordpress</a> posts for more information!