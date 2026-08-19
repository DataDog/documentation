---
assets:
  dashboards:
    Datazoom Overview: assets/dashboards/datazoom_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/datazoom/README.md
display_name: Datazoom
draft: false
git_integration_title: datazoom
guid: eef8335b-ae57-4bbf-82a7-41f9b8a704e9
integration_id: datazoom
integration_title: Datazoom
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datazoom.
metric_to_check: ''
name: datazoom
public_title: Intégration Datadog/Datazoom
short_description: Visualisez les données des collecteurs Datazoom dans le Log Explorer.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Datazoom est une plateforme de données vidéo qui recueille des données à partir d'endpoints via un écosystème de collecteurs.

Le [connecteur Datadog Datazoom][1] envoie les données des collecteurs à Datadog, afin que vous puissiez les interroger dans le [Log Explorer][2].

Les données envoyées par Datazoom possèdent le niveau INFO.

## Configuration

### Installation

L'intégration Datazoom transmet des logs à Datadog. Aucune installation supplémentaire n'est nécessaire dans Datadog.

### Configuration

- Consultez la [documentation][1] sur l'intégration de Datazoom (en anglais) pour découvrir comment configurer le connecteur Datadog Datazoom.

### Dashboard

Consultez le [dashboard sur les logs Datazoom][3].

## Données collectées

### Métriques

Datazoom n'inclut aucune métrique.

### Checks de service

Datazoom n'inclut aucun check de service.

### Événements

Datazoom n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://help.datazoom.io/hc/en-us/articles/360042494512-Datadog
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=datazoom
[4]: https://docs.datadoghq.com/fr/help/