# _markdown-translate_


_markdown-translate_ একটি হল _wes library_ যখন বিন্যাস বজায় রাখার অনূদিত করে _markdown_ ।


এই _README_ এর মূল পাঠ্যটি জাপানি ভাষায়। জাপানি ছাড়া অন্য মেশিনগুলি মেশিন অনুবাদ দ্বারা অনুবাদ করা হয়। অন্যান্য ভাষায় মেশিনের অনুবাদগুলির জন্য দয়া করে নীচের লিঙ্কগুলি দেখুন।


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


## ইনস্টল করুন


```sh
wes install @wachaon/markdown-translate
```


## ব্যবহার


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


_google apps script_ _api key_ নিজে নিজে তৈরি করুন।  
_@wachaon/markdown-translate_ একটি আর্গুমেন্ট হিসাবে _api key_ পাস করে একটি ফাংশন তৈরি করে।  
জেনারেটর ফাংশনে পাস হওয়া আর্গুমেন্টগুলি নিম্নরূপ।


| নাম       | আদর্শ      | ব্যাখ্যা      |
| --------- | ---------- | ------------- |
| `api`     | `{String}` | _api key_     |
| `options` | `{Object}` | অনুবাদ বিকল্প |


নিম্নলিখিত সদস্যদের `options` সেট করা যেতে পারে।


| নাম      | আদর্শ      | ব্যাখ্যা                       |
| -------- | ---------- | ------------------------------ |
| `source` | `{String}` | মূল বাক্যটির ভাষা              |
| `target` | `{String}` | অনুবাদিত পাঠ্যের ভাষা Language |


## লেখার উপর বিধিনিষেধ


যে অংশগুলি অনুবাদ করা হয়েছে এবং যে অংশগুলি অনূদিত হয়নি সেগুলি স্পষ্ট করতে, _markdown_ বর্ণনার উপর বিধিনিষেধ রয়েছে।  
`Code` এবং `InlineCode` `Code` ছাড়াও, `Emphasis` অনুবাদ করে না। আপনি অনুবাদ করতে চান না এমন যথাযথ বিশেষ্যগুলির জন্য `Emphasis` দিন।
