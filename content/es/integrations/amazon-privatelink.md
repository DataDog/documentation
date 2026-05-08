---
aliases:
- /es/integrations/amazon_privatelink
app_id: amazon-privatelink
categories:
- métricas
- aws
- nube
- recopilación de logs
- red
custom_kind: integración
description: Realiza un seguimiento de métricas de AWS PrivateLink.
further_reading:
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: otros
  text: Conectarse a Datadog a través de AWS PrivateLink
integration_version: 1.0.0
media: []
title: Amazon PrivateLink
---
## Información general

AWS PrivateLink proporciona conectividad privada entre VPC, servicios AWS y tus redes on-premises.

Habilita esta integración para monitorizar el estado y el rendimiento de tus endpoints de VPC o servicios de endpoints con Datadog.

**Importante:** Si deseas enviar datos de telemetría a Datadog a través de PrivateLink, sigue [estas instrucciones](https://docs.datadoghq.com/agent/guide/private-link/).

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `PrivateLinkEndPoints` y `PrivateLinkServices` están habilitados.
   en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS PrivateLink](https://app.datadoghq.com/integrations/amazon-privatelink).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.privatelinkservices.active_connections** <br>(gauge) | Número de conexiones activas de clientes a destinos a través de los endpoints.|
| **aws.privatelinkservices.bytes_processed** <br>(count) | Número de bytes intercambiados entre los servicios del endpoint y los endpoints en ambas direcciones.|
| **aws.privatelinkservices.endpoints_count** <br>(gauge) | El número de endpoints conectados al servicio de endpoints.|
| **aws.privatelinkservices.new_connections** <br>(count) | Número de nuevas conexiones establecidas de clientes a objetivos a través de los endpoints.|
| **aws.privatelinkservices.rst_packets_sent** <br>(count) | El número de paquetes RST enviados a los endpoints por el servicio del endpoint.|
| **aws.privatelinkendpoints.active_connections** <br>(gauge) | Número de conexiones activas simultáneas. Incluye las conexiones en los estados `SYN_SENT` y `ESTABLISHED`.|
| **aws.privatelinkendpoints.bytes_processed** <br>(count) | Número de bytes intercambiados entre endpoints y servicios del endpoint agregados en ambas direcciones.|
| **aws.privatelinkendpoints.new_connections** <br>(count) | Número de nuevas conexiones establecidas a través del endpoint.|
| **aws.privatelinkendpoints.packets_dropped** <br>(count) | Número de paquetes perdidos por el endpoint.|
| **aws.privatelinkendpoints.rst_packets_received** <br>(count) | Número de paquetes RST recibidos por el endpoint.|

### Eventos

La integración AWS PrivateLink no incluye eventos.

### Checks de servicio

La integración AWS PrivateLink no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Conéctate a Datadog a través de AWS PrivateLink](https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/)