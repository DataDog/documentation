---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/spark/README.md'
display_name: Spark
git_integration_title: spark
guid: f7a5a40f-f73c-465a-be8f-b2b371c706a2
integration_id: spark
integration_title: Spark
is_public: true
kind: integration
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

Ce check permet de surveiller [Spark][13] avec l'Agent Datadog. Recueillez des métriques de Spark concernant :

* Les pilotes et exécuteurs : blocs RDD, mémoire utilisée, espace disque utilisé, durée, etc.
* Les RDD : nombre de partitions, mémoire utilisée, espace disque utilisé
* Les tâches : nombre de tâches actives, ignorées, ayant échoué, totales
* Les statuts des jobs : nombre de jobs actifs, terminés, ignorés, ayant échoué

## Implémentation
### Installation

Le check Spark est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre :

* Master Mesos (si vous utilisez Spark sur Mesos),
* YARN ResourceManager (si vous utilisez Spark sur YARN), ou
* Master Spark (si vous utilisez Spark en mode standalone)

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Agent conteneurisé](#agent-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `spark.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Les paramètres suivants peuvent nécessiter une mise à jour. Consultez le [fichier d'exemple spark.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    ```yaml
        init_config:

        instances:
          - spark_url: http://localhost:8088 # Spark master web UI
        #   spark_url: http://<Mesos_master>:5050 # Mesos master web UI
        #   spark_url: http://<YARN_ResourceManager_address>:8088 # YARN ResourceManager address

            spark_cluster_mode: spark_standalone_mode # default
        #   spark_cluster_mode: spark_mesos_mode
        #   spark_cluster_mode: spark_yarn_mode

            cluster_name: <CLUSTER_NAME> # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics
        #   spark_pre_20_mode: true   # if you use Standalone Spark < v2.0
        #   spark_proxy_enabled: true # if you have enabled the spark UI proxy
    ```

2. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                             |
|----------------------|-------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `spark`                                                           |
| `<CONFIG_INIT>`      | vide ou `{}`                                                     |
| `<CONFIG_INSTANCE>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<NOM_CLUSTER>"}` |

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
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter au master standalone de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.mesos_master.can_connect**<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter au master Mesos de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.application_master.can_connect**<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'ApplicationMaster de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

**spark.resource_manager.can_connect**<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter au ResourceManager de l'instance Spark. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
### Spark sur AWS EMR

Pour recueillir des métriques Spark lorsque Spark est configuré sur AWS EMR, [utilisez les actions Bootstrap][9] pour installer l'[Agent Datadog][10] puis créez le fichier de configuration `/etc/dd-agent/conf.d/spark.yaml` avec [les valeurs appropriées pour chaque nœud EMR][11].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Surveiller Hadoop et Spark avec Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/spark/metadata.csv
[9]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[10]: https://docs.datadoghq.com/fr/agent
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[12]: https://www.datadoghq.com/blog/monitoring-spark
[13]: https://spark.apache.org/


{{< get-dependencies >}}