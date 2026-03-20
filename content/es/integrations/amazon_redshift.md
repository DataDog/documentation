---
aliases:
- /es/integrations/awsredshift/
app_id: amazon_redshift
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea las métricas clave de Amazon Redshift.
title: Amazon Redshift
---
## Información general

Amazon Redshift es un servicio de almacén de datos a escala de petabytes, rápido y totalmente gestionado que simplifica y rentabiliza el análisis eficaz de todos tus datos.

Habilita esta integración para ver todas tus métricas Redshift en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Redshift` está activado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon Redshift:

   - `redshift:DescribeClusters`: Enumera todos los clústeres Redshift de tu cuenta.
   - `redshift:DescribeLoggingStatus`: Accede al bucket de S3 donde se almacenan los logs Redshift.
   - `tag:GetResources`: Aplica etiquetas (tags) personalizadas a tus clústeres Redshift.

   Para más información, consulta las [Políticas de Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html) en el sitio web de AWS.

1. Instala la [integración de Datadog y Amazon Redshift](https://app.datadoghq.com/integrations/amazon-redshift).

### Recopilación de logs

#### Activar logging

Habilita primero el registro en tu clúster de Redshift para recopilar tus logs. Los logs de Redshift pueden escribirse en un bucket de Amazon S3 y [consumirse mediante una función Lambda](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets). Para obtener más información, consulta [Configuración de la auditoría mediante la consola](https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.

1. Una vez instalada la función Lambda, hay dos formas de recopilar tus logs Redshift:

   - Automáticamente: los logs de Redshift se gestionan automáticamente si concedes acceso a Datadog con un conjunto de permisos. Consulta [Configuración automática de activadores](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) para obtener más información sobre la configuración de la recopilación automática de logs en la función de Lambda del Datadog Forwarder.
   - Manualmente: En la consola de AWS, añade un activador en el bucket de S3 que contiene tus logs Redshift. Consulta los [pasos de instalación manual](#manual-installation-steps).

#### Pasos de la instalación manual

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3**.
1. Selecciona el bucket de S3 que contiene tus logs Redshift.
1. Deja el tipo de evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.redshift.commit_queue_length** <br>(count) | El número de transacciones por delante de una transacción en la cola de confirmación.<br>_Se muestra como transacción_ |
| **aws.redshift.concurrency_scaling_active_clusters** <br>(count) | El número de clústeres de escalado de concurrencia que están procesando activamente consultas en un momento dado.|
| **aws.redshift.concurrency_scaling_seconds** <br>(gauge) | Número de segundos utilizados por los clústeres de escalado de concurrencia que tienen actividad activa de procesamiento de consultas.<br>_Se muestra como segundo_ |
| **aws.redshift.cpuutilization** <br>(gauge) | Porcentaje de utilización de la CPU. En el caso de los clústeres, esta métrica representa una agregación de los valores de utilización de la CPU de todos los nodos (líder y de cómputo).<br>_Se muestra como porcentaje_ |
| **aws.redshift.database_connections** <br>(gauge) | El número de conexiones de base de datos a un clúster.<br>_Se muestra como conexión_ |
| **aws.redshift.health_status** <br>(gauge) | Indica el estado del clúster. 1 indica que está en buen estado y 0 indica que no lo está.|
| **aws.redshift.maintenance_mode** <br>(gauge) | Indica si el clúster está en modo de mantenimiento. 1 indica activado y 0 desactivado.|
| **aws.redshift.max_configured_concurrency_scaling_clusters** <br>(count) | El número máximo de clústeres de escalado en concurrencia configurados desde el grupo de parámetros.|
| **aws.redshift.network_receive_throughput** <br>(rate) | La velocidad a la que el nodo o clúster recibe datos.<br>_Se muestra como byte_ |
| **aws.redshift.network_transmit_throughput** <br>(rate) | La velocidad a la que el nodo o clúster escribe datos.<br>_Se muestra como byte_ |
| **aws.redshift.num_exceeded_schema_quotas** <br>(count) | Número de esquemas con cuotas superadas.|
| **aws.redshift.percentage_disk_space_used** <br>(gauge) | El porcentaje de espacio en disco utilizado.<br>_Se muestra como porcentaje_ |
| **aws.redshift.percentage_quota_used** <br>(gauge) | Porcentaje de espacio de disco o almacenamiento utilizado en relación con la cuota de esquema configurada.<br>_Se muestra como porcentaje_ |
| **aws.redshift.queries_completed_per_second** <br>(count) | Número medio de consultas realizadas por segundo. Se informa en intervalos de cinco minutos.<br>_Se muestra como consulta_ |
| **aws.redshift.query_duration** <br>(gauge) | Tiempo medio necesario para completar una consulta. Se informa en intervalos de cinco minutos.<br>_Se muestra como microsegundo_ |
| **aws.redshift.query_runtime_breakdown** <br>(gauge) | Desglose del tiempo de ejecución de consultas de AWS Redshift|
| **aws.redshift.read_iops** <br>(rate) | El número medio de operaciones de lectura de disco por segundo.<br>_Se muestra como operación_ |
| **aws.redshift.read_latency** <br>(gauge) | El tiempo medio que tardan las operaciones de E/S de lectura de disco.<br>_Se muestra en segundos_ |
| **aws.redshift.read_throughput** <br>(rate) | El número medio de bytes leídos del disco por segundo.<br>_Se muestra como byte_ |
| **aws.redshift.schema_quota** <br>(gauge) | La cuota configurada para un esquema.<br>_Se muestra como byte_ |
| **aws.redshift.storage_used** <br>(gauge) | El espacio de disco o almacenamiento utilizado por un esquema.<br>_Se muestra como byte_ |
| **aws.redshift.total_table_count** <br>(count) | Número de tablas de usuario abiertas en un momento determinado. Este total no incluye las tablas de Spectrum.<br>_Se muestra como tabla_ |
| **aws.redshift.wlmqueries_completed_per_second** <br>(count) | Número medio de consultas completadas por segundo para una cola de gestión de cargas de trabajo (WLM). Se informa en intervalos de cinco minutos.<br>_Se muestra como consulta_ |
| **aws.redshift.wlmquery_duration** <br>(gauge) | La duración media de tiempo para completar una consulta para una cola de gestión de carga de trabajo (WLM). Se informa en intervalos de cinco minutos.<br>_Se muestra como microsegundo_ |
| **aws.redshift.wlmqueue_length** <br>(count) | El número de consultas en espera de entrar en una cola de gestión de la carga de trabajo (WLM).<br>_Se muestra como consulta_ |
| **aws.redshift.wlmqueue_wait_time** <br>(gauge) | Tiempo total de espera de las consultas en la cola de gestión de la carga de trabajo (WLM).<br>_Se muestra en milisegundos_ |
| **aws.redshift.wlmrunning_queries** <br>(count) | El número de consultas que se ejecutan tanto desde el clúster principal como desde el clúster de escalado en concurrencia por cola de WLM.<br>_Se muestra como consulta_ |
| **aws.redshift.write_iops** <br>(rate) | El número medio de operaciones de escritura por segundo.<br>_Se muestra como operación_ |
| **aws.redshift.write_latency** <br>(gauge) | Tiempo medio que tardan las operaciones de E/S de escritura en disco.<br>_Se muestra en segundos_ |
| **aws.redshift.write_throughput** <br>(rate) | El número medio de bytes escritos en disco por segundo.<br>_Se muestra como byte_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Redshift no incluye eventos.

### Checks de servicio

La integración Amazon Redshift no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).