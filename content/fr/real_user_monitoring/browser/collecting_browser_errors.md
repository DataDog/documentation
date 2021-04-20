---
title: Collecte d'erreurs du navigateur
kind: documentation
further_reading:
  - link: /real_user_monitoring/error_tracking/
    tag: Documentation
    text: Suivi des erreurs
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: Générer des analyses à partir de vos événements
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Dashboards RUM
---
Les erreurs frontend sont recueillies par le service Real User Monitoring (RUM). Le message d'erreur et la stack trace sont inclus lorsque cela est possible.

## Origines des erreurs
Les erreurs frontend sont réparties en quatre catégories différentes, en fonction de leur `error.origin` :

- **network** : erreurs XHR ou Fetch résultant de requêtes AJAX. Les attributs spécifiques aux erreurs network sont disponibles [dans la documentation dédiée][1].
- **source** : exceptions non gérées ou objets Promise rejetés non gérés (ces erreurs sont liées au code source).
- **console** : appels d'API `console.error()`.
- **custom** : les erreurs envoyées avec l'[API `addError` RUM](#recueillir-des-erreurs-manuellement) ont par défaut la valeur `custom`.

## Attributs d'erreur

Pour en savoir plus sur les attributs par défaut de tous les types d'événements RUM, consultez la section relative à la [collecte de données RUM][2]. Pour obtenir des instructions afin de configurer l'échantillonnage ou le contexte global, consultez la section [Configuration avancée du RUM][3].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console` ou `network`).     |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |

### Erreurs network

Les erreurs network comprennent des informations sur les requêtes HTTP ayant échoué. Les facettes suivantes sont recueillies :

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `error.resource.method`                | chaîne | La méthode HTTP (par exemple, `POST` ou `GET`).           |
| `error.resource.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `error.resource.url_host`        | chaîne | La partie de l'URL correspondant au host.                                                          |
| `error.resource.url_path`        | chaîne | La partie de l'URL correspondant au chemin.                                                          |
| `error.resource.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête. |
| `error.resource.url_scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |
| `error.resource.provider.name`      | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                            |
| `error.resource.provider.domain`      | chaîne | Le domaine du fournisseur de ressources.                                            |
| `error.resource.provider.type`      | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`).                                            |

### Erreurs source

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Plus d'informations concernant les différents types d'erreurs sont disponibles dans [la documentation MDN][4].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |

## Recueillir des erreurs manuellement

Surveillez les exceptions gérées, les objets Promise rejetés et les autres erreurs non suivies automatiquement par le SDK RUM avec l'API `addError()` :

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
{{< /code-block >}}

**Remarque** : la fonctionnalité de [suivi des erreurs][5] traite les erreurs envoyées avec la source `custom` ou `source` et qui contiennent une stack trace.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur network
fetch('<UNE_URL>').catch(function(error) {
    datadogRum.addError(error, undefined, 'network');
})

// Envoyer une erreur d'exception gérée
try {
    //Logique de code
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
}
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Envoyer une erreur network
fetch('<UNE_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'network');
    });
})

// Envoyer une erreur d'exception gérée
try {
    //Logique de code
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
    })
}
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
// Envoyer une erreur custom avec un contexte
const error = new Error('Une erreur s'est produite.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur network
fetch('<UNE _URL>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// Envoyer une erreur d'exception gérée
try {
    //Logique de code
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/real_user_monitoring/data_collected/error/#network-errors
[2]: /fr/real_user_monitoring/browser/data_collected/
[3]: /fr/real_user_monitoring/browser/advanced_configuration/
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[5]: /fr/real_user_monitoring/error_tracking