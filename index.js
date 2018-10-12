const { line } = require('d3');
const simplify = require('simplify-js');

const functor = (x)=>{
    const constant = (x) => (()=>x);
    const fx = typeof x === "function" ? x : constant(x);
    return fx;
}

function simplifiedLine(){

    let tolerance = 0;
    let highQuality = true;

	let generator = line()
        .x(function(d){return d.x})
        .y(function(d){return d.y});

	let xAccessor = (d)=>d;
	let yAccessor = (d)=>d;

    let originalPoints = 0; 
    let simplifiedPoints = 0;

	const lineGenerator = (data)=>{
		const normalised = data.map(function(d){	//get the data into the form simplify-js expects
			return {
				x: xAccessor(d),
				y: yAccessor(d)
			};
		});

		const simplifiedData = simplify(normalised, tolerance, highQuality);
        simplifiedPoints = simplifiedData.length;
        originalPoints = data.length;
        
		return generator(simplifiedData);
	}

	lineGenerator.interpolate = (s) => {
		generator.interpolate(s);
		return lineGenerator;
	};

	lineGenerator.x = (f) => {
		xAccessor = functor(f);
		return lineGenerator;
	};

	lineGenerator.y = (f) => {
		yAccessor = functor(f);
		return lineGenerator;
	};

	lineGenerator.tolerance = (x) => {
		tolerance = x;
		return lineGenerator
	}

	lineGenerator.highQuality = (b) => {
		highQuality = b;
		return lineGenerator;
	}

	lineGenerator.generator = (g) => { // exposes the underlying line generator
		if(!g) return generator;
		generator = g;
		return lineGenerator;
	};

    lineGenerator.report = ()=>{ // reports the difference in the number of points in the original line and the simplified
        return {
            original: originalPoints,
            simplified: simplifiedPoints
        };
    }

	return lineGenerator;
}

module.exports = { simplifiedLine };
