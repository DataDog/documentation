---
aliases:
- /es/integrations/amazon_cloudfront
app_id: amazon-cloudfront
categories:
- aws
- métricas
- nube
custom_kind: integración
description: Amazon CloudFront es un servicio global de red de entrega de contenido
  (CDN) que acelera la entrega de tus recursos web.
integration_version: 1.0.0
media: []
title: Amazon CloudFront
---
## Información general

Amazon CloudFront es un servicio de red de entrega de contenido global (CDN) que acelera la entrega de tus sitios web, APIs, contenido de vídeo u otros activos web.

Habilita esta integración para ver en Datadog todas tus métricas de CloudFront.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CloudFront` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon CloudFront](https://app.datadoghq.com/integrations/amazon-cloudfront).
1. Opcional: Habilita [métricas de distribución adicionales de CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html) para obtener una mayor visibilidad del rendimiento del tráfico de CloudFront.

### Recopilación de logs

{{< tabs >}}

{{% tab "Logs estándar" %}}

#### Activar logging

Cuando habilites el registro de CloudFront para una distribución, especifica el bucket de Amazon S3 en el que deseas que CloudFront almacene los archivos de log. Si utilizas Amazon S3 como origen, Datadog recomienda no utilizar el mismo bucket para los archivos de log; el uso de un bucket independiente simplifica el mantenimiento.

**Nota**: Datadog recomienda almacenar los archivos de log de varias distribuciones en el mismo bucket para que el forwarder de log sólo tenga que suscribirse a un bucket.

<div class="alert alert-info">
Para categorizar automáticamente logs con la fuente de CloudFront, especifica <code>cloudfront</code> como prefijo para los nombres de archivo al habilitar el registro. Caso contrario, los logs se categorizarán como <code>s3</code>.
</div>

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3**.
1. Selecciona el bucket de S3 que contiene tus logs de CloudFront.
1. Deja el tipo de evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

{{% /tab %}}

{{% tab "Logs en tiempo real" %}}

#### Activar logging

##### Crear una configuración específica

Al crear una configuración de logs en tiempo real, puedes especificar qué campos de log quieres recibir. Por defecto, se seleccionan todos los [campos disponibles](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields).

![CloudFront logging 3](images/cloudfront_logging_3.png)

Datadog recomienda que mantengas esta configuración predeterminada y añadas la siguiente regla personalizada de parseo para procesar los logs automáticamente con todos los campos activados.

Ve a la [página Pipelines](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields), busca Amazon CloudFront, [crea o edita un procesador de analizador grok](https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#grok-parser) y añade las siguientes reglas de ayuda en *Advanced Settings* (Configuración avanzada):

```java
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
```

#### Enviar logs a Datadog

Los logs en tiempo real se entregan al Kinesis Data Stream de tu elección y pueden reenviarse directamente a Datadog mediante la [integración de Kinesis Firehose](https://docs.datadoghq.com/integrations/amazon_kinesis/).

También puedes configurar un consumidor, como Amazon Kinesis Data Firehose, para enviar logs en tiempo real a un bucket de S3 y utilizar el [Datadog Lambda Forwarder](https://docs.datadoghq.com/serverless/forwarder/) para enviar logs a Datadog.

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.cloudfront.401_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 401 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.403_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 403 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.404_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 404 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.4xx_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes cuyo código de estado HTTP es 4XX.<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.502_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 502 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.503_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 503 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.504_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes de visores cuyo código de estado HTTP de la respuesta es 504 (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.5xx_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes cuyo código de estado HTTP es 5XX.<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.bytes_downloaded** <br>(count) | Número de bytes descargados por visores para solicitudes GET, HEAD y OPTIONS.<br>_Se muestra como bytes_ |
| **aws.cloudfront.bytes_uploaded** <br>(count) | Número de bytes cargados a yu origen con CloudFront utilizando solicitudes POST y PUT.<br>_Se muestra como bytes_ |
| **aws.cloudfront.cache_hit_rate** <br>(gauge) | Porcentaje de todas las solicitudes almacenables en caché para las que CloudFront ha suministrado el contenido desde su caché. Las solicitudes (y los errores) HTTP POST y PUT no se consideran solicitudes almacenables en caché (se deben habilitar métricas adicionales).<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.function_compute_utilization** <br>(gauge) | Cantidad de tiempo que la función ha tardado en ejecutarse como porcentaje del tiempo máximo permitido.<br>_Se muestra como porcentaje_ |
| **aws.cloudfront.function_execution_errors** <br>(gauge) | Número de errores de ejecución que se han producido en un periodo de tiempo determinado.<br>_Se muestra como error_ |
| **aws.cloudfront.function_invocations** <br>(count) | Número de veces que se ha iniciado la función en un periodo de tiempo determinado.<br>_Se muestra como invocación_ |
| **aws.cloudfront.function_throttles** <br>(count) | Número de veces que la función ha sido limitada en un periodo de tiempo determinado.<br>_Se muestra como limitación_ |
| **aws.cloudfront.function_validation_errors** <br>(gauge) | Número de errores de validación producidos por la función en un periodo de tiempo determinado.<br>_Se muestra como error_ |
| **aws.cloudfront.lambda_execution_error** <br>(count) | Número de errores de ejecución de Lambda que se han producido en un periodo de tiempo determinado.<br>_Se muestra como error_ |
| **aws.cloudfront.lambda_limit_exceeded_error** <br>(count) | Número de errores Lambda de límite excedido que se han producido en un periodo de tiempo determinado.<br>_Se muestra como error_ |
| **aws.cloudfront.lambda_validation_error** <br>(count) | Número de errores de validación Lambda que se han producido en un periodo de tiempo determinado.<br>_Se muestra como error_ |
| **aws.cloudfront.origin_latency** <br>(gauge) | Tiempo total transcurrido desde que CloudFront recibe una solicitud hasta que comienza a proporcionar una respuesta a la red (no al visor) para las solicitudes que se suministran desde el origen (no la caché de CloudFront). También se conoce como latencia del primer byte o tiempo hasta el primer byte (se deben habilitar métricas adicionales).<br>_Se muestra como milisegundos_ |
| **aws.cloudfront.requests** <br>(count) | Número de solicitudes para todos los métodos HTTP y para las solicitudes HTTP y HTTPS.|
| **aws.cloudfront.total_error_rate** <br>(gauge) | Porcentaje de todas las solicitudes cuyo código de estado HTTP es 4XX o 5XX.<br>_Se muestra como porcentaje_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluidas, entre otras, `aws_account`, `region` y `distributionid`.

### Eventos

La integración de Amazon CloudFront no incluye eventos.

### Checks de servicio

La integración de Amazon CloudFront no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).