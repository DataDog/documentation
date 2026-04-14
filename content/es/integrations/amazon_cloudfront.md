---
"aliases":
- "/integrations/awscloudfront/"
"app_id": "amazon-cloudfront"
"app_uuid": "cd25d530-0cab-41b3-b810-9c1589f584ce"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check":
      - "aws.cloudfront.requests"
      "metadata_path": "assets/metrics/metric-spec.yaml"
      "prefix": "aws.cloudfront"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "167"
    "source_type_name": "Amazon CloudFront"
  "monitors":
    "4XX Error Rate is High": "assets/monitors/rec_mon_4xx_errors.json"
    "5XX Error Rate is High": "assets/monitors/rec_mon_5xx_errors.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
"custom_kind": "integración"
"dependencies": []
"description": "Rastrear tasas de error, recuentos de solicitudes y bytes descargados y cargados."
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/amazon_cloudfront/"
"draft": falso
"git_integration_title": "amazon_cloudfront"
"has_logo": verdadero
"integration_id": "amazon-cloudfront"
"integration_title": "Amazon CloudFront"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "amazon_cloudfront"
"public_title": "Amazon CloudFront"
"short_description": "Amazon CloudFront es un servicio global de red de entrega de contenido (CDN) que acelera la entrega de tus recursos web"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Métricas"
  - "Category::Cloud"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Amazon CloudFront es un servicio global de red de entrega de contenido (CDN) que acelera la entrega de tus recursos web"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Amazon CloudFront"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon CloudFront es un servicio de red de entrega de contenido global (CDN) que acelera la entrega de tus sitios web, APIs, contenido de vídeo u otros activos web.

Habilita esta integración para ver en Datadog todas tus métricas de CloudFront.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `CloudFront` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon CloudFront][3].
3. Opcional: habilita [Métricas de Distribución de CloudFront adicionales][4] para obtener más visibilidad del rendimiento del tráfico de CloudFront.

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

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][1] en tu cuenta de AWS.
2. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs de CloudFront.
5. Deja el tipo de evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer][2] para empezar a explorar tus logs.

Para más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog][3].


[1]: https://docs.datadoghq.com/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
{{% /tab %}}
{{% tab "Logs en tiempo real" %}}

#### Activar logging

##### Crear una configuración específica

Al crear una configuración de log en tiempo real, puedes especificar qué campos de log deseas recibir. Por defecto, se seleccionan todos los [campos disponibles][1].

![CloudFront logging 3][2]

Datadog recomienda que mantengas esta configuración predeterminada y añadas la siguiente regla personalizada de parseo para procesar los logs automáticamente con todos los campos activados.

Ve a la página [Pipelines][1], busca Amazon CloudFront, [crea o edita un procesador de análisis grok][3] y añade las siguientes reglas de ayuda en *Configuración avanzada*:

```java
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
```

#### Enviar logs a Datadog

Los logs en tiempo real se entregan al Kinesis Data Stream de tu elección y pueden reenviarse directamente a Datadog con la [integración de Kinesis Firehose][4].

También puedes configurar un consumidor, como Amazon Kinesis Data Firehose, para enviar logs en tiempo real a un bucket de S3 y utilizar el [Datadog Lambda Forwarder][5] para enviar logs a Datadog.


[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: images/cloudfront_logging_3.png
[3]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#grok-parser
[4]: https://docs.datadoghq.com/integrations/amazon_kinesis/
[5]: https://docs.datadoghq.com/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_cloudfront" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidas, entre otras, `aws_account`, `region` y `distributionid`.

### Eventos

La integración de Amazon CloudFront no incluye ningún evento.

### Checks de servicio

La integración de Amazon CloudFront no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://docs.datadoghq.com/help/
