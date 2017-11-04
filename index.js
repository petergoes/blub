const { promisify } = require('util');
const glob = promisify(require('glob'));
const loader = require('./lib/loader');
const { createRenderer } = require('./lib/renderer');

const blub = async ({ input }) => {
	const files = await glob(input);
	const modules = await loader(files);
	const renderer = createRenderer(modules);

	console.log(renderer('my-component'));
	// console.log(modules);
};

module.exports = blub;
