# *markdown-translate*

*markdown-translate* は *markdown* の書式を維持しながら翻訳する [*wes*](https://github.com/wachaon/wes) 用のライブラリです。

この *README* の原文は日本語になります。日本語以外は機械翻訳の文章になります。
他言語の文章は下記から選択してください。

+  [*日本語*](/README.md) <!-- 日本語 -->
+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->

## インストール

```sh
wes install @wachaon/markdown-translate --bare
```

## usage

*google apps script* でプロジェクトを作成して次の `doPost` 関数を定義してデプロイしてください。

```javascript
function doPost(event_object) {
    const { content, source, target, contentType } = JSON.parse(event_object.postData.getDataAsString())
    const result = LanguageApp.translate(content, source, target, { contentType })
 
    const output = ContentService.createTextOutput()
    output.setMimeType(ContentService.MimeType.JSON)
    output.setContent(JSON.stringify({ result }))
 
    return output;
}
```

*google apps script* デプロイして生成された *url* を *api key* として *markdown-translate* に渡してください。

```javascript
import { readFileSync } from 'filesystem'
import { resolve } from 'pathname'

import translate from 'markdown-translate'

const { api } = readFileSync(resolve(process.cwd(), 'api.json'), 'auto')
const options = {
    src: resolve(process.cwd(), 'docs', 'README.md'),
    langs: ['en', 'fr']
}

translate(api, options)
```
## 仕様

*markdown-translate* に渡す引数は次になります。

| 名前      | 型         | 説明           |
| --------- | ---------- | -------------- |
| `api`     | `{string}` | *api key*      |
| `options` | `{object}` | オプション引数 |

`options` は以下のメンバーの設定が出来ます。

| 名前       | 型           | 説明                     | 既定値                                |
| ---------- | ------------ | ------------------------ | ------------------------------------- |
| `src`      | `{string}`   | 原文のファイルパス       | `resolve(process.cwd(), 'README.md')` |
| `origin`   | `{string}`   | 原文の言語               | `undefinde`                           |
| `dist`     | `{string}`   | 出力先のディレクトリパス | `dirname(src)`                        |
| `langs`    | `{string[]}` | 翻訳する言語             | `['en']`                              |
| `cache`    | `{string}`   | 翻訳履歴のファイルパス   | `resolve(Dist, 'cache.json')`         |
| `callback` | `{function}` | 翻訳後に呼び出す関数     | `(md) => md`                          |

## 文章作成でのルール

*markdown-translate* では意図的に翻訳しない要素があります。
`Code` と `InlineCode` は翻訳しません。また `Emphasis` も翻訳しません。  
`Emphasis` は翻訳したくない固有名詞に使用してください。
