---
description: Découvrez les types d'événements, les mesures et les attributs collectés
  par Product Analytics, notamment les sessions, les vues et les actions.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centre d'apprentissage
  text: Bien démarrer avec Product Analytics
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centre d'apprentissage
  text: Définir le comportement utilisateur avec des actions labellisées dans Product
    Analytics
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentation
  text: Données RUM Browser recueillies
- link: /real_user_monitoring/application_monitoring/ios/data_collected/
  tag: Documentation
  text: Données RUM recueillies (iOS)
- link: /real_user_monitoring/application_monitoring/android/data_collected/
  tag: Documentation
  text: Données RUM recueillies (Android)
- link: /product_analytics/data_collected/server_side_events/
  tag: Documentation
  text: Suivre les événements côté serveur
title: Données Product Analytics collectées
---
## Présentation {#overview}

Product Analytics collecte les données d'activité des utilisateurs sous forme d'événements. Chaque événement comporte deux types de données :

- **Télémétrie** : Valeurs quantifiables utilisées pour suivre et comparer l'activité (par exemple, `view.time_spent`).
- **Attributs** : Valeurs descriptives utilisées pour filtrer et ventiler les mesures dans votre analyse (par exemple, `device.type` ou `geo.country`).

Chaque événement inclut les [attributs par défaut](#default-attributes). Chaque type d'événement possède également [une télémétrie et des attributs spécifiques](#event-specific-attributes).

Pour identifier les utilisateurs individuels au cours des sessions, Product Analytics s'appuie sur les attributs `usr.id` et `usr.email`. Pour les utilisateurs non authentifiés ou les visiteurs qui ne se connectent jamais, le SDK RUM attribue automatiquement un `usr.anonymous_id` pour suivre l'activité. Voir [Suivre les utilisateurs non authentifiés][4] pour plus de détails.

<div class="alert alert-info">Product Analytics utilise les mêmes SDK et la même configuration que Real User Monitoring (RUM) pour collecter les données. Contrairement à RUM, Product Analytics ne collecte pas les événements d'erreurs, de ressources, de tâches longues ou de signaux vitaux. Pour la liste complète des types d'événements et des attributs RUM, consultez les pages de données collectées pour <a href="/real_user_monitoring/application_monitoring/browser/data_collected/">navigateur</a>, <a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a> et <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a>.</div>

| Type d'événement | Rétention | Description |
|------------|-----------|-------------|
| Session | 15 mois | Une session représente le parcours réel d'un utilisateur dans votre application. Elle commence lorsqu'un utilisateur ouvre l'application et reste ouverte tant que l'utilisateur est actif. Tous les événements générés pendant la session partagent le même attribut `session.id`. **Remarque :** La session se réinitialise après 15 minutes d'inactivité. |
| Vue | 15 mois | Une vue représente une page ou un écran unique qu'un utilisateur visite au cours d'une session. Dans un navigateur, une vue est créée chaque fois qu'un utilisateur visite une page. Sur mobile, une vue correspond à un écran ou à un segment d'écran. Tous les événements générés pendant qu'un utilisateur est sur une vue partagent le même attribut `view.id`. |
| Action | 15 mois | Une action représente l'activité de l'utilisateur dans votre application, telle qu'un clic, un appui, un balayage ou un défilement. Les actions sont automatiquement collectées par le SDK. Chaque action est rattachée à la vue dans laquelle elle a été générée avec un `action.id` unique. |
| Action étiquetée | 15 mois | Une action étiquetée est un nom personnalisé appliqué à une action autocapturée à l'aide de [Action Management][1]. Les actions étiquetées vous permettent d'organiser et d'analyser des interactions utilisateur spécifiques sans écrire de code. |

## Attributs par défaut {#default-attributes}

Les attributs suivants sont rattachés à tous les événements par défaut.

### Général {#general}

| Attribut | Type | Description |
|-----------|------|-------------|
| `date` | nombre | Horodatage de l'événement. |
| `type` | chaîne | Le type de l'événement (par exemple, `view` ou `action`). |
| `service` | chaîne | Le nom de service unifié pour cette application utilisé pour corréler les sessions utilisateur. |
| `application.id` | chaîne | L'ID d'application Datadog. |
| `application.name` | chaîne | Le nom de l'application Datadog. |

### Appareil {#device}

| Attribut | Type | Description |
|-----------|------|-------------|
| `device.brand` | chaîne | Marque de l'appareil telle que rapportée par l'appareil. |
| `device.model` | chaîne | Modèle de l'appareil tel que rapporté par l'appareil. |
| `device.name` | chaîne | Nom de l'appareil tel que rapporté par l'appareil. |
| `device.type` | chaîne | Type d'appareil tel que rapporté par l'appareil (par exemple, `Mobile`, `Tablet` ou `Desktop`). |

### Système d'exploitation {#operating-system}

| Attribut | Type | Description |
|-----------|------|-------------|
| `os.name` | chaîne | Nom du système d'exploitation tel que rapporté par l'appareil. |
| `os.version` | chaîne | Version du système d'exploitation telle que rapportée par l'appareil. |
| `os.version_major` | chaîne | Version majeure du système d'exploitation telle que rapportée par l'appareil. |

### Géolocalisation {#geolocation}

Les attributs suivants sont dérivés de l'adresse IP de la session.

**Remarque :** Pour arrêter la collecte des attributs de géolocalisation, modifiez le paramètre dans [Application Management][2].

| Attribut | Type | Description |
|-----------|------|-------------|
| `geo.country` | chaîne | Nom du pays. |
| `geo.country_iso_code` | chaîne | Code ISO du pays (par exemple, `US` ou `FR`). |
| `geo.country_subdivision` | chaîne | Nom du premier niveau de subdivision du pays (par exemple, `California` ou `Sarthe`). |
| `geo.continent_code` | chaîne | Code de continent à deux lettres (par exemple, `EU` pour l'Europe ou `NA` pour l'Amérique du Nord). |
| `geo.continent` | chaîne | Nom du continent. |
| `geo.city` | chaîne | Nom de la ville (par exemple, `San Francisco` ou `Paris`). |

### Attributs utilisateur{#user-attributes}

Vous pouvez activer le [suivi des informations utilisateur][3] globalement pour collecter et appliquer des attributs utilisateur à tous les événements.

| Attribut | Type | Description |
|-----------|------|-------------|
| `usr.id` | chaîne | Identifiant de l'utilisateur. |
| `usr.name` | chaîne | Nom de l'utilisateur. |
| `usr.email` | chaîne | E-mail de l'utilisateur. |
| `usr.anonymous_id` | chaîne | UUID généré aléatoirement attribué aux utilisateurs non authentifiés. Persiste jusqu'à un an. Voir [Suivre les utilisateurs non authentifiés][4]. |

## Attributs spécifiques à l'événement {#event-specific-attributes}

Les attributs suivants sont spécifiques à chaque type d'événement.

### Attributs de session {#session-attributes}

| Attribut | Type | Description |
|-----------|------|-------------|
| `session.id` | chaîne | ID unique de la session. |
| `session.type` | chaîne | Type de la session. La valeur est `user` pour Product Analytics. |
| `session.is_active` | Booléen | Indique si la session est active. La session se termine après 4 heures d'activité ou 15 minutes d'inactivité. |
| `session.time_spent` | nombre (nanosecondes) | Temps passé sur la session. |
| `session.view.count` | nombre | Nombre total de vues collectées pour cette session. |
| `session.action.count` | nombre | Nombre total d'actions collectées pour cette session. |
| `session.initial_view.url` | chaîne | URL de la vue initiale de la session. |
| `session.initial_view.name` | chaîne | Nom de la vue initiale de la session. |
| `session.last_view.url` | chaîne | URL de la dernière vue de la session. |
| `session.last_view.name` | chaîne | Nom de la dernière vue de la session. |
| `session.ip` | chaîne | Adresse IP de la session. Pour arrêter la collecte de cet attribut, modifiez le paramètre dans [Application Management][2]. |
| `session.useragent` | chaîne | Identifiant du navigateur ou de l'appareil utilisé pour déterminer le type et la version de l'appareil. |
| `session.has_replay` | Booléen | Indique si la session comporte un enregistrement Session Replay. |

### Attributs de vue {#view-attributes}

| Attribut | Type | Description |
|-----------|------|-------------|
| `view.id` | chaîne | ID unique de la vue. |
| `view.url` | chaîne | URL de la page ou nom canonique de l'écran correspondant à l'événement. |
| `view.name` | chaîne | Nom personnalisable de la vue. |
| `view.is_active` | Booléen | Indique si la vue est active. |
| `view.time_spent` | nombre (nanosecondes) | Temps passé sur cette vue. |
| `view.action.count` | nombre | Nombre total d'actions collectées pour cette vue. |
| `view.loading_time` | nombre (nanosecondes) | Temps jusqu'à ce que la vue soit prête et qu'aucune requête réseau ou mutation DOM ne se produise. |
| `view.interaction_to_next_view_time` | nombre (nanosecondes) | Temps entre la dernière interaction utilisateur dans la vue précédente et le début de cette vue. |

#### Attributs UTM {#utm-attributes}

**Remarque&nbsp;:** Les attributs UTM ne sont disponibles que pour les applications de navigateur.

| Attribut | Type | Description |
|-----------|------|-------------|
| `view.url_query.utm_source` | chaîne | Paramètre dans l'URL permettant de suivre la source du trafic. |
| `view.url_query.utm_medium` | chaîne | Paramètre dans l'URL permettant de suivre le canal d'où provient le trafic. |
| `view.url_query.utm_campaign` | chaîne | Paramètre dans l'URL identifiant la campagne marketing spécifique liée à cette vue. |
| `view.url_query.utm_content` | chaîne | Paramètre dans l'URL identifiant l'élément spécifique sur lequel un utilisateur a cliqué au sein d'une campagne marketing. |
| `view.url_query.utm_term` | chaîne | Paramètre dans l'URL permettant de suivre le mot-clé recherché par un utilisateur pour déclencher une campagne donnée. |

### Attributs d'action {#action-attributes}

| Attribut | Type | Description |
|-----------|------|-------------|
| `action.id` | chaîne | ID unique de l'action utilisateur. |
| `action.type` | chaîne | Type de l'action utilisateur (par exemple, `click`, `tap` ou `application_start`). |
| `action.name` | chaîne | Nom de l'action utilisateur (par exemple, `Click on #checkout`). |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement disponible pour les actions collectées automatiquement. |
| `action.loading_time` | nombre (nanosecondes) | Temps de chargement de l'action. |

### Signaux de frustration {#frustration-signals}

**Remarque&nbsp;:** Les signaux de frustration ne sont disponibles que pour les applications de navigateur.

#### Mesures {#measurements}

| Attribut | Type | Description |
|-----------|------|-------------|
| `session.frustration.count` | nombre | Nombre total de signaux de frustration associés à une session. |
| `view.frustration.count` | nombre | Nombre total de signaux de frustration associés à une vue. |

#### Attributs {#attributes}

| Attribut | Type | Description |
|-----------|------|-------------|
| `action.frustration.type:dead_click` | chaîne | Clics morts détectés par le SDK RUM Browser. |
| `action.frustration.type:rage_click` | chaîne | Clics de rage détectés par le SDK RUM Browser. |
| `action.frustration.type:error_click` | chaîne | Clics d'erreur détectés par le SDK RUM Browser. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/product_analytics/guide/action_management/
[2]: https://app.datadoghq.com/rum/list
[3]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
[4]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users