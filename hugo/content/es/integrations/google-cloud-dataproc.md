---
aliases:
- /es/integrations/google_cloud_dataproc
app_id: google-cloud-dataproc
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
description: Servicio gestionado en la nube para una operación rentable de clústeres
  Spark y Hadoop de Apache.
media: []
title: Google Cloud Dataproc
---
## Información general

<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costes de tus tareas de Spark en tus clústeres Dataproc.
</div>

Google Cloud Dataproc es un servicio de nube rápido, fácil de utilizar y totalmente gestionado para ejecutar clústeres Apache Spark y Apache Hadoop de una forma más sencilla y rentable.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Dataproc.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Dataproc se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Dataproc de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Dataproc.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.dataproc.batch.spark.executors** <br>(gauge) | Indica el número de ejecutores de batches Spark.<br>_Se muestra como worker_ |
| **gcp.dataproc.cluster.capacity_deviation** <br>(gauge) | Diferencia entre el recuento de nodos esperado en el clúster y los gestores de nodos YARN activos reales.|
| **gcp.dataproc.cluster.hdfs.datanodes** <br>(gauge) | Indica el número de HDFS DataNodes que se están ejecutando en un clúster.<br>__Se muestra como nodo_ |
| **gcp.dataproc.cluster.hdfs.storage_capacity** <br>(gauge) | Indica la capacidad del sistema HDFS que se ejecuta en un clúster en GB.<br>_Se muestra en gibibytes_ |
| **gcp.dataproc.cluster.hdfs.storage_utilization** <br>(gauge) | Porcentaje de almacenamiento HDFS utilizado actualmente.<br>_Se muestra como porcentaje_ |
| **gcp.dataproc.cluster.hdfs.unhealthy_blocks** <br>(gauge) | Indica el número de bloques no sanos en el clúster.<br>_Se muestra como bloque_ |
| **gcp.dataproc.cluster.job.completion_time.avg** <br>(gauge) | Tiempo que tardan en finalizar los trabajos desde que el usuario envía un trabajo hasta que Dataproc informa de que ha finalizado.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.job.completion_time.samplecount** <br>(count) | Recuento de muestras del tiempo de finalización de un trabajo en el clúster.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.job.completion_time.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del tiempo de finalización de un trabajo en el clúster.<br>_Se muestra en segundos_ |
| **gcp.dataproc.cluster.job.duration.avg** <br>(gauge) | Tiempo que los trabajos han pasado en un estado determinado.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.job.duration.samplecount** <br>(count) | Recuento de muestras de la duración de un trabajo en el clúster<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.job.duration.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la duración de un trabajo en el clúster.<br>_Se muestra en segundos_ |
| **gcp.dataproc.cluster.job.failed_count** <br>(count) | Indica el número de trabajos que han fallado en un clúster.<br>_Se muestra en trabajo_ |
| **gcp.dataproc.cluster.job.running_count** <br>(gauge) | Indica el número de trabajos que se están ejecutando en un clúster.<br>_Se muestra como trabajo_ |
| **gcp.dataproc.cluster.job.submitted_count** <br>(count) | Indica el número de trabajos que se han enviado a un clúster.<br>_Se muestra como trabajo_ |
| **gcp.dataproc.cluster.mig_instances.failed_count** <br>(count) | Indica el número de fallos de instancia de un grupo de instancias gestionado.|
| **gcp.dataproc.cluster.nodes.expected** <br>(gauge) | Indica el número de nodos que se esperan en un clúster.<br>_Se muestra como nodo_ |
| **gcp.dataproc.cluster.nodes.failed_count** <br>(count) | Indica el número de nodos que han fallado en un clúster.<br>_Se muestra como nodo_ |
| **gcp.dataproc.cluster.nodes.recovered_count** <br>(count) | Indica el número de nodos que se han detectado como fallidos y se han eliminado con éxito del clúster.<br>_Se muestra como nodo_ |
| **gcp.dataproc.cluster.nodes.running** <br>(gauge) | Indica el número de nodos en estado de ejecución.<br>_Se muestra como nodo_ |
| **gcp.dataproc.cluster.operation.completion_time.avg** <br>(gauge) | Tiempo que han tardado en finalizar las operaciones desde el momento en que el usuario envía una operación hasta el momento en que Dataproc informa que ha finalizado.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.operation.completion_time.samplecount** <br>(count) | Recuento de muestras del tiempo de finalización de una operación de clúster.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.operation.completion_time.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado del tiempo de finalización de una operación de cluster.<br>_Se muestra en segundos_ |
| **gcp.dataproc.cluster.operation.duration.avg** <br>(gauge) | Tiempo que han pasado las operaciones en un estado determinado.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.operation.duration.samplecount** <br>(count) | Recuento de muestras de la duración de una operación de cluster.<br>_Se muestra en milisegundos_ |
| **gcp.dataproc.cluster.operation.duration.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la duración de una operación de cluster.<br>_Se muestra en segundos_ |
| **gcp.dataproc.cluster.operation.failed_count** <br>(count) | Indica el número de operaciones que han fallado en un clúster.<br>_Se muestra como operación_ |
| **gcp.dataproc.cluster.operation.running_count** <br>(gauge) | Indica el número de operaciones que se están ejecutando en un clúster.<br>_Se muestra como operación_ |
| **gcp.dataproc.cluster.operation.submitted_count** <br>(count) | Indica el número de operaciones que se han enviado a un clúster.<br>_Se muestra como operación_ |
| **gcp.dataproc.cluster.yarn.allocated_memory_percentage** <br>(gauge) | Porcentaje de memoria YARN se asigna.<br>_Se muestra como porcentaje_ |
| **gcp.dataproc.cluster.yarn.apps** <br>(gauge) | Indica el número de aplicaciones YARN activas.|
| **gcp.dataproc.cluster.yarn.containers** <br>(gauge) | Indica el número de contenedores YARN.<br>_Se muestra como contenedor_ |
| **gcp.dataproc.cluster.yarn.memory_size** <br>(gauge) | Indica el tamaño de la memoria YARN en GB.<br>_Se muestra en gibibytes_ |
| **gcp.dataproc.cluster.yarn.nodemanagers** <br>(gauge) | Indica el número de NodeManagers YARN que se ejecutan en el clúster.|
| **gcp.dataproc.cluster.yarn.pending_memory_size** <br>(gauge) | Solicitud de memoria actual, en GB, que está pendiente de ser atendida por el programador.<br>_Se muestra en gibibytes_ |
| **gcp.dataproc.cluster.yarn.virtual_cores** <br>(gauge) | Indica el número de núcleos virtuales en YARN.<br>_Se muestra como núcleo_ |
| **gcp.dataproc.job.state** <br>(gauge) | Indica si un trabajo se encuentra actualmente en un estado determinado o no.|
| **gcp.dataproc.job.yarn.memory_seconds** <br>(gauge) | Indica los segundos de memoria consumidos por el trabajo `job_id` por `application_id` Yarn.|
| **gcp.dataproc.job.yarn.vcore_seconds** <br>(gauge) | Indica los segundos VCore consumidos por el trabajo `job_id` por `application_id` Yarn.|
| **gcp.dataproc.node.problem_count** <br>(count) | Número total de veces que se ha producido un tipo específico de problema.|
| **gcp.dataproc.node.yarn.nodemanager.health** <br>(gauge) | Estado de salud de YARN NodeManager.|
| **gcp.dataproc.session.spark.executors** <br>(gauge) | Indica el número de ejecutores de sesiones Spark.<br>_Se muestra como worker_ |

### Eventos

La integración Google Cloud Dataproc no incluye eventos.

### Checks de servicio

La integración Google Cloud Dataproc no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).