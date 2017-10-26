const { promisify } = require('util');
const path = require('path');
const readFile = promisify(require('fs').readFile);
const cheerio = require('cheerio');
const templateEngine = require('lodash/template');

function buildModule(fileContent, id) {
	const $ = cheerio.load(fileContent);

	const attributes = $('template').attr();
	const rawTemplateHtml = $('template').html();
	const sourceTemplate = rawTemplateHtml.trim();
	const template = templateEngine(sourceTemplate);

	return { id, attributes, template };
}

const loader = async input => {
	const pathObj = path.parse(input);
	if (pathObj.ext !== '.html') throw new Error('You must specify a html file as input');

	const fileContent = await readFile(input, { encoding: 'utf8' });

	return buildModule(fileContent, pathObj.name);
};

module.exports = loader;
