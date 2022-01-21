---
dependencies:
  - https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/data_collected.md
further_reading:
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: Github
    text: Code source dd-sdk-ios
  - link: /real_user_monitoring
    tag: Documentation
    text: Service Real User Monitoring (RUM) de Datadog
kind: documentation
title: Données RUM recueillies (iOS)
---
Le SDK RUM génère des événements auxquels des métriques et attributs sont associés. Les métriques sont des valeurs quantifiables servant à effectuer des mesures associées à un événement. Les attributs sont des valeurs non quantifiables servant à filtrer les données de métriques dans les analyses.

Chaque événement RUM contient tous les [attributs par défaut](#attributs-par-defaut), comme le type d'appareil (`device.type`) et des informations sur l'utilisateur telles que son nom (`usr.name`) et son pays (`geo.country`).

Il existe d'autres [métriques et attributs propres à un type d'événement donné](#metriques-et-attributs-specifiques-a-un-evenement). Par exemple, la métrique `view.time_spent` est associée aux événements de type  « vue » et l'attribut `resource.method` aux événements de type « ressource ».

Sur cette page, vous trouverez une description de tous les attributs et métriques collectés.

## Attributs par défaut

Par défaut, la solution RUM recueille des attributs communs pour tous les événements, ainsi que des attributs propres à chaque événement, tel qu'indiqué ci-dessous. Vous pouvez également choisir d'enrichir les données de vos sessions utilisateur en ajoutant d'[autres événements][1] aux événements par défaut, selon vos besoins en analytique métier et en surveillance de votre application.


### Attributs communs de base

| Nom de l'attribut   | Type    | Description                                                                        |
|------------------|---------|------------------------------------------------------------------------------------|
| `date`           | nombre entier | Début de l'événement en millisecondes (format epoch).                                               |
| `type`           | chaîne  | Le type de l'événement (par exemple, `view` ou `resource`).                         |
| `service`        | chaîne  | Le [nom de service unifié][2] de cette application utilisé pour corréler les sessions utilisateur. |
| `application.id` | chaîne  | L'ID d'application Datadog.                                                        |

### Appareil

Les attributs sur l'appareil suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut                       | Type   | Description                                                                                              |
|--------------------------------------|--------|----------------------------------------------------------------------------------------------------------|
| `device.type`                        | chaîne | Le type d'appareil indiqué par l'appareil (User-Agent système)                                            |
| `device.brand`                       | chaîne | La marque d'appareil indiquée par l'appareil (User-Agent système)                                           |
| `device.model`                       | chaîne | Le modèle d'appareil indiqué par l'appareil (User-Agent système)                                           |
| `device.name`                        | chaîne | Le nom d'appareil indiqué par l'appareil (User-Agent système)                                            |
| `connectivity.status`                | chaîne | Le statut de l'accessibilité au réseau de l'appareil (`connected`, `not connected`, `maybe`).                           |
| `connectivity.interfaces`            | chaîne | La liste des interfaces réseau disponibles (par exemple, `bluetooth`, `cellular`, `ethernet`, `wifi`, etc.). |
| `connectivity.cellular.technology`   | chaîne | Le type de technologie radio utilisée pour la connexion cellulaire                                              |
| `connectivity.cellular.carrier_name` | chaîne | Le nom de l'opérateur de la carte SIM                                                                              |


### Système d'exploitation

Les attributs sur le système d'exploitation suivants sont joints automatiquement à tous les événements recueillis par Datadog :

| Nom de l'attribut     | Type   | Description                                                               |
|--------------------|--------|---------------------------------------------------------------------------|
| `os.name`          | chaîne | Le nom du système d'exploitation indiqué par l'appareil (User-Agent système)          |
| `os.version`       | chaîne | La version du système d'exploitation indiquée par l'appareil (User-Agent système)       |
| `os.version_major` | chaîne | La version majeure du système d'exploitation indiquée par l'appareil (User-Agent système) |


### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP :

| Nom complet                           | Type   | Description                                                                                                                               |
|------------------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`                      | chaîne | Le nom du pays.                                                                                                                       |
| `geo.country_iso_code`             | chaîne | Le code ISO du pays (par exemple, `US` pour les États-Unis `FR` pour la France).                                                  |
| `geo.country_subdivision`          | chaîne | Le nom du premier niveau de division du pays (par exemple, `California` aux États-Unis ou le département de la `Sarthe` en France). |
| `geo.country_subdivision_iso_code` | chaîne | Le code ISO du premier niveau de division du pays (par exemple, `CA` aux États-Unis ou le département `SA` en France).    |
| `geo.continent_code`               | chaîne | Le code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` ou `OC`).                                                                     |
| `geo.continent`                    | chaîne | Le nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America` ou `Oceania`).                        |
| `geo.city`                         | chaîne | Le nom de la ville (par exemple, `Paris`, `New York`).                                                                                       |


### Attributs utilisateur globaux

Vous pouvez activer la [surveillance des informations utilisateur][2] de façon globale, afin de recueillir et d'appliquer des attributs utilisateur à tous vos événements RUM.

| Nom de l'attribut | Type   | Description             |
|----------------|--------|-------------------------|
| `usr.id`      | chaîne | L'identifiant de l'utilisateur. |
| `usr.name`     | chaîne | Le nom de l'utilisateur.       |
| `usr.email`    | chaîne | L'adresse e-mail de l'utilisateur.      |


## Métriques et attributs spécifiques à un événement

Le SDK Real User Monitoring Datadog génère six types d'événements :

| Type d'événement | Rétention | Description                         |
|------------|-----------|-------------------------------------|
| Session    | 30 jours   | Une session représente le parcours d'un utilisateur réel sur votre application mobile. Elle débute lorsque l'utilisateur lance l'application et se poursuit tant qu'il reste actif. Lors du parcours de l'utilisateur, tous les événements RUM générés au sein de la session partagent le même attribut `session.id`. |
| Vue       | 30 jours   | Une vue représente un écran unique (ou un segment d'écran) de votre application mobile. Les `UIViewControllers` individuels sont considérés comme des vues distinctes. Tant qu'un utilisateur reste sur une vue, des attributs d'événement RUM (Erreurs, Ressources, Actions) sont joints à la vue, avec un `view.id` unique.                           |
| Ressource   | 15 jours   | Une ressource représente les requêtes réseau envoyées par votre application mobile à des hosts internes, des API, des fournisseurs tiers et des bibliothèques. Toutes les requêtes générées lors d'une session utilisateur sont jointes à la vue, avec un `resource.id` unique.                                                                       |
| Erreur      | 30 jours   | Une erreur représente une exception générée par l'application mobile et jointe à la vue à son origine.                                                                                                                                                                                        |
| Action     | 30 jours   | Une action représente l'activité utilisateur dans votre application mobile (lancement de l'application, toucher, balayage, retour, etc.). Chaque action possède un `action.id` unique associé à la vue à son origine.                                                                                                      |

Le schéma suivant présente la hiérarchie des événements RUM :

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Hiérarchie des événements RUM" style="width:50%;border:none" >}}

### Métriques des sessions

| Métrique                    | Type        | Description                                         |
|---------------------------|-------------|-----------------------------------------------------|
| `session.time_spent`      | nombre (ns) | Durée d'une session                            |
| `session.view.count`      | nombre      | Nombre total de vues recueillies lors de la session.      |
| `session.error.count`     | nombre      | Nombre total d'erreurs recueillies lors de la session.     |
| `session.resource.count`  | nombre      | Nombre total de ressources recueillies lors de la session.  |
| `session.action.count`    | nombre      | Nombre total d'erreurs recueillies lors de la session.    |
| `session.long_task.count` | nombre      | Nombre total de tâches longues recueillies lors de la session. |


### Attributs des sessions

| Nom de l'attribut               | Type   | Description                                                                |
|------------------------------|--------|----------------------------------------------------------------------------|
| `session.id`                 | chaîne | L'identifiant unique de la session.                                                  |
| `session.type`               | chaîne | Le type de la session (`user`).                                              |
| `session.is_active`          | chaîne | Le statut d'activité de la session                               |
| `session.initial_view.url`   | chaîne | L'URL de la vue initiale de la session                                     |
| `ssession.initial_view.name` | chaîne | Le nom de la vue initiale de la session                                    |
| `session.last_view.url`      | chaîne | L'URL de la dernière vue de la session                                        |
| `session.last_view.name`     | chaîne | Le nom de la dernière vue de la session                                       |
| `session.ip`                 | chaîne | L'adresse IP de la session extraite à partir de la connexion TCP de l'admission |
| `session.useragent`          | chaîne | Les informations de l'Agent utilisateur système interprétant les informations de l'appareil                            |


### Métriques des vues

Les événements RUM de type Action, Erreur, Ressource et Tâche longue contiennent des informations sur la vue RUM active au moment de la collecte :

| Métrique                | Type        | Description                                                                  |
|-----------------------|-------------|------------------------------------------------------------------------------|
| `view.time_spent`     | nombre (ns) | Temps passé sur la vue.                                                 |
| `view.error.count`    | nombre      | Nombre total d'erreurs recueillies pour cette vue.                                 |
| `view.resource.count` | nombre      | Nombre total de ressources recueillies pour cette vue.                              |
| `view.action.count`   | nombre      | Nombre total d'actions recueillies pour cette vue.                                |
| `view.is_active`      | booléen     | Statut d'activité de la vue correspondant à cet événement. |

### Attributs des vues

| Nom de l'attribut | Type   | Description                                                     |
|----------------|--------|-----------------------------------------------------------------|
| `view.id`      | chaîne | ID unique de la vue initiale correspondant à la event.view.  |
| `view.url`     | chaîne | URL de la classe `UIViewController` correspondant à l'événement. |
| `view.name`    | chaîne | Nom personnalisable de la vue correspondant à l'événement.       |


### Métriques des ressources

| Métrique                         | Type           | Description                                                                                     |
|--------------------------------|----------------|-------------------------------------------------------------------------------------------------|
| `resource.duration`            | nombre         | Durée totale de chargement de la ressource.                                                         |
| `resource.size`                | nombre (octets) | Taille de la ressource.                                                                                  |
| `resource.connect.duration`    | nombre (ns)    | Durée d'établissement d'une connexion au serveur (connectEnd - connectStart).                  |
| `resource.ssl.duration`        | nombre (ns)    | Temps passé à établir la liaison TLS.                                                               |
| `resource.dns.duration`        | nombre (ns)    | Durée de résolution du nom DNS de la dernière requête (domainLookupEnd - domainLookupStart).     |
| `resource.redirect.duration`   | nombre (ns)    | Temps passé sur les requêtes HTTP ultérieures (redirectEnd - redirectStart).                            |
| `resource.first_byte.duration` | nombre (ns)    | Temps écoulé avant la réception du premier octet de la réponse (responseStart - RequestStart) |
| `resource.download.duration`   | nombre (ns)    | Durée de téléchargement de la réponse (responseEnd - responseStart).                               |

### Attributs des ressources

| Attribut                  | Type   | Description                                                                              |
|----------------------------|--------|------------------------------------------------------------------------------------------|
| `resource.id`              | chaîne | L'identifiant unique de la ressource.                                                       |
| `resource.type`            | chaîne | Le type de ressource à recueillir (par exemple, `xhr`, `image`, `font`, `css`, `js`). |
| `resource.method`          | chaîne | La méthode HTTP (par exemple, `POST`, `GET` `PATCH`, `DELETE`, etc.).                       |
| `resource.status_code`     | nombre | Le code de statut de la réponse.                                                                |
| `resource.url`             | chaîne | L'URL de la ressource.                                                                        |
| `resource.provider.name`   | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                        |
| `resource.provider.domain` | chaîne | Le domaine du fournisseur de ressources.                                                            |
| `resource.provider.type`   | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`).        |


### Attributs d'erreur

Les erreurs frontend sont recueillies par le service Real User Monitoring (RUM). Le message d'erreur et la stack trace sont inclus lorsque cela est possible.

| Attribut        | Type   | Description                                                                      |
|------------------|--------|----------------------------------------------------------------------------------|
| `error.source`   | chaîne | L'origine de l'erreur (par exemple, `webview`, `logger` ou `network`). |
| `error.type`     | chaîne | Le type d'erreur (ou le code dans certains cas).                                    |
| `error.message`  | chaîne | Un message d'une ligne lisible et concis décrivant l'événement.                |
| `error.stack`    | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.                    |
| `error.issue_id` | chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.                    |

#### Erreurs réseau

Les erreurs réseau comprennent des informations sur la requête HTTP ayant échoué. Les facettes suivantes sont également recueillies :

| Attribut                        | Type   | Description                                                                       |
|----------------------------------|--------|-----------------------------------------------------------------------------------|
| `error.resource.status_code`     | nombre | Le code de statut de la réponse.                                                         |
| `error.resource.method`          | chaîne | La méthode HTTP (par exemple, `POST` ou `GET`).                                      |
| `error.resource.url`             | chaîne | L'URL de la ressource.                                                                 |
| `error.resource.provider.name`   | chaîne | Le nom du fournisseur de ressources. Valeur par défaut : `unknown`.                                 |
| `error.resource.provider.domain` | chaîne | Le domaine du fournisseur de ressources.                                                     |
| `error.resource.provider.type`   | chaîne | Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`, `ad` ou `analytics`). |


### Métriques des actions

| Métrique                  | Type        | Description                                   |
|-------------------------|-------------|-----------------------------------------------|
| `action.loading_time`   | nombre (ns) | La durée de chargement de l'action.               |
| `action.resource.count` | nombre      | Nombre total de ressources générées par cette action. |
| `action.error.count`    | nombre      | Nombre total d'erreurs générées par cette action.    |

### Attributs d'action

| Attribut            | Type   | Description                                                                     |
|----------------------|--------|---------------------------------------------------------------------------------|
| `action.id`          | chaîne | UUID de l'action utilisateur.                                                        |
| `action.type`        | chaîne | Type de l'action utilisateur (`tap`, `application_start`).                           |
| `action.name`        | chaîne | Nom de l'action utilisateur.                                                        |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/ios/advanced_configuration/#enrich-user-sessions
[2]: /fr/real_user_monitoring/ios/advanced_configuration/#track-user-sessions