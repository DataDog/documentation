---
app_id: airflow
app_uuid: ed426432-3df4-4ab8-ab2f-a5a85900c59b
assets:
  dashboards:
    Airflow Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: airflow.dagbag_size
      metadata_path: metadata.csv
      prefix: airflow.
    process_signatures:
    - airflow
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10083
    source_type_name: Airflow
  monitors:
    DAG task ongoing duration is high: assets/monitors/ongoing_duration.json
    Task instances are failing: assets/monitors/heartbeat_failures.json
  saved_views:
    airflow_overview: assets/saved_views/airflow_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automatización
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/airflow/README.md
display_on_public_website: true
draft: false
git_integration_title: airflow
integration_id: airflow
integration_title: Airflow
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: airflow
public_title: Airflow
short_description: Rastrea métricas en relación con DAGs, tareas, grupos, ejecutores,
  etc.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea métricas en relación con DAGs, tareas, grupos, ejecutores,
    etc.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airflow
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

El Datadog Agent recopila muchas métricas de Airflow, incluidas las de:

- DAGs (Directed Acyclic Graphs): número de procesos DAG, tamaño del grupo de DAG, etc.
- Tareas: fracasos de tareas, éxitos, terminaciones, etc.
- Grupos: ranuras abiertas, ranuras usadas, etc.
- Ejecutores: ranuras abiertas, tareas en cola, tareas en ejecución, etc.

Las métricas se recopilan a través del complemento [Airflow StatsD][1] y se envían a [DogStatsD][2] de Datadog.

Además de métricas, el Datadog Agent también envía checks de servicio relacionados con el estado de Airflow.

## Configuración

### Instalación

Todos los pasos que se indican a continuación son necesarios para que la integración de Airflow funcione correctamente. Antes de empezar, [instala el Datadog Agent][3] versión `>=6.17` o `>=7.17`, que incluye la función de asignación de StatsD/DogStatsD.

### Configuración
La integración de Airflow consta de dos partes:
- La porción del Datadog Agent, que realiza solicitudes a un endpoint proporcionado, para que Airflow informe si este puede conectarse y si está en buen estado. La integración del Agent también realiza consultas a Airflow para que produzca algunas de sus propias métricas.
- La porción de StatsD, en la que Airflow puede configurarse para enviar métricas al Datadog Agent, que puede reasignar la notación de Airflow a una notación Datadog.

Las [métricas](#metrics) de la integración de Airflow provienen de ambas porciones: el Agent y StatsD.


{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Configura la integración de Airflow y Datadog Agent

Configura el check de Airflow incluido en el paquete de [Datadog Agent][1] para recopilar métricas de estado y checks de servicio. Para ello, edita la `url` dentro del archivo `airflow.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del directorio de configuración de tu Agent, para empezar a recopilar tus checks de servicio de Airflow. Consulta [ejemplo airflow.d/conf.yaml][2] para ver todas las opciones disponibles de configuración.

Asegúrate de que la `url` coincide con tu [servidor web `base_url`][3] de Airflow, la URL utilizada para conectarte a tu instancia de Airflow.

##### Conectar Airflow a DogStatsD

Conecta Airflow a DogStatsD (incluido en el Datadog Agent) utilizando la función de Airflow `statsd` para recopilar métricas. Para obtener más información sobre métricas según la versión de Airflow utilizada y las opciones adicionales de configuración, consulta la documentación de Airflow que figura a continuación:
- [Métricas de Airflow][4]
- [Configuración de métricas de Airflow][5]

**Nota**: La presencia o ausencia de métricas de StatsD notificadas por Airflow puede variar en función del Airflow Executor utilizado. Por ejemplo: `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration` [no se informan para `KubernetesExecutor`][6].

1. Instala el [complemento Airflow StatsD][7].

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

2. Actualiza el archivo de configuración de Airflow `airflow.cfg` añadiendo las siguientes configuraciones:

   <div class="alert alert-warning"> No establezcas `statsd_datadog_enabled` en true. Activar `statsd_datadog_enabled` puede crear conflictos. Para evitar problemas, asegúrate de que la variable está establecida en `False`.</div>

   ```conf
   [scheduler]
   statsd_on = True
   # Hostname or IP of server running the Datadog Agent
   statsd_host = localhost
   # DogStatsD port configured in the Datadog Agent
   statsd_port = 8125
   statsd_prefix = airflow
   ```

3. Actualiza el [archivo de configuración principal del Datadog Agent][8] `datadog.yaml` añadiendo las siguientes configuraciones:

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
         - match: "airflow.local_task_job.task_exit.*.*.*.*"
           name: "airflow.local_task_job.task_exit"
           tags:
             job_id: "$1"
             dag_id: "$2"
             task_id: "$3"
             return_code: "$4"
         - match: "airflow.dag.*.*.queue_duration"
           name: "airflow.dag.queue_duration"
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: "airflow.dag.*.*.scheduled_duration"
           name: "airflow.dag.scheduled_duration"
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: "airflow.pool.open_slots.*"
         - match: "airflow.dagrun.*.first_task_scheduling_delay"
           name: "airflow.dagrun.first_task_scheduling_delay"
           tags:
             dag_id: "$1"
         - match: "airflow.pool.open_slots.*"
           name: "airflow.pool.open_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.queued_slots.*"
           name: "airflow.pool.queued_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.running_slots.*"
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
         - match: 'airflow.scheduler.tasks.running'
           name: "airflow.scheduler.tasks.running"
         - match: 'airflow.scheduler.tasks.starving'
           name: "airflow.scheduler.tasks.starving"
         - match: 'airflow.sla_email_notification_failure'
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
         - match: 'airflow\.ti\.start\.(.+)\.(\w+)'
           match_type: regex
           name: airflow.ti.start
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: 'airflow\.ti\.finish\.(\w+)\.(.+)\.(\w+)'
           name: airflow.ti.finish
           match_type: regex
           tags:
             dag_id: "$1"
             task_id: "$2"
             state: "$3"
   ```

##### Reiniciar el Datadog Agent y Airflow

1. [Reinicia el Agent][9].
2. Reinicia Airflow para empezar a enviar tus métricas de Airflow al endpoint Agent DogStatsD .

##### Checks de servicio de integración

Utiliza la configuración predeterminada en tu archivo `airflow.d/conf.yaml` para activar tus checks de servicio de Airflow. Consulta el ejemplo [airflow.d/conf.yaml][2] para ver todas las opciones disponibles de configuración.

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita este bloque de configuración en la parte inferior de tu `airflow.d/conf.yaml`:
  Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

   - Configuración para el gestor de procesadores DAG y logs de programador:

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

        La limpieza frecuente es recomendada para los logs de programador con rotación diaria de log.

   - Configuración adicional para logs de tareas de DAG:

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/*/*/*/*.log"
          source: airflow
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

      Advertencia: Por defecto, Airflow utiliza esta plantilla de archivo de log para las tareas: `log_filename_template = {{ ti.dag_id }}/{{ ti.task_id }}/{{ ts }}/{{ try_number }}.log`. El número de archivos de log crece rápidamente si no se limpian con regularidad. Este patrón es utilizado por la interfaz de usuario de Airflow para mostrar logs individualmente para cada tarea ejecutada.

      Si no visualizas logs en la interfaz de usuario de Airflow, Datadog te recomienda esta configuración en `airflow.cfg`: `log_filename_template = dag_tasks.log`. A continuación, el log rota este archivo y utiliza esta configuración:

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

3. [Reinicia el Agent][10].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[4]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[5]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[6]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[7]: https://airflow.apache.org/docs/stable/metrics.html
[8]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/help/
{{% /tab %}}
{{% tab "Contenedores" %}}

#### En contenedores

##### Configura la integración de Airflow y Datadog Agent

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                 |
|----------------------|-----------------------|
| `<INTEGRATION_NAME>` | `airflow`             |
| `<INIT_CONFIG>`      | en blanco o `{}`         |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%:8080"}` |

Asegúrate de que la `url` coincide con tu [servidor web `base_url`][2] de Airflow, la URL utilizada para conectarse a tu instancia de Airflow. Sustituye `localhost` por la variable de plantilla `%%host%%`.

Si estás utilizando el Helm chart de Airflow, esto [expone el servidor web como un servicio ClusterIP][3] que debes utilizar en el parámetro `url`. 

Por ejemplo, tus anotaciones de Autodiscovery pueden tener el siguiente aspecto:

```
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "airflow": {
          "instances": ["url": "http://airflow-ui.%%kube_namespace%%.svc.cluster.local:8080"]
        }
      }      
    # (...)
```

##### Conectar Airflow a DogStatsD

Conecta Airflow a DogStatsD (incluido en el Datadog Agent) utilizando la función de Airflow `statsd` para recopilar métricas. Para obtener más información sobre métricas según la versión de Airflow utilizada y las opciones adicionales de configuración, consulta la documentación de Airflow que figura a continuación:
- [Métricas de Airflow][4]
- [Configuración de métricas de Airflow][5]

**Nota**: La presencia o ausencia de métricas de StatsD notificadas por Airflow puede variar en función del Airflow Executor utilizado. Por ejemplo: `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration` [no se informan para `KubernetesExecutor`][6].

**Nota**: Las variables de entorno utilizadas para Airflow pueden variar entre versiones. Por ejemplo, en Airflow `2.0.0` se utiliza la variable de entorno `AIRFLOW__METRICS__STATSD_HOST` , mientras que en Airflow `1.10.15`, se utiliza `AIRFLOW__SCHEDULER__STATSD_HOST`.

La configuración de Airflow StatsD puede activarse con las siguientes variables de entorno en un despliegue de Kubernetes:
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
La variable de entorno para el endpoint del host `AIRFLOW__SCHEDULER__STATSD_HOST` se proporciona con la dirección IP del host del nodo para enrutar los datos de StatsD al pod del Datadog Agent en el mismo nodo que el pod de Airflow. Esta configuración también requiere que el Agent tenga un `hostPort` abierto para este puerto `8125` y acepte tráfico StatsD no local. Para obtener más información, consulta [Configuración de DogStatsD en Kubernetes][7].

Esto debería dirigir el tráfico de StatsD desde el contenedor de Airflow a un Datadog Agent listo para aceptar los datos entrantes. La última parte consiste en actualizar el Datadog Agent con los `dogstatsd_mapper_profiles` correspondientes. Esto puede hacerse copiando los`dogstatsd_mapper_profiles` proporcionados en la [instalación del host][8] en tu archivo `datadog.yaml` o desplegando tu Datadog Agent con la configuración JSON equivalente en la variable de entorno `DD_DOGSTATSD_MAPPER_PROFILES`. En lo que respecta a Kubernetes, la notación equivalente de la variable de entorno es:
  ```yaml
  env:
    - name: DD_DOGSTATSD_MAPPER_PROFILES
      value: >
        [{"name":"airflow","prefix":"airflow.","mappings":[{"match":"airflow.*_start","name":"airflow.job.start","tags":{"job_name":"$1"}},{"match":"airflow.*_end","name":"airflow.job.end","tags":{"job_name":"$1"}},{"match":"airflow.*_heartbeat_failure","name":"airflow.job.heartbeat.failure","tags":{"job_name":"$1"}},{"match":"airflow.operator_failures_*","name":"airflow.operator_failures","tags":{"operator_name":"$1"}},{"match":"airflow.operator_successes_*","name":"airflow.operator_successes","tags":{"operator_name":"$1"}},{"match":"airflow\\.dag_processing\\.last_runtime\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_runtime","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag_processing\\.last_run\\.seconds_ago\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_run.seconds_ago","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag\\.loading-duration\\.(.*)","match_type":"regex","name":"airflow.dag.loading_duration","tags":{"dag_file":"$1"}},{"match":"airflow.dagrun.*.first_task_scheduling_delay","name":"airflow.dagrun.first_task_scheduling_delay","tags":{"dag_id":"$1"}},{"match":"airflow.pool.open_slots.*","name":"airflow.pool.open_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.queued_slots.*","name":"airflow.pool.queued_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.running_slots.*","name":"airflow.pool.running_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.used_slots.*","name":"airflow.pool.used_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.starving_tasks.*","name":"airflow.pool.starving_tasks","tags":{"pool_name":"$1"}},{"match":"airflow\\.dagrun\\.dependency-check\\.(.*)","match_type":"regex","name":"airflow.dagrun.dependency_check","tags":{"dag_id":"$1"}},{"match":"airflow\\.dag\\.(.*)\\.([^.]*)\\.duration","match_type":"regex","name":"airflow.dag.task.duration","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.dag_processing\\.last_duration\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_duration","tags":{"dag_file":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.success\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.success","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.failed\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.failed","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.schedule_delay\\.(.*)","match_type":"regex","name":"airflow.dagrun.schedule_delay","tags":{"dag_id":"$1"}},{"match":"airflow.scheduler.tasks.running","name":"airflow.scheduler.tasks.running"},{"match":"airflow.scheduler.tasks.starving","name":"airflow.scheduler.tasks.starving"},{"match":"airflow.sla_email_notification_failure","name":"airflow.sla_email_notification_failure"},{"match":"airflow\\.task_removed_from_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_removed","tags":{"dag_id":"$1"}},{"match":"airflow\\.task_restored_to_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_restored","tags":{"dag_id":"$1"}},{"match":"airflow.task_instance_created-*","name":"airflow.task.instance_created","tags":{"task_class":"$1"}},{"match":"airflow\\.ti\\.start\\.(.+)\\.(\\w+)","match_type":"regex","name":"airflow.ti.start","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.ti\\.finish\\.(\\w+)\\.(.+)\\.(\\w+)","name":"airflow.ti.finish","match_type":"regex","tags":{"dag_id":"$1","task_id":"$2","state":"$3"}}]}]
  ```

Para añadir etiquetas (tags) no estáticas a métricas de StatsD, debes utilizar los perfiles de asignador DogStatsD. [Consulta un ejemplo de perfil de asignador][9] que añade las etiquetas `service` y `env`.


##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][10].

| Parámetro      | Valor                                                 |
|----------------|-------------------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "airflow", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/es/getting_started/agent/autodiscovery/?tab=docker#integration-templates
[2]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[3]: https://github.com/apache/airflow/blob/main/chart/values.yaml#L1522-L1529
[4]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[5]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[6]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[7]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=kubernetes#setup
[8]: /es/integrations/airflow/?tab=host#connect-airflow-to-dogstatsd
[9]: http://docs.datadoghq.com/resources/json/airflow_ust.json
[10]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes#configuration
{{% /tab%}}
{{< /tabs>}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `airflow` en la sección Checks.

## Anexo

### Airflow DatadogHook

Además, se puede utilizar [Airflow DatadogHook][5] para interactuar con Datadog:

- Métrica de Envío
- Métrica de Consulta
- Evento de Publicación

## Datos recopilados

### Métricas
{{< get-metrics-from-git "airflow" >}}


**Nota**: Las métricas `airflow.healthy`, `airflow.can_connect`, `airflow.dag.task.total_running` y `airflow.dag.task.ongoing_duration` se recopilan de la porción de la integración del Agent. Todas las demás métricas proceden de StatsD.

### Eventos

El check de Airflow no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "airflow" >}}


## Solucionar problemas

### Errores HTTP 403 para la integración del Agent

Es posible que necesites configurar parámetros para que el Datadog Agent realice solicitudes autenticadas a la API de Airflow. Utiliza una de las [opciones de configuración][6] disponibles.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].



[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/es/developers/dogstatsd/
[3]: https://docs.datadoghq.com/es/agent/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example#L84-L118
[7]: https://docs.datadoghq.com/es/help/