'use strict';

require('babelify/polyfill'); //remove this line if you don't care about ES6 pollyfils
var d3 = require('d3');
var simplePath = require('./simplified-path.js');

console.log(simplePath());

var width = 500;
var height = 300;
var margin = {
	top:20, 
	left:20, 
	bottom:20, 
	right:20 
};

d3.csv('bonds.csv', function(data){
// a bit of preliminary processing...
	data = data.map(function(d){
		var timeFormat = d3.time.format('%Y-%m-%d');
		return {
			date: timeFormat.parse( d['date'] ),
			value: Number(d['US 10yr bond'])
		};
	});

//create the scales...
	var dateScale = d3.time.scale()
		.domain( d3.extent(data, function(d){ return d.date }) )
		.range([0, width-(margin.left+margin.right)]);

	var valueScale = d3.scale.linear()
		.domain( d3.extent(data, function(d){ return d.value }) )
		.range( [0, height-(margin.top+margin.bottom)] );

//make the path generator
	var simple = simplePath()
		.tolerance(3)
		.x(function(d){ return dateScale(d.date); })
		.y(function(d){ return valueScale(d.value); });
		//.interpolate( 'basis' );

	var original = d3.svg.line()
		.x(function(d){ return dateScale(d.date); })
		.y(function(d){ return valueScale(d.value); })
		//.interpolate( 'basis' );

	var plot = d3.select('.chart')
		.append('svg')
			.attr({
				width:width, 
				height:height
			})
		.append('g')
			.attr('transform','translate(' + margin.left + ',' + margin.top + ')')

	plot.append('path').datum(data)
		.attr({
			'd':original,
			'fill':'none',
			'stroke':'#F99'
		});

	function draw(tolerance){
		d3.select('span#tolerance-value').text(tolerance);
		simple.tolerance(tolerance);

		plot.selectAll('path.simple').data([data])
			.enter().append('path').classed('simple',true)

		plot.selectAll('path.simple').attr({
				'd':simple,
				'fill':'none',
				'stroke':'#000'
			});

		var report = simple.report();
		var keyData = [
			{
				'label': 'Simplified data',
				'class': 'simplified',
				'value': report.simplified
			},
			{
				'label': 'Original data',
				'class': 'original',
				'value': report.original
			}
		];
		
		d3.selectAll('.key')
			.data( keyData )
			.call(function(parent){
				parent.text(function(d){
					return d.label + ' ('+d.value+' points)'
				});
				parent.classed(function(d){return d['class']; }, true);
			});
	}

	var slider = d3.select('#tolerance-input');
	slider.on('change', function(){
		draw( slider.node().value );	
	})
	draw( slider.node().value );

	

});

