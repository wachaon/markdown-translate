# *markdown-translate*

*markdown-translate* ist eine Bibliothek, die [*wes*](https://github.com/wachaon/wes) unter Beibehaltung *markdown* Formatierung übersetzen können.

Der Originaltext dieser *README* ist auf Japanisch. Andere Texte als Japanisch werden maschinell übersetzt. Für Texte in anderen Sprachen wählen Sie bitte aus den untenstehenden Optionen aus.

*   [*日本語*](/README.md)
*   [*English*](/docs/README.en.md)
*   [*繁体字*](/docs/README.zh-TW.md)
*   [*Español*](/docs/README.es.md)
*   [*Deutsch*](/docs/README.de.md)
*   [*français*](/docs/README.fr.md)
*   [*русский язык*](/docs/README.ru.md)

## Installieren

```sh
wes install @wachaon/markdown-translate --bare
```

## Verwendung

Erstellen Sie ein Projekt mit *google apps script* , definieren Sie die folgende `doPost` Funktion und stellen Sie sie bereit.

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

Übergeben Sie die durch die Bereitstellung *google apps script* generierte *url* als *api key* an *markdown-translate* .

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

## Spezifikation

Die an *markdown-translate* zu übergebenden Argumente sind:

| Name      | Typ        | Erläuterung         |
| --------- | ---------- | ------------------- |
| `api`     | `{string}` | *api key*           |
| `options` | `{object}` | optionale Argumente |

`options` können die folgenden Mitglieder festlegen.

| Name       | Typ          | Erläuterung                                               | Standardwert                          |
| ---------- | ------------ | --------------------------------------------------------- | ------------------------------------- |
| `src`      | `{string}`   | Originaldateipfad                                         | `resolve(process.cwd(), 'README.md')` |
| `origin`   | `{string}`   | Ausgangssprache                                           | `undefinde`                           |
| `dist`     | `{string}`   | Pfad des Ausgabeverzeichnisses                            | `dirname(src)`                        |
| `langs`    | `{string[]}` | Sprache zu übersetzen                                     | `['en']`                              |
| `cache`    | `{string}`   | Pfad der Übersetzungsverlaufsdatei                        | `resolve(Dist, 'cache.json')`         |
| `callback` | `{function}` | Funktion, die nach der Übersetzung aufgerufen werden soll | `(md) => md`                          |

## Regeln zum Schreiben

Einige Elemente werden von *markdown-translate* absichtlich nicht übersetzt. `Code` und `InlineCode` werden nicht übersetzt. `Emphasis` übersetzt auch nicht.\
Verwenden Sie `Emphasis` für Eigennamen, die nicht übersetzt werden sollen.
