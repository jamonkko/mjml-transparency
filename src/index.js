const requireDir       = require('require-dir')
const appRoot          = require('app-root-path')
const readDirectory    = require('read-directory')
const templateToMjml   = require('./mjml-transparency')
const mjmlToHtml       = require('./mjml')
const htmlToText       = require('html-to-text')

function appendAltText(result, options, templateConfig) {
  if (options === false || templateConfig.htmlToText === false) return result
  if (!result.mjml.html) return result;
  const htmlToTextOptions = templateConfig.htmlToText || options
  const altText = htmlToText.fromString(result.mjml.html, typeof(htmlToTextOptions) === 'boolean' ? undefined : htmlToTextOptions)
  return {...result, altText}
}

module.exports = (options = {dir: appRoot.resolve('/email/templates'), altText: true}) => {
    const templateDir = options.dir
    const templateConfigs  = requireDir(templateDir)
    let templates = readDirectory.sync(templateDir, { filter: '*.mjml' })
    return (templateName, data) => {
      const templateConfig = templateConfigs[templateName]({template: templateName, data})
      const mjml = templateToMjml(templates[templateName], data, templateConfig.directives)
      const result = {
        mjml: mjmlToHtml(mjml),
        params: templateConfig.params
      }
      return appendAltText(result, options.altText, templateConfig)
    }
}
