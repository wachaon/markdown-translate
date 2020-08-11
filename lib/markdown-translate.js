const remark = require("remark")()
const rehype = require("rehype")()
const remark2rehype = require("remark-rehype")()
const rehype2remark = require("rehype-remark")()
const visit = require("unist-util-visit")
const u = require("unist-builder")

const { eraseInLine, cursorHrAbs } = require("ansi")
const genGUID = require("genGUID")
const genTtranslate = require("translate")

const codes = {}

/**
 * @param {String} api - google apps script api key
 * @param {Object} options - translate options
 */
function genMarkdownTranslate(api, options = {}) {
    options.contentType = "html"
    const toTranslate = genTtranslate(api, options)

    return markdownTranslate
    /**
     * @param {String} md - input markdown string
     * @param {Object} opts - translate opts
     */
    function markdownTranslate(md, opts) {
        const mdast = rehype2remark(remark2rehype(remark.parse(md)))

        let indicator = "-".repeat(mdast.children.length)

        visit(mdast, (node, index, parent) => {
            if (node.type === "code") {
                const id = genGUID()
                codes[id] = node
                parent.children[index] = u("code", {
                    value: id,
                    lang: "translate" + id,
                })
            }
        })
        mdast.children = mdast.children.map((child, i) => {
            indicator = indicator.replace("-", "+")
            const print = cursorHrAbs(0) + eraseInLine(0) + indicator
            try {
                if (child == null || child.type == null) return void 0
                if (child.type === "html" || child.type === "definition") {
                    progress(mdast.children.length, i, remark.stringify(child))
                    return child
                }
                const hast = remark2rehype(child)
                const modified_hast = addNoTranslateAttribute(hast)
                const html = rehype.stringify(modified_hast)
                const translated_html = toTranslate(html, opts)
                const translated_hast = rehype.parse(translated_html)
                const translated_mdast = rehype2remark(translated_hast)

                visit(translated_mdast, (node, index, parent) => {
                    if (
                        node.type === "code" &&
                        node.lang &&
                        node.lang.startsWith("translate")
                    ) {
                        const id = node.lang.replace("translate", "")
                        parent.children[index] = codes[id]
                    }
                })
                progress(mdast.children.length, i, remark.stringify(child))
                return translated_mdast
            } catch (e) {
                console.log("\ncodes // => %O", codes)
                console.log("error child: %O", child)
                throw e
            }
        })
        const translated_md = remark.stringify(mdast, {emphasis: '*'})
        let res = translated_md
        return res
    }
}

// util
function addNoTranslateAttribute(ast) {
    visit(ast, (node, index, parent) => {
        if (node.tagName === "code" || node.tagName === "em") {
            if (node.properties == null) node.properties = { translate: "no" }
            else node.properties.translate = "no"
        }
    })
    return ast
}

function progress(len, index, message) {
    const i = index + 1
    const rate = i === 0 ? 0 : i === len ? 1 : index / len
    const percent = ("   " + String(Math.floor(rate * 100)) + "%").slice(-4)
    const bar = Math.floor(rate * 20)
    let prog = ("********************" + "-".repeat(20 - bar)).slice(-20)
    prog = "|" + prog.slice(0, 10) + "|" + prog.slice(10, 20) + "|"
    const msg =
        message != null
            ? message.length > 30
                ? message.slice(0, 28) + "..."
                : message
            : ""
    console.print(`${cursorHrAbs(0)}${eraseInLine(0)}${prog} ${percent} ${msg}`)
    if (rate === 1) console.print("\n")
}

module.exports = genMarkdownTranslate
