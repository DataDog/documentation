---
aliases:
- /es/integrations/google_cloud_bigquery
app_id: google-cloud-bigquery
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: BigQuery de Google es el almacén de datos empresariales de bajo coste,
  totalmente gestionado y a escala de petabyte para realizar análisis.
media: []
title: Google BigQuery
---
{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Únete a la vista previa." >}}
La monitorización ampliada de BigQuery está en vista previa. Usa este formulario para inscribirte y obtener información sobre tu rendimiento de consulta.
{{< /callout >}}

## Información general

La integración de Datadog con Google BigQuery proporciona monitorización para tus cargas de trabajo de análisis de datos.

Al conectar BigQuery con Datadog (mediante la integración con Google Cloud Platform), se obtiene información en tiempo real sobre el rendimiento de las consultas, el consumo de recursos y los factores de coste.

Esta integración te permite realizar un seguimiento de métricas críticas, como los tiempos de finalización de trabajos, el uso de ranuras y los bytes procesados, lo que te permite identificar latencias elevadas durante la ejecución de trabajos de BigQuery.

## Configuración

### Instalación

Si aún no lo ha hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Monitorización ampliada de BigQuery

La monitorización ampliada de BigQuery te proporciona una visibilidad granular de tus entornos BigQuery.

Consulta la [documentación sobre la integración de Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/#expanded-bigquery-monitoring) para obtener instrucciones detalladas sobre la configuración.

### Recopilación de logs

Los logs de Google BigQuery se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Pub/Sub en la nube. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google BigQuery desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google BigQuery.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.bigquery.job.num_in_flight** <br>(gauge) | Número de trabajos en vuelo.<br>_Se muestra como trabajo_ |
| **gcp.bigquery.query.biengine_fallback_count** <br>(count) | Las razones por las que las consultas fallaron en la ejecución del BI Engine.<br>_Se muestra como consulta_ |
| **gcp.bigquery.query.column_metadata_index_staleness.avg** <br>(gauge) | La distribución media de estancamiento en milisegundos del índice de metadatos de columna para las consultas que utilizaron con éxito el índice de metadatos de columna en el último intervalo de muestreo.<br>_Se muestra como milisegundo_ |
| **gcp.bigquery.query.column_metadata_index_staleness.samplecount** <br>(gauge) | El recuento de muestras para la distribución de la caducidad en milisegundos del índice de metadatos de columna para las consultas que utilizaron con éxito el índice de metadatos de columna en el último intervalo de muestreo.<br>_Se muestra como milisegundo_ |
| **gcp.bigquery.query.column_metadata_index_staleness.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la distribución de la caducidad en milisegundos del índice de metadatos de columna para las consultas que utilizaron con éxito el índice de metadatos de columna en el último intervalo de muestreo.<br>_Se muestra como milisegundo_ |
| **gcp.bigquery.query.count** <br>(gauge) | Consultas en vuelo.<br>_Se muestra como consulta_ |
| **gcp.bigquery.query.execution_count** <br>(count) | Número de consultas ejecutadas.<br>_Se muestra como consulta_ |
| **gcp.bigquery.query.execution_times.avg** <br>(gauge) | Media de los tiempos de ejecución de las consultas.<br>_Se muestra como segundo_ |
| **gcp.bigquery.query.execution_times.samplecount** <br>(count) | Recuento de muestra de los tiempos de ejecución de la consulta.<br>_Se muestra como segundo_ |
| **gcp.bigquery.query.execution_times.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de los tiempos de ejecución de las consultas.<br>_Se muestra como segundo_ |
| **gcp.bigquery.query.scanned_bytes** <br>(rate) | Número de bytes escaneados. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.query.scanned_bytes_billed** <br>(rate) | Número de bytes escaneados facturados. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.query.statement_scanned_bytes** <br>(count) | Bytes escaneados desglosados por tipo de extracto. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.query.statement_scanned_bytes_billed** <br>(count) | Bytes escaneados facturados desglosados por tipo de extracto. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.slots.allocated** <br>(gauge) | Número de ranuras de BigQuery asignadas actualmente para un proyecto, la asignación de ranuras puede desglosarse en función de la reserva y del tipo de trabajo.|
| **gcp.bigquery.slots.allocated_for_project** <br>(gauge) | Número de ranuras de BigQuery asignadas actualmente para un proyecto.|
| **gcp.bigquery.slots.allocated_for_project_and_job_type** <br>(gauge) | Número de ranuras de BigQuery asignadas actualmente para el tipo de proyecto y trabajo.|
| **gcp.bigquery.slots.allocated_for_reservation** <br>(gauge) | Número de ranuras de BigQuery asignadas actualmente para un proyecto en la reserva.|
| **gcp.bigquery.slots.assigned** <br>(gauge) | Número de ranuras asignadas a un proyecto u organización dado.|
| **gcp.bigquery.slots.capacity_committed** <br>(gauge) | El total de compromisos de capacidad de ranuras adquiridas a través de este proyecto u organización de administrador.|
| **gcp.bigquery.slots.max_assigned** <br>(gauge) | El número máximo de ranuras asignadas al proyecto u organización dado.|
| **gcp.bigquery.slots.total_allocated_for_reservation** <br>(gauge) | Número de ranuras de BigQuery asignadas actualmente en todos los proyectos de la reserva.|
| **gcp.bigquery.storage.insertall_inserted_bytes** <br>(count) | El número de bytes cargados por proyecto utilizando la API InsertAll streaming.<br>_Se muestra como byte_ |
| **gcp.bigquery.storage.insertall_inserted_rows** <br>(count) | El número de filas cargadas por el proyecto utilizando la API InsertAll streaming.<br>_Se muestra como fila_ |
| **gcp.bigquery.storage.stored_bytes** <br>(gauge) | Número de bytes almacenados. Nota: Esta métrica está disponible con un retraso de tres horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.storage.table_count** <br>(gauge) | Número de tablas. Nota: Esta métrica está disponible con un retraso de tres horas.<br>_Se muestra como tabla_ |
| **gcp.bigquery.storage.uploaded_bytes** <br>(count) | Número de bytes cargados. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.storage.uploaded_bytes_billed** <br>(count) | Número de bytes cargados facturados. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como byte_ |
| **gcp.bigquery.storage.uploaded_row_count** <br>(count) | Número de filas cargadas. Nota: Esta métrica está disponible con un retraso de seis horas.<br>_Se muestra como fila_ |

### Eventos

La integración Google BigQuery no incluye eventos.

### Checks de servicio

La integración Google BigQuery no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).