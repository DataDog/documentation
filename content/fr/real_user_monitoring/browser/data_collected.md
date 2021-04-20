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
Le SDK Real User Monitoring Datadog génère six types d'événements :

| Type d'événement     | Rétention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 jours   | Une session utilisateur débute lorsqu'un utilisateur commence à parcourir l'application Web. Une session inclut des informations générales sur l'utilisateur (navigateur, appareil, géolocalisation). Elle agrège tous les événements RUM recueillis lors du parcours utilisateur en appliquant un attribut `session.id` unique. |
| Vue      | 30 jours   | Un événement de type Vue est généré à chaque fois qu'un utilisateur consulte une page de l'application Web. Tant que l'utilisateur reste sur la même page, les événements de type Ressource, Tâche longue, Erreur et Action sont associés à cette vue RUM via l'attribut `view.id`.                       |
| Ressource  | 15 jours   | Un événement de type Ressource est généré pour les images, XHR, Fetch, CSS ou bibliothèques JS chargés sur une page Web. Celui-ci contient des informations détaillées sur le temps de chargement.                                                                                                              |
| Tâche longue | 15 jours   | Un événement de type Tâche longue est généré à chaque fois qu'une tâche du navigateur bloque le thread principal pendant plus de 50 ms.                                                                                                                                                    |
| Erreur     | 30 jours   | La fonction RUM recueille toutes les erreurs frontend émises par le navigateur.                                                                                                                                                                                                     |
| Action    | 30 jours   | Les événements RUM de type Action enregistrent les interactions effectuées durant chaque parcours utilisateur et peuvent également être envoyés manuellement pour surveiller des actions utilisateur personnalisées.                                                                                                                                 |

Le schéma suivant présente la hiérarchie des événements RUM :

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Hiérarchie des événements RUM" style="width:50%;border:none" >}}

## Attributs par défaut et attributs spécifiques à un événement

Certaines métriques et certains attributs sont spécifiques à un type d'événement. Par exemple, la métrique `view.loading_time` est associée aux événements RUM de type Vue, tandis que l'attribut `resource.method` est associé aux événements RUM de type Ressource. Des [attributs par défaut](attributs-par-defaut) sont également inclus pour l'ensemble des événements RUM. Il s'agit par exemple de l'URL de la page (`view.url`) et de certaines informations utilisateur, comme le type d'appareil (`device.type`) et le pays (`geo.country`).
## Attributs par défaut

Chacun de ces types d'événements possède par défaut les attributs ci-dessous. Vous pouvez donc toujours les utiliser, peu importe le type d'événement RUM interrogé.

### Core

| Nom de l'attribut   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | chaîne | Le type de l'événement (par exemple, `view` ou `resource`).             |
| `application.id` | chaîne | L'ID d'application Datadog. |

### Attributs de vue

Les événements RUM de type Action, Erreur, Ressource et Tâche longue contiennent des informations sur la vue RUM active au moment de la collecte :

| Nom de l'attribut                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | chaîne | ID généré aléatoirement pour chaque vue de page.                                                                      |
| `view.loading_type`                     | chaîne | Le type de chargement de page : `initial_load` ou `route_change`. Pour en savoir plus, consultez la [documentation sur la prise en charge des applications monopage](applications-monopage).|
| `view.referrer`                | chaîne | L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle.               |
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
| `device.type`       | chaîne | Le type d'appareil indiqué par l'appareil (en-tête HTTP User-Agent)      |
| `device.brand`  | chaîne | La marque de l'appareil indiquée par l'appareil (en-tête HTTP User-Agent)  |
| `device.model`   | chaîne | Le modèle de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent)   |
| `device.name` | chaîne | Le nom de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent) |

### Système d'exploitation

Les attributs sur le système d'exploitation suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | chaîne | Le nom du système d'exploitation indiqué par l'appareil (en-tête HTTP User-Agent)       |
| `os.version`  | chaîne | La version du système d'exploitation indiquée par l'appareil (en-tête HTTP User-Agent)  |
| `os.version_major`   | chaîne | La version majeure du système d'exploitation indiquée par l'appareil (en-tête HTTP User-Agent)   |

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP :

| Nom complet                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | chaîne | Le nom du pays.                                                                                                                  |
| `geo.country_iso_code`     | chaîne | Le [code ISO][1] du pays (par exemple, `US` pour les États-Unis, `FR` pour la France).                                                  |
| `geo.country_subdivision`     | chaîne | Le nom du premier niveau de division du pays (par exemple, `California` aux États-Unis ou le département de la `Sarthe` en France). |
| `geo.country_subdivision_iso_code` | chaîne | Le [code ISO][1] du premier niveau de division du pays (par exemple, `CA` aux États-Unis ou le département `SA` en France).    |
| `geo.continent_code`       | chaîne | Le code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` ou `OC`).                                                                 |
| `geo.continent`       | chaîne | Le nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America` ou `Oceania`).                    |
| `geo.city`            | chaîne | Le nom de la ville (par exemple, `Paris`, `New York`).                                                                                   |
## Attributs utilisateur

En plus des attributs par défaut, vous pouvez ajouter des données sur les utilisateurs aux événements RUM de tous types en [identifiant les sessions utilisateur][2]. Vous avez ainsi la possibilité de suivre le parcours d'un utilisateur spécifique, de voir les utilisateurs les plus affectés par des erreurs et de surveiller les performances de vos utilisateurs les plus importants.

## Attributs spécifiques à un événement

{{< tabs >}}
{{% tab "Session" %}}

### Métriques des sessions

| Métrique  | Type   | Description                |
|------------|--------|----------------------------|
| `session.time_spent` | nombre (ns) | Durée d'une session utilisateur. |
| `session.view.count`        | nombre      | Nombre total de vues recueillies lors de la session. |
| `session.error.count`      | nombre      | Nombre total d'erreurs recueillies lors de la session.  |
| `session.resource.count`         | nombre      | Nombre total de ressources recueillies lors de la session. |
| `session.action.count`      | nombre      | Nombre total d'erreurs recueillies lors de la session. |
| `session.long_task.count`      | nombre      | Nombre total de tâches longues recueillies lors de la session. |

### Attributs des sessions

| Nom de l'attribut                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | chaîne | Un ID généré aléatoirement pour chaque session.view.                                                                      |
| `session.type`                     | chaîne | Le type de session : `user` ou `synthetics`. Les sessions provenant des [tests Browser de la surveillance Synthetic][1] sont exclus de la facturation. |
| `session.referrer`                | chaîne | L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle. |
| `session.initial_view.id`        | chaîne | L'ID de la première vue RUM générée par l'utilisateur. |
| `session.initial_view.url_host`        | chaîne | La partie de l'URL correspondant au host. |
| `session.initial_view.url_path`        | chaîne | La partie de l'URL correspondant au chemin. |
| `session.initial_view.url_path_group`  | chaîne | Le groupe d'URL généré automatiquement pour les URL connexes (par exemple, `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`). |
| `session.initial_view.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête. |
| `session.initial_view.url_scheme` | objet | La partie de l'URL correspondant au schéma. |
| `session.last_view.id`        | chaîne | L'ID de la dernière vue RUM générée par l'utilisateur. |
| `session.last_view.url_host`        | chaîne | La partie de l'URL correspondant au host. |
| `session.last_view.url_path`        | chaîne | La partie de l'URL correspondant au chemin. |
| `session.last_view.url_path_group`  | chaîne | Le groupe d'URL généré automatiquement pour les URL connexes (par exemple, `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`). |
| `session.last_view.url_query` | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête. |
| `session.last_view.url_scheme` | objet | La partie de l'URL correspondant au schéma. |

[1]: /fr/synthetics/browser_tests/
{{% /tab %}}
{{% tab "Vue" %}}

### Applications monopages

Pour les applications monopage (SPA), le SDK RUM différencie les navigations `initial_load` et `route_change` avec l'attribut `loading_type`. Si un clic sur votre page Web dirige vers une nouvelle page sans actualisation complète de la page, le SDK RUM initie un nouvel événement d'affichage avec `loading_type:route_change`. La solution RUM détecte les changements de page à l'aide de l'[API History][1].

Datadog fournit une métrique de performance unique, `loading_time`, qui calcule le temps nécessaire au chargement d'une page. Cette métrique fonctionne pour les navigations `initial_load` et `route_change`.

#### Comment le temps de chargement est-il calculé ?
Pour assurer la compatibilité avec les applications Web modernes, le temps de chargement est calculé à partir des requêtes réseau et des mutations DOM.

* **Chargement initial** : Le temps de chargement est égal à *la mesure la plus longue* entre :

    - La différence entre `navigationStart` et `loadEventEnd` ;
    - La différence entre `navigationStart` et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

* **Changement de route dans une application monopage** : Le temps de chargement est égal à la différence entre le clic de l'utilisateur et la première fois qu'aucune activité n'est détectée sur la page pendant plus de 100 ms (une activité étant définie comme une requête réseau en cours ou une mutation DOM).

#### Navigation par hash dans une application monopage

Les frameworks qui utilisent une navigation par hash (`#`) sont automatiquement surveillés avec le SDK RUM. Le SDK détecte les `HashChangeEvent` et génère une nouvelle vue. Les événements issus d'une ancre HTML n'affectent pas le contexte de la vue actuelle et sont ignorés.

### Métriques de durée des vues

Pour les vues RUM, des métriques de performance sont recueillies à partir de l'[API Paint Timing][2] ainsi que de l'[API Navigation Timing][3].

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Vue d'ensemble des mesures"  >}}

| Métrique                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                                  |
| `view.largest_contentful_paint` | nombre (ns) | Temps nécessaire lors du chargement de la page pour afficher le plus grand objet DOM dans la fenêtre d'affichage.                                                                                                |
| `view.first_input_delay`        | nombre (ns) | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.                                                                                                                             |
| `view.cumulative_layout_shift`  | nombre      | Nombre de mouvements de page inattendus causés par le chargement dynamique de contenu (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur 0.                                                                               |
| `view.loading_time`                             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. [En savoir plus sur la façon dont le temps de chargement est recueilli][4].|
| `view.first_contentful_paint` | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canvas non blanc ou d'un SVG. Pour en savoir plus sur le rendu par le navigateur, consultez la [définition du w3c][5].                                                                                            |
| `view.dom_interactive`        | nombre (ns) | Le moment auquel le parser termine de travailler sur le document principal. [Consulter la documentation MDN pour en savoir plus][6].                                                                                                               |
| `view.dom_content_loaded`     | nombre (ns) | Cet événement se déclenche lorsque le document HTML initial a été entièrement chargé et parsé, même si les stylesheets, les images et les subframes qui ne bloquent pas le rendu n'ont pas fini de charger. [Consulter la documentation MDN pour en savoir plus][7]. |
| `view.dom_complete`           | nombre (ns) | La page et toutes les sous-ressources sont prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur a disparu. [Consulter la documentation MDN pour en savoir plus][8].                                                                             |
| `view.load_event`         | nombre (ns) | Cet événement se déclenche lorsque la page est entièrement chargée. Il entraîne généralement le déclenchement de logique d'application supplémentaire. [Consulter la documentation MDN pour en savoir plus][9].                                                                                   |
| `view.error.count`            | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                        |
| `view.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                           |
| `view.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                            |
| `view.action.count`      | nombre      | Nombre total d'actions recueillies pour cette vue.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/History
[2]: https://www.w3.org/TR/paint-timing/
[3]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[4]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-is-loading-time-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "Ressource" %}}

### Métriques de durée des ressources

L'[API Performance Resource Timing][1] recueille des données réseau temporelles détaillées sur le chargement des ressources d'une application.

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="Métriques de ressource"  >}}

| Métrique                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | nombre         | Durée totale de chargement de la ressource.                                                                                                   |
| `resource.size`                | nombre (octets) | Taille de la ressource.                                                                                                                            |
| `resource.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | nombre (ns)    | Durée d'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart).                                           |
| `resource.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                                                                         |

### Attributs des ressources

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


[1]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "Tâche longue" %}}

### Métriques de durée des tâches longues

| Métrique  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | nombre | Durée de la tâche longue. |


{{% /tab %}}
{{% tab "Erreur" %}}

### Sources des erreurs
Les erreurs frontend sont réparties en 4 catégories différentes, en fonction de leur `error.source` :

- **network** : erreurs XHR ou Fetch résultant de requêtes AJAX.
- **source** : exceptions non gérées ou objets Promise rejetés non gérés (ces erreurs sont liées au code source).
- **console** : appels d'API `console.error()`.
- **custom** : les erreurs envoyées avec l'[API `addError` RUM][1] ont par défaut la valeur `custom`.

### Attributs d'erreur

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console` ou `network`).     |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |

#### Erreurs network

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

#### Erreurs source

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Plus d'informations concernant les différents types d'erreurs sont disponibles dans [la documentation MDN][2].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |


[1]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
{{% /tab %}}
{{% tab "Action utilisateur" %}}

### Collecte automatique des actions
Le SDK Real User Monitoring (RUM) détecte les interactions effectuées par un utilisateur durant son parcours. Pour activer cette fonctionnalité, définissez le [paramètre de lancement][1] `trackInteractions` sur `true`.

**Remarque** : le paramètre de lancement `trackInteractions` permet la collecte des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

Une fois qu'une interaction est détectée, tous les nouveaux événements RUM sont associés à l'action en cours jusqu'à ce qu'elle soit considérée comme terminée. L'action dispose également des attributs de la vue parent : informations sur le navigateur, données de géolocalisation ou encore [contexte global][2].

#### Comment la durée de chargement de l'action est-elle calculée ?
Une fois qu'une interaction est détectée, le SDK RUM surveille les requêtes réseau et les mutations DOM. L'action utilisateur est considérée comme terminée lorsqu'aucune activité n'est effectuée sur la page pendant plus de 100 ms (une activité étant définie comme des requêtes réseau en cours ou une mutation DOM).

### Actions utilisateur personnalisées
Les actions utilisateur personnalisées sont des actions utilisateur déclarées et envoyées manuellement via l'[API `addAction`][3]. Elles permettent d'envoyer des informations relatives à un événement qui a lieu au cours d'un parcours utilisateur, telles qu'une durée personnalisée ou des informations sur le panier client.

### Métriques de durée des actions

| Métrique    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action. Consultez la [documentation relative aux actions utilisateur][4] pour découvrir comment elle est calculée. |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

### Attributs d'action

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les [actions utilisateur personnalisées][3], ce paramètre est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les [actions utilisateur personnalisées][3], il s'agit du nom d'action indiqué dans l'appel d'API. |

[1]: /fr/real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-user-actions
[4]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#how-action-loading-time-is-calculated
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[2]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#identify-user-sessions