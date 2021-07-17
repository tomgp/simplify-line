import { 
	csv,
	line,
	timeParse,
	scaleLinear,
	select,
	selectAll,
	extent
} from 'd3';

import { simplifiedLine } from '..';

window.onload = function() {
  const width = 500;
  const height = 300;
  const margin = { top:20, left:20, bottom:20, right:20 };
  const interactive = select('.interactive')
		.append('div');
	// add the basic markup  structure
	interactive.append('div')
		.attr('class','key simplified'); // key
	interactive.append('div')
		.attr('class','key original')
		.style('color','#F99');
	interactive.append('div')
		.attr('class','chart'); // display-chart
	interactive.append('div')
		.attr('class','ui')
		.style('width','100%')
		.call(parent=>{
			parent.append('span')
				.text('Tolerance:');

			parent.append('input')
				.attr('type','range')
				.attr('min',0)
				.attr('max',5)
				.attr('step',0.1)
				.attr('value',3)
				.attr('name','tolerance')
				.attr('id','tolerance-input');
			
			parent.append('span').attr('id','tolerance-display');
			
		}); // ui slider
	select('div.message').remove();


csv('examples/bonds.csv')
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
			tolerance = Number(tolerance);
			// TODO update tolerance display label
			select('#tolerance-display').text(tolerance);
			simple.tolerance(tolerance);
			
			plot.selectAll('path.simple').data([data])
				.enter().append('path').classed('simple', true)
			
			plot.selectAll('path.simple')
				.attr('d', simple)
				.attr('fill', 'none')
				.attr('stroke', '#000');

			const report = simple.report();
			console.log(3)
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
				});
		};

		var slider = select('#tolerance-input');
		slider.on('change', ()=>draw( slider.node().value ));

		draw( slider.node().value );
	});
};

