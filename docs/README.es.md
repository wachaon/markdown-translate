# *markdown-translate*

*markdown-translate* es *wes library* que traduce mientras conserva el formato *markdown* .

El texto original de este [*README*](/README.md) está en japonés. Los textos que no sean en japonés serán traducidos automáticamente. Para textos en otros idiomas, seleccione entre las opciones a continuación.

*   [*English*](/docs/README.en.md)
*   [*繁体字*](/docs/README.zh-TW.md)
*   [*Español*](/docs/README.es.md)
*   [*Deutsch*](/docs/README.de.md)
*   [*français*](/docs/README.fr.md)
*   [*русский язык*](/docs/README.ru.md)

## instalar

```sh
wes install @wachaon/markdown-translate --bare
```

## uso

Cree un proyecto con *google apps script* , defina la siguiente función `doPost` e impleméntela.

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

Pase *url* generada al implementar *google apps script* para *markdown-translate* como *api key* .

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

## especificación

Los argumentos a pasar a *markdown-translate* son:

| nombre    | tipo       | explicación           |
| --------- | ---------- | --------------------- |
| `api`     | `{string}` | *api key*             |
| `options` | `{object}` | argumentos opcionales |

`options` pueden establecer los siguientes miembros.

| nombre   | tipo         | explicación                                  | Valor específico                      |
| -------- | ------------ | -------------------------------------------- | ------------------------------------- |
| `src`    | `{string}`   | ruta del archivo original                    | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | lenguaje fuente                              | `undefinde`                           |
| `dist`   | `{string}`   | Ruta del directorio de salida                | `dirname(src)`                        |
| `langs`  | `{string[]}` | idioma para traducir                         | `['en']`                              |
| `cache`  | `{string}`   | Ruta del archivo del historial de traducción | `resolve(Dist, 'cache.json')`         |

## reglas para escribir

*markdown-translate* no traduce intencionalmente algunos elementos. `Code` e `InlineCode` no se traducen. `Emphasis` tampoco traduce.\
Utilice `Emphasis` para los nombres propios que no desee traducir.
