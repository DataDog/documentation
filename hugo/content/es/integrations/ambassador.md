---
app_id: ambassador
categories:
- nube
- rastreo
- Kubernetes
- orquestación
custom_kind: integración
description: Ambassador es una gateway de API de código abierto, nativa de Kubernetes
  creada sobre Envoy
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Gateway de API de Ambassador
---
## Información general

Obtén métricas de [Ambassador](https://www.getambassador.io) en tiempo real para:

- Visualizar el rendimiento de tus microservicios

- Comprender el impacto de las nuevas versiones de tus servicios a medida que utilizas Ambassador para realizar un despliegue canary

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png)

## Configuración

Habilita DogStatsD en tu Agent Daemonset y configura la siguiente variable de entorno en tu pod Ambassador:

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

Con esta configuración, las métricas de StatsD se envían a la IP del host, que redirige el tráfico al puerto 8125 del Agent.

Consulta [Estadísticas de Envoy con StatsD](https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/) para obtener más información.

También puedes enviar datos de rastreo desde Ambassador a Datadog APM. Consulta [Rastreo distribuido con Datadog](https://www.getambassador.io/docs/latest/howtos/tracing-datadog/) para obtener más información.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **envoy.listener.downstream_cx_total** <br>(count) | Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_cx_destroy** <br>(count) | Total de conexiones destruidas<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_cx_active** <br>(gauge) | Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.listener.downstream_cx_length_ms** <br>(gauge) | Longitud de conexión en milisegundos<br>_Se muestra como milisegundo_ |
| **envoy.listener_manager.listener_added** <br>(count) | Total de oyentes añadidos (mediante configuración estática o LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_modified** <br>(count) | Total de oyentes modificados (a través de LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_removed** <br>(count) | Total de oyentes eliminados (a través de LDS)<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_create_success** <br>(count) | Total de objetos de escucha añadidos con éxito a los workers<br>_Se muestra como host_ |
| **envoy.listener_manager.listener_create_failure** <br>(count) | Total de objetos de escucha fallidos añadidos a los workers<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_warming** <br>(gauge) | Número de oyentes que tienen acceso frecuente actualmente<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_active** <br>(gauge) | Número de oyentes actualmente activos<br>_Se muestra como host_ |
| **envoy.listener_manager.total_listeners_draining** <br>(gauge) | Número de oyentes actualmente en purga<br>_Se muestra como host_ |
| **envoy.http.downstream_cx_total** <br>(count) | Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_ssl_total** <br>(count) | Total de conexiones TLS<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http1_total** <br>(count) | Total de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_websocket_total** <br>(count) | Total de conexiones WebSocket<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http2_total** <br>(count) | Total de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy** <br>(count) | Total de conexiones destruidas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_remote** <br>(count) | Total de conexiones destruidas debido al cierre remoto<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_local** <br>(count) | Total de conexiones destruidas debido al cierre local<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_active_rq** <br>(count) | Total de conexiones destruidas con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_local_active_rq** <br>(count) | Total de conexiones destruidas localmente con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_destroy_remote_active_rq** <br>(count) | Total de conexiones destruidas a distancia con solicitudes activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_active** <br>(gauge) | Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_ssl_active** <br>(gauge) | Total de conexiones TLS activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http1_active** <br>(gauge) | Total de conexiones HTTP/1.1 activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_websocket_active** <br>(gauge) | Total de conexiones WebSocket activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_http2_active** <br>(gauge) | Total de conexiones HTTP/2 activas<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_protocol_error** <br>(count) | Total de errores de protocolo<br>_Se muestra como error_ |
| **envoy.http.downstream_cx_length_ms** <br>(gauge) | Longitud de conexión en milisegundos<br>_Se muestra como milisegundo_ |
| **envoy.http.downstream_cx_rx_bytes_total** <br>(count) | Total de bytes recibidos<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_rx_bytes_buffered** <br>(gauge) | Total de bytes recibidos actualmente almacenados en búfer<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_tx_bytes_total** <br>(count) | Total de bytes enviados<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_tx_bytes_buffered** <br>(gauge) | Total de bytes enviados actualmente almacenados en búfer<br>_Se muestra como byte_ |
| **envoy.http.downstream_cx_drain_close** <br>(count) | Total de conexiones cerradas por purga<br>_Se muestra como conexión_ |
| **envoy.http.downstream_cx_idle_timeout** <br>(count) | Total de conexiones cerradas por tiempo inactivo<br>_Se muestra como conexión_ |
| **envoy.http.downstream_flow_control_paused_reading_total** <br>(count) | Número total de veces que se desactivaron las lecturas debido al control de flujo<br>_Se muestra como incidencia_ |
| **envoy.http.downstream_flow_control_resumed_reading_total** <br>(count) | Número total de veces que se activaron las lecturas en la conexión debido al control de flujo<br>_Se muestra como incidencia_ |
| **envoy.http.downstream_rq_total** <br>(count) | Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http1_total** <br>(count) | Total de solicitudes HTTP/1.1<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_http2_total** <br>(count) | Total de solicitudes HTTP/2<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_active** <br>(gauge) | Total de solicitudes activas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_response_before_rq_complete** <br>(count) | Total de respuestas enviadas antes de completar la solicitud<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_rx_reset** <br>(count) | Total de solicitudes de restablecimiento recibidas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_tx_reset** <br>(count) | Total de solicitudes de restablecimiento enviadas<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_non_relative_path** <br>(count) | Total de solicitudes con una ruta HTTP no relativa<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_too_large** <br>(count) | Total de solicitudes que resultan en un 413 debido al almacenamiento en búfer de un cuerpo demasiado grande<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_1xx** <br>(count) | Total de respuestas 1xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_2xx** <br>(count) | Total de respuestas 2xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_3xx** <br>(count) | Total de respuestas 3xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_4xx** <br>(count) | Total de respuestas 4xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_5xx** <br>(count) | Total de respuestas 5xx<br>_Se muestra como respuesta_ |
| **envoy.http.downstream_rq_ws_on_non_ws_route** <br>(count) | Total de solicitudes de actualización WebSocket rechazadas por rutas no WebSocket<br>_Se muestra como solicitud_ |
| **envoy.http.downstream_rq_time** <br>(gauge) | Tiempo de solicitud en milisegundos<br>_Se muestra en milisegundos_ |
| **envoy.cluster_manager.cluster_added** <br>(count) | Total de clústeres añadidos (ya sea mediante configuración estática o CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.cluster_modified** <br>(count) | Total de clústeres modificados (vía CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster_manager.cluster_removed** <br>(count) | Total de clústeres eliminados (mediante CDS)<br>_Se muestra como nodo_ |
| **envoy.cluster.upstream_cx_total** <br>(count) | Total de conexiones<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_active** <br>(gauge) | Total de conexiones activas<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http1_total** <br>(count) | Total de conexiones HTTP/1.1<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_http2_total** <br>(count) | Total de conexiones HTTP/2<br>_Se muestra como conexión_ |
| **envoy.cluster.upstream_cx_connect_ms** <br>(gauge) | Establecimiento de conexión en milisegundos<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_length_ms** <br>(gauge) | Longitud de conexión en milisegundos<br>_Se muestra como milisegundo_ |
| **envoy.cluster.upstream_cx_rx_bytes_total** <br>(count) | Total de bytes de conexión recibidos<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_rx_bytes_buffered** <br>(gauge) | Bytes de conexión recibidos actualmente almacenados en búfer<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_tx_bytes_total** <br>(count) | Total de bytes de conexión enviados<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_cx_tx_bytes_buffered** <br>(gauge) | Bytes de conexión enviados actualmente almacenados en búfer<br>_Se muestra como byte_ |
| **envoy.cluster.upstream_rq_total** <br>(count) | Total de solicitudes<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_active** <br>(gauge) | Total de solicitudes activas<br>_Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_total** <br>(count) | Total de solicitudes pendientes de conexión en un grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.upstream_rq_pending_active** <br>(gauge) | Total de solicitudes activas pendientes de conexión en un grupo de conexiones<br> _Se muestra como solicitud_ |
| **envoy.cluster.membership_change** <br>(count) | Cambios en el número total de miembros del clúster<br>_Se muestra como evento_ |
| **envoy.cluster.membership_healthy** <br>(gauge) | Total de clústeres actuales en buen estado (incluido el check de estado y la detección de valor atípico)<br>_Se muestra como nodo_ |
| **envoy.cluster.membership_total** <br>(gauge) | Total de miembros del clúster actual<br>_Se muestra como nodo_ |
| **envoy.cluster.config_reload** <br>(count) | Total de consultas a la API que han dado lugar a una recarga de la configuración debido a una configuración diferente<br>_Se muestra como solicitud_ |
| **envoy.cluster.update_attempt** <br>(count) | Total de intentos de actualización de miembros del clúster<br>_Se muestra como incidencia_ |
| **envoy.cluster.update_success** <br>(count) | Total de éxitos en la actualización de los miembros del clúster<br>_Se muestra como éxito_ |
| **envoy.cluster.update_failure** <br>(count) | Total de fallos en la actualización de los miembros del clúster<br>_Se muestra como error_ |
| **envoy.cluster.version** <br>(gauge) | Hash de los contenidos de la última obtención exitosa de la API<br>_Se muestra como elemento_ |
| **envoy.cluster.max_host_weight** <br>(gauge) | Ponderación máxima de cualquier host en el clúster<br>_Se muestra como elemento_ |

### Eventos

El check de Ambassador no incluye ningún evento.

### Checks de servicio

El check de Ambassador no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).