---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    cassandra-overview: assets/dashboards/cassandra_overview.json
    cassandra-overview-screenboard: assets/dashboards/cassandra_overview_screenboard.json
    cassandra-read: assets/dashboards/cassandra_read.json
    cassandra-sstables: assets/dashboards/cassandra_sstable.json
    cassandra-write: assets/dashboards/cassandra_write.json
  logs:
    source: cassandra
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    cassandra_processes: assets/saved_views/cassandra_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md'
display_name: Cassandra
draft: false
git_integration_title: cassandra
guid: 03ba454d-425c-4f61-9e9c-54682c3ebce5
integration_id: cassandra
integration_title: Cassandra
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cassandra.
metric_to_check: cassandra.load.count
name: cassandra
process_signatures:
  - java org.apache.cassandra.service.CassandraDaemon
public_title: Intégration Datadog/Cassandra
short_description: 'Surveillez les performances des clusters, leur capacité, leur santé globale, et bien plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![dashboard par défaut de Cassandra][1]

## Présentation

Recueillez des métriques de Cassandra en temps réel pour :

- Visualiser et surveiller les états de Cassandra
- Être informé des failovers et des événements de Cassandra

## Configuration

### Installation

Le check Cassandra est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra. Nous vous conseillons d'utiliser le JDK d'Oracle pour cette intégration.

**Remarque** : ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][3] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][4].

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. La configuration par défaut de votre fichier `cassandra.d/conf.yaml` active la collecte de vos [métriques Cassandra](#metriques). Consultez le [fichier d'exemple cassandra.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple cassandra.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

    Pour vous assurer que les stack traces sont bien agrégées en un seul log, vous pouvez ajouter une [règle de traitement multiligne][3].

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "cassandra", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `cassandra` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Événements

Le check Cassandra n'inclut aucun événement.

### Checks de service

**cassandra.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Cassandra qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Comment surveiller les métriques de performance Cassandra][6]
- [Comment recueillir des métriques Cassandra][7]
- [Surveillance de Cassandra avec Datadog][8]




## Check de l'Agent : Cassandra Nodetool

![Dashboard par défaut Cassandra][9]

## Présentation

Ce check permet de recueillir des métriques pour votre cluster Cassandra qui ne sont pas proposées par l'[intégration jmx][10]. Cette collecte repose sur l'utilitaire `nodetool`.

## Configuration

### Installation

Le check Cassandra Nodetool est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra.

### Configuration

1. Modifiez le fichier `cassandra_nodetool.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][11]. Consultez le [fichier d'exemple cassandra_nodetool.d/conf.yaml][12] pour découvrir toutes les options de configuration disponibles :

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

2. [Redémarrez l'Agent][13].

#### Collecte de logs

Les logs Cassandra Nodetool sont recueillis par l'intégration Cassandra. Consultez les [instructions à ce sujet][14].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `cassandra_nodetool` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Événements

Le check Cassandra_nodetool n'inclut aucun événement.

### Checks de service

**cassandra.nodetool.node_up**:<br>
L'Agent envoie ce check de service pour chaque nœud du cluster surveillé. Renvoie `CRITICAL` si le nœud n'est pas disponible. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Comment surveiller les métriques de performance Cassandra][6]
- [Comment recueillir des métriques Cassandra][7]
- [Surveillance de Cassandra avec Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/integrations/java/
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[7]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[8]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[10]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection