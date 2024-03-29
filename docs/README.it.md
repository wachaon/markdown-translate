# *markdown-translate*

*markdown-translate* è una libreria che [*wes*](https://github.com/wachaon/wes) può tradurre mantenendo la formattazione *markdown* .

Il testo originale di questo *README* è in giapponese. I testi diversi dal giapponese saranno tradotti automaticamente. Per i testi in altre lingue, selezionare una delle opzioni seguenti.

*   [*日本語*](/README.md)
*   [*English*](/docs/README.en.md)
*   [*繁体字*](/docs/README.zh-TW.md)
*   [*Español*](/docs/README.es.md)
*   [*Deutsch*](/docs/README.de.md)
*   [*français*](/docs/README.fr.md)
*   [*русский язык*](/docs/README.ru.md)

## installare

```sh
wes install @wachaon/markdown-translate --bare
```

## utilizzo

Crea un progetto con *google apps script* , definisci la seguente funzione `doPost` e distribuiscila.

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

Trasmetti *url* generato distribuendo *google apps script* per *markdown-translate* come *api key* .

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

## specifica

Gli argomenti da passare a *markdown-translate* sono:

| nome      | tipo       | spiegazione           |
| --------- | ---------- | --------------------- |
| `api`     | `{string}` | *api key*             |
| `options` | `{object}` | argomenti facoltativi |

`options` possono impostare i seguenti membri.

| nome       | tipo         | spiegazione                                         | valore di default                     |
| ---------- | ------------ | --------------------------------------------------- | ------------------------------------- |
| `src`      | `{string}`   | percorso del file originale                         | `resolve(process.cwd(), 'README.md')` |
| `origin`   | `{string}`   | linguaggio del codice                               | `undefinde`                           |
| `dist`     | `{string}`   | Percorso della directory di output                  | `dirname(src)`                        |
| `langs`    | `{string[]}` | lingua da tradurre                                  | `['en']`                              |
| `cache`    | `{string}`   | Percorso del file della cronologia delle traduzioni | `resolve(Dist, 'cache.json')`         |
| `callback` | `{function}` | Funzione da chiamare dopo la traduzione             | `(md) => md`                          |

## regole per la scrittura

Alcuni elementi non sono intenzionalmente tradotti da *markdown-translate* . `Code` e `InlineCode` non vengono tradotti. Né `Emphasis` traduce.\
Usa `Emphasis` per i nomi propri che non vuoi tradurre.
