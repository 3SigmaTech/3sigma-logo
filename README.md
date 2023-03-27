# What's in a logo

The name, 3Sigma Technologies, does not refer - as many assume - to Six Sigma. Though I understand the presumed connection.

3Sigma Technologies started from a simple concept - Great is Good Enough.
Too often, the pursuit of perfection gets in the way of delivering great product, great solutions, to clients and customers.
If you're 99.9% of the way toward perfection: you're waaaay ahead of most.
(Quick aside: most of the code you see in the 3Sigma public repos is more like 65% of the way, but was published anyway to showcase possibilities. I'll get around to cleaning up these repos in time...maybe.)

For reference, 3-sigma is three standard deviations away from average in a distribution.
Between +/- 3-sigma on a normal curve, there are 99.74% of all values or, put another way, 99.87% (99.9%) of all values are below +3-sigma.

![Normal Distribution](/man/img/The_Normal_Distribution.svg "The normal distribution. Source: Wikimedia")

To that end, I designed a logo with the lowercase sigma (σ) in mind - specifically referencing the sigma of "standard deviation" and not the sigma of "summation" (∑).
I also wanted the logo to be a simple, geometric concept. With that in mind, let's take a visual journey.

# The original concept

First, I wanted my logo to have three "σ" characters in it, and I wanted it to be rotationally symmetric.
What do I mean by that? Below we see a 460x460 `svg` with three sigmas in it.
(The reason for a 460px dimension will become clearer later - for now, trust me.)
Throughout this discussion I'll leave a red frame and center circle for us to see a reference, with other reference objects coming into or out of use as we go - a red loading/progress spinner being the most ubiquitous.

![Rotational Symmetry](/man/img/rotational-symmetry.svg "Three elements rotated about a circle require 120 degrees of separation")

With the very roughest of shapes in place, let's connect these things into a cohesive image.

![Rotational Symmetry](/man/vid/rotational-symmetry.svg "Guestimate the coordinates for the connection")

We can really see the final result in this connected image.
(Yes, this really is the path of discovery I took to define the logo.)
Let's simplify some elements by replacing the root glyph, the sigma, with circles (to start) and seeing where we are.

![Circles](/man/img/circles.svg "Three circles approximately placed where the sigma glyphs were")

Hmm...something doesn't look right - "zoom and enhance".

![Circles Zoomed In](/man/img/circles-punched-in.svg "Three circles - zoomed in")

I want the area where those circles intersect to be one point - just touching, not passing eachother like they are here (albeit barely).
We also need to know our "connection points" to draw the lines between the edges of the circles.
It's time to "math this out".

# Math Like a Mother#$%^&!

(Before we begin - I am aware this was probably the "long way" but I had a lot of fun doing it.)

Three, rotationally symmetric elements stacked as they are in the configuration above fit into an equilateral triangle.

![Circles in Triangle](/man/img/circles-in-triangle.svg "Three circles - in a triangle")

Note: I'm applying some future knowledge that these elements will not be centered in the middle of the image and need to be shifted down some.
This was done so the spacing at the top of elements (just above our top circle) is very nearly the same as the spacing to either side of the bottom circles.
Quickly showing you what I mean (but omitting the math for now):

![Circles are shifted](/man/vid/circles-shifted.svg "Three circles - shifted to center elements")

This is a consequence of rotating about a point that is outside of the original circle (the top one) to generate the other two.
If I rotate about the edge of the circle I get this trefoil type pattern, as seen below where I move the center of rotation from the circle's edge to outside of the circle.

![Rotation point shifted](/man/vid/rotation-shifted.svg "Point of rotation shifted down")


Getting back to our triangle, things will look weird for a while as we "zoom out" to see the triangles corners (they extend beyond our bounding box).
I'll explain why in a bit, but let's familiarize ourselves with our new landscape where we have three circles inscribed inside of a triangle with the familiar red box showing our final logo canvas and our red dot being translated down to the center of *rotation* (`y=245px`) instead of the canvas' center (`y=230px`).

![Circles Triangle and Square](/man/img/circles-triangle-square.svg "Three circles, rotation center, triangle, and canvas bounds")

Going forward, I'm going to leave the circles in place to help us remember what we're doing but keep in mind that they are not pixel-perfect...yet.

First, let's use the symmetry of the equilateral triangle to find the pixel-perfect centers for the two lower circles.

![Circles manually centered](/man/vid/circles-centers.svg "Manually place each circle instead of rotationally transforming")

Now that we *know* where the centers of our cirlces are, we can place them manually (instead of rotating them about the center) and will do so going forward.

With that done, how did I get the coordinates for the triangle's points?
Here is a visual of what to use to get the intersection point of the top circle and right leg of the triangle.
You'll need to know that the angles of an equilateral triangle are all 60°.

![Circles Triangle Top Point](/man/vid/triangle-top-point.svg "Daisy-chaining our way to the top")

I also applied the following trigonomy functions to get the lengths of various lines (these were applied earlier to position the cirlces): $$
\text{SOHCAHTOA}
\left\lbrace\begin{split}
    \sin(\theta) & = \frac{\text{Opposite}}{\text{Hypotenuse}}\\
    \\
    \cos(\theta) & = \frac{\text{Adjacent}}{\text{Hypotenuse}}\\
    \\
    \tan(\theta) & = \frac{\text{Opposite}}{\text{Adjacent}}\\
\end{split}\right. $$

This shows the intersection point is $r·\sin(30°)$ above the center-point of the top circle, where $r$ is the radius of the circle. (Note: I arbitrarily used $r=100$ when defining my logo for simpler math).

You can apply the same daisy-chaining to get the other triangle corners and triangle-circle intersection points, though only the latter is necessary.
The triangle-circle intersection points are shown below.

![Circle Triangle Intersections](/man/img/path-points.svg "Six points of intersection between the three circles and the inscribing triangle")

This allows us to define **one** path to connect the circles (instead of a line between each one).
Let's do it!

![Drawing Inscribing Patch](/man/vid/inscribing-path.svg "Drawing the inscribing path")

