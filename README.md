# *markdown-translate*

*markdown-translate* は *markdown* の体裁を比較的維持しながら翻訳する *wes library* です。

この [*README*](../README.md) の原文は日本語になります。日本語以外は機械翻訳の文章になります。
他言語の文章は下記から選択してください。

<!-- translator imports("links.md") -->

## インストール

```sh
wes install @wachaon/markdown-translate
```

## usage

```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```

*google apps script* の *api key* は自身でご用意ください。  
*@wachaon/markdown-translate* は *api key* を引数に渡して関数を生成します。  
ジェネレーター関数に渡す引数は以下になります。

| 名前      | 型         | 説明             |
|-----------|------------|------------------|
| `api`     | `{String}` | *api key*        |
| `options` | `{Object}` | 翻訳のオプション |

`options` は以下のメンバーの設定が出来ます。

| 名前     | 型         | 説明               |
|----------|------------|--------------------|
| `source` | `{String}` | もとの文章の言語   |
| `target` | `{String}` | 翻訳後の文章の言語 |

## 文章作成でのルール

`Code` と `InlineCode` は翻訳しません。また `Emphasis` も翻訳しません。  
`Emphasis` は翻訳したくない固有名詞に使用してください。
