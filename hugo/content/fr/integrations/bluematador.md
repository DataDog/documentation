---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bluematador/README.md
display_name: Blue Matador
draft: false
git_integration_title: bluematador
guid: db258635-5063-4a06-85c6-b15c1ea3df4b
integration_id: blue-matador
integration_title: Blue Matador
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@bluematador.com
manifest_version: 1.0.0
metric_prefix: bluematador.
metric_to_check: ''
name: bluematador
public_title: Intégration Datadog/Blue Matador
short_description: Blue Matador permet la configuration automatique et le stockage
  dynamique de centaines d'alertes
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

L'intégration Datadog/Blue Matador vous permet d'envoyer des événements Blue Matador au flux d'événements de Datadog.

![Flux d'événements_de_blue_matador][1]

Vous pouvez l'utiliser pour améliorer vos dashboards actuels ou pour établir des corrélations avec les métriques que vous collectez dans Datadog.

![dashboard][2]

Pour obtenir la liste complète des événements et des métriques surveillés par Blue Matador et pouvant être importés dans Datadog, consultez leur [page sur les monitors] [3].

## Configuration

Pour importer des événements Blue Matador dans Datadog, utilisez une [clé API Datadog] [4] pour créer une nouvelle méthode de notification dans Blue Matador.

** Remarque ** : les événements existants ne sont pas importés dans Datadog, mais les nouveaux événements apparaissent lorsqu'ils se produisent.

## Données collectées

### Métriques

L'intégration Blue Matador n'inclut aucune métrique.

### Événements

Tous les événements sont transmis au flux d'événements Datadog.

### Checks de service

L'intégration Blue Matador n'inclut aucun check de service.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png
[3]: https://www.bluematador.com/monitored-events
[4]: https://app.datadoghq.com/organization-settings/api-keys