---
aliases:
- /es/integrations/google_cloud_tasks
app_id: google-cloud-tasks
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
description: Un servicio gestionado para administrar la ejecución, el envío y la entrega
  de un gran número de tareas distribuidas.
media: []
title: Google Cloud Tasks
---
## Información general

Google Cloud Tasks es un servicio totalmente gestionado que permite administrar la ejecución, el envío y la entrega de un gran número de tareas distribuidas.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Tasks.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Tasks se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Tasks de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Tasks.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.cloudtasks.api.request_count** <br>(count) | Recuento de llamadas a la API de Cloud Tasks.<br>_Se muestra como solicitud_ |
| **gcp.cloudtasks.queue.depth** <br>(gauge) | El número de tareas en la cola.|
| **gcp.cloudtasks.queue.task_attempt_count** <br>(count) | Recuento de intentos de tarea desglosados por código de respuesta.|
| **gcp.cloudtasks.queue.task_attempt_delays.avg** <br>(gauge) | Retraso entre cada hora de intento programado y la hora de intento real.<br>_Se muestra en milisegundos_ |
| **gcp.cloudtasks.queue.task_attempt_delays.samplecount** <br>(count) | Recuento de muestras de los retrasos en los intentos de tareas.<br>_Se muestra en milisegundos_ |
| **gcp.cloudtasks.queue.task_attempt_delays.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado para los retrasos en los intentos de tareas.<br>_Se muestra como segundo_ |

### Eventos

La integración Google Cloud Tasks no incluye eventos.

### Checks de servicio

La integración Google Cloud Tasks no checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).