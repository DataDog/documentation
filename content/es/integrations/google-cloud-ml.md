---
aliases:
- /es/integrations/google_cloud_ml
app_id: google-cloud-ml
categories:
- nube
- google cloud
- recopilación de logs
- ia/ml
custom_kind: integración
description: Servicio gestionado para crear fácilmente modelos de machine learning
  para datos de cualquier tipo o tamaño.
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: blog
  text: 'Monitorización de modelos de machine learning: prácticas recomendadas'
media: []
title: Google Cloud ML
---
## Información general

Google Cloud Machine Learning es un servicio gestionado que permite crear fácilmente modelos de Machine Learning, que funcionen con cualquier tipo de datos, de cualquier tamaño.

Obtén métricas de Google Machine Learning para:

- Visualizar el rendimiento de tus servicios de ML.
- Correlacionar el rendimiento de tus servicios de ML con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo ha hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Machine Learning se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Machine Learning de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Machine Learning.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.ml.prediction.error_count** <br>(count) | Recuento acumulado de errores de predicción.|
| **gcp.ml.prediction.latencies.avg** <br>(count) | Latencia media de un determinado tipo.<br>_Se muestra en microsegundos_ |
| **gcp.ml.prediction.latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de un determinado tipo.<br>_Se muestra en microsegundos_ |
| **gcp.ml.prediction.latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la latencia de un determinado tipo.<br>_Se muestra en microsegundos_ |
| **gcp.ml.prediction.online.accelerator.duty_cycle** <br>(gauge) | Fracción media de tiempo durante el último periodo de muestreo en el que el o los aceleradores estuvieron procesando activamente.|
| **gcp.ml.prediction.online.accelerator.memory.bytes_used** <br>(gauge) | Cantidad de memoria del acelerador asignada por la réplica del modelo.<br>_Se muestra en bytes_ |
| **gcp.ml.prediction.online.cpu.utilization** <br>(gauge) | Fracción de CPU asignada por la réplica del modelo y actualmente en uso. Puede superar el 100% si el tipo de máquina tiene varias CPU.|
| **gcp.ml.prediction.online.memory.bytes_used** <br>(gauge) | Cantidad de memoria asignada por la réplica del modelo y actualmente en uso.<br>_Se muestra en bytes_ |
| **gcp.ml.prediction.online.network.bytes_received** <br>(count) | Número de bytes recibidos a través de la red por la réplica del modelo.<br>_Se muestra en bytes_ |
| **gcp.ml.prediction.online.network.bytes_sent** <br>(count) | Número de bytes enviados a través de la red por la réplica del modelo.<br>_Se muestra en bytes_ |
| **gcp.ml.prediction.online.replicas** <br>(gauge) | Número de réplicas activas del modelo.|
| **gcp.ml.prediction.online.target_replicas** <br>(gauge) | Número deseado de réplicas activas del modelo.|
| **gcp.ml.prediction.prediction_count** <br>(count) | Recuento acumulado de predicciones.|
| **gcp.ml.prediction.response_count** <br>(count) | Recuento acumulado de diferentes códigos de respuesta.|
| **gcp.ml.training.accelerator.memory.utilization** <br>(gauge) | Fracción de la memoria del acelerador asignada que está actualmente en uso. Los valores son números entre 0.0 y 1.0. Los gráficos muestran los valores como un porcentaje entre 0% y 100%.|
| **gcp.ml.training.accelerator.utilization** <br>(gauge) | Fracción del acelerador asignado que está actualmente en uso. Los valores son números entre 0.0 y 1.0. Los gráficos muestran los valores como un porcentaje entre 0% y 100%.|
| **gcp.ml.training.cpu.utilization** <br>(gauge) | Fracción de la CPU asignada que está actualmente en uso. Los valores son números entre 0.0 y 1.0. Los gráficos muestran los valores como un porcentaje entre 0% y 100%.|
| **gcp.ml.training.memory.utilization** <br>(gauge) | Fracción de memoria asignada que está actualmente en uso. Los valores son números entre 0.0 y 1.0. Los gráficos muestran los valores como un porcentaje entre 0% y 100%.|
| **gcp.ml.training.network.received_bytes_count** <br>(count) | Número de bytes recibidos por el trabajo de entrenamiento a través de la red.<br>_Se muestra en bytes_ |
| **gcp.ml.training.network.sent_bytes_count** <br>(count) | Número de bytes enviados por el trabajo de entrenamiento a través de la red.<br>_Se muestra en bytes_ |

### Eventos

La integración Google Cloud Machine Learning no incluye eventos.

### Checks de servicio

La integración Google Cloud Machine Learning no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}