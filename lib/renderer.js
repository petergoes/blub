const renderModule = module => {
	return module.template(module.attributes);
};

module.exports = {
	renderModule,
};
