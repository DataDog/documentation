---
app_id: keda
categories:
- recopilación de logs
- métricas
- kubernetes
- seguridad
custom_kind: integración
description: Monitorizar el estado y el rendimiento de KEDA
integration_version: 2.0.0
media: []
supported_os:
- linux
- windows
- macos
title: KEDA
---
## Información general

Este check monitoriza [KEDA](https://keda.sh/) a través del Datadog Agent. Para obtener más información, consulta [Monitorización de KEDA](https://keda.sh/docs/2.16/integrations/prometheus/).

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir de la versión 7.62.0 del Agent, el check de KEDA se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu entorno.

### Configuración

KEDA consta de varios componentes, como el Controlador de admisiones, el servidor API de métricas y el Operator. Es posible extraer métricas de cada uno de estos componentes. Las métricas con formato Prometheus están disponibles en /metrics en el puerto 8080 para cada componente.

Para exponer estas métricas, asegúrate de que la extracción de Prometheus está activada para cada componente. Por ejemplo, en Helm, debes activar las siguientes opciones de configuración de Helm:

- prometheus.metricServer.enabled
- prometheus.operator.enabled
- prometheus.webhooks.enabled

También puedes lograrlo proporcionando la siguiente configuración en un archivo values.yaml utilizado durante la instalación Helm de KEDA:

```yaml
prometheus:
  metricServer:
    enabled: true
  operator:
    enabled: true
  webhooks:
    enabled: true
```

Para que el Agent empiece a recopilar métricas, es necesario anotar los pods del controlador KEDA. Para obtener más información sobre las anotaciones, consulta la guía de las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/). Puedes encontrar opciones de configuración adicionales consultando el [ejemplo keda.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/keda/datadog_checks/keda/data/conf.yaml.example).

**Nota**: Las métricas enumeradas solo pueden recopilarse si están disponibles. Algunas métricas se generan solo cuando se realizan determinadas acciones. Por ejemplo, la métrica `keda.scaler.detail_errors.count` se expone solo después de que un escalador encuentra un error.

El único parámetro necesario para configurar el check de KEDA es:

- `openmetrics_endpoint`: Este parámetro debe configurarse con la ubicación donde se exponen las métricas con formato Prometheus. El puerto por defecto es `8080`. En entornos con contenedores, debe utilizarse `%%host%%` para la [detección automática de hosts](https://docs.datadoghq.com/agent/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: | # <CONTAINER_NAME> Needs to match the container name at the bottom. 'keda-operator-metrics-apiserver' in this example.
      {
        "keda": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME> # e.g. 'keda-operator-metrics-apiserver' in the Metrics API Server
# (...)
```

Para recopilar métricas de cada componente KEDA, es necesario aplicar las anotaciones de pod anteriores a cada pod de componente KEDA. Ejemplo de anotaciones de pod para el pod del Operator:

```yaml
# Pod manifest from a basic Helm chart deployment
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: 'keda-operator'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "keda": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: keda-operator
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de KEDA pueden recopilarse de los distintos pods de KEDA a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://keda.sh/docs/2.16/integrations/prometheus/).

Consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "keda", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `keda` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **keda.aggregator_discovery_aggregation.count** <br>(count) | Número de veces que se ha agregado la detección.|
| **keda.apiserver_audit_event.count** <br>(count) | Número de eventos de auditoría generados y enviados al backend de auditoría.|
| **keda.apiserver_audit_requests_rejected.count** <br>(count) | Número de solicitudes al servidor API denegadas debido a un error en el backend de generación de logs de auditoría.<br>_Se muestra como solicitud_ |
| **keda.apiserver_client_certificate_expiration_seconds.bucket** <br>(count) | Número de certificados observados en el histograma apiserver_client_certificate_expiration_seconds etiquetado con etiquetas upper_bound.|
| **keda.apiserver_client_certificate_expiration_seconds.count** <br>(count) | Número de certificados observados en el histograma apiserver_client_certificate_expiration_seconds.|
| **keda.apiserver_client_certificate_expiration_seconds.sum** <br>(count) | Suma de la duración del tiempo de expiración restante de los certificados en el histograma apiserver_client_certificate_expiration_seconds.<br>_Se muestra en segundos_ |
| **keda.apiserver_current_inflight_requests** <br>(gauge) | Número máximo de límites de solicitudes de entrada utilizadas actualmente por este servidor API por tipo de solicitud en el último segundo.<br>_Se muestra como solicitud_ |
| **keda.apiserver_delegated_authz_request.count** <br>(count) | Número de solicitudes HTTP divididas por código de estado.<br>_Se muestra como solicitud_ |
| **keda.apiserver_delegated_authz_request_duration_seconds.bucket** <br>(count) | Número de observaciones del histograma apiserver_delegated_authz_request_duration_seconds. Desglosado por código de estado y etiquetas de duración upper_bound.|
| **keda.apiserver_delegated_authz_request_duration_seconds.count** <br>(count) | Número de observaciones del histograma apiserver_delegated_authz_request_duration_seconds. Desglosado por código de estado.|
| **keda.apiserver_delegated_authz_request_duration_seconds.sum** <br>(count) | Suma de la duración de las solicitudes en el histograma apiserver_delegated_authz_request_duration_seconds.<br>_Se muestra en segundos_ |
| **keda.apiserver_envelope_encryption_dek_cache_fill_percent** <br>(gauge) | Porcentaje de slots de caché ocupados actualmente por claves de cifrado de datos (DEK) almacenadas en caché.|
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.bucket** <br>(count) | Número de solicitudes (como fracción del límite relevante) a la espera o en ejecución al final de cada nanosegundo. Etiquetado con etiquetas upper_bound.<br>_Se muestra como solicitud_ |
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.count** <br>(count) | Número de solicitudes (como fracción del límite relevante) observado al final de cada nanosegundo.<br>_Se muestra como solicitud_ |
| **keda.apiserver_flowcontrol_read_vs_write_current_requests.sum** <br>(count) | Suma de todas las fracciones de solicitud observadas al final de cada nanosegundo.|
| **keda.apiserver_flowcontrol_seat_fair_frac** <br>(gauge) | Fracción justa de la concurrencia del servidor para asignar a cada nivel de prioridad que pueda utilizarla.|
| **keda.apiserver_request.count** <br>(count) | Número de solicitudes al servidor API desglosadas para cada verbo, valor de ejecución en seco, grupo, versión, recurso, contexto, componente y código de respuesta HTTP.<br>_Se muestra como solicitud_ |
| **keda.apiserver_request_duration_seconds.bucket** <br>(count) | Número de solicitudes utilizadas para calcular el tiempo de respuesta etiquetado con etiquetas upper_bound.<br>_Se muestra como solicitud_ |
| **keda.apiserver_request_duration_seconds.count** <br>(count) | Número de solicitudes utilizadas para calcular el tiempo de respuesta.<br>_Se muestra como solicitud_ |
| **keda.apiserver_request_duration_seconds.sum** <br>(count) | Suma del tiempo de respuesta en segundos para cada verbo, valor de ejecución en seco, grupo, versión, recurso, subrecurso, contexto y componente.<br>_Se muestra en segundos_ |
| **keda.apiserver_request_filter_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular la latencia del filtro de solicitudes etiquetado con etiquetas upper_bound.|
| **keda.apiserver_request_filter_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular la latencia del filtro de solicitudes.|
| **keda.apiserver_request_filter_duration_seconds.sum** <br>(count) | Distribución de la latencia del filtro de solicitudes en segundos para cada tipo de filtro.<br>_Se muestra en segundos_ |
| **keda.apiserver_request_sli_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de SLI etiquetado con etiquetas upper_bound.|
| **keda.apiserver_request_sli_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de SLI.|
| **keda.apiserver_request_sli_duration_seconds.sum** <br>(count) | Suma del tiempo de respuesta (sin contar la duración del webhook y los tiempos de espera de las colas de prioridad y equidad) en segundos para cada verbo, grupo, versión, recurso, subrecurso, contexto y componente.<br>_Se muestra en segundos_ |
| **keda.apiserver_request_slo_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de SLO etiquetado con etiquetas upper_bound.|
| **keda.apiserver_request_slo_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de SLO.|
| **keda.apiserver_request_slo_duration_seconds.sum** <br>(count) | Suma del tiempo de respuesta (sin contar la duración del webhook y los tiempos de espera de las colas de prioridad y equidad) en segundos para cada verbo, grupo, versión, recurso, subrecurso, contexto y componente.<br>_Se muestra en segundos_ |
| **keda.apiserver_response_sizes.bucket** <br>(count) | Número de respuestas utilizadas para calcular el tamaño de respuesta etiquetado con etiquetas upper_bound.|
| **keda.apiserver_response_sizes.count** <br>(count) | Número de respuestas utilizadas para calcular el tamaño de la respuesta.|
| **keda.apiserver_response_sizes.sum** <br>(count) | Suma de tamaños de las respuestas en bytes para cada grupo, versión, verbo, recurso, subrecurso, contexto y componente.<br>_Se muestra en bytes_ |
| **keda.apiserver_storage_data_key_generation_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular la duración de las claves de cifrado de datos (DEK) etiquetado con etiquetas upper_bound.|
| **keda.apiserver_storage_data_key_generation_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular la duración de las claves de cifrado de datos (DEK).|
| **keda.apiserver_storage_data_key_generation_duration_seconds.sum** <br>(count) | Tiempo en segundos utilizado para las operaciones de generación de las claves de cifrado de datos (DEK).<br>_Se muestra en segundos_ |
| **keda.apiserver_storage_data_key_generation_failures.count** <br>(count) | Número de operaciones fallidas de generación de claves de cifrado de datos (DEK).|
| **keda.apiserver_storage_envelope_transformation_cache_misses.count** <br>(count) | Número de fallos de caché al acceder a una clave de descifrado (KEK).|
| **keda.apiserver_tls_handshake_errors.count** <br>(count) | Número de solicitudes descartadas con el error 'TLS handshake error from'.|
| **keda.apiserver_webhooks_x509_insecure_sha1.count** <br>(count) | Recuento del número de solicitudes a servidores con firmas SHA1 inseguras en su certificado de servidor o del número de fallos de conexión debidos a firmas SHA1 inseguras (uno u otro, en función del entorno de ejecución).|
| **keda.apiserver_webhooks_x509_missing_san.count** <br>(count) | Recuento del número de solicitudes a servidores a los que les falta la extensión SAN en su certificado de servidor o del número de fallos de conexión debidos a la falta de la extensión SAN del certificado x509 (uno u otro, en función del entorno de ejecución).|
| **keda.authenticated_user_requests.count** <br>(count) | Número de solicitudes autenticadas desglosadas por nombre de usuario.<br>_Se muestra como solicitud_ |
| **keda.authentication_attempts.count** <br>(count) | Número de intentos autenticados.|
| **keda.authentication_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular la duración de la autenticación etiquetado con etiquetas de bucket upper_bound.|
| **keda.authentication_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular la duración de la autenticación.|
| **keda.authentication_duration_seconds.sum** <br>(count) | Duración de la autenticación en segundos desglosada por resultado.<br>_Se muestra en segundos_ |
| **keda.authorization_attempts.count** <br>(count) | Número de intentos de autorización desglosado por resultado. Puede ser 'permitido', 'denegado', 'sin opinión' o 'error'.|
| **keda.authorization_duration_seconds.bucket** <br>(count) | Número de eventos utilizados para calcular la duración de la autorización etiquetado con etiquetas upper_bound.|
| **keda.authorization_duration_seconds.count** <br>(count) | Número de eventos utilizados para calcular la duración de la autorización.|
| **keda.authorization_duration_seconds.sum** <br>(count) | Duración de la autorización en segundos desglosada por resultado.<br>_Se muestra en segundos_ |
| **keda.build_info** <br>(gauge) | Métrica de información, con información estática sobre la compilación de KEDA como: versión, commit de git e información del tiempo de ejecución de Golang.|
| **keda.cardinality_enforcement_unexpected_categorizations.count** <br>(count) | Recuento de categorizaciones inesperadas durante la aplicación de la cardinalidad.|
| **keda.certwatcher.read_certificate.count** <br>(count) | Número de lecturas de certificados.|
| **keda.certwatcher.read_certificate_errors.count** <br>(count) | Número de errores de lectura de certificados.<br>_Se muestra como error_ |
| **keda.controller.runtime.active_workers** <br>(gauge) | Número de workers utilizados actualmente por controlador.|
| **keda.controller.runtime.max_concurrent_reconciles** <br>(gauge) | Número máximo de conciliaciones simultáneas por controlador.|
| **keda.controller.runtime.reconcile.count** <br>(count) | Número de conciliaciones por controlador.|
| **keda.controller.runtime.reconcile_errors.count** <br>(count) | Número de errores de conciliación por controlador.|
| **keda.controller.runtime.reconcile_panics.count** <br>(count) | Número de pánicos de conciliación por controlador.|
| **keda.controller.runtime.reconcile_time.seconds.bucket** <br>(count) | Número de eventos observados para calcular el tiempo de conciliación etiquetado con etiquetas upper_bound.|
| **keda.controller.runtime.reconcile_time.seconds.count** <br>(count) | Número de eventos observados para calcular el tiempo de conciliación.|
| **keda.controller.runtime.reconcile_time.seconds.sum** <br>(count) | Tiempo por conciliación por controlador.<br>_Se muestra en segundos_ |
| **keda.controller.runtime.terminal_reconcile_errors.count** <br>(count) | Número de errores de conciliación de terminales por controlador.|
| **keda.controller.runtime.webhook_panics.count** <br>(count) | Número de pánicos de webhook.|
| **keda.controller.runtime.webhook_requests.count** <br>(count) | Número de solicitudes de admisión por código de estado HTTP.|
| **keda.controller.runtime.webhook_requests_in_flight** <br>(gauge) | Número actual de solicitudes de admisión atendidas.|
| **keda.disabled_metrics.count** <br>(count) | Recuento de métricas desactivadas.|
| **keda.field_validation_request_duration_seconds.bucket** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de validaciones de campos etiquetado con etiquetas upper_bound.|
| **keda.field_validation_request_duration_seconds.count** <br>(count) | Número de observaciones utilizadas para calcular el tiempo de respuesta de validaciones de campos.|
| **keda.field_validation_request_duration_seconds.sum** <br>(count) | Tiempo de respuesta en segundos para cada valor de validación de campos.<br>_Se muestra en segundos_ |
| **keda.go.gc.duration.seconds.count** <br>(count) | Resumen del recuento de ciclos de recolección de basura en la instancia Keda.|
| **keda.go.gc.duration.seconds.quantile** <br>(gauge) | Resumen de la duración de las pausas de ciclos de recolección de basura en la instancia Keda.|
| **keda.go.gc.duration.seconds.sum** <br>(count) | Suma de la duración de las pausas de ciclos de recolección de basura en la instancia Keda.|
| **keda.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente.|
| **keda.go.info** <br>(gauge) | Información sobre el entorno Go.|
| **keda.go.memstats.alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso.<br>_Se muestra en bytes_ |
| **keda.go.memstats.alloc_bytes.count** <br>(count) | Número de bytes asignados, aunque se hayan liberado.<br>_Se muestra en bytes_ |
| **keda.go.memstats.buck_hash.sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra en bytes_ |
| **keda.go.memstats.frees.count** <br>(count) | Número de libres.|
| **keda.go.memstats.gc.sys_bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recolección de basura.<br>_Se muestra en bytes_ |
| **keda.go.memstats.heap.alloc_bytes** <br>(gauge) | Número de bytes del heap asignados y aún en uso.<br>_Se muestra en bytes_ |
| **keda.go.memstats.heap.idle_bytes** <br>(gauge) | Número de bytes heap a la espera de ser utilizados.<br>_Se muestra en bytes_ |
| **keda.go.memstats.heap.inuse_bytes** <br>(gauge) | Número de bytes heap en uso.<br>_Se muestra en bytes_ |
| **keda.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados.|
| **keda.go.memstats.heap.released_bytes** <br>(gauge) | Número de bytes heap liberados al sistema operativo.<br>_Se muestra en bytes_ |
| **keda.go.memstats.heap.sys_bytes** <br>(gauge) | Número de bytes heap obtenidos del sistema.<br>_Se muestra en bytes_ |
| **keda.go.memstats.lookups.count** <br>(count) | Número de búsquedas de punteros.|
| **keda.go.memstats.mallocs.count** <br>(count) | Número de mallocs.|
| **keda.go.memstats.mcache.inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mcache.<br>_Se muestra en bytes_ |
| **keda.go.memstats.mcache.sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mcache obtenidas del sistema.<br>_Se muestra en bytes_ |
| **keda.go.memstats.mspan.inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mspan.<br>_Se muestra en bytes_ |
| **keda.go.memstats.mspan.sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mspan obtenidas del sistema.<br>_Se muestra en bytes_ |
| **keda.go.memstats.next.gc_bytes** <br>(gauge) | Número de bytes heap en que se realizará la próxima recolección de basura.<br>_Se muestra en bytes_ |
| **keda.go.memstats.other.sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra en bytes_ |
| **keda.go.memstats.stack.inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stacks tecnológicos.<br>_Se muestra en bytes_ |
| **keda.go.memstats.stack.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stacks tecnológicos.<br>_Se muestra en bytes_ |
| **keda.go.memstats.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema.<br>_Se muestra en bytes_ |
| **keda.go.memstats.time_since_last_gc.seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recolección de basura.<br>_Se muestra en segundos_ |
| **keda.go.threads** <br>(gauge) | Número de subprocesos de sistema operativo creados.|
| **keda.hidden_metrics.count** <br>(count) | Recuento de métricas ocultas.|
| **keda.internal_metricsservice.grpc_client_handled.count** <br>(count) | Número de RPC completadas por el cliente, independientemente de su éxito o fracaso.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.bucket** <br>(count) | Número de eventos utilizados para calcular el tiempo de respuesta etiquetado con etiquetas de bucket upper_bound.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.count** <br>(count) | Número de eventos utilizados para calcular el tiempo de respuesta.|
| **keda.internal_metricsservice.grpc_client_handling_seconds.sum** <br>(count) | Tiempo de respuesta (en segundos) de una gRPC hasta que es finalizada por la aplicación.|
| **keda.internal_metricsservice.grpc_client_msg_received.count** <br>(count) | Número de mensajes de flujo de RPC recibidos por el cliente.|
| **keda.internal_metricsservice.grpc_client_msg_sent.count** <br>(count) | Número de mensajes de flujo de gRPC enviados por el cliente.|
| **keda.internal_metricsservice.grpc_client_started.count** <br>(count) | Número de RPC iniciadas en el cliente.|
| **keda.internal_scale.loop_latency** <br>(gauge) | (Keda \<v2.16) La desviación (en segundos) entre el tiempo de ejecución esperado y el tiempo de ejecución real para el bucle de escalado.<br>_Se muestra como segundo_ |
| **keda.internal_scale.loop_latency_seconds** <br>(gauge) | (Keda >=v2.16) La desviación (en segundos) entre el tiempo de ejecución previsto y el tiempo de ejecución real para el bucle de escalado.<br>_Se muestra como segundo_ |
| **keda.leader_election.master_status** <br>(gauge) | Indica si el sistema de notificación es el principal del contrato de arrendamiento en cuestión. 0 indica copia de seguridad, 1 indica principal. El 'nombre' es la cadena utilizada para identificar el contrato de arrendamiento. Asegúrate de agrupar por nombre.|
| **keda.process.cpu.seconds.count** <br>(count) | Tiempo de CPU del usuario y del sistema empleado en segundos.|
| **keda.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **keda.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **keda.process.resident_memory.bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.|
| **keda.process.uptime.seconds** <br>(gauge) | Tiempo en segundos que ha estado activo el proceso.<br>_Se muestra en segundos_ |
| **keda.process.virtual_memory.bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra en bytes_ |
| **keda.process.virtual_memory.max_bytes** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes.<br>_Se muestra en bytes_ |
| **keda.registered_metrics.count** <br>(count) | Recuento de métricas registradas desglosado por nivel de estabilidad y versión de obsolescencia.|
| **keda.resource_registered** <br>(gauge) | (Keda >=v2.16) Número de recursos personalizados KEDA por espacio de nombres para cada tipo de recurso personalizado (CRD) registrado.|
| **keda.resource_totals** <br>(gauge) | (Keda \<v2.16) Número de recursos personalizados KEDA por espacio de nombres para cada tipo de recurso personalizado (CRD) registrado.|
| **keda.rest.client.requests.count** <br>(count) | Número de solicitudes HTTP, divididas por código de estado, método y host<br>_Se muestra como solicitud_ |
| **keda.scaled_job.errors.count** <br>(count) | Número de errores de trabajos escalados.|
| **keda.scaler.active** <br>(gauge) | Indica si un escalador está activo (1), o no (0).|
| **keda.scaler.detail_errors.count** <br>(count) | (Keda >=v2.16) Número de errores encontrados para cada escalador.|
| **keda.scaler.errors.count** <br>(count) | (Keda \<v2.16) Número de errores encontrados para cada escalador|
| **keda.scaler.metrics_latency** <br>(gauge) | (Keda \<v2.16) La latencia de la recuperación de la métrica actual de cada escalador, en segundos.<br>_Se muestra como segundo_ |
| **keda.scaler.metrics_latency_seconds** <br>(gauge) | (Keda >=v2.16) Latencia de recuperación de la métrica actual de cada escalador, en segundos.<br>_Se muestra en segundos_ |
| **keda.scaler.metrics_value** <br>(gauge) | Valor actual de la métrica de cada escalador que utilizaría la HPA para calcular la media objetivo.|
| **keda.trigger_registered** <br>(gauge) | (Keda >=v2.16) Número de activaciones por tipo de activación registrado.|
| **keda.trigger_totals** <br>(gauge) | (Keda \<v2.16) Número de disparos por tipo de disparo registrados.|
| **keda.workqueue.adds.count** <br>(count) | Número de adiciones gestionadas por la cola de trabajo.|
| **keda.workqueue.depth** <br>(gauge) | Profundidad actual de la cola de trabajo.|
| **keda.workqueue.longest.running_processor.seconds** <br>(gauge) | Cantidad de segundos que se ha estado ejecutando el procesador que más tiempo lleva en cola de trabajo.<br>_Se muestra en segundos_ |
| **keda.workqueue.queue.duration.seconds.bucket** <br>(count) | Bucket del histograma del tiempo en segundos que permanece un elemento en la cola de trabajo antes de ser solicitado.|
| **keda.workqueue.queue.duration.seconds.count** <br>(count) | Número total de eventos en el histograma de duración de la cola de trabajo|
| **keda.workqueue.queue.duration.seconds.sum** <br>(count) | Suma acumulada del tiempo (en segundos) que los elementos han pasado en la cola de trabajo.<br>_Se muestra en segundos_ |
| **keda.workqueue.retries.count** <br>(count) | Número de reintentos gestionados por la cola de trabajo.|
| **keda.workqueue.unfinished_work.seconds** <br>(gauge) | Cantidad de segundos de trabajo que se han realizado, están en curso y no han sido observados por work_duration. Los mayores valores indican subprocesos bloqueados. Se puede deducir el número de subprocesos bloqueados observando la velocidad a la que aumenta.<br>_Se muestra en segundos_ |
| **keda.workqueue.work.duration.seconds.bucket** <br>(count) | Número de elementos de trabajo que se han procesado en la cola de trabajo etiquetado con etiquetas de bucket upper_bound.|
| **keda.workqueue.work.duration.seconds.count** <br>(count) | Número total de elementos de trabajo que se han procesado en la cola de trabajo.|
| **keda.workqueue.work.duration.seconds.sum** <br>(count) | Suma acumulada del tiempo empleado en procesar todos los elementos de trabajo de la cola de trabajo.<br>_Se muestra en segundos_ |

### Eventos

La integración de KEDA no incluye eventos.

### Checks de servicio

**keda.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Keda OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).