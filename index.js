const { promisify } = require('util');
const glob = promisify(require('glob'));
const loader = require('./lib/loader');
const { createRenderer: _createRenderer } = require('./lib/renderer');

const createRenderer = async ({ input }) => {
	const files = await glob(input);
	const modules = await loader(files);
	return _createRenderer(modules);
};

module.exports = {
	createRenderer
};
