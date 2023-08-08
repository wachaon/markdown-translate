// build-ins
import { readFileSync, writeFileSync, existsFileSync } from 'filesystem'
import { resolve, basename, extname, dirname } from 'pathname'
import { LF, CR, NONE } from 'text'
import pipe from 'pipe'
import { greenBright, redBraight, gray, green, clear } from 'ansi'

// unified
import unified from 'unified'
import remarkParse from 'remark-parse'
import gfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkStringify from 'remark-stringify'
import rephypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import visit from 'unist-util-visit'
// import inspect from 'unist-util-inspect'

// wes modules
import generator from 'translate'

const AUTO = 'auto'

// main
export default function markdonw_translate(api, options = {}) {

    // 設定
    const Source = 'src' in options ? options.src : resolve(process.cwd(), 'README.md')
    const Languages = 'langs' in options ? options.langs : ['en']
    const Origin = options.origin
    const Destination = 'dist' in options ? options.dist : dirname(Source)
    const Cache = 'cache' in options ? options.cache : resolve(Destination, 'cache.json')
    const Callback = 'callback' in options ? options.callback : (md) => md

    // ベースとなる README を取得
    const ReadmeMd = readFileSync(Source, AUTO)
    const ReadMeMdAst = fromMarkdown(ReadmeMd)

    // キャッシュ(翻訳済みデータ)の取得
    const CacheJson = existsFileSync(Cache) ? JSON.parse(readFileSync(Cache, 'UTF-8')) : {}

    // 翻訳処理
    let paragraphs
    try {
        // README を段落ごとに分割して、処理をしていく
        paragraphs = ReadMeMdAst.children.map(function ReadMeMdAst_children_map(child) {
            // 段落の取得
            const token = toMarkdown(child)

            // リザルトの定義
            const res = {
                content: token
            }

            // キャッシュがあれば使用する
            if (token in CacheJson) return CacheJson[token]

            // コメントはエスケープする
            if (child.type === 'html' && child.value.startsWith('<!--')) return res

            // `code` は翻訳しない
            if (child.type === 'code') return res

            // キャッシュがあれば利用し、なければ翻訳する
            res.translated = token in CacheJson ? CacheJson[token].translated : {}
            console.log('%S%S%S >>> %S', greenBright, token.trim(), gray, clear)

            // 翻訳とリンクの埋め込み
            Languages.forEach(function (lang) {
                pipe()
                    .use(trim)
                    .use(fromMarkdown)
                    .use(toHast)
                    .use(give)
                    .use(toHtml)
                    .use(trans, { target: lang, source: Origin, contentType: 'html' })
                    .use(fromHtml)
                    .use(toMdast)
                    .use(toMarkdown)
                    .process(token, (err, contents) => {
                        if (err) return console.error(err)
                        console.log('%s %s=>%s\n%s', lang, gray, green, contents)
                        res.translated[lang] = contents
                    })
            })
            CacheJson[token] = res
            return res
        })

    } catch (e) {
        // キャッシュを保存
        console.log(redBraight, e.stack)
        console.log(writeFileSync(Cache, JSON.stringify(CacheJson, null, 4), 'UTF-8'))
    }

    // キャッシュから不要なデータを削除
    Object.keys(CacheJson).forEach(key => {
        const flag = paragraphs.every(paragraph => {
            return paragraph.content !== key
        })
        if (flag) delete CacheJson[key]
    })

    // キャッシュを保存
    console.log(writeFileSync(Cache, JSON.stringify(CacheJson, null, 4), 'UTF-8'))

    const result = {}
    // 各言語別の README を生成し、コールバックを適用後に保存
    Languages.forEach(lang => {
        let translated_markdown = paragraphs.map(paragraph => {
            return 'translated' in paragraph ? paragraph.translated[lang] : paragraph.content
        }).join(LF)

        translated_markdown = Callback(translated_markdown)
        console.log(writeFileSync(genOutputSpec(lang), translated_markdown, 'UTF-8'))
        result[lang] = translated_markdown
    })

    // 戻り値
    return result
    // util
    /**
     * genOutputSpec - 出力ファイルのパスを生成
     * @param {string} lang
     * @returns {string} ファイルパス
     */
    function genOutputSpec(lang) {
        return resolve(Destination, `${basename(Source)}.${lang}${extname(Source)}`)
    }

    /**
     * translate
     * @param {string} content - markdown
     * @param {translate_options} options - 翻訳オプション
     */
    function trans(content, options) {
        return generator(api)(content, options)
    }

}

// util

/**
 * @typedef {object} tree
 * @prop {array} children
 */

/**
 * @typedef {tree} mdast
 */

/**
 * @typedef {tree} hast
 */

/**
 * *markdown* を *mdast* に変換
 * @param {string} markdown - *markdown*
 * @returns {mdast} *mdast*
 */
function fromMarkdown(markdown) {
    return unified()
        .use(remarkParse)
        .use(gfm)
        .parse(markdown)
}

/**
 * *html* を *hast* に変換
 * @param {string} html
 * @returns {hast} *hast*
 */
function fromHtml(html) {
    return unified()
        .use(rephypeParse)
        .parse(html)
}

/**
 * *mdast* を *hast* に変換
 * @param {mdast} mdast - *markdonw* の 抽象構文木
 * @returns {hast} *hast*
 */
function toHast(mdast) {
    return mdast.children[0].type === 'html' ?
        fromHtml(mdast.children[0].value) :
        unified()
            .use(remarkRehype)
            .use(gfm)
            .runSync(mdast)
}

/**
 * *hast* を *html* に変換
 * @param {hast} hast - *html* の 抽象構文木
 * @returns {string} *html*
 */
function toHtml(hast) {
    return unified()
        .use(rehypeStringify)
        .stringify(hast)
}

/**
 * *mdast* を *markdown* に変換
 * @param {mdast} mdast - *html* の 抽象構文木
 * @returns {string} *markdown*
 */
function toMarkdown(mdast) {
    return unified()
        .use(remarkStringify)
        .use(gfm)
        .stringify(mdast)
}

/**
 * *hast* を *mdast* に変換
 * @param {hast} hast
 * @returns {mdast} *mdast*
 */
function toMdast(hast) {
    return unified()
        .use(rehypeRemark)
        .runSync(hast)
}

/**
 * `pipe` のチェーン中のデータ状態をコンソールに表示する
 * @param {*} data
 * @returns {*} data
 */
function log(data, message = '') {
    if (data == null) console.warn('no data')
    console.log('%S => %O', message, data)
    return data
}

/**
 * text の余分な改行を削除する
 * @param {string} text
 * @returns {string}
 */
function trim(text) {
    const res = text.split(CR).join(NONE)
    return res
}

/**
 * hast のノードをトラバースして、`em` と `code` に 属性 `translate = "no"` を付与する
 * @param {*} tree
 * @returns
 */
function give(tree) {
    visit(tree, (node, index, parent) => {
        if (node.tagName === 'em' || node.tagName === 'code') node.properties.translate = 'no'
    })
    return tree
}
