---
aliases:
- /es/integrations/azure_data_factory
app_id: azure-datafactory
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure Data Factory.
media: []
title: Azure Data Factory
---
## Información general

Azure Data Factory es un servicio de integración de datos en la nube que permite componer los servicios de almacenamiento, movimiento y procesamiento de datos en pipelines de datos automatizados.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Factory.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.datafactory_factories.activity_cancelled_runs** <br>(count) | Métricas de ejecuciones de actividad canceladas.|
| **azure.datafactory_factories.activity_failed_runs** <br>(count) | Métricas de ejecuciones de actividad fallidas.|
| **azure.datafactory_factories.activity_succeeded_runs** <br>(count) | Métricas de ejecuciones de actividad exitosas.|
| **azure.datafactory_factories.airflow_integration_runtime_celery_task_timeout_error** <br>(count) | Error de tiempo de espera de tareas runtime celery de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_collect_db_dags** <br>(gauge) | Dags de base de datos de recopilación de runtime de la integración de Airflow.<br>_Se muestra en milisegundos_ |
| **azure.datafactory_factories.airflow_integration_runtime_cpu_percentage** <br>(gauge) | Porcentaje de cpu de runtime de la integración de Airflow.<br>_Se muestra como porcentaje_ |
| **azure.datafactory_factories.airflow_integration_runtime_cpu_usage** <br>(gauge) | Uso de memoria de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_bag_size** <br>(count) | Tamaño de la bolsa DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_callback_exceptions** <br>(count) | Excepciones de devolución de llamada de DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_file_refresh_error** <br>(count) | Error de actualización del archivo DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_import_errors** <br>(count) | Errores de importación del procesamiento DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_last_duration** <br>(gauge) | Última duración del procesamiento DAG de runtime de la integración de Airflow.<br>_Se muestra en milisegundos_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_last_run_seconds_ago** <br>(gauge) | Procesamiento DAG de runtime de integración de Airflow ejecutado por última vez hace segundos.<br>_Se muestra como segundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_manager_stalls** <br>(count) | Puestos del gestor de procesamiento DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_processes** <br>(count) | Procesos de procesamiento DAG de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_processor_timeouts** <br>(gauge) | Tiempos de espera del procesador de procesamiento DAG de runtime de la integración de Airflow.<br>_Se muestra como segundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_processing_total_parse_time** <br>(gauge) | Tiempo total de análisis del procesamiento DAG de runtime de la integración de Airflow.<br>_Se muestra como segundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_run_dependency_check** <br>(gauge) | Check de dependencia de la ejecución DAG de runtime de la integración de Airflow.<br>_Se muestra como milisegundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_run_duration_failed** <br>(gauge) | Duración de la ejecución DAG de runtime de la integración de Airflow fallida.<br>_Se muestra como milisegundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_run_duration_success** <br>(gauge) | Duración de la ejecución DAG de runtime de la integración de Airflow exitosa.<br>_Se muestra como milisegundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_run_first_task_scheduling_delay** <br>(gauge) | Retraso en la programación de la primera tarea de la ejecución DAG de runtime de la integración de Airflow.<br>_Se muestra como milisegundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_dag_run_schedule_delay** <br>(gauge) | Retraso en la programación de la ejecución DAG de runtime de la integración de Airflow.<br>_Se muestra como milisegundo_ |
| **azure.datafactory_factories.airflow_integration_runtime_executor_open_slots** <br>(count) | Ranuras abiertas del ejecutor de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_executor_queued_tasks** <br>(count) | Tareas en cola del ejecutor de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_executor_running_tasks** <br>(count) | Tareas en ejecución del ejecutor de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_job_end** <br>(count) | Trabajo de runtime de la integración de Airflow finalizado.|
| **azure.datafactory_factories.airflow_integration_runtime_job_heartbeat_failure** <br>(count) | Fallo del latido de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_job_start** <br>(count) | Inicio del trabajo de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_memory_percentage** <br>(gauge) | Porcentaje de memoriade runtime de la integración de Airflow.<br>_Se muestra como porcentaje_ |
| **azure.datafactory_factories.airflow_integration_runtime_operator_failures** <br>(count) | Fallos del operador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_operator_successes** <br>(count) | Éxitos del operador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_pool_open_slots** <br>(count) | Ranuras abiertas del grupo de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_pool_queued_slots** <br>(count) | Ranuras abiertas del grupo de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_pool_running_slots** <br>(count) | Ranuras en ejecución del grupo de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_pool_starving_tasks** <br>(count) | Tareas con faltante del grupo de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_critical_section_busy** <br>(count) | Sección crítica ocupada del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_critical_section_duration** <br>(gauge) | Duración de la sección crítica del programador de runtime de la integración de Airflow..<br>_Se muestra en milisegundos_ |
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_failed_sla_email_attempts** <br>(count) | Intentos fallidos de email SLA del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_heartbeat** <br>(count) | Latidos del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_orphaned_tasks_adopted** <br>(count) | Adopción de tareas huérfanas del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_orphaned_tasks_cleared** <br>(count) | Tareas huérfanas eliminadas del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_tasks_executable** <br>(count) | Ejecutable de las tareas del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_tasks_killed_externally** <br>(count) | Tareas del programador de runtime de la integración de Airflow eliminadas externamente.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_tasks_running** <br>(count) | Tareas del programador de runtime de la integración de Airflow en ejecución.|
| **azure.datafactory_factories.airflow_integration_runtime_scheduler_tasks_starving** <br>(count) | Tareas con faltante del programador de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_started_task_instances** <br>(count) | Instancias de tareas iniciadas de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_created_using_operator** <br>(count) | Instancia de tarea de runtime de la integración de Airflow creada mediante el operador.|
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_duration** <br>(gauge) | Duración de la instancia de la tarea de runtime de la integración de Airflow.<br>_Se muestra en milisegundos_ |
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_failures** <br>(count) | Fallos en la instancia de tarea de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_finished** <br>(count) | La instancia de la tarea de runtime de la integración de Airflow ha finalizado.|
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_previously_succeeded** <br>(count) | La instancia de la tarea de runtime de la integración de Airflow se ha ejecutado correctamente.|
| **azure.datafactory_factories.airflow_integration_runtime_task_instance_successes** <br>(count) | Éxitos de la instancia de tarea de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_task_removed_from_dag** <br>(count) | Tarea de runtime de la integración de Airflow eliminada del DAG.|
| **azure.datafactory_factories.airflow_integration_runtime_task_restored_to_dag** <br>(count) | Tarea de runtime de la integración de Airflow restaurada en DAG.|
| **azure.datafactory_factories.airflow_integration_runtime_triggers_blocked_main_thread** <br>(count) | Runtime de la integración de Airflow que activa el subproceso principal bloqueado.|
| **azure.datafactory_factories.airflow_integration_runtime_triggers_failed** <br>(count) | Fallo en los activadores de runtime de la integración de Airflow.|
| **azure.datafactory_factories.airflow_integration_runtime_triggers_running** <br>(count) | Activadores de runtime de la integración de Airflow en ejecución.|
| **azure.datafactory_factories.airflow_integration_runtime_triggers_succeeded** <br>(count) | Activadores de runtime de la integración de Airflow correctos.|
| **azure.datafactory_factories.airflow_integration_runtime_zombies_killed** <br>(count) | Tareas zombis de runtime de la integración de Airflow eliminadas.|
| **azure.datafactory_factories.factory_size_in_gb_units** <br>(gauge) | Tamaño total de la fábrica (unidad GB).|
| **azure.datafactory_factories.integration_runtime_available_memory** <br>(gauge) | Memoria disponible de runtime de la integración.<br>_Se muestra como byte_ |
| **azure.datafactory_factories.integration_runtime_available_node_number** <br>(gauge) | Recuento de nodos disponibles de runtime de la integración.|
| **azure.datafactory_factories.integration_runtime_average_task_pickup_delay** <br>(gauge) | Duración de la cola de runtime de la integración.<br>_Se muestra como segundo_ |
| **azure.datafactory_factories.integration_runtime_cpu_percentage** <br>(gauge) | Utilización de la CPU de runtime de la integración.<br>_Se muestra en porcentaje_ |
| **azure.datafactory_factories.integration_runtime_queue_length** <br>(gauge) | Longitud de la cola de runtime de la integración.|
| **azure.datafactory_factories.max_allowed_factory_size_in_gb_units** <br>(gauge) | Tamaño máximo de fábrica permitido (unidad GB).|
| **azure.datafactory_factories.max_allowed_resource_count** <br>(gauge) | Número máximo de entidades permitidas.|
| **azure.datafactory_factories.pipeline_cancelled_runs** <br>(count) | Métricas de ejecuciones de pipeline canceladas.|
| **azure.datafactory_factories.pipeline_elapsed_time_runs** <br>(count) | Métricas de ejecuciones de pipeline del tiempo transcurrido.|
| **azure.datafactory_factories.pipeline_failed_runs** <br>(count) | Métricas de ejecuciones de pipeline fallidas.|
| **azure.datafactory_factories.pipeline_succeeded_runs** <br>(count) | Métricas de ejecuciones de pipeline exitosas.|
| **azure.datafactory_factories.resource_count** <br>(gauge) | Recuento total de entidades.|
| **azure.datafactory_factories.ssis_integration_runtime_start_cancel** <br>(count) | Métricas de inicio de runtime de la integración SSIS canceladas.|
| **azure.datafactory_factories.ssis_integration_runtime_start_failed** <br>(count) | Métricas de inicio de runtime de la integración SSIS fallidas.|
| **azure.datafactory_factories.ssis_integration_runtime_start_succeeded** <br>(count) | Métricas de inicio de runtime de la integración SSIS correctas.|
| **azure.datafactory_factories.ssis_integration_runtime_stop_stuck** <br>(count) | Métricas de detención de runtime de la integración SSIS atascadas.|
| **azure.datafactory_factories.ssis_integration_runtime_stop_succeeded** <br>(count) | Métricas de detención de runtime de la integración SSIS exitosas.|
| **azure.datafactory_factories.ssis_package_execution_cancel** <br>(count) | Métricas de ejecución de paquetes SSIS canceladas.|
| **azure.datafactory_factories.ssis_package_execution_failed** <br>(count) | Métricas de ejecución del paquete SSIS fallidas.|
| **azure.datafactory_factories.ssis_package_execution_succeeded** <br>(count) | Métricas de ejecución del paquete SSIS correctas.|
| **azure.datafactory_factories.trigger_cancelled_runs** <br>(count) | Métricas de ejecuciones del activador canceladas.|
| **azure.datafactory_factories.trigger_failed_runs** <br>(count) | Métricas de ejecuciones del activador fallidas.|
| **azure.datafactory_factories.trigger_succeeded_runs** <br>(count) | Métricas de ejecuciones del activador realizadas con éxito.|
| **azure.datafactory_factories.count** <br>(gauge) | Recuento de fábricas DataFactory.|

### Eventos

La integración Azure Data Factory no incluye eventos.

### Checks de servicio

La integración Azure Data Factory no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).