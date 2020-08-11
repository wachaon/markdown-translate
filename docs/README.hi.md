# _markdown-translate_


_markdown-translate_ एक _wes library_ जो _markdown_ के प्रारूप को बनाए रखते हुए अनुवाद करता है।


इस _README_ का मूल पाठ जापानी में है। जापानी के अलावा अन्य मशीनों का अनुवाद मशीन अनुवाद द्वारा किया जाता है। कृपया अन्य भाषाओं में मशीन अनुवाद के लिए नीचे दिए गए लिंक देखें।


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


## इंस्टॉल


```sh
wes install @wachaon/markdown-translate
```


## प्रयोग


```javascript
const { readTextFileSync } = require('filesystem')
const gen = require('@wachaon/markdown-translate')
const { api } = require('/account')

const md = readTextFileSync('README.md')

const toEnglish = gen(api, { source: 'ja', target: 'en'})
console.log(toEnglish(md))
```


कृपया अपने आप _api key_ _google apps script_ की _api key_ तैयार करें।  
_@wachaon/markdown-translate_ एक तर्क के रूप में _api key_ पारित करके एक कार्य उत्पन्न करता है।  
जनरेटर फ़ंक्शन के लिए दिए गए तर्क निम्नानुसार हैं।


| नाम       | प्रकार     | व्याख्या         |
| --------- | ---------- | ---------------- |
| `api`     | `{String}` | _api key_        |
| `options` | `{Object}` | अनुवाद के विकल्प |


निम्नलिखित सदस्यों को `options` में सेट किया जा सकता है।


| नाम      | प्रकार     | व्याख्या           |
| -------- | ---------- | ------------------ |
| `source` | `{String}` | मूल वाक्य की भाषा  |
| `target` | `{String}` | अनूदित पाठ की भाषा |


## लिखने पर प्रतिबंध


आदेश भागों है कि अनुवाद कर रहे हैं और कुछ हिस्सों कि अनुवाद नहीं कर रहे हैं स्पष्ट करने के लिए, वहाँ पर प्रतिबंध है _markdown_ विवरण।  
`Code` और `InlineCode` `Code` अलावा, `Emphasis` अनुवाद नहीं करता है। उचित संज्ञा के लिए `Emphasis` जिसका आप अनुवाद नहीं करना चाहते हैं।
