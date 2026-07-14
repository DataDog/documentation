---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: spark
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/spark/README.md'
display_name: Spark
draft: false
git_integration_title: spark
guid: f7a5a40f-f73c-465a-be8f-b2b371c706a2
integration_id: spark
integration_title: Spark
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: spark.
metric_to_check: spark.job.count
name: spark
public_title: Intégration Datadog/Spark
short_description: 'Surveillez les taux d''échec des tâches, les shuffled bytes, et bien plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Spark][1]

## Présentation

Ce check permet de surveiller [Spark][2] avec l'Agent Datadog. Recueillez des métriques de Spark concernant :

- Les pilotes et exécuteurs : blocs RDD, mémoire utilisée, espace disque utilisé, durée, etc.
- Les RDD : nombre de partitions, mémoire utilisée, espace disque utilisé.
- Les tâches : nombre de tâches actives, ignorées, ayant échoué, totales.
- Les statuts des jobs : nombre de jobs actifs, terminés, ignorés, ayant échoué.

**Remarque** : Les métriques Spark Structured Streaming ne sont pas prises en charge.

## Configuration

### Installation

Le check Spark est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre master Mesos (pour Spark sur Mesos), ResourceManager YARN (pour Spark sur YARN) ou master Spark (pour Spark en mode standalone).

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `spark.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Les paramètres suivants peuvent nécessiter une mise à jour. Consultez le [fichier d'exemple spark.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - spark_url: http://localhost:8080 # Spark master web UI
       #   spark_url: http://<Mesos_master>:5050 # Mesos master web UI
       #   spark_url: http://<YARN_ResourceManager_address>:8088 # YARN ResourceManager address

       spark_cluster_mode: spark_yarn_mode # default
       #   spark_cluster_mode: spark_mesos_mode
       #   spark_cluster_mode: spark_yarn_mode
       #   spark_cluster_mode: spark_driver_mode

       # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics
       cluster_name: "<CLUSTER_NAME>"
       # spark_pre_20_mode: true   # if you use Standalone Spark < v2.0
       # spark_proxy_enabled: true # if you have enabled the spark UI proxy
   ```

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `spark`                                                           |
| `<CONFIG_INIT>`      | vide ou `{}`                                                     |
| `<CONFIG_INSTANCE>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<NOM_CLUSTER>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

      ```yaml
       logs_enabled: true
     ```

2. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `spark.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `type`, `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple spark.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: spark
           service: <SERVICE_NAME>
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

3. [Redémarrez l'Agent][5].

Consultez la [documentation de Datadog][6] pour découvrir comment configurer l'Agent afin de recueillir les logs dans un environnement Docker.

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `spark` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "spark" >}}


### Événements

Le check Spark n'inclut aucun événement.

### Checks de service

L'Agent envoie l'un des checks de service suivants, selon la façon dont vous exécutez Spark :

**spark.standalone_master.can_connect**<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au master standalone de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.mesos_master.can_connect**<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au master Mesos de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.application_master.can_connect**<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'ApplicationMaster de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.resource_manager.can_connect**<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au ResourceManager de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.driver.can_connect**<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au ResourceManager de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

### Spark sur AWS EMR

Pour recueillir des métriques Spark lorsque Spark est configuré sur AWS EMR, [utilisez les actions Bootstrap][8] pour installer l'[Agent Datadog][10] :

Pour l'Agent v5, créez le fichier de configuration `/etc/dd-agent/conf.d/spark.yaml` avec les [valeurs appropriées pour chaque nœud EMR][9].

Pour l'Agent v6 ou v7, créez le fichier de configuration `/etc/datadog-agent/conf.d/spark.d/conf.yaml` avec les [valeurs appropriées pour chaque nœud EMR][11].


## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Hadoop et Spark avec Datadog][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://spark.apache.org/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: 
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[9]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[10]: https://www.datadoghq.com/blog/monitoring-spark