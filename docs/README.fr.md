# _markdown-translate_


_markdown-translate_ est une _wes library_ qui traduit tout en conservant le format de _markdown_ .


Le texte original de ce _README_ est en japonais. Les machines autres que le japonais sont traduites par traduction automatique. Veuillez vous référer aux liens ci-dessous pour les traductions automatiques dans d'autres langues.


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


## Installer


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


Veuillez préparer vous-même la _api key_ _google apps script_ .  
_@wachaon/markdown-translate_ génère une fonction en passant la _api key_ comme argument.  
Les arguments passés à la fonction de générateur sont les suivants.


| Nom       | Type       | Explication           |
| --------- | ---------- | --------------------- |
| `api`     | `{String}` | _api key_             |
| `options` | `{Object}` | Options de traduction |


`options` membres suivants peuvent être définis dans les `options` .


| Nom      | Type       | Explication                      |
| -------- | ---------- | -------------------------------- |
| `source` | `{String}` | La langue de la phrase originale |
| `target` | `{String}` | Langue du texte traduit          |


## Restrictions d'écriture


Afin de clarifier les parties qui sont traduites et les parties qui ne sont pas traduites, il existe des restrictions sur la description de _markdown_ .  
Outre le `Code` et le `Code` `InlineCode` , `Emphasis` ne traduit pas. `Emphasis` pour les noms corrects que vous ne voulez pas traduire.
