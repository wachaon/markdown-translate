# *markdown-translate*

*markdown-translate* est *wes library* traduit tout en préservant relativement le formatage de *markdown* .

Le texte original de ce [*README*](../README.md) est en japonais. Les textes autres que le japonais seront traduits automatiquement. Pour les textes dans d'autres langues, veuillez sÃ©lectionner l'une des options ci-dessous.

<!-- translate links document -->

## installer

```sh
wes install @wachaon/markdown-translate --bare
```

## usage

Créez un projet avec *google apps script* , définissez la fonction `doPost` suivante et déployez-la.

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

Transmettez *url* générée en déployant *google apps script* à *markdown-translate* en tant que *api key* .

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

## spécification

Les arguments à passer à *markdown-translate* sont :

| nom       | taper      | explication           |
| --------- | ---------- | --------------------- |
| `api`     | `{string}` | *api key*             |
| `options` | `{object}` | arguments facultatifs |

`options` peuvent définir les membres suivants.

| nom      | taper        | explication                                          | Valeur spécifiée                      |
| -------- | ------------ | ---------------------------------------------------- | ------------------------------------- |
| `src`    | `{string}`   | chemin du fichier d'origine                          | `resolve(process.cwd(), 'README.md')` |
| `origin` | `{string}`   | langue originelle                                    | `undefinde`                           |
| `dist`   | `{string}`   | Chemin du répertoire de sortie                       | `dirname(src)`                        |
| `langs`  | `{string[]}` | langue à traduire                                    | `['en']`                              |
| `cache`  | `{string}`   | Chemin d'accès au fichier d'historique de traduction | `resolve(Dist, 'cache.json')`         |

## règles d'écriture

Certains éléments ne sont intentionnellement pas traduits par *markdown-translate* . `Code` et `InlineCode` ne se traduisent pas. `Emphasis` ne se traduit pas non plus.\
Utilisez `Emphasis` pour les noms propres que vous ne voulez pas traduire.
