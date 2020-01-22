---
assets:
  dashboards: {}
  monitors: {}
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

Recueillez des métriques du service Cassandra en temps réel pour :

* Visualiser et surveiller les états de Cassandra
* Être informé des failovers et des événements de Cassandra

## Implémentation

### Installation

Le check Cassandra est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra. Il est recommandé d'utiliser le JDK d'Oracle pour cette intégration.

**Remarque** : ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][3] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][4].

### Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

#### Host

##### Collecte de métriques

1. La configuration par défaut de votre fichier `cassandra.d/conf.yaml` active la collecte de vos [métriques Cassandra](#metriques). Consultez le [fichier d'exemple cassandra.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

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
          sourcecategory: database
          service: myapplication
          log_processing_rules:
             - type: multi_line
               name: log_start_with_date
               # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
               pattern: [A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple cassandra.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    Pour vous assurer que les traces de pile sont bien agrégées en un seul log, vous pouvez ajouter une [règle de traitement multiligne][7].

3. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][9].

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][10].

| Paramètre      | Valeur                                                  |
|----------------|--------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "cassandra", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `cassandra` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra" >}}


### Événements

Le check Cassandra n'inclut aucun événement.

### Checks de service

**cassandra.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance Cassandra qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

* [Comment surveiller les métriques de performance Cassandra][13]
* [Comment recueillir des métriques Cassandra][14]
* [Surveillance de Cassandra avec Datadog][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/integrations/java
[4]: https://docs.datadoghq.com/fr/help
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[9]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[10]: https://docs.datadoghq.com/fr/agent/docker/log/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/cassandra/metadata.csv
[13]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[15]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog

{{< get-dependencies >}}


## Check de l'Agent : Cassandra Nodetool

![dashboard par défaut de Cassandra][111]

## Présentation

Ce check recueille des métriques pour votre cluster Cassandra qui ne sont pas proposées par l'[intégration jmx][112]. Cette collecte repose sur l'utilitaire `nodetool`.

## Configuration

### Installation

Le check Cassandra Nodetool est inclus avec le paquet de l'[Agent Datadog][113] : vous n'avez donc rien d'autre à installer sur vos nœuds Cassandra.

### Configuration

1. Modifiez le fichier `cassandra_nodetool.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][114]. Consultez le [fichier d'exemple cassandra_nodetool.d/conf.yaml][115] pour découvrir toutes les options de configuration disponibles :

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

2. [Redémarrez l'Agent][116].

### Validation

[Lancez la sous-commande `status` de l'Agent][117] et cherchez `cassandra_nodetool` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Événements

Le check Cassandra_nodetool n'inclut aucun événement.

### Checks de service

**cassandra.nodetool.node_up**:
L'Agent envoie ce check de service pour chaque nœud du cluster surveillé. Renvoie CRITICAL si le nœud n'est pas disponible. Si ce n'est pas le cas, renvoie OK.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][119].

## Pour aller plus loin

* [Comment surveiller les métriques de performance Cassandra][1110]
* [Comment recueillir des métriques Cassandra][1111]
* [Surveillance de Cassandra avec Datadog][1112]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[112]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[113]: https://app.datadoghq.com/account/settings#agent
[114]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[115]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[116]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[117]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[118]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/metadata.csv
[119]: https://docs.datadoghq.com/fr/help
[1110]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[1111]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[1112]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog


{{< get-dependencies >}}