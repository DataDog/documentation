---
aliases:
- /es/integrations/google_cloud_iot
app_id: google-cloud-iot
categories:
- nube
- google cloud
- iot
- recopilación de logs
custom_kind: integración
description: Conecta, gestiona e ingiere datos de forma fácil y segura de millones
  de dispositivos dispersos por todo el mundo.
media: []
title: Google Cloud IoT
---
## Información general

Cloud IoT es un servicio totalmente gestionado que permite conectar, gestionar e ingerir datos de forma fácil y segura desde millones de dispositivos dispersos por todo el mundo.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud IoT.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud IoT se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud IoT de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud IoT.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.cloudiot.device.active_devices** <br>(gauge) | Recuento del número de dispositivos que han enviado datos recientemente a Cloud IoT Core.<br>_Se muestra como dispositivo_ |
| **gcp.cloudiot.device.billing_bytes_count** <br>(gauge) | Recuento del número de bytes facturables transferidos por dispositivos.<br>_Se muestra en bytes_ |
| **gcp.cloudiot.device.error_count** <br>(count) | Recuento delta de errores de comunicación con dispositivos, agrupados por tipo de error.<br>_Se muestra como error_ |
| **gcp.cloudiot.device.operation_count** <br>(count) | Recuento delta de operaciones realizadas agrupadas por tipo de operación.<br>_Se muestra como operación_ |
| **gcp.cloudiot.device.received_bytes_count** <br>(count) | Recuento delta del número de bytes recibidos de dispositivos.<br>_Se muestra en bytes_ |
| **gcp.cloudiot.device.sent_bytes_count** <br>(count) | Recuento delta del número de bytes enviados por dispositivos.<br>_Se muestra en bytes_ |

### Eventos

La integración Google Cloud IoT no incluye eventos.

### Checks de servicio

La integración Google Cloud IoT no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).