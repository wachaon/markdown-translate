# *markdown-translate*


*markdown-translate*是一个*wes library* ，可在翻译时保持*markdown*的格式。


该*README*文件的原文是日文。日语以外的机器通过机器翻译进行翻译。请参考以下链接以获取其他语言的机器翻译。


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


## 安装


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


请自行准备*google apps script*的*api key* 。  
*@wachaon/markdown-translate*通过将*api key*作为参数传递来生成函数。  
传递给生成器函数的参数如下。


| 名称        | 类型         | 说明        |
| --------- | ---------- | --------- |
| `api`     | `{String}` | *api key* |
| `options` | `{Object}` | 翻译选项      |


可以在`options`设置以下成员。


| 名称       | 类型         | 说明      |
| -------- | ---------- | ------- |
| `source` | `{String}` | 原始句子的语言 |
| `target` | `{String}` | 翻译文字的语言 |


## 写作限制


为了阐明翻译的部分和未翻译的部分， *markdown*说明有限制。  
除了`Code`和“ `InlineCode` `Code` ， `Emphasis`也不翻译。对不想翻译的专有名词`Emphasis` 。
