---
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
kind: documentation
title: Modifier des données RUM et leur contexte
---

{{< callout url="#" btn_hidden="true" header="Testez la version bêta de la surveillance des feature flags !">}}
Pour ajouter à vos données RUM des feature flags et gagner en visibilité sur la surveillance de vos performances et les changements de comportement, prenez part à la version bêta de la <a href="https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/">surveillance des feature flags</a>. Pour accéder à cette fonctionnalité, contactez l'assistance Datadog à l'adresse support@datadoghq.com.
{{< /callout >}}

## Présentation

Vous pouvez modifier les [données collectées][1] par la fonctionnalité RUM de diverses façons afin de mieux répondre à vos besoins. Par exemple :

- Protection des données sensibles, telles que les informations personnelles.
- Connexion d'une session utilisateur à votre identification interne de cet utilisateur afin de faciliter l'assistance.
- Réduction de la quantité de données RUM recueillies, à l'aide d'un échantillonnage des données.
- Ajout de données de contexte en plus des attributs par défaut afin de mieux déterminer l'origine des données.

## Remplacer les noms de vue RUM par défaut

Le SDK Browser RUM génère automatiquement un [événement de vue][2] chaque fois qu'un utilisateur consulte une nouvelle page, ou lorsque l'URL de la page est modifiée (pour les applications monopages). Un nom de vue est généré à partir de l'URL de la page active, et les ID alphanumériques de variable sont supprimés automatiquement : par exemple, `/dashboard/1234` devient `/dashboard/?`.

Depuis la [version 2.17.0][3], vous pouvez ajouter des noms de vue et les attribuer à un service dédié appartenant à une équipe, en effectuant un suivi manuel des événements de vue avec l'option `trackViewsManually` :

1. Définissez `trackViewsManually` sur true lors de l'initialisation du SDK Browser RUM.

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

2. Vous devez lancer des vues pour chaque nouvelle page ou chaque changement de route (pour les applications monopages). Les données RUM sont recueillies à l'initialisation de la vue. Vous avez également la possibilité de définir le nom de la vue associée, le nom du service ainsi que la version.

   - Vue : correspond par défaut au chemin d'URL de la page.
   - Service : correspond pas défaut au service par défaut spécifié lors de la création de votre application RUM.
   - Version : correspond pas défaut à la version par défaut spécifiée lors de la création de votre application RUM.

   Pour en savoir plus, consultez la section [Surveillance Browser RUM][4].

L'exemple suivant permet de surveiller manuellement les vues de la page `checkout` d'une application RUM. Utilisez le nom de vue `checkout`, avec le service `purchase` et la version `1.2.3`.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.startView({
      name: 'checkout',
      service: 'purchase',
      version: '1.2.3'
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{{% /tab %}}
{{< /tabs >}}

Si vous utilisez React, Angular, Vue ou tout autre framework frontend, Datadog recommande d'implémenter la logique `startView` au niveau du routeur du framework.

## Enrichir et contrôler les données RUM

Le SDK Browser RUM enregistre les événements RUM et renseigne les attributs principaux correspondants. La fonction de rappel `beforeSend` vous permet d'accéder à chaque événement recueilli par le SDK Browser RUM avant qu'il ne soit envoyé à Datadog.

L'interception d'événements RUM vous permet d'effectuer les opérations suivantes :

- Enrichir vos événements RUM avec des attributs de contexte supplémentaires
- Modifier vos événements RUM pour en modifier le contenu ou pour effacer les séquences sensibles (consultez la [liste des propriétés modifiables](#modifier-le-contenu-d-un-evenement-rum))
- Ignorer des événements RUM sélectionnés

Depuis la [version 2.13.0][5], `beforeSend` prend deux arguments : `event`, qui fait référence à l'événement généré par le SDK Browser RUM, et `context`, qui fait référence au contexte qui a déclenché la création de l'événement RUM.

```javascript
function beforeSend(event, context)
```

Voici les valeurs possibles pour `context` :

| Type d'événement RUM   | Contexte                   |
|------------------|---------------------------|
| Vue             | [Location][6]                  |
| Action           | [Event][7]                     |
| Ressource (XHR)   | [XMLHttpRequest][7] et [PerformanceResourceTiming][8]            |
| Ressource (Fetch) | [Request][10], [Response][11] et [PerformanceResourceTiming][9]      |
| Ressource (autre) | [PerformanceResourceTiming][9] |
| Erreur            | [Error][12]                     |
| Tâche longue        | [PerformanceLongTaskTiming][13] |

Pour en savoir plus, consultez le [guide pour enrichir et contrôler les données RUM][14].

### Enrichir des événements RUM

En plus des attributs ajoutés avec l'[API de contexte global](#contexte-global), vous pouvez associer d'autres attributs de contexte à l'événement. Par exemple, ajoutez des tags à vos événements de ressource RUM à l'aide des données extraites à partir d'un objet de réponse Fetch :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // recueillir des en-têtes de réponse d'une ressource RUM
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

Lorsqu'un utilisateur appartient à plusieurs équipes, ajoutez des paires key-value supplémentaires dans vos appels de l'API de contexte global.

Le SDK Browser RUM ignore :

- les attributs ajoutés en dehors de `event.context` ;
- les modifications apportées à un contexte d'événement de vue RUM.

### Modifier le contenu d'un événement RUM

Par exemple, pour censurer les adresses e-mail de vos URL d'applications Web :

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
|   `context`        |   Objet  |   Attributs ajoutés avec l'[API de contexte global](#contexte-global) ou lors de la génération manuelle d'événements (par exemple, `addError` et `addAction`). La valeur `context` des événements de vue RUM est en lecture seule.                                                                                 |

Le SDK Browser RUM ne tient pas compte des modifications apportées aux propriétés d'événement non répertoriées ci-dessus. Pour en savoir plus les propriétés d'événement, consultez le [référentiel GitHub du SDK Browser RUM][15].

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

## Session utilisateur

L'ajout des informations utilisateur à vos sessions RUM permet :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont facultatifs, mais Datadog vous recommande d'en renseigner au moins un :

| Attribut  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| `usr.name`  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| `usr.email` | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Améliorez vos capacités de filtrage en ajoutant d'autres attributs en plus de ceux recommandés. Par exemple, ajoutez des informations à propos de l'abonnement de l'utilisateur ou du groupe d'utilisateurs auquel il appartient.

Lorsque vous modifiez l'objet de la session utilisateur, tous les événements RUM recueillis après la modification contiennent les informations les plus récentes.

### Identifier une session utilisateur

`datadogRum.setUser(<OBJET_CONFIGURATION_UTILISATEUR>)`

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

### Accéder à une session utilisateur

`datadogRum.getUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getUser()
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### Ajouter ou remplacer une propriété de session utilisateur

`datadogRum.setUserProperty('<CLÉ_UTILISATEUR>', <VALEUR_UTILISATEUR>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### Supprimer une propriété de session utilisateur

`datadogRum.removeUserProperty('<CLÉ_UTILISATEUR>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUserProperty('name')
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### Effacer une propriété de session utilisateur

`datadogRum.clearUser()`

<div class="alert alert-info">Avec la version 4.17.0 du SDK Browser RUM, `removeUser` a été remplacé par `clearUser`.</div>

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{{% /tab %}}
{{< /tabs >}}

## Échantillonnage

Par défaut, aucun échantillonnage n'est appliqué au nombre de sessions recueillies. Pour appliquer un échantillonnage relatif (en pourcentage), utilisez le paramètre `sessionSampleRate` lors de l'initialisation de RUM.

L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    site: '<SITE_DATADOG>',
    sessionSampleRate: 90,
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
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
        sessionSampleRate: 90,
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
        sessionSampleRate: 90,
    });
```
{{% /tab %}}
{{< /tabs >}}

Lorsqu'une session est exclue en raison d'un échantillonnage, aucune vue de page ni aucune donnée de télémétrie associée à cette session ne sont recueillies.

## Contexte global

### Ajouter une propriété de contexte global

Une fois la fonctionnalité RUM initialisée, ajoutez du contexte supplémentaire à l'ensemble des événements RUM recueillis depuis votre application avec l'API `setGlobalContextProperty(key: string, value: any)` :

<div class="alert alert-info">Avec la version 4.17.0 du SDK Browser RUM, `addRumGlobalContext` a été remplacé par `setGlobalContextProperty`.</div>

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);

// Exemple de code
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setGlobalContextProperty('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');

// Exemple de code
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}

Respectez la [convention de nommage Datadog][16] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Supprimer une propriété de contexte global

Vous pouvez supprimer une propriété de contexte global précédemment définie.

<div class="alert alert-info">Avec la version 4.17.0 du SDK Browser RUM, `removeRumGlobalContext` a été remplacé par `removeGlobalContextProperty`.</div>

Respectez la [convention de nommage Datadog][16] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Remplacer le contexte global

Remplacez le contexte par défaut de tous vos événements RUM avec l'API `setGlobalContext(context: Context)` :

<div class="alert alert-info">Avec la version 4.17.0 du SDK Browser RUM, `setRumGlobalContext` a été remplacé par `setGlobalContext`.</div>

Respectez la [convention de nommage Datadog][16] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Effacer le contexte global

Vous pouvez effacer le contexte global à l'aide du paramètre `clearGlobalContext`.

### Lire le contexte global

Une fois la fonctionnalité RUM initialisée, lisez le contexte global avec l'API `getGlobalContext()` :

<div class="alert alert-info">Avec la version 4.17.0 du SDK Browser RUM, `getRumGlobalContext` a été remplacé par `getGlobalContext`.</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /fr/real_user_monitoring/browser/#setup
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web//Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: /fr/logs/log_configuration/attributes_naming_convention/#user-related-attributes