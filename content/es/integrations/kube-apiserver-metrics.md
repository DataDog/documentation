---
aliases:
- /es/integrations/kube_apiserver_metrics
app_id: kube-apiserver-metrics
categories:
- rastreo
- kubernetes
custom_kind: integración
description: Recopilación de métricas del servidor de API Kubernetes
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Métricas del servidor de API Kubernetes
---
![Dashboard del servidor de API de Kubernetes](https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png)

## Información general

Este check monitoriza [Kube_apiserver_metrics](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver).

## Configuración

### Instalación

El check Kube_apiserver_metrics está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

### Configuración

Si tu clúster de Kubernetes tiene nodos maestros y está ejecutando un pod y un contenedor para la imagen `kube-apiserver`, el Datadog Agent [detecta automáticamente](https://docs.datadoghq.com/agent/kubernetes/integrations/) este pod y configura la integración relativa a tu archivo `kube_apiserver_metrics.d/auto_conf.yaml`.

Sin embargo, si usas una distribución de Kubernetes gestionada como GKE, EKS o AKS, es posible que no tengas un pod `kube-apiserver` en ejecución para que el Agent lo detecte.

En este caso, puedes configurar la integración con el servicio `kubernetes` en el espacio de nombres `default`.

- El caso de uso principal para ejecutar el check `kube_apiserver_metrics` es como un [Check a nivel de clúster](https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/).
- Puedes hacerlo con [anotaciones en tu servicio](#annotate-service), o utilizando un [archivo local](#local-file) a través del Datadog Operator, el Helm chart o manualmente.
- Para recopilar métricas, establece los siguientes parámetros y valores en una plantilla  de [Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/).

| Parámetro         | Valor                                                                 |
|-------------------|-----------------------------------------------------------------------|
| `<INTEGRATION_NAME>`| `["kube_apiserver_metrics"]`                                            |
| `<INIT_CONFIG>`     | `[{}]`                                                                  |
| `<INSTANCE_CONFIG>` | `[{"prometheus_url": "https://%%host%%:%%port%%/metrics"}]` |

Puedes revisar todas las opciones de configuración disponibles en [kube_apiserver_metrics.yaml](https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example).

#### Servicio de anotaciones

Puedes anotar el servicio de Kubernetes en tu espacio de nombres `default` con lo siguiente:

{{< tabs >}}

{{% tab "Annotations v2 (for Datadog Agent v7.36)" %}}

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "kube_apiserver_metrics": {
      "instances": [
        {
          "prometheus_url": "https://%%host%%:%%port%%/metrics"
        }
      ]
    }
  }
```

{{% /tab %}}

{{% tab "Annotations v1 (for Datadog Agent \< v7.36)" %}}

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics"}]'
```

{{% /tab %}}

{{< /tabs >}}

A continuación, el Datadog Cluster Agent programa los checks de cada endpoint en Datadog Agent(s).

#### Archivo local

También puedes ejecutar el check configurando los endpoints directamente en el archivo `kube_apiserver_metrics.yaml`, en la carpeta `conf.d/` de la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para enviarlo como un [Check de clúster](https:docs.datadoghq.com//containers/cluster_agent/clusterchecks/?tab=datadogoperator#setting-up-check-configurations).

**Nota**: Debes añadir `cluster_check: true` a tu archivo de configuración si usas un archivo local o ConfigMap para configurar los checks de clúster.

Proporciona una [configuración](https://docs.datadoghq.com/containers/cluster_agent/clusterchecks/?tab=helm#configuration-from-configuration-files) a tu Cluster Agent para configurar un check de clúster:

{{< tabs >}}

{{% tab "Helm" %}}

```yaml
clusterAgent:
  confd:
    kube_apiserver_metrics.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "kubernetes"
            namespace: "default"
      cluster_check: true
      init_config:
      instances:
        - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{% tab "Operator" %}}

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          kube_apiserver_metrics.yaml: |-
            advanced_ad_identifiers:
              - kube_endpoints:
                  name: "kubernetes"
                  namespace: "default"
            cluster_check: true
            init_config:
            instances:
              - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{< /tabs >}}

Estas configuraciones hacen que el Agent realice una solicitud al servicio `kubernetes` en el espacio de nombres `default` en sus direcciones IP de endpoint y puerto definidos.

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) y busca `kube_apiserver_metrics` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kube_apiserver.APIServiceRegistrationController_depth** <br>(gauge) | La profundidad actual de la cola de trabajo: APIServiceRegistrationController|
| **kube_apiserver.admission_controller_admission_duration_seconds.count** <br>(count) | El histograma de latencia del controlador de admisión en segundos identificado por nombre y desglosado para cada operación y recurso de API y recuento de tipo (validar o admitir)|
| **kube_apiserver.admission_controller_admission_duration_seconds.sum** <br>(gauge) | El histograma de latencia del controlador de admisión en segundos identificado por nombre y desglosado para cada operación y recurso de API y tipo (validar o admitir)<br>_Se muestra en segundos_ |
| **kube_apiserver.admission_step_admission_latencies_seconds.count** <br>(count) | El histograma de latencia de subpaso de admisión desglosado para cada operación y recurso de API y recuento de tipo de paso (validar o admitir).|
| **kube_apiserver.admission_step_admission_latencies_seconds.sum** <br>(gauge) | La latencia del subpaso de admisión desglosada para cada operación y recurso de API y tipo de paso (validar o admitir)<br>_Se muestra en segundos_ |
| **kube_apiserver.admission_step_admission_latencies_seconds_summary.count** <br>(count) | El resumen de latencia del subpaso de admisión desglosado para cada operación y recurso de API y recuento de tipo de paso (validar o admitir)|
| **kube_apiserver.admission_step_admission_latencies_seconds_summary.quantile** <br>(gauge) | El resumen de latencia del subpaso de admisión desglosado para cada operación y recurso de la API y cuantil del tipo de paso (validar o admitir)<br>_Se muestra como segundo_ |
| **kube_apiserver.admission_step_admission_latencies_seconds_summary.sum** <br>(gauge) | El resumen de latencia del subpaso de admisión desglosado para cada operación y recurso de API y tipo de paso (validar o admitir)<br>_Se muestra en segundos_ |
| **kube_apiserver.admission_webhook_admission_latencies_seconds.count** <br>(count) | La latencia del webhook de admisión identificada por nombre y desglosada para cada operación y recurso de API y recuento de tipo (validar o admitir)|
| **kube_apiserver.admission_webhook_admission_latencies_seconds.sum** <br>(gauge) | La latencia del webhook de admisión identificada por nombre y desglosada para cada operación y recurso de API y tipo (validar o admitir)<br>_Se muestra en segundos_ |
| **kube_apiserver.aggregator_unavailable_apiservice** <br>(gauge) | Indicador de APIServices marcado como no disponible desglosado por nombre de APIService (alfa; Kubernetes 1.14+)|
| **kube_apiserver.apiserver_admission_webhook_fail_open_count** <br>(gauge) | Recuento de fallos abiertos del webhook de admisión, identificados por nombre y desglosados para cada tipo de admisión (validación o mutación).|
| **kube_apiserver.apiserver_admission_webhook_fail_open_count.count** <br>(count) | Recuento de fallos abiertos del webhook de admisión, identificados por nombre y desglosados para cada tipo de admisión (validación o mutación).|
| **kube_apiserver.apiserver_admission_webhook_request_total** <br>(gauge) | Total de solicitudes del webhook de admisión, identificadas por nombre y desglosadas por cada tipo de admisión (alfa; Kubernetes 1.23+)|
| **kube_apiserver.apiserver_admission_webhook_request_total.count** <br>(count) | Total de solicitudes del webhook de admisión, identificadas por nombre y desglosadas por cada tipo de admisión (alfa; Kubernetes 1.23+)|
| **kube_apiserver.apiserver_dropped_requests_total** <br>(gauge) | Número acumulado de solicitudes abandonadas con la respuesta "Inténtalo de nuevo más tarde"<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_dropped_requests_total.count** <br>(count) | El recuento monótono de solicitudes abandonadas con la respuesta "Inténtalo de nuevo más tarde"<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_request_count** <br>(gauge) | El número acumulado de solicitudes apiserver desglosado para cada cliente de recursos de API verbo y respuesta HTTP contentType y código (obsoleto en Kubernetes 1.15)<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_request_count.count** <br>(count) | El recuento monotónico de solicitudes apiserver desglosado para cada cliente de recursos de API verbo y respuesta HTTP contentType y código (obsoleto en Kubernetes 1.15)<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_request_terminations_total.count** <br>(count) | El número de solicitudes que el apiserver terminó en defensa propia (Kubernetes 1.17+)<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_request_total** <br>(gauge) | El número acumulado de solicitudes apiserver desglosado para cada cliente de recursos de API verbo y respuesta HTTP contentType y código (Kubernetes 1.15+; reemplaza apiserver_request_count)<br>_Se muestra como solicitud_ |
| **kube_apiserver.apiserver_request_total.count** <br>(count) | El recuento monotónico de solicitudes apiserver desglosado para cada cliente de recursos de API verbo y respuesta HTTP contentType y código (Kubernetes 1.15+; reemplaza apiserver_request_count.count)<br>_Se muestra como solicitud_ |
| **kube_apiserver.audit_event** <br>(gauge) | El número acumulado de eventos de auditoría generados y enviados al backend de auditoría<br>_Se muestra como evento_ |
| **kube_apiserver.audit_event.count** <br>(count) | El recuento monotónico de eventos de auditoría generados y enviados al backend de auditoría<br>_Se muestra como evento_ |
| **kube_apiserver.authenticated_user_requests** <br>(gauge) | Número acumulado de solicitudes autenticadas desglosadas por nombre de usuario<br>_Se muestra como solicitud_ |
| **kube_apiserver.authenticated_user_requests.count** <br>(count) | El recuento monotónico de solicitudes autenticadas desglosadas por nombre de usuario<br>_Se muestra como solicitud_ |
| **kube_apiserver.authentication_attempts.count** <br>(count) | El contador de intentos autentificados (Kubernetes 1.16+)<br>_Se muestra como solicitud_ |
| **kube_apiserver.authentication_duration_seconds.count** <br>(count) | El histograma de duración de la autenticación desglosado por resultado (Kubernetes 1.17+)|
| **kube_apiserver.authentication_duration_seconds.sum** <br>(gauge) | El histograma de duración de la autenticación desglosado por resultado (Kubernetes 1.17+)<br>_Se muestra como segundo_ |
| **kube_apiserver.current_inflight_requests** <br>(gauge) | El número máximo de solicitudes de inflight utilizadas actualmente por este apiserver por tipo de solicitud en el último segundo.|
| **kube_apiserver.envelope_encryption_dek_cache_fill_percent** <br>(gauge) | Porcentaje de las ranuras de caché ocupadas actualmente por DEK en caché.|
| **kube_apiserver.etcd.db.total_size** <br>(gauge) | El tamaño total del archivo de base de datos etcd asignado físicamente en bytes (alfa; Kubernetes 1.19+)<br>_Se muestra como byte_ |
| **kube_apiserver.etcd_object_counts** <br>(gauge) | El número de objetos almacenados en el momento del último check divididos por tipo (alfa; obsoleto en Kubernetes 1.22)<br>_Se muestra como objeto_ |
| **kube_apiserver.etcd_request_duration_seconds.count** <br>(count) | Recuento de latencias de solicitud Etcd para cada operación y tipo de objeto (alfa)|
| **kube_apiserver.etcd_request_duration_seconds.sum** <br>(gauge) | Latencias de solicitud Etcd para cada operación y tipo de objeto (alfa)<br>_Se muestra en segundos_ |
| **kube_apiserver.etcd_request_errors_total** <br>(count) | Recuento de solicitudes fallidas Etcd para cada operación y tipo de objeto<br>_Se muestra como solicitud_ |
| **kube_apiserver.etcd_requests_total** <br>(count) | Recuento de solicitudes Etcd para cada operación y tipo de objeto<br>_Se muestra como solicitud_ |
| **kube_apiserver.flowcontrol_current_executing_requests** <br>(gauge) | Número de solicitudes en fase de ejecución inicial (para un WATCH) o cualquiera (para un no WATCH) en el subsistema Prioridad y equidad de la API|
| **kube_apiserver.flowcontrol_current_executing_seats** <br>(gauge) | Número de puestos (unidades de concurrencia) ocupados actualmente por solicitudes en ejecución en el subsistema de prioridad y equidad de la API.|
| **kube_apiserver.flowcontrol_current_inqueue_requests** <br>(count) | Número de solicitudes pendientes en las colas del subsistema de prioridad y equidad de la API|
| **kube_apiserver.flowcontrol_dispatched_requests_total** <br>(count) | Número de solicitudes ejecutadas por el subsistema de prioridad y equidad de la API|
| **kube_apiserver.flowcontrol_nominal_limit_seats** <br>(gauge) | Límite nominal del número de puestos en ejecución disponibles para las solicitudes en el subsistema de prioridad y equidad de la API.|
| **kube_apiserver.flowcontrol_rejected_requests_total.count** <br>(count) | Número de solicitudes rechazadas por el subsistema de prioridad y equidad de la API|
| **kube_apiserver.flowcontrol_request_concurrency_limit** <br>(gauge) | Límite de concurrencia compartida en el subsistema de prioridad y equidad de la API|
| **kube_apiserver.flowcontrol_request_wait_duration_seconds.count** <br>(count) | El recuento del histograma de la duración de la espera de la solicitud en el subsistema de prioridad y equidad de la API.|
| **kube_apiserver.flowcontrol_request_wait_duration_seconds.sum** <br>(gauge) | La suma del histograma de la duración de la espera de la solicitud en el subsistema de prioridad y equidad de la API<br>_Se muestra en segundos_ |
| **kube_apiserver.go_goroutines** <br>(gauge) | El número de goroutines que existen actualmente|
| **kube_apiserver.go_threads** <br>(gauge) | El número de subprocesos de SO creados<br>_Se muestra como subproceso_ |
| **kube_apiserver.grpc_client_handled_total** <br>(count) | El número total de RPCs completadas por el cliente independientemente del éxito o fracaso<br>_Se muestra como solicitud_ |
| **kube_apiserver.grpc_client_msg_received_total** <br>(count) | El número total de mensajes de flujo gRPC recibidos por el cliente<br>_Se muestra como mensaje_ |
| **kube_apiserver.grpc_client_msg_sent_total** <br>(count) | El número total de mensajes de flujo gRPC enviados por el cliente<br>_Se muestra como mensaje_ |
| **kube_apiserver.grpc_client_started_total** <br>(count) | El número total de RPCs iniciados en el cliente<br>_Se muestra como solicitud_ |
| **kube_apiserver.http_requests_total** <br>(gauge) | El número acumulado de solicitudes HTTP realizadas<br>_Se muestra como solicitud_ |
| **kube_apiserver.http_requests_total.count** <br>(count) | El recuento monotónico del número de solicitudes HTTP realizadas<br>_Se muestra como solicitud_ |
| **kube_apiserver.kubernetes_feature_enabled** <br>(gauge) | Si una puerta de función de Kubernetes está activada o no, identificada por el nombre y fase (alfa; Kubernetes 1.26+)|
| **kube_apiserver.longrunning_gauge** <br>(gauge) | El indicador de todas las solicitudes apiserver activas de larga duración desglosadas por verbo, grupo, versión, recurso, ámbito y componente. No todas las solicitudes se registran de esta manera.<br>_Se muestra como solicitud_ |
| **kube_apiserver.process_cpu_total** <br>(count) | Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra como segundo_ |
| **kube_apiserver.process_resident_memory_bytes** <br>(gauge) | El tamaño de la memoria residente en bytes<br>_Se muestra como byte_ |
| **kube_apiserver.process_virtual_memory_bytes** <br>(gauge) | El tamaño de la memoria virtual en bytes<br>_Se muestra como byte_ |
| **kube_apiserver.registered_watchers** <br>(gauge) | El número de observadores registrados actualmente para un recurso determinado<br>_Se muestra como objeto_ |
| **kube_apiserver.request_duration_seconds.count** <br>(count) | La distribución de la latencia de respuesta en segundos para cada verbo, valor de ejecución en seco, grupo, versión, recurso, subrecurso, ámbito y recuento de componentes.|
| **kube_apiserver.request_duration_seconds.sum** <br>(gauge) | La distribución de la latencia de respuesta en segundos para cada verbo, valor de ejecución en seco, grupo, versión, recurso, subrecurso, ámbito y componente<br>_Se muestra en segundos_ |
| **kube_apiserver.request_latencies.count** <br>(count) | La distribución de la latencia de respuesta en microsegundos para cada verbo, recurso y subrecurso.|
| **kube_apiserver.request_latencies.sum** <br>(gauge) | La distribución de la latencia de respuesta en microsegundos para cada verbo, recurso y subrecurso<br>_Se muestra como microsegundo_ |
| **kube_apiserver.requested_deprecated_apis** <br>(gauge) | Indicador de las APIs obsoletas que se han solicitado, desglosadas por grupo de API, versión, recurso, subrecurso y versión eliminada<br>_Se muestra como solicitud_ |
| **kube_apiserver.rest_client_request_latency_seconds.count** <br>(count) | La latencia de la solicitud en segundos desglosada por verbo y URL|
| **kube_apiserver.rest_client_request_latency_seconds.sum** <br>(gauge) | La latencia de la solicitud en segundos desglosada por verbo y URL<br>_Se muestra en segundos_ |
| **kube_apiserver.rest_client_requests_total** <br>(gauge) | Número acumulado de solicitudes HTTP divididas por método de código de estado y host<br>_Se muestra como solicitud_ |
| **kube_apiserver.rest_client_requests_total.count** <br>(count) | El recuento monótono de solicitudes HTTP dividido por método de código de estado y host<br>_Se muestra como solicitud_ |
| **kube_apiserver.slis.kubernetes_healthcheck** <br>(gauge) | Resultado de un único check de estado del apiserver de kubernetes (alfa; requiere k8s v1.26+)|
| **kube_apiserver.slis.kubernetes_healthcheck_total** <br>(count) | El recuento monotónico de todos los checks de estado del apiserver de kubernetes (alfa; requiere k8s v1.26+)|
| **kube_apiserver.storage_list_evaluated_objects_total** <br>(gauge) | Número de objetos comprobados durante el servicio de una solicitud LIST desde el almacenamiento (alfa; Kubernetes 1.23+)<br>_Se muestra como objeto_ |
| **kube_apiserver.storage_list_fetched_objects_total** <br>(gauge) | El número de objetos leídos del almacenamiento en el curso de servir una solicitud LIST (alfa; Kubernetes 1.23+)<br>_Se muestra como objeto_ |
| **kube_apiserver.storage_list_returned_objects_total** <br>(gauge) | El número de objetos devueltos para una solicitud LIST desde el almacenamiento (alfa; Kubernetes 1.23+)<br>_Se muestra como objeto_ |
| **kube_apiserver.storage_list_total** <br>(gauge) | Número de solicitudes LIST servidas desde el almacenamiento (alfa; Kubernetes 1.23+)<br>_Se muestra como objeto_ |
| **kube_apiserver.storage_objects** <br>(gauge) | El número de objetos almacenados en el momento del último check divididos por tipo (Kubernetes 1.21+; sustituye a etcd_object_counts)<br>_Se muestra como objeto_ |
| **kube_apiserver.watch_events_sizes.count** <br>(count) | Distribución del tamaño de los eventos de vigilancia (Kubernetes 1.16+)|
| **kube_apiserver.watch_events_sizes.sum** <br>(gauge) | La distribución del tamaño de los eventos de vigilancia (Kubernetes 1.16+)<br>_Se muestra como byte_ |

### Checks de servicio

Kube_apiserver_metrics no incluye checks de servicios.

### Eventos

Kube_apiserver_metrics no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).