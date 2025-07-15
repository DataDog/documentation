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
- link: /real_user_monitoring/browser/advanced_configuration
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

## Section Overview

Le SDK Browser RUM génère des événements auxquels sont associés des métriques et attributs. Chaque événement RUM contient tous les [attributs par défaut](#attributs-par-defaut), comme l'URL de la page (`view.url`) et des informations sur l'utilisateur, telles que son type d'appareil (`device.type`) et son pays (`geo.country`).

Il existe d'autres [métriques et attributs propres à un type d'événement donné](#metriques-et-attributs-specifiques-a-un-evenement). Par exemple, la métrique `view.loading_time` est associée aux événements de type vue, et l'attribut `resource.method` aux événements de type ressource.

| Type d'événement     | Rétention | Rôle                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 jours   | Une session utilisateur débute lorsqu'un utilisateur commence à parcourir l'application Web. Une session inclut des informations générales sur l'utilisateur (navigateur, appareil, géolocalisation). Elle agrège tous les événements RUM recueillis lors du parcours utilisateur en appliquant un attribut `session.id` unique. **Remarque :** la session est réinitialisée après 15 minutes d'inactivité. |
| Vue      | 30 jours   | Un événement de type Vue est généré à chaque fois qu'un utilisateur consulte une page de l'application Web. Tant que l'utilisateur reste sur la même page, les événements de type Ressource, Tâche longue, Erreur et Action sont associés à cette vue RUM via l'attribut `view.id`.                       |
| Ressource  | 30 jours   | Un événement de type Ressource est généré pour les images, XHR, Fetch, CSS ou bibliothèques JS chargés sur une page Web. Celui-ci contient des informations détaillées sur le temps de chargement.                                                                                                              |
| Tâche longue | 30 jours   | Un événement de type Tâche longue est généré à chaque fois qu'une tâche du navigateur bloque le thread principal pendant plus de 50 ms.                                                                                                                                                    |
| Erreur     | 30 jours   | La fonction RUM recueille toutes les erreurs frontend émises par le navigateur.                                                                                                                                                                                                     |
| Action    | 30 jours   | Les événements RUM de type Action enregistrent les interactions effectuées durant chaque parcours utilisateur et peuvent également être envoyés manuellement pour surveiller des actions utilisateur personnalisées.                                                                                                                                 |

Le schéma suivant présente la hiérarchie des événements RUM :

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Hiérarchie des événements RUM" style="width:50%;border:none" >}}

## Attributs par défaut

Consultez la liste complète des [attributs standards][1] pour le RUM Browser. Par défaut, les attributs sont joints à chaque type d'événement, de sorte que vous pouvez les utiliser quel que soit le type d'événement du RUM interrogé.

## Métriques et attributs spécifiques à un événement

### Métriques des sessions

| Métrique  | Type   | Rôle                |
|------------|--------|----------------------------|
| `session.time_spent` | nombre (ns) | Durée d'une session utilisateur. |
| `session.view.count`        | nombre      | Nombre total de vues recueillies lors de la session. |
| `session.error.count`      | nombre      | Nombre total d'erreurs recueillies lors de la session.  |
| `session.resource.count`         | nombre      | Nombre total de ressources recueillies lors de la session. |
| `session.action.count`      | nombre      | Nombre total d'erreurs recueillies lors de la session. |
| `session.long_task.count`      | nombre      | Nombre total de tâches longues recueillies lors de la session. |

### Attributs des sessions

| Nom de l'attribut                 | Type   | Rôle                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | chaîne | Un ID généré aléatoirement pour chaque session.                                                                      |
| `session.ip`                      | chaîne | Adresse IP du client. si vous souhaitez arrêter de recueillir cet attribut, modifiez le paramètre correspondant dans les [détails de votre application][2].                                                                       |
| `session.is_active`                      | booléen | Indique si la session est active. La session prend fin après 4 heures d'activité ou 15 minutes d'inactivité.                                                                     |
| `session.type`                     | chaîne | Le type de session : `user` ou `synthetics`. Les sessions provenant des [tests Browser de la surveillance Synthetic][3] sont exclus de la facturation. |
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

**Remarque** : les métriques de durée d'affichage incluent la durée pendant laquelle une page est ouverte en arrière-plan.

| Attribut                       | Type        | Rôle                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | nombre (ns) | Temps passé sur la vue actuelle.                                                                                                                                                                                       |
| `view.first_byte`               | nombre (ns) | Temps écoulé avant la réception du premier octet de la vue.                                                                                                |
| `view.largest_contentful_paint` | nombre (ns) | Temps nécessaire lors du chargement de la page pour afficher le plus grand objet DOM dans la fenêtre d'affichage.                                                                                                |
| `view.largest_contentful_paint_target_selector` | chaîne (sélecteur CSS) | Sélecteur CSS de lʼélément correspondant au rendu du contenu principal.                                                                                     |
| `view.first_input_delay`        | nombre (ns) | Délai entre le moment où l'utilisateur interagit pour la première fois avec la page et le moment où le navigateur répond à cette interaction.                                                                                                                             |
| `view.first_input_delay_target_selector`      | chaîne (sélecteur CSS) | Sélecteur CSS du premier élément avec lequel l'utilisateur a interagi.                                                                                                                |
| `view.interaction_to_next_paint`| nombre (ns) | Durée la plus longue entre l'interaction d'un utilisateur avec la page et le rendu suivant.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| chaîne (sélecteur CSS) | Sélecteur CSS de l'élément associé à l'interaction la plus longue avant le rendu suivant.                                                                                                          |
| `view.cumulative_layout_shift`  | nombre      | Nombre de mouvements de page inattendus causés par le chargement de contenu dynamique (par exemple, des publicités tierces). Lorsqu'aucun décalage ne se produit, cette métrique a pour valeur `0`.                                                                               |
| `view.cumulative_layout_shift_target_selector`  | chaîne (sélecteur CSS) | Sélecteur CSS de lʼélément le plus modifié contribuant au CLS de la page.                                           |
| `view.loading_time`             | nombre (ns) | Temps écoulé avant que la page ne soit prête et que toutes les requêtes réseau ou mutations DOM soient terminées. [Consultez la section Surveillance des performances de pages pour en savoir plus][4].                                                                             |
| `view.first_contentful_paint`   | nombre (ns) | Temps écoulé avant le premier affichage de texte, d'une image (images d'arrière-plan incluses), d'un canvas non blanc ou d'un SVG. Pour en savoir plus sur le rendu par le navigateur, consultez la [définition du w3c][5].                               |
| `view.dom_interactive`          | nombre (ns) | Temps écoulé avant que le parser ait fini de travailler sur le document principal. [Consultez la documentation MDN pour en savoir plus][6].                                                                                                         |
| `view.dom_content_loaded`       | nombre (ns) | Temps écoulé avant que l'événement de chargement ne se déclenche et que le document HTML initial soit entièrement chargé et parsé, même si les feuilles de style, les images et les sous-cadres qui ne bloquent pas l'affichage n'ont pas fini de charger. [Consultez la documentation MDN pour en savoir plus][7]. |
| `view.dom_complete`             | nombre (ns) | Temps écoulé avant que la page et toutes les sous-ressources ne soient prêtes. Pour l'utilisateur, l'indicateur de chargement à proximité du curseur disparaît alors. [Consultez la documentation MDN pour en savoir plus][8].                                                                       |
| `view.load_event`               | nombre (ns) | Temps écoulé avant que l'événement de chargement ne se déclenche, indiquant que la page est entièrement chargée. Cet événement entraîne généralement le déclenchement de logique d'application supplémentaire. [Consultez la documentation MDN pour en savoir plus][9].                                                                             |
| `view.error.count`              | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                                                                                                                                                          |
| `view.long_task.count`          | nombre      | Nombre total de tâches longues recueillies pour cette vue.                                                                                                                                                                      |
| `view.resource.count`           | nombre      | Nombre total de ressources recueillies pour cette vue.                                                                                                                                                                       |
| `view.action.count`             | nombre      | Nombre total d'actions recueillies pour cette vue.                                                                                                                                                                         |

### Métriques de durée des ressources

L'[API Performance Resource Timing][10] recueille des données réseau temporelles détaillées sur le chargement des ressources d'une application.

| Métrique                              | Type           | Rôle                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `resource.duration`            | nombre         | Durée totale de chargement de la ressource.                                                                                                   |
| `resource.size`                | nombre (octets) | Taille de la ressource.                                                                                                                            |
| `resource.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | nombre (ns)    | Durée d'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart).                                           |
| `resource.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                                                                         |

### Attributs des ressources

| Attribut                  | Type   | Rôle                                                                                          |
|----------------------------|--------|------------------------------------------------------------------------------------------------------|
| `resource.type`            | chaîne | Le type de ressource à recueillir (par exemple, `css`, `javascript`, `media`, `XHR` ou `image`). |
| `resource.method`          | chaîne | La méthode HTTP (par exemple, `POST` ou `GET`).                                                       |
| `resource.status_code`     | nombre | Le code d'état de la réponse (disponible uniquement pour les ressources fetch/XHR).                                   |
| `resource.url`             | chaîne | L'URL de la ressource.                                                                                    |
| `resource.url_host`        | chaîne | La partie de l'URL correspondant au host.                                                                            |
| `resource.url_path`        | chaîne | La partie de l'URL correspondant au chemin.                                                                            |
| `resource.url_query`       | objet | Les parties de l'URL correspondant à la chaîne de requête, décomposées en attributs key/value de paramètres de requête.                   |
| `resource.url_scheme`      | chaîne | Le nom du protocole de l'URL (HTTP ou HTTPS).                                                        |
| `resource.provider.name`   | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                                    |
| `resource.provider.domain` | chaîne | Le domaine du fournisseur de ressources.                                                                        |
| `resource.provider.type`   | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`).                |

### Métriques de durée des tâches longues

| Métrique  | Type   | Rôle                |
|------------|--------|----------------------------|
| `long_task.duration` | nombre | Durée de la tâche longue. |

### Attributs d'erreur

| Attribut       | Type   | Rôle                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | chaîne | L'origine de l'erreur (par exemple, `console``). Consultez la section [Sources des erreurs][11].   |
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |
| `error.message` | chaîne | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.     |

#### Erreurs source

Les erreurs de type source comprennent des informations au niveau du code concernant l'erreur. Pour en savoir plus les différents types d'erreurs, consultez [la documentation MDN][12].

| Attribut       | Type   | Rôle                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | chaîne | Le type d'erreur (ou le code dans certains cas).                   |

### Métriques de durée des actions

| Métrique    | Type   | Rôle              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action. Consultez la [documentation relative au suivi des actions utilisateur][13] pour découvrir sa méthode de calcul. |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

### Attributs d'action

| Attribut    | Type   | Rôle              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les [actions utilisateur personnalisées][14], ce paramètre est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Le nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les [actions utilisateur personnalisées][14], il s'agit du nom d'action indiqué dans l'appel de l'API. |

### Champs des signaux de frustration

| Champ                | Type   | Rôle                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | nombre | Nombre total de signaux de frustration associés à une session. |
| `view.frustration.count`        | nombre | Nombre total de signaux de frustration associés à une vue.    |
| `action.frustration.type:dead_click`  | chaîne | Clics sans effet détectés par le SDK Browser RUM.              |
| `action.frustration.type:rage_click`  | chaîne | Clics de rage détectés par le SDK Browser RUM.              |
| `action.frustration.type:error_click` | chaîne | Clics effectués par erreur détectés par le SDK Browser RUM.             |

### Attributs UTM

| Champ                | Type   | Rôle                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | chaîne | Le paramètre de l'URL effectuant le suivi de la source du trafic. |
| `view.url_query.utm_medium`        | chaîne | Le paramètre de l'URL effectuant le suivi du canal à l'origine du trafic.    |
| `view.url_query.utm_campaign`  | chaîne | Le paramètre de l'URL identifiant la campagne de marketing spécifique liée à cette vue.              |
| `view.url_query.utm_content`  | chaîne | Le paramètre de l'URL identifiant l'élément spécifique sur lequel un utilisateur a cliqué dans une campagne marketing.           |
| `view.url_query.utm_term` | chaîne | Le paramètre de l'URL effectuant le suivi du mot-clé recherché par un utilisateur et ayant déclenché une campagne donnée.             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/standard-attributes/?product=browser
[2]: /fr/data_security/real_user_monitoring/#ip-address
[3]: /fr/synthetics/browser_tests/
[4]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[11]: /fr/real_user_monitoring/browser/collecting_browser_errors#error-sources
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[13]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[14]: /fr/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions