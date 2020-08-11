# _markdown-translate_


_markdown-translate_ - это _wes library_ которая переводит с сохранением формата _markdown_ .


Исходный текст этого _README_ на японском языке. Машины, отличные от японского, переводятся машинным переводом. Пожалуйста, перейдите по ссылкам ниже для машинного перевода на другие языки.


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


## устанавливать


```sh
wes install @wachaon/markdown-translate
```


## использование


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


Пожалуйста, подготовьте _api key_ _google apps script_ самостоятельно.  
_@wachaon/markdown-translate_ генерирует функцию, передавая _api key_ в качестве аргумента.  
Аргументы, переданные в функцию генератора, следующие.


| название  | Тип        | объяснение        |
| --------- | ---------- | ----------------- |
| `api`     | `{String}` | _api key_         |
| `options` | `{Object}` | Варианты перевода |


Следующие члены могут быть установлены в `options` .


| название | Тип        | объяснение                     |
| -------- | ---------- | ------------------------------ |
| `source` | `{String}` | Язык оригинального предложения |
| `target` | `{String}` | Язык переведенного текста      |


## Ограничения на написание


Для пояснения частей, которые переведены, и частей, которые не переведены, существуют ограничения на описание _markdown_ .  
Помимо `Code` и `InlineCode` `Code` , `Emphasis` не переводится. `Emphasis` для имен собственных, которые вы не хотите переводить.
