---
ID: 471
post_title: Animated 3D 404 Page Tutorial
author: Matt McKenna
post_excerpt: ""
layout: post
permalink: >
  http://127.0.0.1:8080/wordpress/animated-3d-404-page-tutorial/
published: true
post_date: 2018-04-25 04:50:48
---
404 also known as "error pages", have plagued developers for years. The drop-off rate of visitors leaving the site when landing on a 404 page is typically the highest on a website. Usually, a visitor comes to a website, and sees a boring page phrase like "404" or "this page cannot be found" or some other generic bullshit that just doesn't help your case. A recent trend in including stylish 404 pages into the web design process has helped lift this dreaded website visit and turn it into a useful experience. The truth is, most web designers simply don't want to take the time to put a lot of effort into styling the 404 page - myself included. While searching for some inspiration, I stumbled upon a truly unique 404 page design that makes life as a designer or developer easier. [Qwerty Querty][1] created a pen that takes the boring "404" and turns it into an animated 3D-8-bit-hybrid. <img src="http://127.0.0.1:8080/wordpress/wp-content/uploads/2018/04/animated-404-page.gif" alt="animated 404 error page web design" class="" /> Pretty gnarly isn't it? 
## Creating an animated 404 page The best part about this pen is its simplicity. First, we are going to get Jordan Scales' "

[Isomer][2]" script. Next, we are going to add a little bit of custom javascript   
    
    var Shape = Isomer.Shape;
    var Point = Isomer.Point;
    var Color = Isomer.Color;
    canvas = document.getElementById("can")
    var iso = new Isomer(canvas);
    ctx = canvas.getContext("2d")
    
    var points = [
      [0,4,3],[0,6,4],[0,5,4],[0,4,4],[0,4,5],[0,6,5],
      [0,1,3],[0,0,3],[0,-1,3],[0,1,4],[0,-1,4],
    [0,1,5],[0,0,5],[0,-1,5],
      [0,-6,3],[0,-4,4],[0,-5,4],[0,-6,4],[0,-6,5],[0,-4,5]
      ]
    
    var cubes = []
    setInterval(function () {
      ctx.clearRect(0,0,canvas.width, canvas.height)
    for (i=0; i<cubes.length; i++) {
      color = [Math.floor(Math.random()*50),Math.floor(Math.random()*150)+105,Math.floor(Math.random()*150)+105]
    iso.add(Shape.Prism(new Point(points[i][0], points[i][1], points[i][2])), new Color(color[0],color[1],color[2]))
    }
      cubes.push(points.splice(0,0)[0])
    }, 120)
     Next, we'll create the size of the canvas using a little bit of CSS. 

    
    #can {
      width: 800px;
      height: 600px;
    }
     And lastly, we'll add the HTML to our page or template, and that's it! 

    
    <textarea readonly="readonly" style="color: #03fc96; height: 150px; background: transparent;"><center><canvas width="1200" height="900" id="can"></canvas></center>
    </textarea>  You can view the full pen with 

[this link][3], or you can view our [snippet gallery][4].

 [1]: https://codepen.io/qwertyquerty
 [2]: https://cdnjs.cloudflare.com/ajax/libs/isomer/0.2.6/isomer.js
 [3]: https://codepen.io/qwertyquerty/pen/XqbeJX
 [4]: http://127.0.0.1:8080/wordpress/topics/code-snippets/