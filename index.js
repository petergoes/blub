const loader = require('./lib/loader');

const blub = async ({ input }) => {
	const modules = await loader(input);
	console.log(modules);
};

module.exports = blub;
