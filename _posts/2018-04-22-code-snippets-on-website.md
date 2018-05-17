---
ID: 236
post_title: >
  Display Custom Code Snippets on Your
  Website
author: Josh
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/code-snippets-on-website/
published: true
post_date: 2018-04-22 03:03:04
---
If you're a developer, designer, programmer, or any other title that may require displaying your code on the frontend of your website, this article may be for you. We've all had to do a Google search to find out how to do some sort of CSS, javascript, php, etc. Chances are, you've seen the a code snippet displayed on the frontend of a website. Most frameworks (like Bootstrap) have pre-built styles they attribute to <code></code> tags, but they are all very boring. 
## How do I display code on my website? Simply put, using the <code> </code> element shows code without it being attributed to the pages elements. Here is an example of Bootstrap's default styling for the <code></code> attribute. 

<div class="blogtextpad">
  <code>
code {
padding: 2px 4px;
font-size: 90%;
color: #c7254e;
background-color: #f9f2f4;
border-radius: 4px;
width: 100%;
}</code>
</div>

<div class="divide30">
</div> That shit is boring. Changing the background only effects the text displayed, but there is a simple solution. The most common method is to wrap the <code></code> attribute in a <pre></pre> (

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre" target="_blank" rel="noopener">preforamatted text element</a>) . Doing this allows you to style the background of the entire element rather than just the text. Here is an example: <div class="blogtextpad">
  <pre><code>pre {
	background: #1C1E2C;
	border: 0px;
	width: 100%;
	padding: 40px;
	color: #fff;
	width: 100%;
	font-size: 18px;
	line-height: 29px
}</code></pre>
</div> The CSS styling displayed within that snippet is the taken directly from our CSS.