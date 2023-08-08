# *markdown-translate*

*markdown-translate* is *wes library* that translates while relatively preserving the appearance of *markdown* .

The original text of this [*README*](/README.md) will be in Japanese. Texts other than Japanese will be machine translated. For texts in other languages, please select from the options below.

+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->

## install

```sh
wes install @wachaon/markdown-translate --bare
```

## usage

Create a project with *google apps script* , define the following `doPost` function and deploy it.

```javascript
function doPost(event_object) {
    const parameter = JSON.parse(event_object.postData.getDataAsString());
    const result = LanguageApp.translate(
        parameter.content,
        parameter.source,
        parameter.target,
        { contentType: parameter.contentType }
    );
 
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({ result }));
 
    return output;
}
```

Pass *url* generated by deploying *google apps script* to *markdown-translate* as *api key* .

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

## specification

The arguments to pass to *markdown-translate* are:

| name      | type       | explanation        |
| --------- | ---------- | ------------------ |
| `api`     | `{string}` | *api key*          |
| `options` | `{object}` | optional arguments |

`options` can set the following members.

| name     | type         | explanation                   | Specified value                       |
| -------- | ------------ | ----------------------------- | ------------------------------------- |
| `src`    | `{string}`   | original file path            | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | source language               | `undefinde`                           |
| `dist`   | `{string}`   | Output directory path         | `dirname(src)`                        |
| `langs`  | `{string[]}` | language to translate         | `['en']`                              |
| `cache`  | `{string}`   | Translation history file path | `resolve(Dist, 'cache.json')`         |

## rules for writing

Some elements are intentionally not translated by *markdown-translate* . `Code` and `InlineCode` do not translate. Nor does `Emphasis` translate.\
Use `Emphasis` for proper nouns you don't want translated.