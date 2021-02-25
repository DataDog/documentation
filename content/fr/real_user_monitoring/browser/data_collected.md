---
title: Données de navigateur RUM recueillies
kind: documentation
aliases:
  - /fr/real_user_monitoring/data_collected/
  - /fr/real_user_monitoring/data_collected/view/
  - /fr/real_user_monitoring/data_collected/resource/
  - /fr/real_user_monitoring/data_collected/long_task/
  - /fr/real_user_monitoring/data_collected/error/
  - /fr/real_user_monitoring/data_collected/user_action/
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: Générer des analyses à partir de vos événements
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standard Datadog
---
Par défaut, toutes les données recueillies sont conservées avec une granularité complète pendant 15 jours. Le script Real User Monitoring de Datadog envoie 5 grands types d'événements à Datadog :

- [Vue][1] : À chaque fois qu'un utilisateur accède à une page de l'application configurée, un événement de type Vue est créé. Tant que l'utilisateur reste sur la page, toutes les données recueillies sont associées à cette vue via l'attribut `view.id`.
- [Ressource][2] : Un événement de type Ressource peut être généré pour les images, les XHR/Fetch, le CSS ou les bibliothèques JS. Celui-ci contient des informations sur la ressource, telles que son nom et le temps de chargement associé.
- [Tâche longue][3] : Lorsqu'une tâche dans un navigateur bloque le thread principal pendant plus de 50 ms, celle-ci est considérée comme une tâche longue et génère un événement spécifique.
- [Erreur][4] : À chaque fois qu'une erreur frontend est générée par le navigateur, celle-ci est enregistrée et transmise à Datadog en tant qu'événement de type Erreur.
- [Action utilisateur][5] : Un événement de type Action utilisateur correspond à un événement personnalisé qui peut être généré pour une action utilisateur donnée.

{{< tabs >}}
{{% tab "Vue" %}}

Une vue de page correspond à la consultation d'une page de votre site Web par un utilisateur. À chaque vue de page, les [erreurs][1], les [ressources][2], les [tâches longues][3] et les [actions utilisateur][4] associées sont mises en relation avec la vue via un attribut `view.id` unique. Notez que les vues de page sont mises à jour lorsque de nouveaux événements sont recueillis.

Pour les vues de page, des métriques de performance de chargement sont recueillies à partir de l'[API Paint Timing][5] ainsi que de l'[API Navigation Timing][6].

## Applications monopage

Pour les applications monopage (SPA), le SDK RUM différencie les navigations `initial_load` et `route_change` avec l'attribut `loading_type`. Si un clic sur votre page Web dirige vers une nouvelle page sans actualisation complète de la page, le SDK RUM initie un nouvel événement d'affichage avec `loading_type:route_change`. La solution RUM détecte les changements de page à l'aide de l'[API History][7].

Datadog fournit une métrique de performance unique, `loading_time`, qui calcule le temps nécessaire au chargement d'une page. Cette métrique fonctionne pour les navigations `initial_load` et `route_change`.

### Comment le temps de chargement est-il calculé ?
Pour assurer la compatibilité avec les applications Web modernes, le temps de chargement est calculé à partir des requêtes réseau et des mutations DOM.

* **Chargement initial** : Le temps de chargement est égal à *la mesure la plus longue* entre :

    - La différence entre `navigationStart` et `loadEventEnd` ;
    - La différence entre `navigationStart` et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

* **Changement de route dans une application monopage** : Le temps de chargement est égal à la différence entre le clic de l'utilisateur et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

### Navigation par hash dans une application monopage

Les frameworks qui utilisent une navigation par hash (`#`) sont automatiquement surveillés avec le SDK RUM. Le SDK détecte les `HashChangeEvent` et génère une nouvelle vue. Les événements issus d'une ancre HTML n'affectent pas le contexte de la vue actuelle et sont ignorés.

## Durées et métriques des vues

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Vue d'ensemble des mesures"  >}}

| Attribut                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                                  |
| `view.loading_time`                             | nombre (ns) | Temps avant que la page soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. Pour en savoir plus, consultez la [documentation sur les données collectées][8].|
| `view.first_contentful_paint` | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canvas non blanc ou d'un SVG. Pour en savoir plus sur le rendu par le navigateur, consultez la [définition du w3][9].                                                                                            |
| `view.dom_interactive`        | nombre (ns) | Le moment auquel le parser termine de travailler sur le document principal. [Consulter la documentation MDN pour en savoir plus][10].                                                                                                               |
| `view.dom_content_loaded`     | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial a été entièrement chargé et parsé, même si les stylesheets, les images et les subframes qui ne bloquent pas le rendu n'ont pas fini de charger. [Consulter la documentation MDN pour en savoir plus][11]. |
| `view.dom_complete`           | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. [Consulter la documentation MDN pour en savoir plus][12].                                                                             |
| `view.load_event_end`         | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. [Consulter la documentation MDN pour en savoir plus][13].                                                                                   |
| `view.error.count`            | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                        |
| `view.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                           |
| `view.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                            |
| `view.action.count`      | nombre      | Nombre total d'actions recueillies pour cette vue.

[1]: /fr/real_user_monitoring/data_collected/error/
[2]: /fr/real_user_monitoring/data_collected/resource/
[3]: /fr/real_user_monitoring/data_collected/long_task/
[4]: /fr/real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: /fr/real_user_monitoring/data_collected/view/#how-is-loading-time-calculated
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "Ressource" %}}

Toutes les ressources de votre site Web sont recueillies par défaut : images, XHR, [XMLHttpRequest][1], fichiers CSS, ressources JS et fichiers de polices.

L'[API Performance Resource Timing][2] recueille des données réseau temporelles détaillées sur le chargement des ressources d'une application.

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="Métriques de ressource"  >}}

## Durées des ressources

| Attribut                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | nombre         | Durée totale de chargement de la ressource.                                                                                                   |
| `resource.size`                | nombre (octets) | Taille de la ressource.                                                                                                                            |
| `resource.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | nombre (ns)    | Durée d'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart).                                           |
| `resource.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                                                                         |

## Attributs des ressources

| Attribut                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | chaîne | Le type de ressource à recueillir (par exemple, `css`, `javascript`, `media`, `XHR` ou `image`).           |
| `resource.method`                | chaîne | La méthode HTTP (par exemple, `POST` ou `GET`).           |
| `resource.status_code`             | nombre | Le code de statut de la réponse.                                                               |
| `resource.url`                     | chaîne | L'URL de la ressource.                                                                       |
| `resource.url_host`        | chaîne | La partie de l'URL correspondant au host.                                                          |
| `resource.url_path`        | chaîne | La partie de l'URL correspondant au chemin.                                                          |
| `resource.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête. |
| `resource.url_scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |
| `resource.provider.name`      | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                            |
| `resource.provider.domain`      | chaîne | Le domaine du fournisseur de ressources.                                            |
| `resource.provider.type`      | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`).                                            |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "Tâche longue" %}}

Une tâche est dite [longue][1] lorsqu'elle bloque le thread principal pendant 50 ms ou plus. Les tâches longues peuvent entraîner une latence élevée, un décalage des interactions, etc. Découvrez pourquoi certaines de vos tâches prennent du temps à s'exécuter dans l'analyseur de performances de votre navigateur.

## Durées des tâches longues

| Attribut  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | nombre | Durée de la tâche longue. |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
{{% /tab %}}
{{% tab "Erreur" %}}

Les erreurs frontend sont recueillies par le service Real User Monitoring (RUM). Le message d'erreur et la stack trace sont inclus lorsque cela est possible.

## Origines des erreurs
Les erreurs front-end sont réparties en 4 catégories différentes, en fonction de leur `error.origin` :

- **réseau** : erreurs XHR ou Fetch résultant de requêtes AJAX. Les attributs spécifiques aux erreurs réseau sont disponibles [dans la documentation][1].
- **source** : exceptions non gérées ou objets Promise rejetés non gérés (ces erreurs sont liées au code source).
- **console** : appels d'API `console.error()`.
- **custom** : les erreurs envoyées avec l'[API `addError` RUM][2] prennent la valeur par défaut `custom`.

## Attributs d'erreur

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console` ou `network`).     |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |

### Erreurs réseau

Les erreurs réseau comprennent des informations sur la requête HTTP ayant échoué. Les facettes suivantes sont également recueillies :

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

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Plus d'informations concernant les différents types d'erreurs sont disponibles dans [la documentation MDN][3].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |


[1]: /fr/real_user_monitoring/data_collected/error/#network-errors
[2]: /fr/real_user_monitoring/browser/advanced_configuration#custom-errors
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
{{% /tab %}}
{{% tab "Action utilisateur" %}}

## Collecte automatique des actions
Le SDK Real User Monitoring (RUM) détecte les interactions effectuées par un utilisateur durant son parcours. Pour activer cette fonctionnalité, définissez le [paramètre de lancement][1] `trackInteractions` sur `true`.

**Remarque** : le paramètre de lancement `trackInteractions` permet la collecte des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

Une fois qu'une interaction est détectée, tous les nouveaux événements RUM sont associés à l'action en cours jusqu'à ce qu'elle soit considérée comme terminée. L'action est également associée à ses attributs d'affichage parents : informations sur le navigateur, données de géolocalisation ou encore [contexte global][2].

### Comment la durée de chargement de l'action est-elle calculée ?
Une fois qu'une interaction est détectée, le SDK RUM surveille les requêtes réseau et les mutations DOM. L'action utilisateur est considérée comme terminée lorsqu'aucune activité n'est effectuée sur la page pendant plus de 100 ms (une activité étant définie comme des requêtes réseau en cours ou une mutation DOM).

## Actions utilisateur personnalisées
Les actions utilisateur personnalisées sont des actions utilisateur déclarées et envoyées manuellement via l'[API `addAction`][3]. Elles permettent d'envoyer des informations relatives à un événement qui a lieu au cours d'un parcours utilisateur, telles qu'une durée personnalisée ou des informations sur le panier client.

## Durées et métriques des actions

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action. Consultez la [documentation relative aux actions utilisateur][4] pour découvrir comment elle est calculée. |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

## Attributs d'action

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les [actions utilisateur personnalisées][5], ce paramètre est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Le nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les [actions utilisateur personnalisées][5], il s'agit du nom d'action indiqué dans l'appel de l'API. |

[1]: /fr/real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#custom-user-actions
[4]: /fr/real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[5]: /fr/real_user_monitoring/data_collected/user_action#custom-user-actions
{{% /tab %}}
{{< /tabs >}}

## Attributs par défaut

Ces cinq types d'événements sont associés à des attributs par défaut :

### Core

| Nom de l'attribut   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | chaîne | Le type de l'événement (par exemple, `view` ou `resource`).             |
| `application.id` | chaîne | L'ID d'application Datadog. |

### Attributs de vue

| Nom de l'attribut                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | chaîne | ID généré aléatoirement pour chaque vue de page.                                                                      |
| `view.loading_type`                     | chaîne | Le type de chargement de page : `initial_load` ou `route_change`. Pour en savoir plus, consultez la [documentation sur la prise en charge des applications monopage][6].|
| `view.referrer`                | chaîne | L'URL de la page web précédente, à partir de laquelle un lien vers la page demandée à été sélectionné.               |
| `view.url`                     | chaîne | L'URL de la vue.                                                                                                  |
| `view.url_hash`                     | chaîne | La partie de l'URL correspondant au hachage.|
| `view.url_host`        | chaîne | La partie de l'URL correspondant au host.                                                                                |
| `view.url_path`        | chaîne | La partie de l'URL correspondant au chemin.                                                                                 |
| `view.url_path_group`  | chaîne | Le groupe d'URL généré automatiquement pour les URL connexes (par exemple, `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`). |
| `view.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête.                        |
| `view.url_scheme` | objet | La partie de l'URL correspondant au schéma.                        |

### Appareil

Les attributs sur l'appareil suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | chaîne | Le type d'appareil indiqué par le user-agent.       |
| `device.brand`  | chaîne | La marque de l'appareil indiquée par le user-agent.  |
| `device.model`   | chaîne | Le modèle de l'appareil indiqué par le user-agent.   |
| `device.name` | chaîne | Le nom de l'appareil indiqué par le user-agent. |

### Système d'exploitation

Les attributs sur le système d'exploitation suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | chaîne | Le nom du système d'exploitation indiqué par le user-agent.       |
| `os.version`  | chaîne | La version du système d'exploitation indiquée par le user-agent.  |
| `os.version_major`   | chaîne | La version majeure du système d'exploitation indiquée par le user-agent.   |

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation d'adresses IP :

| Nom complet                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | chaîne | Le nom du pays.                                                                                                                  |
| `geo.country_iso_code`     | chaîne | Le [code ISO][7] du pays (par exemple, `US` pour les États-Unis, `FR` pour la France).                                                  |
| `geo.country_subdivision`     | chaîne | Le nom du premier niveau de division du pays (par exemple, `California` aux États-Unis ou le département de la `Sarthe` en France). |
| `geo.country_subdivision_iso_code` | chaîne | Le [code ISO][7] du premier niveau de division du pays (par exemple, `CA` aux États-Unis ou le département `SA` en France).    |
| `geo.continent_code`       | chaîne | Le code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` ou `OC`).                                                                 |
| `geo.continent`       | chaîne | Le nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America` ou `Oceania`).                    |
| `geo.city`            | chaîne | Le nom de la ville (par exemple, `Paris`, `New York`).                                                                                   |

## Attributs supplémentaires

En plus des attributs par défaut, vous pouvez ajouter un [contexte global spécifique][1] à l'ensemble des événements recueillis afin d'analyser les données associées à un certain groupe d'utilisateurs. Vous pouvez par exemple regrouper les erreurs en fonction de l'adresse e-mail utilisateur, identifier les clients qui affichent les plus mauvaises performances, etc.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/real_user_monitoring/browser/advanced_configuration/
[2]: /fr/real_user_monitoring/browser/data_collected/?tab=resource
[3]: /fr/real_user_monitoring/browser/data_collected/?tab=longtask
[4]: /fr/real_user_monitoring/browser/data_collected/?tab=error
[5]: /fr/real_user_monitoring/browser/data_collected/?tab=useraction
[6]: /fr/real_user_monitoring/data_collected/view#single-page-applications
[7]: /fr/logs/processing/attributes_naming_convention/#user-agent-attributes
