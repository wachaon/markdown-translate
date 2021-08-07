const remark = require('remark')()
const rehype = require('rehype')()
const remark2rehype = require('remark-rehype')()
const rehype2remark = require('rehype-remark')()
const visit = require('unist-util-visit')
const u = require('unist-builder')

const { cursorHrAbs } = require('ansi')
const genGUID = require('genGUID')
const genTtranslate = require('translate')


function translator (api, md, opts) {
    const options = opts || { target: 'en' }
    let mdast = rehype2remark(remark2rehype(remark.parse(md)))
    const length = mdast.children.length
    let processed = 0
    progress(length, processed)
    const codes = {}
    visit(mdast, (node, index, parent) => {
        if (node.type === 'code') {
            const id = genGUID()
            codes[id] = node
            parent.children[index] = u('code', {
                value: id,
                lang: 'translate' + id
            })
        }
    })
    const toTranslate = genTtranslate(api, { contentType: 'html' })
    mdast.children = mdast.children.map((child, i) => {
        try {
            if (child == null || child.type == null) return void 0
            if (child.type === 'html' || child.type === 'definition') return child

            const hast = remark2rehype(child)
            const modified_hast = addNoTranslateAttribute(hast)
            const html = rehype.stringify(modified_hast)
            const translated_html = toTranslate(html, options)
            const translated_hast = rehype.parse(translated_html)
            const translated_mdast = rehype2remark(translated_hast)

            visit(translated_mdast, (node, index, parent) => {
                if (node.type === 'code' && node.lang && node.lang.startsWith('translate')) {
                    const id = node.lang.replace('translate', '')
                    parent.children[index] = codes[id]
                }
            })
            progress(length, ++processed)

            return translated_mdast
        } catch (e) {
            console.log('\ncodes // => %O', codes)
            console.log('error child: %O', child)
            throw e
        }
    })
    return remark.stringify(mdast, {emphasis: '*'})
}

function progress (denominator, numerator) {
    console.print(cursorHrAbs(1))
    let bar = '|--------------------|'
    const proc = Math.ceil(numerator / denominator * 20)
    if (numerator === denominator) return console.log('|********************| completed')
    const percent = Math.ceil(numerator / denominator * 100) + '%'
    for (let i = 0; i < proc; i++) bar = bar.replace('-', '*')
    return console.print(bar + ' ' + percent)
}

function addNoTranslateAttribute(ast) {
    visit(ast, (node, index, parent) => {
        if (node.tagName === 'code' || node.tagName === 'em') {
            if (node.properties == null) node.properties = { translate: 'no' }
            else node.properties.translate = 'no'
        }
    })
    return ast
}

module.exports = translator
