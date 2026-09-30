---
aliases:
- /fr/error_tracking/standalone_frontend/collecting_browser_errors
- /fr/real_user_monitoring/browser/collecting_browser_errors/
description: Apprenez à collecter et suivre les erreurs frontend provenant de plusieurs
  sources à l'aide de RUM Browser SDK, y compris la collecte manuelle d'erreurs et
  les limites d'erreurs de React.
further_reading:
- link: /error_tracking/explorer/
  tag: Documentation
  text: Explorez vos erreurs dans Datadog
- link: /error_tracking/monitors/
  tag: Documentation
  text: Alertez de manière proactive sur les problèmes ayant un impact.
- link: /real_user_monitoring
  tag: Documentation
  text: Mesurez les performances et l'impact sur les utilisateurs
title: Collecte d'erreurs du navigateur
---
## Présentation {#overview}

Le SDK Browser collecte les erreurs frontend, y compris le message d'erreur et la trace de pile lorsqu'ils sont disponibles. Pour le tri et la gestion de ces erreurs dans le produit Error Tracking, consultez [Browser Error Tracking][4].

Lorsque le SDK Browser collecte une erreur :

* L'erreur est capturée en tant qu'[événement d'erreur][14] dans RUM.
* Les [filtres de rétention][15] qui ciblent les sessions contenant un événement d'erreur conservent la session actuelle.
* Les [métriques RUM][16] `rum.measure.error`, `rum.measure.session.error` et `rum.measure.view.error_free` sont mises à jour, que la session soit conservée ou non.
* L'erreur est capturée dans [Error Tracking][4].

Les [règles Error Tracking][17] ne s'appliquent pas aux _événements d'erreur_, et RUM enregistre toujours les événements d'erreur qui correspondent aux [problèmes ignorés et exclus][18] dans Error Tracking. Pour empêcher l'enregistrement d'erreurs en tant qu'événements d'erreur, vous devez les rejeter avant qu'elles ne soient envoyées à Datadog [à l'aide du rappel `beforeSend`][19].

## Sources d'erreur {#error-sources}
Les erreurs frontend proviennent de plusieurs sources différentes :

- **agent** : De l'exécution du SDK
- **console** : Des appels d'API `console.error()`
- **custom** : Envoyé avec l'API [`addError`](#collect-errors-manually)
- **report** : De l'API `ReportingObserver`
- **source** : Des exceptions non gérées ou des rejets de promesse non gérés dans le code source

## Attributs d'erreur {#error-attributes}

Pour plus d'informations sur les attributs par défaut de tous les types d'événements, consultez [Données collectées][1]. Pour plus d'informations sur la configuration de l'échantillonnage ou du contexte global, consultez [Modification des données et du contexte][2].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console`).         |
| `error.type`    | chaîne | Le type d'erreur (ou code d'erreur dans certains cas).                     |
| `error.message` | chaîne | Un message concis, lisible par l'homme et sur une seule ligne expliquant l'événement. |
| `error.stack`   | chaîne | La trace de pile ou des informations complémentaires sur l'erreur.     |
| `error.causes` | [Array][12] | Une liste facultative d'erreurs fournissant un contexte supplémentaire. Cet attribut est utilisé pour afficher les erreurs séparément et améliorer le formatage. Pour plus d'informations, consultez la [documentation MDN][13]. |

### Erreurs source {#source-errors}

Les erreurs source incluent des informations au niveau du code concernant l'erreur. Plus d'informations sur les différents types d'erreurs sont disponibles dans [la documentation MDN][3].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou code d'erreur dans certains cas).                     |

## Configurer le suivi des erreurs WebAssembly {#configure-webassembly-error-tracking}

Pour suivre les erreurs WebAssembly (WASM), installez le plugin WASM du SDK Browser. Utilisez la même version pour le plugin et le SDK RUM Browser :

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

Enregistrez le plugin lors de l'initialisation de RUM :

```javascript
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ...
  plugins: [makeWasmPlugin()],
});
```

Initialisez RUM avant de charger tout module WASM. Le plugin observe les modules créés avec les API `WebAssembly` du navigateur et ajoute leurs URL et build IDs aux erreurs contenant une trace de pile WASM. Cela permet à Datadog de sélectionner le bon ID de build lorsqu'une application charge plusieurs modules.

Les erreurs non gérées sont collectées automatiquement. Pour signaler une erreur WASM gérée, passez l'objet `Error` à [`addError()`](#collect-errors-manually).

Ensuite, [téléchargez les symboles WebAssembly][20] pour symboliser les erreurs.

## Collecter les erreurs manuellement {#collect-errors-manually}

Surveillez les exceptions gérées, les rejets de promesses gérés et d'autres erreurs non suivies automatiquement par le SDK Browser avec l'API `addError()` :

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Remarque** : [Error Tracking][4] traite les erreurs envoyées avec la source définie sur `custom`, `source`, `report` ou `console`, et contenant une trace de pile. Les erreurs envoyées avec toute autre source (telle que `network`) ou envoyées depuis des extensions de navigateur ne sont pas traitées par Error Tracking.

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentation des limites d'erreurs de React {#react-error-boundaries-instrumentation}

Vous pouvez instrumenter les limites d'erreurs de React [5] pour surveiller les erreurs de rendu React à l'aide de l'API `addError()` du SDK RUM Browser.

Les erreurs de rendu collectées contiennent une pile de composants, qui est déminifiée comme n'importe quelle autre trace de pile d'erreurs après avoir [téléchargé les sourcemaps][6].

Pour instrumenter les limites d'erreur React à des fins de surveillance, procédez comme suit :

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    datadogRum.addError(renderingError);
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(function() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

     window.DD_RUM &&
       window.DD_RUM.addError(renderingError);

  }

  ...
}
```

{{% /tab %}}
{{< /tabs >}}


## Dépannage {#troubleshooting}

### Erreur de script {#script-error}

Pour des raisons de sécurité, les navigateurs masquent les détails des erreurs déclenchées par des scripts inter-origines. Lorsque cela se produit, l'onglet {{< ui >}}Error Details{{< /ui >}} affiche une erreur avec le message minimal « Script error. »

{{< img src="real_user_monitoring/browser/script-error.png" alt="Exemple d'erreur de script Real User Monitoring" style="width:75%;" >}}

Pour plus d'informations sur les scripts inter-origines et les raisons pour lesquelles les détails sont masqués, consultez [CORS][7] et [cette note sur les gestionnaires d'événements globaux][8]. Certaines raisons possibles pour cette erreur incluent :
- Vos fichiers JavaScript sont hébergés sur un nom de host différent (par exemple, `example.com` inclut des ressources provenant de `static.example.com`).
- Votre site web inclut des bibliothèques JavaScript hébergées sur un CDN.
- Votre site web inclut des bibliothèques JavaScript tierces hébergées sur les serveurs du fournisseur.

Pour gagner en visibilité sur les scripts interorigines, suivez les deux étapes ci-dessous :
1. Appelez les bibliothèques JavaScript avec [`crossorigin="anonymous"`][9].

    Avec `crossorigin="anonymous"`, la requête pour récupérer le script est effectuée de manière sécurisée. Aucune donnée sensible n'est transmise via des cookies ou une authentification HTTP.

2. Configurez l'en-tête de réponse HTTP [`Access-Control-Allow-Origin`][10] :

    - `Access-Control-Allow-Origin: *` pour autoriser toutes les origines à récupérer la ressource.
    - `Access-Control-Allow-Origin: example.com` pour spécifier une seule origine autorisée. Si le serveur prend en charge des clients provenant de plusieurs origines, il doit renvoyer l'origine pour le client spécifique effectuant la requête.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /fr/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /fr/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /fr/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs
[12]: https://github.com/DataDog/rum-events-format/blob/69147431d689b3e59bff87e15bb0088a9bb319a9/lib/esm/generated/rum.d.ts#L185-L203
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
[14]: /fr/real_user_monitoring/explorer/search/#event-types
[15]: /fr/real_user_monitoring/rum_without_limits/retention_filters
[16]: /fr/real_user_monitoring/rum_without_limits/metrics
[17]: /fr/error_tracking/manage_data_collection
[18]: /fr/error_tracking/issue_states#excluding-an-issue
[19]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#discard-a-frontend-error
[20]: /fr/real_user_monitoring/guide/upload-webassembly-symbols/