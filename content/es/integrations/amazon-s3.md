---
aliases:
- /es/integrations/amazon_s3
app_id: amazon-s3
categories:
- aws
- métricas
- nube
- almacenes de datos
custom_kind: integración
description: Amazon S3 es un servicio de almacenamiento en la nube escalable y de
  alta disponibilidad.
media: []
title: Amazon S3
---
<div class="alert alert-info">Monitoriza las métricas de S3 y optimiza los costes de almacenamiento a nivel de prefijo con <a href="https://www.datadoghq.com/product-preview/storage-monitoring/">Storage Monitoring (vista previa)</a>.</div>

## Información general

Amazon S3 es un servicio de almacenamiento en la nube escalable y de alta disponibilidad.

Habilita esta integración para ver en Datadog todas tus métricas de S3.

**Notas**:

- Esta integración requiere que el permiso `s3:GetBucketTagging` esté totalmente habilitado.
- Las métricas de solicitud de S3 deben estar habilitadas en los propios buckets. Para obtener más información, consulta [Monitorización de métricas con Amazon CloudWatch](https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html).

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `S3` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon S3](https://app.datadoghq.com/integrations/amazon-s3).

### Recopilación de logs

#### Habilitar el acceso a logs de S3

1. Ve al bucket de S3.
1. Haz clic en **Properties** (Propiedades).
1. Ve a la sección Services Access Logging (Registro de acceso a servicios) y haz clic en **Edit** (Editar).
1. Selecciona **Enable** (Habilitar).
1. Selecciona el bucket de S3 al que deseas enviar logs.

Para obtener más información, consulta [Activación del registro de acceso al servidor de Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.

1. Una vez instalada la función de Lambda, hay dos formas de recopilar tus logs de acceso a S3:

   - Automáticamente: los logs de S3 se gestionan automáticamente si concedes acceso a Datadog con un conjunto de permisos. Consulta [Configuración automática de activadores](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) para obtener más información sobre la configuración de la recopilación automática de logs en la función de Lambda del Datadog Forwarder.
   - Manualmente: en la consola de AWS, añade un activador en el bucket de S3 que contiene tus logs de acceso de S3. Consulta los [pasos de instalación manual](#manual-installation-steps).

#### Pasos de la instalación manual

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurado, ve a la función de Lambda del Datadog Forwarder. En la sección Function Overview (Información general de la función), haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3**.
1. Selecciona el bucket de S3 que contiene tus logs de S3.
1. Deja el tipo de evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.s3.4xx_errors** <br>(count) | Número total de solicitudes HTTP 4xx de código de estado de error del cliente realizadas a un bucket.|
| **aws.s3.5xx_errors** <br>(count) | Número total de solicitudes HTTP 5xx de código de estado de error de servidor realizadas a un bucket.|
| **aws.s3.all_requests** <br>(count) | El número total de solicitudes HTTP realizadas a un bucket, independientemente del tipo.|
| **aws.s3.bucket_size_bytes** <br>(gauge) | La cantidad de datos en bytes almacenados en un bucket de la clase de almacenamiento Standard, clase de almacenamiento Standard - Infrequent Access (Standard_IA), o la clase de almacenamiento de redundancia reducida (RRS).<br>_Se muestra como byte_ |
| **aws.s3.bytes_downloaded** <br>(count) | El número total de bytes descargados del bucket.<br>_Se muestra como byte_ |
| **aws.s3.bytes_pending_replication** <br>(gauge) | El número total de bytes de objetos pendientes de replicación<br>_Se muestra como byte_ |
| **aws.s3.bytes_uploaded** <br>(count) | El número total de bytes cargados en el bucket.<br>_Se muestra como byte_ |
| **aws.s3.delete_requests** <br>(count) | Número de solicitudes HTTP DELETE realizadas para objetos de un bucket. También se incluyen las solicitudes de eliminación de varios objetos.|
| **aws.s3.first_byte_latency** <br>(gauge) | Tiempo medio por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.first_byte_latency.maximum** <br>(gauge) | El tiempo máximo por solicitud desde que una solicitud completa es recibida por un bucket hasta que la respuesta comienza a ser devuelta.<br>_Se muestra como milisegundo_ |
| **aws.s3.first_byte_latency.minimum** <br>(gauge) | El tiempo mínimo por solicitud desde que una solicitud completa es recibida por un bucket hasta que la respuesta comienza a ser devuelta.<br>_Se muestra como milisegundo_ |
| **aws.s3.first_byte_latency.p50** <br>(gauge) | El tiempo percentil 50 por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.first_byte_latency.p90** <br>(gauge) | El tiempo percentil 90 por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.first_byte_latency.p95** <br>(gauge) | El tiempo percentil 95 por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.first_byte_latency.p99** <br>(gauge) | El tiempo percentil 99 por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.first_byte_latency.p99.99** <br>(gauge) | El tiempo percentil 99.99 por solicitud desde que un bucket recibe la solicitud completa hasta que comienza a devolver la respuesta.<br>_Se muestra en milisegundos_ |
| **aws.s3.get_requests** <br>(count) | Número de solicitudes HTTP GET realizadas para objetos de un bucket. Esto no incluye las operaciones de lista.|
| **aws.s3.head_requests** <br>(count) | Número de solicitudes HTTP HEAD realizadas a un bucket.|
| **aws.s3.list_requests** <br>(count) | Número de solicitudes HTTP que enumeran el contenido de un bucket.|
| **aws.s3.number_of_objects** <br>(gauge) | El número total de objetos almacenados en un bucket para todas las clases de almacenamiento excepto para la clase de almacenamiento GLACIER.|
| **aws.s3.operations_failed_replication** <br>(gauge) | Número medio de operaciones que no se han podido replicar para una regla de replicación determinada<br>_Se muestra como operación_ |
| **aws.s3.operations_failed_replication.sum** <br>(count) | Número total de operaciones que no se han podido replicar para una regla de replicación determinada<br>_Se muestra como operación_ |
| **aws.s3.operations_failed_replication.samplecount** <br>(count) | El número total de operaciones de replicación<br>_Se muestra como operación_ |
| **aws.s3.operations_pending_replication** <br>(gauge) | El número de operaciones pendientes de replicación<br>_Se muestra como operación_ |
| **aws.s3.post_requests** <br>(count) | Número de solicitudes HTTP POST realizadas a un bucket.|
| **aws.s3.put_requests** <br>(count) | Número de solicitudes HTTP PUT realizadas para objetos de un bucket.|
| **aws.s3.replication_latency** <br>(gauge) | Número máximo de segundos que tarda la región de destino en replicarse con respecto a la región fuente<br> _Se muestra en segundos_ |
| **aws.s3.total_request_latency** <br>(gauge) | El tiempo medio transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.maximum** <br>(gauge) | El tiempo máximo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.minimum** <br>(gauge) | El tiempo mínimo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.p50** <br>(gauge) | El percentil 50 del tiempo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.p90** <br>(gauge) | El percentil 90 del tiempo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.p95** <br>(gauge) | El percentil 95 del tiempo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.p99** <br>(gauge) | El percentil 90 del tiempo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |
| **aws.s3.total_request_latency.p99.99** <br>(gauge) | El percentil 99.99 del tiempo transcurrido por solicitud desde el primer byte recibido hasta el último byte enviado a un bucket<br>_Se muestra como milisegundo_ |

### Eventos

La integración de Amazon S3 no incluye ningún evento.

### Checks de servicio

La integración de Amazon S3 no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).