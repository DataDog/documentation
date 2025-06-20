---
aliases:
- /fr/real_user_monitoring/installation/advanced_configuration/
- /fr/real_user_monitoring/browser/modifying_data_and_context/
further_reading:
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: Documentation
  text: Suivi des actions utilisateur
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentation
  text: Données Browser RUM recueillies
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: Attributs standard Datadog
title: Configuration avancée
---

## Section Overview

Vous pouvez modifier les [données et le contexte collectés][1] par la fonctionnalité RUM de diverses façons afin de mieux répondre à vos besoins. Par exemple :

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
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
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

2. Vous devez lancer des vues pour chaque nouvelle page ou chaque changement de route (pour les applications monopages). Les données RUM sont recueillies à l'initialisation de la vue. Depuis la [version 4.13.0][17], vous avez également la possibilité de définir le nom et la version du service associé.

   - View Name : correspond par défaut au chemin d'URL de la page.
   - Service : correspond pas défaut au service par défaut spécifié lors de la création de votre application RUM.
   - Version : correspond pas défaut à la version par défaut spécifiée lors de la création de votre application RUM.

   Pour en savoir plus, consultez la section [Surveillance Browser RUM][4].

   <details open>
     <summary>Latest version</summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. Use <code>checkout</code> for the view name and associate the <code>purchase</code> service with version <code>1.2.3</code>.

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
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView({
         name: 'checkout',
         service: 'purchase',
         version: '1.2.3'
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
     name: 'checkout',
     service: 'purchase',
     version: '1.2.3'
   })
   ```
   {{% /tab %}}
   {{< /tabs >}}
   </details>

   <details>
     <summary>before <code>v4.13.0</code></summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. No service or version can be specified.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView('checkout')
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView('checkout')
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView('checkout')
   ```
   {{% /tab %}}
   {{< /tabs >}}

   </details>

Si vous utilisez React, Angular, Vue ou tout autre framework frontend, Datadog recommande d'implémenter la logique `startView` au niveau du routeur du framework.

### Instrumentation du routeur de React

Pour remplacer les noms par défaut de la vue du RUM afin de les aligner avec leur définition dans votre application React, vous devez suivre les étapes ci-dessous.

**Remarque** : ces instructions sont spécifiques à la bibliothèque **React Router v6**.

1. Définissez `trackViewsManually` sur `true` lorsque vous initialisez le SDK RUM Browser, comme décrit [plus haut](#remplacer-les-noms-de-la-vue-du-rum-par-defaut).

2. Lancez des vues sur chaque changement de route.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';
      import { datadogRum } from "@datadog/browser-rum";

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           datadogRum.startView({name: viewName});
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```

   {{% /tab %}}
   {{% tab "CDN asynchrone" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           DD_RUM.onReady(function() {
             DD_RUM.startView({name: viewName});
           });
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```
   {{% /tab %}}
   {{% tab "CDN synchrone" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           window.DD_RUM &&
             window.DD_RUM.startView({name: viewName});
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```
   {{% /tab %}}
   {{< /tabs >}}

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

En plus des attributs ajoutés avec l'[API de contexte global](#contexte-global) ou la [collecte de données Feature Flag](#enrichir-des-evenements-du-rum-avec-des-feature-flags), vous pouvez associer d'autres attributs de contexte à l'événement. Par exemple, ajoutez des tags à vos événements de ressource RUM à l'aide des données extraites à partir d'un objet de réponse Fetch :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // collecter des en-têtes de réponse d'une ressource RUM
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context.responseHeaders = Object.fromEntries(context.response.headers)
        }
        return true
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // collecter des en-têtes de réponse d'une ressource RUM
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context.responseHeaders = Object.fromEntries(context.response.headers)
            }
            return true
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
            // collecter des en-têtes de réponse d'une ressource RUM
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context.responseHeaders = Object.fromEntries(context.response.headers)
            }
            return true
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

### Enrichir des événements du RUM avec des feature flags

Vous pouvez [enrichir les données de vos événements RUM avec des feature flags][14] afin d'obtenir davantage de contexte et de visibilité sur le suivi des performances. Vous pouvez ainsi identifier les utilisateurs qui sont exposés à une expérience utilisateur spécifique et déterminer si cette expérience nuit aux performances de ces utilisateurs.

### Modifier le contenu d'un événement RUM

Par exemple, pour censurer les adresses e-mail de vos URL d'applications Web :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // supprimez l'adresse e-mail de l'url de la vue
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
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
            // supprimez l'adresse e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

Vous pouvez modifier les propriétés d'événement suivantes :

|   Attribut           |   Type    |   Rôle                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   Chaîne  |   L'URL de la page Web active.                            |
|   `view.referrer`       |   Chaîne  |   L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle.  |
|   `view.name`           |   Chaîne  |   Le nom de la vue actuelle.                            |
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
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
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

**Remarque** : les événements de la vue ne peuvent pas être ignorés.

## Session utilisateur

L'ajout des informations utilisateur à vos sessions RUM permet :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateurs dans l'interface RUM" >}}

Les attributs suivants sont facultatifs, mais Datadog vous recommande d'en renseigner au moins un :

| Attribut  | Type | Rôle                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identifiant d'utilisateur unique.                                                                                  |
| `usr.name`  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| `usr.email` | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Améliorez vos capacités de filtrage en ajoutant d'autres attributs en plus de ceux recommandés. Par exemple, ajoutez des informations à propos de l'abonnement de l'utilisateur ou du groupe d'utilisateurs auquel il appartient.

Lorsque vous modifiez l'objet de la session utilisateur, tous les événements RUM recueillis après la modification contiennent les informations les plus récentes.

**Remarque** : lorsque vous supprimez les informations relatives à la session de l'utilisateur, comme pour une déconnexion, les informations de l'utilisateur sur la dernière vue avant la déconnexion sont conservées, mais pas celles sur les vues ultérieures ni au niveau de la session, car les données de session utilisent les valeurs de la dernière vue.

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
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
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
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
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
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
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
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
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

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
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
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    })
})
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

## Consentement au suivi de lʼutilisateur

Pour répondre aux exigences du RGPD, le CCPA et dʼautres régulations similaires, le SDK RUM Browser vous permet de fournir la valeur de consentement au suivi à son initialisation. Pour en savoir plus sur le consentement au suivi, consultez la section relative à la [sécurité des données][18].

Le paramètre dʼinitialisation `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.granted` : le SDK RUM Browser commence à recueillir les données et les envoie à Datadog.
2. `"not-granted"` : le SDK RUM Browser ne recueille aucune donnée.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK RUM Browser, utilisez l'appel d'API `setTrackingConsent()`. Le SDK RUM Browser modifie son comportement en tenant compte de la nouvelle valeur.

* lorsque la valeur passe de `"granted"` à `"not-granted"`, la session du RUM sʼarrête et les données ne sont plus envoyées à Datadog.
* lorsque la valeur passe de `"not-granted"` à `"granted"`, une nouvelle session RUM est créée si aucune autre session préalable nʼest active. La collecte de données reprend alors.

Cet état n'est pas synchronisé entre les onglets ni conservé entre les navigations. Il est de votre responsabilité de fournir la décision de l'utilisateur lors de l'initialisation du SDK RUM Browser ou en utilisant `setTrackingConsent()`.

Lorsque `setTrackingConsent()` est utilisé avant `init()`, la valeur fournie est prioritaire sur le paramètre d'initialisation.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}
```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{< /tabs >}}

## Contexte global

### Ajouter une propriété de contexte global

Une fois la fonctionnalité RUM initialisée, ajoutez du contexte supplémentaire à l'ensemble des événements RUM recueillis depuis votre application avec l'API `setGlobalContextProperty(key: string, value: any)` :

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
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Exemple de code
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
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

### Supprimer une propriété de contexte global

Vous pouvez supprimer une propriété de contexte global précédemment définie.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Exemple de code
datadogRum.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Exemple de code
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Exemple de code
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{< /tabs >}}


### Remplacer le contexte global

Remplacez le contexte par défaut de tous vos événements RUM avec l'API `setGlobalContext(context: Context)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Exemple de code
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Exemple de code
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Exemple de code
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

### Effacer le contexte global

Vous pouvez effacer le contexte global à l'aide du paramètre `clearGlobalContext`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### Lire le contexte global

Une fois la fonctionnalité RUM initialisée, lisez le contexte global avec l'API `getGlobalContext()` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## Cycle de vie du contexte

Par défaut, le contexte global et le contexte utilisateur sont stockés dans la mémoire de la page actuelle, ce qui signifie qu'ils ne sont pas :

- conservés après une actualisation complète de la page
- partagés sur divers onglets ou diverses fenêtres de la même session

Pour les ajouter à tous les événements de la session, ils doivent être joints à chaque page.

Depuis le lancement de l'option de configuration `storeContextsAcrossPages`, avec la version 4.49.0 du SDK Browser, ces contextes peuvent être stockés dans [`localStorage`][19]. Ainsi :

- Les contextes sont préservés après une actualisation complète
- Les contextes sont synchronisés entre les onglets ouverts depuis la même origine

Toutefois, cette fonctionnalité possède certaines **limites** :

- Il n'est pas conseillé de définir des informations personnelles identifiables (ou Personable Identifiable Information - PII) dans ces contextes, car les données stockées dans `localStorage` sont conservées après la fin de la session de l'utilisateur.
- Cette fonctionnalité n'est pas compatible avec les options de `trackSessionAcrossSubdomains` car les données de `localStorage` ne sont partagées qu'avec la même origine (login.site.com ≠ app.site.com).
- `localStorage` est limité à 5 MiB par origine. Ainsi, les données spécifiques à une application, les contextes Datadog et les autres données tierces stockées de façon locale doivent respecter cette limite pour éviter tout problème.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /fr/real_user_monitoring/browser/setup
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
[17]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[18]: /fr/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage