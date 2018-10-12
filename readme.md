## What it is?

A simplified path generator for D3, more or less a drop in replacement for d3.line with the added ability to specify a tolerance.

## Usage

Install and use via npm `npm install --save @tomgp/simplify-line` 

```
const { simplifiedLine } = require('simplify-line');

const simple = simplePath()
	.tolerance(3)
	.x(function(d){ return dateScale(d.date); })
	.y(function(d){ return valueScale(d.value); })
```
	
Based on Simplify.js a tiny high-performance JavaScript polyline simplification library by Vladimir Agafonkin, extracted from Leaflet, a JS interactive maps library by the same author. 

It uses a combination of Douglas-Peucker and Radial Distance algorithms.

