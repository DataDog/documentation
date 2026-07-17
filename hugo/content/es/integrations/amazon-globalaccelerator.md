---
aliases:
- /es/integrations/amazon_globalaccelerator
app_id: amazon-globalaccelerator
categories:
- aws
- métricas
- nube
custom_kind: integración
description: Global Accelerator utiliza aceleradores para mejorar el rendimiento de
  las aplicaciones.
media: []
title: Amazon Global Accelerator
---
## Información general

AWS Global Accelerator es un servicio en el que puedes crear aceleradores para mejorar el rendimiento de tus aplicaciones para usuarios locales y globales.

Activa esta integración para ver todas tus métricas de Global Accelerator en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que Global Accelerator está habilitado en la pestaña **Metric Collection** (Recopilación de métricas).
1. Instala la [integración de Datadog y AWS Global Accelerator](https://app.datadoghq.com/integrations/amazon-globalaccelerator).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.globalaccelerator.flows_dropped_no_endpoint_found** <br>(count) | Número de flujos de paquetes TCP IPv6 que se descartaron porque no había endpoints IPv6 disponibles.<br>_Se muestra como paquete_ |
| **aws.globalaccelerator.healthy_endpoint_count** <br>(gauge) | El número de endpoints que AWS Global Accelerator considera en buen estado.<br>_Se muestra como recurso_ |
| **aws.globalaccelerator.new_flow_count** <br>(count) | El número de nuevos flujos TCP y UDP (o conexiones) establecidos desde clientes a endpoints en el periodo de tiempo.<br>_Se muestra como conexión_ |
| **aws.globalaccelerator.processed_bytes_in** <br>(count) | Número de bytes entrantes procesados por el acelerador, incluidos los encabezados TCP/IP. Este recuento incluye todo el tráfico a los endpoints.<br>_Se muestra como byte_ |
| **aws.globalaccelerator.processed_bytes_out** <br>(count) | Número de bytes salientes procesados por el acelerador, incluidos los encabezados TCP/IP. Este recuento incluye el tráfico de los endpoints, menos el tráfico de check de estado.<br>_Se muestra como byte_ |
| **aws.globalaccelerator.unhealthy_endpoint_count** <br>(gauge) | El número de endpoints que AWS Global Accelerator considera en mal estado.<br>_Se muestra como recurso_ |

### Checks de servicio

AWS Global Accelerator no incluye ningún check de servicio.

### Eventos

AWS Global Accelerator no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).