---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Druid Overview: assets/dashboards/overview.json
  logs:
    source: druid
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- processing
- data store
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/druid/README.md
display_name: Druid
draft: false
git_integration_title: druid
guid: 8abd92f8-7383-45f2-a412-d6ee960baa15
integration_id: druid
integration_title: Druid
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: druid.
metric_to_check: druid.service.health
name: druid
public_title: Intégration Datadog/Druid
short_description: Surveillez des métriques relatives aux requêtes, à l'ingestion
  et à la coordination.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Druid][1]

## Présentation

L'Agent Datadog recueille des métriques en provenance de Druid via [DogStatsD][2]. DogStatsD recueille des métriques sur les requêtes Druid ainsi que sur les données d'ingestion et de coordination. Pour en savoir plus, consultez la [documentation relative aux métriques Druid][3].

En plus de recueillir des métriques, l'Agent envoie également un check de service relatif à la santé de Druid.

## Configuration

### Prérequis

La version 0.16 (ou ultérieure) de Druid est requise pour que cette intégration fonctionne correctement.

### Installation

Les étapes décrites ci-dessous sont toutes les deux nécessaires pour faire fonctionner l'intégration Druid. Avant de commencer, vous devez [installer l'Agent Datadog][4].

#### Étape 1 : configurez Druid de façon à recueillir ses métriques de santé et ses checks de service

Configurez le check Druid inclus avec le package de l'[Agent Datadog][5] pour recueillir ses métriques de santé et ses checks de service.

1. Modifiez le fichier `druid.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos checks de service Druid. Consultez le [fichier d'exemple druid.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.
2. [Redémarrez l'Agent][7].

#### Étape 2 : connectez Druid à DogStatsD (inclus avec l'Agent Datadog) à l'aide de l'extension `statsd-emitter` pour recueillir des métriques.

Pour configurer l'extension `statsd-emitter` et recueillir la plupart des [métriques Druid][3] :

1. Installez l'extension Druid [`statsd-emitter`][8].

   ```shell
   $ java \
     -cp "lib/*" \
     -Ddruid.extensions.directory="./extensions" \
     -Ddruid.extensions.hadoopDependenciesDir="hadoop-dependencies" \
     org.apache.druid.cli.Main tools pull-deps \
     --no-default-hadoop \
     -c "org.apache.druid.extensions.contrib:statsd-emitter:0.15.0-incubating"
   ```

   Pour une explication plus détaillée de cette étape, consultez le [guide officiel relatif au chargement d'extensions Druid][9] (en anglais).

2. Mettez à jour les propriétés Java de Druid en ajoutant les configurations suivantes :

   ```conf
   # Add `statsd-emitter` to the extensions list to be loaded
   druid.extensions.loadList=[..., "statsd-emitter"]

   # By default druid emission period is 1 minute (PT1M).
   # We recommend using 15 seconds instead:
   druid.monitoring.emissionPeriod=PT15S

   # Use `statsd-emitter` extension as metric emitter
   druid.emitter=statsd

   # Configure `statsd-emitter` endpoint
   druid.emitter.statsd.hostname=127.0.0.1
   druid.emitter.statsd.port:8125

   # Configure `statsd-emitter` to use dogstatsd format. Must be set to true, otherwise tags are not reported correctly to Datadog.
   druid.emitter.statsd.dogstatsd=true
   druid.emitter.statsd.dogstatsdServiceAsTag=true
   ```

3. Redémarrez Druid pour commencer à envoyer vos métriques Druid à l'Agent via DogStatsD.

#### Checks de service de l'intégration

Utilisez la configuration par défaut de votre fichier `druid.d/conf.yaml` pour activer la collecte de vos checks de service Druid. Consultez le [fichier d'exemple druid.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans datadog.yaml :

   ```yaml
   logs_enabled: true
   ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `redisdb.d/conf.yaml`, puis modifiez-le :

   ```yaml
   logs:
     - type: file
       path: '<PATH_TO_DRUID_DIR>/var/sv/*.log'
       source: druid
       service: '<SERVICE_NAME>'
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-\d{2}\-\d{2}
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `druid` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "druid" >}}


### Événements

Le check Druid n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "druid" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/druid/images/druid_dashboard_overview.png
[2]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[3]: https://druid.apache.org/docs/latest/operations/metrics.html
[4]: https://docs.datadoghq.com/fr/agent/
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://druid.apache.org/docs/latest/development/extensions-contrib/statsd.html
[9]: https://druid.apache.org/docs/latest/operations/including-extensions.html
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/druid/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/druid/assets/service_checks.json
[13]: https://docs.datadoghq.com/fr/help/