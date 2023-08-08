// build-ins
import { resolve } from 'pathname'

// modules
import { default as markdonw_translate } from 'markdown-translate'

// api の取得
const { api } = require('account')

const opts = {
    langs: [
        ['英語', 'en'],
        ['中国語 (繁体字)', 'zh-TW'],
        ['スペイン語', 'es'],
        ['ドイツ語', 'de'],
        ['フランス語', 'fr'],
        ['イタリア語', 'it'],
        ['ロシア語', 'ru'],
    ].map(lang => lang[1]),
    dist: resolve(process.cwd(), 'docs')
}

markdonw_translate(api, opts)
