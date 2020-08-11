# _markdown-translate_


_markdown-translate_ è una _wes library_ che traduce mantenendo il formato di _markdown_ .


Il testo originale di questo _README_ è in giapponese. Le macchine diverse dal giapponese vengono tradotte tramite traduzione automatica. Fare riferimento ai collegamenti seguenti per le traduzioni automatiche in altre lingue.


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


## Installare


```sh
wes install @wachaon/markdown-translate
```


## uso


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


Si prega di preparare da soli la _api key_ _google apps script_ di _google apps script_ .  
_@wachaon/markdown-translate_ genera una funzione passando la _api key_ come argomento.  
Gli argomenti passati alla funzione generatore sono i seguenti.


| nome      | genere     | Spiegazione           |
| --------- | ---------- | --------------------- |
| `api`     | `{String}` | _api key_             |
| `options` | `{Object}` | Opzioni di traduzione |


`options` seguenti membri possono essere impostati nelle `options` .


| nome     | genere     | Spiegazione                     |
| -------- | ---------- | ------------------------------- |
| `source` | `{String}` | La lingua della frase originale |
| `target` | `{String}` | Lingua del testo tradotto       |


## Restrizioni alla scrittura


Al fine di chiarire le parti che vengono tradotte e le parti che non vengono tradotte, sono previste limitazioni sulla descrizione del _markdown_ .  
Oltre al `Code` e al `Code` `InlineCode` , `Emphasis` non traduce. `Emphasis` per i nomi propri che non vuoi tradurre.
