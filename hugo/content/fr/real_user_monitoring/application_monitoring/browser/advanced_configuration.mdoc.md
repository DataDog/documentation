---
aliases:
- /fr/real_user_monitoring/installation/advanced_configuration/
- /fr/real_user_monitoring/browser/modifying_data_and_context/
- /fr/real_user_monitoring/browser/advanced_configuration/
content_filters:
- option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_advanced_config_options
  trait_id: rum_browser_sdk_version
description: Configurez le SDK RUM Browser pour modifier la collecte de données, remplacer
  les noms de vues, gérer les sessions utilisateur et contrôler l'échantillonnage
  selon les besoins de votre application.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentation
  text: Tracking User Actions
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentation
  text: Données Browser RUM recueillies
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorez vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: Attributs standard de Datadog
- link: https://learn.datadoghq.com/courses/configure-rum-javascript
  tag: Centre d'apprentissage
  text: Configurez la surveillance des utilisateurs réels (RUM) pour les applications
    web JavaScript
title: Configuration avancée
---
## Aperçu {% #overview %}

Vous pouvez modifier les [données et le contexte collectés][1] par la fonctionnalité RUM de diverses façons afin de mieux répondre à vos besoins. Par exemple :

- Protection des données sensibles telles que les informations personnellement identifiables.
- Connexion d'une session utilisateur avec votre identification interne de cet utilisateur, pour aider au support.
- Réduction de la quantité de données RUM que vous collectez, en échantillonnant les données.
- Fournir plus de contexte que ce que les attributs par défaut fournissent sur l'origine des données.

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

## Remplacer les noms de vues RUM par défaut {% #override-default-rum-view-names %}

À partir de [version 2.17.0][3], vous pouvez ajouter des noms de vues et les attribuer à un service dédié appartenant à une équipe en suivant manuellement les événements de vue avec l'option `trackViewsManually`.

Le SDK RUM Browser génère automatiquement un [événement de vue][2] pour chaque nouvelle page visitée par vos utilisateurs, ou lorsque l'URL de la page est modifiée (pour les applications à page unique). Un nom de vue est calculé à partir de l'URL de la page actuelle, où les identifiants variables sont supprimés automatiquement. Un segment de chemin contenant au moins un nombre est considéré comme un identifiant variable. Par exemple, `/dashboard/1234` et `/dashboard/9a` deviennent `/dashboard/?`.

Pour remplacer les noms de vues RUM par défaut :

1. Définissez `trackViewsManually` sur true lors de l'initialisation du SDK RUM Browser.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```
   {% /if %}
   <!-- ends NPM sync -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```
   {% /if %}
   <!-- ends CDN async -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```
   {% /if %}
   <!-- ends CDN sync -->
2. Vous devez démarrer des vues pour chaque nouvelle page ou changement de route (pour les applications à page unique). Les données RUM sont collectées lorsque la vue commence.
{% /if %}
<!-- Ends 2.17.0 -->


<!-- Version must meet 4.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.13.0") %}

### Définir le nom du service et la version {% #define-service-name-and-version %}

À partir de [version 4.13.0][16], vous pouvez également définir en option le nom du service associé et la version.

- **Nom de la vue** : Par défaut, il correspond au chemin de l'URL de la page.
- **Service** : Par défaut, il utilise le service par défaut spécifié lors de la création de votre application RUM.
- **Version** : Par défaut, il utilise la version par défaut spécifiée lors de la création de votre application RUM.
{% /if %}
<!-- ends 4.13.0 -->

<!-- version exclusive examples below-->

<!-- before 4.13 -->
{% if includes($rum_browser_sdk_version, ["lt_2_13_0", "gte_2_13_0", "gte_2_17_0"]) %}

## Suivre manuellement les pages vues {% #manually-track-pageviews %}

L'exemple suivant suit manuellement les pages vues sur la page `checkout` dans une application RUM. Aucun service ou version ne peut être spécifié.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView('checkout')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
        window.DD_RUM.startView('checkout')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{% /if %}
{% /if %}
<!-- ends before 4.13 -->

<!-- Between 4.13 and 5.28 -->
{% if includes($rum_browser_sdk_version, ["gte_4_13_0", "gte_4_49_0", "gte_5_22_0"]) %}

L'exemple suivant suit manuellement les pages vues sur la page `checkout` dans une application RUM. Il utilise `checkout` pour le nom de la vue et associe le service `purchase` à la version `1.2.3`.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}
{% /if %}
<!-- ends before 5.28 -->
<!-- ends version exclusive examples -->

<!-- Version must meet 5.28.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.28.0") %}

- **Contexte** : À partir de [version 5.28.0][19], vous pouvez ajouter un contexte aux vues et aux événements enfants des vues.

L'exemple suivant suit manuellement les pages vues sur la page `checkout` dans une application RUM. Utilisez `checkout` pour le nom de la vue et associez le service `purchase` à la version `1.2.3`.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends NPM -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.startView({
            name: 'checkout',
            service: 'purchase',
            version: '1.2.3',
            context: {
                payment: 'Done'
            },
      })
   })
   ```
   {% /if %}
   <!-- ends CDN async  -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends CDN sync -->
{% /if %}
<!-- ends 5.28.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

### Instrumentation du routeur React {% #react-router-instrumentation %}

Si vous utilisez React, Angular, Vue ou tout autre framework frontend, Datadog recommande d'implémenter la logique `startView` au niveau du routeur du framework.

Pour remplacer les noms par défaut de la vue du RUM afin de les aligner avec leur définition dans votre application React, vous devez suivre les étapes ci-dessous.

**Remarque** : Ces instructions sont spécifiques à la bibliothèque **React Router v6**.

1. Définissez `trackViewsManually` sur `true` lors de l'initialisation du SDK RUM Browser comme décrit [ci-dessus](#override-default-rum-view-names).

2. Démarrez les vues pour chaque changement de route.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
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
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
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
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
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
   {% /if %}
{% /if %}
<!-- Ends 2.17.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}
### Définir le nom de la vue {% #set-view-name %}

Utilisez `setViewName(name: string)` pour mettre à jour le nom de la vue actuelle. Cela vous permet de modifier le nom de la vue en cours sans démarrer une nouvelle vue.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.setViewName('<VIEW_NAME>');

   // Code example
   datadogRum.setViewName('Checkout');
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('<VIEW_NAME>');
   })

   // Code example
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('Checkout');
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

   // Code example
   window.DD_RUM && window.DD_RUM.setViewName('Checkout');
   ```
   {% /if %}

**Remarque** : Changer le nom de la vue affecte la vue et ses événements enfants à partir du moment où la méthode est appelée.
{% /if %}
<!-- Ends 2.17.0 -->

Pour en savoir plus, consultez la section [Surveillance Browser RUM][4].


## Enrichir et contrôler les données RUM {% #enrich-and-control-rum-data %}

Le SDK RUM Browser capture les événements RUM et remplit leurs principaux attributs. La fonction de rappel `beforeSend` vous donne accès à chaque événement collecté par le SDK RUM Browser avant qu'il ne soit envoyé à Datadog.

L'interception d'événements RUM vous permet d'effectuer les opérations suivantes :

- Enrichissez vos événements RUM avec des attributs de contexte supplémentaires
- Modifiez vos événements RUM pour altérer leur contenu ou masquer des séquences sensibles (voir [la liste des propriétés modifiables](#modify-the-content-of-a-rum-event))
- Éliminez les événements RUM sélectionnés

<!-- Version must meet 2.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.13.0") %}
À partir de la [version 2.13.0][5], `beforeSend` prend deux arguments : le `event` généré par le SDK RUM Browser et le `context` qui a déclenché la création de l'événement RUM.

```javascript
function beforeSend(event, context)
```

Les valeurs potentielles `context` sont :

| Type d'événement RUM   | Contexte                   |
|------------------|---------------------------|
| Vue             | [Emplacement][6]                  |
| Action           | [Événement][7] et pile de gestion                     |
| Ressource (XHR)   | [XMLHttpRequest][8], [PerformanceResourceTiming][9], et pile de gestion            |
| Ressource (Fetch) | [Requête][10], [Réponse][11], [PerformanceResourceTiming][9], et pile de gestion      |
| Ressource (Autre) | [PerformanceResourceTiming][9] |
| Erreur            | [Erreur][12]                     |
| Tâche longue        | [PerformanceLongTaskTiming][13] |

Pour en savoir plus, consultez le [guide pour enrichir et contrôler les données RUM][14].
{% /if %}
<!-- ends 2.13.0 -->

### Enrichissez les événements RUM {% #enrich-rum-events %}

Avec les attributs ajoutés via le [API de Contexte Global](#global-context) ou la [collecte de données des Drapeaux de Fonctionnalité](#enrich-rum-events-with-feature-flags), vous pouvez ajouter des attributs de contexte supplémentaires à l'événement. Par exemple, taguez vos événements de ressources RUM avec des données extraites d'un objet de réponse de fetch :
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event, context) => {
         // collect a RUM resource's response headers
         if (event.type === 'resource' && event.resource.type === 'fetch') {
               event.context.responseHeaders = Object.fromEntries(context.response.headers)
         }
         return true
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      });
   ```   
   {% /if %}

Lorsqu'un utilisateur appartient à plusieurs équipes, ajoutez des paires key-value supplémentaires dans vos appels de l'API de contexte global.

Le SDK RUM Browser ignore les attributs ajoutés en dehors de `event.context`.

### Enrichissez les événements RUM avec des drapeaux de fonctionnalité {% #enrich-rum-events-with-feature-flags %}

Vous pouvez [enrichir vos données d'événements RUM avec des drapeaux de fonctionnalité][14] pour obtenir un contexte et une visibilité supplémentaires sur la surveillance des performances. Cela vous permet de déterminer quels utilisateurs bénéficient d'une expérience utilisateur spécifique et si cela affecte négativement la performance de l'utilisateur.

### Modifier le contenu d'un événement RUM {% #modify-the-content-of-a-rum-event %}

Par exemple, pour censurer les adresses e-mail de vos URL d'applications Web :
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event) => {
         // remove email from view url
         event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      });
   ```
   {% /if %}

Vous pouvez modifier les propriétés d'événement suivantes :

| Attribut                      | Type   | Description                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | Chaîne | L'URL de la page web active.                                                                                                                                                           |
| `view.referrer`                | Chaîne | L'URL de la page web précédente à partir de laquelle un lien vers la page actuellement demandée a été suivi.                                                                                          |
| `view.name`                    | Chaîne | Le nom de la vue actuelle.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | Chaîne |   L'URL de la ressource pour le Largest Contentful Paint.                                                                                                                                 |
| `service`                      | Chaîne | Le nom du service pour votre application.                                                                                                                                                    |
| `version`                      | Chaîne | La version de l'application. Par exemple: 1.2.3, 6c44da20, ou 2020.02.13. |
| `action.target.name`           | Chaîne | L'élément avec lequel l'utilisateur a interagi. Uniquement pour les actions collectées automatiquement.                                                                                                      |
| `error.message`                | Chaîne | Un message concis, lisible par un humain, expliquant l'erreur.                                                                                                                         |
| `error.stack`                 | Chaîne | La trace de la pile ou des informations complémentaires sur l'erreur.                                                                                                                             |
| `error.resource.url`           | Chaîne | L'URL de la ressource qui a déclenché l'erreur.                                                                                                                                                |
| `resource.url`                 | Chaîne | L'URL de la ressource.                                                                                                                                                                         |
| `long_task.scripts.source_url` | Chaîne | L'URL de la ressource du script                                                                                                                                                                   |
| `long_task.scripts.invoker`    | Chaîne | Un nom significatif indiquant comment le script a été appelé                                                                                                                                    |
| `context`                      | Objet | Attributs ajoutés avec l'[API de Contexte Global](#global-context), l'[API de Contexte de Vue](#view-context), ou lors de la génération d'événements manuellement (par exemple, `addError` et **`addAction`**). |

Le SDK RUM Browser ignore les modifications apportées aux propriétés des événements non listées ci-dessus. Pour plus d'informations sur les propriétés des événements, consultez le [dépôt GitHub du SDK RUM Browser][15].

**Remarque** : Contrairement à d'autres événements, les événements de vue sont envoyés plusieurs fois à Datadog pour refléter les mises à jour survenant pendant leur cycle de vie. Une mise à jour d'un événement de vue précédent peut encore être envoyée pendant qu'une nouvelle vue est active. Datadog recommande de garder à l'esprit ce comportement lors de la modification du contenu d'un événement de vue.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### Écarter un événement RUM {% #discard-a-rum-event %}

Avec l'`beforeSend` API, écartez un événement RUM en retournant `false`:
<!-- NPM -->
{% if equals($lib_src, "npm") %}

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
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

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
{% /if %}

**Remarque** : Les événements de vue ne peuvent pas être écartés.

## Session utilisateur {% #user-session %}

L'ajout d’informations sur l’utilisateur à vos sessions RUM vous aide :

- Suivez le parcours d'un utilisateur donné
- Sachez quels utilisateurs sont les plus impactés par les erreurs
- Surveillez les performances de vos utilisateurs les plus importants

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API utilisateur dans l'interface utilisateur RUM" /%}

<!-- Version must meet 6.4.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "6.4.0") %}
Dans les versions 6.4.0 et supérieures, les attributs suivants sont disponibles :

| Attribut | Type | Requis |  Description                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Oui | Identifiant unique de l'utilisateur.                                                                                  |
| `usr.name`  | Chaîne | Non | Nom convivial de l'utilisateur, affiché par défaut dans l'interface utilisateur RUM.                                                  |
| `usr.email` | Chaîne | Non | Email de l'utilisateur, affiché dans l'interface utilisateur RUM si le nom de l'utilisateur n'est pas présent. Il est également utilisé pour récupérer des Gravatars. |
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(semverIsAtLeast($rum_browser_sdk_version, "6.4.0")) %}
Les attributs ci-dessous sont optionnels dans les versions antérieures à 6.4.0, mais Datadog recommande fortement de fournir au moins l'un d'eux. Par exemple, vous devez définir l'identifiant de l'utilisateur sur vos sessions pour voir des données pertinentes sur certains tableaux de bord RUM par défaut, qui s'appuient sur `usr.id` dans le cadre de la requête.

| Attribut | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identifiant unique de l'utilisateur.                                                                                  |
| `usr.name`  | Chaîne | Nom convivial de l'utilisateur, affiché par défaut dans l'interface utilisateur RUM.                                                  |
| `usr.email` | Chaîne | Email de l'utilisateur, affiché dans l'interface utilisateur RUM si le nom de l'utilisateur n'est pas présent. Il est également utilisé pour récupérer les Gravatars. |

**Remarque**: 'Utilisateur public' est affiché dans l'interface utilisateur RUM lorsque `usr.name` n'est pas défini, même si `usr.email` et `usr.id` sont définis.

Augmentez vos capacités de filtrage en ajoutant des attributs supplémentaires en plus de ceux recommandés. Par exemple, ajoutez des informations sur le plan de l'utilisateur, ou à quel groupe d'utilisateurs il appartient.

Lorsque vous modifiez l'objet de la session utilisateur, tous les événements RUM recueillis après la modification contiennent les informations les plus récentes.

**Remarque**: La suppression des informations de session de l'utilisateur, comme lors d'une déconnexion, conserve les informations de l'utilisateur sur la dernière vue avant la déconnexion, mais pas sur les vues ultérieures ou au niveau de la session, car les données de session utilisent les valeurs de la dernière vue.
{% /if %}
<!-- ends not 6.4.0 -->

### Identifier la session de l'utilisateur {% #identify-user-session %}

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

### Accéder à la session de l'utilisateur {% #access-user-session %}

`datadogRum.getUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getUser()
```
{% /if %}

### Ajouter/Remplacer la propriété de session de l'utilisateur {% #addoverride-user-session-property %}

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```
{% /if %}

### Supprimer la propriété de session de l'utilisateur {% #remove-user-session-property %}

`datadogRum.removeUserProperty('<USER_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeUserProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{% /if %}

### Effacer la propriété de session de l'utilisateur {% #clear-user-session-property %}

`datadogRum.clearUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{% /if %}

## Compte {% #account %}

Pour regrouper les utilisateurs en différents ensembles, utilisez le concept de compte.

Les attributs suivants sont disponibles :

| Attribut      | Type   | Requis | Description                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | Chaîne | Oui      | Identifiant unique du compte.                                 |
| `account.name` | Chaîne | Non       | Nom convivial du compte, affiché par défaut dans l'interface utilisateur RUM. |

### Identifier le compte {% #identify-account %}

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

### Accéder au compte {% #access-account %}

`datadogRum.getAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```
{% /if %}

### Ajouter/Remplacer la propriété du compte {% #addoverride-account-property %}

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```
{% /if %}

### Supprimer la propriété du compte {% #remove-account-property %}

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeAccountProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{% /if %}

### Effacer les propriétés du compte {% #clear-account-properties %}

`datadogRum.clearAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{% /if %}

## Échantillonnage {% #sampling %}

Par défaut, aucun échantillonnage n'est appliqué au nombre de sessions collectées. Pour appliquer un échantillonnage relatif (en pourcentage) au nombre de sessions collectées, utilisez le paramètre `sessionSampleRate` lors de l'initialisation de RUM.

L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{% /if %}

Lorsqu'une session est exclue en raison d'un échantillonnage, aucune vue de page ni aucune donnée de télémétrie associée à cette session ne sont recueillies.

## Consentement au suivi des utilisateurs {% #user-tracking-consent %}

Pour être conforme au RGPD, à la CCPA et à des réglementations similaires, le SDK RUM Browser vous permet de fournir la valeur de consentement au suivi lors de l'initialisation. Pour plus d'informations sur le consentement au suivi, voir [Sécurité des données][17].

Le paramètre d'initialisation `trackingConsent` peut être l'une des valeurs suivantes :

1. `"granted"` (défaut) : Le SDK RUM Browser commence à collecter des données et les envoie à Datadog.
2. `"not-granted"` : Le SDK RUM Browser ne collecte aucune donnée.

Pour changer la valeur de consentement au suivi après l'initialisation du SDK RUM Browser, utilisez l'appel API `setTrackingConsent()`. Le SDK RUM Browser change son comportement en fonction de la nouvelle valeur :

-  lorsqu'il est changé de `"granted"` à `"not-granted"`, la session RUM est arrêtée, les données ne sont plus envoyées à Datadog.
-  lorsqu'il est changé de `"not-granted"` à `"granted"`, une nouvelle session RUM est créée si aucune session précédente n'est active, et la collecte de données reprend.

Cet état n'est pas synchronisé entre les onglets ni conservé entre les navigations. Il est de votre responsabilité de fournir la décision de l'utilisateur lors de l'initialisation du SDK RUM Browser ou en utilisant `setTrackingConsent()`.

Lorsque `setTrackingConsent()` est utilisé avant `init()`, la valeur fournie prime sur le paramètre d'initialisation.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

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
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{% /if %}

## Voir le contexte {% #view-context %}


À partir de [version 5.28.0][20], le contexte des événements de vue est modifiable. Le contexte peut être ajouté uniquement à la vue actuelle et remplit ses événements enfants (tels que `action`, `error` et `timing`) avec les fonctions `startView`, `setViewContext` et `setViewContextProperty`.

### Démarrer la vue avec le contexte {% #start-view-with-context %}

Définissez éventuellement le contexte lors du démarrage d'une vue avec les options [`startView`](#override-default-rum-view-names).

### Ajouter le contexte de vue {% #add-view-context %}

Enrichissez ou modifiez le contexte des événements de vue RUM et des événements enfants correspondants avec l'API `setViewContextProperty(key: string, value: any)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Remplacer le contexte de vue {% #replace-view-context %}

Remplacez le contexte de vos événements de vue RUM et des événements enfants correspondants avec l'API `setViewContext(context: Context)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## Contexte d'erreur {% #error-context %}

### Attacher le contexte d'erreur local avec dd_context {% #attaching-local-error-context-with-dd-context %}

Lors de la capture d'erreurs, un contexte supplémentaire peut être fourni au moment où une erreur est générée. Au lieu de passer des informations supplémentaires par l'API `addError()`, vous pouvez attacher une propriété `dd_context` directement à l'instance d'erreur. Le SDK RUM Browser détecte automatiquement cette propriété et l'intègre dans le contexte final de l'événement d'erreur.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## Contexte global {% #global-context %}

### Ajouter la propriété de contexte global {% #add-global-context-property %}

Après l'initialisation de RUM, ajoutez un contexte supplémentaire à tous les événements RUM collectés depuis votre application avec l'API `setGlobalContextProperty(key: string, value: any)` :
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Supprimer la propriété de contexte global {% #remove-global-context-property %}

Vous pouvez supprimer une propriété de contexte global précédemment définie.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### Remplacer le contexte global {% #replace-global-context %}

Remplacez le contexte par défaut de tous vos événements RUM avec l'API `setGlobalContext(context: Context)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### Effacer le contexte global {% #clear-global-context %}

Vous pouvez effacer le contexte global en utilisant `clearGlobalContext`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### Lire le contexte global {% #read-global-context %}

Une fois RUM initialisé, lisez le contexte global avec l'API `getGlobalContext()`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

## Cycle de vie des contextes {% #contexts-life-cycle %}

Par défaut, le contexte global et le contexte utilisateur sont stockés dans la mémoire de la page actuelle, ce qui signifie qu'ils ne sont pas :

- conservé après un rechargement complet de la page
- partagé entre différents onglets ou fenêtres de la même session

Pour les ajouter à tous les événements de la session, ils doivent être joints à chaque page.

<!-- Version must meet 4.49.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.49.0") %}
Avec l'introduction de l'option de configuration `storeContextsAcrossPages` dans la version 4.49.0, ces contextes peuvent être stockés dans [`localStorage`][18], permettant les comportements suivants :

- Les contextes sont préservés après un rechargement complet
- Les contextes sont synchronisés entre les onglets ouverts sur la même origine

Cependant, cette fonctionnalité présente certaines **limitations** :

- Il n'est pas recommandé de définir des informations personnellement identifiables (PII) dans ces contextes, car les données stockées dans `localStorage` survivent à la session utilisateur
- La fonctionnalité est incompatible avec les options `trackSessionAcrossSubdomains` car les données `localStorage` ne sont partagées qu'entre la même origine (login.site.com ≠ app.site.com)
- `localStorage` est limité à 5 MiB par origine, donc les données spécifiques à l'application, les contextes Datadog et d'autres données tierces stockées dans le stockage local doivent être dans cette limite pour éviter tout problème

{% /if %}
<!-- ends  4.49.0 -->

## Contexte interne {% #internal-context %}

Une fois le SDK Browser RUM Datadog initialisé, vous pouvez accéder au contexte interne du SDK. Cela fournit des identifiants et des métadonnées de base que le SDK utilise en interne, tels que les ID de session et les détails de l'application.

Vous pouvez analyser les attributs suivants :

| Attribut      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID de l'application.                                            |
| session_id     | ID de la session.                                                |
| user_action    | Objet contenant l'ID de l'action (ou indéfini si aucune action n'est trouvée). |
| view           | Objet contenant des détails sur l'événement de view actuel.           |

Pour en savoir plus, consultez la section [Données RUM recueillies (Browser)][2].

### Exemple {% #example %}

```json
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

Vous pouvez optionnellement utiliser le paramètre `startTime` pour obtenir le contexte d'un moment spécifique. Si le paramètre est omis, le contexte actuel est retourné.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}


## Micro frontend {% #micro-frontend %}

Le SDK RUM Browser prend en charge les architectures de micro frontend en attribuant des événements à des micro frontends spécifiques à l'aide des attributs `service` et `version`. Une seule instance du SDK RUM fonctionne au niveau du shell. Les événements sont segmentés par `service` et `version` afin que les équipes puissent filtrer les tableaux de bord, définir des alertes et suivre les performances par micro frontend.

Datadog fournit deux approches pour attribuer des événements RUM aux micro frontends :

1. **Attribution automatique** : Utilise un plugin de construction qui injecte le contexte du code source, éliminant ainsi l'analyse manuelle des traces de pile.
2. **Attribution manuelle** : Utilise la fonction de rappel `beforeSend` pour analyser les traces de pile et extraire les informations sur le service.


### Attribution automatique des services et des versions {% #automatic-service-and-version-attribution %}

Cette approche utilise un plugin de construction pour injecter le contexte du code source dans vos bundles, que le SDK RUM lit automatiquement pour enrichir les événements avec les `service` et `version` corrects.

#### Prérequis et configurations prises en charge {% #prerequisites-and-supported-setups %}

-   **Bundles séparés** : Chaque micro frontend a son propre bundle avec des chemins de fichiers distincts, par exemple, en utilisant [module federation][21].
-   **Bundler pris en charge** : Utilisez un bundler [pris en charge par les plugins de build Datadog][22].
-   **Browser SDK** : Version du Browser SDK v6.30.1 ou supérieure.

#### Guide de configuration {% #setup-guide %}

**Étape 1 - Configurez le [plugin de construction][23] pour chaque micro frontend**

Dans la configuration de construction de chaque micro frontend, activez l'injection du contexte du code source :

{% tabs %}
{% tab label="Webpack" %}

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
    plugins: [
        new datadogWebpackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Vite" %}

```javascript
import { datadogVitePlugin } from '@datadog/vite-plugin';

export default {
    plugins: [
        datadogVitePlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="esbuild" %}

```javascript
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
    plugins: [
        datadogEsbuildPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
});
```
{% /tab %}

{% tab label="Rollup" %}

```javascript
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
    plugins: [
        datadogRollupPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Rspack" %}

```javascript
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
    plugins: [
        new datadogRspackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}
{% /tabs %}

**Étape 2 - Configurez le Browser SDK au niveau du shell**

[Configurez la surveillance du navigateur][4] dans votre application shell (point d'entrée principal). Le Browser SDK enrichit automatiquement les événements RUM (erreurs, actions personnalisées, ressources XHR/Fetch, tâches longues, indicateurs) avec `service` et `version` à partir de la carte de contexte.

{% alert level="warning" %}
Les événements qui ne correspondent à aucun micro frontend se rabattent sur le service et la version au niveau du shell.
{% /alert %}

**Étape 3 - [Explorer les données des micro frontends dans Datadog](#explore-micro-frontend-data-in-datadog)**


<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

### Attribution manuelle du service et de la version {% #manual-service-and-version-attribution %}

Dans la propriété `beforeSend`, vous pouvez remplacer les propriétés de service et de version. Pour vous aider à identifier l'origine de l'événement, utilisez la propriété `context.handlingStack`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

L'expression régulière doit correspondre à la structure du chemin de fichier de votre application. Ajustez le modèle pour extraire le service et la version de vos URL de bundle. Toute requête dans l'Explorateur RUM peut utiliser l'attribut de service pour filtrer les événements.
<!-- ends  5.22 -->

{% /if %}

### Limitations {% #limitations %}

#### Événements sans origine attribuée {% #events-without-an-attributed-origin %}

Certains événements ne peuvent pas être attribués à une origine car ils n'ont pas de pile de gestion associée :

-   Événements d'action collectés automatiquement
-   Événements de ressources autres que XHR et Fetch
-   Événements de vue collectés automatiquement
-   Violations CORS et CSP

#### Résolution de la carte source à travers les micro frontends {% #source-map-resolution-across-micro-frontends %}

Lorsqu'une trace de pile contient des frames de plusieurs micro frontends, l'événement reçoit un seul `service` et `version` du frame le plus haut (où l'erreur a été lancée). Les cartes sources sont résolues pour l'événement sous ce service unique, donc les frames d'autres micro frontends restent minifiées, même lorsque leurs cartes sources ont été correctement téléchargées sous leur propre `service`.

Pour contrôler quelles cartes sources de micro frontend sont utilisées, utilisez l'approche [d'attribution manuelle](#manual-service-and-version-attribution) avec `beforeSend` pour définir `event.service` et `event.version`. Seules les frames appartenant au micro frontend choisi sont déminifiées.

### Explorez les données des micro frontends dans Datadog {% #explore-micro-frontend-data-in-datadog %}

Après la configuration, les `service` et `version` sur les événements RUM identifient quel micro frontend a généré chaque événement. Utilisez ces attributs à plusieurs endroits dans Datadog :

-   **Panneaux latéraux** : Les attributs `service` et `version` apparaissent dans les panneaux latéraux de session, de vue, d'erreur, de ressource, d'action et de tâche longue dans l'Explorateur RUM.
-   **Tableau de bord RUM Summary** : Utilisez les `service` et `version` pour filtrer dans le tableau de bord RUM Summary afin de restreindre les métriques de performance à un micro frontend spécifique.
-   **Tableaux de bord personnalisés** : Créez des tableaux de bord en utilisant les `service` et `version` pour surveiller chaque micro frontend de manière indépendante.

Les balises `service` et `version` représentant chaque micro frontend peuvent également être trouvées dans les métriques suivantes : [RUM without Limits][24]

- `rum.measure.error`
- `rum.measure.operation`
- `rum.measure.operation.duration`

[1]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[17]: /fr/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[19]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[20]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration#override-default-rum-view-names
[21]: https://module-federation.io/
[22]: https://github.com/DataDog/build-plugins?tab=readme-ov-file#usage
[23]: https://github.com/DataDog/build-plugins
[24]: /fr/real_user_monitoring/rum_without_limits/