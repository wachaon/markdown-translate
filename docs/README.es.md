# _markdown-translate_


_markdown-translate_ es una _wes library_ que traduce manteniendo el formato de _markdown_ .


El texto original de este _README_ está en japonés. Las máquinas que no sean japonesas se traducen mediante traducción automática. Consulte los enlaces a continuación para obtener traducciones automáticas en otros idiomas.


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


## Instalar en pc


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


_api key_ usted mismo la _api key_ _google apps script_ .  
_@wachaon/markdown-translate_ genera una función pasando la _api key_ como argumento.  
Los argumentos pasados ​​a la función generadora son los siguientes.


| nombre    | Tipo       | Explicación            |
| --------- | ---------- | ---------------------- |
| `api`     | `{String}` | _api key_              |
| `options` | `{Object}` | Opciones de traducción |


`options` siguientes miembros se pueden configurar en `options` .


| nombre   | Tipo       | Explicación                       |
| -------- | ---------- | --------------------------------- |
| `source` | `{String}` | El idioma de la oración original. |
| `target` | `{String}` | Idioma del texto traducido        |


## Restricciones de escritura


Para aclarar las partes que se traducen y las partes que no se traducen, existen restricciones en la descripción de la _markdown_ .  
Además de `Code` y `InlineCode` `Code` , `Emphasis` no se traduce. `Emphasis` para los nombres propios que no desee traducir.
