# _markdown-translate_


_markdown-translate_ ist eine _wes library_ , die unter Beibehaltung des _markdown_ Formats übersetzt.


Der Originaltext dieser _README_ ist in Japanisch. Andere Maschinen als Japanisch werden durch maschinelle Übersetzung übersetzt. Informationen zu maschinellen Übersetzungen in andere Sprachen finden Sie unter den folgenden Links.


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


## Installieren


```sh
wes install @wachaon/markdown-translate
```


## Verwendung


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


Bitte bereiten Sie den _api key_ _google apps script_ selbst vor.  
_@wachaon/markdown-translate_ generiert eine Funktion, indem der _api key_ als Argument übergeben wird.  
Die an die Generatorfunktion übergebenen Argumente lauten wie folgt.


| Name      | Art        | Erläuterung          |
| --------- | ---------- | -------------------- |
| `api`     | `{String}` | _api key_            |
| `options` | `{Object}` | Übersetzungsoptionen |


`options` folgenden Mitglieder können in `options` .


| Name     | Art        | Erläuterung                           |
| -------- | ---------- | ------------------------------------- |
| `source` | `{String}` | Die Sprache des ursprünglichen Satzes |
| `target` | `{String}` | Sprache des übersetzten Textes        |


## Schreibbeschränkungen


Um zu verdeutlichen, welche Teile übersetzt und welche nicht übersetzt werden, gibt es Einschränkungen bei der Beschreibung der _markdown_ .  
Neben `Code` und `InlineCode` `Code` wird `Emphasis` nicht übersetzt. `Emphasis` für Eigennamen, die Sie nicht übersetzen möchten.
