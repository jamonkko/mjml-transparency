const Transparency = require('transparency')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

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
