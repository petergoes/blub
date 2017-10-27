const templateEngine = (string) => {
	const regex = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	const wordRE = /^[a-zA-Z]+$/;
	const matches = string.match(regex);
	const attributes = matches
		.map(match => match.substr(2).substring(0, match.length-3)) //remove ${ and }
		.filter(match => wordRE.test(match)) // allow only alphanumeric expressions
		.map(attribute => `var ${attribute} = options.${attribute};`);

	return Function("options", `
		${attributes.join('')}
		return \`${string}\`
		`);
};

module.exports = templateEngine;
