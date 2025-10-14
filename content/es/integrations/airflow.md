---
app_id: airflow
categories:
- automatización
- recopilación de logs
custom_kind: integración
description: Rastrea métricas en relación con DAG, tareas, grupos, ejecutores, etc.
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Airflow
---
<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> (en la vista previa de Airflow) proporciona un seguimiento inmediato de las ejecuciones de DAG de Airflow, lo que te ayuda a solucionar rápidamente problemas, correlacionar ejecuciones de DAG con logs y comprender pipelines complejos con linaje de datos entre DAG.<br/><br/>
<strong>Nota</strong>: Esta página sólo cubre la documentación para recopilar métricas y logs de la integración de Airflow utilizando el Datadog Agent.
</div>

## Información general

El Datadog Agent recopila muchas métricas de Airflow, incluidas las de:

- DAGs (Directed Acyclic Graphs): número de procesos DAG, tamaño del grupo de DAG, etc.
- Tareas: fracasos de tareas, éxitos, eliminaciones, etc.
- Grupos: ranuras abiertas, ranuras usadas, etc.
- Ejecutores: ranuras abiertas, tareas en cola, tareas en ejecución, etc.

Las métricas se recopilan a través del complemento [Airflow StatsD](https://airflow.apache.org/docs/stable/metrics.html) y se envían a [DogStatsD] de Datadog (https://docs.datadoghq.com/developers/dogstatsd/).

Además de métricas, el Datadog Agent también envía checks de servicio relacionados con el estado de Airflow.

## Configuración

### Instalación

Todos los pasos que se indican a continuación son necesarios para que la integración de Airflow funcione correctamente. Antes de empezar, [instala la versión del Datadog Agent](https://docs.datadoghq.com/agent/) `>=6.17` o `>=7.17`, que incluye la función de asignación StatsD/DogStatsD.

### Configuración

La integración de Airflow consta de dos partes:

- La porción del Datadog Agent, que realiza solicitudes a un endpoint proporcionado, para que Airflow informe si este puede conectarse y si está en buen estado. La integración del Agent también realiza consultas a Airflow para que produzca algunas de sus propias métricas.
- La porción de StatsD, en la que Airflow puede configurarse para enviar métricas al Datadog Agent, que puede reasignar la notación de Airflow a una notación Datadog.

Las [métricas](#metrics) de la integración de Airflow provienen de ambas porciones: el Agent y StatsD.

{{< tabs >}}

{{% tab "Host" %}}

#### host

##### Configura la integración de Airflow y Datadog Agent

Configura el check de Airflow incluido en el paquete de [Datadog Agentt](https://app.datadoghq.com/account/settings/agent/latest) para recopilar métricas de estado y checks de servicio. Para ello, edita la `url` dentro del archivo `airflow.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del directorio de configuración de tu Agent, para empezar a recopilar tus checks de servicio de Airflow. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo airflow.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example).

Asegúrate de que la `url` coincide con la [`base_url` de tu servidor web](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url) de Airflow, con la URL utilizada para conectarse a tu instancia Airflow.

##### Conectar Airflow a DogStatsD

Conecta Airflow a DogStatsD (incluido en el Datadog Agent) utilizando la función de Airflow `statsd` para recopilar métricas. Para obtener más información sobre métricas según la versión de Airflow utilizada y las opciones adicionales de configuración, consulta la documentación de Airflow que figura a continuación:

- [Métricas de Airflow](https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html)
- [Configuración de métricas de Airflow](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics)

**Nota**: La presencia o ausencia de métricas de StatsD informadas por Airflow puede variar en función del ejecutor Airflow utilizado. Por ejemplo: `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration` son [no se informa para `KubernetesExecutor`](https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html).

1. Instala el complemento [Airflow StatsD](https://airflow.apache.org/docs/stable/metrics.html).

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

1. Actualiza el archivo de configuración de Airflow `airflow.cfg` añadiendo las siguientes configuraciones:

   <div class="alert alert-danger"> No establezcas `statsd_datadog_enabled` en true. Activar `statsd_datadog_enabled` puede crear conflictos. Para evitar problemas, asegúrate de que la variable está establecida en `False`.</div>

   ```conf
   [scheduler]
   statsd_on = True
   # Hostname or IP of server running the Datadog Agent
   statsd_host = localhost
   # DogStatsD port configured in the Datadog Agent
   statsd_port = 8125
   statsd_prefix = airflow
   ```

1. Actualiza el [archivo de configuración principal del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` añadiendo las siguientes configuraciones:

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
         - match: "airflow.scheduler.tasks.running"
           name: "airflow.scheduler.tasks.running"
         - match: "airflow.scheduler.tasks.starving"
           name: "airflow.scheduler.tasks.starving"
         - match: "airflow.sla_email_notification_failure"
           name: "airflow.sla_email_notification_failure"
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

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent).
1. Reinicia Airflow para empezar a enviar tus métricas de Airflow al endpoint Agent DogStatsD .

##### Checks de servicio de integración

Utiliza la configuración predeterminada de tu archivo `airflow.d/conf.yaml` para activar los checks de tu servicio Airflow. Para conocer todas las opciones de configuración disponibles, consulta el ejemplo [airflow.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita este bloque de configuración en la parte inferior de tu `airflow.d/conf.yaml`:
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

     Se recomienda una limpieza frecuente del programador de logs con rotación diaria de logs.

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

     Advertencia: Por defecto, Airflow utiliza esta plantilla de archivos de logs para las tareas: `log_filename_template = {{ ti.dag_id }}/{{ ti.task_id }}/{{ ts }}/{{ try_number }}.log`. El número de archivos de logs crece rápidamente si no se limpian con regularidad. Este patrón es utilizado por la interfaz de usuario de Airflow para mostrar logs individuales de cada tarea ejecutada.

     Si no visualizas logs en la interfaz de usuario de Airflow, Datadog te recomienda esta configuración en `airflow.cfg`: `log_filename_template = dag_tasks.log`. A continuación, rota el log de este archivo y utiliza esta configuración:

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

1. [Reinicia el Agent](https://docs.datadoghq.com/help/).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

##### Configura la integración de Airflow y Datadog Agent

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/getting_started/agent/autodiscovery/?tab=docker#integration-templates) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                             |
| -------------------- | --------------------------------- |
| `<INTEGRATION_NAME>` | `airflow`                         |
| `<INIT_CONFIG>`      | en blanco o `{}`                     |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%:8080"}` |

Asegúrate de que `url` coincide con la [`base_url` de tu servidor web](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url) de Airflow, con la URL utilizada para conectarse a tu instancia Airflow. Sustituye `localhost` por la variable de plantilla `%%host%%`.

Si estás utilizando el Helm chart de Airflow, este [expone el servidor web como un servicio ClusterIP](https://github.com/apache/airflow/blob/main/chart/values.yaml#L1522-L1529) que debes utilizar en el parámetro `url`.

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
          "instances": [
            {
              "url": "http://airflow-ui.%%kube_namespace%%.svc.cluster.local:8080"
            }
          ]
        }
      }
    # (...)
```

Sustituye `<CONTAINER_IDENTIFIER>` por el nombre del contenedor dentro del pod (el valor devuelto por `.name`).

##### Conectar Airflow a DogStatsD

Conecta Airflow a DogStatsD (incluido en el Datadog Agent) utilizando la función de Airflow `statsd` para recopilar métricas. Para obtener más información sobre métricas según la versión de Airflow utilizada y las opciones adicionales de configuración, consulta la documentación de Airflow que figura a continuación:

- [Métricas de Airflow](https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html)
- [Configuración de métricas de Airflow](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics)

**Nota**: La presencia o ausencia de métricas de StatsD informadas por Airflow puede variar en función del ejecutor Airflow utilizado. Por ejemplo: `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration` son [no se informa para `KubernetesExecutor`](https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html).

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

La variable de entorno del endpoint del host `AIRFLOW__SCHEDULER__STATSD_HOST` se proporciona con la dirección IP del host del nodo para enrutar los datos de StatsD al pod del Datadog Agent en el mismo nodo que el pod de Airflow. Esta configuración también requiere que el Agent tenga un `hostPort` abierto para este puerto `8125` y acepte tráfico de StatsD no local. Para obtener más información, consulta [Configuración de DogStatsD en Kubernetes](https://docs.datadoghq.com/developers/dogstatsd/?tab=kubernetes#setup).

Esto debería dirigir el tráfico de StatsD desde el contenedor de Airflow a un Datadog Agent listo para aceptar los datos entrantes. La última parte consiste en actualizar el Datadog Agent con los `dogstatsd_mapper_profiles` correspondientes. Esto puede hacerse copiando los`dogstatsd_mapper_profiles` proporcionados en la [instalación del host](https://docs.datadoghq.com/integrations/airflow/?tab=host#connect-airflow-to-dogstatsd) en tu archivo `datadog.yaml` o desplegando tu Datadog Agent con la configuración JSON equivalente en la variable de entorno `DD_DOGSTATSD_MAPPER_PROFILES`. En lo que respecta a Kubernetes, la notación equivalente de la variable de entorno es:

```yaml
env:
  - name: DD_DOGSTATSD_MAPPER_PROFILES
    value: >
      [{"name":"airflow","prefix":"airflow.","mappings":[{"match":"airflow.*_start","name":"airflow.job.start","tags":{"job_name":"$1"}},{"match":"airflow.*_end","name":"airflow.job.end","tags":{"job_name":"$1"}},{"match":"airflow.*_heartbeat_failure","name":"airflow.job.heartbeat.failure","tags":{"job_name":"$1"}},{"match":"airflow.operator_failures_*","name":"airflow.operator_failures","tags":{"operator_name":"$1"}},{"match":"airflow.operator_successes_*","name":"airflow.operator_successes","tags":{"operator_name":"$1"}},{"match":"airflow\\.dag_processing\\.last_runtime\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_runtime","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag_processing\\.last_run\\.seconds_ago\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_run.seconds_ago","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag\\.loading-duration\\.(.*)","match_type":"regex","name":"airflow.dag.loading_duration","tags":{"dag_file":"$1"}},{"match":"airflow.dagrun.*.first_task_scheduling_delay","name":"airflow.dagrun.first_task_scheduling_delay","tags":{"dag_id":"$1"}},{"match":"airflow.pool.open_slots.*","name":"airflow.pool.open_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.queued_slots.*","name":"airflow.pool.queued_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.running_slots.*","name":"airflow.pool.running_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.used_slots.*","name":"airflow.pool.used_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.starving_tasks.*","name":"airflow.pool.starving_tasks","tags":{"pool_name":"$1"}},{"match":"airflow\\.dagrun\\.dependency-check\\.(.*)","match_type":"regex","name":"airflow.dagrun.dependency_check","tags":{"dag_id":"$1"}},{"match":"airflow\\.dag\\.(.*)\\.([^.]*)\\.duration","match_type":"regex","name":"airflow.dag.task.duration","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.dag_processing\\.last_duration\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_duration","tags":{"dag_file":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.success\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.success","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.failed\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.failed","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.schedule_delay\\.(.*)","match_type":"regex","name":"airflow.dagrun.schedule_delay","tags":{"dag_id":"$1"}},{"match":"airflow.scheduler.tasks.running","name":"airflow.scheduler.tasks.running"},{"match":"airflow.scheduler.tasks.starving","name":"airflow.scheduler.tasks.starving"},{"match":"airflow.sla_email_notification_failure","name":"airflow.sla_email_notification_failure"},{"match":"airflow\\.task_removed_from_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_removed","tags":{"dag_id":"$1"}},{"match":"airflow\\.task_restored_to_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_restored","tags":{"dag_id":"$1"}},{"match":"airflow.task_instance_created-*","name":"airflow.task.instance_created","tags":{"task_class":"$1"}},{"match":"airflow\\.ti\\.start\\.(.+)\\.(\\w+)","match_type":"regex","name":"airflow.ti.start","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.ti\\.finish\\.(\\w+)\\.(.+)\\.(\\w+)","name":"airflow.ti.finish","match_type":"regex","tags":{"dag_id":"$1","task_id":"$2","state":"$3"}}]}]
```

Para añadir etiquetas (tags) no estáticas a métricas de StatsD, debes utilizar los perfiles de asignador DogStatsD. [Consulta un ejemplo de perfil de asignador](http://docs.datadoghq.com/resources/json/airflow_ust.json) que añade las etiquetas `service` y `env`.

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

| Parámetro      | Valor                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "airflow", "service": "<YOUR_APP_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information) y busca `flink` en la sección Checks.

## Anexo

### Airflow DatadogHook

Además, el [DatadogHook de Airflow](https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html) puede utilizarse para interactuar con Datadog:

- Métrica de Envío
- Métrica de Consulta
- Evento de Publicación

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **airflow.can_connect** <br>(count) | 1 si puede conectarse a Airflow, de lo contrario 0|
| **airflow.celery.task_timeout_error** <br>(count) | Número de errores `AirflowTaskTimeout` generados al publicar la tarea en Celery Broker.<br>_Se muestra como error_ |
| **airflow.collect_db_dags** <br>(gauge) | Milisegundos necesarios para recuperar todos los DAG serializados de la base de datos<br>_Se muestra como milisegundos_. |
| **airflow.dag.callback_exceptions** <br>(count) | Número de excepciones generadas por las devoluciones de llamadas de DAG. Cuando esto ocurre, significa que la devolución de llamadas de DAG no está funcionando<br>_Se muestra como error_. |
| **airflow.dag.loading_duration** <br>(gauge) | Duración de la carga del DAG en segundos (obsoleto)<br>_Se muestra como segundos_ |
| **airflow.dag.task.duration** <br>(gauge) | Milisegundos que se tarda en terminar una tarea<br>_Se muestra como milisegundos_ |
| **airflow.dag.task.ongoing_duration** <br>(gauge) | Duración actual de las tareas DAG en curso<br>_Se muestra como segundos_. |
| **airflow.dag.task.total_running** <br>(gauge) | Número total de tareas en ejecución|
| **airflow.dag.task_removed** <br>(gauge) | Tareas eliminadas del DAG<br>_Se muestra como segundos_ |
| **airflow.dag.task_restored** <br>(gauge) | Tareas restauradas en DAG<br>_Se muestra como segundos_ |
| **airflow.dag_file_refresh_error** <br>(count) | Número de fallos al cargar cualquier archivo DAG<br>_Se muestra como error_ |
| **airflow.dag_processing.import_errors** <br>(gauge) | Número de errores al intentar analizar archivos DAG<br>_Se muestra como error_ |
| **airflow.dag_processing.last_duration** <br>(gauge) | Milisegundos que se tarda en cargar el archivo DAG dado<br>_Se muestra como milisegundos_ |
| **airflow.dag_processing.last_run.seconds_ago** <br>(gauge) | Segundos transcurridos desde el último procesamiento de `<dag_file>`<br> _Se muestra como segundos_ |
| **airflow.dag_processing.last_runtime** <br>(gauge) | Segundos que se tarda en procesar `<dag_file>` (en la iteración más reciente)<br>_Se muestra como segundos_ |
| **airflow.dag_processing.manager_stalls** <br>(count) | Número de paradas de `DagFileProcessorManager`|
| **airflow.dag_processing.processes** <br>(count) | Número de procesos de análisis DAG en ejecución|
| **airflow.dag_processing.processor_timeouts** <br>(gauge) | Número de procesadores de archivos eliminados por tardar demasiado tiempo|
| **airflow.dag_processing.total_parse_time** <br>(gauge) | Segundos que se tarda en analizar e importar todos los archivos DAG una vez<br>_Se muestra como segundos_ |
| **airflow.dagbag_size** <br>(gauge) | Tamaño de la bolsa DAG|
| **airflow.dagrun.dependency_check** <br>(gauge) | Milisegundos que se tardan en comprobar las dependencias DAG<br>_Se muestra como milisegundos_ |
| **airflow.dagrun.duration.failed** <br>(gauge) | Milisegundos que tarda un DagRun en alcanzar el estado de fallo<br>_Se muestra como milisegundos_ |
| **airflow.dagrun.duration.success** <br>(gauge) | Milisegundos que tarda un DagRun en alcanzar el estado de éxito<br>_Se muestra como milisegundos_ |
| **airflow.dagrun.first_task_scheduling_delay** <br>(gauge) | Milisegundos transcurridos entre la fecha de inicio de la primera tarea y el inicio previsto por DagRun<br>_Se muestra como milisegundos_. |
| **airflow.dagrun.schedule_delay** <br>(gauge) | Milisegundos de retraso entre la fecha programada de inicio de DagRun y la fecha real de inicio de DagRun<br>_Se muestra como milisegundos_ |
| **airflow.executor.open_slots** <br>(gauge) | Número de ranuras abiertas en el ejecutor|
| **airflow.executor.queued_tasks** <br>(gauge) | Número de tareas en cola en el ejecutor<br>_Se muestra como tarea_ |
| **airflow.executor.running_tasks** <br>(gauge) | Número de tareas en ejecución en el ejecutor<br>_Se muestra como tarea_. |
| **airflow.healthy** <br>(count) | 1 si el estado de Airflow es saludable, de lo contrario 0|
| **airflow.job.end** <br>(count) | Número de trabajos `<job_name>` finalizados, por ej. `SchedulerJob`, `LocalTaskJob`<br> _Se muestra como trabajo_ |
| **airflow.job.heartbeat.failure** <br>(count) | Número de latidos fallidos de un trabajo `<job_name>`, por ej. `SchedulerJob`, `LocalTaskJob`<br> _Se muestra como error_ |
| **airflow.job.start** <br>(count) | Número de trabajos iniciados `<job_name>`, por ej. `SchedulerJob`, `LocalTaskJob`<br> _Se muestra como trabajo_ |
| **airflow.operator_failures** <br>(count) | Fallos `<operator_name>` de operador|
| **airflow.operator_successes** <br>(count) | Éxitos `<operator_name>` de operador|
| **airflow.pool.open_slots** <br>(gauge) | Número de ranuras abiertas en el grupo|
| **airflow.pool.queued_slots** <br>(gauge) | Número de ranuras en cola en el grupo|
| **airflow.pool.running_slots** <br>(gauge) | Número de ranuras en ejecución en el grupo|
| **airflow.pool.starving_tasks** <br>(gauge) | Número de tareas con inanición en el grupo<br>_Se muestra como tarea_ |
| **airflow.pool.used_slots** <br>(gauge) | Número de ranuras utilizadas en el grupo|
| **airflow.previously_succeeded** <br>(count) | Número de instancias de tareas realizadas con éxito con anterioridad<br>_Se muestra como tarea_ |
| **airflow.scheduler.critical_section_busy** <br>(count) | Recuento de veces que un proceso del programador intentó obtener un bloqueo en la sección crítica (necesaria para enviar tareas al ejecutor) y lo encontró bloqueado por otro proceso.<br>_Se muestra como operación_ |
| **airflow.scheduler.critical_section_duration** <br>(gauge) | Milisegundos transcurridos en la sección crítica del bucle del programador. Sólo un programador puede entrar en este bucle a la vez<br>_Se muestra como milisegundos_ |
| **airflow.scheduler.orphaned_tasks.adopted** <br>(count) | Número de tareas huérfanas adoptadas por el programador <br>_Se muestra como tarea_ |
| **airflow.scheduler.orphaned_tasks.cleared** <br>(count) | Número de tareas huérfanas borradas por el programador<br>_Se muestra como tarea_ |
| **airflow.scheduler.tasks.executable** <br>(count) | Número de tareas que están listas para su ejecución (en cola) con respecto a los límites del grupo, la concurrencia de dags, el estado del ejecutor y la prioridad.<br>_Se muestra como tarea_ |
| **airflow.scheduler.tasks.killed_externally** <br>(count) | Número de tareas eliminadas externamente<br>_Se muestra como tarea_ |
| **airflow.scheduler.tasks.running** <br>(count) | Número de tareas en ejecución en el ejecutor<br>_Se muestra como tarea_. |
| **airflow.scheduler.tasks.starving** <br>(count) | Número de tareas que no se pueden programar porque no hay espacio libre en el grupo<br>_Se muestra como tarea_ |
| **airflow.scheduler.tasks.without_dagrun** <br>(count) | Número de tareas sin DagRuns o con DagRuns que no están en estado de ejecución<br>_Se muestra como tarea_ |
| **airflow.scheduler_heartbeat** <br>(count) | Latidos del programador|
| **airflow.sla_email_notification_failure** <br>(count) | Número de intentos fallidos de notificación por correo electrónico de SLA fallidos<br>_Se muestra como tarea_ |
| **airflow.smart_sensor_operator.exception_failures** <br>(count) | Número de fallos causados por excepción en el bucle anterior de sondeo del sensor inteligente<br>_Se muestra como error_ |
| **airflow.smart_sensor_operator.infra_failures** <br>(count) | Número de fallos de infraestructura en el bucle anterior de sondeo del sensor inteligente<br>_Se muestra como error_ |
| **airflow.smart_sensor_operator.poked_exception** <br>(count) | Número de excepciones en el bucle anterior de sondeo del sensor inteligente<br>_Se muestra como error_ |
| **airflow.smart_sensor_operator.poked_success** <br>(count) | Número de nuevas tareas ejecutadas con éxito por el sensor inteligente en el bucle de sondeo anterior<br>_Se muestra como tarea_. |
| **airflow.smart_sensor_operator.poked_tasks** <br>(count) | Número de tareas sondeadas por el sensor inteligente en el bucle de sondeo anterior<br>_Se muestra como tarea_ |
| **airflow.task.instance_created** <br>(gauge) | Instancias de tareas creadas<br>_Se muestra como segundos_ |
| **airflow.task_instance_created** <br>(count) | Número de instancias de tareas creadas para un operador concreto<br>_Se muestra como tarea_ |
| **airflow.task_removed_from_dag** <br>(count) | Número de tareas eliminadas para un DAG determinado (es decir, la tarea ya no existe en el DAG)<br>_Se muestra como tarea_ |
| **airflow.task_restored_to_dag** <br>(count) | Número de tareas restauradas para un DAG determinado (es decir, la instancia de tarea que antes estaba en estado ELIMINADO en la base de datos se añade al archivo DAG)<br>_Se muestra como tarea_ |
| **airflow.ti.finish** <br>(count) | Número de tareas completadas en un día determinado.<br>_Se muestra como tarea_ |
| **airflow.ti.start** <br>(count) | Número de tareas iniciadas en un día determinado.<br>_Se muestra como tarea_ |
| **airflow.ti_failures** <br>(count) | Fallos globales de las instancias de la tarea<br>_Se muestra como tarea_ |
| **airflow.ti_successes** <br>(count) | Éxitos globales de las instancias de la tarea<br>_Se muestra como tarea_ |
| **airflow.zombies_killed** <br>(count) | Tareas zombi eliminadas<br>_Se muestra como tarea_ |

**Nota**: Las métricas `airflow.healthy`, `airflow.can_connect`, `airflow.dag.task.total_running` y `airflow.dag.task.ongoing_duration` se recopilan de la porción de la integración del Agent. Todas las demás métricas proceden de StatsD.

### Eventos

El check de Airflow no incluye ningún evento.

### Checks de servicio

**airflow.can_connect**

Devuelve `CRITICAL` si no se puede conectar a Airflow. De lo contrario, devuelve `OK`.

_Estados: ok, crítico_

**airflow.healthy**

Devuelve `CRITICAL` si el estado de Airflow no es saludable. De lo contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

### Errores HTTP 403 para la integración del Agent

Es posible que necesites configurar parámetros para que el Datadog Agent pueda realizar solicitudes autenticadas a la API de Airflow. Utiliza una de las [opciones de configuración](https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example#L84-L118).

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).