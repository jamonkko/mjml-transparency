const requireDir       = require('require-dir')
const appRoot          = require('app-root-path')
const readDirectory    = require('read-directory')
const templateToMjml   = require('./mjml-transparency')
const mjmlToHtml       = require('./mjml')

module.exports = (options = {dir: appRoot.resolve('/email/templates')}) => {
    const templateDir = options.dir
    const directives = requireDir(templateDir)
    let templates = readDirectory.sync(templateDir, { filter: '*.mjml' })
    return (templateName, context) => {
      const mjml = templateToMjml(templates[templateName], context, directives[templateName])
      return mjmlToHtml(mjml)
    }
}
