const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);
const cheerio = require('cheerio');
const path = require('path');
const templateEngine = require('lodash/template');

const blub = async ({input}) => {
	const pathObj = path.parse(input);
	if (pathObj.ext !== '.html') throw new Error('You must specify a html file as input');

	const fileContent = await readFile(input, {encoding: 'utf8'});
	const $ = cheerio.load(fileContent);

	const id = pathObj.name;
	const attributes = $('template').attr();
	const sourceTemplate = $('template').html().trim();
	const template = templateEngine($('template').html().trim());
	const html = template(attributes);

	const moduleObj = {
		id, attributes, sourceTemplate, template, html
	}

	console.log(moduleObj);
}

module.exports = blub
