---
aliases:
- /es/integrations/amazon_mwaa
app_id: amazon-mwaa
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Amazon Managed Workflows para Apache Airflow (MWAA) simplifica la creación
  y administración de procesos en la nube.
media: []
title: Amazon MWAA
---
## Información general

Amazon Managed Workflows para Apache Airflow (MWAA) es un servicio gestionado
para Apache Airflow que facilita la creación y administración de flujos de trabajo
en la nube.

Habilita esta integración para ver todas tus métricas de Amazon MWAA en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MWAA` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Managed Workflows para Apache Airflow (MWAA)](https://app.datadoghq.com/integrations/amazon-mwaa).

### Recopilación de logs

1. Configura Amazon MWAA para [enviar logs a CloudWatch](https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable).
1. [Enviar los logs a Datadog](https://app.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#log-collection).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mwaa.collect_dbdags** <br>(gauge) | Promedio de milisegundos necesarios para obtener todos los datos serializados de la base de datos. Disponible en Airflow v1 y v2.<br>_Se muestra en milisegundos_ |
| **aws.mwaa.collect_dbdags.maximum** <br>(gauge) | Máximo de milisegundos que se tarda en obtener todos los datos serializados de la base de datos. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.collect_dbdags.minimum** <br>(gauge) | Mínimo de milisegundos que se tarda en obtener todos los datos serializados de la base de datos. Disponible en Airflow v1 y v2.<br>_Se muestra en milisegundos_ |
| **aws.mwaa.critical_section_busy** <br>(count) | Recuento de veces que un proceso programador intentó obtener un bloqueo en la sección crítica (necesaria para enviar tareas al ejecutor) y lo encontró bloqueado por otro proceso. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.critical_section_duration** <br>(gauge) | Promedio de milisegundos transcurridos en la sección crítica del bucle del programador: solo un programador puede entrar en este bucle a la vez. Solo disponible en Airflow v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.critical_section_duration.maximum** <br>(gauge) | Milisegundos máximos pasados en la sección crítica del bucle del programador, solo un programador puede entrar en este bucle a la vez. Solo disponible en Airflow v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.critical_section_duration.minimum** <br>(gauge) | Mínimo de milisegundos pasados en la sección crítica del bucle del programador, solo un programador puede entrar en este bucle a la vez. Solo disponible en Airflow v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dag_bag_size** <br>(count) | Número de DAGs encontrados cuando el programador ejecutó un escaneo basado en su configuración. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.dag_callback_exceptions** <br>(count) | Número de excepciones generadas por las devoluciones de llamada DAG. Cuando esto ocurre, significa que la devolución de llamada DAG no está funcionando. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.dagdependency_check** <br>(gauge) | Promedio de milisegundos que se tarda en comprobar las dependencias DAG. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagdependency_check.maximum** <br>(gauge) | Máximo de milisegundos que se tarda en comprobar las dependencias DAG. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagdependency_check.minimum** <br>(gauge) | Mínimo de milisegundos que se tarda en comprobar las dependencias DAG. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagduration_failed** <br>(gauge) | Milisegundos que tarda un DagRun en alcanzar el estado de fallo. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagduration_success** <br>(gauge) | Milisegundos que tarda un DagRun en alcanzar el estado de éxito. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagfile_processing_last_duration** <br>(gauge) | Promedio de milisegundos que se tarda en cargar el archivo DAG dado. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagfile_processing_last_duration.maximum** <br>(gauge) | Máximo de milisegundos que se tarda en cargar el archivo DAG dado. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagfile_processing_last_duration.minimum** <br>(gauge) | Mínimo de milisegundos que se tarda en cargar el archivo DAG dado. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.dagfile_processing_last_run_seconds_ago** <br>(gauge) | Segundos transcurridos desde el último procesamiento de <dag_file>. Disponible en Airflow v1 y v2.<br>_Se muestra como segundo_ |
| **aws.mwaa.dagfile_refresh_error** <br>(count) | Número de fallos al cargar cualquier archivo DAG. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.dagschedule_delay** <br>(gauge) | Milisegundos de retraso entre la fecha programada de inicio de DagRun y la fecha real de inicio de DagRun. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.exception_failures** <br>(count) | Número de fallos causados por una excepción en el bucle de sondeo del sensor inteligente anterior. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.failed_slaemail_attempts** <br>(count) | Número de intentos fallidos de notificación por correo electrónico de SLA fallidos. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.first_task_scheduling_delay** <br>(gauge) | Milisegundos transcurridos entre la fecha de inicio de la primera tarea y el inicio previsto de dagrun. Solo disponible en Airflow v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.import_errors** <br>(count) | Número de errores al intentar analizar archivos DAG. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.infra_failures** <br>(count) | Número de fallos de la infraestructura en el bucle de sondeo del sensor inteligente anterior. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.job_end** <br>(count) | Número de trabajos <job_name> terminados, por ejemplo, SchedulerJob, LocalTaskJob. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.job_heartbeat_failure** <br>(count) | Número de Heartbeats fallidos para un trabajo <job_name>, por ejemplo, SchedulerJob, LocalTaskJob. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.job_start** <br>(count) | Número de trabajos <job_name> iniciados, por ejemplo, SchedulerJob, LocalTaskJob. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.manager_stalls** <br>(count) | Número de DagFileProcessorManager estancados. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.open_slots** <br>(count) | Número de ranuras abiertas en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.operator_failures** <br>(count) | Errores del operador \<operator_name>. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.operator_successes** <br>(count) | Éxitos del operador \<operator_name>. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.orphaned_tasks_adopted** <br>(count) | Número de tareas huérfanas adoptadas por el Programador. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.orphaned_tasks_cleared** <br>(count) | Número de tareas huérfanas borradas por el Programador. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.poked_exceptions** <br>(count) | Número de excepciones en el bucle de sondeo del sensor inteligente anterior. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.poked_success** <br>(count) | Número de nuevas tareas ejecutadas con éxito por el sensor inteligente en el bucle de ejecución anterior. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.poked_tasks** <br>(count) | Número de tareas pinchadas por el sensor inteligente en el bucle de pinchado anterior. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.pool_open_slots** <br>(count) | Número de ranuras abiertas en el grupo. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.pool_queued_slots** <br>(count) | Número de ranuras en cola en el grupo. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.pool_running_slots** <br>(count) | Número de ranuras en funcionamiento en el grupo. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.pool_starving_tasks** <br>(count) | Número de tareas hambrientas en el grupo. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_. |
| **aws.mwaa.pool_used_slots** <br>(count) | Número de ranuras utilizadas en el grupo. Solo disponible en Airflow v1.<br>_Se muestra como unidad_ |
| **aws.mwaa.processor_timeouts** <br>(count) | Número de procesadores de archivos que han muerto por tardar demasiado. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.queued_tasks** <br>(count) | Número total de tareas en cola en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.queued_tasks.average** <br>(gauge) | Número medio de tareas en cola en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.running_tasks** <br>(count) | Número total de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.running_tasks.average** <br>(gauge) | Número medio de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.scheduler_heartbeat** <br>(count) | Latidos del programador. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_created_using_operator** <br>(count) | Número de instancias de tareas creadas para un operador determinado. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_duration** <br>(gauge) | Milisegundos que se tarda en finalizar una tarea. Disponible en Airflow v1 y v2.<br>_Se muestra como milisegundo_ |
| **aws.mwaa.task_instance_failures** <br>(count) | Fallos globales de las instancias de tareas. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_finished** <br>(count) | Número de tareas completadas en un día determinado. Similar a \<job_name>\_end pero para la tarea. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_previously_succeeded** <br>(count) | Número de instancias de tareas realizadas con éxito anteriormente. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_started** <br>(count) | Número de tareas iniciadas en un día determinado. Similar a \<job_name>\_start pero para tarea. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_instance_successes** <br>(count) | Éxitos globales de las instancias de tareas. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_removed_from_dag** <br>(count) | Número de tareas eliminadas para un dag determinado (es decir, la tarea ya no existe en el DAG). Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_restored_to_dag** <br>(count) | Número de tareas restauradas para un dag determinado (es decir, la instancia de tarea que anteriormente se encontraba en estado REMOVED en la base de datos se añade al archivo DAG). Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.task_timeout_error** <br>(count) | Número de errores AirflowTaskTimeout generados al publicar una tarea en Celery Broker. Solo disponible en Airflow v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_executable** <br>(count) | Número total de tareas que están listas para su ejecución (en cola) con respecto a los límites del grupo, la concurrencia del DAG, el estado del ejecutor y la prioridad. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_. |
| **aws.mwaa.tasks_executable.average** <br>(gauge) | Número medio de tareas que están listas para su ejecución (en cola) con respecto a los límites del grupo, la concurrencia del DAG, el estado del ejecutor y la prioridad. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_killed_externally** <br>(count) | Número total de tareas eliminadas externamente. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_killed_externally.average** <br>(count) | Número medio de tareas eliminadas externamente. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_pending** <br>(count) | Suma el número de tareas pendientes. Disponible en Airflow v1.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_pending.average** <br>(gauge) | Número medio de tareas pendientes. Disponible tanto en Airflow v1.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_running** <br>(count) | Número total de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_running.average** <br>(gauge) | Número medio de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_starving** <br>(count) | Número total de tareas que no se pueden programar porque no hay ningún espacio libre en el grupo. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_starving.average** <br>(gauge) | Número medio de tareas que no se pueden programar porque no hay espacio libre en el grupo. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_without_dag_run** <br>(count) | Número de tareas sin DagRuns o con DagRuns que no están en estado de ejecución. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.total_parse_time** <br>(gauge) | Promedio de segundos necesarios para escanear e importar todos los archivos DAG una vez. Disponible en Airflow v1 y v2.<br>_Se muestra en segundos_ |
| **aws.mwaa.total_parse_time.maximum** <br>(gauge) | Máximo de segundos que se tarda en escanear e importar todos los archivos DAG de una vez. Disponible en Airflow v1 y v2.<br>_Se muestra como segundo_ |
| **aws.mwaa.total_parse_time.minimum** <br>(gauge) | Segundos mínimos necesarios para escanear e importar todos los archivos DAG una vez. Disponible en Airflow v1 y v2.<br>_Se muestra como segundo_ |
| **aws.mwaa.zombies_killed** <br>(count) | Tareas de zombis abatidos. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.queued_tasks.max** <br>(gauge) | Número máximo de tareas en cola en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.queued_tasks.min** <br>(gauge) | Número mínimo de tareas en cola en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.running_tasks.max** <br>(gauge) | Número máximo de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.running_tasks.min** <br>(gauge) | Número mínimo de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_executable.max** <br>(gauge) | Número máximo de tareas que están listas para su ejecución (en cola) con respecto a los límites del grupo, la concurrencia del DAG, el estado del ejecutor y la prioridad. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_executable.min** <br>(gauge) | Número mínimo de tareas que están listas para su ejecución (en cola) con respecto a los límites del grupo, la concurrencia del DAG, el estado del ejecutor y la prioridad. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_killed_externally.max** <br>(count) | Número máximo de tareas eliminadas externamente. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_killed_externally.min** <br>(count) | Número mínimo de tareas eliminadas externamente. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_pending.max** <br>(gauge) | Número máximo de tareas pendientes. Disponible tanto en Airflow v1.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_pending.min** <br>(gauge) | Número mínimo de tareas pendientes. Disponible tanto en Airflow v1.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_running.max** <br>(gauge) | Número máximo de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_running.min** <br>(gauge) | Número mínimo de tareas en ejecución en el ejecutor. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_starving.max** <br>(gauge) | Número máximo de tareas que no se pueden programar porque no hay ningún espacio libre en el grupo. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |
| **aws.mwaa.tasks_starving.min** <br>(gauge) | Número mínimo de tareas que no se pueden programar porque no hay espacio libre en el grupo. Disponible en Airflow v1 y v2.<br>_Se muestra como unidad_ |

### Eventos

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún evento.

### Checks de servicio

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).