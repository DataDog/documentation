---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md
display_name: Statsig
draft: false
git_integration_title: statsig
guid: f22e08ca-b524-45ad-815c-9ad654015158
integration_id: statsig
integration_title: Statsig
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@statsig.com
manifest_version: 1.0.0
metric_prefix: statsig.
metric_to_check: statsig.log_event.count
name: statsig
public_title: Statsig
short_description: Surveiller les changements Statsig depuis Datadog
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

L'intégration Datadog/Statsig vous permet de recevoir des événements et des métriques Statsig afin de surveiller plus facilement vos produits et vos services. Grâce à cette intégration, vous pouvez également visualiser l'impact du développement de feature gates ou des changements de configuration sur le reste de votre écosystème.

## Configuration

### Installation

Aucune installation n'est requise pour l'intégration Statsig.

### Configuration

1. Copiez votre clé d'API Datadog.
2. [Accédez à l'onglet Integrations de la console Statsig][1].
3. Cliquez sur la fiche Datadog.
4. Collez votre clé d'API dans le premier champ et cliquez sur Confirmer.

## Données collectées

L'intégration Statsig ne recueille pas de données à partir de Datadog.

### Métriques
{{< get-metrics-from-git "statsig" >}}


### Checks de service

L'intégration Statsig n'inclut aucun check de service.

### Événements

L'intégration Statsig envoie des événements de changement de configuration sur Statsig à Datadog. Il s'agit par exemple des mises à jour de feature gates ou des nouvelles intégrations.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Statsid][3] ou consultez le [site Web Statsig][4].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller vos lancements de nouvelles fonctionnalités avec la solution Statsig, disponible dans le Marketplace Datadog][5]

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: mailto:support@statsig.com
[4]: https://www.statsig.com/contact
[5]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/