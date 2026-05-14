---
aliases:
- /es/integrations/google_cloud_composer
app_id: google-cloud-composer
categories:
- nube
- configuración y despliegue
- google cloud
- recopilación de logs
custom_kind: integración
description: Un servicio para la programación y monitorización de pipelines a través
  de nubes y centros de datos on-premises.
media: []
title: Google Cloud Composer
---
## Información general

Google Cloud Composer es un servicio de orquestación de flujos de trabajo totalmente gestionado que te permite crear, programar y monitorizar pipelines a través de centros de datos on-premise y en la nube.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Composer.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Composer se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema de Pub/Sub en la nube. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Composer de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Composer.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.composer.environment.active_schedulers** <br>(gauge) | Número de instancias activas del programador.|
| **gcp.composer.environment.active_triggerers** <br>(gauge) | Número de instancias activas de activadores.|
| **gcp.composer.environment.active_webservers** <br>(gauge) | Número de instancias de servidor web activas.|
| **gcp.composer.environment.api.request_count** <br>(count) | Número de solicitudes de la API de Composer vistas hasta el momento.<br>_Se muestra como solicitud_ |
| **gcp.composer.environment.api.request_latencies.avg** <br>(gauge) | Distribución de las latencias de las llamadas a la API de Composer.<br>_Se muestra en milisegundos_ |
| **gcp.composer.environment.api.request_latencies.samplecount** <br>(count) | Recuento de muestras de latencias de solicitud de API.<br>_Se muestra como milisegundo_ |
| **gcp.composer.environment.api.request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de solicitud de API.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.celery.execute_command_failure_count** <br>(count) | Número acumulado de códigos de salida distintos de cero de la tarea de Celery (corresponde a la métrica `celery.execute_command.failure` de Airflow).|
| **gcp.composer.environment.celery.task_timeout_error_count** <br>(count) | Número acumulado de errores AirflowTaskTimeout generados al publicar la tarea en Celery Broker (corresponde a la métrica `celery.task_timeout_error` de Airflow).|
| **gcp.composer.environment.collect_db_dag_duration** <br>(gauge) | Tiempo necesario para recuperar todos los DAGs serializados de la base de datos (corresponde a la métrica `collect_db_dags` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.environment.dag_callback.exception_count** <br>(count) | Número acumulado de excepciones provocadas por las devoluciones de llamada DAG (corresponde a la métrica `dag.callback_exceptions` de Airflow).|
| **gcp.composer.environment.dag_file.refresh_error_count** <br>(count) | Número acumulado de fallos al cargar cualquier archivo DAG (corresponde a la métrica `dag_file_refresh_error` de Airflow).|
| **gcp.composer.environment.dag_processing.last_duration** <br>(gauge) | Tiempo que se tarda en cargar el archivo DAG dado (corresponde a la métrica `dag_processing.last_duration.<dag_file>` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.environment.dag_processing.last_run_elapsed_time** <br>(gauge) | Tiempo transcurrido desde que se procesó por última vez el archivo DAG (corresponde a la métrica `dag_processing.last_run.seconds_ago.<dag_file>` de Airflow).<br>_Se muestra en segundos_ |
| **gcp.composer.environment.dag_processing.manager_stall_count** <br>(count) | Número acumulado de paradas de DagFileProcessorManager (corresponde a la métrica `dag_processing.manager_stalls` de Airflow).|
| **gcp.composer.environment.dag_processing.parse_error_count** <br>(count) | Número de errores producidos durante el análisis de archivos DAG.<br>_Se muestra como error_ |
| **gcp.composer.environment.dag_processing.processes** <br>(gauge) | Número de procesos de análisis DAG actualmente en ejecución.<br>_Se muestra como proceso_ |
| **gcp.composer.environment.dag_processing.processor_timeout_count** <br>(count) | Número de procesadores de archivos finalizados por tiempo de espera de procesamiento.|
| **gcp.composer.environment.dag_processing.total_parse_time** <br>(gauge) | Número de segundos que se tarda en escanear e importar todos los archivos DAG una vez.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.dagbag_size** <br>(gauge) | El tamaño actual del conjunto de DAG.|
| **gcp.composer.environment.database.airflow.size** <br>(gauge) | Tamaño de la base de metadatos de Airflow.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.auto_failover_request_count** <br>(count) | Número acumulado de solicitudes de conmutación por error automática de instancia.|
| **gcp.composer.environment.database.available_for_failover** <br>(gauge) | True (Verdadero) (valor > 0) si la instancia de Cloud SQL está habilitada con HA y está lista para la conmutación por error.|
| **gcp.composer.environment.database.cpu.reserved_cores** <br>(gauge) | Número de núcleos reservados para la instancia de base de datos.<br>_Se muestra como núcleo_ |
| **gcp.composer.environment.database.cpu.usage_time** <br>(count) | Tiempo de uso de la CPU de la instancia de base de datos, en segundos.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.database.cpu.utilization** <br>(gauge) | Ratio de utilización de la CPU (de 0,0 a 1,0) de la instancia de base de datos.|
| **gcp.composer.environment.database.disk.bytes_used** <br>(gauge) | Espacio de disco utilizado en la instancia de base de datos, en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.disk.quota** <br>(gauge) | Tamaño máximo del disco de datos de la instancia de base de datos, en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.disk.utilization** <br>(gauge) | Proporción de uso de la cuota de disco (de 0,0 a 1,0) de la instancia de base de datos.|
| **gcp.composer.environment.database.memory.bytes_used** <br>(gauge) | Uso de memoria de la instancia de base de datos en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.memory.quota** <br>(gauge) | Tamaño máximo de RAM de la instancia de base de datos, en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.memory.utilization** <br>(gauge) | Ratio de utilización de memoria (de 0,0 a 1,0) de la instancia de base de datos.|
| **gcp.composer.environment.database.network.connections** <br>(gauge) | Número de conexiones concurrentes a la instancia de base de datos.|
| **gcp.composer.environment.database.network.max_connections** <br>(gauge) | Número máximo permitido de conexiones concurrentes a la instancia de base de datos.|
| **gcp.composer.environment.database.network.received_bytes_count** <br>(count) | Número de bytes recibidos por la instancia de base de datos.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database.network.sent_bytes_count** <br>(count) | Número de bytes enviados por la instancia de base de datos.<br>_Se muestra como byte_ |
| **gcp.composer.environment.database_health** <br>(gauge) | Estado de la base de datos de Composer Airflow.|
| **gcp.composer.environment.database_retention.execution_durations.avg** <br>(gauge) | La distribución media de las duraciones acumuladas de las ejecuciones de trabajos de retención de la base de datos.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.database_retention.execution_durations.samplecount** <br>(gauge) | El recuento de muestras para la distribución de duraciones acumuladas de ejecuciones de trabajo de retención de bases de datos.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.database_retention.execution_durations.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la distribución de las duraciones acumuladas de las ejecuciones de trabajos de retención de la base de datos.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.database_retention.finished_execution_count** <br>(count) | Número acumulado de ejecuciones de retención de base de datos.|
| **gcp.composer.environment.database_retention.retention_gap** <br>(gauge) | Cuántos datos antiguos quedan por recortar.<br>_Se muestra como hora_ |
| **gcp.composer.environment.email.sla_notification_failure_count** <br>(count) | Número de intentos fallidos de notificación por correo electrónico de SLA fallidos.|
| **gcp.composer.environment.executor.open_slots** <br>(gauge) | Número de ranuras abiertas en el ejecutor.|
| **gcp.composer.environment.executor.queued_tasks** <br>(gauge) | Número de tareas en cola en el ejecutor.<br>_Se muestra como tarea_ |
| **gcp.composer.environment.executor.running_tasks** <br>(gauge) | Número de tareas en ejecución en el ejecutor.<br>_Se muestra como tarea_ |
| **gcp.composer.environment.finished_task_instance_count** <br>(count) | Número total de instancias de tareas finalizadas.<br>_Se muestra como instancia_ |
| **gcp.composer.environment.health.airflow_api_check_count** <br>(count) | Número acumulado de checks de la API de Airflow.|
| **gcp.composer.environment.health.autoscaling_check_count** <br>(count) | Número acumulado de checks de componentes de autoescalado.|
| **gcp.composer.environment.health.cmek_encryption_check_count** <br>(count) | Número acumulado de checks de cifrado CMEK.|
| **gcp.composer.environment.health.container_restart_count** <br>(count) | Número acumulado de reinicios del contenedor.|
| **gcp.composer.environment.health.dependency_check_count** <br>(count) | Número acumulado de checks de dependencia.|
| **gcp.composer.environment.health.dependency_permissions_check_count** <br>(count) | Número acumulado de checks de permisos de dependencia.|
| **gcp.composer.environment.health.pod_event_count** <br>(count) | Número acumulado de eventos de pod.|
| **gcp.composer.environment.health.redis_queue_check_count** <br>(count) | Número acumulado de checks de la cola de redis.|
| **gcp.composer.environment.healthy** <br>(gauge) | Estado del entorno de Composer.|
| **gcp.composer.environment.job.count** <br>(count) | Número acumulado de trabajos iniciados, por ejemplo, SchedulerJob, LocalTaskJob (corresponde a las métricas `<job_name>_start`, `<job_name>_end` de Airflow).|
| **gcp.composer.environment.job.heartbeat_failure_count** <br>(count) | Número acumulado de latidos fallidos para un trabajo (corresponde a la métrica `<job_name>_heartbeat_failure` de Airflow).|
| **gcp.composer.environment.maintenance_operation** <br>(gauge) | Información sobre si existe una operación de mantenimiento de un tipo determinado.|
| **gcp.composer.environment.num_celery_workers** <br>(gauge) | Número de workers de Celery.<br>_Se muestra como worker_ |
| **gcp.composer.environment.operator.created_task_instance_count** <br>(count) | Número acumulado de instancias de tareas creadas por operador (corresponde a la métrica `task_instance_created-<operator_name>` de Airflow).|
| **gcp.composer.environment.operator.finished_task_instance_count** <br>(count) | Número acumulado de instancias de tareas terminadas por operador (corresponde a `operator_successes_<operator_name>`, `operator_failures_<operator_name>` de Airflow).|
| **gcp.composer.environment.pool.open_slots** <br>(gauge) | Número de ranuras abiertas en el grupo.|
| **gcp.composer.environment.pool.queued_slots** <br>(gauge) | Número de ranuras en cola en el grupo (corresponde a la métrica `pool.queued_slots.<pool_name>` de Airflow).|
| **gcp.composer.environment.pool.running_slots** <br>(gauge) | Número de ranuras en funcionamiento en el grupo.|
| **gcp.composer.environment.pool.starving_tasks** <br>(gauge) | Número de tareas con faltante en la reserva.|
| **gcp.composer.environment.scheduler.critical_section_duration** <br>(gauge) | Tiempo transcurrido en la sección crítica del bucle del programador. Solo un programador puede entrar en este bucle a la vez (corresponde a la métrica `scheduler.critical_section_duration` de Airflow).<br>_Se muestra como milisegundo_ |
| **gcp.composer.environment.scheduler.critical_section_lock_failure_count** <br>(count) | Número acumulado de veces que un proceso de programador intentó obtener un bloqueo en la sección crítica -para enviar tareas al ejecutor- y lo encontró bloqueado por otro proceso (corresponde a la métrica `scheduler.critical_section_busy` de Airflow).|
| **gcp.composer.environment.scheduler.pod_eviction_count** <br>(count) | Número de desalojos de pod del programador de Airflow.|
| **gcp.composer.environment.scheduler.task.externally_killed_count** <br>(count) | Número acumulado de tareas eliminadas externamente (corresponde a la métrica `scheduler.tasks.killed_externally` de Airflow).|
| **gcp.composer.environment.scheduler.task.orphan_count** <br>(count) | Número acumulado de tareas huérfanas despejadas/adoptadas (corresponde a `scheduler.orphaned_tasks.cleared`, `scheduler.orphaned_tasks.adopted` de Airflow).|
| **gcp.composer.environment.scheduler.tasks** <br>(gauge) | Número de tareas gestionadas por el programador (corresponde a las métricas `scheduler.tasks.running`, `scheduler.tasks.starving`, `scheduler.tasks.executable` de Airflow).|
| **gcp.composer.environment.scheduler_heartbeat_count** <br>(count) | Latidos del programador.|
| **gcp.composer.environment.sla_callback_notification_failure_count** <br>(count) | Número acumulado de intentos fallidos de notificación de devoluciones de llamada a SLA fallido (corresponde a la métrica `sla_callback_notification_failure` de Airflow).|
| **gcp.composer.environment.smart_sensor.exception_failures** <br>(gauge) | Número de fallos causados por excepción en el bucle anterior de sondeo del sensor inteligente.|
| **gcp.composer.environment.smart_sensor.infra_failures** <br>(gauge) | Número de fallos de infraestructura en el bucle anterior de sondeo del sensor inteligente.|
| **gcp.composer.environment.smart_sensor.poked_exception** <br>(gauge) | Número de excepciones en el bucle anterior de sondeo del sensor inteligente.|
| **gcp.composer.environment.smart_sensor.poked_success** <br>(gauge) | Número de nuevas tareas realizadas con éxito por el bucle anterior de sondeo del sensor inteligente.|
| **gcp.composer.environment.smart_sensor.poked_tasks** <br>(gauge) | Número de tareas sondeadas por el sensor inteligente en el bucle de sondeo anterior.|
| **gcp.composer.environment.snapshot.creation_count** <br>(count) | Número de snapshots programadas creadas.|
| **gcp.composer.environment.snapshot.creation_elapsed_time** <br>(gauge) | Tiempo transcurrido de la última creación de snapshot programada.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.snapshot.size** <br>(gauge) | Tamaño de la última snapshot programada en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.task_instance.previously_succeeded_count** <br>(count) | Número acumulado de veces que una instancia de tarea ya estaba en estado SUCCESS antes de la ejecución (corresponde a la métrica `previously_succeeded` de Airflow).|
| **gcp.composer.environment.task_queue_length** <br>(gauge) | Número de tareas en cola.<br>_Se muestra como tarea_ |
| **gcp.composer.environment.trigger.blocking_count** <br>(count) | Número total de activadores que bloquearon el subproceso principal de un activador.|
| **gcp.composer.environment.trigger.failed_count** <br>(count) | Número total de activadores que fallaron.|
| **gcp.composer.environment.trigger.succeeded_count** <br>(count) | Número total de activadores que han tenido éxito.|
| **gcp.composer.environment.unfinished_task_instances** <br>(gauge) | Instancias de tareas globales en estado no finalizado.<br>_Se muestra como instancia_ |
| **gcp.composer.environment.web_server.cpu.reserved_cores** <br>(gauge) | Número de núcleos reservados para la instancia del servidor web.<br>_Se muestra como núcleo_ |
| **gcp.composer.environment.web_server.cpu.usage_time** <br>(count) | Tiempo de uso de la CPU de la instancia del servidor web, en segundos.<br>_Se muestra como segundo_ |
| **gcp.composer.environment.web_server.health** <br>(gauge) | Estado del servidor web de Airflow.|
| **gcp.composer.environment.web_server.memory.bytes_used** <br>(gauge) | Uso de memoria de la instancia del servidor web en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.web_server.memory.quota** <br>(gauge) | Tamaño máximo de RAM de la instancia del servidor web, en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.environment.worker.max_workers** <br>(gauge) | Número máximo de workers de Airflow.<br>_Se muestra como worker_ |
| **gcp.composer.environment.worker.min_workers** <br>(gauge) | Número mínimo de workers de Airflow.<br>_Se muestra como worker_ |
| **gcp.composer.environment.worker.pod_eviction_count** <br>(count) | Número de desalojos de workers de Airflow.<br>_Se muestra como desalojo_ |
| **gcp.composer.environment.worker.scale_factor_target** <br>(gauge) | Factor de escala para el recuento de workers de Airflow.|
| **gcp.composer.environment.zombie_task_killed_count** <br>(count) | Número de tareas zombis eliminadas.<br>_Se muestra como tarea_ |
| **gcp.composer.workflow.dag.run_duration** <br>(gauge) | Tiempo que tarda una ejecución DAG en alcanzar el estado de terminal (corresponde a las métricas `dagrun.duration.success.<dag_id>`, `dagrun.duration.failed.<dag_id>` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.workflow.dependency_check_duration** <br>(gauge) | Tiempo empleado en comprobar las dependencias DAG (corresponde a la métrica `dagrun.dependency-check.<dag_id>` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.workflow.run_count** <br>(count) | Número de ejecuciones de proceso completados hasta el momento.|
| **gcp.composer.workflow.run_duration** <br>(gauge) | Duración de la finalización de la ejecución del proceso.<br>_Se muestra como segundo_ |
| **gcp.composer.workflow.schedule_delay** <br>(gauge) | Retraso entre la fecha programada de inicio de DagRun y la fecha real de inicio de DagRun (corresponde a la métrica `dagrun.schedule_delay.<dag_id>` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.workflow.task.log_file_size** <br>(gauge) | Tamaño del archivo de log generado por la tarea del proceso en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.workflow.task.removed_from_dag_count** <br>(count) | Número acumulado de tareas eliminadas para un DAG dado, es decir, la tarea ya no existe en el DAG (corresponde a la métrica `task_removed_from_dag.<dag_id>` de Airflow).|
| **gcp.composer.workflow.task.restored_to_dag_count** <br>(count) | Número acumulado de tareas restauradas para un DAG dado, es decir, la instancia de tarea que anteriormente estaba en estado REMOVED en la base de datos se añade al archivo DAG (corresponde a la métrica `task_restored_to_dag.<dag_id>` de Airflow).|
| **gcp.composer.workflow.task.run_count** <br>(count) | Número de tareas de proceso completadas hasta el momento.<br>_Se muestra como tarea_ |
| **gcp.composer.workflow.task.run_duration** <br>(gauge) | Duración de la finalización de la tarea.<br>_Se muestra como segundo_ |
| **gcp.composer.workflow.task.schedule_delay** <br>(gauge) | Tiempo transcurrido entre la fecha de inicio de la primera tarea y el inicio previsto de DagRun (corresponde a la métrica `dagrun.<dag_id>.first_task_scheduling_delay` de Airflow).<br>_Se muestra como milisegundo_ |
| **gcp.composer.workflow.task_instance.finished_count** <br>(count) | Número acumulado de instancias de tareas finalizadas (corresponde a la métrica `ti.finish.<dag_id>.<task_id>.<state>` de Airflow).|
| **gcp.composer.workflow.task_instance.queued_duration** <br>(gauge) | Tiempo transcurrido en estado de cola (corresponde a la métrica `dag.<dag_id>.<task_id>.queued_duration` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.workflow.task_instance.run_duration** <br>(gauge) | Tiempo empleado en finalizar una tarea (corresponde a la métrica `dag.<dag_id>.<task_id>.duration` de Airflow).<br>_Se muestra en milisegundos_ |
| **gcp.composer.workflow.task_instance.started_count** <br>(count) | Número acumulado de tareas iniciadas en un DAG determinado (corresponde a la métrica `ti.start.<dag_id>.<task_id>` de Airflow).|
| **gcp.composer.workflow.task_runner.terminated_count** <br>(count) | Número de tareas de proceso en las que el ejecutor de tareas finalizó con un código de retorno.|
| **gcp.composer.workload.cpu.reserved_cores** <br>(gauge) | Número de núcleos reservados para la instancia de carga de trabajo.|
| **gcp.composer.workload.cpu.usage_time** <br>(count) | Tiempo de uso de la CPU de la instancia de carga de trabajo.<br>_Se muestra como segundo_ |
| **gcp.composer.workload.disk.bytes_used** <br>(gauge) | Espacio de disco utilizado en bytes en la instancia de carga de trabajo.<br>_Se muestra como byte_ |
| **gcp.composer.workload.disk.quota** <br>(gauge) | Tamaño máximo del disco de datos en bytes de la instancia de carga de trabajo.<br>_Se muestra como byte_ |
| **gcp.composer.workload.log_entry_count** <br>(count) | Número acumulado de incidencias de log con un nivel de gravedad especificado.|
| **gcp.composer.workload.memory.bytes_used** <br>(gauge) | Uso de memoria de la instancia de carga de trabajo en bytes.<br>_Se muestra como byte_ |
| **gcp.composer.workload.memory.quota** <br>(gauge) | Tamaño máximo de RAM en bytes de la instancia de carga de trabajo.<br>_Se muestra como byte_ |
| **gcp.composer.workload.restart_count** <br>(count) | Número acumulado de reinicios de la carga de trabajo.|
| **gcp.composer.workload.trigger.num_running** <br>(gauge) | Número de activadores en ejecución en un activador.|
| **gcp.composer.workload.uptime** <br>(gauge) | Tiempo transcurrido desde que se creó la carga de trabajo.<br>_Se muestra como segundo_ |

### Eventos

La integración Google Cloud Composer no incluye eventos.

### Checks de servicio

La integración Google Cloud Composer no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).