# *markdown-translate*


*markdown-translate*是一個*wes library* ，可在翻譯時保持*markdown*的格式。


該*README*文件的原文是日文。日語以外的機器通過機器翻譯進行翻譯。請參閱以下鏈接以獲取其他語言的機器翻譯。


-   [*简化版*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.zh-CN.md)
-   [*傳統的*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.zh-TW.md)
-   [*English*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.en.md)
-   [*हिन्दी*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.hi.md)
-   [*Espa�ol*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.es.md)
-   [*عربى*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.ar.md)
-   [*বাংলা*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.bn.md)
-   [*Portugu�s*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.pt.md)
-   [*русский*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.ru.md)
-   [*Deutsche*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.de.md)
-   [*fran�ais*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.fr.md)
-   [*italiano*](https://github.com/wachaon/markdown-translate/blob/master/docs/README.it.md)


## 安裝


```sh
wes install @wachaon/markdown-translate
```


## 用法


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


請*api key*準備*google apps script*的*api key* 。  
*@wachaon/markdown-translate*通過將*api key*作為參數傳遞來生成函數。  
傳遞給生成器函數的參數如下。


| 名稱        | 類型         | 說明        |
| --------- | ---------- | --------- |
| `api`     | `{String}` | *api key* |
| `options` | `{Object}` | 翻譯選項      |


可以在`options`設置以下成員。


| 名稱       | 類型         | 說明      |
| -------- | ---------- | ------- |
| `source` | `{String}` | 原始句子的語言 |
| `target` | `{String}` | 翻譯文字的語言 |


## 寫作限制


為了闡明翻譯的部分和未翻譯的部分， *markdown*說明有限制。  
除了`Code`和“ `InlineCode` `Code` ， `Emphasis`也不翻譯。對不想翻譯的專有名詞`Emphasis` 。
