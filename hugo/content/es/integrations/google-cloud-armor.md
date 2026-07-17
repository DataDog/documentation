---
aliases:
- /es/integrations/google_cloud_armor
app_id: google-cloud-armor
categories:
- google cloud
- red
- seguridad
custom_kind: integración
description: Consultar métricas, eventos y logs de Google Cloud Armor en Datadog
further_reading:
- link: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
  tag: blog
  text: Monitorizar ataques a la red con Google Cloud Armor y Datadog
integration_version: 1.0.0
media: []
title: Google Cloud Armor
---
## Información general

[Google Cloud Armor](https://app.datadoghq.com/integrations/google-cloud-armor) ayuda a proteger los despliegues de Google Cloud frente a múltiples tipos de amenazas, incluidos los ataques de denegación de servicio distribuidos (DDoS) y los ataques a aplicaciones como cross-site scripting (XSS) e inyección de SQL (SQLi).

Managed Protection de Armor es el servicio gestionado de protección para aplicaciones que ayuda a proteger las aplicaciones y los servicios web frente a ataques DDoS distribuidos y otras amenazas de Internet. Managed Protection cuenta con protecciones siempre activas para los balanceadores de carga y proporciona acceso a las reglas WAF.

Google Cloud Armor se integra automáticamente con Security Command Center y exporta dos hallazgos al dashboard del Security Command Center: pico de tráfico permitido e índice de denegación creciente.

Habilita esta integración junto con la integración del Security Command Center con Google Cloud para visualizar las amenazas DDoS a tu entorno Google Cloud en Datadog. Con esta integración, Datadog recopila importantes eventos de seguridad de tus configuraciones y métricas de seguridad de red de Google Cloud desde Google Cloud Armor.

Esta integración ofrece información de la actividad de los usuarios sobre cambios en recursos de nube y en cada solicitud evaluada por una política de seguridad, desde logs de auditoría a logs de solicitudes.

## Configuración

### Instalación

1. Antes de empezar, asegúrate de que las siguientes API están habilitadas para los proyectos de los que quieres recopilar eventos de Google Cloud Armor:

- [API de Cloud Resource Manager](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
- [API de Google Cloud Billing](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
- [API de Google Cloud Monitoring](https://console.cloud.google.com/apis/library/monitoring.googleapis.com)
- [API del Google Cloud Security Command Center](https://console.cloud.google.com/apis/library/securitycenter.googleapis.com)

2. Dado que los eventos de Google Cloud Armor se simplifican como hallazgos en el Google Security Command Center, asegúrate de que Google Cloud Armor esté habilitado en el Security Command Center de tu consola de Google Cloud. Para obtener más información, consulta [Configuración del Security Command Center](https://console.cloud.google.com/security/command-center/overview).

1. A continuación, habilita la recopilación de hallazgos de seguridad en la [integración principal de Google Cloud Platform](https://app.datadoghq.com/integrations/google-cloud-platform). 

### Configuración

Para recopilar métricas de Google Cloud Armor, configura la principal integración Google Cloud.

Para recopilar eventos de Google Cloud Armor, debes añadir el rol de Visor de hallazgos del Security Center a la cuenta de servicio.
Instala la integración del Security Command Center de Google Cloud y habilita la recopilación de hallazgos de seguridad en la principal integración de Google Cloud.

Para configurar el reenvío de logs desde tu entorno de Google Cloud a Datadog, consulta la sección [Recopilación de logs](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Los logs de auditoría pueden reenviarse utilizando el reenvío estándar de logs. Estos logs de auditoría utilizan los tipos de recursos
`gce_backend_service` y `network_security_policy` de Google Cloud. Para incluir únicamente logs de auditoría,
utiliza filtros como `protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"` al
crear el sumidero de logs.

Los logs de solicitudes pueden reenviarse utilizando el reenvío estándar de logs. Estos logs se recopilan automáticamente
en logs de balanceo de carga de Google Cloud. Utiliza filtros como
`jsonPayload.enforcedSecurityPolicy.outcome="DENY"` al crear el sumidero de logs para ver las solicitudes
denegadas por una política de seguridad.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.networksecurity.dos.ingress_bytes_count** <br>(count) | El número total de bytes recibidos, desglosado por estado de caída (permitido o caído).<br>_Se muestra como byte_ |
| **gcp.networksecurity.dos.ingress_packets_count** <br>(count) | El número total de paquetes recibidos, desglosados por estado de caída (permitidos o descartados).<br>_Se muestra como paquete_ |
| **gcp.networksecurity.firewall_endpoint.received_bytes_count** <br>(count) | Total de bytes recibidos del endpoint de firewall.<br>_Se muestra como byte_ |
| **gcp.networksecurity.firewall_endpoint.received_packets_count** <br>(count) | Total de paquetes recibidos por el endpoint de firewall.<br>_Se muestra como paquete_ |
| **gcp.networksecurity.firewall_endpoint.sent_bytes_count** <br>(count) | Total de bytes enviados por el endpoint de firewall.<br>_Se muestra como byte_ |
| **gcp.networksecurity.firewall_endpoint.sent_packets_count** <br>(count) | Total de paquetes enviados por el endpoint de firewall.<br>_Se muestra como paquete_ |
| **gcp.networksecurity.firewall_endpoint.threats_count** <br>(count) | Total de amenazas detectadas en los endpoints de firewall.|
| **gcp.networksecurity.https.previewed_request_count** <br>(count) | Consultas que se verían afectadas por las reglas actualmente en modo "vista previa", si dichas reglas se convirtieran en no vistas previas.<br>_Se muestra como solicitud_ |
| **gcp.networksecurity.https.request_count** <br>(count) | Número real de consultas afectadas por la aplicación de la política de consultas.<br>_Se muestra como solicitud_ |
| **gcp.networksecurity.l3.external.packet_count** <br>(count) | Número estimado de paquetes por regla coincidente y acción de aplicación.<br>_Se muestra como paquete_ |
| **gcp.networksecurity.l3.external.preview_packet_count** <br>(count) | Número estimado de paquetes que se verían afectados por la regla actualmente en modo de vista previa, si dicha regla se convirtiera en no vista previa.<br>_Se muestra como paquete_ |
| **gcp.networksecurity.tcp_ssl_proxy.new_connection_count** <br>(count) | Nuevas conexiones afectadas por la aplicación de la política.<br>_Se muestra como conexión_ |
| **gcp.networksecurity.tcp_ssl_proxy.previewed_new_connection_count** <br>(count) | Nuevas conexiones que se verían afectadas por las reglas actualmente en modo "vista previa", si dichas reglas se convirtieran en no vistas previas.<br>_Se muestra como conexión_ |

### Checks de servicio

La integración Google Cloud Armor no incluye checks de servicios.

### Eventos

La integración Google Cloud Armor no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar ataques a la red con Google Cloud Armor y Datadog](https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/)