# *markdown-translate*

*markdown-translate* è *wes library* che traduce preservando relativamente l'aspetto di *markdown* .

Il testo originale di questo [*README*](../README.md) sarà in giapponese. I testi diversi dal giapponese saranno tradotti automaticamente. Per i testi in altre lingue, selezionare una delle opzioni seguenti.

<!-- translate links document -->

## installare

```sh
wes install @wachaon/markdown-translate --bare
```

## utilizzo

Crea un progetto con *google apps script* , definisci la seguente funzione `doPost` e distribuiscila.

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

| nome     | tipo         | spiegazione                                         | Valore specificato                    |
| -------- | ------------ | --------------------------------------------------- | ------------------------------------- |
| `src`    | `{string}`   | percorso del file originale                         | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | linguaggio del codice                               | `undefinde`                           |
| `dist`   | `{string}`   | Percorso della directory di output                  | `dirname(src)`                        |
| `langs`  | `{string[]}` | lingua da tradurre                                  | `['en']`                              |
| `cache`  | `{string}`   | Percorso del file della cronologia delle traduzioni | `resolve(Dist, 'cache.json')`         |

## regole per la scrittura

Alcuni elementi non sono intenzionalmente tradotti da *markdown-translate* . `Code` e `InlineCode` non vengono tradotti. Né `Emphasis` traduce.\
Usa `Emphasis` per i nomi propri che non vuoi tradurre.
