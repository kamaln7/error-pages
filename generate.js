const YAML = require('yaml').default
const fs = require('fs')
const template = require('lodash.template')

// functions
const readFile = (path) => fs.readFileSync(path, 'utf8')
const readErrors = (path) => YAML.parse(readFile(path))

// generate templates
const errors = readErrors('./errors.yaml')
const tmpl = readFile('./template.html')
const render = template(tmpl)

for (error of errors) {
    [code, text] = Object.entries(error)[0]
    console.log(`Processing ${code}...`)

    const output = render({ code, text })
    fs.writeFileSync(`./dist/${code}.html`, output)
}