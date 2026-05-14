---
app_id: coreweave
categories:
- métricas
- ai/ml
- Kubernetes
- aprovisionamiento
custom_kind: integración
description: Reúne métricas de Prometheus de Coreweave
integration_version: 1.0.0
media:
- caption: Información general del dashboard de CoreWeave
  image_url: images/coreweave_dashboard.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: CoreWeave
---
## Información general

Con la integración de CoreWeave, Datadog puede extraer métricas de Prometheus de CoreWeave e importarlas con un complemento completo de etiquetas (tags), incluidas etiquetas (tags) proporcionadas por Prometheus (como pod, contenedor y espacio de nombres).

Rastrea los patrones de uso a través de Datadog para comprender mejor y optimizar el modo en que las organizaciones utilizan la plataforma CoreWeave Cloud.

Esta integración también proporciona una mayor visibilidad de la manera en que se factura a las organizaciones y señala de dónde proceden los gastos dentro de CoreWeave Cloud. Detecta anomalías en la facturación y recibe alertas si se producen o cuando se produzcan, lo que ayuda a los equipos a abordar los cambios rápidamente y determina qué pods o espacios de nombres son los más costosos.

## Configuración

**Paso 1: Recuperar un token de acceso en CoreWeave**

Para empezar, [recupera tu token de acceso a CoreWeave](https://cloud.coreweave.com/tokens/api-access). Ten en cuenta que solo los administradores de la organización pueden generar, ver y borrar tokens.

Sigue estos pasos para añadir la integración a tu cuenta de CoreWeave y crear un token de portador:

1. Ve a la page (página) de [token de acceso] de CoreWeave (https://cloud.coreweave.com/tokens/api-access) y haz clic en **Create a New Token** (Crear un nuevo token).
1. Introduce un **nombre de token**, preferiblemente algo exclusivo de Datadog.
1. Asigna un **espacio de nombres** a tu token moviéndolo de **Espacios de nombres disponibles** a **Espacios de nombres seleccionados**. Datadog recomienda un token de acceso por espacio de nombres cuando utilices la integración de CoreWeave.
1. Haz clic en **Generate** (Generar).

Necesitarás este token de acceso para el paso 2.

**Paso 2: Conecta tu cuenta de CoreWeave a Datadog**

Para empezar, copia la clave token de acceso del paso 1.

1. Ve al [ícono de integración de CoreWeave](https://app.datadoghq.com/integrations/coreweave).
1. Introduce un **Nombre** para la cuenta.
1. Pega la **clave token de acceso** de tu cuenta de CoreWeave en el campo Token de acceso.
1. También puedes definir **etiquetas** (tags) para estos logs.
1. A continuación, haz clic en **Save** (Guardar).

### Validación

1. Check si hay métricas con el prefijo `coreweave.`. Si estas métricas están presentes, ¡tu integración está funcionando!

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **coreweave.ALERTS** <br>(count) | |
| **coreweave.ALERTS_FOR_STATE** <br>(count) | |
| **coreweave.billing_cpu** <br>(count) | |
| **coreweave.billing_gpu** <br>(count) | |
| **coreweave.billing_ip_address** <br>(count) | |
| **coreweave.billing_mem** <br>(count) | |
| **coreweave.billing_object_storage_usage_bytes** <br>(count) | |
| **coreweave.billing_object_storage_usage_total_bytes** <br>(count) | |
| **coreweave.billing_pod_cost_hourly** <br>(count) | |
| **coreweave.billing_pod_cost_total** <br>(count) | |
| **coreweave.billing_pod_cpu** <br>(count) | |
| **coreweave.billing_pod_cpu_cost_hourly** <br>(count) | |
| **coreweave.billing_pod_gpu** <br>(count) | |
| **coreweave.billing_pod_gpu_cost_hourly** <br>(count) | |
| **coreweave.billing_pod_mem** <br>(count) | |
| **coreweave.billing_pod_mem_cost_hourly** <br>(count) | |
| **coreweave.billing_resource_usage_gpu** <br>(count) | |
| **coreweave.billing_resource_usage_storage** <br>(count) | |
| **coreweave.cluster_namespace_pod_cpu_activekube_pod_container_resource_requests** <br>(count) | |
| **coreweave.cluster_namespace_pod_memory_activekube_pod_container_resource_requests** <br>(count) | |
| **coreweave.cluster_namespace_deployment_actual_replicas_count** <br>(count) | |
| **coreweave.cluster_namespace_deployment_container_cpu_usage_seconds_total_sum_rate** <br>(count) | |
| **coreweave.cluster_namespace_deployment_container_memory_usage_bytes_sum** <br>(count) | |
| **coreweave.cluster_namespace_deploymentkube_pod_container_resource_requests_cpu_cores_sum** <br>(count) | |
| **coreweave.cluster_namespace_deploymentkube_pod_container_resource_requests_memory_bytes_sum** <br>(count) | |
| **coreweave.container_cpu_usage_seconds_total** <br>(count) | Tiempo de CPU acumulado consumido en segundos.|
| **coreweave.container_fs_reads_bytes_total** <br>(count) | Count acumulado de bytes leídos|
| **coreweave.container_fs_writes_bytes_total** <br>(count) | Count acumulado de bytes escritos|
| **coreweave.container_memory_cache** <br>(gauge) | Número de bytes de memoria caché de la page (página).|
| **coreweave.container_memory_rss** <br>(gauge) | Tamaño del RSS en bytes.|
| **coreweave.container_memory_usage_bytes** <br>(gauge) | Uso actual de la memoria en bytes, incluida toda la memoria independientemente de cuándo se accedió a ella.|
| **coreweave.container_memory_working_set_bytes** <br>(gauge) | Conjunto de trabajo actual en bytes.|
| **coreweave.container_network_receive_bytes_total** <br>(count) | Count acumulado de bytes recibidos|
| **coreweave.container_network_receive_packets_total** <br>(count) | Count acumulado de paquetes recibidos|
| **coreweave.container_network_transmit_bytes_total** <br>(count) | Count acumulado de bytes transmitidos|
| **coreweave.container_network_transmit_packets_total** <br>(count) | Count acumulado de paquetes transmitidos|
| **coreweave.coreweave_billed_amount** <br>(gauge) | Importe facturado por CoreWeave en función de la etiqueta de facturación|
| **coreweave.coreweave_billed_usage** <br>(gauge) | Consumo facturado por CoreWeave en función de la etiqueta de facturación|
| **coreweave.coreweave_customer_reference** <br>(gauge) | Referencia del cliente CoreWeave que muestra el ID de cliente|
| **coreweave.coreweave_pricing** <br>(gauge) | Precios de los productos de CoreWeave para determinados arrendatarios|
| **coreweave.coreweave_subscription** <br>(gauge) | ID de suscripción a CoreWeave|
| **coreweave.coreweave_subscription_active** <br>(gauge) | Estado activo de la suscripción a CoreWeave, devolverá 1 si está activa|
| **coreweave.coreweave_subscription_amount_billed** <br>(gauge) | Consumo total facturado en centavos de dólar desde el inicio de la suscripción del cliente|
| **coreweave.coreweave_subscription_current_balance** <br>(gauge) | Saldo impago en USD (centavos de dólar) por gastos ya facturados|
| **coreweave.coreweave_subscription_current_billing_amount** <br>(gauge) | Gastos acumulados en USD (centavos de dólar) para el periodo en curso (aún no facturados)|
| **coreweave.count_up0** <br>(count) | |
| **coreweave.count_up1** <br>(count) | |
| **coreweave.instance_node_cpu_ratio** <br>(count) | |
| **coreweave.kube_configmap_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_configmap_created** <br>(gauge) | Fecha de creación de Unix|
| **coreweave.kube_configmap_info** <br>(gauge) | \[STABLE\] Información sobre mapa de configuración.|
| **coreweave.kube_configmap_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_configmap_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica del mapa de configuración.|
| **coreweave.kube_deployment_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_deployment_created** <br>(gauge) | \[STABLE\] Marca de tiempo de creación de Unix|
| **coreweave.kube_deployment_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_deployment_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado.|
| **coreweave.kube_deployment_spec_paused** <br>(gauge) | Si el despliegue está en pausa y el controlador no lo procesará.|
| **coreweave.kube_deployment_spec_replicas** <br>(gauge) | Número de pods deseados para un despliegue.|
| **coreweave.kube_deployment_spec_strategy_rollingupdate_max_surge** <br>(gauge) | Número máximo de réplicas que se pueden programar por encima del número deseado de réplicas durante una actualización continua de un despliegue.|
| **coreweave.kube_deployment_spec_strategy_rollingupdate_max_unavailable** <br>(gauge) | Número máximo de réplicas no disponibles durante una actualización continua de un despliegue.|
| **coreweave.kube_deployment_status_condition** <br>(gauge) | Las condiciones de estado actuales de un despliegue.|
| **coreweave.kube_deployment_status_observed_generation** <br>(gauge) | La generación observada por el controlador de despliegue.|
| **coreweave.kube_deployment_status_replicas** <br>(gauge) | El número de réplicas por despliegue.|
| **coreweave.kube_deployment_status_replicas_available** <br>(gauge) | El número de réplicas disponibles por despliegue.|
| **coreweave.kube_deployment_status_replicas_ready** <br>(gauge) | El número de réplicas listas por despliegue.|
| **coreweave.kube_deployment_status_replicas_unavailable** <br>(gauge) | El número de réplicas no disponibles por despliegue.|
| **coreweave.kube_deployment_status_replicas_updated** <br>(gauge) | El número de réplicas actualizadas por despliegue.|
| **coreweave.kube_endpoint_address** <br>(gauge) | \[STABLE\] Información sobre las direcciones disponibles y no disponibles en el Endpoint.|
| **coreweave.kube_endpoint_address_available** <br>(gauge) | Número de direcciones disponibles en el endpoint.|
| **coreweave.kube_endpoint_address_not_ready** <br>(gauge) | Número de direcciones no preparadas en el endpoint|
| **coreweave.kube_endpoint_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_endpoint_created** <br>(gauge) | Fecha de creación de Unix|
| **coreweave.kube_endpoint_info** <br>(gauge) | Información sobre el endpoint.|
| **coreweave.kube_endpoint_labels** <br>(gauge) | \[STABLE\] Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_endpoint_ports** <br>(gauge) | Información sobre los puertos del Endpoint.|
| **coreweave.kube_ingress_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_ingress_created** <br>(gauge) | Fecha de creación Unix|
| **coreweave.kube_ingress_info** <br>(gauge) | \[STABLE\] Información sobre la entrada.|
| **coreweave.kube_ingress_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_ingress_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica de la entrada.|
| **coreweave.kube_ingress_path** <br>(gauge) | Información sobre el host de entrada, las rutas y el servicio de backend.|
| **coreweave.kube_ingress_tls** <br>(gauge) | Información secreta y de host TLS de entrada.|
| **coreweave.kube_namespace_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_namespace_created** <br>(gauge) | Fecha de creación de Unix|
| **coreweave.kube_namespace_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus.|
| **coreweave.kube_namespace_status_phase** <br>(gauge) | \[STABLE\] fase del estado del espacio de nombres de Kubernetes.|
| **coreweave.kube_networkpolicy_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_networkpolicy_created** <br>(gauge) | Marca de tiempo de creación de Unix de la política de red|
| **coreweave.kube_networkpolicy_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_networkpolicy_spec_egress_rules** <br>(gauge) | Número de reglas de salida en la política de red|
| **coreweave.kube_networkpolicy_spec_ingress_rules** <br>(gauge) | Número de reglas de entrada en la política de red|
| **coreweave.kube_persistentvolumeclaim_access_mode** <br>(gauge) | El modo o modos de acceso especificados por la reclamación de volumen persistente.|
| **coreweave.kube_persistentvolumeclaim_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_persistentvolumeclaim_created** <br>(gauge) | Fecha de creación de Unix|
| **coreweave.kube_persistentvolumeclaim_info** <br>(gauge) | Información sobre la reclamación de volumen persistente.|
| **coreweave.kube_persistentvolumeclaim_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_persistentvolumeclaim_resource_requests_storage_bytes** <br>(gauge) | \[STABLE\] La capacidad de almacenamiento solicitada por la demanda de volumen persistente.|
| **coreweave.kube_persistentvolumeclaim_status_phase** <br>(gauge) | La fase en la que está actualmente la reclamación de volumen persistente.|
| **coreweave.kube_pod_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_pod_container_info** <br>(gauge) | Información sobre un contenedor en un pod.|
| **coreweave.kube_pod_container_resource_limits** <br>(gauge) | El número de recursos límite solicitados por un contenedor.|
| **coreweave.kube_pod_container_resource_requests** <br>(gauge) | El número de recursos de solicitudes pedidas por un contenedor.|
| **coreweave.kube_pod_container_state_started** <br>(gauge) | Hora de inicio en la marca de tiempo de Unix para un contenedor de pod.|
| **coreweave.kube_pod_container_status_ready** <br>(gauge) | Describe si el check de la disponibilidad de los contenedores se ha realizado correctamente.|
| **coreweave.kube_pod_container_status_restarts_total** <br>(count) | El número de reinicios por contenedor.|
| **coreweave.kube_pod_container_status_running** <br>(gauge) | \[STABLE\] Describe si el contenedor está actualmente en estado de ejecución.|
| **coreweave.kube_pod_container_status_terminated** <br>(gauge) | Describe si el contenedor está actualmente en estado terminado.|
| **coreweave.kube_pod_container_status_waiting** <br>(gauge) | Describe si el contenedor está actualmente en estado de espera.|
| **coreweave.kube_pod_created** <br>(gauge) | Fecha de creación de Unix|
| **coreweave.kube_pod_deletion_timestamp** <br>(gauge) | Marca de tiempo de borrado de Unix|
| **coreweave.kube_pod_info** <br>(gauge) | Información sobre el pod.|
| **coreweave.kube_pod_init_container_info** <br>(gauge) | Información sobre un contenedor init en un pod.|
| **coreweave.kube_pod_init_container_resource_requests** <br>(gauge) | El número de recursos de solicitud pedidos por un contenedor init.|
| **coreweave.kube_pod_init_container_status_ready** <br>(gauge) | Describe si el check de disponibilidad de los contenedores init se ha realizado correctamente.|
| **coreweave.kube_pod_init_container_status_restarts_total** <br>(count) | El número de reinicios del contenedor init.|
| **coreweave.kube_pod_init_container_status_running** <br>(gauge) | Describe si el contenedor init está actualmente en estado de ejecución.|
| **coreweave.kube_pod_init_container_status_terminated** <br>(gauge) | Describe si el contenedor init está actualmente en estado terminado.|
| **coreweave.kube_pod_init_container_status_terminated_reason** <br>(gauge) | Describe el motivo por el que el contenedor init está actualmente en estado terminado.|
| **coreweave.kube_pod_init_container_status_waiting** <br>(gauge) | Describe si el contenedor init está actualmente en estado de espera.|
| **coreweave.kube_pod_ips** <br>(gauge) | Direcciones IP del pod|
| **coreweave.kube_pod_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus.|
| **coreweave.kube_pod_owner** <br>(gauge) | Información sobre el propietario del pod.|
| **coreweave.kube_pod_restart_policy** <br>(gauge) | Describe la política de reinicio en uso por este pod.|
| **coreweave.kube_pod_running_info** <br>(count) | |
| **coreweave.kube_pod_spec_volumes_persistentvolumeclaims_info** <br>(gauge) | Información sobre volúmenes persistentes de reclamos en un pod.|
| **coreweave.kube_pod_spec_volumes_persistentvolumeclaims_readonly** <br>(gauge) | Describe si un reclamo de volumen persistente está montado en modo de solo lectura.|
| **coreweave.kube_pod_start_time** <br>(gauge) | \[STABLE\] Hora de inicio en la marca de tiempo de Unix para un pod.|
| **coreweave.kube_pod_status_container_ready_time** <br>(gauge) | Tiempo de preparación alcanzado en la marca de tiempo de Unix para un contenedor de pod.|
| **coreweave.kube_pod_status_phase** <br>(gauge) | La fase actual del pod.|
| **coreweave.kube_pod_status_qos_class** <br>(gauge) | La qosClass actual del pod.|
| **coreweave.kube_pod_status_ready** <br>(gauge) | Describe si el pod está preparado para servir solicitudes.|
| **coreweave.kube_pod_status_ready_time** <br>(gauge) | Tiempo de preparación alcanzado en una marca de tiempo de Unix para un pod.|
| **coreweave.kube_pod_status_reason** <br>(gauge) | Los motivos del estado del pod |
| **coreweave.kube_pod_status_scheduled** <br>(gauge) | \[STABLE\] Describe el estado del proceso de programación del pod.|
| **coreweave.kube_pod_status_scheduled_time** <br>(gauge) | Marca de tiempo de Unix en que el pod pasó al estado programado|
| **coreweave.kube_pod_tolerations** <br>(gauge) | Información sobre las tolerancias del pod |
| **coreweave.kube_replicaset_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_replicaset_created** <br>(gauge) | \[STABLE\] Marca de tiempo de creación de Unix|
| **coreweave.kube_replicaset_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_replicaset_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado.|
| **coreweave.kube_replicaset_owner** <br>(gauge) | Información sobre el propietario del conjunto de réplicas.|
| **coreweave.kube_replicaset_spec_replicas** <br>(gauge) | Número de pods deseados para un conjunto de réplicas.|
| **coreweave.kube_replicaset_status_fully_labeled_replicas** <br>(gauge) | El número de réplicas totalmente etiquetadas por el conjunto de réplicas.|
| **coreweave.kube_replicaset_status_observed_generation** <br>(gauge) | La generación observada por el controlador del conjunto de réplicas.|
| **coreweave.kube_replicaset_status_ready_replicas** <br>(gauge) | \[STABLE\] El número de réplicas listas por conjunto de réplicas.|
| **coreweave.kube_replicaset_status_replicas** <br>(gauge) | El número de réplicas por conjunto de réplicas.|
| **coreweave.kube_resourcequota** <br>(gauge) | Información sobre la cuota de recursos.|
| **coreweave.kube_resourcequota_created** <br>(gauge) | Marca de tiempo de creación de Unix|
| **coreweave.kube_secret_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_secret_created** <br>(gauge) | Marca de tiempo de creación de Unix|
| **coreweave.kube_secret_info** <br>(gauge) | Información sobre el secreto.|
| **coreweave.kube_secret_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_secret_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica del secreto.|
| **coreweave.kube_secret_type** <br>(gauge) | Escribe sobre el secreto.|
| **coreweave.kube_service_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas en etiquetas de Prometheus.|
| **coreweave.kube_service_created** <br>(gauge) | Marca de tiempo de creación de Unix|
| **coreweave.kube_service_info** <br>(gauge) | Información sobre el servicio.|
| **coreweave.kube_service_labels** <br>(gauge) | Etiquetas de Kubernetes  convertidas en etiquetas de Prometheus.|
| **coreweave.kube_service_spec_type** <br>(gauge) | Escribe sobre el servicio.|
| **coreweave.kube_service_status_load_balancer_ingress** <br>(gauge) | Estado de entrada del equilibrador de carga de servicios|
| **coreweave.kubelet_container_log_filesystem_used_bytes** <br>(gauge) | \[ALPHA\] Bytes utilizados por los logs del contenedor en el sistema de archivos.|
| **coreweave.kubevirt_vnc_active_connections** <br>(gauge) | Cantidad de conexiones VNC activas, desglosadas por espacio de nombres y nombre de vmi|
| **coreweave.namespace_cpukube_pod_container_resource_requests_sum** <br>(count) | |
| **coreweave.namespace_memorykube_pod_container_resource_requests_sum** <br>(count) | |
| **coreweave.node_boot_time_seconds** <br>(gauge) | Tiempo de arranque del nodo, en unixtime.|
| **coreweave.node_context_switches_total** <br>(count) | Número total de cambios de contexto.|
| **coreweave.node_cooling_device_cur_state** <br>(gauge) | Estado actual de limitación del dispositivo de refrigeración|
| **coreweave.node_cpu_seconds_total** <br>(count) | Segundos que las CPU pasaron en cada modo.|
| **coreweave.node_disk_io_time_seconds_total** <br>(count) | Total de segundos dedicados a las E/S.|
| **coreweave.node_disk_read_bytes_total** <br>(count) | El número total de bytes leídos correctamente.|
| **coreweave.node_disk_write_time_seconds_total** <br>(count) | Es el número total de segundos empleados por todas las escrituras.|
| **coreweave.node_disk_written_bytes_total** <br>(count) | El número total de bytes escritos con éxito.|
| **coreweave.node_filesystem_avail_bytes** <br>(gauge) | Espacio del sistema de archivos disponible para usuarios no raíz en bytes.|
| **coreweave.node_filesystem_size_bytes** <br>(gauge) | Tamaño del sistema de archivos en bytes.|
| **coreweave.node_load1** <br>(gauge) | Carga media de 1 m.|
| **coreweave.node_load15** <br>(gauge) | Carga media de 15 m.|
| **coreweave.node_load5** <br>(gauge) | Carga media de 5 m.|
| **coreweave.node_memory_Active_anon_bytes** <br>(gauge) | Campo de información de memoria Bytes_anónimos_activos.|
| **coreweave.node_memory_Active_bytes** <br>(gauge) | Campo de información de memoria Bytes_activos.|
| **coreweave.node_memory_Active_file_bytes** <br>(gauge) | Campo de información de memoria Bytes_activos_de_archivo.|
| **coreweave.node_memory_AnonHugePages_bytes** <br>(gauge) | Campo de información de memoria Bytes_AnonHugePages.|
| **coreweave.node_memory_AnonPages_bytes** <br>(gauge) | Campo de información de memoria Bytes_AnonPages.|
| **coreweave.node_memory_Bounce_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_rechazo.|
| **coreweave.node_memory_Buffers_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_Buffers.|
| **coreweave.node_memory_Cached_bytes** <br>(gauge) | Campo de información de memoria Bytes_en_caché.|
| **coreweave.node_memory_CommitLimit_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_CommitLimit.|
| **coreweave.node_memory_Committed_AS_bytes** <br>(gauge) | Campo de información de memoria Bytes_AS_confirmados.|
| **coreweave.node_memory_DirectMap1G_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_DirectMap1G.|
| **coreweave.node_memory_DirectMap2M_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_DirectMap2M.|
| **coreweave.node_memory_DirectMap4k_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_DirectMap4k.|
| **coreweave.node_memory_Dirty_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_integridad.|
| **coreweave.node_memory_HardwareCorrupted_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_HardwareCorrupted.|
| **coreweave.node_memory_HugePages_Free** <br>(gauge) | Campo de información de memoria HugePages_libres.|
| **coreweave.node_memory_HugePages_Total** <br>(gauge) | Campo de información de memoria HugePages_Total.|
| **coreweave.node_memory_Hugepagesize_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_Hugepagesize.|
| **coreweave.node_memory_Inactive_anon_bytes** <br>(gauge) | Campo de información de memoria Bytes_anónimos_inactivos.|
| **coreweave.node_memory_Inactive_bytes** <br>(gauge) | Campo de información de memoria Bytes_inactivos.|
| **coreweave.node_memory_Mapped_bytes** <br>(gauge) | Campo de información de memoria Bytes_asignados.|
| **coreweave.node_memory_MemAvailable_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_MemAvailable.|
| **coreweave.node_memory_MemFree_bytes** <br>(gauge) | Campo de información de memoria Bytes_de_MemFree.|
| **coreweave.node_memory_MemTotal_bytes** <br>(gauge) | Campo de información de memoria Bytes_MemTotal.|
| **coreweave.node_namespace_podkube_pod_info** <br>(count) | |
| **coreweave.node_namespace_pod_container_container_cpu_usage_seconds_total_sum_irate** <br>(count) | |
| **coreweave.node_namespace_pod_container_container_memory_cache** <br>(count) | |
| **coreweave.node_namespace_pod_container_container_memory_rss** <br>(count) | |
| **coreweave.node_namespace_pod_container_container_memory_working_set_bytes** <br>(count) | |
| **coreweave.node_network_receive_bytes_total** <br>(count) | Estadística del dispositivo de red bytes_recibidos.|
| **coreweave.node_network_receive_drop_total** <br>(count) | Estadística del dispositivo de red colocación_recibida.|
| **coreweave.node_network_receive_errs_total** <br>(count) | Estadística del dispositivo de red errores_recibidos.|
| **coreweave.node_network_receive_packets_total** <br>(count) | Estadística del dispositivo de red paquetes_recibidos.|
| **coreweave.node_network_transmit_bytes_total** <br>(count) | Estadística del dispositivo de red bytes_transmitidos.|
| **coreweave.node_network_transmit_drop_total** <br>(count) | Estadística del dispositivo de red colocación_transmitida.|
| **coreweave.node_network_transmit_errs_total** <br>(count) | Estadística del dispositivo de red errores_transmitidos.|
| **coreweave.node_network_transmit_packets_total** <br>(count) | Estadística del dispositivo de red paquetes_transmitidos.|
| **coreweave.node_uname_info** <br>(gauge) | Información del sistema etiquetada tal y como la proporciona la llamada al sistema uname.|
| **coreweave.node_uptime** <br>(count) | |
| **coreweave.object_storage_quota_bytes** <br>(count) | |
| **coreweave.object_storage_total_object_count** <br>(count) | |
| **coreweave.object_storage_total_quota_bytes** <br>(count) | |
| **coreweave.scrape_duration_seconds** <br>(count) | |
| **coreweave.scrape_samples_post_metric_relabeling** <br>(count) | |
| **coreweave.scrape_samples_scraped** <br>(count) | |
| **coreweave.scrape_series_added** <br>(count) | |
| **coreweave.up** <br>(count) | |

### Checks de servicio

CoreWeave no incluye ningún check de servicio.

### Eventos

CoreWeave no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).