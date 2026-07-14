---
aliases:
- /es/integrations/datadog_operator
app_id: datadog-operator
categories:
- kubernetes
custom_kind: integración
description: Monitorizar el Datadog Operator
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Datadog Operator
---
## Información general

Este check monitoriza el [Datadog Operator](https://docs.datadoghq.com/containers/datadog_operator/) a través del Datadog Agent.

## Configuración

### Instalación

Consulta la documentación del [Datadog Operator](https://docs.datadoghq.com/containers/datadog_operator/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **datadog.operator.admission_controller.feature.enabled** <br>(gauge) | `1` si la función Controlador de admisión está activada.|
| **datadog.operator.agent.deployment.success** <br>(gauge) | `1` si el número deseado de réplicas del Agent es igual al número de pods del Agent disponibles, o`0` en caso contrario.|
| **datadog.operator.cluster_checks.feature.enabled** <br>(gauge) | `1` si la función Checks de clústeres está activada|
| **datadog.operator.clusteragent.deployment.success** <br>(gauge) | `1` si el número deseado de réplicas del Cluster Agent es igual al número de pods del Cluster Agent disponibles, o `0` en caso contrario.|
| **datadog.operator.clusterchecksrunner.deployment.success** <br>(gauge) | `1` si el número deseado de réplicas del Cluster Check Runner es igual al número de pods del Cluster Check Runner disponibles, o `0` en caso contrario.|
| **datadog.operator.controller_runtime_active_workers** <br>(gauge) | Número de workers utilizados actualmente por cada controlador<br>_Se muestra como worker_ |
| **datadog.operator.controller_runtime_max_concurrent_reconciles** <br>(gauge) | Número máximo de reconciliaciones simultáneas por controlador<br>_Se muestra como operación_ |
| **datadog.operator.controller_runtime_reconcile_errors_total** <br>(count) | Número total de errores de reconciliación por controlador<br>_Se muestra como error_ |
| **datadog.operator.controller_runtime_reconcile_time_seconds.count** <br>(count) | Recuento de tiempo por cada reconciliación por controlador<br>_Se muestra en segundos_ |
| **datadog.operator.controller_runtime_reconcile_time_seconds.sum** <br>(count) | Suma de tiempo por reconciliación por controlador<br>_Se muestra en segundos_ |
| **datadog.operator.controller_runtime_reconcile_total** <br>(count) | Número total de conciliaciones por controlador<br>_Se muestra como operación_ |
| **datadog.operator.default.feature.enabled** <br>(gauge) | |
| **datadog.operator.dogstatsd.feature.enabled** <br>(gauge) | `1` si la función DogStatsD está activada|
| **datadog.operator.eds_controller_leader** <br>(gauge) | |
| **datadog.operator.event_collection.feature.enabled** <br>(gauge) | `1` si la función Recopilación de eventos está activada|
| **datadog.operator.go_gc_duration_seconds.count** <br>(count) | Recuento de las duraciones de invocación de recolectores de basura<br>_Se muestra en segundos_ |
| **datadog.operator.go_gc_duration_seconds.quantile** <br>(gauge) | Cuantiles de las duraciones de invocación de recolectores de basura<br>_Se muestra en segundos_ |
| **datadog.operator.go_gc_duration_seconds.sum** <br>(count) | Suma de las duraciones de invocación de recolectores de basura<br>_Se muestra en segundos_ |
| **datadog.operator.go_goroutines** <br>(gauge) | Número de goroutines que existen actualmente<br>_Se muestra como subproceso_ |
| **datadog.operator.go_info** <br>(gauge) | Versión Go|
| **datadog.operator.go_memstats_alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_alloc_bytes_total** <br>(count) | Número total de bytes asignados aunque sean liberados<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_buck_hash_sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_frees_total** <br>(count) | Número total de libres|
| **datadog.operator.go_memstats_gc_cpu_fraction** <br>(gauge) | Fracción del tiempo de CPU disponible de este programa utilizado por el recolector de basura desde que se inició el programa<br>_Se muestra como fracción_ |
| **datadog.operator.go_memstats_gc_sys_bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recolección de basura<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_heap_alloc_bytes** <br>(gauge) | Número de bytes heap asignados y aún en uso<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_heap_idle_bytes** <br>(gauge) | Número de bytes heap en espera de ser utilizados<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_heap_inuse_bytes** <br>(gauge) | Número de bytes heap en uso<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_heap_objects** <br>(gauge) | Número de objetos asignados<br>_Se muestra como objeto_ |
| **datadog.operator.go_memstats_heap_released_bytes** <br>(gauge) | Número de bytes heap liberados al SO<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_heap_sys_bytes** <br>(gauge) | Número de bytes heap obtenidos del sistema<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_last_gc_time_seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recolección de basura|
| **datadog.operator.go_memstats_lookups_total** <br>(count) | Número total de búsquedas de punteros|
| **datadog.operator.go_memstats_mallocs_total** <br>(count) | Número total de mallocs|
| **datadog.operator.go_memstats_mcache_inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mcache<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_mcache_sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mcache obtenidas del sistema<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_mspan_inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mspan<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_mspan_sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mspan obtenidas del sistema|
| **datadog.operator.go_memstats_next_gc_bytes** <br>(gauge) | Número de bytes heap en que se realizará la próxima recolección de basura<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_other_sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_stack_inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stacks tecnológicos<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_stack_sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stacks tecnológicos<br>_Se muestra en bytes_ |
| **datadog.operator.go_memstats_sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema<br>_Se muestra en bytes_ |
| **datadog.operator.go_threads** <br>(gauge) | Número de subprocesos de SO creados<br>_Se muestra como subproceso_ |
| **datadog.operator.ksm.feature.enabled** <br>(gauge) | `1` si la función Kubernetes State Metrics Core está activada|
| **datadog.operator.live_container.feature.enabled** <br>(gauge) | `1` si la función Live Containers está activada|
| **datadog.operator.log_collection.feature.enabled** <br>(gauge) | `1` si la función Log Collection está activada|
| **datadog.operator.orchestrator_explorer.feature.enabled** <br>(gauge) | `1` si la función Kubernetes Orchestrator Explorer está activada|
| **datadog.operator.process_cpu_seconds_total** <br>(count) | Tiempo total de CPU del usuario y del sistema transcurrido en segundos<br>_Se muestra en segundos_ |
| **datadog.operator.process_max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **datadog.operator.process_open_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **datadog.operator.process_resident_memory_bytes** <br>(gauge) | Tamaño de la memoria residente en bytes<br>_Se muestra en bytes_ |
| **datadog.operator.process_start_time_seconds** <br>(gauge) | Tiempo de inicio del proceso desde unix epoch en segundos|
| **datadog.operator.process_virtual_memory_bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes<br>_Se muestra en bytes_ |
| **datadog.operator.process_virtual_memory_max_bytes** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes<br>_Se muestra en bytes_ |
| **datadog.operator.reconcile.success** <br>(gauge) | `1` si el último error de conciliación registrado es nulo, o `0` en caso contrario. La etiqueta `reconcile_err` describe el último error registrado.|
| **datadog.operator.remote_config.feature.enabled** <br>(gauge) | `1` si la función Configuración remota está activada|
| **datadog.operator.rest_client_requests_total** <br>(count) | Número de solicitudes HTTP, divididas por código de estado, método y host<br>_Se muestra como solicitud_ |
| **datadog.operator.workqueue_adds_total** <br>(count) | Número total de adiciones gestionadas por la cola de trabajo|
| **datadog.operator.workqueue_depth** <br>(gauge) | Profundidad actual de la cola de trabajo|
| **datadog.operator.workqueue_longest_running_processor_seconds** <br>(gauge) | Cantidad de segundos que se ha estado ejecutando el procesador que más tiempo lleva en cola de trabajo.<br>_Se muestra como segundos_ |
| **datadog.operator.workqueue_queue_duration_seconds.count** <br>(count) | Cantidad de tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado<br>_Se muestra en segundos_ |
| **datadog.operator.workqueue_queue_duration_seconds.sum** <br>(count) | Suma del tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado<br>_Se muestra en segundos_ |
| **datadog.operator.workqueue_retries_total** <br>(count) | Número total de reintentos gestionados por la cola de trabajo|
| **datadog.operator.workqueue_unfinished_work_seconds** <br>(gauge) | Cantidad de segundos de trabajo se han realizado, están en curso y no han sido observados por work_duration. Los valores grandes indican subprocesos bloqueados. Se puede deducir el número de subprocesos bloqueados observando la velocidad a la que aumenta.<br>_Se muestra en segundos_ |
| **datadog.operator.workqueue_work_duration_seconds.count** <br>(count) | Recuento del tiempo en segundos que se tarda en procesar un elemento de la cola de trabajo<br>_Se muestra en segundos_ |
| **datadog.operator.workqueue_work_duration_seconds.sum** <br>(count) | Suma del tiempo en segundos que se tarda en procesar un elemento de la cola de trabajo<br>_Se muestra en segundos_ |

### Eventos

La integración del Datadog Operator no incluye eventos.

### Checks de servicio

Consulta [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/datadog_operator/assets/service_checks.json) para obtener una lista de los checks de servicio proporcionados por esta integración.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).