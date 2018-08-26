const Transparency = require('transparency')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

const defaultMatcher = Transparency.matcher

Transparency.matcher = function(element, key) {
  return mjClassMatches(element.el.getAttribute('mj-class'), key) || defaultMatcher(element, key)
}

module.exports = function(mjml, context={}, directives) {
    if (!context || Object.keys(context).length == 0) return mjml
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
    const template = xmlHeader + mjml
    const dom = new JSDOM(template, { contentType: "text/xml" })
    for (let [name, data] of Object.entries(context)) {
      for (let element of dom.window.document.getElementsByClassName(name)) {
        Transparency.render(element, data, directives[name])
      }
    }
    return dom.window.document.getElementsByTagName('mjml')[0].outerHTML;
}

function isString(value) { 
  return typeof value === 'string' || value instanceof String
}

function mjClassMatches(mjClassesAttribute, key) { 
  if (!mjClassesAttribute || !(isString(mjClassesAttribute))) return false 
  const mjClasses = mjClassesAttribute.split(' ')
  return mjClasses.indexOf(key) != -1
}
