const { promisify } = require('util');
const glob = promisify(require('glob'));
const loader = require('./lib/loader');
const { renderModule } = require('./lib/renderer');

const blub = async ({ input }) => {
	const files = await glob(input);
	const modules = await loader(files);

	// console.log(renderModule(modules));
	console.log(modules);
};

module.exports = blub;
