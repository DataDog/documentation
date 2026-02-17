---
aliases:
- /es/integrations/buoyant_cloud
app_id: buoyant-cloud
categories:
- nube
- red
- seguridad
custom_kind: integración
description: Buoyant Cloud integra la red de servicios Linkerd totalmente gestionada
  directamente en tu clúster.
integration_version: 1.2.0
media:
- caption: 'Buoyant Cloud: dashboard de Datadog'
  image_url: images/bcloud_datadog_dashboard.png
  media_type: imagen
- caption: 'Buoyant Cloud: página de información general'
  image_url: images/bcloud_01.png
  media_type: imagen
- caption: 'Buoyant Cloud: vista del estado de Linkerd'
  image_url: images/bcloud_02.png
  media_type: imagen
- caption: 'Buoyant Cloud: evento gestionado de Linkerd'
  image_url: images/bcloud_03.png
  media_type: imagen
- caption: 'Buoyant Cloud: página de tráfico'
  image_url: images/bcloud_04.png
  media_type: imagen
- caption: 'Buoyant Cloud: página de topología'
  image_url: images/bcloud_05.png
  media_type: imagen
- caption: 'Buoyant Cloud: página de métricas'
  image_url: images/bcloud_06.png
  media_type: imagen
- caption: 'Buoyant Cloud: página de detalles de la carga de trabajo'
  image_url: images/bcloud_07.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Buoyant Cloud
---
## Información general

[Buoyant Cloud](https://buoyant.io/cloud) te proporciona Linkerd totalmente gestionado en tu clúster para monitorizar el estado de Linkerd y los despliegues. Con esta integración, puedes monitorizar y recibir alertas sobre el estado de Linkerd, el tráfico de cargas de trabajo, los eventos de despliegue y las métricas.

## Configuración

### Instalación

Necesitas tener una cuenta en [Buoyant Cloud](https://buoyant.io/cloud) para utilizar esta integración. También puedes registrarte en Buoyant Cloud en la página del Datadog Marketplace.

### Configuración

1. Haz clic en el botón **Connect Accounts** (Conectar cuentas) en cuadro para completar el flujo de OAuth.
1. Ve a la página de [notificaciones de Buoyant Cloud](https://buoyant.cloud/notifications).
1. Añade o edita una regla en **Events** (Eventos) o **Metrics** (Métricas).
1. Ve a la sección **Destinations** (Destinos) y selecciona tu cuenta de Datadog para enviar todos los eventos o métricas que coincidan con la regla de notificación a Datadog.

### Validación

A medida que Buoyant Cloud crea eventos, estos aparecen en el Datadog [Event Explorer](https://app.datadoghq.com/event/explorer). Las métricas aparecen en el Datadog [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

## Desinstalación

1. Ve a la página de [configuración de Buoyant Cloud](https://buoyant.cloud/settings).
1. Haz clic en el menú kebab situado a la derecha de tu organización de Datadog.
1. Haz clic en **Remove** (Eliminar).

Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado, buscando el nombre de la integración en la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys?filter=Buoyant%20Cloud).

## Datos recopilados

### Eventos

Buoyant Cloud envía [eventos](https://app.datadoghq.com/event/explorer) a Datadog, incluidos:

- Alertas sobre el estado de Linkerd
- Alertas sobre la configuración de Linkerd
- Alertas sobre el tráfico de la carga de trabajo
- Despliegues de cargas de trabajo
- Eventos manuales

### Métricas

| | |
| --- | --- |
| **buoyant_cloud.cp_workload.inbound_response.rate1m** <br>(gauge) | Respuestas HTTP del plano de control por segundo<br>_Se muestra como respuesta_ |
| **buoyant_cloud.cp_workload.inbound_response_latency_ms.p50** <br>(gauge) | Latencia del p50 del plano de control<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.cp_workload.inbound_response_latency_ms.p95** <br>(gauge) | Latencia del p95 del plano de control<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.cp_workload.inbound_response_latency_ms.p99** <br>(gauge) | Latencia del p99 del plano de control<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.link.gateway_alive** <br>(gauge) | Indicador de actividad de la puerta de enlace<br>_Se muestra como respuesta_ |
| **buoyant_cloud.link.gateway_probe_latency_ms.p50** <br>(gauge) | Latencia del p50 a una puerta de enlace en un clúster de destino<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.link.gateway_probe_latency_ms.p95** <br>(gauge) | Latencia del p95 a una puerta de enlace en un clúster de destino<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.link.gateway_probe_latency_ms.p99** <br>(gauge) | Latencia del p99 a una puerta de enlace en un clúster de destino<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.node.machine_cpu_cores.sum** <br>(gauge) | Núcleos de CPU del nodo<br>_Se muestra como núcleo_ |
| **buoyant_cloud.node.machine_memory_bytes.sum** <br>(gauge) | Bytes de memoria del nodo<br>_Se muestra en bytes_ |
| **buoyant_cloud.pod.container_cpu_usage_seconds.rate1m** <br>(gauge) | Núcleos de CPU del contenedor<br>_Se muestra como núcleo_ |
| **buoyant_cloud.pod.container_memory_working_set_bytes.sum** <br>(gauge) | \[Deprecated\] Bytes de memoria del contenedor<br>_Se muestra en bytes_ |
| **buoyant_cloud.pod.container_memory_working_set_bytes.max** <br>(gauge) | Bytes de memoria del contenedor<br>_Se muestra en bytes_ |
| **buoyant_cloud.workload.inbound_http_deny.rate1m** <br>(gauge) | Respuestas HTTP por segundo denegadas por la política de autorización<br>_Se muestra como respuesta_ |
| **buoyant_cloud.workload.inbound_response.rate1m** <br>(gauge) | Respuestas HTTP por segundo<br>_Se muestra como respuesta_ |
| **buoyant_cloud.workload.inbound_response_latency_ms.p50** <br>(gauge) | Latencia del p50<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.workload.inbound_response_latency_ms.p95** <br>(gauge) | Latencia del p95<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.workload.inbound_response_latency_ms.p99** <br>(gauge) | Latencia del p99<br>_Se muestra en milisegundos_ |
| **buoyant_cloud.workload.inbound_tcp_deny.rate1m** <br>(gauge) | Conexiones TCP por segundo denegadas<br>_Se muestra como evento_ |
| **buoyant_cloud.workload.inbound_tcp_errors.rate1m** <br>(gauge) | Conexiones TCP por segundo que no se han podido procesar<br>_Se muestra como error_ |
| **buoyant_cloud.workload.inbound_tcp_open_connections.sum** <br>(gauge) | Conexiones de transporte actualmente abiertas<br>_Se muestra como conexión_ |
| **buoyant_cloud.workload.inbound_tcp_read_bytes.rate1m** <br>(gauge) | Bytes por segundo recibidos<br>_Se muestra en bytes_ |
| **buoyant_cloud.workload.inbound_tcp_write_bytes.rate1m** <br>(gauge) | Bytes por segundo enviados<br>_Se muestra en bytes_ |
| **buoyant_cloud.workload.outbound_response.rate1m** <br>(gauge) | Respuestas HTTP salientes por segundo<br>_Se muestra como respuesta_ |
| **buoyant_cloud.workload.pods.count** <br>(gauge) | Recuento de pods<br>_Se muestra como elemento_ |

## Solucionar problemas

¿Necesitas ayuda? Obtén ayuda de las siguientes fuentes:

- Consultar la [documentación de Buoyant Cloud](https://docs.buoyant.cloud)
- Ponte en contacto con nosotros en [Linkerd Slack](https://slack.linkerd.io)
- [Enviar un correo electrónico al equipo de Buoyant Cloud](mailto:cloud@buoyant.io)