---
aliases:
- /fr/real_user_monitoring/data_collected/
- /fr/real_user_monitoring/data_collected/view/
- /fr/real_user_monitoring/data_collected/resource/
- /fr/real_user_monitoring/data_collected/long_task/
- /fr/real_user_monitoring/data_collected/error/
- /fr/real_user_monitoring/data_collected/user_action/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Présentation du service Real User Monitoring (RUM) de Datadog
- link: /real_user_monitoring/browser/modifying_data_and_context
  tag: Documentation
  text: Modifier des données RUM et ajouter du contexte
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: Attributs standard Datadog
title: Données RUM recueillies (Browser)
---

## Présentation

Le SDK Browser RUM génère des événements auxquels sont associés des métriques et attributs. Chaque événement RUM contient tous les [attributs par défaut](#attributs-par-defaut), comme l'URL de la page (`view.url`) et des informations sur l'utilisateur, telles que son type d'appareil (`device.type`) et son pays (`geo.country`).

Il existe d'autres [métriques et attributs propres à un type d'événement donné](#metriques-et-attributs-specifiques-a-un-evenement). Par exemple, la métrique `view.loading_time` est associée aux événements de type vue, et l'attribut `resource.method` aux événements de type ressource.

| Type d'événement     | Rétention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 jours   | Une session utilisateur débute lorsqu'un utilisateur commence à parcourir l'application Web. Une session inclut des informations générales sur l'utilisateur (navigateur, appareil, géolocalisation). Elle agrège tous les événements RUM recueillis lors du parcours utilisateur en appliquant un attribut `session.id` unique. **Remarque :** la session est réinitialisée après 15 minutes d'inactivité. |
| Vue      | 30 jours   | Un événement de type Vue est généré à chaque fois qu'un utilisateur consulte une page de l'application Web. Tant que l'utilisateur reste sur la même page, les événements de type Ressource, Tâche longue, Erreur et Action sont associés à cette vue RUM via l'attribut `view.id`.                       |
| Ressource  | 15 jours   | Un événement de type Ressource est généré pour les images, XHR, Fetch, CSS ou bibliothèques JS chargés sur une page Web. Celui-ci contient des informations détaillées sur le temps de chargement.                                                                                                              |
| Tâche longue | 15 jours   | Un événement de type Tâche longue est généré à chaque fois qu'une tâche du navigateur bloque le thread principal pendant plus de 50 ms.                                                                                                                                                    |
| Error     | 30 jours   | La fonction RUM recueille toutes les erreurs frontend émises par le navigateur.                                                                                                                                                                                                     |
| Action    | 30 jours   | Les événements RUM de type Action enregistrent les interactions effectuées durant chaque parcours utilisateur et peuvent également être envoyés manuellement pour surveiller des actions utilisateur personnalisées.                                                                                                                                 |

Le schéma suivant présente la hiérarchie des événements RUM :

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Hiérarchie des événements RUM" style="width:50%;border:none" >}}


## Attributs par défaut

Chacun de ces types d'événements possède par défaut les attributs ci-dessous. Vous pouvez donc toujours les utiliser, peu importe le type d'événement RUM interrogé.

### Core

| Nom de l'attribut   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | chaîne | Le type de l'événement (par exemple, `view` ou `resource`).             |
| `application.id` | chaîne | L'ID d'application Datadog généré lorsque vous créez une application RUM. |
| `service`     | chaîne | Un service désigne un ensemble de pages créées par une équipe qui offrent une fonctionnalité spécifique dans votre application Browser. Vous pouvez attribuer des pages Web à un service à l'aide du [suivi manuel des vues][1].             |

### Attributs de vue

Les événements RUM de type Action, Erreur, Ressource et Tâche longue contiennent des informations sur la vue RUM active au moment de la collecte :

| Nom de l'attribut                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | chaîne | ID généré aléatoirement pour chaque vue de page.                                                                      |
| `view.loading_type`                     | chaîne | Le type de chargement de page : `initial_load` ou `route_change`. Pour en savoir plus, consultez la [documentation sur la prise en charge des applications monopage][2].|
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
| `device.type`       | chaîne | Le type d'appareil indiqué par l'appareil (en-tête HTTP User-Agent).      |
| `device.brand`  | chaîne | La marque de l'appareil indiquée par l'appareil (en-tête HTTP User-Agent).  |
| `device.model`   | chaîne | Le modèle de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent).   |
| `device.name` | chaîne | Le nom de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent). |

### Système d'exploitation

Les attributs sur le système d'exploitation suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | chaîne | Le nom du système d'exploitation indiqué par l'appareil (en-tête HTTP User-Agent).       |
| `os.version`  | chaîne | La version du système d'exploitation indiquée par l'appareil (en-tête HTTP User-Agent).  |
| `os.version_major`   | chaîne | La version majeure du système d'exploitation indiquée par l'appareil (en-tête HTTP User-Agent).   |

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP :

| Nom complet                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | chaîne | Le nom du pays.                                                                                                                  |
| `geo.country_iso_code`     | chaîne | Le [code ISO][3] du pays (par exemple, `US` pour les États-Unis ou `FR` pour la France).                                                  |
| `geo.country_subdivision`     | chaîne | Le nom du premier niveau de division du pays (par exemple, `California` aux États-Unis ou le département de la `Sarthe` en France). |
| `geo.continent_code`       | chaîne | Le code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` ou `OC`).                                                                 |
| `geo.continent`       | chaîne | Le nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America` ou `Oceania`).                    |
| `geo.city`            | chaîne | Le nom de la ville (par exemple, `Paris` ou `New York`).                                                                                   |

**Remarque** : par défaut, Datadog stocke l'adresse IP client. Si vous souhaitez ne plus recueillir d'adresse IP, [contactez l'assistance][4]. Cette opération n'a aucune incidence sur la collecte des attributs de géolocalisation répertoriés ci-dessus.

### Attributs utilisateur

En plus des attributs par défaut, vous pouvez ajouter des données sur les utilisateurs à tous les types d'événements RUM en [identifiant les sessions utilisateur][5]. Vous avez ainsi la possibilité de suivre le parcours d'un utilisateur spécifique, d'identifier les utilisateurs les plus affectés par des erreurs et de surveiller les performances de vos utilisateurs les plus importants.

## Métriques et attributs spécifiques à un événement

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
| `session.id`                      | chaîne | Un ID généré aléatoirement pour chaque session.                                                                      |
| `session.ip`                      | chaîne | L'adresse IP client. Si vous souhaitez arrêter la collecte de cet attribut, [contactez l'assistance][4].                                                                       |
| `session.is_active`                      | booléen | Indique si la session est actuellement active. Une session prend fin lorsqu'un utilisateur quitte l'application ou ferme la fenêtre du navigateur. Elle expire après 4 heures ou 15 minutes d'inactivité.                                                                     |
| `session.type`                     | chaîne | Le type de session : `user` ou `synthetics`. Les sessions provenant des [tests Browser de la surveillance Synthetic][6] sont exclus de la facturation. |
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

### Métriques de durée des vues


| Attribut                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                       |
| `view.first_byte`               | nombre (ns) | Temps écoulé avant la réception du premier octet de la vue.                                                                                                |
| `view.largest_contentful_paint` | nombre (ns) | Temps nécessaire lors du chargement de la page pour afficher le plus grand objet DOM dans la fenêtre d'affichage.                                                                                                |
| `view.first_input_delay`        | nombre (ns) | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.                                                                                                                             |
| `view.cumulative_layout_shift`  | nombre      | Nombre de mouvements de page inattendus causés par le chargement de contenu dynamique (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur `0`.                                                                               |
| `view.loading_time`             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. [Consultez la section Surveillance des performances de pages pour en savoir plus][7].                                                                             |
| `view.first_contentful_paint`   | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canvas non blanc ou d'un SVG. Pour en savoir plus sur le rendu par le navigateur, consultez la [définition du w3c][8].                               |
| `view.dom_interactive`          | nombre (ns) | Temps écoulé avant que le parser ait fini de travailler sur le document principal. [Consultez la documentation MDN pour en savoir plus][9].                                                                                                         |
| `view.dom_content_loaded`       | nombre (ns) | Temps écoulé avant que l'événement de chargement ne se déclenche et que le document HTML initial soit entièrement chargé et parsé, même si les feuilles de style, les images et les sous-cadres qui ne bloquent pas l'affichage n'ont pas fini de charger. [Consultez la documentation MDN pour en savoir plus][10]. |
| `view.dom_complete`             | nombre (ns) | Temps écoulé avant que la page et toutes les sous-ressources soient prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur disparaît alors. [Consultez la documentation MDN pour en savoir plus][11].                                                                       |
| `view.load_event`               | nombre (ns) | Temps écoulé avant que l'événement de chargement ne se déclenche, indiquant que la page est entièrement chargée. Cet événement entraîne généralement le déclenchement de logique d'application supplémentaire. [Consultez la documentation MDN pour en savoir plus][12].                                                                             |
| `view.error.count`              | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                          |
| `view.long_task.count`          | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                      |
| `view.resource.count`           | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                       |
| `view.action.count`             | nombre      | Nombre total d'actions recueillies pour cette vue.                                                                                                                                                                         |

### Métriques de durée des ressources

L'[API Performance Resource Timing][13] recueille des données réseau temporelles détaillées sur le chargement des ressources d'une application.

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


### Métriques de durée des tâches longues

| Métrique  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | nombre | Durée de la tâche longue. |


### Attributs d'erreur

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console` ou `network`).     |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |


#### Erreurs source

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Pour en savoir plus les différents types d'erreurs, consultez [la documentation MDN][13].

| Attribut       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |



### Métriques de durée des actions

| Métrique    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action. Consultez la [documentation relative aux actions utilisateur][14] pour découvrir comment elle est calculée. |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

### Attributs d'action

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les [actions utilisateur personnalisées][15], ce paramètre est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Le nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les [actions utilisateur personnalisées][15], il s'agit du nom d'action indiqué dans l'appel de l'API. |

### Champs des signaux de frustration

| Champ                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | nombre | Nombre total de signaux de frustration associés à une session. |
| `view.frustration.count`        | nombre | Nombre total de signaux de frustration associés à une vue.    |
| `action.frustration.type:dead_click`  | chaîne | Clics sans effet détectés par le SDK Browser RUM.              |
| `action.frustration.type:rage_click`  | chaîne | Clics de rage détectés par le SDK Browser RUM.              |
| `action.frustration.type:error_click` | chaîne | Clics effectués par erreur détectés par le SDK Browser RUM.             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[3]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[4]: /fr/help/
[5]: /fr/real_user_monitoring/browser/modifying_data_and_context/#identify-user-sessions
[6]: /fr/synthetics/browser_tests/
[7]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[8]: https://www.w3.org/TR/paint-timing/#sec-terminology
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[14]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#how-action-loading-time-is-calculated
[15]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions