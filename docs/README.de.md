# *markdown-translate*

*markdown-translate* ist *wes library* , die übersetzt und dabei das Erscheinungsbild von *markdown* weitgehend beibehält.

Der Originaltext dieser [*README*](/README.md) wird auf Japanisch sein. Andere Texte als Japanisch werden maschinell übersetzt. Für Texte in anderen Sprachen wählen Sie bitte aus den untenstehenden Optionen aus.

+  [*English*](/docs/README.en.md) <!-- 英語 -->
+  [*繁体字*](/docs/README.zh-TW.md) <!-- 中国語 (繁体字) -->
+  [*Español*](/docs/README.es.md) <!-- スペイン語 -->
+  [*Deutsch*](/docs/README.de.md) <!-- ドイツ語 -->
+  [*français*](/docs/README.fr.md) <!-- フランス語 -->
+  [*русский язык*](/docs/README.ru.md) <!-- ロシア語 -->

## Installieren

```sh
wes install @wachaon/markdown-translate --bare
```

## Verwendung

Erstellen Sie ein Projekt mit *google apps script* , definieren Sie die folgende `doPost` Funktion und stellen Sie sie bereit.

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

| Name     | Typ          | Erläuterung                        | Spezifizierter Wert                   |
| -------- | ------------ | ---------------------------------- | ------------------------------------- |
| `src`    | `{string}`   | Originaldateipfad                  | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | Ausgangssprache                    | `undefinde`                           |
| `dist`   | `{string}`   | Pfad des Ausgabeverzeichnisses     | `dirname(src)`                        |
| `langs`  | `{string[]}` | Sprache zu übersetzen              | `['en']`                              |
| `cache`  | `{string}`   | Pfad der Übersetzungsverlaufsdatei | `resolve(Dist, 'cache.json')`         |

## Regeln zum Schreiben

Einige Elemente werden von *markdown-translate* absichtlich nicht übersetzt. `Code` und `InlineCode` werden nicht übersetzt. `Emphasis` übersetzt auch nicht.\
Verwenden Sie `Emphasis` für Eigennamen, die nicht übersetzt werden sollen.
