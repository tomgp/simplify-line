import { 
	csv,
	line,
	timeParse,
	scaleLinear,
	select,
	selectAll,
	extent
} from 'd3';

import { simplifiedLine } from '../source';

window.onload = function() {
	const width = 500;
	const height = 300;
	const margin = { top:20, left:20, bottom:20, right:20 };
  const interactive = select('.interactive').append('div');
	// add the basic markup  structure
	
	interactive.append('div').attr('class','key'); // key
	interactive.append('div').attr('class','chart'); // display-chart
	interactive.append('div').attr('class','ui'); // ui slider
	select('div.message').remove();

csv('bonds.csv')
	.then(result => {
		const parseTimeString = timeParse('%Y-%m-%d');
		// a bit of preliminary processing...
		const data = result.map((d)=>({
			date: parseTimeString( d['date'] ),
			value: Number(d['US 10yr bond']),
		}));

		const dateScale = scaleLinear()
			.domain( extent(data, (d)=>d.date))
			.range([0, width-(margin.left + margin.right)]);

		const valueScale = scaleLinear()
			.domain( extent(data, (d)=>d.value))
			.range([0, height-(margin.top + margin.bottom)] );
		
		const original = line()
			.x((d) => dateScale(d.date))
			.y((d) => valueScale(d.value));
		
		const simple = simplifiedLine()
			.tolerance(3)
			.x((d) => dateScale(d.date))
			.y((d) => valueScale(d.value));		

		const plot = select('.chart')
			.append('svg')
				.attr('width',width)
				.attr('height',height)
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

		plot.append('path').datum(data)
			.attr('d', original)
			.attr('fill', 'none')
			.attr('stroke', '#F99');

		const draw = (tolerance)=>{
			// TODO update tolerance display label

			simple.tolerance(tolerance);

			plot.selectAll('path.simple').data([data])
				.enter().append('path').classed('simple', true)

			plot.selectAll('path.simple')
				.attr('d', simple)
				.attr('fill', none)
				.attr('stroke', '#000');

			const report = simple.report();
			
			const keyData = [
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
			
			selectAll('.key')
				.data( keyData )
				.call((parent)=>{
					parent.text((d) => `${d.label} (${d.value} points)`);
					parent.classed((d)=>d['class'], true);
				});
		}			
	});
};



// 	var slider = d3.select('#tolerance-input');
// 	slider.on('change', function(){
// 		draw( slider.node().value );	
// 	})
// 	draw( slider.node().value );

	

// });

