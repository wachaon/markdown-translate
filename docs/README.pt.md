# _markdown-translate_


_markdown-translate_ é uma _wes library_ que traduz enquanto mantém o formato do _markdown_ .


O texto original deste _README_ está em japonês. Outras máquinas além do japonês são traduzidas por tradução automática. Consulte os links abaixo para traduções automáticas em outros idiomas.


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

## Instalar


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


Prepare a _api key_ _google apps script_ _api key_ _google apps script_ por conta própria.  
_@wachaon/markdown-translate_ gera uma função passando a _api key_ como um argumento.  
Os argumentos passados ​​para a função geradora são os seguintes.


| nome      | Tipo       | Explicação         |
| --------- | ---------- | ------------------ |
| `api`     | `{String}` | _api key_          |
| `options` | `{Object}` | Opções de tradução |


`options` seguintes membros podem ser definidos em `options` .


| nome     | Tipo       | Explicação                 |
| -------- | ---------- | -------------------------- |
| `source` | `{String}` | O idioma da frase original |
| `target` | `{String}` | Língua do texto traduzido  |


## Restrições na escrita


A fim de esclarecer as partes que são traduzidas e as partes que não são traduzidas, existem restrições na descrição do _markdown_ .  
Além do `Code` e do `InlineCode` `Code` , o `Emphasis` não traduz. `Emphasis` para nomes próprios que você não deseja traduzir.
