---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Collaboration
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/README.md'
display_name: "Concourse\_CI"
draft: false
git_integration_title: concourse_ci
guid: 054cc9fb-01c4-4f05-98b5-fae828746787
integration_id: concourse-ci
integration_title: Concourse-CI
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: concourse.ci.
metric_to_check: concourse.ci.goroutines
name: concourse_ci
public_title: "Intégration Datadog/Concourse\_CI"
short_description: "Recueillez des métriques transmises par Concourse\_CI."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Configurez l'émetteur de métriques Datadog dans Concourse CI pour :

- Afficher la durée des pipelines, le nombre de conteneurs et les volumes montés de travail
- Identifier des requêtes lentes afin d'élaborer des itinéraires

## Configuration

### Installation

Concourse CI est fourni avec un émetteur de métriques Datadog. Pour que l'[ATC][1] envoie des métriques au démarrage, l'[Agent Datadog][2] doit être installé.

### Configuration

Paramétrez les options suivantes de sorte que l'ATC puisse utiliser l'émetteur Datadog. Il est important d'utiliser un préfixe de `concourse.ci` pour éviter d'envoyer des [métriques custom][3].

### Options de l'émetteur de métriques Datadog

Consultez la [documentation][4] de Concourse CI (en anglais) pour en savoir plus.

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Le host de l'Agent Datadog pour exposer des métriques dogstatsd [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Le port de l'Agent Datadog pour exposer des métriques dogstatsd [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Le préfixe de toutes les métriques permettant de les trouver facilement dans Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## Données collectées

### Métriques
{{< get-metrics-from-git "concourse_ci" >}}


### Événements

Cette intégration ne prend en charge aucun événement.

### Service

Cette intégration ne recueille aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://concourse-ci.org/concepts.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[4]: https://concourse-ci.org/metrics.html#configuring-metrics
[5]: https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/