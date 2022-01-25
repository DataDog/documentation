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
  - https://github.com/DataDog/integrations-core/blob/master/airflow/README.md
display_name: Airflow
draft: false
git_integration_title: airflow
guid: f55d88b1-1c0a-4a23-a2df-9516b50050dd
integration_id: airflow
integration_title: Airflow
integration_version: 2.1.2
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: airflow.
metric_to_check: airflow.dagbag_size
name: airflow
public_title: Intégration Datadog/Airflow
short_description: Surveillez des métriques liées à vos DAG, tâches, pools, exécuteurs, etc.
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
L'intégration Airflow se présente sous deux formes. Il y a d'abord l'intégration de l'Agent Datadog, qui effectue des requêtes vers un endpoint spécifié pour permettre à Airflow de signaler s'il peut établir une connexion et s'il est fonctionnel. Puis il y a la portion StatsD pour Airflow, grâce à laquelle il est possible de configurer Airflow de façon à envoyer des métriques à l'Agent Datadog, qui peut alors remapper la notation Airflow vers une notation Datadog.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Configurer l'intégration Airflow de l'Agent Datadog

Configurez le check Airflow inclus avec le package de l'[Agent Datadog][1] pour recueillir ses métriques de santé et ses checks de service. Pour ce faire, modifiez le paramètre `url` du fichier `airflow.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos checks de service Airflow. Consultez le [fichier d'exemple airflow.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

##### Connecter Airflow à DogStatsD

Connectez Airflow à DogStatsD (inclus avec l'Agent Datadog) via la fonctionnalité `statsd` pour recueillir des métriques. Pour en savoir plus sur les métriques transmises par la version d'Airflow utilisée et sur les options de configuration supplémentaires, consultez la documentation Airflow ci-dessous :
- [Métriques Airflow][3]
- [Configuration des métriques Airflow][4]

**Remarque** : les métriques StatsD transmises par Airflow peuvent varier en fonction de l'exécuteur Airflow utilisé. Par exemple, les métriques `airflow.ti_failures/successes, airflow.operator_failures/successes, airflow.dag.task.duration` ne sont [pas transmises pour `KubernetesExecutor`][5].

1. Installez le [plugin StatsD pour Airflow][6].

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

3. Modifiez le [fichier de configuration principal de l'Agent Datadog][7] `datadog.yaml` pour y ajouter les paramètres suivants :

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

1. [Redémarrez l'Agent][8].
2. Redémarrez Airflow pour commencer à envoyer vos métriques Airflow à l'endpoint DogStatsD de l'Agent Datadog.

##### Checks de service de l'intégration

Utilisez la configuration par défaut de votre fichier `airflow.d/conf.yaml` pour activer vos checks de service Airflow. Consultez le [fichier d'exemple airflow.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

##### Collecte de logs


{{< site-region region="us3" >}}
**La collecte de logs n'est pas prise en charge pour le site {{< region-param key="dd_site_name" >}} Datadog**.
{{< /site-region >}}


_Disponible à partir des versions > 6.0 de l'Agent_

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
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/scheduler/latest/*.log"
          source: airflow
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
          path: "<PATH_TO_AIRFLOW>/logs/!(scheduler)/*/*.log"
          source: airflow
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
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

3. [Redémarrez l'Agent][9].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[4]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://airflow.apache.org/docs/stable/metrics.html
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/help/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Configurer l'intégration Airflow de l'Agent Datadog

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                 |
|----------------------|-----------------------|
| `<NOM_INTÉGRATION>` | `airflow`             |
| `<CONFIG_INIT>`      | vide ou `{}`         |
| `<CONFIG_INSTANCE>`  | `{"url": "http://%%host%%"}` |

##### Connecter Airflow à DogStatsD

Connectez Airflow à DogStatsD (inclus avec l'Agent Datadog) via la fonctionnalité `statsd` pour recueillir des métriques. Pour en savoir plus sur les métriques transmises par la version d'Airflow utilisée et sur les options de configuration supplémentaires, consultez la documentation Airflow ci-dessous :
- [Métriques Airflow][2]
- [Configuration des métriques Airflow][3]

**Remarque** : les métriques StatsD transmises par Airflow peuvent varier en fonction de l'exécuteur Airflow utilisé. Par exemple, les métriques `airflow.ti_failures/successes, airflow.operator_failures/successes, airflow.dag.task.duration` ne sont [pas transmises pour `KubernetesExecutor`][1].

**Remarque** : les variables d'environnement utilisées pour Airflow peuvent varier d'une version à l'autre. Par exemple, Airflow `2.0.0` utilise la variable d'environnement `AIRFLOW__METRICS__STATSD_HOST`, tandis qu'Airflow `1.10.15` utilise `AIRFLOW__SCHEDULER__STATSD_HOST`. 

La configuration de StatsD pour Airflow peut être activée avec les variables d'environnement suivantes dans un déploiement Kubernetes :
  ```yaml
  env:
    - name: AIRFLOW__SCHEDULER__STATSD_ON
      value: "True"
    - name: AIRFLOW__SCHEDULER__STATSD_PORT
      value: "8125"
    - name: AIRFLOW__SCHEDULER__STATSD_PREFIX
      value: "airflow"
    - name: AIRFLOW__SCHEDULER__STATSD_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
  ```
La variable d'environnement pour l'endpoint de host `AIRFLOW__SCHEDULER__STATSD_HOST` est fournie avec l'adresse IP du host du nœud pour acheminer les données StatsD au pod de l'Agent Datadog sur le même nœud que le pod Airflow. Cette configuration nécessite également que l'Agent dispose d'un `hostPort` ouvert pour ce port `8125` et accepte le trafic StatsD non local. Pour en savoir plus, consultez la section sur la [configuration de DogStatsD sur Kubernetes][4].

Cette configuration doit rediriger le trafic StatsD provenant du conteneur Airflow vers un Agent Datadog prêt à accepter les données entrantes. La dernière étape consiste à mettre à jour l'Agent Datadog avec les `dogstatsd_mapper_profiles` correspondants. Pour ce faire, copiez les `dogstatsd_mapper_profiles` fournis dans l'[installation de host][5] dans votre fichier `datadog.yaml`. Vous pouvez également déployer votre Agent Datadog avec la configuration JSON équivalente dans la variable d'environnement `DD_DOGSTATSD_MAPPER_PROFILES`. En ce qui concerne Kubernetes, la notation de variable d'environnement équivalente est la suivante :
  ```yaml
  env: 
    - name: DD_DOGSTATSD_MAPPER_PROFILES
      value: >
        [{"prefix":"airflow.","name":"airflow","mappings":[{"name":"airflow.job.start","match":"airflow.*_start","tags":{"job_name":"$1"}},{"name":"airflow.job.end","match":"airflow.*_end","tags":{"job_name":"$1"}},{"name":"airflow.job.heartbeat.failure","match":"airflow.*_heartbeat_failure","tags":{"job_name":"$1"}},{"name":"airflow.operator_failures","match":"airflow.operator_failures_*","tags":{"operator_name":"$1"}},{"name":"airflow.operator_successes","match":"airflow.operator_successes_*","tags":{"operator_name":"$1"}},{"match_type":"regex","name":"airflow.dag_processing.last_runtime","match":"airflow\\.dag_processing\\.last_runtime\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dag_processing.last_run.seconds_ago","match":"airflow\\.dag_processing\\.last_run\\.seconds_ago\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dag.loading_duration","match":"airflow\\.dag\\.loading-duration\\.(.*)","tags":{"dag_file":"$1"}},{"name":"airflow.dagrun.first_task_scheduling_delay","match":"airflow.dagrun.*.first_task_scheduling_delay","tags":{"dag_id":"$1"}},{"name":"airflow.pool.open_slots","match":"airflow.pool.open_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.queued_slots","match":"pool.queued_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.running_slots","match":"pool.running_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.used_slots","match":"airflow.pool.used_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.starving_tasks","match":"airflow.pool.starving_tasks.*","tags":{"pool_name":"$1"}},{"match_type":"regex","name":"airflow.dagrun.dependency_check","match":"airflow\\.dagrun\\.dependency-check\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dag.task.duration","match":"airflow\\.dag\\.(.*)\\.([^.]*)\\.duration","tags":{"dag_id":"$1","task_id":"$2"}},{"match_type":"regex","name":"airflow.dag_processing.last_duration","match":"airflow\\.dag_processing\\.last_duration\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dagrun.duration.success","match":"airflow\\.dagrun\\.duration\\.success\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dagrun.duration.failed","match":"airflow\\.dagrun\\.duration\\.failed\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dagrun.schedule_delay","match":"airflow\\.dagrun\\.schedule_delay\\.(.*)","tags":{"dag_id":"$1"}},{"name":"airflow.scheduler.tasks.running","match":"scheduler.tasks.running"},{"name":"airflow.scheduler.tasks.starving","match":"scheduler.tasks.starving"},{"name":"airflow.sla_email_notification_failure","match":"sla_email_notification_failure"},{"match_type":"regex","name":"airflow.dag.task_removed","match":"airflow\\.task_removed_from_dag\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dag.task_restored","match":"airflow\\.task_restored_to_dag\\.(.*)","tags":{"dag_id":"$1"}},{"name":"airflow.task.instance_created","match":"airflow.task_instance_created-*","tags":{"task_class":"$1"}},{"name":"airflow.ti.start","match":"ti.start.*.*","tags":{"dagid":"$1","taskid":"$2"}},{"name":"airflow.ti.finish","match":"ti.finish.*.*.*","tags":{"dagid":"$1","state":"$3","taskid":"$2"}}]}]
  ```

Consultez le référentiel `integrations-core` Datadog pour découvrir un [exemple de configuration][6].

##### Collecte de logs


{{< site-region region="us3" >}}
**La collecte de logs n'est pas prise en charge pour le site {{< region-param key="dd_site_name" >}} Datadog**.
{{< /site-region >}}


_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][7].

| Paramètre      | Valeur                                                 |
|----------------|-------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "airflow", "service": "<NOM_APPLICATION>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[2]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[4]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=kubernetes#setup
[5]: /fr/integrations/airflow/?tab=host#connect-airflow-to-dogstatsd
[6]: https://github.com/DataDog/integrations-core/tree/master/airflow/tests/k8s_sample
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `airflow` dans la section Checks.

## Annexe

### Hook Datadog pour Airflow

Un [hook Datadog pour Airflow][5] peut également être utilisé pour interagir avec Datadog :

- Envoyer des métriques
- Interroger des métriques
- Envoyer des événements

## Données collectées

### Métriques
{{< get-metrics-from-git "airflow" >}}


### Événements

Le check Airflow n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "airflow" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].



[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://docs.datadoghq.com/fr/help/