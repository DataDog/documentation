---
aliases:
- /es/integrations/google_cloud_loadbalancing
app_id: google-cloud-loadbalancing
categories:
- nube
- configuración y despliegue
- google cloud
- recopilación de logs
custom_kind: integración
description: Distribuye los recursos de computación en una o varias regiones para
  una alta disponibilidad, y un escalado y un autoescalado eficientes.
media: []
title: Balanceo de carga de Google Cloud
---
## Información general

Google Cloud Load Balancing te ofrece la posibilidad de distribuir recursos informáticos con balanceo de carga en una o varias regiones, para satisfacer tus requisitos de alta disponibilidad, colocar tus recursos detrás de una única IP anycast y escalar aumentando o reduciendo tus recursos con el Autoscaling inteligente.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Load Balancing.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs del balanceador de carga HTTP de Google Cloud se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs del Balanceador de carga HTTP de Google Cloud HTTP de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs del balanceador de carga HTTP de Google Cloud.
1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.loadbalancing.https.backend_latencies.avg** <br>(gauge) | Latencia media de la solicitud enviada por el proxy al backend hasta que el proxy recibe el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.backend_latencies.p95** <br>(gauge) | Percentil 95 de latencia de la solicitud enviada por el proxy al backend hasta que el proxy recibe el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.backend_latencies.p99** <br>(gauge) | Percentil 99 de latencia de la solicitud enviada por el proxy al backend hasta que el proxy recibe el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.backend_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de la solicitud enviada por el proxy al backend hasta que el proxy recibe el último byte de respuesta del backend.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.https.backend_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la latencia de la solicitud enviada por el proxy al backend hasta que el proxy recibe el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.backend_request_bytes_count** <br>(count) | Número de bytes enviados como solicitudes desde el balanceador de carga HTTP(S) externo a los backends.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.backend_request_count** <br>(count) | Número de solicitudes atendidas por los backends del balanceador de carga HTTP(S).<br>_Se muestra como solicitud_ |
| **gcp.loadbalancing.https.backend_response_bytes_count** <br>(count) | Número de bytes enviados como respuestas desde los backends (o caché) al balanceador de carga HTTP(S).<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.avg** <br>(count) | Media de una distribución de la latencia calculada desde que la solicitud fue enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend. Para las extensiones de servicio, este valor representa la suma de las latencias de cada par `ProcessingRequest` y `ProcessingResponse` entre el balanceador de carga y el backend de la extensión.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.samplecount** <br>(count) | Recuento de muestras de una distribución de la latencia calculada desde que la solicitud fue enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend. Para las extensiones de servicio, este valor representa la suma de las latencias de cada par `ProcessingRequest` y `ProcessingResponse` entre el balanceador de carga y el backend de la extensión.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.external.regional.backend_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de una distribución de la latencia calculada desde que la solicitud fue enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend. Para extensiones de servicio, este valor representa la suma de latencias de cada par `ProcessingRequest` y `ProcessingResponse` entre el balanceador de carga y el backend de la extensión.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.external.regional.backend_request_bytes_count** <br>(count) | Número de bytes enviados como solicitudes desde el balanceador de carga HTTP(S) externo regional a los backends. Para las extensiones de servicio, este valor representa el número total de bytes enviados desde el balanceador de carga al backend de la extensión.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.external.regional.backend_request_count** <br>(count) | Número de solicitudes atendidas por los backends del balanceador de carga HTTP(S) externo regional. Para las extensiones de servicio, este valor representa el número total de flujos (streams) gRPC entre el balanceador de carga y el backend de la extensión.|
| **gcp.loadbalancing.https.external.regional.backend_response_bytes_count** <br>(count) | Número de bytes enviados como respuesta desde los backends al balanceador de carga HTTP(S) externo regional. Para las extensiones de servicio, este valor representa el número total de bytes recibidos por el balanceador de carga desde el backend de la extensión.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.external.regional.request_bytes_count** <br>(count) | Número de bytes enviados como solicitudes de los clientes al balanceador de carga HTTP(S).<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.external.regional.request_count** <br>(count) | Número de solicitudes atendidas por el balanceador de carga HTTP(S).|
| **gcp.loadbalancing.https.external.regional.response_bytes_count** <br>(count) | Número de bytes enviados como respuestas desde el balanceador de carga HTTP(S) a los clientes.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.avg** <br>(count) | Media de una distribución de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy obtuvo el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.samplecount** <br>(count) | Recuento de muestras de una distribución de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy obtuvo el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.external.regional.total_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de una distribución de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy obtuvo el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.avg** <br>(gauge) | Tiempo de ida y vuelta (RTT) medio de cada conexión entre el cliente y el proxy.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.p95** <br>(gauge) | Percentil 95 del RTT de cada conexión entre el cliente y el proxy.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.p99** <br>(gauge) | Percentil 99 del RTT de cada conexión entre el cliente y el proxy.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.samplecount** <br>(count) | Recuento de muestras del RTT de cada conexión entre el cliente y el proxy.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.https.frontend_tcp_rtt.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del RTT de cada conexión entre el cliente y el proxy.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.backend_latencies.avg** <br>(gauge) | Media de la latencia calculada de la solicitud enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.backend_latencies.p95** <br>(gauge) | Percentil 95 de la latencia calculada de la solicitud enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.backend_latencies.p99** <br>(gauge) | Percentil 99 de la latencia calculada de la solicitud enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.backend_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia calculada de la solicitud enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.https.internal.backend_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la latencia calculada de la solicitud enviada por el proxy al backend hasta que el proxy recibió el último byte de respuesta del backend.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.backend_request_bytes_count** <br>(count) | Número de bytes enviados como solicitudes desde el balanceador de carga HTTP(S) interno a los backends. Para las extensiones de servicio, este valor representa el número total de bytes enviados desde el balanceador de carga al backend de la extensión.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.internal.backend_request_count** <br>(count) | Número de solicitudes atendidas por los backends del balanceador de carga HTTP(S) interno. Para las extensiones de servicio, este valor representa el número total de flujos gRPC entre el balanceador de carga y el backend de la extensión.|
| **gcp.loadbalancing.https.internal.backend_response_bytes_count** <br>(count) | Número de bytes enviados como respuesta desde los backends al balanceador de carga HTTP(S) interno. Para las extensiones de servicio, este valor representa el número total de bytes recibidos por el balanceador de carga desde el backend de la extensión.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.internal.request_bytes_count** <br>(count) | Número de bytes enviados como solicitudes de los clientes al balanceador de carga HTTP(S).<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.internal.request_count** <br>(count) | Número de solicitudes atendidas por los backends del balanceador de carga HTTP(S).<br>_Se muestra como solicitud_ |
| **gcp.loadbalancing.https.internal.response_bytes_count** <br>(count) | Número de bytes enviados como respuestas desde el balanceador de carga HTTP(S) a los clientes.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.internal.total_latencies.avg** <br>(gauge) | Media de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.total_latencies.p95** <br>(gauge) | Percentil 95 de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.total_latencies.p99** <br>(gauge) | Percentil 99 de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.internal.total_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.https.internal.total_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.request_bytes_count** <br>(count) | Bytes enviados como solicitudes de clientes al balanceador de carga L7.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.request_count** <br>(count) | Número de solicitudes atendidas por el balanceador de carga L7.<br>_Se muestra como solicitud_ |
| **gcp.loadbalancing.https.response_bytes_count** <br>(count) | Bytes enviados como respuestas del balanceador de carga L7 a los clientes.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.https.total_latencies.avg** <br>(gauge) | Latencia media calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.total_latencies.p95** <br>(gauge) | Percentil 95 de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.total_latencies.p99** <br>(gauge) | Percentil 99 de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.https.total_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.https.total_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la latencia calculada desde que el proxy recibió la solicitud hasta que el proxy ve el ACK del cliente en el último byte de respuesta.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.external.egress_bytes_count** <br>(count) | Número de bytes enviados desde el backend NetLB al cliente del flujo. Para los flujos TCP, solo cuenta los bytes en el flujo de la aplicación.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l3.external.egress_packets_count** <br>(count) | Número de paquetes enviados desde el backend NetLB al cliente del flujo.<br>_Se muestra como paquete_ |
| **gcp.loadbalancing.l3.external.ingress_bytes_count** <br>(count) | Número de bytes enviados desde el cliente al backend NetLB. Para flujos TCP, solo cuenta los bytes en el flujo de la aplicación.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l3.external.ingress_packets_count** <br>(count) | Número de paquetes enviados desde el cliente al backend NetLB.<br>_Se muestra como paquete_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.avg** <br>(gauge) | RTT medio medido en conexiones TCP para flujos NetLB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.p95** <br>(gauge) | Percentil 95 del RTT medido en conexiones TCP para flujos NetLB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.p99** <br>(gauge) | Percentil 99 del RTT medido en conexiones TCP para flujos NetLB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.samplecount** <br>(count) | Recuento de muestras del RTT medido en conexiones TCP para flujos NetLB.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.l3.external.rtt_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del RTT medido en conexiones TCP para flujos NetLB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.internal.egress_bytes_count** <br>(recuento) | Número de bytes enviados desde el backend ILB al cliente (para los flujos TCP solo cuenta los bytes en el flujo de la aplicación).<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l3.internal.egress_packets_count** <br>(count) | Número de paquetes enviados desde el backend ILB al cliente del flujo.<br>_Se muestra como paquete_ |
| **gcp.loadbalancing.l3.internal.ingress_bytes_count** <br>(count) | Número de bytes enviados desde el cliente al backend ILB (para los flujos TCP solo cuenta los bytes en el flujo de la aplicación).<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l3.internal.ingress_packets_count** <br>(count) | Número de paquetes enviados desde el cliente al backend ILB.<br>_Se muestra como paquete_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.avg** <br>(gauge) | RTT medio medido en conexiones TCP para flujos ILB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.p95** <br>(gauge) | Percentil 95 del RTT medido en conexiones TCP para flujos ILB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.p99** <br>(gauge) | Percentil 99 del RTT medido en conexiones TCP para flujos ILB.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.samplecount** <br>(count) | Recuento de muestras de las latencias de RTT.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.l3.internal.rtt_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de RTT.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.l4_proxy.egress_bytes_count** <br>(count) | Número de bytes enviados desde la máquina virtual al cliente utilizando el proxy.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l4_proxy.ingress_bytes_count** <br>(count) | Número de bytes enviados desde el cliente a la máquina virtual utilizando el proxy.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.l4_proxy.tcp.closed_connections_count** <br>(count) | Número de conexiones finalizadas a través del balanceador de carga proxy TCP o proxy SSL.|
| **gcp.loadbalancing.l4_proxy.tcp.new_connections_count** <br>(count) | Número de conexiones abiertas a través del balanceador de carga proxy TCP o proxy SSL.|
| **gcp.loadbalancing.subnet.proxy_only.addresses** <br>(gauge) | Número actual de direcciones de solo proxy por estado.|
| **gcp.loadbalancing.tcp_ssl_proxy.closed_connections** <br>(count) | Número de conexiones finalizadas a través del proxy TCP/SSL.<br>_Se muestra como conexión_ |
| **gcp.loadbalancing.tcp_ssl_proxy.egress_bytes_count** <br>(count) | Número de bytes enviados desde la máquina virtual al cliente utilizando el proxy.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.avg** <br>(gauge) | RTT medio suavizado medido por el stack tecnológico TCP del proxy. Cada minuto pasan bytes de la capa de aplicación del proxy al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.p95** <br>(gauge) | Percentil 95 del RTT suavizado medido por el stack tecnológico TCP del proxy. Cada minuto pasan bytes de la capa de aplicación del proxy al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.p99** <br>(gauge) | Percentil 99 del RTT suavizado medido por el stack tecnológico TCP del proxy. Cada minuto pasan bytes de la capa de aplicación del proxy al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.samplecount** <br>(count) | Recuento de muestras del RTT suavizado medido por el stack tecnológico TCP del proxy. Cada minuto pasan bytes de la capa de aplicación del proxy al cliente.<br>_Se muestra como muestra_ |
| **gcp.loadbalancing.tcp_ssl_proxy.frontend_tcp_rtt.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del RTT suavizado medido por el stack tecnológico TCP del proxy. Cada minuto pasan bytes de la capa de aplicación del proxy al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.loadbalancing.tcp_ssl_proxy.ingress_bytes_count** <br>(count) | Número de bytes enviados desde el cliente a la máquina virtual utilizando el proxy.<br>_Se muestra en bytes_ |
| **gcp.loadbalancing.tcp_ssl_proxy.new_connections** <br>(count) | Número de conexiones creadas a través del proxy TCP/SSL.<br>_Se muestra como conexión_ |
| **gcp.loadbalancing.tcp_ssl_proxy.open_connections** <br>(count) | Número actual de conexiones pendientes a través del proxy TCP/SSL.<br>_Se muestra como conexión_ |

### Eventos

La integración Google Cloud Load Balancing no incluye eventos.

### Checks de servicio

La integración Google Cloud Load Balancing no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).