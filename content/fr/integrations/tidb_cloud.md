---
assets:
  dashboards:
    TiDB Cloud Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
creates_events: true
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/README.md
display_name: "TiDB\_Cloud"
draft: false
git_integration_title: tidb_cloud
guid: afb5cfd5-c8d9-4dee-8f52-f3dfc012b669
integration_id: tidb-cloud
integration_title: "TiDB\_Cloud"
integration_version: ''
is_public: true
kind: integration
maintainer: xuyifan02@pingcap.com
manifest_version: 1.0.0
metric_prefix: tidb_cloud.
metric_to_check: tidb_cloud.db_queries_total
name: tidb_cloud
public_title: "TiDB\_Cloud"
short_description: "Surveillance de clusters TiDB\_Cloud avec Datadog"
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[TiDB Cloud][1] est un service cloud entièrement géré dédié aux bases de données open source TiDB.

Utilisez l'intégration Datadog/TiDB Cloud pour exporter des métriques depuis des clusters TiDB Cloud vers Datadog.

> **Remarque :**
>
> - Pour les clusters TiDB sur site, consultez l'[intégration TiDB][2].

## Configuration

Pour configurer l'intégration Datadog/TiDB Cloud pour votre cluster, spécifiez votre clé d'API et votre région Datadog dans TiDB Cloud.

Consultez les [préférences TiDB Cloud][3] afin de configurer l'intégration Datadog pour votre projet TiDB Cloud.

## Données collectées

### Métriques
{{< get-metrics-from-git "tidb_cloud" >}}


### Checks de service

L'intégration TiDB Cloud n'inclut aucun check de service.

### Événements

L'intégration TiDB Cloud n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://tidbcloud.com
[2]: https://docs.datadoghq.com/fr/integrations/tidb/
[3]: https://tidbcloud.com/console/preferences
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/metadata.csv
[5]: https://docs.datadoghq.com/fr/help/