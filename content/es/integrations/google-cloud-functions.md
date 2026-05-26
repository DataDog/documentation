---
aliases:
- /es/integrations/google_cloud_functions
app_id: google-cloud-functions
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
description: Una solución de computación asíncrona basada en eventos que permite la
  creación de pequeñas funciones de propósito único.
media: []
title: Google Cloud Functions
---
## Información general

Google Cloud Functions es una solución informática asíncrona, ligera y basada en eventos que permite crear pequeñas funciones de un solo propósito.

Obtén métricas de Google Functions para:

- Visualizar el rendimiento de tus funciones.
- Correlacionar el rendimiento de tus funciones con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Functions se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Functions de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Functions.
1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.cloudfunctions.function.active_instances** <br>(gauge) | Número de instancias de función activas.<br>_Se muestra como instancia_ |
| **gcp.cloudfunctions.function.execution_count** <br>(count) | Número de ejecuciones de funciones.<br>_Se muestra como ocurrencia_ |
| **gcp.cloudfunctions.function.execution_times.avg** <br>(gauge) | Media de los tiempos de ejecución de funciones.<br>_Se muestra en nanosegundos_ |
| **gcp.cloudfunctions.function.execution_times.p95** <br>(gauge) | Percentil 95 de los tiempos de ejecución de funciones.<br>_Se muestra en nanosegundos_ |
| **gcp.cloudfunctions.function.execution_times.p99** <br>(gauge) | Percentil 90 de los tiempos de ejecución de funciones.<br>_Se muestra en nanosegundos_ |
| **gcp.cloudfunctions.function.execution_times.samplecount** <br>(count) | Recuento de muestras de los tiempos de ejecución de funciones.<br>_Se muestra como ocurrencia_ |
| **gcp.cloudfunctions.function.execution_times.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de los tiempos de ejecución de funciones.<br>_Se muestra en nanosegundos_ |
| **gcp.cloudfunctions.function.instance_count** <br>(gauge) | Número de instancias de función desglosadas por estado.<br>_Se muestra como instancia_ |
| **gcp.cloudfunctions.function.network_egress** <br>(gauge) | Tráfico de red saliente de una función.<br>_Se muestra en bytes_ |
| **gcp.cloudfunctions.function.user_memory_bytes.avg** <br>(gauge) | Uso medio de memoria de la función durante la ejecución.<br>_Se muestra en bytes_ |
| **gcp.cloudfunctions.function.user_memory_bytes.p95** <br>(gauge) | Percentil 95 del uso de memoria de la función durante la ejecución.<br>_Se muestra en bytes_ |
| **gcp.cloudfunctions.function.user_memory_bytes.p99** <br>(gauge) | Percentil 99 del uso de memoria de la función durante la ejecución.<br>_Se muestra en bytes_ |
| **gcp.cloudfunctions.function.user_memory_bytes.samplecount** <br>(count) | Recuento de muestras del uso de memoria de la función.<br>_Se muestra como ocurrencia_ |
| **gcp.cloudfunctions.function.user_memory_bytes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del uso de memoria de la función.<br>_Se muestra en bytes_ |
| **gcp.cloudfunctions.pending_queue.pending_requests** <br>(gauge) | Número de solicitudes pendientes.|

### Eventos

La integración Google Cloud Functions no incluye eventos.

### Checks de servicio

La integración Google Cloud Functions no incluye checks de servicio.

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).