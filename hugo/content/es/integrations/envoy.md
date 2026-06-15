---
app_id: envoy
categories:
- nube
- recopilación de logs
- network
- seguridad
custom_kind: integración
description: Envoy es un proxy de borde y servicio de código abierto
integration_version: 6.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Envoy
---
## Información general

### Métricas

Este check recopila métricas de observabilidad de sistemas distribuidos de [Envoy](https://www.envoyproxy.io).

### Seguridad

[Datadog App and API Protection](https://docs.datadoghq.com/security/application_security/?source=envoy-tile-overview) amplía la visibilidad y la mitigación de amenazas en línea para tu instancia de proxy de Envoy.

Con esta integración, puedes detectar y bloquear ataques como el abuso de API, la explotación de lógica de negocio y las amenazas a la capa de código directamente en el borde de tu infraestructura en la nube.

Beneficios clave:

- **Detección y bloqueo de amenazas en línea** en el equilibrador de carga mediante Datadog Security Signals
- **Información en tiempo real** de los ataques a la capa de aplicación con trazas y logs en una vista unificada
- **Refuerzo de borde** frente a amenazas de API OWASP, relleno de credenciales, ataques de inyección, etc.

## Configuración

### Instalación (métricas)

El check de Envoy está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

#### Istio

Si utilizas Envoy como parte de [Istio](https://istio.io), configura la integración de Envoy para recopilar métricas del endpoint de métricas proxy de Istio.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### Standard (Estándar)

Existen dos maneras de configurar el endpoint `/stats`:

##### Endpoint de estadísticas no seguro

He aquí un ejemplo de configuración de un administrador Envoy:

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### Endpoint de estadísticas seguro

Crea un listener/vhost que dirija al [endpoint de admin](https://www.envoyproxy.io/docs/envoy/latest/operations/admin) (Envoy conectándose a sí mismo), pero que solo tenga una ruta para `/stats`; todas las demás rutas obtienen una respuesta static/error. Además, esto permite una buena integración con filtros L3 para autenticación, por ejemplo.

Este es un ejemplo de configuración de [envoy_secured_stats_config.json](https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8):

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `envoy.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de Envoy. Consulta el [envoy.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8001/stats/prometheus

   ```

1. Comprueba si el Datadog Agent puede acceder al [endpoint de administrador] de Envoy (https://www.envoyproxy.io/docs/envoy/latest/operations/admin).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Luego, edita `envoy.d/conf.yaml` y descomenta las líneas `logs` de la parte inferior. Actualiza la `path` de los logs con la ruta correcta a tus archivos de logs de Envoy.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                       |
| -------------------- | ------------------------------------------- |
| `<INTEGRATION_NAME>` | `envoy`                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
**Nota**: La versión actual del check (1.26.0+) utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para la recopilación de métricas, lo que requiere Python 3. Para hosts que no puedan utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `envoy` en la sección Checks.

### Instalación (Seguridad: App and API Protection)

El proceso de instalación requiere un enfoque diferente al de habilitar esta integración.

#### Envoy

Las instrucciones de instalación están disponibles en la documentación de [Activar App and API Protection para Envoy](https://docs.datadoghq.com/security/application_security/setup/envoy/?source=envoy-tile-setup).

#### Istio

Las instrucciones de instalación están disponibles en la documentación de [Activar App and API Protection para Istio](https://docs.datadoghq.com/security/application_security/setup/istio/?source=envoy-tile-setup).

#### Validación

Para validar la detección de amenazas de App and API Protection, envía patrones de ataque conocidos a tu instancia de Envoy. Por ejemplo, puedes activar la regla Security Scanner Detected ejecutando el siguiente script curl:

```sh
for ((i=1;i<=250;i++)); 
do
    # Target existing service's routes
    curl https://your-envoy-url/existing-route -A dd-test-scanner-log;
    # Target non existing service's routes
    curl https://your-envoy-url/non-existing-route -A dd-test-scanner-log;
done
```

Unos minutos después de activar App and API Protection para Envoy y enviar patrones de ataque conocidos, aparecerá información sobre amenazas en Application Signals Explorer.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **envoy.cluster.assignment_stale.count** <br>(count) | \[OpenMetrics V2\] Número de veces que las asignaciones recibidas caducaron antes de que llegaran nuevas asignaciones.|
| **envoy.cluster.assignment_timeout_received.count** <br>(count) | \[OpenMetrics V2\] Total de asignaciones recibidas con información de arrendamiento del endpoint.<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.bind_errors.count** <br>(count) | \[OpenMetrics V2\] Total de errores vinculando el socket a la dirección fuente configurada<br>_Se muestra como error_ |
| **envoy.cluster.default_total_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.ext_authz.denied.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas del servicio de autorización externo denegando el tráfico<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.disabled.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes permitidas sin llamar a los servicios de autorización externos debido a que el filtro está desactivado<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.error.count** <br>(count) | \[OpenMetrics V2\] Total de errores al contactar con el servicio de autorización externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han dado error al contactar con el servicio de autorización externo, pero que se han permitido debido a que failure_mode_allow se ha establecido en false<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.ok.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas del servicio de autorización externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq.count** <br>(count) | \[OpenMetrics v2\] Total de solicitudes de origen externo<br>_Se muestra como solicitud_ |
| **envoy.cluster.external.upstream_rq_completed.count** <br>(count) | \[OpenMetrics v2\] Total de solicitudes de origen externo completadas<br>_Se muestra como solicitud_ |
| **envoy.cluster.external.upstream_rq_xx.count** <br>(count) | \[OpenMetrics v2\] Códigos de respuesta HTTP agregados de origen externo (por ejemplo, 2xx, 3xx, etc.)<br>_Se muestra como solicitud_ |
| **envoy.cluster.external.upstream_rq_time.bucket** <br>(count) | \[OpenMetrics V2\] Tiempo total de solicitud y respuesta externa (milisegundos)<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes externas y tiempos de respuesta muestreados.|
| **envoy.cluster.external.upstream_rq_time.sum** <br>(count) | \[OpenMetrics V2\] Suma total de los tiempos de solicitud y respuesta externos.<br>_Se muestra en milisegundos_ |
| **envoy.cluster.http1.dropped_headers_with_underscores.count** <br>(count) | \[OpenMetrics V2\] Número total de encabezados descartados con nombres que contienen guiones bajos. Esta acción se configura mediante el ajuste headers_with_underscores_action config.|
| **envoy.cluster.http1.metadata_not_supported_error.count** <br>(count) | \[OpenMetrics V2\] Número total de metadatos perdidos durante la codificación HTTP/1|
| **envoy.cluster.http1.requests_rejected_with_underscores_in_headers.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes rechazadas debido a nombres de encabezado que contienen guiones bajos. Esta acción se configura estableciendo el parámetro de configuración headers_with_underscores_action.<br>_Se muestra como solicitud_ |
| **envoy.cluster.http1.response_flood.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas debido a la inundación de respuesta<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.dropped_headers_with_underscores.count** <br>(count) | \[OpenMetrics V2\] Número total de encabezados descartados con nombres que contienen guiones bajos. Este acción se configura mediante el ajuste headers_with_underscores_action config.|
| **envoy.cluster.http2.header_overflow.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones reiniciadas debido a que los encabezados son mayores de 63 K<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.headers_cb_no_stream.count** <br>(count) | \[OpenMetrics V2\] Total de restablecimientos de solicitudes recibidos<br>_Se muestra como solicitud_ |
| **envoy.cluster.http2.inbound_empty_frames_flood.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones finalizadas por superar el límite de frames entrantes consecutivos con una carga útil vacía y sin indicador de fin de flujo<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.inbound_priority_frames_flood.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones finalizadas por superar el límite de frames entrantes de tipo PRIORITY<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.inbound_window_update_frames_flood.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.keepalive_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.metadata_empty_frames.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster.http2.outbound_control_flood.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones terminadas por exceder el límite de frames salientes de tipos PING/SETTINGS/RST_STREAM<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.outbound_flood.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones finalizadas por superar el límite de frames salientes de todos los tipos<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.pending_send_bytes** <br>(gauge) | \[OpenMetrics V2\] Datos del cuerpo actualmente almacenados en el búfer en bytes esperando a ser escritos cuando se abra la ventana de flujo/conexión.<br>_Se muestra como byte_ |
| **envoy.cluster.http2.requests_rejected_with_underscores_in_headers.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes rechazadas debido a nombres de encabezado que contienen guiones bajos. Este acción se configura estableciendo el parámetro de configuración headers_with_underscores_action.<br>_Se muestra como solicitud_ |
| **envoy.cluster.http2.rx_messaging_error.count** <br>(count) | \[OpenMetrics V2\] Número total de frames no válidas recibidas que infringen la sección 8 de la especificación HTTP/2<br>_Se muestra como error_ |
| **envoy.cluster.http2.rx_reset.count** <br>(count) | \[OpenMetrics V2\] Número total de frames de flujo de restablecimiento recibidos por Envoy<br>_Se muestra como mensaje_ |
| **envoy.cluster.http2.streams_active** <br>(gauge) | \[OpenMetrics V2\] Flujos activos observados por el códec|
| **envoy.cluster.http2.trailers.count** <br>(count) | \[OpenMetrics V2\] Número total de trailers vistos en solicitudes procedentes de un proceso descendente.|
| **envoy.cluster.http2.tx_flush_timeout.count** <br>(count) | \[OpenMetrics V2\] Número total de tiempos espera inactivos de flujo esperando a que la ventana de flujo abierta vacíe el resto de un flujo|
| **envoy.cluster.http2.tx_reset.count** <br>(count) | \[OpenMetrics V2\] Número total de frames de flujo de restablecimiento transmitidas por Envoy.|
| **envoy.cluster.internal.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] Tiempo de solicitud en milisegundos<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes ascendentes completadas|
| **envoy.cluster.internal.upstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP agregados (por ejemplo, 2xx, 3xx, etc.)|
| **envoy.cluster.lb_healthy_panic.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes equilibradas con el equilibrador de carga en modo pánico|
| **envoy.cluster.lb_local_cluster_not_ok.count** <br>(count) | \[OpenMetrics V2\] El host local no está configurado o está en modo pánico para el clúster local.|
| **envoy.cluster.lb_recalculate_zone_structures.count** <br>(count) | \[OpenMetrics V2\] El número de veces que las estructuras de enrutamiento conscientes de la localidad se regeneran para decisiones rápidas sobre la selección de localidad ascendente.|
| **envoy.cluster.lb_subsets_created.count** <br>(count) | \[OpenMetrics V2\] Número de subconjuntos creados|
| **envoy.cluster.lb_subsets_fallback.count** <br>(count) | \[OpenMetrics V2\] Número de veces que se invocó la política de fallback.|
| **envoy.cluster.lb_subsets_fallback_panic.count** <br>(count) | \[OpenMetrics V2\] Número de veces que se activó el modo pánico del subconjunto.|
| **envoy.cluster.lb_subsets_removed.count** <br>(count) | \[OpenMetrics V2\] Número de subconjuntos eliminados por falta de hosts|
| **envoy.cluster.lb_subsets_selected.count** <br>(count) | \[OpenMetrics V2\] Número de veces que se seleccionó cualquier subconjunto para el equilibrio de carga.|
| **envoy.cluster.lb_zone_cluster_too_small.count** <br>(count) | \[OpenMetrics V2\] No hay enrutamiento consciente de la zona debido al pequeño tamaño del clúster ascendente|
| **envoy.cluster.lb_zone_no_capacity_left.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que finalizó con una selección aleatoria de zona por error de redondeo.|
| **envoy.cluster.lb_zone_number_differs.count** <br>(count) | \[OpenMetrics V2\] Número de zonas en clúster local y ascendente diferentes|
| **envoy.cluster.lb_zone_routing_all_directly.count** <br>(count) | \[OpenMetrics V2\] Enviar todas las solicitudes directamente a la misma zona.|
| **envoy.cluster.lb_zone_routing_cross_zone.count** <br>(count) | \[OpenMetrics V2\] Modo de enrutamiento consciente de la zona, pero tienen que enviar zona cruzada|
| **envoy.cluster.lb_zone_routing_sampled.count** <br>(count) | \[OpenMetrics V2\] Envío de algunas solicitudes a la misma zona|
| **envoy.cluster.membership_change.count** <br>(count) | \[OpenMetrics V2\] Cambios totales en la pertenencia a un clúster|
| **envoy.cluster.original_dst_host_invalid.count** <br>(count) | \[OpenMetrics V2\] Número total de hosts no válidos pasados al equilibrador de carga de destino original.|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_5xx.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones 5xx consecutivas detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_gateway_failure.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones consecutivas por fallo de gateway detectadas (aunque no se apliquen).|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_local_origin_failure.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones consecutivas detectadas por fallo de origen local (aunque no se apliquen).|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones con porcentaje de fallo detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_detected_local_origin_success_rate.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones con éxito de origen local detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_detected_success_rate.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones de valor atípico exitosas detectadas (incluso si no se aplican)|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_5xx.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones consecutivas forzadas 5xx|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_gateway_failure.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones consecutivas forzadas por fallo de gateway.|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_local_origin_failure.count** <br>(count) | \[OpenMetrics V2\] Número de ejecuciones consecutivas forzadas por fallo de origen local.|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones por porcentaje de fallo forzoso|
| **envoy.cluster.outlier_detection.ejections_enforced_local_origin_success_rate.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones con tasa de éxito de origen local forzada.|
| **envoy.cluster.outlier_detection.ejections_enforced_success_rate.count** <br>(count) | \[OpenMetrics V2\] Número de expulsiones forzadas de valor atípico exitosas|
| **envoy.cluster.outlier_detection.ejections_overflow.count** <br>(count) | \[OpenMetrics V2\] Número de eyecciones abortadas debido al % máximo de eyección.|
| **envoy.cluster.ratelimit.error.count** <br>(count) | \[OpenMetrics V2\] Total de errores al contactar con el servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han dado error al contactar con el servicio de límite de tasa, pero que se han permitido debido a que failure_mode_deny se ha establecido en false<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.ok.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas por debajo del límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.over_limit.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas de exceso de límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.retry_or_shadow_abandoned.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se canceló el shadowing o el retry buffering debido a los límites del búfer.|
| **envoy.cluster.update_attempt.count** <br>(count) | \[OpenMetrics V2\] Total de intentos de actualización de miembros de clústeres por detección de servicios|
| **envoy.cluster.update_empty.count** <br>(count) | \[OpenMetrics V2\] Actualizaciones totales de la pertenencia a clústeres que terminan con la asignación de carga de clústeres vacíos y continúan con la configuración anterior.|
| **envoy.cluster.update_failure.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones de miembros de clúster fallidas por detección de servicios|
| **envoy.cluster.update_no_rebuild.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones exitosas de miembros de clúster que no resultaron en ninguna reconstrucción de la estructura de equilibrio de carga del clúster.|
| **envoy.cluster.update_success.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones exitosas de miembros de clúster por detección de servicios|
| **envoy.cluster.upstream_cx.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_close_notify.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones cerradas a través del encabezado cerrado de conexión HTTP/1.1 o HTTP/2 o HTTP/3 GOAWAY|
| **envoy.cluster.upstream_cx_connect_attempts_exceeded.count** <br>(count) | \[OpenMetrics V2\] Total de fallos consecutivos de conexión que superan los intentos configurados de conexión|
| **envoy.cluster.upstream_cx_connect_fail.count** <br>(count) | \[OpenMetrics V2\] Total de fallos de conexión|
| **envoy.cluster.upstream_cx_connect_ms.bucket** <br>(count) | \[OpenMetrics V2\] Milisegundos para el establecimiento de conexión<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_ms.count** <br>(count) | \[OpenMetrics V2\] Recuento total de establecimientos de conexión|
| **envoy.cluster.upstream_cx_connect_ms.sum** <br>(count) | \[OpenMetrics V2\] Suma total de establecimientos de conexión<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de tiempo de caída de la conexión|
| **envoy.cluster.upstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas|
| **envoy.cluster.upstream_cx_destroy_local.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas localmente|
| **envoy.cluster.upstream_cx_destroy_local_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas localmente con 1+ solicitud activa|
| **envoy.cluster.upstream_cx_destroy_remote_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas remotamente con 1+ solicitud activa|
| **envoy.cluster.upstream_cx_destroy_remote.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas remotamente|
| **envoy.cluster.upstream_cx_destroy_with_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas con 1+ solicitud activa|
| **envoy.cluster.upstream_cx_http1.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http2.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http3.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/3<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de tiempos de espera inactivos de conexión|
| **envoy.cluster.upstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] Milisegundos de longitud de conexión<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] Recuento de muestras de longitud de conexión|
| **envoy.cluster.upstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] Suma total de longitud de la conexión<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_max_requests.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones cerradas por solicitudes máximas|
| **envoy.cluster.upstream_cx_none_healthy.count** <br>(count) | \[OpenMetrics V2\] Total de veces que una conexión no se ha establecido debido a que no hay hosts en buen estado.|
| **envoy.cluster.upstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\] Total de veces que se desbordó el disyuntor de conexión del clúster.|
| **envoy.cluster.upstream_cx_pool_overflow.count** <br>(count) | \[OpenMetrics V2\] Total de veces que el disyuntor del grupo de conexión del clúster se desbordó.|
| **envoy.cluster.upstream_cx_protocol_error.count** <br>(count) | \[OpenMetrics V2\] Total de errores de protocolo de conexión|
| **envoy.cluster.upstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] Recuento de bytes de conexión recibidos<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] Recuento de bytes de conexión enviados<br> _Se muestra como byte_ |
| **envoy.cluster.upstream_flow_control_backed_up.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que la conexión ascendente respaldó y pausó lecturas del flujo descendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_drained.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que la conexión ascendente se vació y reanudó las lecturas descendentes<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que el control de flujo pausó la lectura desde el proceso ascendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_internal_redirect_failed.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que los redireccionamientos internos fallidos dieron lugar a redireccionamientos que se pasaron al proceso descendente.|
| **envoy.cluster.upstream_internal_redirect_succeeded.count** <br>(count) | \[Openmetrics V2\] Recuento de veces que los redireccionamientos internos dieron lugar a una segunda solicitud ascendente.|
| **envoy.cluster.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP específicos (por ejemplo, 201, 302, etc.)|
| **envoy.cluster.upstream_rq_cancelled.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes canceladas antes de obtener una conexión de grupo de conexiones|
| **envoy.cluster.upstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes ascendentes completadas|
| **envoy.cluster.upstream_rq_maintenance_mode.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que dieron lugar a un 503 inmediato debido al modo de mantenimiento|
| **envoy.cluster.upstream_rq_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes cerradas por duración máxima alcanzada|
| **envoy.cluster.upstream_rq_pending.count** <br>(count) | \[Openmetrics V2\] Recuento de solicitudes pendientes de una conexión de grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_failure_eject.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que fallaron debido a un fallo de conexión del grupo de conexiones o a la finalización de conexión remota|
| **envoy.cluster.upstream_rq_pending_overflow.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que desbordaron el circuito de grupo de conexiones o solicitudes (principalmente para HTTP/2 y posteriores) y fueron fallidas|
| **envoy.cluster.upstream_rq_per_try_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que superan el tiempo de espera por intento (excepto cuando la cobertura de solicitudes está activada)|
| **envoy.cluster.upstream_rq_retry.count** <br>(count) | \[OpenMetrics V2\] Total de reintentos de solicitud|
| **envoy.cluster.upstream_rq_retry_backoff_exponential.count** <br>(count) | \[OpenMetrics V2\] Total de reintentos usando la estrategia de backoff exponencial|
| **envoy.cluster.upstream_rq_retry_backoff_ratelimited.count** <br>(count) | \[OpenMetrics V2\] Total de reintentos usando la estrategia ratelimited backoff|
| **envoy.cluster.upstream_rq_retry_limit_exceeded.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes no reintentadas por superar el número máximo de reintentos configurado.|
| **envoy.cluster.upstream_rq_retry_overflow.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes no reintentadas por rotura de circuito o por exceder el presupuesto de reintento.|
| **envoy.cluster.upstream_rq_retry_success.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes reintentadas con éxito|
| **envoy.cluster.upstream_rq_rx_reset.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que se restablecieron de forma remota|
| **envoy.cluster.upstream_rq_time.bucket** <br>(count) | \[OpenMetrics v2\] Recuento de solicitudes en el bucket del histograma<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_time.count** <br>(count) | \[OpenMetrics v2\] Recuento total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_time.sum** <br>(count) | \[OpenMetrics v2\] Suma de todas las duraciones de las solicitudes en milisegundos<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han expirado esperando una respuesta|
| **envoy.cluster.upstream_rq_tx_reset.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que se reiniciaron localmente|
| **envoy.cluster.upstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP agregados (por ejemplo, 2xx, 3xx, etc.)|
| **envoy.cluster_manager.cds.control_plane.rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se aplicó el límite de tasa a las solicitudes del servidor de gestión<br>_Se muestra como incidencia_ |
| **envoy.cluster_manager.cds.init_fetch_timeout.count** <br>(count) | \[OpenMetrics V2\] Tiempo total de inactividad de búsqueda inicial|
| **envoy.cluster_manager.cds.update_attempt.count** <br>(count) | \[OpenMetrics V2\] Total de intentos de actualización de miembros de clústeres por detección de servicios|
| **envoy.cluster_manager.cds.update_duration.bucket** <br>(count) | \[OpenMetrics V2\] Cantidad de tiempo dedicado a actualizar configuraciones|
| **envoy.cluster_manager.cds.update_duration.count** <br>(count) | \[OpenMetrics V2\] Recuento del tiempo dedicado a la actualización de muestras de configuración.|
| **envoy.cluster_manager.cds.update_duration.sum** <br>(count) | \[OpenMetrics V2\] Suma total de tiempo dedicado a actualizar configuraciones.|
| **envoy.cluster_manager.cds.update_failure.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones de miembros de clúster fallidas por detección de servicios|
| **envoy.cluster_manager.cds.update_rejected.count** <br>(count) | \[OpenMetrics V2\] Total de consultas de la API que fallaron debido a errores de esquema/validación|
| **envoy.cluster_manager.cds.update_success.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones exitosas de miembros de clúster por detección de servicios|
| **envoy.cluster_manager.cluster_added.count** <br>(count) | \[OpenMetrics V2\] Total de clústeres añadidos (mediante configuración estática o CDS)|
| **envoy.cluster_manager.cluster_modified.count** <br>(count) | \[OpenMetrics V2\] Total de clústeres modificados (vía CDS)|
| **envoy.cluster_manager.cluster_removed.count** <br>(count) | \[OpenMetrics V2\] Total de clústeres eliminados (vía CDS)|
| **envoy.cluster_manager.cluster_updated.count** <br>(count) | \[OpenMetrics V2\] Actualizaciones totales del clúster|
| **envoy.cluster_manager.custer_updated_via_merge.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.cluster_manager.update_merge_cancelled.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones fusionadas que se cancelaron y entregaron antes de tiempo|
| **envoy.cluster_manager.update_out_of_merge_window.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones que llegaron fuera de una ventana de fusión|
| **envoy.connection_limit.active_connections** <br>(gauge) | \[OpenMetrics V2\] Número de conexiones actualmente activas en el ámbito de esta cadena de filtros de red.|
| **envoy.connection_limit.limited_connections.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones rechazadas por exceder el límite de conexión|
| **envoy.connection_limit.limited_connections** <br>(count) | \[Legacy\] Total de conexiones rechazadas por exceder el límite de conexión|
| **envoy.filesystem.flushed_by_timer.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.reopen_failed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_buffered.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_completed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.filesystem.write_failed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_delayed_close_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_cx_destroy_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas con 1+ solicitud activa|
| **envoy.http.downstream_cx_destroy_local.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas por cierre local|
| **envoy.http.downstream_cx_destroy_local_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas localmente con 1+ solicitud activa|
| **envoy.http.downstream_cx_destroy_remote.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas por cierre remoto|
| **envoy.http.downstream_cx_destroy_remote_active_rq.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas remotamente con 1+ solicitud activa|
| **envoy.http.downstream_cx_drain_close.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones cerradas por vaciado|
| **envoy.http.downstream_cx_http1.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http2.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http3.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones HTTP/3<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones cerradas por tiempo de espera inactivo|
| **envoy.http.downstream_cx_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones cerradas por duración máxima de la conexión|
| **envoy.http.downstream_cx_overload_disable_keepalive.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones para las que HTTP 1.x keepalive se ha desactivado debido a la sobrecarga de Envoy|
| **envoy.http.downstream_cx_protocol_error.count** <br>(count) | \[OpenMetrics V2\] Total de errores de protocolo|
| **envoy.http.downstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] Número de bytes recibidos<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_ssl.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones TLS<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] Número de bytes enviados<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_upgrades.count** <br>(count) | \[OpenMetrics V2\] Recuento de conexiones actualizadas con éxito|
| **envoy.http.downstream_cx_upgrades_active** <br>(gauge) | \[OpenMetrics V2\] Total de conexiones actualizadas activas. Estas también se cuentan como conexiones http1/http2 activas.|
| **envoy.http.downstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que las lecturas se desactivaron debido al control de flujo<br>_Se muestra como ocurrencia_ |
| **envoy.http.downstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que se habilitaron las lecturas en la conexión debido al control de flujo<br>_Se muestra como ocurrencia_ |
| **envoy.http.downstream_rq.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han dado lugar a una respuesta (por ejemplo, no incluye las solicitudes abortadas)<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_failed_path_normalization.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes redirigidas debido a diferentes rutas URL originales y normalizadas o cuando falló la normalización de la ruta. Esta acción se configura mediante la opción path_with_escaped_slashes_action.|
| **envoy.http.downstream_rq_header_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.downstream_rq_http1.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes HTTP/1.1<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http2.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes HTTP/2<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http3.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes HTTP/3<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_idle_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes cerradas por tiempo de espera inactivo|
| **envoy.http.downstream_rq_max_duration_reached.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes cerradas por duración máxima alcanzada|
| **envoy.http.downstream_rq_non_relative_path.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes con una ruta HTTP no relativa|
| **envoy.http.downstream_rq_overload_close.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes cerradas por sobrecarga de Envoy|
| **envoy.http.downstream_rq_redirected_with_normalized_path.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes redirigidas debido a diferentes rutas URL originales y normalizadas. Esta acción se configura estableciendo la opción de configuración path_with_escaped_slashes_action.|
| **envoy.http.downstream_rq_response_before_rq_complete.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas enviadas antes de completar la solicitud|
| **envoy.http.downstream_rq_rx_reset.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes de restablecimiento recibidas|
| **envoy.http.downstream_rq_time.bucket** <br>(count) | \[OpenMetrics V2\] Tiempo total de solicitud y respuesta (milisegundos)<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.count** <br>(count) | \[OpenMetrics V2\] Recuento de los tiempos de solicitud y respuesta muestreados.|
| **envoy.http.downstream_rq_time.sum** <br>(count) | \[OpenMetrics V2\] Suma total de tiempos de solicitud y respuesta.<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes cerradas debido a un tiempo de espera en la ruta de solicitud.|
| **envoy.http.downstream_rq_too_large.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que resultan en un 413 debido al almacenamiento en búfer de un cuerpo demasiado grande.|
| **envoy.http.downstream_rq_tx_reset.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes de reinicio enviadas|
| **envoy.http.downstream_rq_ws_on_non_ws_route.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes de actualización rechazadas por rutas que no son de actualización. Esto se aplica ahora tanto a las actualizaciones WebSocket y no WebSocket|
| **envoy.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP agregados (por ejemplo, 2xx, 3xx, etc.)|
| **envoy.http.ext_proc.streams_started.count** <br>(count) | \[OpenMetrics V2\] Número total de flujos gRPC iniciados hacia el servicio de procesamiento externo.|
| **envoy.http.ext_proc.stream_msgs_sent.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes enviados en esos flujos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.stream_msgs_received.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes recibidos en esos flujos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.spurious_msgs_received.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes inesperados recibidos que violaron el protocolo<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.streams_closed.count** <br>(count) | \[OpenMetrics V2\] Número total de flujos cerrados con éxito en ambos extremos|
| **envoy.http.ext_proc.streams_failed.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que un flujo produjo un error gRPC|
| **envoy.http.ext_proc.failure_mode_allowed.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se ignoró un error debido a la configuración<br>_Se muestra como respuesta_ |
| **envoy.http.ext_proc.message_timeouts.count** <br>(count) | \[OpenMetrics V2\] Número de veces que un mensaje no ha recibido respuesta dentro del tiempo de espera configurado<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.rejected_header_mutations.count** <br>(count) | \[OpenMetrics V2\] Número total de mutaciones de encabezado rechazadas.|
| **envoy.http.ext_proc.override_message_timeout_received.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de override_message_timeout recibidos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.override_message_timeout_ignored.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de override_message_timeout ignorados<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.clear_route_cache_ignored.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes de borrado de caché ignoradas<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.clear_route_cache_disabled.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes de borrado de caché rechazadas por estar deshabilitadas<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.clear_route_cache_upstream_ignored.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes de borrado de caché que se ignoraron porque el filtro estaba en modo ascendente<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.send_immediate_resp_upstream_ignored.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de respuesta inmediata de envío que se ignoraron porque el filtro estaba en modo ascendente<br>_Se muestra como solicitud_ |
| **envoy.http.no_cluster.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.no_route.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_bad_location.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_no_route.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_predicate.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_too_many_redirects.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.passthrough_internal_redirect_unsafe_scheme.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes enrutadas<br>_Se muestra como solicitud_ |
| **envoy.http.rq_direct_response.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq_redirect.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rq_reset_after_downstream_response_started.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.http.rs_too_large.count** <br>(count) | \[OpenMetrics V2\] Total de errores de respuesta debidos al almacenamiento en búfer de un cuerpo demasiado grande.|
| **envoy.http.tracing.client_enabled.count** <br>(count) | \[OpenMetrics V2\] Número total de decisiones rastreables por encabezado de solicitud x-envoy-force-trace|
| **envoy.http.tracing.health_check.count** <br>(count) | \[OpenMetrics V2\] Número total de decisiones no trazables por check de estado|
| **envoy.http.tracing.not_traceable.count** <br>(count) | \[OpenMetrics V2\] Número total de decisiones no rastreables por id de solicitud|
| **envoy.http.tracing.random_sampling.count** <br>(count) | \[OpenMetrics V2\] Número total de decisiones trazables por muestreo aleatorio|
| **envoy.http.tracing.service_forced.count** <br>(count) | \[OpenMetrics V2\] Número total de decisiones rastreables por indicador de tiempo de ejecución del servidor tracing.global_enabled|
| **envoy.http.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] Milisegundos de longitud de conexión<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] Recuento de muestras de milisegundos de longitud de conexión|
| **envoy.http.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] Suma de milisegundos de longitud de conexión<br>_Se muestra como milisegundo_ |
| **envoy.listener.admin.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] Conexiones totales|
| **envoy.listener.admin.downstream_cx_active** <br>(gauge) | \[OpenMetrics V2\] Total de conexiones activas de administrador.|
| **envoy.listener.admin.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas de administrador.|
| **envoy.listener.admin.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] Milisegundos de longitud de conexión de administrador<br>_Se muestra como milisegundo_ |
| **envoy.listener.admin.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] Recuento de muestras de longitud de conexión de administrador.|
| **envoy.listener.admin.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] Suma total de la longitud de conexión de administrador.<br>_Se muestra como milisegundo_ |
| **envoy.listener.admin.downstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_cx_overload_reject.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_global_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_pre_cx_active** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.listener.admin.downstream_pre_cx_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.admin.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han dado lugar a una respuesta (por ejemplo, no incluye las solicitudes abortadas)<br>_Se muestra como solicitud_ |
| **envoy.listener.admin.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP agregados (por ejemplo, 2xx, 3xx, etc.)|
| **envoy.listener.admin.no_filter_chain_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx_destroy.count** <br>(count) | \[OpenMetrics V2\] Total de conexiones destruidas|
| **envoy.listener.downstream_cx_length_ms.bucket** <br>(count) | \[OpenMetrics V2\] Milisegundos de longitud de conexión<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.count** <br>(count) | \[OpenMetrics V2\] Recuento de muestras de milisegundos de longitud de conexión|
| **envoy.listener.downstream_cx_length_ms.sum** <br>(count) | \[OpenMetrics V2\] Suma de milisegundos de longitud de conexión<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_cx_overload_reject.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_global_cx_overflow.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.downstream_pre_cx_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener.http.downstream_rq_completed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes HTTP que han dado lugar a una respuesta (por ejemplo, no incluye las solicitudes abortadas)<br>_Se muestra como solicitud_ |
| **envoy.listener.http.downstream_rq_xx.count** <br>(count) | \[OpenMetrics V2\] Códigos de respuesta HTTP agregados (por ejemplo, 2xx, 3xx, etc.)<br>_Se muestra como respuesta_ |
| **envoy.listener.no_filter_chain_match.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.control_plane.rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.init_fetch_timeout.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.lds.update_attempt.count** <br>(count) | \[OpenMetrics V2\] Total de intentos de actualización de miembros de clústeres por detección de servicios|
| **envoy.listener_manager.lds.update_duration.bucket** <br>(count) | \[OpenMetrics V2\] Cantidad de tiempo dedicado a actualizar configuraciones|
| **envoy.listener_manager.lds.update_duration.count** <br>(count) | \[OpenMetrics V2\] Recuento de la cantidad de tiempo dedicado a actualizar configuraciones|
| **envoy.listener_manager.lds.update_duration.sum** <br>(count) | \[OpenMetrics V2\] Suma de la cantidad de tiempo dedicado a actualizar configuraciones|
| **envoy.listener_manager.lds.update_failure.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones de miembros de clúster fallidas por detección de servicios|
| **envoy.listener_manager.lds.update_rejected.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones de miembros de clúster rechazadas por detección de servicios.|
| **envoy.listener_manager.lds.update_success.count** <br>(count) | \[OpenMetrics V2\] Total de actualizaciones exitosas de miembros de clúster por detección de servicios|
| **envoy.listener_manager.listener_added.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_create_failure.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_create_success.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_in_place_updated.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_modified.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_removed.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.listener_stopped.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.listener_manager.total_filter_chains_draining** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.listener_manager.workers_started** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.runtime.deprecated_feature_seen_since_process_start** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.runtime.deprecated_feature_use.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.load_error.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.load_success.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.override_dir_exists.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.runtime.override_dir_not_exists.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.compilation_settings_fips_mode** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.debug_assertion_failures.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.dynamic_unknown_fields.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.envoy_bug_failure.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.hot_restart_generation** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.initialization_time_ms.bucket** <br>(count) | \[OpenMetrics V2\] tiempo de inicialización del servidor.<br>_Se muestra como milisegundo_ |
| **envoy.server.initialization_time_ms.count** <br>(count) | \[OpenMetrics V2\] recuento de muestras de tiempo de iniciación del servidor.|
| **envoy.server.initialization_time_ms.sum** <br>(count) | \[OpenMetrics V2\] suma del tiempo de inicialización del servidor.|
| **envoy.server.memory_physical_size** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.seconds_until_first_ocsp_response_expiring** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.static_unknown_fields.count** <br>(count) | \[OpenMetrics V2\]|
| **envoy.server.stats_recent_lookups** <br>(gauge) | \[OpenMetrics V2\]|
| **envoy.server.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] Número de mega fallos del servidor|
| **envoy.server.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] Número de fallos estándar del servidor|
| **envoy.server.dropped_stat_flushes.count** <br>(count) | \[OpenMetrics V2\] Número de descargas de estadísticas perdidas.|
| **envoy.vhost.vcluster.upstream_rq.count** <br>(count) | \[OpenMetrics V2\] Recuento de solicitudes iniciadas por el enrutador al proceso ascendente<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry.count** <br>(count) | \[OpenMetrics V2\] Total de reintentos de solicitud<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_limit_exceeded.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes no reintentadas por superar el número máximo de reintentos configurado<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_overflow.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes no reintentadas por rotura de circuito o por superar el presupuesto de reintento<br> _Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_success.count** <br>(count) | \[OpenMetrics V2\] Total de reintentos con éxito<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_timeout.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes que han expirado esperando una respuesta<br>_Se muestra como solicitud_ |
| **envoy.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] Número de fallos mega|
| **envoy.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] Número de fallos estándar|
| **envoy.workers.watchdog_mega_miss.count** <br>(count) | \[OpenMetrics V2\] Número de fallos mega|
| **envoy.workers.watchdog_miss.count** <br>(count) | \[OpenMetrics V2\] Número de fallos estándar|
| **envoy.runtime.load_error** <br>(count) | \[Legacy\] Número total de intentos de carga que resultaron en un error<br>_Se muestra como error_ |
| **envoy.runtime.override_dir_not_exists** <br>(count) | \[Legacy\] Número total de cargas que no utilizaron un directorio de anulación<br>_Se muestra como ocurrencia_ |
| **envoy.runtime.override_dir_exists** <br>(count) | \[Legacy\] Número total de cargas que utilizaron un directorio de anulación<br>_Se muestra como ocurrencia_ |
| **envoy.runtime.load_success** <br>(count) | \[Legacy\] Número total de intentos de carga que tuvieron éxito<br>_Se muestra como éxito_ |
| **envoy.runtime.num_keys** <br>(gauge) | \[Legacy\] Número de claves cargadas actualmente<br>_Se muestra como ubicación_ |
| **envoy.runtime.admin_overrides_active** <br>(gauge) | \[Legacy\] 1 si cualquier anulación de administrador está activa de lo contrario 0|
| **envoy.runtime.deprecated_feature_use** <br>(count) | \[Legacy\] Número total de veces que se han utilizado funciones obsoletas|
| **envoy.runtime.num_layers** <br>(gauge) | \[Legacy\] Número de capas actualmente activas (sin errores de carga)|
| **envoy.control_plane.connected_state** <br>(gauge) | \[Legacy\] Un booleano (1 para conectado y 0 para desconectado) que indica el estado actual de conexión con el servidor de gestión<br>_Se muestra como conexión_ |
| **envoy.control_plane.pending_requests** <br>(gauge) | \[Legacy\] Número total de solicitudes pendientes cuando se aplicó el límite de tasa<br>_Se muestra como solicitud_ |
| **envoy.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] Número total de veces que se aplicó el límite de tasa para las solicitudes del servidor de gestión<br>_Se muestra como ocurrencia_ |
| **envoy.cluster_manager.cds.config_reload** <br>(count) | \[Legacy\] Total de consultas a la API que han dado lugar a una recarga de la configuración debido a una configuración diferente<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.update_attempt** <br>(count) | \[Legacy\] Total de intentos de API<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.update_success** <br>(count) | \[Legacy\] Total de búsquedas de API completados con éxito<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.update_failure** <br>(count) | \[Legacy\] Total de búsquedas de API que fallaron debido a errores de red<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.update_rejected** <br>(count) | \[Legacy\] Total de recuperaciones de API que fallaron debido a errores de esquema/validación<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.update_time** <br>(gauge) | \[Legacy\] Marca de tiempo del último intento exitoso de búsqueda de la API como milisegundos desde la época<br>_Se muestra como milisegundo_ |
| **envoy.cluster_manager.cds.version** <br>(gauge) | \[Legacy\] Hash de los contenidos de la última búsqueda de API con éxito<br>_Se muestra como elemento_ |
| **envoy.cluster_manager.cds.control_plane.connected_state** <br>(gauge) | \[Legacy\] Un booleano (1 para conectado y 0 para desconectado) que indica el estado actual de conexión con el servidor de gestión<br>_Se muestra como conexión_ |
| **envoy.cluster_manager.cds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] Número total de solicitudes pendientes cuando se aplicó el límite de tasa<br>_Se muestra como solicitud_ |
| **envoy.cluster_manager.cds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] Número total de veces que se aplicó el límite de tasa para las solicitudes del servidor de gestión<br>_Se muestra como ocurrencia_ |
| **envoy.http.no_route** <br>(count) | \[Legacy\] Total de solicitudes que no tenían ruta y resultaron en un 404<br>_Se muestra como solicitud_ |
| **envoy.http.no_cluster** <br>(count) | \[Legacy\] Total de solicitudes en las que el clúster de destino no existía y resultaron en un 404<br>_Se muestra como solicitud_ |
| **envoy.http.rq_redirect** <br>(count) | \[Legacy\] Total de solicitudes que resultaron en una respuesta de redirección<br>_Se muestra como solicitud_ |
| **envoy.http.rq_total** <br>(count) | \[Legacy\] Total de solicitudes enrutadas<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx agregados<br>_Se muestra como respuesta_ |
| **envoy.vhost.vcluster.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx agregados<br>_Se muestra como respuesta_ |
| **envoy.vhost.vcluster.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx agregados<br>_Se muestra como respuesta_ |
| **envoy.vhost.vcluster.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx agregados<br>_Se muestra como respuesta_ |
| **envoy.vhost.vcluster.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx agregados<br>_Se muestra como respuesta_ |
| **envoy.vhost.vcluster.upstream_rq_retry** <br>(count) | \[Legacy\] Total de reintentos de solicitud<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_limit_exceeded** <br>(count) | \[Legacy\] Total de solicitudes no reintentadas por superar el número máximo de reintentos configurado<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_overflow** <br>(count) | \[Legacy\] Total de solicitudes no reintentadas por rotura del circuito o por exceder el presupuesto de reintento<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_retry_success** <br>(count) | \[Legacy\] Total de reintentos exitosos<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_timeout** <br>(count) | \[Legacy\] Total de solicitudes que han expirado esperando una respuesta<br>_Se muestra como solicitud_ |
| **envoy.vhost.vcluster.upstream_rq_total** <br>(count) | \[Legacy\] Total de solicitudes iniciadas por el enrutador al proceso ascendente<br>_Se muestra como solicitud_ |
| **envoy.cluster.ratelimit.ok** <br>(count) | \[Legacy\] Total de respuestas por debajo del límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.error** <br>(count) | \[Legacy\] Total de errores al contactar con el servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.over_limit** <br>(count) | \[Legacy\] Total de respuestas de exceso de límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.cluster.ratelimit.failure_mode_allowed** <br>(count) | \[Legacy\] Total de solicitudes que han dado error al contactar con el servicio de límite de tasa pero que se han permitido debido a que failure_mode_deny se ha establecido en false<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.ok** <br>(count) | \[Legacy\] Total de respuestas del servicio de autorización externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.error** <br>(count) | \[Legacy\] Total de errores al contactar con el servicio de autorización externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.denied** <br>(count) | \[Legacy\] Total de respuestas del servicio de autorización externo denegando el tráfico<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.disabled** <br>(count) | \[Legacy\] Total de solicitudes permitidas sin llamar a los servicios de autorización externos debido a que el filtro está desactivado<br>_Se muestra como respuesta_ |
| **envoy.cluster.ext_authz.failure_mode_allowed** <br>(count) | \[Legacy\] Total de solicitudes que han dado error al contactar con el servicio de autorización externo, pero que se han permitido debido a que failure_mode_allow se ha establecido en false<br>_Se muestra como respuesta_ |
| **envoy.http.ip_tagging.hit** <br>(count) | \[Legacy\] Número total de solicitudes a las que se ha aplicado la etiqueta tag_name<br>_Se muestra como solicitud_ |
| **envoy.http.ip_tagging.no_hit** <br>(count) | \[Legacy\] Número total de solicitudes sin etiquetas IP aplicables<br>_Se muestra como solicitud_ |
| **envoy.http.ip_tagging.total** <br>(count) | \[Legacy\] Número total de solicitudes en las que ha actuado el filtro de etiquetado IP<br>_Se muestra como solicitud_ |
| **envoy.cluster.grpc.success** <br>(count) | \[Legacy\] Total de llamadas exitosas al servicio/método<br>_Se muestra como operación_ |
| **envoy.cluster.grpc.failure** <br>(count) | \[Legacy\] Total de llamadas de servicio/método fallidas<br>_Se muestra como operación_ |
| **envoy.cluster.grpc.total** <br>(count) | \[Legacy\] Total de llamadas de servicio/método<br>_Se muestra como operación_ |
| **envoy.http.dynamodb.operation.upstream_rq_total** <br>(count) | \[Legacy\] Número total de solicitudes con la etiqueta operation_name<br>_Se muestra como solicitud_ |
| **envoy.http.dynamodb.table.upstream_rq_total** <br>(count) | \[Legacy\] Número total de solicitudes en la tabla de etiquetas table_name<br>_Se muestra como solicitud_ |
| **envoy.http.dynamodb.error** <br>(count) | \[Legacy\] Número total de etiqueta error_type específica para una etiqueta table_name dada<br>_Se muestra como error_ |
| **envoy.http.dynamodb.error.BatchFailureUnprocessedKeys** <br>(count) | \[Legacy\] Número total de fallos parciales de lote para una etiqueta table_name dada<br>_Se muestra como error_ |
| **envoy.http.buffer.rq_timeout** <br>(count) | \[Legacy\] Total de solicitudes que han expirado esperando una solicitud completa<br>_Se muestra como tiempo de espera_ |
| **envoy.http.rds.config_reload** <br>(count) | \[Legacy\] Total de consultas a la API que han dado lugar a una recarga de la configuración debido a una configuración diferente<br>_Se muestra como solicitud_ |
| **envoy.http.rds.update_attempt** <br>(count) | \[Legacy\] Total de intentos de API<br>_Se muestra como solicitud_ |
| **envoy.http.rds.update_success** <br>(count) | \[Legacy\] Total de búsquedas de API completados con éxito<br>_Se muestra como solicitud_ |
| **envoy.http.rds.update_failure** <br>(count) | \[Legacy\] Total de búsquedas de API que fallaron debido a errores de red<br>_Se muestra como solicitud_ |
| **envoy.http.rds.update_rejected** <br>(count) | \[Legacy\] Total de recuperaciones de API que fallaron debido a errores de esquema/validación<br>_Se muestra como solicitud_ |
| **envoy.http.rds.version** <br>(gauge) | \[Legacy\] Hash de los contenidos de la última búsqueda de API con éxito<br>_Se muestra como elemento_ |
| **envoy.http.rds.control_plane.connected_state** <br>(gauge) | \[Legacy\] Un booleano (1 para conectado y 0 para desconectado) que indica el estado actual de conexión con el servidor de gestión<br>_Se muestra como conexión_ |
| **envoy.http.rds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] Número total de solicitudes pendientes cuando se aplicó el límite de tasa<br>_Se muestra como solicitud_ |
| **envoy.http.rds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] Número total de veces que se aplicó el límite de tasa para las solicitudes del servidor de gestión<br>_Se muestra como ocurrencia_ |
| **envoy.tcp.downstream_cx.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas debido a la inundación de respuesta<br>_Se muestra como conexión_ |
| **envoy.tcp.downstream_cx_total** <br>(count) | \[Legacy\] Número total de conexiones gestionadas por el filtro<br>_Se muestra como conexión_ |
| **envoy.tcp.downstream_cx_no_route.count** <br>(count) | \[OpenMetrics V2\] Número de conexiones para las que no se encontró ninguna ruta coincidente<br>_Se muestra como conexión_ |
| **envoy.tcp.downstream_cx_no_route** <br>(count) | \[Legacy\] Número de conexiones para las que no se encontró ninguna ruta coincidente<br>_Se muestra como conexión_ |
| **envoy.tcp.downstream_cx_tx_bytes.count** <br>(count) | \[OpenMetrics V2\] Total de bytes escritos en la conexión descendente<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] Total de bytes escritos en la conexión<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[OpenMetrics V2 y Legacy\] Total de bytes actualmente almacenados en el búfer de conexión descendente<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_cx_rx_bytes.count** <br>(count) | \[OpenMetrics V2\] Total de bytes escritos desde la conexión descendente<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] Total de bytes escritos desde la conexión<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[OpenMetrics V2 y Legacy\] Total de bytes actualmente almacenados en el búfer de la conexión descendente<br> _Se muestra como byte_ |
| **envoy.tcp.downstream_flow_control_paused_reading.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que el control de flujo pausó la lectura descendente<br>_Se muestra como ocurrencia_ |
| **envoy.tcp.downstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] Número total de veces que el control de flujo detuvo la lectura descendente<br>_Se muestra como ocurrencia_ |
| **envoy.tcp.downstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que el control de flujo reanudó la lectura descendente<br>_Se muestra como ocurrencia_ |
| **envoy.tcp.downstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] Número total de veces que el control de flujo reanudó la lectura desde el proceso descendente<br>_Se muestra como ocurrencia_ |
| **envoy.tcp.idle_timeout.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas por tiempo de espera inactivo<br>_Se muestra como conexión_ |
| **envoy.tcp.idle_timeout** <br>(count) | \[Legacy\] Número total de conexiones cerradas por tiempo de espera inactivo<br>_Se muestra como conexión_ |
| **envoy.tcp.on_demand_cluster_attempt.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones que solicitaron un clúster bajo demanda<br>_Se muestra como conexión_ |
| **envoy.tcp.on_demand_cluster_missing.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas debido a la falta del clúster bajo demanda<br>_Se muestra como conexión_ |
| **envoy.tcp.on_demand_cluster_success.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones que solicitaron y recibieron un clúster bajo demanda<br>_Se muestra como conexión_ |
| **envoy.tcp.on_demand_cluster_timeout.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas debido al tiempo de espera de búsqueda del clúster bajo demanda<br>_Se muestra como conexión_ |
| **envoy.tcp.max_downstream_connection_duration.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones cerradas debido a max_downstream_connection_duration timeout<br>_Se muestra como conexión_ |
| **envoy.tcp.max_downstream_connection_duration** <br>(count) | \[Legacy\] Número total de conexiones cerradas debido a max_downstream_connection_duration timeout<br>_Se muestra como conexión_ |
| **envoy.tcp.upstream_flush.count** <br>(count) | \[OpenMetrics V2\] Número total de conexiones que continuaron vaciando datos ascendentes después de que se cerrara la conexión descendente<br> _Se muestra como conexión_ |
| **envoy.tcp.upstream_flush_total** <br>(count) | \[Legacy\] Número total de conexiones que continuaron vaciando datos ascendentes después de que se cerrara la conexión descendente<br> _Se muestra como conexión_ |
| **envoy.tcp.upstream_flush_active** <br>(gauge) | \[OpenMetrics y V2 Legacy\] Total de conexiones que actualmente continúan vaciando datos ascendentes después de que se cerrara la conexión descendente<br> _Se muestra como conexión_ |
| **envoy.auth.clientssl.update_success** <br>(count) | \[Legacy\] Total de éxitos de actualización de la entidad principal<br>_Se muestra como éxito_ |
| **envoy.auth.clientssl.update_failure** <br>(count) | \[Legacy\] Total de fallos de actualización de la entidad principal<br>_Se muestra como error_ |
| **envoy.auth.clientssl.auth_no_ssl** <br>(count) | \[Legacy\] Total de conexiones ignoradas debido a que no hay TLS<br>_Se muestra como conexión_ |
| **envoy.auth.clientssl.auth_ip_white_list** <br>(count) | \[Legacy\] Total de conexiones permitidas debido a la lista de IP permitidas<br>_Se muestra como conexión_ |
| **envoy.auth.clientssl.auth_digest_match** <br>(count) | \[Legacy\] Total de conexiones permitidas debido a la coincidencia del certificado<br>_Se muestra como conexión_ |
| **envoy.auth.clientssl.auth_digest_no_match** <br>(count) | \[Legacy\] Total de conexiones denegadas por no coincidencia de certificado<br>_Se muestra como conexión_ |
| **envoy.auth.clientssl.total_principals** <br>(gauge) | \[Legacy\] Total de entidades principales cargadas<br>_Se muestra como elemento_ |
| **envoy.ratelimit.total** <br>(count) | \[Legacy\] Total de solicitudes al servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.ratelimit.error** <br>(count) | \[Legacy\] Total de errores al contactar con el servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.ratelimit.over_limit** <br>(count) | \[Legacy\] Total de respuestas de exceso de límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.ratelimit.ok** <br>(count) | \[Legacy\] Total de respuestas por debajo del límite del servicio de límite de tasa<br>_Se muestra como respuesta_ |
| **envoy.ratelimit.cx_closed** <br>(count) | \[Legacy\] Total de conexiones cerradas debido a una respuesta de exceso de límite del servicio de límite de tasa<br>_Se muestra como conexión_ |
| **envoy.ratelimit.active** <br>(gauge) | \[Legacy\] Total de solicitudes activas al servicio de límite de tasa<br>_Se muestra como solicitud_ |
| **envoy.redis.downstream_cx_active** <br>(gauge) | \[Legacy\] Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.redis.downstream_cx_protocol_error** <br>(count) | \[Legacy\] Total de errores de protocolo<br>_Se muestra como error_ |
| **envoy.redis.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy\] Total de bytes recibidos actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.redis.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] Total bytes recibidos<br>_Se muestra como byte_ |
| **envoy.redis.downstream_cx_total** <br>(count) | \[Legacy\] Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.redis.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] Total de bytes enviados actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.redis.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] Total de bytes enviados<br>_Se muestra como byte_ |
| **envoy.redis.downstream_cx_drain_close** <br>(count) | \[Legacy\] Número de conexiones cerradas por vaciado<br>_Se muestra como conexión_ |
| **envoy.redis.downstream_rq_active** <br>(gauge) | \[Legacy\] Total de solicitudes activas<br>_Se muestra como solicitud_ |
| **envoy.redis.downstream_rq_total** <br>(count) | \[Legacy\] Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.redis.splitter.invalid_request** <br>(count) | \[Legacy\] Número de solicitudes con un número incorrecto de argumentos<br>_Se muestra como solicitud_ |
| **envoy.redis.splitter.unsupported_command** <br>(count) | \[Legacy\] Número de comandos emitidos que no son reconocidos por el divisor de comandos<br>_Se muestra como operación_ |
| **envoy.redis.command.total** <br>(count) | \[Legacy\] Número de comandos<br>_Se muestra como operación_ |
| **envoy.redis.command.success** <br>(count) | \[Legacy\] Número de comandos que tuvieron éxito<br>_Se muestra como operación_ |
| **envoy.redis.command.error** <br>(count) | \[Legacy\] Número de comandos que devolvieron una respuesta de error parcial o completa<br>_Se muestra como operación_ |
| **envoy.redis.command.latency.0percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.redis.command.latency.25percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.redis.command.latency.50percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.redis.command.latency.75percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.redis.command.latency.90percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.redis.command.latency.95percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.redis.command.latency.99percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.redis.command.latency.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución de la orden en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.redis.command.latency.100percentile** <br>(gauge) | \[Legacy\] Tiempo de ejecución del comando en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.mongo.decoding_error** <br>(count) | \[Legacy\] Número de errores de decodificación del protocolo MongoDB<br>_Se muestra como error_ |
| **envoy.mongo.delay_injected** <br>(count) | \[Legacy\] Número de veces que se inyecta el retardo<br>_Se muestra como ocurrencia_ |
| **envoy.mongo.op_get_more** <br>(count) | \[Legacy\] Número de mensajes OP_GET_MORE<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_insert** <br>(count) | \[Legacy\] Número de mensajes OP_INSERT<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_kill_cursors** <br>(count) | \[Legacy\] Número de mensajes OP_KILL_CURSORS<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query** <br>(count) | \[Legacy\] Número de mensajes OP_QUERY<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query_tailable_cursor** <br>(count) | \[Legacy\] Número de OP_QUERY con un indicador de cursor abierto al final establecido<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query_no_cursor_timeout** <br>(count) | \[Legacy\] Número de OP_QUERY sin indicador de tiempo de espera del cursor<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query_await_data** <br>(count) | \[Legacy\] Número de OP_QUERY con el indicador de datos en espera<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query_exhaust** <br>(count) | \[Legacy\] Número de OP_QUERY con indicador de agotamiento<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_query_no_max_time** <br>(count) | \[Legacy\] Número de consultas sin maxTimeMS establecido<br>_Se muestra como consulta_ |
| **envoy.mongo.op_query_scatter_get** <br>(count) | \[Legacy\] Número de consultas scatter get<br>_Se muestra como consulta_ |
| **envoy.mongo.op_query_multi_get** <br>(count) | \[Legacy\] Número de consultas multi get<br>_Se muestra como consulta_ |
| **envoy.mongo.op_query_active** <br>(gauge) | \[Legacy\] Número de consultas activas<br>_Se muestra como consulta_ |
| **envoy.mongo.op_reply** <br>(count) | \[Legacy\] Número de mensajes OP_REPLY<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_reply_cursor_not_found** <br>(count) | \[Legacy\] Número de OP_REPLY con indicador de cursor no encontrado<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_reply_query_failure** <br>(count) | \[Legacy\] Número de OP_REPLY con indicador de fallo de consulta<br>_Se muestra como mensaje_ |
| **envoy.mongo.op_reply_valid_cursor** <br>(count) | \[Legacy\] Número de OP_REPLY con un cursor válido<br>_Se muestra como mensaje_ |
| **envoy.mongo.cx_destroy_local_with_active_rq** <br>(count) | \[Legacy\] Conexiones destruidas localmente con una consulta activa<br>_Se muestra como conexión_ |
| **envoy.mongo.cx_destroy_remote_with_active_rq** <br>(count) | \[Legacy\] Conexiones destruidas remotamente con una consulta activa<br>_Se muestra como conexión_ |
| **envoy.mongo.cx_drain_close** <br>(count) | \[Legacy\] Conexiones cerradas con motivo en los límites de respuesta durante el drenaje del servidor<br>_Se muestra como conexión_ |
| **envoy.mongo.cmd.total** <br>(count) | \[Legacy\] Número de comandos<br>_Se muestra como comando_ |
| **envoy.mongo.collection.query.total** <br>(count) | \[Legacy\] Número de consultas<br>_Se muestra como consulta_ |
| **envoy.mongo.collection.query.scatter_get** <br>(count) | \[Legacy\] Número de consultas scatter get<br>_Se muestra como consulta_ |
| **envoy.mongo.collection.query.multi_get** <br>(count) | \[Legacy\] Número de consultas multi get<br>_Se muestra como consulta_ |
| **envoy.mongo.collection.callsite.query.total** <br>(count) | \[Legacy\] Número de consultas para la etiqueta callsite<br>_Se muestra como consulta_ |
| **envoy.mongo.collection.callsite.query.scatter_get** <br>(count) | \[Legacy\] Número de solicitudes scatter get para la etiqueta callsite<br>_Se muestra como consulta_ |
| **envoy.mongo.collection.callsite.query.multi_get** <br>(count) | \[Legacy\] Número de consultas multi get para la etiqueta callsite<br>_Se muestra como consulta_ |
| **envoy.listener.downstream_cx_total** <br>(count) | \[Legacy\] Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_cx_destroy** <br>(count) | \[Legacy\] Total de conexiones destruidas<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_cx_active** <br>(gauge) | \[Legacy\] Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_pre_cx_active** <br>(gauge) | \[Legacy\] Sockets actualmente en proceso de filtro de escucha<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_pre_cx_timeout** <br>(count) | \[Legacy\] Sockets que expiraron durante el proceso de filtro de escucha<br>_Se muestra como conexión_ |
| **envoy.listener.no_filter_chain_match** <br>(count) | \[Legacy\] Total de conexiones que no coincidieron con ninguna cadena de filtros<br>_Se muestra como conexión_ |
| **envoy.listener.server_ssl_socket_factory.downstream_context_secrets_not_ready** <br>(count) | \[Legacy\] Número total de conexiones descendentes reiniciadas debido a un certificado ssl vacío<br>_Se muestra como conexión_ |
| **envoy.listener.server_ssl_socket_factory.ssl_context_update_by_sds** <br>(count) | \[Legacy\] El número total de contexto ssl que se ha actualizado|
| **envoy.listener.ssl.connection_error** <br>(count) | \[Legacy\] Total de errores de conexión TLS sin incluir las verificaciones de certificados fallidas<br>_Se muestra como error_ |
| **envoy.listener.ssl.handshake** <br>(count) | \[Legacy\] Total de handshakes de conexión TLS con éxito<br>_Se muestra como éxito_ |
| **envoy.listener.ssl.session_reused** <br>(count) | \[Legacy\] Total de reanudaciones de sesión TLS con éxito<br>_Se muestra como éxito_ |
| **envoy.listener.ssl.no_certificate** <br>(count) | \[Legacy\] Total de conexiones TLS con éxito sin certificado de cliente<br>_Se muestra como éxito_ |
| **envoy.listener.ssl.fail_no_sni_match** <br>(count) | \[Legacy\] Total de conexiones TLS rechazadas por falta de coincidencia SNI<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.fail_verify_no_cert** <br>(count) | \[Legacy\] Total de conexiones TLS que fallaron por falta de certificado de cliente<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.fail_verify_error** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación de CA<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.fail_verify_san** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación SAN<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.fail_verify_cert_hash** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación del certificado<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.ciphers** <br>(count) | \[Legacy\] Total de conexiones TLS que utilizaron la etiqueta de cifrado<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.versions** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de versión de protocolo<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.curves** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de curva ECDHE<br>_Se muestra como conexión_ |
| **envoy.listener.ssl.sigalgs** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de algoritmo de firma sigalg<br>_Se muestra como conexión_ |
| **envoy.listener_manager.listener_added** <br>(count) | \[Legacy\] Total de oyentes añadidos (ya sea a través de configuración estática o LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_modified** <br>(count) | \[Legacy\] Total de oyentes modificados (a través de LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_removed** <br>(count) | \[Legacy\] Total de oyentes eliminados (a través de LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_create_success** <br>(count) | \[Legacy\] Total de objetos de escucha añadidos con éxito a los workers<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_create_failure** <br>(count) | \[Legacy\] Total de objetos de escucha fallidos añadidos a los workers<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_warming** <br>(gauge) | \[Legacy\] Número de oyentes en preparación actualmente<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_active** <br>(gauge) | \[Legacy\] Número de oyentes actualmente activos<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_draining** <br>(gauge) | \[Legacy\] Número de oyentes drenando actualmente<br>_Se muestra como host_ |
| **envoy.listener_manager.lds.config_reload** <br>(count) | \[Legacy\] Total de consultas a la API que han dado lugar a una recarga de la configuración debido a una configuración diferente<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.update_attempt** <br>(count) | \[Legacy\] Total de búsquedas de API<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.update_success** <br>(count) | \[Legacy\] Total de búsquedas de API completados con éxito<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.update_failure** <br>(count) | \[Legacy\] Total de búsquedas de API que fallaron debido a errores de red<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.update_rejected** <br>(count) | \[Legacy\] Total de recuperaciones de API que fallaron debido a errores de esquema/validación<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.update_time** <br>(gauge) | \[Legacy\] Marca de tiempo del último intento exitoso de búsqueda de la API como milisegundos desde la época<br>_Se muestra como milisegundo_ |
| **envoy.listener_manager.lds.version** <br>(gauge) | \[Legacy\] Hash de los contenidos de la última búsqueda de API con éxito<br>_Se muestra como elemento_ |
| **envoy.listener_manager.lds.control_plane.connected_state** <br>(gauge) | \[Legacy\] Un booleano (1 para conectado y 0 para desconectado) que indica el estado actual de conexión con el servidor de gestión<br>_Se muestra como conexión_ |
| **envoy.listener_manager.lds.control_plane.pending_requests** <br>(gauge) | \[Legacy\] Número total de solicitudes pendientes cuando se aplicó el límite de tasa<br>_Se muestra como solicitud_ |
| **envoy.listener_manager.lds.control_plane.rate_limit_enforced** <br>(count) | \[Legacy\] Número total de veces que se aplicó el límite de tasa para las solicitudes del servidor de gestión<br>_Se muestra como ocurrencia_ |
| **envoy.http.downstream_cx_total** <br>(count) | \[Legacy\] Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_ssl_total** <br>(count) | \[Legacy\] Total de conexiones TLS<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http1_total** <br>(count) | \[Legacy\] Total de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http2_total** <br>(count) | \[Legacy\] Total de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http3_total** <br>(count) | \[Legacy\] Total de conexiones HTTP/3<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_websocket_total** <br>(count) | \[Legacy\] Total de conexiones WebSocket<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy** <br>(count) | \[Legacy\] Total de conexiones destruidas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_remote** <br>(count) | \[Legacy\] Total de conexiones destruidas debido al cierre remoto<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_local** <br>(count) | \[Legacy\] Total de conexiones destruidas debido al cierre local<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_local_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas localmente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_remote_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas remotamente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_active** <br>(gauge) | \[Legacy\] Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_ssl_active** <br>(gauge) | \[Legacy\] Total de conexiones TLS activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http1_active** <br>(gauge) | \[Legacy\] Total de conexiones HTTP/1.1 activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_websocket_active** <br>(gauge) | \[Legacy\] Total de conexiones WebSocket activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http2_active** <br>(gauge) | \[Legacy\] Total de conexiones HTTP/2 activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http3_active** <br>(gauge) | \[Legacy\] Total de conexiones HTTP/3 activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_protocol_error** <br>(count) | \[Legacy\] Total de errores de protocolo<br>_Se muestra como error_ |
| **envoy.http.downstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] Total bytes recibidos<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy\] Total de bytes recibidos actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] Total bytes enviados<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] Total de bytes enviados actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_drain_close** <br>(count) | \[Legacy\] Total de conexiones cerradas por vaciado<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_idle_timeout** <br>(count) | \[Legacy\] Total de conexiones cerradas por tiempo de espera inactivo<br>_Se muestra como conexión_ |
| **envoy.http.downstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] Número total de veces que las lecturas se desactivaron debido al control de flujo<br>_Se muestra como ocurrencia_ |
| **envoy.http.downstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] Número total de veces que se habilitó la lectura en la conexión debido al control de flujo<br>_Se muestra como ocurrencia_ |
| **envoy.http.downstream_rq_total** <br>(count) | \[Legacy\] Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http1_total** <br>(count) | \[Legacy\] Total de solicitudes HTTP/1.1<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http2_total** <br>(count) | \[Legacy\] Total de solicitudes HTTP/2<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http3_total** <br>(count) | \[Legacy] \[API v3 únicamente\] Total de solicitudes HTTP/3<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_active** <br>(gauge) | \[Legacy\] Total de solicitudes activas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_response_before_rq_complete** <br>(count) | \[Legacy\] Total de respuestas enviadas antes de completar la solicitud<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_rx_reset** <br>(count) | \[Legacy\] Total de solicitudes recibidas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_tx_reset** <br>(count) | \[Legacy\] Total de solicitudes de restablecimiento enviadas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_non_relative_path** <br>(count) | \[Legacy\] Total de solicitudes con una ruta HTTP no relativa<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_too_large** <br>(count) | \[Legacy\] Total de solicitudes que resultan en un 413 debido al almacenamiento en búfer de un cuerpo demasiado grande<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_1xx** <br>(count) | \[Legacy\] Total de respuestas 1xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_2xx** <br>(count) | \[Legacy\] Total de respuestas 2xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_3xx** <br>(count) | \[Legacy\] Total de respuestas 3xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_4xx** <br>(count) | \[Legacy\] Total de respuestas 4xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_5xx** <br>(count) | \[Legacy\] Total de respuestas 5xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_ws_on_non_ws_route** <br>(count) | \[Legacy\] Total de solicitudes de actualización WebSocket rechazadas por rutas no WebSocket<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.streams_started** <br>(count) | \[Legacy\] Número total de flujos gRPC iniciados hacia el servicio de procesamiento externo|
| **envoy.http.ext_proc.stream_msgs_sent** <br>(count) | \[Legacy\] Número total de mensajes enviados en esos flujos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.stream_msgs_received** <br>(count) | \[Legacy\] Número total de mensajes recibidos en esos flujos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.spurious_msgs_received** <br>(count) | \[Legacy\] Número total de mensajes inesperados recibidos que violaron el protocolo<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.streams_closed** <br>(count) | \[Legacy\] Número total de flujos cerrados con éxito en ambos extremos|
| **envoy.http.ext_proc.streams_failed** <br>(count) | \[Legacy\] Número total de veces que un flujo produjo un error gRPC|
| **envoy.http.ext_proc.failure_mode_allowed** <br>(count) | \[Legacy\] Número total de veces que se ignoró un error debido a la configuración<br>_Se muestra como respuesta_ |
| **envoy.http.ext_proc.message_timeouts** <br>(count) | \[Legacy\] Número de veces que un mensaje no ha recibido respuesta dentro del tiempo de espera configurado<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.rejected_header_mutations** <br>(count) | \[Legacy\] Número total de mutaciones de encabezado rechazadas|
| **envoy.http.ext_proc.override_message_timeout_received** <br>(count) | \[Legacy\] Número total de mensajes de override_message_timeout recibidos<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.override_message_timeout_ignored** <br>(count) | \[Legacy\] Número total de mensajes de override_message_timeout ignorados<br>_Se muestra como mensaje_ |
| **envoy.http.ext_proc.clear_route_cache_ignored** <br>(count) | \[Legacy\] Número total de solicitudes de borrado de caché ignoradas<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.clear_route_cache_disabled** <br>(count) | \[Legacy\] Número total de solicitudes de borrado de caché rechazadas por estar deshabilitadas<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.clear_route_cache_upstream_ignored** <br>(count) | \[Legacy\] Número total de solicitudes de borrado de caché ignoradas porque el filtro estaba en modo ascendente<br>_Se muestra como solicitud_ |
| **envoy.http.ext_proc.send_immediate_resp_upstream_ignored** <br>(count) | \[Legacy\] Número total de mensajes de respuesta inmediata de envío que se ignoraron porque el filtro estaba en modo ascendente<br>_Se muestra como solicitud_ |
| **envoy.http.rbac_allowed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes a las que se permitió el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac_denied.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes a las que se denegó el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac_shadow_allowed.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes a las que las reglas ocultas del filtro permitirían el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac_shadow_denied.count** <br>(count) | \[OpenMetrics V2\] Total de solicitudes a las que se denegaría el acceso por las reglas de sombra del filtro<br>_Se muestra como solicitud_ |
| **envoy.http.local_rate_limit_enabled.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes para las que se consultó el limitador de tasa<br>_Se muestra como solicitud_ |
| **envoy.http.local_rate_limit_enforced.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes a las que se ha aplicado el límite de tasa (por ejemplo: 429 devueltas)<br>_Se muestra como solicitud_ |
| **envoy.http.local_rate_limit_rate_limited.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas sin token disponible (pero no necesariamente forzado)<br>_Se muestra como solicitud_ |
| **envoy.http.local_rate_limit_ok.count** <br>(count) | \[OpenMetrics V2\] Total de respuestas por debajo del límite del bucket de tokens<br>_Se muestra como solicitud_ |
| **envoy.http.rs_too_large** <br>(count) | \[Legacy\] Total de errores de respuesta debidos al almacenamiento en búfer de un cuerpo demasiado grande<br>_Se muestra como error_ |
| **envoy.http.user_agent.downstream_cx_total** <br>(count) | \[Legacy\] Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.http.user_agent.downstream_cx_destroy_remote_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas remotamente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.user_agent.downstream_rq_total** <br>(count) | \[Legacy\] Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.listener.http.downstream_rq_1xx** <br>(count) | \[Legacy\] Total de respuestas 1xx<br>_Se muestra como respuesta_ |
| **envoy.listener.http.downstream_rq_2xx** <br>(count) | \[Legacy\] Total de respuestas 2xx<br>_Se muestra como respuesta_ |
| **envoy.listener.http.downstream_rq_3xx** <br>(count) | \[Legacy\] Total de respuestas 3xx<br>_Se muestra como respuesta_ |
| **envoy.listener.http.downstream_rq_4xx** <br>(count) | \[Legacy\] Total de respuestas 4xx<br>_Se muestra como respuesta_ |
| **envoy.listener.http.downstream_rq_5xx** <br>(count) | \[Legacy\] Total de respuestas 5xx<br>_Se muestra como respuesta_ |
| **envoy.listener.http.downstream_rq_completed** <br>(count) | \[Legacy\] Total de solicitudes que han dado lugar a una respuesta (por ejemplo, no incluye las solicitudes abortadas)<br>_Se muestra como respuesta_ |
| **envoy.http2.rx_reset** <br>(count) | \[Legacy\] Número total de frames de flujo de restablecimiento recibidas por Envoy<br>_Se muestra como mensaje_ |
| **envoy.http2.tx_reset** <br>(count) | \[Legacy\] Número total de frames de flujo de restablecimiento transmitidas por Envoy<br>_Se muestra como mensaje_ |
| **envoy.http2.header_overflow** <br>(count) | \[Legacy\] Número total de conexiones reiniciadas debido a que los encabezados son mayores de 63 K<br>_Se muestra como conexión_ |
| **envoy.http2.trailers** <br>(count) | \[Legacy\] Número total de trailers vistos en solicitudes procedentes de un proceso descendente<br>_Se muestra como elemento_ |
| **envoy.http2.headers_cb_no_stream** <br>(count) | \[Legacy\] Número total de errores en los que se llama a una llamada de retorno de encabezado sin un flujo asociado. Esto indica un suceso inesperado debido a un error aún no diagnosticado.<br>_Se muestra como error_ |
| **envoy.http2.too_many_header_frames** <br>(count) | \[Legacy\] Número total de veces que se reinicia una conexión HTTP2 debido a la recepción de demasiados frames de encabezados. Envoy admite actualmente el envío por proxy de un máximo de un frame de encabezado para 100-Continue, un frame de encabezado con código de respuesta distinto de 100 y un frame con trailers.<br>_Se muestra como ocurrencia_ |
| **envoy.cluster_manager.cluster_added** <br>(count) | \[Legacy\] Total de clústeres añadidos (ya sea a través de configuración estática o CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.cluster_modified** <br>(count) | \[Legacy\] Total de clústeres modificados (via CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.cluster_removed** <br>(count) | \[Legacy\] Total de clústeres eliminados (vía CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.active_clusters** <br>(gauge) | \[Legacy\] Número de clústeres actualmente activos (preparados)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.warming_clusters** <br>(gauge) | \[Legacy\] Número de clústeres que se están preparando (no activos)<br>_Se muestra como nodo_ |
| **envoy.cluster.assignment_stale** <br>(count) | \[Legacy\] Número de veces que las asignaciones recibidas caducaron antes de que llegaran nuevas asignaciones.|
| **envoy.cluster.assignment_timeout_received** <br>(count) | \[Legacy\] Total de asignaciones recibidas con información de arrendamiento de endpoint.<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_cx_total** <br>(count) | \[Legacy\] Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_active** <br>(gauge) | \[Legacy\] Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http1_total** <br>(count) | \[Legacy\] Total de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http2_total** <br>(count) | \[Legacy\] Total de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http3_total** <br>(count) | \[Legacy\] \[API v3 únicamente\] Total de conexiones HTTP/3<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_connect_fail** <br>(count) | \[Legacy\] Total de fallos de conexión<br>_Se muestra como error_ |
| **envoy.cluster.upstream_cx_connect_timeout** <br>(count) | \[Legacy\] Total de tiempos de espera de conexión<br>_Se muestra como tiempo de espera_ |
| **envoy.cluster.upstream_cx_connect_attempts_exceeded** <br>(count) | \[Legacy\] Total de fallos consecutivos de conexión que superan los intentos de conexión configurados<br> _Se muestra como error_ |
| **envoy.cluster.upstream_cx_overflow** <br>(count) | \[Legacy\] Total de veces que el disyuntor de conexión del clúster se desbordó<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_cx_destroy** <br>(count) | \[Legacy\] Total de conexiones destruidas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_destroy_local** <br>(count) | \[Legacy\] Total de conexiones destruidas localmente<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_destroy_remote** <br>(count) | \[Legacy\] Total de conexiones destruidas remotamente<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_destroy_with_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_destroy_local_with_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas localmente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_destroy_remote_with_active_rq** <br>(count) | \[Legacy\] Total de conexiones destruidas remotamente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_close_notify** <br>(count) | \[Legacy\] Total de conexiones cerradas mediante el encabezado cerrado de conexión HTTP/1.1 o HTTP/2 GOAWAY<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_rx_bytes_total** <br>(count) | \[Legacy\] Total de bytes de conexión recibidos<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_rx_bytes_buffered** <br>(gauge) | \[Legacy] Bytes de conexión recibidos actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_tx_bytes_total** <br>(count) | \[Legacy\] Total de bytes de conexión enviados<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_tx_bytes_buffered** <br>(gauge) | \[Legacy\] Bytes de conexión enviados actualmente en búfer<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_protocol_error** <br>(count) | \[Legacy\] Total de errores de protocolo de conexión<br>_Se muestra como error_ |
| **envoy.cluster.upstream_cx_max_requests** <br>(count) | \[Legacy\] Total de conexiones cerradas por solicitudes máximas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_none_healthy** <br>(count) | \[Legacy] Total de veces que la conexión no establecido debido a que no hay hosts en buen estado<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_idle_timeout** <br>(count) | \[Legacy\] Total de tiempo de espera inactivo de la conexión<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_pool_overflow** <br>(count) | \[Legacy\] Total de veces que el disyuntor del grupo de conexión del clúster se desbordó.|
| **envoy.cluster.upstream_rq_total** <br>(count) | \[Legacy\] Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_active** <br>(gauge) | \[Legacy\] Total de solicitudes activas<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_total** <br>(count) | \[Legacy\] Total de solicitudes pendientes a una conexión del grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_overflow** <br>(count) | \[Legacy\] Total de solicitudes que desbordaron la ruptura de circuito del grupo de conexiones y fueron fallidas<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_failure_eject** <br>(count) | \[Legacy\] Total de solicitudes que han fallado debido a un fallo de conexión del grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_active** <br>(gauge) | \[Legacy\] Total de solicitudes activas pendientes de una conexión del grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_cancelled** <br>(count) | \[Legacy\] Total de solicitudes canceladas antes de obtener una conexión del grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_maintenance_mode** <br>(count) | \[Legacy\] Total de solicitudes que dieron lugar a un 503 inmediato debido al modo de mantenimiento<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_max_duration_reached** <br>(count) | \[Legacy\] Total de solicitudes cerradas por duración máxima alcanzada<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_timeout** <br>(count) | \[Legacy\] Total de solicitudes que han expirado esperando una respuesta<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_per_try_timeout** <br>(count) | \[Legacy\] Total de solicitudes que alcanzaron el tiempo de espera por intento<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_rx_reset** <br>(count) | \[Legacy\] Total de solicitudes que fueron reiniciadas remotamente<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_tx_reset** <br>(count) | \[Legacy\] Total de solicitudes que se restablecieron localmente<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_retry** <br>(count) | \[Legacy\] Total de reintentos de solicitud<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_retry_success** <br>(count) | \[Legacy\] Total de reintentos exitosos<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_retry_overflow** <br>(count) | \[Legacy\] Total de solicitudes no reintentadas por rotura de circuito<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_internal_redirect_failed_total** <br>(count) | \[Legacy\] Número total de veces que los redireccionamientos internos fallidos resultaron en redireccionamientos que pasaron al proceso descendente.|
| **envoy.cluster.upstream_internal_redirect_succeeded_total** <br>(count) | \[Legacy\] Número total de veces que las redirecciones internas dieron lugar a una segunda solicitud ascendente.|
| **envoy.cluster.client_ssl_socket_factory.ssl_context_update_by_sds** <br>(count) | \[Legacy\] El número total de contexto ssl que se ha actualizado|
| **envoy.cluster.client_ssl_socket_factory.upstream_context_secrets_not_ready** <br>(count) | \[Legacy\] Número total de conexiones ascendentes reiniciadas debido a certificado ssl vacío<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.connection_error** <br>(count) | \[Legacy\] Total de errores de conexión TLS sin incluir las verificaciones de certificados fallidas<br>_Se muestra como error_ |
| **envoy.cluster.ssl.handshake** <br>(count) | \[Legacy\] Total de handshakes de conexión TLS con éxito<br>_Se muestra como éxito_ |
| **envoy.cluster.ssl.session_reused** <br>(count) | \[Legacy\] Total de reanudaciones de sesión TLS con éxito<br>_Se muestra como éxito_ |
| **envoy.cluster.ssl.no_certificate** <br>(count) | \[Legacy\] Total de conexiones TLS con éxito sin certificado de cliente<br>_Se muestra como éxito_ |
| **envoy.cluster.ssl.fail_no_sni_match** <br>(count) | \[Legacy\] Total de conexiones TLS rechazadas por falta de coincidencia SNI<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.fail_verify_no_cert** <br>(count) | \[Legacy\] Total de conexiones TLS que fallaron por falta de certificado de cliente<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.fail_verify_error** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación de CA<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.fail_verify_san** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación SAN<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.fail_verify_cert_hash** <br>(count) | \[Legacy\] Total de conexiones TLS que han fallado la verificación del certificado<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.ciphers** <br>(count) | \[Legacy\] Total de conexiones TLS que utilizaron la etiqueta de cifrado<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.versions** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de versión de protocolo<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.curves** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de curva ECDHE<br>_Se muestra como conexión_ |
| **envoy.cluster.ssl.sigalgs** <br>(count) | \[Legacy\] Total de conexiones TLS exitosas que utilizaron la etiqueta de algoritmo de firma sigalg<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_flow_control_paused_reading_total** <br>(count) | \[Legacy\] Número total de veces que el control de flujo pausó la lectura ascendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_resumed_reading_total** <br>(count) | \[Legacy\] Número total de veces que el control de flujo reanudó la lectura ascendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_resumed_reading.count** <br>(count) | \[OpenMetrics V2\] Recuento de veces que el control de flujo reanudó la lectura desde el proceso ascendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_backed_up_total** <br>(count) | \[Legacy\] Número total de veces que la conexión ascendente respaldó y pausó lecturas del proceso descendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.upstream_flow_control_drained_total** <br>(count) | \[Legacy\] Número total de veces que la conexión ascendente se vació y reanudó las lecturas del proceso descendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.membership_change** <br>(count) | \[Legacy\] Total de cambios de miembros del clúster<br>_Se muestra como evento_ |
| **envoy.cluster.membership_degraded** <br>(gauge) | \[Legacy\] Total del clúster actual degradado<br>_Se muestra como nodo_ |
| **envoy.cluster.membership_excluded** <br>(gauge) | \[Legacy\] Miembros actuales del clúster excluidos<br>_Se muestra como nodo_ |
| **envoy.cluster.membership_healthy** <br>(gauge) | \[Legacy\] Total de clúster actual en buen estado (incluye tanto el check de estado como la detección de valor atípico)<br>_Se muestra como nodo_ |
| **envoy.cluster.membership_total** <br>(gauge) | \[Legacy\] Total de miembros del clúster actual<br>_Se muestra como nodo_ |
| **envoy.cluster.retry_or_shadow_abandoned** <br>(count) | \[Legacy\] Número total de veces que se canceló el almacenamiento en búfer por sombra o reintento o debido a los límites del búfer<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.config_reload** <br>(count) | \[Legacy\] Total de consultas a la API que han dado lugar a una recarga de la configuración debido a una configuración diferente<br>_Se muestra como solicitud_ |
| **envoy.cluster.update_attempt** <br>(count) | \[Legacy\] Total de intentos de actualización de miembros del clúster<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.update_success** <br>(count) | \[Legacy\] Total de éxitos de actualización de miembros del clúster<br>_Se muestra como éxito_ |
| **envoy.cluster.update_failure** <br>(count) | \[Legacy\] Total de fallos de actualización de miembros del clúster<br>_Se muestra como error_ |
| **envoy.cluster.update_no_rebuild** <br>(count) | \[Legacy\] Total de actualizaciones de miembros de clúster realizadas con éxito que no dieron lugar a ninguna reconstrucción de la estructura de equilibrio de carga del clúster<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.version** <br>(gauge) | \[Legacy\] Hash de los contenidos de la última búsqueda de API con éxito<br>_Se muestra como elemento_ |
| **envoy.cluster.max_host_weight** <br>(gauge) | \[Legacy\] Peso máximo de cualquier host en el clúster<br>_Se muestra como elemento_ |
| **envoy.cluster.bind_errors** <br>(count) | \[Legacy\] Total de errores al vincular el socket a la dirección fuente configurada<br>_Se muestra como error_ |
| **envoy.cluster.health_check.attempt** <br>(count) | \[Legacy\] Número de checks de estado<br>_Se muestra como check_ |
| **envoy.cluster.health_check.success** <br>(count) | \[Legacy\] Número de checks de estado con éxito<br>_Se muestra como check_ |
| **envoy.cluster.health_check.failure** <br>(count) | \[Legacy\] Número de checks de estado inmediatamente fallidas (por ejemplo, HTTP 503), así como fallos de red<br>_Se muestra como check_ |
| **envoy.cluster.health_check.passive_failure** <br>(count) | \[Legacy\] Número de fallos de check de estado debidos a eventos pasivos (por ejemplo, x-envoy-immediate-health-check-fail)<br>_Se muestra como check_ |
| **envoy.cluster.health_check.network_failure** <br>(count) | \[Legacy\] Número de fallos de check de estado debidos a error de red<br>_Se muestra como check_ |
| **envoy.cluster.health_check.verify_cluster** <br>(count) | \[Legacy\] Número de checks de estado que intentaron verificar el nombre del clúster<br>_Se muestra como check_ |
| **envoy.cluster.health_check.healthy** <br>(gauge) | \[Legacy\] Número de miembros en buen estado<br>_Se muestra como check_ |
| **envoy.cluster.http1.dropped_headers_with_underscores** <br>(count) | \[Legacy\] Número total de encabezados descartados con nombres que contienen guiones bajos. Este acción se configura mediante el ajuste headers_with_underscores_action config.|
| **envoy.cluster.http1.metadata_not_supported_error** <br>(count) | \[Legacy\] Número total de metadatos perdidos durante la codificación HTTP/1|
| **envoy.cluster.http1.response_flood** <br>(count) | \[Legacy\] Número total de conexiones cerradas por inundación de respuesta<br>_Se muestra como conexión_ |
| **envoy.cluster.http1.requests_rejected_with_underscores_in_headers** <br>(count) | \[Legacy\] Número total de solicitudes rechazadas debido a nombres de encabezado que contienen guiones bajos. Este acción se configura estableciendo el parámetro de configuración headers_with_underscores_action.<br>_Se muestra como solicitud_ |
| **envoy.cluster.http2.header_overflow** <br>(count) | \[Legacy\] Número total de conexiones reiniciadas debido a que los encabezados son mayores de 63 K<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.inbound_empty_frames_flood** <br>(count) | \[Legacy\] Número total de conexiones finalizadas por superar el límite de frames entrantes consecutivos con una carga útil vacía y sin indicador de fin de flujo<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.inbound_priority_frames_flood** <br>(count) | \[Legacy\] Número total de conexiones finalizadas por superar el límite de frames entrantes de tipo PRIORITY<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.inbound_window_update_frames_flood** <br>(count) | \[Legacy\] Número total de conexiones finalizadas por superar el límite de frames entrantes de tipo WINDOW_UPDATE<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.outbound_control_flood** <br>(count) | \[Legacy\] Número total de conexiones finalizadas por superar el límite de frames salientes de los tipos PING/SETTINGS/RST_STREAM<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.outbound_flood** <br>(count) | \[Legacy\] Número total de conexiones finalizadas por superar el límite de frames salientes de todos los tipos<br>_Se muestra como conexión_ |
| **envoy.cluster.http2.headers_cb_no_stream** <br>(count) | \[Legacy\] Número total de errores en los que se llama a una llamada de retorno de encabezado sin un flujo asociado. Esto indica un suceso inesperado debido a un error aún no diagnosticado.<br>_Se muestra como error_ |
| **envoy.cluster.http2.rx_messaging_error** <br>(count) | \[Legacy\] Número total de frames no válidas recibidas que infringen la sección 8 de la especificación HTTP/2<br>_Se muestra como elemento_ |
| **envoy.cluster.http2.rx_reset** <br>(count) | \[Legacy\] Número total de frames de flujo de restablecimiento recibidas por Envoy<br>_Se muestra como mensaje_ |
| **envoy.cluster.http2.too_many_header_frames** <br>(count) | \[Legacy\] Número total de veces que se reinicia una conexión HTTP2 debido a la recepción de demasiados frames de encabezados. Envoy admite actualmente el envío por proxy de un máximo de un frame de encabezado para 100-Continue, un frame de encabezado con código de respuesta distinto de 100 y un frame con trailers.<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.http2.trailers** <br>(count) | \[Legacy\] Número total de trailers vistos en solicitudes procedentes de un proceso descendente<br>_Se muestra como elemento_ |
| **envoy.cluster.http2.tx_reset** <br>(count) | \[Legacy\] Número total de frames de flujo de restablecimiento transmitidas por Envoy<br>_Se muestra como mensaje_ |
| **envoy.cluster.http2.stream_refused_errors.count** <br>(count) | \[OpenMetrics V2\] Número total de frames no válidos recibidos por Envoy con un código de error REFUSED_STREAM|
| **envoy.cluster.original_dst_host_invalid** <br>(count) | \[Legacy\] Número total de hosts no válidos pasados al equilibrador de carga de destino original.|
| **envoy.cluster.outlier_detection.ejections_enforced_total** <br>(count) | \[Legacy\] Número de expulsiones forzosas debidas a cualquier tipo de valor atípico|
| **envoy.cluster.outlier_detection.ejections_active** <br>(gauge) | \[OpenMetrics V2 y Legacy\] Número de hosts expulsados actualmente.|
| **envoy.cluster.outlier_detection.ejections_overflow** <br>(count) | \[Legacy\] Número de eyecciones abortadas debido al % máximo de eyección.|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_5xx** <br>(count) | \[Legacy\] Número de expulsiones 5xx consecutivas forzadas|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_5xx** <br>(count) | \[Legacy\] Número de expulsiones 5xx consecutivas detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_enforced_success_rate** <br>(count) | \[Legacy\] Número de expulsiones de valor atípico forzoso con éxito|
| **envoy.cluster.outlier_detection.ejections_detected_success_rate** <br>(count) | \[Legacy\] Número de expulsiones de valor atípico detectadas con éxito (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_gateway_failure** <br>(count) | \[Legacy\] Número de expulsiones consecutivas forzadas por fallo de gateway.|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_gateway_failure** <br>(count) | \[Legacy\] Número de expulsiones consecutivas detectadas por fallo de gateway (aunque no se apliquen).|
| **envoy.cluster.outlier_detection.ejections_enforced_consecutive_local_origin_failure** <br>(count) | \[Legacy\] Número de expulsiones consecutivas forzadas de fallo de origen local.|
| **envoy.cluster.outlier_detection.ejections_detected_consecutive_local_origin_failure** <br>(count) | \[Legacy\] Número de expulsiones consecutivas detectadas por fallo de origen local (aunque no se aplique).|
| **envoy.cluster.outlier_detection.ejections_enforced_local_origin_success_rate** <br>(count) | \[Legacy\] Número de expulsiones con éxito de origen local forzado|
| **envoy.cluster.outlier_detection.ejections_detected_local_origin_success_rate** <br>(count) | \[Legacy\] Número de expulsiones con éxito de origen local detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage** <br>(count) | \[Legacy\] Número de expulsiones por porcentaje de fallo forzoso|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage** <br>(count) | \[Legacy\] Número de expulsiones por porcentaje de fallo detectadas (aunque no se apliquen)|
| **envoy.cluster.outlier_detection.ejections_enforced_failure_percentage_local_origin** <br>(count) | \[Legacy\] Número de ejecuciones forzadas de porcentaje de fallo de origen local.|
| **envoy.cluster.outlier_detection.ejections_detected_failure_percentage_local_origin** <br>(count) | \[Legacy\] Número de ejecuciones de porcentaje de fallo de origen local detectadas (aunque no se apliquen).|
| **envoy.cluster.circuit_breakers.cx_open** <br>(gauge) | \[Legacy\] Si el interruptor de conexión está cerrado (0) o abierto (1)|
| **envoy.cluster.circuit_breakers.cx_pool_open** <br>(gauge) | \[Legacy\] Si el interruptor del grupo de conexión está cerrado (0) o abierto (1)|
| **envoy.cluster.circuit_breakers.rq_pending_open** <br>(gauge) | \[Legacy\] Si el interruptor de solicitudes pendientes está cerrado (0) o abierto (1)|
| **envoy.cluster.circuit_breakers.rq_open** <br>(gauge) | \[Legacy\] Si el interruptor de solicitudes está cerrado (0) o abierto (1)|
| **envoy.cluster.circuit_breakers.rq_retry_open** <br>(gauge) | \[Legacy\] Si el interruptor de reintento está cerrado (0) o abierto (1)|
| **envoy.cluster.circuit_breakers.remaining_cx** <br>(gauge) | \[Legacy\] Número de conexiones restantes hasta que se abra el interruptor|
| **envoy.cluster.circuit_breakers.remaining_pending** <br>(gauge) | \[Legacy\] Número de solicitudes pendientes hasta que se abra el interruptor|
| **envoy.cluster.circuit_breakers.remaining_rq** <br>(gauge) | \[Legacy\] Número de solicitudes restantes hasta que se abra el interruptor|
| **envoy.cluster.circuit_breakers.remaining_retries** <br>(gauge) | \[Legacy\] Número de reintentos restantes hasta que se abra el interruptor.|
| **envoy.cluster.upstream_rq_completed** <br>(count) | \[Legacy\] Total de solicitudes ascendentes completadas<br>_Se muestra como respuesta_ |
| **envoy.cluster.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_completed** <br>(count) | \[Legacy\] Total de solicitudes canary ascendentes completadas<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx canary agregados ascendentes<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx canary agregados ascendentes<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx canary agregados ascendentes<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx canary agregados ascendentes<br>_Se muestra como respuesta_ |
| **envoy.cluster.canary.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx canary agregados ascendentes<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_completed** <br>(count) | \[Legacy\] Total de solicitudes de origen interno completadas<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx agregados de origen interno<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx agregados de origen interno<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx agregados de origen interno<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx agregados de origen interno<br>_Se muestra como respuesta_ |
| **envoy.cluster.internal.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx agregados de origen interno<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_completed** <br>(count) | \[Legacy\] Total de solicitudes de origen externo completadas<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx agregados de origen externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx agregados de origen externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx agregados de origen externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx agregados de origen externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.external.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx agregados de origen externo<br>_Se muestra como respuesta_ |
| **envoy.cluster.zone.upstream_rq_1xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 1xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.zone.upstream_rq_2xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 2xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.zone.upstream_rq_3xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 3xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.zone.upstream_rq_4xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 4xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.zone.upstream_rq_5xx** <br>(count) | \[Legacy\] Códigos de respuesta HTTP 5xx agregados<br>_Se muestra como respuesta_ |
| **envoy.cluster.lb_healthy_panic** <br>(count) | \[Legacy\] Total de solicitudes equilibradas con el equilibrador de carga en modo pánico<br>_Se muestra como solicitud_ |
| **envoy.cluster.lb_zone_cluster_too_small** <br>(count) | \[Legacy\] No hay enrutamiento consciente de la zona debido al pequeño tamaño del clúster ascendente|
| **envoy.cluster.lb_zone_routing_all_directly** <br>(count) | \[Legacy\] Envío de todas las solicitudes directamente a la misma zona.|
| **envoy.cluster.lb_zone_routing_sampled** <br>(count) | \[Legacy\] Envío de algunas solicitudes a la misma zona|
| **envoy.cluster.lb_zone_routing_cross_zone** <br>(count) | \[Legacy\] Modo de enrutamiento consciente de la zona, pero tienen que enviar zona cruzada|
| **envoy.cluster.lb_local_cluster_not_ok** <br>(count) | \[Legacy\] El host local no está configurado o está en modo pánico para el clúster local.|
| **envoy.cluster.lb_zone_number_differs** <br>(count) | \[Legacy\] Número de zonas en el clúster local y ascendente diferentes|
| **envoy.cluster.lb_subsets_active** <br>(gauge) | \[Legacy\] Número de subconjuntos disponibles actualmente|
| **envoy.cluster.lb_subsets_created** <br>(count) | \[Legacy\] Número de subconjuntos creados|
| **envoy.cluster.lb_subsets_removed** <br>(count) | \[Legacy\] Número de subconjuntos eliminados por falta de hosts|
| **envoy.cluster.lb_subsets_selected** <br>(count) | \[Legacy\] Número de veces que se seleccionó cualquier subconjunto para el equilibrio de carga<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.lb_subsets_fallback** <br>(count) | \[Legacy\] Número de veces que se invocó la política de fallback<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.lb_subsets_fallback_panic** <br>(count) | \[Legacy\] Número de veces que se activó el modo pánico del subconjunto<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.update_empty** <br>(count) | \[Legacy\] Actualizaciones totales de miembros de clústeres que terminan con una asignación de carga de clúster vacía y continúan con la configuración anterior<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.lb_recalculate_zone_structures** <br>(count) | \[Legacy\] El número de veces que las estructuras de enrutamiento conscientes de la localidad se regeneran para decisiones rápidas sobre la selección de localidad ascendente<br>_Se muestra como ocurrencia_ |
| **envoy.cluster.lb_zone_no_capacity_left** <br>(count) | \[Legacy\] Número total de veces que finalizó con una selección aleatoria de zona debido a error de redondeo<br>_Se muestra como ocurrencia_ |
| **envoy.http.tracing.random_sampling** <br>(count) | \[Legacy\] Número total de decisiones rastreables por muestreo aleatorio<br>_Se muestra como ocurrencia_ |
| **envoy.http.tracing.service_forced** <br>(count) | \[Legacy\] Número total de decisiones rastreables por indicador de tiempo de ejecución del servidor tracing.global_enabled<br>_Se muestra como ocurrencia_ |
| **envoy.http.tracing.client_enabled** <br>(count) | \[Legacy\] Número total de decisiones rastreables por encabezado de solicitud x-envoy-force-trace<br> _Se muestra como ocurrencia_ |
| **envoy.http.tracing.not_traceable** <br>(count) | \[Legacy\] Número total de decisiones no rastreables por id de solicitud<br>_Se muestra como ocurrencia_ |
| **envoy.http.tracing.health_check** <br>(count) | \[Legacy\] Número total de decisiones no rastreables por check de estado<br>_Se muestra como ocurrencia_ |
| **envoy.http.rq_direct_response** <br>(count) | \[Legacy\] Total de solicitudes que dieron lugar a una respuesta directa<br>_Se muestra como solicitud_ |
| **envoy.stats.overflow** <br>(count) | \[Legacy\] Número total de veces que Envoy no puede asignar una estadística debido a la escasez de memoria compartida<br>_Se muestra como error_ |
| **envoy.server.uptime** <br>(gauge) | \[Legacy\] Tiempo de actividad actual del servidor en segundos<br>_Se muestra como segundo_ |
| **envoy.server.memory_allocated** <br>(gauge) | \[Legacy\] Cantidad actual de memoria asignada en bytes<br>_Se muestra como byte_ |
| **envoy.server.memory_heap_size** <br>(gauge) | \[Legacy\] Tamaño actual del heap reservado en bytes<br>_Se muestra como byte_ |
| **envoy.server.live** <br>(gauge) | \[Legacy\] 1 si el servidor no se está vaciando actualmente, 0 en caso contrario<br>_Se muestra como ocurrencia_ |
| **envoy.server.parent_connections** <br>(gauge) | \[Legacy\] Total de conexiones del antiguo proceso de Envoy en el reinicio en caliente<br>_Se muestra como conexión_ |
| **envoy.server.total_connections** <br>(gauge) | \[Legacy\] Total de conexiones de los procesos de Envoy nuevos y antiguos<br>_Se muestra como conexión_ |
| **envoy.server.version** <br>(gauge) | \[Legacy\] Número entero de versión representado basado en la revisión SCM<br>_Se muestra como elemento_ |
| **envoy.server.days_until_first_cert_expiring** <br>(gauge) | \[Legacy\] Número de días que faltan para que caduque el próximo certificado gestionado<br>_Se muestra como día_ |
| **envoy.server.concurrency** <br>(gauge) | \[Legacy\] Número de subprocesos del worker|
| **envoy.server.debug_assertion_failures** <br>(count) | \[Legacy\] Número de fallos de aserción de depuración detectados en una compilación de lanzamiento si se compila con -define log_debug_assert_in_release=enabled o cero en caso contrario.|
| **envoy.server.hot_restart_epoch** <br>(gauge) | \[Legacy\] Epoch actual de reinicio en caliente|
| **envoy.server.state** <br>(gauge) | \[Legacy\] Estado actual del servidor|
| **envoy.server.watchdog_mega_miss** <br>(count) | \[Legacy\] Número de fallos mega|
| **envoy.server.watchdog_miss** <br>(count) | \[Legacy\] Número de fallos estándar|
| **envoy.filesystem.write_buffered** <br>(count) | \[Legacy\] Número total de veces que los datos del archivo se mueven al búfer de descarga interno de Envoy<br>_Se muestra como ocurrencia_ |
| **envoy.filesystem.write_completed** <br>(count) | \[Legacy\] Número total de veces que se escribió un archivo<br>_Se muestra como ocurrencia_ |
| **envoy.filesystem.flushed_by_timer** <br>(count) | \[Legacy\] Número total de veces que los búferes de vaciado interno se escriben en un archivo debido al tiempo de espera de vaciado<br>_Se muestra como ocurrencia_ |
| **envoy.filesystem.reopen_failed** <br>(count) | \[Legacy\] Número total de veces que no se pudo abrir un archivo<br>_Se muestra como ocurrencia_ |
| **envoy.filesystem.write_total_buffered** <br>(gauge) | \[Legacy\] Tamaño total actual del búfer de descarga interno en bytes<br>_Se muestra como byte_ |
| **envoy.vhost.vcluster.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.vhost.vcluster.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Milisegundos de tiempo de solicitud, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.operation.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la etiqueta operation_name, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.http.dynamodb.table.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.http.dynamodb.table.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo empleado en la tabla de etiqueta table_name, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 0<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 25<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 50<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 75<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 90<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 95<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 99<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 99.9<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 100<br>_Se muestra como documento_ |
| **envoy.mongo.cmd.reply_size.0percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 0<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.25percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 25<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.50percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 50<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.75percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 75<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.90percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 90<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.95percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 95<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.99percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 99<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 99.9<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_size.100percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 100<br>_Se muestra como byte_ |
| **envoy.mongo.cmd.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.mongo.cmd.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.mongo.cmd.reply_time_ms.99percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.mongo.cmd.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de mando en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.mongo.cmd.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] Tiempo de comando en milisegundos, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.query.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 0<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 25<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 50<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 75<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 90<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 95<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 99<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 99.9<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta, percentil 100<br>_Se muestra como documento_ |
| **envoy.mongo.collection.query.reply_size.0percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 0<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.25percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 25<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.50percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 50<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.75percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 75<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.90percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 90<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.95percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 95<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.99percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 99<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 99.9<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_size.100percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes, percentil 100<br>_Se muestra como byte_ |
| **envoy.mongo.collection.query.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos. percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.99percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.query.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.0percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 0<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.25percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 25<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.50percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 50<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.75percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 75<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.90percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 90<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.95percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 95<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.99percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 99<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.99_9percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 99.9<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_num_docs.100percentile** <br>(gauge) | \[Legacy\] Número de documentos en respuesta para la etiqueta callsite, percentil 100<br>_Se muestra como documento_ |
| **envoy.mongo.collection.callsite.query.reply_size.0percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 0<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.25percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 25<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.50percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 50<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.75percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 75<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.90percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 90<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.95percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 95<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.99percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 99<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.99_9percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 99.9<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_size.100percentile** <br>(gauge) | \[Legacy\] Tamaño de la respuesta en bytes para la etiqueta callsite, percentil 100<br>_Se muestra como byte_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.0percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.25percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.50percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.75percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.90percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.95percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.99percentile** <br>(gauge)q | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.mongo.collection.callsite.query.reply_time_ms.100percentile** <br>(gauge) | \[Legacy\] Tiempo de consulta en milisegundos para la etiqueta callsite, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.5<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.listener.downstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.5<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99.5<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.http.downstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.0percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_ms.25percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_ms.50percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_ms.75percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_connect_ms.90percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.95percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.99percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.99_5percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 99.5<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.99_9percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_cx_connect_ms.100percentile** <br>(gauge) | \[Legacy] Establecimiento de conexión en milisegundos, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.0percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.25percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 25<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.50percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 50<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.75percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 75<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.90percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 90<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.95percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 95<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.99percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 99<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.99_5percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.5<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.99_9percentile** <br>(gauge) | \[Legacy\] Longitud de la conexión en milisegundos, percentil 99.9<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms.100percentile** <br>(gauge) | \[Legacy] Longitud de la conexión en milisegundos, percentil 100<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.canary.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud canary ascendente en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.internal.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen interno en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 0<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.99_5percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 99.5<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.external.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de origen externo en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.0percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 0<br>_Se muestra como milisegundo_ |
| **envoy.cluster.zone.upstream_rq_time.25percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 25<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.50percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 50<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.75percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 75<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.90percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 90<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.95percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 95<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.99percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 99<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.99_9percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 99.9<br>_Se muestra en milisegundos_ |
| **envoy.cluster.zone.upstream_rq_time.100percentile** <br>(gauge) | \[Legacy\] Tiempo de solicitud de zona en milisegundos, percentil 100<br>_Se muestra en milisegundos_ |
| **envoy.sds.key_rotation_failed** <br>(count) | \[Legacy\] \[API v3 únicamente\] Número total de rotaciones de claves de sistemas de archivos que fallaron fuera de una actualización SDS.|
| **envoy.access_logs.grpc_access_log.logs_dropped** <br>(count) | \[Legacy\] Número de logs de acceso GRPC descartados|
| **envoy.access_logs.grpc_access_log.logs_written** <br>(count) | \[Legacy\] Número de logs de acceso GRPC escritos|
| **envoy.access_logs.grpc_access_log.logs_dropped.count** <br>(count) | \[OpenMetrics V2\] Recuento de logs de acceso GRPC eliminados|
| **envoy.access_logs.grpc_access_log.logs_written.count** <br>(count) | \[OpenMetrics V2\] Recuento de logs de acceso GRPC escritos|
| **envoy.http_local_rate_limit.enabled** <br>(count) | \[Legacy\] Número total de solicitudes para las que se consultó el limitador de tasa<br>_Se muestra como solicitud_ |
| **envoy.http_local_rate_limit.enforced** <br>(count) | \[Legacy\] Número total de solicitudes a las que se ha aplicado la limitación de tasa (por ejemplo: 429 devueltas)<br>_Se muestra como solicitud_ |
| **envoy.http_local_rate_limit.rate_limited** <br>(count) | \[Legacy\] Número total de respuestas sin token disponible (pero no necesariamente forzado)<br>_Se muestra como solicitud_ |
| **envoy.http_local_rate_limit.ok** <br>(count) | \[Legacy\] Número total de respuestas por debajo del límite del bucket de token<br>_Se muestra como solicitud_ |
| **envoy.http.rbac.allowed** <br>(count) | \[Legacy\] Total de solicitudes a las que se permitió el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac.denied** <br>(count) | \[Legacy\] Total de solicitudes a las que se denegó el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac.shadow_allowed** <br>(count) | \[Legacy\] Total de solicitudes a las que las reglas de sombra del filtro permitirían el acceso<br>_Se muestra como solicitud_ |
| **envoy.http.rbac.shadow_denied** <br>(count) | \[Legacy\] Total de solicitudes a las que se denegaría el acceso por las reglas de sombra del filtro<br>_Se muestra como solicitud_ |
| **envoy.cluster.client_ssl_socket_factory.downstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] Recuento de actualizaciones de contexto SSL para el servidor de escucha realizadas por Secret Discovery Service.|
| **envoy.cluster.client_ssl_socket_factory.ssl_context_update_by_sds.count** <br>(count) | \[OpenMetrics V2\] El recuento de secretos de contexto SSL ascendentes del servidor de escucha que no están listos.|
| **envoy.cluster.client_ssl_socket_factory.upstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] El recuento de secretos de contexto SSL descendentes del servidor de escucha que no están listos.|
| **envoy.listener.server_ssl_socket_factory.downstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] El recuento de actualizaciones de contexto SSL para la fábrica de sockets SSL del cliente realizadas por Secret Discovery Service.|
| **envoy.listener.server_ssl_socket_factory.ssl_context_update_by_sds.count** <br>(count) | \[OpenMetrics V2\] El recuento de secretos de contexto SSL ascendentes de la fábrica de sockets SSL del cliente que no están listos.|
| **envoy.listener.server_ssl_socket_factory.upstream_context_secrets_not_ready.count** <br>(count) | \[OpenMetrics V2\] El recuento de secretos de contexto SSL descendentes para la fábrica de sockets SSL de cliente que aún no están listos.|
| **envoy.tls_inspector.client_hello_too_large.count** <br>(count) | \[OpenMetrics V2\] Total de saludos de clientes excesivamente grandes recibidos|
| **envoy.tls_inspector.tls.found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se ha encontrado TLS|
| **envoy.tls_inspector.tls.not_found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que no se encontró TLS|
| **envoy.tls_inspector.alpn.found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que la negociación del protocolo de capa de aplicación se ha realizado correctamente.|
| **envoy.tls_inspector.alpn.not_found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que ha fallado la negociación del protocolo de capa de aplicación.|
| **envoy.tls_inspector.sni.found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se ha encontrado la indicación del nombre del servidor.|
| **envoy.tls_inspector.sni.not_found.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que no se ha encontrado la indicación del nombre del servidor.|
| **envoy.tls_inspector.bytes_processed.bucket** <br>(count) | \[OpenMetrics V2\] Tamaños de registros que registran el número de bytes que el tls_inspector procesó mientras analizaba el uso de tls.|
| **envoy.tls_inspector.bytes_processed.count** <br>(count) | \[OpenMetrics V2\] Recuento de tamaños de registros que registran el número de bytes que el tls_inspector procesó mientras analizaba el uso de tls.|
| **envoy.tls_inspector.bytes_processed.sum** <br>(count) | \[OpenMetrics V2\] Suma total de tamaños de registros que registran el número de bytes que el tls_inspector procesó mientras analizaba el uso de tls.|

Consulta [metrics.py](https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py) para obtener una lista de las etiquetas enviadas por cada métrica.

### Eventos

El check de Envoy no incluye eventos.

### Checks de servicio

**envoy.can_connect**

Devuelve `CRITICAL` si el agent no puede conectarse a Envoy para recopilar métricas, en caso contrario `OK`.

_Estados: ok, crítico_

**envoy.openmetrics.health**

Devuelve `CRITICAL` si el agent no puede conectarse a Envoy para recopilar métricas, en caso contrario `OK`.

_Estados: ok, crítico_

## Solucionar problemas

### Problemas comunes

#### Endpoint `/server_info` inalcanzable

- Para minimizar los logs con errores, desactiva la opción `collect_server_info` en tu configuración de Envoy, si el endpoint no está disponible en tu entorno Envoy.

**Nota**: No se recopilan datos de la versión de Envoy.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).