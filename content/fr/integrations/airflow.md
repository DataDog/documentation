---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Airflow Overview: assets/dashboards/overview.json
  logs:
    source: airflow
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/airflow/README.md'
display_name: Airflow
draft: false
git_integration_title: airflow
guid: f55d88b1-1c0a-4a23-a2df-9516b50050dd
integration_id: airflow
integration_title: Airflow
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: airflow.
metric_to_check: airflow.dagbag_size
name: airflow
public_title: Intégration Datadog/Airflow
short_description: 'Surveillez des métriques liées à vos DAG, tâches, pools, exécuteurs, etc.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'Agent Datadog recueille de nombreuses métriques à partir d'Airflow, notamment pour :

- Les DAG (Directed Acyclic Graphs, ou graphes orientés acycliques) : nombre de processus DAG, taille des dagbags, etc.
- Les tâches : tâches non réussies, réussies, arrêtées, etc.
- Les pools : emplacements libres, emplacements utilisés, etc.
- Les exécuteurs : emplacements libres, tâches en attente, tâches en cours d'exécution, etc.

Les métriques sont recueillies via le plugin [StatsD pour Airflow][1] puis envoyées à [Datadog DogStatsD][2].

En plus des métriques, l'Agent Datadog envoie également des checks de service liés à l'état de santé d'Airflow.

## Configuration

### Installation

Les étapes ci-dessous sont toutes nécessaires pour faire fonctionner l'intégration Airflow. Avant de commencer, [installez l'Agent Datadog][3] version `>=6.17` ou `>=7.17` pour bénéficier de la fonctionnalité de mappage StatsD/DogStatsD.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Configurer Airflow

Configurez le check Airflow inclus avec le package de l'[Agent Datadog][1] pour recueillir ses métriques de santé et ses checks de service.

(Facultatif) Modifiez le fichier `airflow.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos checks de service Airflow. Consultez le [fichier d'exemple airflow.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

##### Connecter Airflow à DogStatsD

Connectez Airflow à DogStatsD (inclus avec l'Agent Datadog) via la fonctionnalité `statsd` d'Airflow pour recueillir des métriques :

**Remarque** : la présence ou l'absence des métriques StatsD transmises par Airflow peut varier en fonction de l'exécuteur Airflow utilisé. Par exemple, les métriques `airflow.ti_failures/successes, airflow.operator_failures/successes, airflow.dag.task.duration` ne sont [pas transmises pour `KubernetesExecutor`][3].

1. Installez le [plugin StatsD pour Airflow][4].

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

2. Modifiez le fichier de configuration `airflow.cfg` d'Airflow pour y ajouter les paramètres suivants :

   ```conf
   [scheduler]
   statsd_on = True
   statsd_host = localhost  # Hostname or IP of server running the Datadog Agent
   statsd_port = 8125       # DogStatsD port configured in the Datadog Agent
   statsd_prefix = airflow
   ```

3. Modifiez le [fichier de configuration principal de l'Agent Datadog][5] `datadog.yaml` pour y ajouter les paramètres suivants :

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: airflow
       prefix: "airflow."
       mappings:
         - match: "airflow.*_start"
           name: "airflow.job.start"
           tags:
             job_name: "$1"
         - match: "airflow.*_end"
           name: "airflow.job.end"
           tags:
             job_name: "$1"
         - match: "airflow.*_heartbeat_failure"
           name: airflow.job.heartbeat.failure
           tags:
             job_name: "$1"
         - match: "airflow.operator_failures_*"
           name: "airflow.operator_failures"
           tags:
             operator_name: "$1"
         - match: "airflow.operator_successes_*"
           name: "airflow.operator_successes"
           tags:
             operator_name: "$1"
         - match: 'airflow\.dag_processing\.last_runtime\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_runtime"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag_processing\.last_run\.seconds_ago\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_run.seconds_ago"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag\.loading-duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag.loading_duration"
           tags:
             dag_file: "$1"
         - match: "airflow.dagrun.*.first_task_scheduling_delay"
           name: "airflow.dagrun.first_task_scheduling_delay"
           tags:
             dag_id: "$1"
         - match: "airflow.pool.open_slots.*"
           name: "airflow.pool.open_slots"
           tags:
             pool_name: "$1"
         - match: "pool.queued_slots.*"
           name: "airflow.pool.queued_slots"
           tags:
             pool_name: "$1"
         - match: "pool.running_slots.*"
           name: "airflow.pool.running_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.used_slots.*"
           name: "airflow.pool.used_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.starving_tasks.*"
           name: "airflow.pool.starving_tasks"
           tags:
             pool_name: "$1"
         - match: 'airflow\.dagrun\.dependency-check\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.dependency_check"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dag\.(.*)\.([^.]*)\.duration'
           match_type: "regex"
           name: "airflow.dag.task.duration"
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: 'airflow\.dag_processing\.last_duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_duration"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dagrun\.duration\.success\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.success"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.duration\.failed\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.failed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.schedule_delay\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.schedule_delay"
           tags:
             dag_id: "$1"
         - match: 'scheduler.tasks.running'
           name: "airflow.scheduler.tasks.running"
         - match: 'scheduler.tasks.starving'
           name: "airflow.scheduler.tasks.starving"
         - match: sla_email_notification_failure
           name: 'airflow.sla_email_notification_failure'
         - match: 'airflow\.task_removed_from_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_removed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.task_restored_to_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_restored"
           tags:
             dag_id: "$1"
         - match: "airflow.task_instance_created-*"
           name: "airflow.task.instance_created"
           tags:
             task_class: "$1"
         - match: "ti.start.*.*"
           name: "airflow.ti.start"
           tags:
             dagid: "$1"
             taskid: "$2"
         - match: "ti.finish.*.*.*"
           name: "airflow.ti.finish"
           tags:
             dagid: "$1"
             taskid: "$2"
             state: "$3"
   ```

##### Redémarrer l'Agent Datadog et Airflow

1. [Redémarrez l'Agent][6].
2. Redémarrez Airflow pour commencer à envoyer vos métriques Airflow à l'endpoint DogStatsD de l'Agent Datadog.

##### Checks de service de l'intégration

Utilisez la configuration par défaut de votre fichier `airflow.d/conf.yaml` pour activer vos checks de service Airflow. Consultez le [fichier d'exemple airflow.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `airflow.d/conf.yaml`, puis modifiez-le :
  Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

   - Configuration des logs pour le planificateur et le gestionnaire de processeurs DAG :

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_processor_manager/dag_processor_manager.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/scheduler/*/*.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

        Il est conseillé d'effectuer un nettoyage régulier des logs du planificateur, en réalisant une rotation quotidienne des logs.

   - Configuration supplémentaire pour les logs des tâches DAG :

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/*/*/*/*.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

      Attention : par défaut, Airflow utilise le modèle de fichier de log suivant pour les tâches : `log_filename_template = {{ ti.dag_id }}/{{ ti.task_id }}/{{ ts }}/{{ try_number }}.log`. Le nombre de logs augmentera considérablement si vous n'effectuez pas un nettoyage régulier. Ce modèle est utilisé par l'interface d'Airflow pour afficher tous les logs de chaque tâche exécutée.

      Si vous ne consultez pas vos logs depuis l'interface Airflow, nous vous conseillons plutôt d'utiliser la configuration suivante dans `airflow.cfg` : `log_filename_template = dag_tasks.log`. Effectuez ensuite une rotation des logs de ce fichier et utilisez cette configuration :

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_tasks.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

3. [Redémarrez l'Agent][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://airflow.apache.org/docs/stable/metrics.html
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/help/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                 |
|----------------------|-----------------------|
| `<NOM_INTÉGRATION>` | `airflow`             |
| `<CONFIG_INIT>`      | vide ou `{}`         |
| `<CONFIG_INSTANCE>`  | `{"url": "%%host%%"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                 |
|----------------|-------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "airflow", "service": "<NOM_APPLICATION>"}` |

##### Kubernetes

Conseils pour les installations Kubernetes :

- Personnalisez la configuration Airflow avec des [annotations de pod][2].
- Lorsque vous modifiez `airflow.cfg`, vous devez définir `statsd_host` sur l'adresse IP du nœud Kubernetes.
- Consultez le référentiel `integrations-core` Datadog pour découvrir un [exemple de configuration][3].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://github.com/DataDog/integrations-core/tree/master/airflow/tests/k8s_sample
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `airflow` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "airflow" >}}


### Checks de service

**airflow.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Airflow. Si ce n'est pas le cas, renvoie `OK`.

**airflow.healthy** :<br>
Renvoie `CRITICAL` si le processus Airflow n'est pas sain. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Airflow n'inclut aucun événement.

## Annexe

### Hook Datadog pour Airflow

Un [hook Datadog pour Airflow][5] peut également être utilisé pour interagir avec Datadog :

- Envoyer des métriques
- Interroger des métriques
- Envoyer des événements

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://docs.datadoghq.com/fr/help/