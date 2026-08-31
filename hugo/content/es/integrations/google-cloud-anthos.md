---
aliases:
- /es/integrations/google_cloud_anthos
app_id: google-cloud-anthos
categories:
- nube
- orquestación
- google cloud
- recopilación de logs
custom_kind: integración
description: Crea y ejecuta aplicaciones modernas a gran escala.
media: []
title: Google Cloud Anthos
---
## Información general

Google Cloud Anthos es una plataforma de desarrollo de infraestructuras y aplicaciones que se aloja on-premises
y en varias nubes públicas con un plano de control respaldado por Google Cloud.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Anthos pueden ser recopilados con Google Cloud Logging y enviados a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://cloud.google.com/architecture/partners/monitoring-anthos-with-datadog#collecting_logs_with_stackdriver_logging).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.anthos.apiserver_admission_controller_admission_duration_seconds** <br>(count) | Histograma de latencia del controlador de admisión en segundos, identificado por nombre y desglosado para cada operación y recurso de API y tipo (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_controller_admission_latencies_milliseconds** <br>(count) | (Obsoleto) Histograma de latencia del controlador de admisión en milisegundos, identificado por nombre y desglosado para cada operación y recurso de API y tipo (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en milisegundos_ |
| **gcp.anthos.apiserver_admission_controller_admission_latencies_seconds** <br>(count) | Histograma de latencia del controlador de admisión, identificado por nombre y desglosado para cada operación y recurso de API y tipo (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_gke_webhook_manifest_error** <br>(gauge) | Indica si se han producido errores al cargar webhooks basados en manifiestos. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_admission_gke_webhook_metadata** <br>(gauge) | Metadatos para webhooks de admisión. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds** <br>(count) | Histograma de latencia del subpaso de admisión en segundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary** <br>(gauge) | Resumen de latencia de subpaso de admisión en segundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary_count** <br>(count) | Resumen de latencia de subpaso de admisión en segundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_duration_seconds_summary_sum** <br>(count) | Resumen de latencia de subpaso de admisión en segundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds** <br>(count) | (Obsoleto) Histograma de latencia de subpaso de admisión en milisegundos, desglosado para cada operación y recurso de API y tipo de subpaso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en milisegundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary** <br>(gauge) | (Obsoleto) Resumen de latencia de subpaso de admisión en milisegundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en milisegundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary_count** <br>(count) | (Obsoleto) Resumen de latencia de subpaso de admisión en milisegundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en milisegundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_milliseconds_summary_sum** <br>(count) | (Obsoleto) Resumen de latencia de subpaso de admisión en milisegundos, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en milisegundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds** <br>(count) | Histograma de latencia de subpaso de admisión, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary** <br>(gauge) | Resumen de latencia de subpaso de admisión, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary_count** <br>(count) | Resumen de latencia de subpaso de admisión, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_step_admission_latencies_seconds_summary_sum** <br>(count) | Resumen de latencia de subpaso de admisión, desglosado para cada operación y recurso de API y tipo de paso (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_webhook_admission_duration_seconds** <br>(count) | Histograma de latencia de webhook de admisión en segundos, identificado por nombre y desglosado para cada operación y recurso de API y tipo (validar o admitir). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_admission_webhook_rejection_count** <br>(count) | Recuento de rechazos de webhook de admisión, identificado por nombre y desglosado para cada tipo de admisión y operación. Las etiquetas adicionales especifican un tipo de error (calling_webhook_error o apiserver_internal_error si se ha producido un error; no_error en caso contrario) y opcionalmente un código de rechazo distinto de cero si el webhook rechaza la solicitud con un código de estado HTTP. Los códigos superiores a 600 se truncan a 600.|
| **gcp.anthos.apiserver_aggregated_request_total** <br>(count) | Recuento delta de solicitudes apiserver desglosado por cada verbo, ámbito y código de respuesta HTTP. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles durante 180 segundos.|
| **gcp.anthos.apiserver_audit_error_total** <br>(count) | Contador de eventos de auditoría que no se han podido auditar correctamente. Plugin identifica el complemento afectado por el error. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.apiserver_audit_event_total** <br>(count) | Contador de eventos de auditoría generados y enviados al backend de auditoría. Muestreo cada 60 segundos.<br>_Se muestra como evento_ |
| **gcp.anthos.apiserver_audit_level_total** <br>(count) | Contador de niveles de política para eventos de auditoría (1 por solicitud). Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_audit_requests_rejected_total** <br>(count) | Contador de solicitudes apiserver rechazadas debido a un error en el backend de registro de auditoría. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_crd_webhook_conversion_duration_seconds** <br>(count) | Duración de la conversión del webhook CRD en segundos. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_current_inflight_requests** <br>(gauge) | Número máximo de solicitudes en vuelo utilizadas actualmente por este servidor por tipo de solicitud en el último segundo. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_current_inqueue_requests** <br>(gauge) | Número máximo de solicitudes en cola en este apiserver por tipo de solicitud en el último segundo. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_egress_dialer_dial_duration_seconds** <br>(count) | Histograma de latencia de marcación en segundos, etiquetado por protocolo (http-connect o grpc), transporte (tcp o uds). Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_egress_dialer_dial_failure_count** <br>(count) | Recuento de fallos de marcación, etiquetado por protocolo (http-connect o grpc), transporte (tcp o uds) y fase (connect o proxy). La fase indica en qué fase falló la marcación. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_envelope_encryption_dek_cache_fill_percent** <br>(gauge) | Porcentaje de las ranuras de caché ocupadas actualmente por DEK en caché. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_flowcontrol_current_executing_requests** <br>(gauge) | Número de solicitudes que se están ejecutando actualmente en el sistema de prioridad y equidad de la API. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_current_inqueue_requests** <br>(gauge) | Número de solicitudes pendientes actualmente en las colas del sistema de prioridad y equidad de la API. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_dispatched_requests_total** <br>(count) | Número de solicitudes liberadas por el sistema de prioridad y equidad de la API para el servicio. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_priority_level_request_count_samples** <br>(count) | Observaciones periódicas del número de solicitudes. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_priority_level_request_count_watermarks** <br>(count) | Marcas de agua del número de solicitudes. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_read_vs_write_request_count_samples** <br>(count) | Observaciones periódicas del número de solicitudes. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_read_vs_write_request_count_watermarks** <br>(count) | Marcas de agua del número de solicitudes. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_flowcontrol_request_concurrency_limit** <br>(gauge) | Límite de concurrencia compartida en el sistema de prioridad y equidad de la API. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_flowcontrol_request_execution_seconds** <br>(count) | Duración de la ejecución de la solicitud en el sistema de prioridad y equidad de la API. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_flowcontrol_request_queue_length_after_enqueue** <br>(count) | Longitud de la cola en el sistema de prioridad y equidad de la API, vista por cada solicitud después de ser puesta en cola. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_flowcontrol_request_wait_duration_seconds** <br>(count) | Tiempo de espera de una solicitud en su cola. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_init_events_total** <br>(count) | Contador de eventos init procesados en watchcache desglosado por tipo de recurso. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_kube_aggregator_x509_missing_san_total** <br>(count) | Cuenta el número de solicitudes a servidores a los que les falta la extensión SAN en su certificado de servidor O el número de fallos de conexión debidos a la falta de la extensión SAN del certificado x509 (uno u otro, en función del entorno de ejecución). Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_longrunning_gauge** <br>(gauge) | Indicador de todas las solicitudes apiserver activas de larga duración desglosadas por verbo, grupo, versión, recurso, ámbito y componente. No todas las solicitudes son seguidas de esta manera. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_registered_watchers** <br>(gauge) | Número de observadores registrados actualmente para un recurso determinado. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_request_aborts_total** <br>(count) | Número de solicitudes que apiserver abortó posiblemente debido a un tiempo de espera, para cada grupo, versión, verbo, recurso, subrecurso y ámbito. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_request_count** <br>(count) | (Obsoleto) Contador de solicitudes de apiserver desglosadas por cada verbo, grupo, versión, recurso, ámbito, componente, cliente y tipo de contenido y código de respuesta HTTP. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_request_duration_seconds** <br>(count) | \[STABLE\] Distribución de latencia de respuesta en segundos para cada verbo, valor de ejecución en seco, grupo, versión, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_request_filter_duration_seconds** <br>(count) | Distribución de la latencia de los filtros de solicitud en segundos, para cada tipo de filtro. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_request_latencies** <br>(count) | (Obsoleto) Distribución de la latencia de respuesta en microsegundos para cada verbo, grupo, versión, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.apiserver_request_latencies_summary** <br>(gauge) | (Obsoleto) Resumen de latencia de respuesta en microsegundos para cada verbo, grupo, versión, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.apiserver_request_latencies_summary_count** <br>(count) | (Obsoleto) Resumen de latencia de respuesta en microsegundos para cada verbo, grupo, versión, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.apiserver_request_latencies_summary_sum** <br>(count) | (Obsoleto) Resumen de latencia de respuesta en microsegundos para cada verbo, grupo, versión, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.apiserver_request_terminations_total** <br>(count) | Número de solicitudes que apiserver terminó en defensa propia. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_request_total** <br>(count) | \[STABLE\] Contador de solicitudes apiserver desglosadas por cada verbo, valor de ejecución en seco, grupo, versión, recurso, ámbito, componente y código de respuesta HTTP. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_requested_deprecated_apis** <br>(gauge) | Indicador de las APIs obsoletas que se han solicitado, desglosadas por grupo de API, versión, recurso, subrecurso y versión eliminada. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_response_sizes** <br>(count) | Distribución del tamaño de la respuesta en bytes para cada grupo, versión, verbo, recurso, subrecurso, ámbito y componente. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.apiserver_selfrequest_total** <br>(count) | Contador de autosolicitudes apiserver desglosadas por cada verbo, recurso API y subrecurso. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.apiserver_storage_data_key_generation_duration_seconds** <br>(count) | Latencias en segundos de las operaciones de generación de claves de cifrado de datos (DEK). Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_storage_data_key_generation_failures_total** <br>(count) | Número total de operaciones fallidas de generación de claves de cifrado de datos (DEK). Muestreo cada 60 segundos.<br>_Se muestra como operación_ |
| **gcp.anthos.apiserver_storage_data_key_generation_latencies_microseconds** <br>(count) | (Obsoleto) Latencias en microsegundos de las operaciones de generación de claves de cifrado de datos (DEK). Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.apiserver_storage_envelope_transformation_cache_misses_total** <br>(count) | Número total de pérdidas de caché al acceder a la clave de descifrado (KEK). Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_storage_objects** <br>(gauge) | \[STABLE\] Número de objetos almacenados en el momento del último check divididos por tipo. Muestreo cada 60 segundos.<br>_Se muestra como objeto_ |
| **gcp.anthos.apiserver_storage_transformation_duration_seconds** <br>(count) | Latencias en segundos de las operaciones de transformación de valores. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.apiserver_storage_transformation_operations_total** <br>(count) | Número total de transformaciones. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.apiserver_terminated_watchers_total** <br>(count) | Contador de observadores cerrados por falta de respuesta desglosado por tipo de recurso. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_tls_handshake_errors_total** <br>(count) | Número de solicitudes caídas con error 'TLS handshake error from'. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.apiserver_watch_events_sizes** <br>(count) | Distribución del tamaño de los eventos de vigilancia en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.apiserver_watch_events_total** <br>(count) | Número de eventos enviados en clientes de vigilancia. Muestreo cada 60 segundos.|
| **gcp.anthos.apiserver_webhooks_x509_missing_san_total** <br>(count) | Cuenta el número de solicitudes a servidores a los que les falta la extensión SAN en su certificado de servidor O el número de fallos de conexión debidos a la falta de la extensión SAN del certificado x509 (uno u otro, en función del entorno de ejecución). Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.container.cpu.limit_cores** <br>(gauge) | Límite de núcleos de CPU del contenedor. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.container.cpu.request_cores** <br>(gauge) | Número de núcleos de CPU solicitados por el contenedor. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.container.ephemeral_storage.limit_bytes** <br>(gauge) | Límite de almacenamiento efímero local en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.container.ephemeral_storage.request_bytes** <br>(gauge) | Solicitud de almacenamiento efímero local en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.container.ephemeral_storage.used_bytes** <br>(gauge) | Uso de almacenamiento efímero local en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.container.memory.limit_bytes** <br>(gauge) | Límite de memoria del contenedor en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.container.memory.request_bytes** <br>(gauge) | Solicitud de memoria del contenedor en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.container.memory.used_bytes** <br>(gauge) | Uso de memoria en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.coredns_cache_hits_total** <br>(count) | Recuento de visitas a la caché. Muestreo cada 60 segundos.<br>_Se muestra como acierto_ |
| **gcp.anthos.coredns_cache_misses_total** <br>(count) | Recuento de fallos de caché. Muestreo cada 60 segundos.<br>_Se muestra como fallo_ |
| **gcp.anthos.coredns_dns_do_requests_total** <br>(count) | Contador de solicitudes DNS con el bit DO activado por zona. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.coredns_dns_request_duration_seconds** <br>(count) | Histograma del tiempo (en segundos) que tardó cada solicitud. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.coredns_dns_request_size_bytes** <br>(count) | Tamaño del búfer UDP de EDNS0 en bytes (64K para TCP). Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.coredns_dns_requests_total** <br>(count) | Contador de solicitudes DNS realizadas por zona, protocolo y familia. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.coredns_dns_response_size_bytes** <br>(count) | Tamaño de la respuesta devuelta en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.coredns_dns_responses_total** <br>(count) | Contador de códigos de estado de respuesta. Muestreo cada 60 segundos.<br>_Se muestra como respuesta_ |
| **gcp.anthos.go_goroutines** <br>(gauge) | Número de goroutines que existen actualmente. Muestreo cada 60 segundos.|
| **gcp.anthos.go_threads** <br>(gauge) | Número de subprocesos de SO creados. Muestreo cada 60 segundos.<br>_Se muestra como subproceso_ |
| **gcp.anthos.kube_apiserver_pod_logs_pods_logs_backend_tls_failure_total** <br>(count) | Número total de solicitudes de pods/logs que fallaron debido a la verificación TLS del servidor kubelet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_apiserver_pod_logs_pods_logs_insecure_backend_total** <br>(count) | Número total de solicitudes de pods/logs divididas por tipo de uso: enforce_tls, skip_tls_allowed, skip_tls_denied. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.kube_auto_repair_reason_total** <br>(count) | Contador de reparaciones activadas por condición. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_auto_repair_trigger_latencies_seconds** <br>(count) | Histograma de latencias para la activación de la reparación en máquinas que superan el umbral de fallos. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_certificatesigningrequest_cert_length** <br>(gauge) | Duración del certificado emitido. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_certificatesigningrequest_condition** <br>(gauge) | Número de cada condición de solicitud de firma de certificado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_certificatesigningrequest_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_certificatesigningrequest_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_configmap_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_configmap_info** <br>(gauge) | Información sobre configmap. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_configmap_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica del configmap. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_daemonset_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_daemonset_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_daemonset_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_daemonset_status_current_number_scheduled** <br>(gauge) | Número de nodos que ejecutan al menos un pod de daemon y se supone que lo hacen. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_status_desired_number_scheduled** <br>(gauge) | El número de nodos que deberían estar ejecutando el pod de daemon. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_status_number_available** <br>(gauge) | El número de nodos que deberían estar ejecutando el pod de daemon y que tienen uno o más de los pod de daemon en ejecución y disponibles. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_status_number_misscheduled** <br>(gauge) | Número de nodos que ejecutan un pod de daemon pero no se supone que lo hagan. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_status_number_ready** <br>(gauge) | El número de nodos que deberían estar ejecutando el pod de daemon y tienen uno o más de los pod de daemon ejecutándose y listos. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_status_number_unavailable** <br>(gauge) | El número de nodos que deberían estar ejecutando el pod de daemon y no tienen ninguno de ellos en ejecución y disponible. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_daemonset_updated_number_scheduled** <br>(gauge) | El número total de nodos que están ejecutando el pod de daemon actualizado. Muestreo cada 60 segundos.<br>_Se muestra como nodo_ |
| **gcp.anthos.kube_deployment_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_spec_paused** <br>(gauge) | Si el despliegue está en pausa y no será procesado por el controlador de despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_spec_replicas** <br>(gauge) | Número de pods deseados para un despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_spec_strategy_rollingupdate_max_surge** <br>(gauge) | Número máximo de réplicas que se pueden programar por encima del número de réplicas deseado durante una actualización continua de un despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_spec_strategy_rollingupdate_max_unavailable** <br>(gauge) | Número máximo de réplicas no disponibles durante una actualización continua de un despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_condition** <br>(gauge) | Las condiciones de estado actuales de un despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_observed_generation** <br>(gauge) | La generación observada por el controlador de despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_replicas** <br>(gauge) | Número de réplicas por despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_replicas_available** <br>(gauge) | Número de réplicas disponibles por despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_replicas_unavailable** <br>(gauge) | Número de réplicas no disponibles por despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_deployment_status_replicas_updated** <br>(gauge) | Número de réplicas actualizadas por despliegue. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_endpoint_address_available** <br>(gauge) | Número de direcciones disponibles en el endpoint. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_endpoint_address_not_ready** <br>(gauge) | Número de direcciones no preparadas en el endpoint. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_endpoint_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_endpoint_info** <br>(gauge) | Información sobre el endpoint. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_endpoint_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_metadata_generation** <br>(gauge) | La generación observada por el controlador HorizontalPodAutoscaler. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_spec_max_replicas** <br>(gauge) | Límite superior para el número de pods que puede establecer el autoescalador; no puede ser menor que MinReplicas. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_spec_min_replicas** <br>(gauge) | Límite inferior para el número de pods que puede establecer el autoescalador, por defecto 1. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_spec_target_metric** <br>(gauge) | Las especificaciones de métricas utilizadas por este autoescalador al calcular el recuento de réplicas deseado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_status_condition** <br>(gauge) | El estado de este autoescalador. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_status_current_replicas** <br>(gauge) | Número actual de réplicas de pods gestionados por este autoescalador. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_hpa_status_desired_replicas** <br>(gauge) | Número deseado de réplicas de pods gestionados por este autoescalador. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_complete** <br>(gauge) | El trabajo ha finalizado su ejecución. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_info** <br>(gauge) | Información sobre trabajo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_owner** <br>(gauge) | Información sobre el propietario del trabajo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_spec_completions** <br>(gauge) | El número deseado de pods finalizados con éxito con los que debe ejecutarse el trabajo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_spec_parallelism** <br>(gauge) | El número máximo deseado de pods que el trabajo debe ejecutar en un momento dado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_status_active** <br>(gauge) | Número de pods en ejecución activa. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_status_completion_time** <br>(gauge) | CompletionTime representa el momento en que se completó el trabajo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_status_failed** <br>(gauge) | Número de pods que han alcanzado la fase Fallida. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_status_start_time** <br>(gauge) | StartTime representa la hora a la que el gestor de trabajo acusó recibo del trabajo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_job_status_succeeded** <br>(gauge) | Número de cápsulas que han alcanzado la fase Éxito. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_limitrange** <br>(gauge) | Información sobre el rango límite. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_limitrange_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_machine_annotations** <br>(gauge) | Información sobre las anotaciones de la máquina. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_machine_spec_provider_info** <br>(gauge) | Información de Machine ProviderSpec. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_machine_status_noderef** <br>(gauge) | Información del nodo en la máquina. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_machinedeployment_spec_replicas** <br>(gauge) | Número de réplicas en MachineDeployment Spec. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_machinedeployment_spec_template_annotations** <br>(gauge) | Información sobre las anotaciones de la plantilla MachineDeployment Spec. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_info** <br>(gauge) | Información sobre MutatingWebhookConfiguration. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_mutatingwebhookconfiguration_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica de MutatingWebhookConfiguration. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_namespace_annotations** <br>(gauge) | Anotaciones de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_namespace_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_namespace_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_namespace_status_phase** <br>(gauge) | Fase de estado del espacio de nombres de kubernetes. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_networkpolicy_created** <br>(gauge) | Marca de tiempo de creación Unix de la política de red. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_networkpolicy_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_networkpolicy_spec_egress_rules** <br>(gauge) | Número de reglas de salida en la política de red. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_networkpolicy_spec_ingress_rules** <br>(gauge) | Número de reglas de entrada en la política de red. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_info** <br>(gauge) | Información sobre un nodo del clúster. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_role** <br>(gauge) | Función de un nodo del clúster. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_spec_taint** <br>(gauge) | La mancha de un nodo del clúster. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_spec_unschedulable** <br>(gauge) | Si un nodo puede programar nuevos pods. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_status_allocatable** <br>(gauge) | Los asignables para los diferentes recursos de un nodo que están disponibles para la programación. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_status_allocatable_cpu_cores** <br>(gauge) | Los recursos de CPU de un nodo que están disponibles para la programación. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.kube_node_status_allocatable_memory_bytes** <br>(gauge) | Los recursos de memoria de un nodo que están disponibles para la programación. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_node_status_allocatable_pods** <br>(gauge) | Los recursos de pod de un nodo que están disponibles para la programación. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_status_capacity** <br>(gauge) | La capacidad para diferentes recursos de un nodo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_status_capacity_cpu_cores** <br>(gauge) | El total de recursos de CPU del nodo. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.kube_node_status_capacity_memory_bytes** <br>(gauge) | El total de recursos de memoria del nodo. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_node_status_capacity_pods** <br>(gauge) | El total de recursos pod del nodo. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_node_status_condition** <br>(gauge) | Estado de un nodo del clúster. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_onpremadmincluster_spec_info** <br>(gauge) | Información de OnPremAdminCluster Spec. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_onpremusercluster_spec_info** <br>(gauge) | Información de OnPremUserCluster Spec. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_onpremusercluster_status_condition_lasttransitiontime** <br>(gauge) | Marca de tiempo Unix cuando onpremusercluster pasó a la condición. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolume_capacity_bytes** <br>(gauge) | Capacidad del volumen persistente en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_persistentvolume_info** <br>(gauge) | Información sobre persistentvolume. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolume_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolume_status_phase** <br>(gauge) | La fase indica si un volumen está disponible, vinculado a una demanda o liberado por una demanda. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolumeclaim_access_mode** <br>(gauge) | El modo o modos de acceso especificados por la reclamación de volumen persistente. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolumeclaim_info** <br>(gauge) | Información sobre la reclamación de volumen persistente. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolumeclaim_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_persistentvolumeclaim_resource_requests_storage_bytes** <br>(gauge) | La capacidad de almacenamiento solicitada por la demanda de volumen persistente. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_persistentvolumeclaim_status_phase** <br>(gauge) | La fase en la que se encuentra actualmente la reclamación de volumen persistente. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_completion_time** <br>(gauge) | Tiempo de finalización de un pod en formato unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_info** <br>(gauge) | Información sobre un contenedor en un pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_resource_limits** <br>(gauge) | Número de recursos límite solicitados por un contenedor. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_resource_limits_cpu_cores** <br>(gauge) | El límite de núcleos de cpu a utilizar por un contenedor. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.kube_pod_container_resource_limits_memory_bytes** <br>(gauge) | El límite de memoria a utilizar por un contenedor en bytes. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_pod_container_resource_requests** <br>(gauge) | Número de recursos de solicitud pedidos por un contenedor. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.kube_pod_container_resource_requests_cpu_cores** <br>(gauge) | Número de núcleos de cpu solicitados por un contenedor. Muestreo cada 60 segundos.<br>_Se muestra como núcleo_ |
| **gcp.anthos.kube_pod_container_resource_requests_memory_bytes** <br>(gauge) | Número de bytes de memoria solicitados por un contenedor. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kube_pod_container_status_last_terminated_reason** <br>(gauge) | Describe la última razón por la que el contenedor estuvo en estado terminado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_ready** <br>(gauge) | Describe si el check de la disponibilidad de los contenedores se ha realizado correctamente. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_restarts_total** <br>(count) | Número de reinicios de contenedor por contenedor. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_running** <br>(gauge) | Describe si el contenedor está actualmente en estado de ejecución. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_terminated** <br>(gauge) | Describe si el contenedor está actualmente en estado terminado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_terminated_reason** <br>(gauge) | Describe la razón por la que el contenedor se encuentra actualmente en estado finalizado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_waiting** <br>(gauge) | Describe si el contenedor se encuentra actualmente en estado de espera. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_container_status_waiting_reason** <br>(gauge) | Describe la razón por la que el contenedor se encuentra actualmente en estado de espera. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_info** <br>(gauge) | Información sobre el pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_info** <br>(gauge) | Información sobre un contenedor init en un pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_last_terminated_reason** <br>(gauge) | Describe la última razón por la que el contenedor init estuvo en estado terminado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_ready** <br>(gauge) | Describe si el check de preparación de los contenedores init ha tenido éxito. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_restarts_total** <br>(count) | Número de reinicios del contenedor init. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_running** <br>(gauge) | Describe si el contenedor init está actualmente en estado de ejecución. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_terminated** <br>(gauge) | Describe si el contenedor init está actualmente en estado terminado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_terminated_reason** <br>(gauge) | Describe la razón por la que el contenedor init está actualmente en estado terminado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_waiting** <br>(gauge) | Describe si el contenedor init está actualmente en estado de espera. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_init_container_status_waiting_reason** <br>(gauge) | Describe la razón por la que el contenedor init se encuentra actualmente en estado de espera. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_owner** <br>(gauge) | Información sobre el propietario del pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_restart_policy** <br>(gauge) | Describe la política de reinicio en uso por este pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_spec_volumes_persistentvolumeclaims_info** <br>(gauge) | Información sobre volúmenes persistentes en un pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_spec_volumes_persistentvolumeclaims_readonly** <br>(gauge) | Describe si un persistentvolumeclaim está montado en modo de solo lectura. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_start_time** <br>(gauge) | Hora de inicio en la marca de tiempo unix para un pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_status_phase** <br>(gauge) | La fase actual de pods. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_status_ready** <br>(gauge) | Describe si el pod está listo para atender solicitudes. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_status_scheduled** <br>(gauge) | Describe el estado del proceso de programación del pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_pod_status_scheduled_time** <br>(gauge) | Marca de tiempo Unix cuando el pod pasó al estado Programado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_status_current_healthy** <br>(gauge) | Número actual de pods en buen estado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_status_desired_healthy** <br>(gauge) | Número mínimo deseado de pods en buen estado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_status_expected_pods** <br>(gauge) | Número total de pods contados por este presupuesto de interrupción. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_status_observed_generation** <br>(gauge) | Generación más reciente observada al actualizar el estado de esta PDB. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_poddisruptionbudget_status_pod_disruptions_allowed** <br>(gauge) | Número de interrupciones permitidas actualmente en pod. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_owner** <br>(gauge) | Información sobre el propietario de ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_spec_replicas** <br>(gauge) | Número de pods deseados para un ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_status_fully_labeled_replicas** <br>(gauge) | Número de réplicas totalmente etiquetadas por ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_status_observed_generation** <br>(gauge) | La generación observada por el controlador ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_status_ready_replicas** <br>(gauge) | Número de réplicas listas por ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_replicaset_status_replicas** <br>(gauge) | Número de réplicas por ReplicaSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_resourcequota** <br>(gauge) | Información sobre la cuota de recursos. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_resourcequota_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_secret_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_secret_info** <br>(gauge) | Información sobre el secreto. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_secret_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_secret_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica del secreto. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_secret_type** <br>(gauge) | Tipo sobre secreto. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_service_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_service_info** <br>(gauge) | Información sobre el servicio. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_service_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_service_spec_type** <br>(gauge) | Tipo sobre servicio. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_service_status_load_balancer_ingress** <br>(gauge) | Estado de entrada del equilibrador de carga del servicio. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_stackdriver_spec_info** <br>(gauge) | Información de Stackdriver. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_metadata_generation** <br>(gauge) | Número de secuencia que representa una generación específica del estado deseado para el StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_replicas** <br>(gauge) | Número de pods deseados para un StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_current_revision** <br>(gauge) | Indica la versión del StatefulSet utilizada para generar pods en la secuencia \[0,currentReplicas). Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_observed_generation** <br>(gauge) | La generación observada por el controlador StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_replicas** <br>(gauge) | Número de réplicas por StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_replicas_current** <br>(gauge) | Número de réplicas actuales por StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_replicas_ready** <br>(gauge) | Número de réplicas listas por StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_replicas_updated** <br>(gauge) | Número de réplicas actualizadas por StatefulSet. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_statefulset_status_update_revision** <br>(gauge) | Indica la versión de StatefulSet utilizada para generar pods en la secuencia \[replicas-updatedReplicas,replicas). Muestreo cada 60 segundos.|
| **gcp.anthos.kube_storageclass_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_storageclass_info** <br>(gauge) | Información sobre storageclass. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_storageclass_labels** <br>(gauge) | Etiquetas de Kubernetes convertidas a etiquetas de Prometheus. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_validatingwebhookconfiguration_created** <br>(gauge) | Marca de tiempo de creación Unix. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_validatingwebhookconfiguration_info** <br>(gauge) | Información sobre ValidatingWebhookConfiguration. Muestreo cada 60 segundos.|
| **gcp.anthos.kube_validatingwebhookconfiguration_metadata_resource_version** <br>(gauge) | Versión del recurso que representa una versión específica de ValidatingWebhookConfiguration. Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_dnsmasq_errors** <br>(count) | Número de errores que se han producido obteniendo métricas. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubedns_dnsmasq_evictions** <br>(count) | Contador de desalojos de la caché DNS (desde el inicio del proceso). Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_dnsmasq_hits** <br>(count) | Número de aciertos en la caché DNS (desde el inicio del proceso). Muestreo cada 60 segundos.<br>_Se muestra como acierto_ |
| **gcp.anthos.kubedns_dnsmasq_insertions** <br>(count) | Contador de inserciones en la caché DNS (desde el inicio del proceso). Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_dnsmasq_max_size** <br>(count) | Tamaño máximo de la caché DNS. Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_dnsmasq_misses** <br>(count) | Número de errores de caché DNS (desde el inicio del proceso). Muestreo cada 60 segundos.<br>_Se muestra como fallo_ |
| **gcp.anthos.kubedns_probe_dnsmasq_errors** <br>(count) | Recuento de errores en la resolución de nombres de dnsmasq. Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_probe_dnsmasq_latency_ms** <br>(count) | Latencia de la solicitud de sondeo DNS dnsmasq. Muestreo cada 60 segundos.|
| **gcp.anthos.kubedns_probe_kubedns_errors** <br>(count) | Recuento de errores en la resolución de nombres de kubedns. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubedns_probe_kubedns_latency_ms** <br>(count) | Latencia de la solicitud de sondeo DNS kubedns. Muestreo cada 60 segundos.<br>_Se muestra como milisegundo_ |
| **gcp.anthos.kubelet_certificate_manager_client_expiration_renew_errors** <br>(count) | Contador de errores de renovación de certificados. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_certificate_manager_client_expiration_seconds** <br>(gauge) | Indicador de la vida útil de un certificado. El valor es la fecha en que caducará el certificado en segundos desde el 1 de enero de 1970 UTC. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_certificate_manager_client_ttl_seconds** <br>(gauge) | Indicador del TTL (tiempo de vida) del certificado de cliente del Kubelet. El valor se indica en segundos hasta que caduque el certificado (negativo si ya ha caducado). Si el certificado del cliente no es válido o no se utiliza, el valor será +INF. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_certificate_manager_server_expiration_seconds** <br>(gauge) | Indicador de la vida útil de un certificado. El valor es la fecha en que caducará el certificado en segundos desde el 1 de enero de 1970 UTC. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_certificate_manager_server_rotation_seconds** <br>(count) | Histograma del número de segundos que vivió el certificado anterior antes de ser rotado. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_certificate_manager_server_ttl_seconds** <br>(gauge) | Indicador del TTL (tiempo de vida) más corto del certificado de servidor del Kubelet. El valor se indica en segundos hasta que caduque el certificado (negativo si ya ha caducado). Si el certificado no es válido o no se utiliza, el valor será +INF. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_cgroup_manager_duration_seconds** <br>(count) | Duración en segundos de las operaciones de cgroup manager. Desglosado por método. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos de las operaciones de cgroup manager. Desglosado por método. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de cgroup manager. Desglosado por método. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_cgroup_manager_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de cgroup manager. Desglosado por método. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_container_log_filesystem_used_bytes** <br>(gauge) | Bytes utilizados por los logs del contenedor en el sistema de archivos. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kubelet_containers_per_pod_count** <br>(count) | Número de contenedores por pod. Muestreo cada 60 segundos.<br>_Se muestra como contenedor_ |
| **gcp.anthos.kubelet_containers_per_pod_count_count** <br>(count) | Número de contenedores por pod. Muestreo cada 60 segundos.<br>_Se muestra como contenedor_ |
| **gcp.anthos.kubelet_containers_per_pod_count_sum** <br>(count) | Número de contenedores por pod. Muestreo cada 60 segundos.<br>_Se muestra como contenedor_ |
| **gcp.anthos.kubelet_docker_operations** <br>(count) | (Obsoleto) Número acumulado de operaciones Docker por tipo de operación. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_docker_operations_duration_seconds** <br>(count) | Latencia en segundos de las operaciones de Docker. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.kubelet_docker_operations_errors** <br>(count) | (Obsoleto) Número acumulado de errores de operación de Docker por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_docker_operations_errors_total** <br>(count) | Número acumulado de errores de operación de Docker por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos de las operaciones de Docker. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de Docker. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_docker_operations_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de Docker. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_docker_operations_timeout** <br>(count) | (Obsoleto) Número acumulado de tiempos de espera de operaciones de Docker por tipo de operación. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_docker_operations_timeout_total** <br>(count) | Número acumulado de tiempos de espera de operaciones Docker por tipo de operación. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_docker_operations_total** <br>(count) | Número acumulado de operaciones Docker por tipo de operación. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_http_inflight_requests** <br>(gauge) | Número de solicitudes http en vuelo. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.kubelet_http_requests_duration_seconds** <br>(count) | Duración en segundos para atender solicitudes http. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_http_requests_total** <br>(count) | Número de solicitudes http recibidas desde que se inició el servidor. Muestreo cada 60 segundos.<br>_Se muestra como solicitud_ |
| **gcp.anthos.kubelet_network_plugin_operations_duration_seconds** <br>(count) | Latencia en segundos de las operaciones del complemento de red. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos de las operaciones de los complementos de red. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de los complementos de red. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_network_plugin_operations_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones de los complementos de red. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_node_config_error** <br>(gauge) | Esta métrica es verdadera (1) si el nodo está experimentando un error relacionado con la configuración, falsa (0) en caso contrario. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_node_name** <br>(gauge) | El nombre del nodo. El recuento es siempre 1. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_pleg_discard_events** <br>(count) | Número de eventos de descarte en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como evento_ |
| **gcp.anthos.kubelet_pleg_last_seen_seconds** <br>(gauge) | Marca de tiempo en segundos cuando PLEG fue visto activo por última vez. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pleg_relist_duration_seconds** <br>(count) | Duración en segundos del cambio de lista de las cápsulas en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds** <br>(gauge) | (Obsoleto) Intervalo en microsegundos entre repetición de enlistado en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds_count** <br>(count) | (Obsoleto) Intervalo en microsegundos entre repetición de enlistado en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pleg_relist_interval_microseconds_sum** <br>(count) | (Obsoleto) Intervalo en microsegundos entre repetición de enlistado en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pleg_relist_interval_seconds** <br>(count) | Intervalo en segundos entre la repetición de enlistado en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos para la repetición de enlistado de pods en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos para la repetición de enlistado de pods en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pleg_relist_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos para la repetición de enlistado de pods en PLEG. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_start_duration_seconds** <br>(count) | Duración en segundos para que un pod pase de pendiente a en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos para que un pod pase de pendiente a en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos para que un pod pase de pendiente a en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_start_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos para que un pod pase de pendiente a en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_duration_seconds** <br>(count) | Duración en segundos de la sincronización de un pod. Desglosado por tipo de operación: crear, actualizar o sincronizar. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos para sincronizar un solo pod. Desglosado por tipo de operación: crear, actualizar o sincronizar. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos para sincronizar un solo pod. Desglosado por tipo de operación: crear, actualizar o sincronizar. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos para sincronizar un solo pod. Desglosado por tipo de operación: crear, actualizar o sincronizar. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_start_duration_seconds** <br>(count) | Duración en segundos desde que se ve un pod hasta que se inicia un worker. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos desde que se ve un pod hasta que se inicia un worker. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos desde que se ve un pod hasta que se inicia un worker. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_pod_worker_start_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos desde que se ve un pod hasta que se inicia un worker. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_run_podsandbox_duration_seconds** <br>(count) | Duración en segundos de las operaciones run_podsandbox. Desglosado por RuntimeClass.Handler. Muestreo cada 60 segundos.<br>_Se muestra como segundo_ |
| **gcp.anthos.kubelet_running_container_count** <br>(gauge) | Número de contenedores actualmente en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como contenedor_ |
| **gcp.anthos.kubelet_running_containers** <br>(gauge) | Número de contenedores actualmente en ejecución. Muestreo cada 60 segundos.<br>_Se muestra como contenedor_ |
| **gcp.anthos.kubelet_running_pod_count** <br>(gauge) | Número de pods en ejecución. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_running_pods** <br>(gauge) | Número de pods en ejecución. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_runtime_operations** <br>(count) | (Obsoleto) Número acumulado de operaciones en tiempo de ejecución por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como operación_ |
| **gcp.anthos.kubelet_runtime_operations_duration_seconds** <br>(count) | Duración en segundos de las operaciones en tiempo de ejecución. Desglosado por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra en segundos_ |
| **gcp.anthos.kubelet_runtime_operations_errors** <br>(count) | (Obsoleto) Número acumulado de errores de operación en tiempo de ejecución por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_runtime_operations_errors_total** <br>(count) | Número acumulado de errores de operación en tiempo de ejecución por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds** <br>(gauge) | (Obsoleto) Latencia en microsegundos de las operaciones en tiempo de ejecución. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds_count** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones en tiempo de ejecución. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_runtime_operations_latency_microseconds_sum** <br>(count) | (Obsoleto) Latencia en microsegundos de las operaciones en tiempo de ejecución. Desglosada por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.kubelet_runtime_operations_total** <br>(count) | Número acumulado de operaciones en tiempo de ejecución por tipo de operación. Muestreo cada 60 segundos.<br>_Se muestra como operación_ |
| **gcp.anthos.kubelet_server_expiration_renew_errors** <br>(count) | Contador de errores de renovación de certificados. Muestreo cada 60 segundos.<br>_Se muestra como error_ |
| **gcp.anthos.kubelet_volume_stats_available_bytes** <br>(gauge) | Número de bytes disponibles en el volumen. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kubelet_volume_stats_capacity_bytes** <br>(gauge) | Capacidad en bytes del volumen. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.kubelet_volume_stats_inodes** <br>(gauge) | Número máximo de inodos en el volumen. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_volume_stats_inodes_free** <br>(gauge) | Número de inodos libres en el volumen. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_volume_stats_inodes_used** <br>(gauge) | Número de inodos utilizados en el volumen. Muestreo cada 60 segundos.|
| **gcp.anthos.kubelet_volume_stats_used_bytes** <br>(gauge) | Número de bytes utilizados en el volumen. Muestreo cada 60 segundos.<br>_Se muestra como byte_ |
| **gcp.anthos.replicaset_adds** <br>(count) | (Obsoleto) Número total de adiciones gestionadas por la cola de trabajo: conjunto de réplicas. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_controller_rate_limiter_use** <br>(gauge) | Una métrica que mide la saturación del limitador de tasa para replicaset_controller. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_depth** <br>(gauge) | (Obsoleto) Profundidad actual de la cola de trabajo: conjunto de réplicas. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_longest_running_processor_microseconds** <br>(gauge) | (Obsoleto) Cuántos microsegundos ha estado funcionando el procesador más largo para replicaset. Muestreo cada 60 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.anthos.replicaset_queue_latency** <br>(gauge) | (Obsoleto) Tiempo que un elemento permanece en workqueuereplicaset antes de ser solicitado. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_queue_latency_count** <br>(count) | (Obsoleto) Tiempo que un elemento permanece en workqueuereplicaset antes de ser solicitado. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_queue_latency_sum** <br>(count) | (Obsoleto) Tiempo que un elemento permanece en workqueuereplicaset antes de ser solicitado. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_retries** <br>(count) | (Obsoleto) Número total de reintentos gestionados por la cola de trabajo: replicaset. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_unfinished_work_seconds** <br>(gauge) | (Obsoleto) Cuántos segundos de trabajo ha realizado replicaset que está en curso y no ha sido observado por work_duration. Valores grandes indican subprocesos atascados. Se puede deducir el número de subprocesos atascados observando la tasa a la que aumenta. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_work_duration** <br>(gauge) | (Obsoleto) Tiempo que tarda en procesarse un elemento de workqueuereplicaset. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_work_duration_count** <br>(count) | (Obsoleto) Tiempo que tarda en procesarse un elemento de workqueuereplicaset. Muestreo cada 60 segundos.|
| **gcp.anthos.replicaset_work_duration_sum** <br>(count) | (Obsoleto) Tiempo que tarda en procesarse un elemento de workqueuereplicaset. Muestreo cada 60 segundos.|

### Eventos

La integración de Google Cloud Anthos no incluye eventos.

### Checks de servicio

La integración de Google Cloud Anthos no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}