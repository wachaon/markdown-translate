# *markdown-translate*

*markdown-translate*是一個庫，供[*wes*](https://github.com/wachaon/wes)在保持*markdown*格式的同時進行翻譯。

本自述*README*的原始文本是日語。日語以外的文本將被機器翻譯。對於其他語言的文本，請從以下選項中進行選擇。

*   [*日本語*](/README.md)
*   [*English*](/docs/README.en.md)
*   [*繁体字*](/docs/README.zh-TW.md)
*   [*Español*](/docs/README.es.md)
*   [*Deutsch*](/docs/README.de.md)
*   [*français*](/docs/README.fr.md)
*   [*русский язык*](/docs/README.ru.md)

## 安裝

```sh
wes install @wachaon/markdown-translate --bare
```

## 用法

使用*google apps script*創建一個項目，定義以下`doPost`函數並部署它。

```javascript
function doPost(event_object) {
    const { content, source, target, contentType } = JSON.parse(event_object.postData.getDataAsString())
    const result = LanguageApp.translate(content, source, target, { contentType })
 
    const output = ContentService.createTextOutput()
    output.setMimeType(ContentService.MimeType.JSON)
    output.setContent(JSON.stringify({ result }))
 
    return output;
}
```

將部署*google apps script*生成的*url*作為*api key*傳遞給*markdown-translate* 。

```javascript
import { readFileSync } from 'filesystem'
import { resolve } from 'pathname'

import translate from 'markdown-translate'

const { api } = readFileSync(resolve(process.cwd(), 'api.json'), 'auto')
const options = {
    src: resolve(process.cwd(), 'docs', 'README.md'),
    langs: ['en', 'fr']
}

translate(api, options)
```

## 規格

傳遞給*markdown-translate*參數是：

| 姓名        | 類型         | 解釋        |
| --------- | ---------- | --------- |
| `api`     | `{string}` | *api key* |
| `options` | `{object}` | 可選參數      |

`options`可以設置以下成員。

| 姓名         | 類型           | 解釋       | 默認值                                   |
| ---------- | ------------ | -------- | ------------------------------------- |
| `src`      | `{string}`   | 原始文件路徑   | `resolve(process.cwd(), 'README.md')` |
| `origin`   | `{string}`   | 源語言      | `undefinde`                           |
| `dist`     | `{string}`   | 輸出目錄路徑   | `dirname(src)`                        |
| `langs`    | `{string[]}` | 要翻譯的語言   | `['en']`                              |
| `cache`    | `{string}`   | 翻譯歷史文件路徑 | `resolve(Dist, 'cache.json')`         |
| `callback` | `{function}` | 翻譯後調用的函數 | `(md) => md`                          |

## 寫作規則

*markdown-translate*故意不翻譯某些元素。 `Code`和`InlineCode`不翻譯。 `Emphasis`也不會翻譯。\
對您不想翻譯的專有名詞使用`Emphasis` 。
