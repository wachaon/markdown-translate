# _markdown-translate_


_markdown-translate_ is a _wes library_ that translates while maintaining the format of _markdown_ .


The original text of this _README_ is in Japanese. Machines other than Japanese are translated by machine translation. Please refer to the links below for machine translations in other languages.


+  [*简化版*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.zh-CN.md)
+  [*傳統的*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.zh-TW.md)
+  [*English*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.en.md)
+  [*हिन्दी*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.hi.md)
+  [*Español*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.es.md)
+  [*عربى*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.ar.md)
+  [*বাংলা*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.bn.md)
+  [*Português*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.pt.md)
+  [*русский*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.ru.md)
+  [*Deutsche*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.de.md)
+  [*français*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.fr.md)
+  [*italiano*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.it.md)


## Install


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


Please prepare the _api key_ _google apps script_ by yourself.  
_@wachaon/markdown-translate_ generates a function by passing _api key_ as an argument.  
The arguments passed to the generator function are as follows.


| name      | Type       | Explanation         |
| --------- | ---------- | ------------------- |
| `api`     | `{String}` | _api key_           |
| `options` | `{Object}` | Translation options |


`options` following members can be set in `options` .


| name     | Type       | Explanation                           |
| -------- | ---------- | ------------------------------------- |
| `source` | `{String}` | The language of the original sentence |
| `target` | `{String}` | Language of translated text           |


## Restrictions on writing


In order to clarify the parts that are translated and the parts that are not translated, the _markdown_ description is restricted.  
Besides `Code` and `InlineCode` `Code` , `Emphasis` does not translate. `Emphasis` for proper nouns you don't want to translate.
