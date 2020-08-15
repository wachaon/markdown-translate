const remark = require("remark")()
const rehype = require("rehype")()
const remark2rehype = require("remark-rehype")()
const rehype2remark = require("rehype-remark")()
const visit = require("unist-util-visit")
const u = require("unist-builder")

const { eraseInLine, cursorHrAbs } = require("ansi")
const genGUID = require("genGUID")

const CODE = "code"
const TRANSLATE = "translate"
const HTML = "html"
const NO = "no"
const EM = "em"
const NONE = ""
const LF = "\n"
const SEP = "|"

function gen_translator(api, options = {}) {
    options.contentType = HTML
    const gen = require(TRANSLATE)

    return function translator(markdown, opts) {
        const op = Object.assign(options, opts)

        const translate = gen(api, op)

        const mdast = remark.parse(markdown)

        const codes = {}

        visit(mdast, (node, index, parent) => {
            if (
                node.type === CODE ||
                (node.type === HTML &&
                    node.value &&
                    node.value.startsWith("<!--"))
            ) {
                const id = genGUID()
                codes[id] = node
                parent.children[index] = u(CODE, {
                    value: "",
                    lang: TRANSLATE + id,
                })
            }
        })

        const hast = remark2rehype(mdast)

        visit(hast, (node, index, parent) => {
            if (node.tagName === CODE || node.tagName === EM) {
                node.properties = node.properties || {}
                node.properties.translate = NO
            }
        })

        let list = [NONE]

        hast.children.forEach((child, i) => {
            const html = rehype.stringify(child)

            const len = list[list.length - 1].length
            if (len + html.length > 1000) list.push(html)
            else list[list.length - 1] += html
        })

        list = list.map((line, i) => {
            progress(list.length, i, line.split(/\r?\n/)[0])
            return translate(line)
        })

        const _mdast = rehype2remark(rehype.parse(list.join(LF)))

        visit(_mdast, (node, index, parent) => {
            if (
                node.type === CODE &&
                node.lang &&
                node.lang.startsWith(TRANSLATE)
            ) {
                const id = node.lang.replace(TRANSLATE, NONE)
                parent.children[index] = codes[id]
            }
        })

        return remark.stringify(_mdast)
    }
}

// util
function progress(len, index, message) {
    const i = index + 1
    const rate = i === 0 ? 0 : i === len ? 1 : index / len
    const percent = ("   " + String(Math.floor(rate * 100)) + "%").slice(-4)
    const bar = Math.floor(rate * 20)
    let prog = ("*".repeat(20) + "-".repeat(20 - bar)).slice(-20)
    prog = SEP + prog.slice(0, 10) + SEP + prog.slice(10, 20) + SEP
    const msg =
        message != null
            ? message.length > 30
                ? message.slice(0, 28) + "..."
                : message
            : NONE
    console.print(`${cursorHrAbs(0)}${eraseInLine(0)}${prog} ${percent} ${msg}`)
    if (rate === 1)
        console.print(
            `${cursorHrAbs(0)}${eraseInLine(0)}${prog} ${percent} Completed.\n`
        )
}

module.exports = gen_translator
