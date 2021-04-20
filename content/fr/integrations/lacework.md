---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - log collection
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md'
display_name: Lacework
draft: false
git_integration_title: lacework
guid: 545f8c45-038b-41e5-ae13-8550c0ee563f
integration_id: lacework
integration_title: Lacework
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lacework.
metric_to_check: ''
name: lacework
public_title: Intégration Datadog/Lacework
short_description: Lacework est une plateforme de sécurité pour tous vos environnements cloud.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Utilisez l'intégration Datadog/Lacework pour transmettre vos logs et événements Lacework à Datadog.

## Configuration

La configuration s'effectue en intégralité sur le dashboard de Lacework. Des instructions sont disponibles dans la [documentation de Lacework][1] (en anglais). Datadog active automatiquement les bons pipelines de traitement de logs lorsqu'il détecte des logs Lacework.

### Installation

1. Dans Lacework, accédez à _Settings_ et sélectionnez _Integrations_.
2. Dans la section _Outgoing_ (dans le volet de gauche), sélectionnez Datadog.
3. Remplissez les informations suivantes :

   - **Name** : saisissez un nom pour l'intégration, par exemple, `Datadog-Lacework`.
   - **Datadog Type** : sélectionnez le type de logs envoyés à Datadog :

    | Datadog Type     | Description                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `Logs Details`   | Envoie des logs Lacework détaillés à la plateforme de logs Datadog. |
    | `Logs Summary`   | Envoie une synthèse Lacework à la plateforme de logs Datadog.     |
    | `Events Summary` | Envoie une synthèse Lacework à la plateforme d'événements Datadog.   |

   - **Datadog Site** :
     - Sélectionnez `com` si vous utilisez le site américain de Datadog.
     - Sélectionnez `eu` si vous utilisez le site européen de Datadog.
   - **API KEY** : saisissez votre [clé d'API Datadog][2].
   - **Alert Security Level** : sélectionnez le niveau de gravité minimum des logs transmis.

## Données collectées

### Métriques

L'intégration Lacework n'inclut aucune métrique.

### Checks de service

L'intégration Lacework n'inclut aucun check de service.

### Logs

Lacework peut être configuré pour envoyer des logs.

### Événements

Lacework peut être configuré pour envoyer des événements.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://www.lacework.com/datadog/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/fr/help/