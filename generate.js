const YAML = require('yaml').default
const fs = require('fs')
const template = require('lodash.template')

// functions
const readErrors = () => {
    const file = fs.readFileSync('./errors.yaml', 'utf8')
    return YAML.parse(file)
}

const readTemplate = () => fs.readFileSync('./template.html', 'utf8')

const renderer = (tmpl) => template(tmpl)

// generate templates
const errors = readErrors()
const tmpl = readTemplate()
const render = renderer(tmpl)
for (error of errors) {
    [code, text] = Object.entries(error)[0]
    console.log(`Processing ${code}...`)

    const output = render({ code, text })
    fs.writeFileSync(`./dist/${code}.html`, output)
}