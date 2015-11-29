##What it is
A simplified path generator for D3, a drop in replacement for d3.svg.line with the added ability to specify a tolerance.

eg:

```
var simple = simplePath()
	.tolerance(3)
	.x(function(d){ return dateScale(d.date); })
	.y(function(d){ return valueScale(d.value); })
```
	
Based on Simplify.js a tiny high-performance JavaScript polyline simplification library by Vladimir Agafonkin, extracted from Leaflet, a JS interactive maps library by the same author. 

It uses a combination of Douglas-Peucker and Radial Distance algorithms.

The reusable code is in [simplified-path.js](https://github.com/tomgp/simplify-line/blob/master/source/simplified-path.js). At the moment I'm using browserify (i.e. `require('module')` type thing )