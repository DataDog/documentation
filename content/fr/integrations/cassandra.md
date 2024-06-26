---
app_id: cassandra
app_uuid: a930364f-ac97-4483-92d6-5a982da7b1c0
assets:
  dashboards:
    cassandra-overview: assets/dashboards/cassandra_overview.json
    cassandra-overview-screenboard: assets/dashboards/cassandra_overview_screenboard.json
    cassandra-read: assets/dashboards/cassandra_read.json
    cassandra-sstables: assets/dashboards/cassandra_sstable.json
    cassandra-write: assets/dashboards/cassandra_write.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cassandra.load.count
      metadata_path: metadata.csv
      prefix: cassandra.
    process_signatures:
    - java org.apache.cassandra.service.CassandraDaemon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cassandra
  logs:
    source: cassandra
  saved_views:
    cassandra_processes: assets/saved_views/cassandra_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md
display_on_public_website: true
draft: false
git_integration_title: cassandra
integration_id: cassandra
integration_title: Cassandra
integration_version: 1.16.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cassandra
public_title: Cassandra
short_description: Surveillez les performances des clusters, leur capacité, leur santé
  globale, et bien plus encore.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Store
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez les performances des clusters, leur capacité, leur santé
    globale, et bien plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cassandra
---



![dashboard par défaut de Cassandra][1]

## Présentation

Recueillez des métriques de Cassandra en temps réel pour :

- Visualiser et surveiller les états de Cassandra
- Être informé des failovers et des événements de Cassandra

## Implémentation

### Installation

Le check Cassandra est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra. Nous vous conseillons d'utiliser le JDK d'Oracle pour cette intégration.

**Remarque** : ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [section JMX][3] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez l'[assistance Datadog][4].

### Configuration

##### Collecte de métriques

1. La configuration par défaut de votre fichier `cassandra.d/conf.yaml` active la collecte de vos [métriques Cassandra](#metriques). Consultez le [fichier d'exemple cassandra.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Pour les environnements conteneurisés, suivez les instructions de la section [Collecte de logs Kubernetes][7] ou de la section [Collecte de logs Docker][8].

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `cassandra.d/conf.yaml` pour commencer à recueillir vos logs Cassandra :

   ```yaml
     logs:
       - type: file
         path: /var/log/cassandra/*.log
         source: cassandra
         service: myapplication
         log_processing_rules:
            - type: multi_line
              name: log_start_with_date
              # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
              pattern: '[A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}'
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple cassandra.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    Pour vous assurer que les stack traces sont bien agrégées en un seul log, vous pouvez ajouter une [règle de traitement multiligne][9].

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande « status » de l'Agent][10] et cherchez `cassandra` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Événements

Le check Cassandra n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "cassandra" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Comment surveiller les métriques de performance Cassandra][11]
- [Comment recueillir des métriques Cassandra][12]
- [Surveillance de Cassandra avec Datadog][13]




## Intégration Cassandra Nodetool

![Dashboard par défaut Cassandra][14]

## Présentation

Ce check permet de recueillir des métriques pour votre cluster Cassandra qui ne sont pas proposées par l'[intégration jmx][15]. Cette collecte repose sur l'utilitaire `nodetool`.

## Implémentation

### Installation

Le check Cassandra Nodetool est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra.

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour la configuration dans un environnement conteneurisé.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

1. Modifiez le fichier `cassandra_nodetool.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][16]. Consultez le [fichier d'exemple cassandra_nodetool.d/conf.yaml][17] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param keyspaces - list of string - required
     ## The list of keyspaces to monitor.
     ## An empty list results in no metrics being sent.
     #
     - keyspaces:
         - "<KEYSPACE_1>"
         - "<KEYSPACE_2>"
   ```

2. [Redémarrez l'Agent][6].

#### Collecte de logs

Les logs Cassandra Nodetool sont recueillis par l'intégration Cassandra. Consultez les [instructions à ce sujet][18].

<!-- xxz tab xxx -->
<!-- xxx tab "Environnement conteneurisé" xxx -->

#### Environnement conteneurisé

Pour les environnements conteneurisés, utilisez l'[exportateur Prometheus][19] officiel dans le pod, puis servez-vous de la fonction Autodiscovery dans l'Agent pour rechercher le pod et interroger l'endpoint.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `cassandra_nodetool` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Événements

Le check Cassandra_nodetool n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "cassandra_nodetool" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Comment surveiller les métriques de performance Cassandra][11]
- [Comment recueillir des métriques Cassandra][12]
- [Surveillance de Cassandra avec Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/integrations/java/
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/containers/kubernetes/log/
[8]: https://docs.datadoghq.com/fr/containers/docker/log/
[9]: https://docs.datadoghq.com/fr/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[12]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[13]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[14]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[15]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[16]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[17]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[18]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection
[19]: https://github.com/prometheus/jmx_exporter