---
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Suivi des erreurs
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: Dashboards RUM
kind: documentation
title: Collecte d'erreurs du navigateur
---
## Présentation

Les erreurs frontend sont recueillies par le service Real User Monitoring (RUM). Le message d'erreur et la stack trace sont inclus lorsque cela est possible.

## Sources des erreurs
Les erreurs de frontend proviennent de plusieurs sources différentes :

- **agent** : de l'exécution du SDK
- **console** : des appels d'API `console.error()`
- **custom** : envoyées avec l'[API `addError` RUM](#recueillir-des-erreurs-manuellement)
- **report** : de l'API `ReportingObserver`
- **source** : d'exceptions non gérées ou d'objets Promise rejetés non gérés dans le code source

## Attributs d'erreur

Pour en savoir plus sur les attributs par défaut de tous les types d'événements RUM, consultez la section relative à la [collecte de données RUM][1]. Pour obtenir des instructions afin de configurer l'échantillonnage ou le contexte global, consultez la section [Modifier des données RUM et leur contexte][2].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console`).         |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                     |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |

### Erreurs source

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Plus d'informations concernant les différents types d'erreurs sont disponibles dans [la documentation MDN][3].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                     |

## Recueillir des erreurs manuellement

Surveillez les exceptions gérées, les objets Promise rejetés et les autres erreurs non suivies automatiquement par le SDK Browser RUM avec l'API `addError()` :

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Remarque** : la fonctionnalité de [suivi des erreurs][4] traite toutes les erreurs envoyées avec la source `custom`, `source` ou `report` et contenant une stack trace. Les erreurs envoyées avec une autre source (comme `console`) ou envoyées depuis des extensions de navigateurs ne sont pas traitées par le suivi des erreurs.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur réseau
fetch('<UNE_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Envoyer une erreur d'exception gérée
try {
    // Logique de code
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Envoyer une erreur réseau
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Envoyer une erreur d'exception gérée
try {
    //Logique de code
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur réseau
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Envoyer une erreur d'exception gérée
try {
    //Logique de code
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentation des limites d'erreur de React

Vous pouvez instrumenter les [limites d'erreur][5] React pour surveiller les erreurs de rendu de React à l'aide de l'API `addError()` du SDK RUM Browser.

Les erreurs de rendu collectées contiennent une pile de composants, qui est déminifiée comme n'importe quelle autre trace de pile d'erreurs après avoir [téléchargé les sourcemaps][6].

Pour instrumenter les limites d'erreur React à des fins de surveillance, procédez comme suit :

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asynchrone" %}}

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
{{% tab "CDN synchrone" %}}

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


## Dépannage

### Erreur de script

Pour des raisons de sécurité, les navigateurs masquent les détails des erreurs déclenchées par des scripts interorigines. L'onglet Error Details affiche alors une erreur avec comme seul message « Script error ».

{{< img src="real_user_monitoring/browser/script-error.png" alt="Exemple d'erreur de script RUM" style="width:75%;" >}}

Pour en savoir plus sur les scripts interorigines et découvrir pourquoi les détails sont masqués, consultez la section [CORS][7] et [cette remarque sur les gestionnaires d'événement globaux][8]. Votre erreur est potentiellement causée par l'une des situations suivantes :
- Vos fichiers JavaScript sont hébergés sur un autre hostname (par exemple, `example.com` inclut des ressources de `static.example.com`).
- Votre site Web inclut des bibliothèques JavaScript hébergées sur un CDN.
- Votre site Web inclut des bibliothèques JavaScript tierces hébergées sur les serveurs du fournisseur.

Pour gagner en visibilité sur les scripts interorigines, suivez les deux étapes ci-dessous :
1. Appelez les bibliothèques JavaScript avec [`crossorigin="anonymous"`][9].

    Grâce à `crossorigin="anonymous"`, la requête servant à récupérer le script est sécurisée. Aucune donnée sensible n'est transmise via des cookies ou l'authentification HTTP.

2. Configurez l'en-tête de réponse HTTP [`Access-Control-Allow-Origin`][10] sur :

    - `Access-Control-Allow-Origin: *` pour permettre à toutes les origines de récupérer la ressource.
    - `Access-Control-Allow-Origin: example.com` pour autoriser une origine spécifique uniquement. Si le serveur prend en charge les clients issus de plusieurs origines, il doit renvoyer l'origine du client spécifique qui effectue la requête.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /fr/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /fr/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /fr/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs