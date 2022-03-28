---
title: Modifier des données RUM et leur contexte
kind: documentation
aliases:
  - /fr/real_user_monitoring/installation/advanced_configuration/
  - /fr/real_user_monitoring/browser/advanced_configuration/
further_reading:
  - link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/browser/data_collected/
    tag: Documentation
    text: Données RUM recueillies (Browser)
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/visualize/
    tag: Documentation
    text: Appliquer des visualisations sur vos événements
  - link: /logs/log_configuration/attributes_naming_convention
    tag: Documentation
    text: Attributs standard Datadog
---
Vous pouvez modifier les [données collectées][1] par la fonctionnalité RUM de diverses façons afin de mieux répondre à vos besoins. Par exemple :

- Protection des données sensibles, telles que les informations personnelles.
- Connexion d'une session utilisateur à votre identification interne de cet utilisateur afin de faciliter l'assistance.
- Réduction de la quantité de données RUM recueillies, à l'aide d'un échantillonnage des données.
- Ajout de données de contexte en plus des attributs par défaut afin de mieux déterminer l'origine des données.

## Remplacer les noms de vue RUM par défaut

Le SDK RUM génère automatiquement un [événement de vue][2] à chaque fois qu'un utilisateur consulte une nouvelle page, ou lorsque l'URL de la page est modifiée (pour les applications monopages). Un nom de vue est généré à partir de l'URL de la page en cours, où les ID alphanumériques de variable sont supprimés automatiquement : par exemple, « /dashboard/1234 » devient « /dashboard/? ».

À partir de la [version 2.17.0][3], vous pouvez indiquer vos propres noms de vue en effectuant un suivi manuel des événements de vue avec l'option `trackViewsManually` :

1. Configurez `trackViewsManually` sur true lors de l'initialisation du RUM.
{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackViewsManually: true,
    ...
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        trackViewsManually: true,
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        trackViewsManually: true,
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

2. Vous **devez** démarrer une vue pour chaque nouvelle page ou changement de route (pour les applications monopage). Vous avez la possibilité de définir le nom de vue associé, qui a pour valeur par défaut le chemin de l'URL de la page. Aucune donnée RUM n'est recueillie tant que la vue n'est pas démarrée.
{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.startView('checkout')
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.startView('checkout')
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez React, Angular, Vue ou tout autre framework frontend, Datadog recommande d'implémenter la logique `startView` au niveau du routeur du framework.

## Enrichir et contrôler les données RUM

Le SDK RUM enregistre les événements RUM et renseigne les attributs principaux correspondants. La fonction de rappel `beforeSend` vous permet d'accéder à chaque événement recueilli par le SDK RUM avant qu'il soit envoyé à Datadog. L'interception d'événements RUM vous permet d'effectuer les opérations suivantes :

- Enrichir vos événements RUM avec des attributs de contexte supplémentaires
- Modifier vos événements RUM pour en modifier le contenu ou pour effacer les séquences sensibles (consultez la [liste des propriétés modifiables](#modifier-le-contenu-d-un-evenement-rum))
- Ignorer des événements RUM sélectionnés

À partir de la [version 2.13.0][4], `beforeSend` prend deux arguments : `event`, qui fait référence à l'événement généré par le SDK RUM, et `context`, qui fait référence au contexte qui a déclenché la création de l'événement RUM.

```javascript
function beforeSend(event, context)
```

Voici les valeurs possibles pour `context` :

| Type d'événement RUM   | Contexte                   |
|------------------|---------------------------|
| Vue             | [Location][5]                  |
| Action           | [Event][6]                     |
| Ressource (XHR)   | [XMLHttpRequest][7] et [PerformanceResourceTiming][8]            |
| Ressource (Fetch) | [Request][9], [Response][10] et [PerformanceResourceTiming][8]      |
| Ressource (autre) | [PerformanceResourceTiming][8] |
| Erreur            | [Error][11]                     |
| Tâche longue        | [PerformanceLongTaskTiming][12] |

Pour en savoir plus, consultez le [guide pour enrichir et contrôler les données RUM][13].

### Enrichir des événements RUM

En plus des attributs ajoutés avec l'[API de contexte global](#contexte-global), vous pouvez ajouter d'autres attributs de contexte à l'événement. Par exemple, ajoutez des tags à vos événements de ressource RUM à l'aide des données extraites à partir d'un objet de réponse Fetch :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // recueillir les en-têtes de réponse d'une ressource RUM
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context = {...event.context, responseHeaders: context.response.headers}
        }
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // recueillir les en-têtes de réponse d'une ressource RUM
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // recueillir les en-têtes de réponse d'une ressource RUM
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : le SDK RUM ne tient pas compte des éléments suivants :
- Attributs ajoutés en dehors de `event.context`.
- Modifications apportées à un contexte d'événement de vue RUM.

### Modifier le contenu d'un événement RUM

Vous pouvez par exemple censurer les adresses e-mail de vos URL d'applications Web :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // supprimer l'adresse e-mail de l'url de la vue
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    });
```

{{% /tab %}}
{{< /tabs >}}

Vous pouvez modifier les propriétés d'événement suivantes :

|   Attribut           |   Type    |   Description                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   Chaîne  |   L'URL de la page Web active.                            |
|   `view.referrer`       |   Chaîne  |   L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle.  |
|   `action.target.name`  |   Chaîne  |   L'élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement.              |
|   `error.message`       |   Chaîne  |   Un message d'une ligne lisible et concis décrivant l'erreur.                                 |
|   `error.stack `        |   Chaîne  |   La stack trace ou toutes informations complémentaires relatives à l'erreur.                                     |
|   `error.resource.url`  |   Chaîne  |   L'URL de la ressource qui a déclenché l'erreur.                                                        |
|   `resource.url`        |   Chaîne  |   L'URL de la ressource.                                                                                 |
|   `context`        |   Objet  |   Attributs ajoutés via l'[API de contexte global](#contexte-global) ou lors de la génération manuelle d'événements (par exemple, `addError` et `addAction`). La valeur `context` des événements de vue RUM est en lecture seule.                                                                                 |

**Remarque** : le SDK RUM ne tient pas compte des modifications apportées aux propriétés d'événement non répertoriées ci-dessus. Découvrez toutes les propriétés d'événement sur le [référentiel du SDK Browser][14].

### Ignorer un événement RUM

L'API `beforeSend` vous permet d'ignorer un événement RUM en renvoyant `false` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        if (shouldDiscard(event)) {
            return false
        }
        ...
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```

{{% /tab %}}
{{< /tabs >}}

## Identifier les sessions utilisateur

L'ajout des informations utilisateur à vos sessions RUM permet :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en renseigner **au moins un** :

| Attribut  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| `usr.name`  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| `usr.email` | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

**Remarque** : améliorez vos capacités de filtrage en ajoutant d'autres attributs en plus de ceux recommandés. Par exemple, ajoutez des informations à propos de l'abonnement de l'utilisateur, ou du groupe d'utilisateurs auquel il appartient.

Pour identifier les sessions utilisateur, utilisez l'API `setUser` :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### Supprimer l'identification de l'utilisateur

Supprimez un utilisateur précédemment défini avec l'API `removeUser`. Tous les événements RUM recueillis par la suite ne contiendront pas d'informations sur l'utilisateur.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUser()
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.removeUser()
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.removeUser()
```

{{% /tab %}}
{{< /tabs >}}

## Échantillonnage

Par défaut, aucun échantillonnage n'est appliqué au nombre de sessions recueillies. Pour appliquer un échantillonnage relatif (en pourcentage), utilisez le paramètre `sampleRate` lors de l'initialisation de RUM. L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    site: '<SITE_DATADOG>',
    sampleRate: 90,
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<TOKEN_CLIENT>',
        applicationId: '<ID_APPLICATION>',
        site: '<SITE_DATADOG>',
        sampleRate: 90,
    })
  })
</script>
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<TOKEN_CLIENT>',
        applicationId: '<ID_APPLICATION>',
        site: '<SITE_DATADOG>',
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : lorsqu'une session est exclue en raison d'un échantillonnage, toutes les vues de page et la télémétrie associées à cette session ne sont pas recueillies.

## Contexte global

### Ajouter un contexte global

Une fois la fonctionnalité RUM initialisée, ajoutez du contexte supplémentaire à l'ensemble des événements RUM recueillis depuis votre application avec l'API `addRumGlobalContext(key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addRumGlobalContext('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);

// Exemple de code
datadogRum.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');

// Exemple de code
window.DD_RUM && window.DD_RUM.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : respectez la [convention de nommage Datadog][15] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Remplacer le contexte global

Une fois la fonctionnalité RUM initialisée, remplacez le contexte par défaut de tous vos événements RUM avec l'API `setRumGlobalContext(context: Context)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });

// Exemple de code
datadogRum.setRumGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });

// Exemple de code
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : respectez la [convention de nommage Datadog][15] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Lire le contexte global

Une fois la fonctionnalité RUM initialisée, lisez le contexte global avec l'API `getRumGlobalContext()` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getRumGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
  var context = DD_RUM.getRumGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
var context = window.DD_RUM && DD_RUM.getRumGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[7]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[8]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[13]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data
[14]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[15]: /fr/logs/log_configuration/attributes_naming_convention/#user-related-attributes