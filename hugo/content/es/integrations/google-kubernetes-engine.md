---
aliases:
- /es/integrations/google_kubernetes_engine
- /es/integrations/gke
app_id: google-kubernetes-engine
categories:
- nube
- rastreo
- google cloud
- kubernetes
- recopilación de logs
- red
custom_kind: integración
description: Un potente gestor de clústeres y sistema de orquestación para ejecutar
  tus aplicaciones en contenedores.
media: []
title: Google Kubernetes Engine
---
## Información general

Google Kubernetes Engine (GKE) es un potente gestor de clústeres y un sistema de orquestación para la ejecución de tus contenedores Docker.

Obtén métricas de Google Kubernetes Engine para:

- Visualizar el rendimiento de tus contenedores GKE y del plano de control GKE.
- Correlacionar el rendimiento de tus contenedores GKE con tus aplicaciones.

Esta integración viene con dos dashboards preconfigurados separados:

- El dashboard estándar de GKE presenta métricas de GKE y del plano de control GKE recopiladas de la integración Google.
- El dashboard mejorado de GKE presenta métricas de la integración Kubernetes basada en el Agent de Datadog junto con las métricas del plano de control GKE recopiladas de la integración Google.

El dashboard estándar ofrece observabilidad en GKE con una simple configuración. El dashboard mejorado requiere pasos de configuración adicionales, pero proporciona más métricas de Kubernetes en tiempo real y a menudo es un mejor punto de partida al clonar y personalizar un dashboard para la monitorización de cargas de trabajo en producción.

A diferencia de los clústeres Kubernetes autoalojados, el plano de control GKE es gestionado por Google y no es accesible por un Datadog Agent que se ejecuta en el clúster. Por lo tanto, la observabilidad en el plano de control GKE requiere la integración Google, incluso si utilizas principalmente el Datadog Agent para monitorizar tus clústeres.

## Configuración

### Recopilación de métricas

#### Instalación

1. Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación para las métricas estándar y el dashboard predefinido.

1. Para rellenar el dashboard mejorado y activar el rastreo APM, la generación de logs, los perfiles, la seguridad y otros servicios de Datadog, [instala el Datadog Agent en tu clúster GKE](https://docs.datadoghq.com/integrations/google-kubernetes-engine/).

1. Para rellenar las métricas del plano de control, debes [activar las métricas del plano de control GKE](https://cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics#enable-control-plane-metrics). Las métricas del plano de control te ofrecen una visibilidad del funcionamiento del plano de control Kubernetes, gestionado por Google en GKE.

### Recopilación de logs

Los logs de Google Kubernetes Engine se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

Una vez hecho esto, exporta tus logs de Google Kubernetes Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página del Explorador de logs GCP](https://console.cloud.google.com/logs/viewer) y filtra logs de Kubernetes y GKE.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.gke.container.accelerator.duty_cycle** <br>(gauge) | Porcentaje de tiempo durante el último periodo de muestreo durante el cual el acelerador estuvo procesando activamente.<br>_Se muestra como porcentaje_ |
| **gcp.gke.container.accelerator.memory_total** <br>(gauge) | Memoria total del acelerador.<br>_Se muestra en bytes_ |
| **gcp.gke.container.accelerator.memory_used** <br>(gauge) | Memoria total del acelerador asignada.<br>_Se muestra en bytes_ |
| **gcp.gke.container.accelerator.request** <br>(gauge) | Número de dispositivos aceleradores solicitados por el contenedor.<br>_Se muestra como dispositivo_ |
| **gcp.gke.container.cpu.core_usage_time** <br>(count) | Uso acumulado de CPU en todos los núcleos utilizados por el contenedor.<br>_Se muestra en segundos_ |
| **gcp.gke.container.cpu.limit_cores** <br>(gauge) | Límite de núcleos de CPU del contenedor.<br>_Se muestra como núcleo_ |
| **gcp.gke.container.cpu.limit_utilization** <br>(gauge) | Fracción del límite de CPU que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.container.cpu.request_cores** <br>(gauge) | Número de núcleos de CPU solicitados por el contenedor.<br>_Se muestra como núcleo_ |
| **gcp.gke.container.cpu.request_utilization** <br>(gauge) | Fracción de CPU solicitada que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.container.ephemeral_storage.limit_bytes** <br>(gauge) | Límite de almacenamiento efímero local.<br>_Se muestra en bytes_ |
| **gcp.gke.container.ephemeral_storage.request_bytes** <br>(gauge) | Solicitud de almacenamiento efímero local.<br>_Se muestra en bytes_ |
| **gcp.gke.container.ephemeral_storage.used_bytes** <br>(gauge) | Uso de almacenamiento efímero local.<br>_Se muestra en bytes_ |
| **gcp.gke.container.memory.limit_bytes** <br>(gauge) | Límite de memoria del contenedor.<br>_Se muestra en bytes_ |
| **gcp.gke.container.memory.limit_utlization** <br>(gauge) | Fracción del límite de memoria que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.container.memory.page_fault_count** <br>(count) | Número de fallos de página desglosados por tipo.<br>_Se muestra como fallo_ |
| **gcp.gke.container.memory.request_bytes** <br>(gauge) | Solicitud de memoria del contenedor.<br>_Se muestra en bytes_ |
| **gcp.gke.container.memory.request_utilization** <br>(gauge) | Fracción de la memoria solicitada que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.container.memory.used_bytes** <br>(gauge) | Uso de memoria del contenedor.<br>_Se muestra en bytes_ |
| **gcp.gke.container.restart_count** <br>(count) | Número de veces que se ha reiniciado el contenedor.<br>_Se muestra como evento_ |
| **gcp.gke.container.uptime** <br>(gauge) | Tiempo en segundos que el contenedor ha estado funcionando.<br>_Se muestra en segundos_ |
| **gcp.gke.node.cpu.allocatable_cores** <br>(gauge) | Número de núcleos de CPU asignables en el nodo.<br>_Se muestra como núcleo_ |
| **gcp.gke.node.cpu.allocatable_utilization** <br>(gauge) | Fracción de la CPU asignable que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.node.cpu.core_usage_time** <br>(count) | Uso acumulado de CPU en todos los núcleos utilizados en el nodo.<br>_Se muestra en segundos_ |
| **gcp.gke.node.cpu.total_cores** <br>(gauge) | Número total de núcleos de CPU en el nodo.<br>_Se muestra como núcleo_ |
| **gcp.gke.node.ephemeral_storage.allocatable_bytes** <br>(gauge) | Bytes de almacenamiento efímero local asignables en el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.ephemeral_storage.inodes_free** <br>(gauge) | Número libre de inodos en el almacenamiento efímero local.|
| **gcp.gke.node.ephemeral_storage.inodes_total** <br>(gauge) | Número total de inodos en el almacenamiento efímero local.|
| **gcp.gke.node.ephemeral_storage.total_bytes** <br>(gauge) | Total de bytes de almacenamiento efímero en el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.ephemeral_storage.used_bytes** <br>(gauge) | Bytes de almacenamiento efímero local utilizados por el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.memory.allocatable_bytes** <br>(gauge) | Bytes de memoria acumulados utilizados por el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.memory.allocatable_utilization** <br>(gauge) | Fracción de la memoria asignable que está actualmente en uso en la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.node.memory.total_bytes** <br>(gauge) | Número de bytes de memoria asignables en el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.memory.used_bytes** <br>(gauge) | Bytes de memoria acumulados utilizados por el nodo.<br>_Se muestra en bytes_ |
| **gcp.gke.node.network.received_bytes_count** <br>(count) | Número acumulado de bytes recibidos por el nodo a través de la red.<br>_Se muestra en bytes_ |
| **gcp.gke.node.network.sent_bytes_count** <br>(count) | Número acumulado de bytes transmitidos por el nodo a través de la red.<br>_Se muestra en bytes_ |
| **gcp.gke.node.pid_limit** <br>(gauge) | PID máximo del SO en el nodo.|
| **gcp.gke.node.pid_used** <br>(gauge) | Número de procesos en ejecución en el SO del nodo.|
| **gcp.gke.node_daemon.cpu.core_usage_time** <br>(count) | Uso acumulativo de CPU en todos los núcleos utilizados por el daemon del sistema a nivel de nodo.<br>_Se muestra en segundos_ |
| **gcp.gke.node_daemon.memory.used_bytes** <br>(gauge) | Uso de memoria por el daemon del sistema.<br>_Se muestra en bytes_ |
| **gcp.gke.pod.network.received_bytes_count** <br>(count) | Número acumulado de bytes recibidos por el pod a través de la red.<br>_Se muestra en bytes_ |
| **gcp.gke.pod.network.sent_bytes_count** <br>(count) | Número acumulado de bytes transmitidos por el pod a través de la red.<br>_Se muestra en bytes_ |
| **gcp.gke.pod.volume.total_bytes** <br>(gauge) | Número total de bytes de disco disponibles para el pod.<br>_Se muestra en bytes_ |
| **gcp.gke.pod.volume.used_bytes** <br>(gauge) | Número de bytes de disco utilizados por el pod.<br>_Se muestra en bytes_ |
| **gcp.gke.pod.volume.utilization** <br>(gauge) | Fracción del volumen que está siendo utilizado actualmente por la instancia.<br>_Se muestra como fracción_ |
| **gcp.gke.control_plane.apiserver.admission_controller_admission_duration_seconds** <br>(gauge) | Histograma de latencia del controlador de admisión en segundos, identificado por nombre y desglosado para cada operación, y recurso de API y tipo (validar o admitir).<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.admission_step_admission_duration_seconds** <br>(gauge) | Histograma de latencia del subpaso de admisión en segundos, desglosado para cada operación, y recurso y tipo de paso (validar o admitir).<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.admission_webhook_admission_duration_seconds** <br>(gauge) | Histograma de latencia del webhook de admisión en segundos, identificado por nombre y desglosado para cada operación, y recurso y tipo de API (validar o admitir).<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.current_inflight_requests** <br>(gauge) | Número máximo de límite de solicitudes de entrada utilizadas actualmente por este servidor de API por tipo de solicitud.<br>_Se muestra como solicitud_ |
| **gcp.gke.control_plane.apiserver.request_duration_seconds** <br>(gauge) | Distribución de la latencia de respuesta en segundos para cada verbo, valor de ejecución manual, grupo, versión, recurso, subrecurso, contexto y componente.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.request_total** <br>(gauge) | Contador de solicitudes de servidor de API desglosadas por cada verbo, valor de ejecución manual, grupo, versión, recurso, contexto, componente y código de respuesta HTTP.<br>_Se muestra como solicitud_ |
| **gcp.gke.control_plane.apiserver.response_sizes** <br>(gauge) | Distribución del tamaño de la respuesta en bytes para cada grupo, versión, verbo, recurso, subrecurso, contexto y componente.<br>_Se muestra en bytes_ |
| **gcp.gke.control_plane.apiserver.storage_objects** <br>(gauge) | Número de objetos almacenados en el momento de la última comprobación dividida por tipo.<br>_Se muestra como objeto_ |
| **gcp.gke.control_plane.controller_manager.node_collector_evictions_number** <br>(count) | Número de desalojos de nodo que se han producido desde que se inició la instancia actual de NodeController.<br>_Se muestra como evento_ |
| **gcp.gke.control_plane.scheduler.pending_pods** <br>(gauge) | Número de pods pendientes, por tipo de cola.<br>_Se muestra como evento_ |
| **gcp.gke.control_plane.scheduler.pod_scheduling_duration_seconds** <br>(gauge) | Latencia de extremo a extremo de un pod que se está programando<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.preemption_attempts_total** <br>(count) | Total de intentos de preempción en el clúster hasta ahora<br>_Se muestra como intento_ |
| **gcp.gke.control_plane.scheduler.preemption_victims** <br>(gauge) | Número de víctimas de preempción seleccionadas<br>_Se muestra como evento_ |
| **gcp.gke.control_plane.scheduler.scheduling_attempt_duration_seconds** <br>(gauge) | Latencia del intento de programación en segundos<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.schedule_attempts_total** <br>(gauge) | Número de intentos de programación de pods.<br>_Se muestra como intento_ |
| **gcp.gke.control_plane.apiserver.aggregator_unavailable_apiservice** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.apiserver.audit_event_total** <br>(gauge) | (Obsoleto) Número acumulado de eventos de auditoría generados y enviados al backend de auditoría<br>_Se muestra como evento_ |
| **gcp.gke.control_plane.apiserver.audit_level_total** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.apiserver.audit_requests_rejected_total** <br>(gauge) | (Obsoleto)<br>_Se muestra como solicitud_ |
| **gcp.gke.control_plane.apiserver.client_certificate_expiration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.etcd_object_counts** <br>(gauge) | (Obsoleto) Número de objetos almacenados divididos por tipo.<br>_Se muestra como objeto_ |
| **gcp.gke.control_plane.apiserver.etcd_request_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.init_events_total** <br>(gauge) | (Obsoleto)<br>_Se muestra como evento_ |
| **gcp.gke.control_plane.apiserver.longrunning_gauge** <br>(gauge) | (Obsoleto) Indicador de todas las solicitudes de servidor de API activas de larga duración.<br>_Se muestra como solicitud_ |
| **gcp.gke.control_plane.apiserver.registered_watchers** <br>(gauge) | (Obsoleto) Número de observadores registrados actualmente para un recurso determinado.<br>_Se muestra como objeto_ |
| **gcp.gke.control_plane.apiserver.workqueue_adds_total** <br>(count) | (Obsoleto)|
| **gcp.gke.control_plane.apiserver.workqueue_depth** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.apiserver.workqueue_longest_running_processor_seconds** <br>(gauge) | (Obsoleto) Número de segundos que ha estado funcionando el procesador de más larga duración.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.workqueue_queue_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.workqueue_retries_total** <br>(count) | (Obsoleto)|
| **gcp.gke.control_plane.apiserver.workqueue_unfinished_work_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.apiserver.workqueue_work_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.controller_manager.cloudprovider_gce_api_request_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.controller_manager.cronjob_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de tareas cron|
| **gcp.gke.control_plane.controller_manager.daemon_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de daemons|
| **gcp.gke.control_plane.controller_manager.deployment_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de desarrollo|
| **gcp.gke.control_plane.controller_manager.endpoint_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de endpoints|
| **gcp.gke.control_plane.controller_manager.gc_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de recolección de basura|
| **gcp.gke.control_plane.controller_manager.job_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de tareas|
| **gcp.gke.control_plane.controller_manager.leader_election_master_status** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.namespace_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de espacios de nombre|
| **gcp.gke.control_plane.controller_manager.node_collector_evictions_number** <br>(count) | (Obsoleto) Recuento de eventos de desalojo de nodos.|
| **gcp.gke.control_plane.controller_manager.node_collector_unhealthy_nodes_in_zone** <br>(gauge) | (Obsoleto) Número de nodos no saludables|
| **gcp.gke.control_plane.controller_manager.node_collector_zone_health** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.node_collector_zone_size** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.node_ipam_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de gestión de direcciones IP|
| **gcp.gke.control_plane.controller_manager.node_lifecycle_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de ciclos de vida|
| **gcp.gke.control_plane.controller_manager.persistentvolume_protection_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de protección de volúmenes persistentes|
| **gcp.gke.control_plane.controller_manager.persistentvolumeclaim_protection_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de protección de afirmaciones de volúmenes persistentes|
| **gcp.gke.control_plane.controller_manager.replicaset_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de ReplicaSet|
| **gcp.gke.control_plane.controller_manager.replication_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de replicación|
| **gcp.gke.control_plane.controller_manager.route_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de rutas|
| **gcp.gke.control_plane.controller_manager.service_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de servicios|
| **gcp.gke.control_plane.controller_manager.serviceaccount_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de cuentas de servicios|
| **gcp.gke.control_plane.controller_manager.serviceaccount_tokens_controller_rate_limiter_use** <br>(gauge) | (Obsoleto) Uso del limitador de frecuencia por el controlador de tokens de cuentas de servicios|
| **gcp.gke.control_plane.controller_manager.workqueue_adds_total** <br>(count) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.workqueue_depth** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.workqueue_longest_running_processor_seconds** <br>(gauge) | (Obsoleto) Número de segundos que ha estado funcionando el procesador de más larga duración.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.controller_manager.workqueue_queue_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.controller_manager.workqueue_retries_total** <br>(count) | (Obsoleto)|
| **gcp.gke.control_plane.controller_manager.workqueue_unfinished_work_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.controller_manager.workqueue_work_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.binding_duration_seconds** <br>(gauge) | (Obsoleto) Número de latencia en segundos.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.e2e_scheduling_duration_seconds** <br>(gauge) | (Obsoleto) Latencia total de programación de extremo a extremo.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.framework_extension_point_duration_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.leader_election_master_status** <br>(gauge) | (Obsoleto)|
| **gcp.gke.control_plane.scheduler.scheduling_algorithm_duration_seconds** <br>(gauge) | (Obsoleto) Latencia total del algoritmo de programación.<br>_Se muestra en segundos_ |
| **gcp.gke.control_plane.scheduler.scheduling_algorithm_preemption_evaluation_seconds** <br>(gauge) | (Obsoleto)<br>_Se muestra en segundos_ |

### Eventos

La integración Google Kubernetes Engine no incluye eventos.

### Checks de servicio

La integración Google Kubernetes Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).