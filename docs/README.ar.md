# _markdown-translate_


_markdown-translate_ هي _wes library_ تقوم بالترجمة مع الحفاظ على تنسيق _markdown_ .


النص الأصلي لهذا _README_ باللغة اليابانية. تتم ترجمة الآلات غير اليابانية عن طريق الترجمة الآلية. يرجى الرجوع إلى الروابط أدناه للحصول على ترجمات آلية بلغات أخرى.


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


## تثبيت


```sh
wes install @wachaon/markdown-translate
```


## الاستخدام


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


يرجى تجهيز _api key_ _google apps script_ بنفسك.  
_@wachaon/markdown-translate_ وظيفة عن طريق تمرير _api key_ كوسيطة.  
يتم تمرير الوسائط إلى وظيفة المولد كما يلي.


| اسم       | نوع        | تفسير          |
| --------- | ---------- | -------------- |
| `api`     | `{String}` | _api key_      |
| `options` | `{Object}` | خيارات الترجمة |


يمكن تعيين الأعضاء التالية في `options` .


| اسم      | نوع        | تفسير              |
| -------- | ---------- | ------------------ |
| `source` | `{String}` | لغة الجملة الأصلية |
| `target` | `{String}` | لغة النص المترجم   |


## قيود على الكتابة


من أجل توضيح الأجزاء المترجمة والأجزاء التي لم تتم ترجمتها ، هناك قيود على وصف _markdown_ .  
إلى جانب `Code` والتعليمات `Code` `InlineCode` ، لا يترجم `Emphasis` . `Emphasis` لأسماء العلم التي لا تريد ترجمتها.
