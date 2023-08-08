# *markdown-translate*

*markdown-translate* — это *wes library* , которая переводит, относительно сохраняя внешний вид *markdown* .

Исходный текст этого [*README*](/README.md) будет на японском языке. Тексты, отличные от японского, будут переведены автоматически. Для текстов на других языках выберите один из вариантов ниже.

+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->

## установить

```sh
wes install @wachaon/markdown-translate --bare
```

## Применение

Создайте проект со *google apps script* , определите следующую функцию `doPost` и разверните ее.

```javascript
function doPost(event_object) {
    const parameter = JSON.parse(event_object.postData.getDataAsString());
    const result = LanguageApp.translate(
        parameter.content,
        parameter.source,
        parameter.target,
        { contentType: parameter.contentType }
    );
 
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({ result }));
 
    return output;
}
```

Передайте *url* , сгенерированный путем развертывания *google apps script* , для *markdown-translate* в качестве *api key* .

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

## Спецификация

Аргументы для передачи в *markdown-translate* :

| имя       | тип        | объяснение               |
| --------- | ---------- | ------------------------ |
| `api`     | `{string}` | *api key*                |
| `options` | `{object}` | необязательные аргументы |

`options` могут устанавливать следующие элементы.

| имя      | тип          | объяснение                     | Указанное значение                    |
| -------- | ------------ | ------------------------------ | ------------------------------------- |
| `src`    | `{string}`   | исходный путь к файлу          | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | исходный язык                  | `undefinde`                           |
| `dist`   | `{string}`   | Выходной путь к каталогу       | `dirname(src)`                        |
| `langs`  | `{string[]}` | язык для перевода              | `['en']`                              |
| `cache`  | `{string}`   | Путь к файлу истории переводов | `resolve(Dist, 'cache.json')`         |

## правила написания

Некоторые элементы намеренно не переводятся с помощью *markdown-translate* . `Code` и `InlineCode` не переводятся. `Emphasis` также не переводится.\
Используйте `Emphasis` для имен собственных, которые вы не хотите переводить.
