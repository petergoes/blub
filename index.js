const loader = require('./lib/loader');
const { renderModule } = require('./lib/renderer');

const blub = async ({ input }) => {
	const modules = await loader(input);

	console.log(renderModule(modules));
};

module.exports = blub;
