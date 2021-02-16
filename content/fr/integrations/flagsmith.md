---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md'
display_name: Flagsmith
draft: false
git_integration_title: flagsmith
guid: cb56fcff-3c76-4522-9672-1c3d285728f5
integration_id: flagsmith
integration_title: Flagsmith
is_public: true
kind: integration
maintainer: support@flagsmith.com
manifest_version: 1.0.0
name: flagsmith
public_title: Flagsmith
short_description: Les événements de changement de flag dans Flagsmith sont affichés dans Datadog.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Flagsmith][1] simplifie la gestion des fonctionnalités des applications Web, mobiles, et serveur. L'intégration Datadog/Flagsmith vous permet d'afficher des informations concernant les changements de flag directement dans Datadog.

Tous les événements de changement de flag sont envoyés à Datadog. L'ancien environnement est ajouté en tant que tag aux événements.

## Configuration

Dans le [carré d'intégration Flagsmith][2], saisissez votre [clé d'API Datadog][3]. Pour l'URL d'API, saisissez `https://api.datadoghq.com` si vous utilisez le site américain, ou `https://api.datadoghq.eu` si vous utilisez le site européen.

## Données collectées

### Métriques

L'intégration Flagsmith n'inclut aucune métrique.

### Checks de service

Flagsmith n'inclut aucun check de service.

### Événements

Tous les événements sont transmis au flux d'événements Datadog.

## Dépannage

Besoin d'aide ? Consultez la [documentation Flagsmith][4] ou [contactez l'assistance Datadog] [5].

[1]: https://www.flagsmith.com/
[2]: https://app.datadoghq.com/account/settings#integrations/flagsmith
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.flagsmith.com/integrations/datadog/
[5]: https://docs.datadoghq.com/fr/help/