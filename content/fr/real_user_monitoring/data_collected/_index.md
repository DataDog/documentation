---
title: Données RUM collectées
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standards Datadog
---
{{< whatsnext desc="Par défaut, toutes les données recueillies sont conservées avec une granularité complète pendant 15 jours. Le script Real User Monitoring de Datadog envoie 5 grands types d'événements à Datadog :">}}
  {{< nextlink href="/real_user_monitoring/data_collected/view">}}<u>Vue</u> : À chaque fois qu'un utilisateur accède à une page de l'application configurée, un événement de type Vue est créé. Tant que l'utilisateur reste sur la page, toutes les données recueillies sont associées à cette vue via l'attribut `view.id`.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/resource">}}<u>Ressource</u> : Un événement de type Ressource peut être généré pour les images, les XHR/Fetch, le CSS ou les bibliothèques JS. Celui-ci contient des informations sur la ressource, telles que son nom et le temps de chargement associé.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/long_task">}}<u>Tâche longue</u> : Lorsqu'une tâche dans un navigateur bloque le thread principal pendant plus de 50 ms, celle-ci est considérée comme une tâche longue et génère un événement spécifique.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/error">}}<u>Erreur</u> : À chaque fois qu'une erreur frontend est générée par le navigateur, celle-ci est enregistrée et transmise à Datadog en tant qu'événement de type Erreur.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/user_action">}}<u>Action utilisateur</u> : Un événement de type Action utilisateur correspond à un événement personnalisé qui peut être généré pour une action utilisateur donnée.{{< /nextlink >}}
{{< /whatsnext >}}

## Attributs par défaut

Ces cinq types d'événements sont associés à des attributs par défaut :

### Core

| Nom de l'attribut   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `application_id` | chaîne | L'ID d'application Datadog. |
| `session_id`     | chaîne | L'ID de session.             |

### Attributs View

| Nom de l'attribut                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | chaîne | ID généré aléatoirement pour chaque vue de page.                                                                      |
| `view.url`                     | chaîne | L'URL de la vue.                                                                                                  |
| `view.referrer`                | chaîne | L'URL de la page web précédente, à partir de laquelle un lien vers la page demandée à été sélectionné.               |
| `view.url_details.host`        | chaîne | La partie de l'URL correspondant au host HTTP.                                                                                 |
| `view.url_details.path`        | chaîne | La partie de l'URL correspondant au chemin HTTP.                                                                                 |
| `view.url_details.path_group`  | chaîne | Groupe d'URL généré automatiquement pour les URL connexes. (Ex : `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`) |
| `view.url_details.queryString` | objet | Les parties de l'URL correspondant à la chaîne de requête HTTP, décomposées en attributs key/value de paramètres de requête.                        |

### User agent

Les contextes suivants, qui suivent la logique des [attributs standard Datadog][1], sont joints automatiquement à tous les événements envoyés à Datadog :

| Nom de l'attribut                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `http.useragent_details.os.family`       | chaîne | La famille du système d'exploitation indiquée par le user-agent.       |
| `http.useragent_details.browser.family`  | chaîne | La famille de navigateurs indiquée par le user-agent.  |
| `http.useragent_details.device.family`   | chaîne | La famille d'appareils indiquée par le user-agent.   |
| `http.useragent_details.device.category` | chaîne | La catégorie d'appareil indiquée par le user-agent. |

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP utilisées dans les communications réseau. Tous les champs sont précédés par `network.client.geoip` ou `network.destination.geoip`.

| Nom complet                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | chaîne | Nom du pays                                                                                                                  |
| `network.client.geoip.country.iso_code`     | chaîne | [Code ISO][2] du pays (par exemple : `US` pour les États-Unis, `FR` pour la France)                                                  |
| `network.client.geoip.continent.code`       | chaîne | Code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | chaîne | Nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | chaîne | Nom du premier niveau de division du pays (par exemple : `California` aux États-Unis ou le département de la `Sarthe` en France) |
| `network.client.geoip.subdivision.iso_code` | chaîne | [Code ISO][2] du premier niveau de division du pays (par exemple : `CA` aux États-Unis ou le département `SA` en France)    |
| `network.client.geoip.city.name`            | chaîne | Le nom de la ville (par exemple : `Paris`, `New York`)                                                                                   |

## Attributs supplémentaires

En plus des attributs par défaut, vous pouvez ajouter un [contexte global spécifique][3] à l'ensemble des événements recueillis afin d'analyser les données associées à un certain groupe d'utilisateurs : vous pourrez ainsi regrouper les erreurs en fonction de l'adresse e-mail utilisateur, identifier les clients qui affichent les plus mauvaises performances, etc.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/attributes_naming_convention
[2]: /fr/logs/processing/attributes_naming_convention/#user-agent-attributes
[3]: /fr/real_user_monitoring/installation/advanced_configuration