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
    dist: resolve(process.cwd(), 'docs'),
    callback: (md) => md.replace("<!-- translate links document -->", contents)
}

const contents = `+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->`

markdonw_translate(api, opts)
