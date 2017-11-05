const cloneDeep = require('lodash/cloneDeep');
const htmlparser = require('htmlparser2');
const domutils = require('domutils');

const replaceElement = (_dom, index, _replacement) => {
	const dom = cloneDeep(_dom);
	const replacement = cloneDeep(_replacement);
	const prev = dom[index-1] || null;
	const next = dom[index+1] || null;
	const parent = dom[index] || null;

	replacement.next = next;
	replacement.prev = prev;
	replacement.parent = parent;

	if (prev) { prev.next = replacement; }
	if (next) { next.prev = replacement; }

	dom[index] = replacement;

	return dom;
}

const renderDomObject = template => {
	let domObject;
	const handler = function (error, dom) {
		domObject = dom;
	}
	const parser = new htmlparser.Parser(new htmlparser.DomHandler(handler));
	parser.write(template);
	parser.end();

	return domObject;	
}

const replaceCustomComponents = (_dom, modules) => {
	const dom = cloneDeep(_dom);
	const moduleNames = Object.keys(modules);
	
	const childrenFixed = dom.map(element => {
		if (element.children) {
			element.children = replaceCustomComponents(element.children, modules)
		}
		return element;
	});

	const list = childrenFixed.reduce((list, element, index) => {
		if (element.type === 'tag' && moduleNames.includes(element.name)) {
			const name = element.name;
			const replacementOrgAttributes = modules[name].attributes;
			const elementAttributes = element.attribs;
			const mergedAttributes = Object.assign({}, replacementOrgAttributes, elementAttributes);
			const replacementDom = renderDomFromTemplate(modules[name], mergedAttributes, modules);
			list.push({index, element: replacementDom[0]});
		}
		 return list;
	}, []);

	return list.reduce((oldDom, replacementObj) => {
		return replaceElement(oldDom, replacementObj.index, replacementObj.element);
	}, dom);
}

const renderDomFromTemplate = (module, attributes, modules) => {
	const template = module.template(attributes);
	const dom = renderDomObject(template);
	const replacedDom = replaceCustomComponents(dom, modules);

	if (replacedDom.length !== 1) {
		throw new Error(`Module ${module.id} does not contain a single root node.`);
	}
	
	return replacedDom;
}

const renderModule = (module, attributes = {}, modules) => {
	const mergedAttributes = Object.assign({}, module.attributes, attributes);
	const dom = renderDomFromTemplate(module, mergedAttributes, modules);
	return domutils.getOuterHTML(dom);
};

const createRenderer = modules => {
	return (moduleId, attributes) => {
		return renderModule(modules[moduleId], attributes, modules);
	}
}

module.exports = {
	createRenderer
};
