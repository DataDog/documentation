---
"app_id": "amazon-s3"
"app_uuid": "e7f3a9d8-7ddc-4ed4-b70c-9c95ef5f8581"
"assets":
  "dashboards":
    "aws_s3": "assets/dashboards/amazon_s3_overview.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aws.s3.bucket_size_bytes"
      "metadata_path": "assets/metrics/metric-spec.yaml"
      "prefix": "aws.s3"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "157"
    "source_type_name": "Amazon S3"
  "monitors":
    "Change in number of objects": "assets/monitors/s3_number_of_objects.json"
    "Increase in 4xx errors": "assets/monitors/s3_4xx_errors.json"
    "Increase in 5xx errors": "assets/monitors/s3_5xx_errors.json"
    "Increase in bucket size": "assets/monitors/s3_bucket_size.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
- "data stores"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "amazon_s3"
"integration_id": "amazon-s3"
"integration_title": "Amazon S3"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "amazon_s3"
"public_title": "Amazon S3"
"short_description": "Amazon S3 es un servicio de almacenamiento en la nube altamente disponible y escalable"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Métricas"
  - "Category::Cloud"
  - "Category::Almacenes de datos"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Amazon S3 es un servicio de almacenamiento en la nube altamente disponible y escalable"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Amazon S3"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
<div class="alert alert-info">Monitoriza métricas de S3 y optimiza los costes de almacenamiento a nivel de prefijo con la <a href="https://www.datadoghq.com/product-preview/storage-monitoring/">Monitorización del almacenamiento (Vista previa)</a>.</div>


## Información general

Amazon S3 es un servicio de almacenamiento en la nube escalable y de alta disponibilidad.

Habilita esta integración para ver en Datadog todas tus métricas de S3.

**Notas**:
- Esta integración requiere que el permiso `s3:GetBucketTagging` esté completamente habilitado.
- Las métricas de solicitudes de S3 deben estar habilitadas en los propios buckets. Para obtener más información, consulta [Monitorizar métricss con Amazon CloudWatch][1].

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `S3` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon S3][4].

### Recopilación de logs

#### Habilitar el acceso a logs de S3

1. Ve al bucket de S3.
2. Haz clic en **Properties** (Propiedades).
3. Ve a la sección Services Access Logging (Registro de acceso a servicios) y haz clic en **Edit** (Editar).
4. Selecciona **Enable** (Habilitar).
5. Selecciona el bucket de S3 al que deseas enviar logs.

 Para obtener más información, consulta [Habilitar el registro de acceso al servidor de Amazon S3][5].

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][6] en tu cuenta AWS.
2. Una vez instalada la función de Lambda, hay dos formas de recopilar tus logs de acceso a S3:

    - Automáticamente: los logs de S3 se gestionan automáticamente si concedes acceso a Datadog con un conjunto de permisos. Consulta [Configuración automática de activadores][7] para obtener más información sobre la configuración de la recopilación automática de logs en la función de Lambda del Datadog Forwarder.
    - Manualmente: en la consola de AWS, añade un activador en el bucket de S3 que contiene tus logs de acceso de S3. Consulta los [pasos de instalación manual](#manual-installation-steps).

#### Pasos de la instalación manual

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][6] en tu cuenta AWS.
2. Una vez configurado, ve a la función Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs de S3.
5. Deja el tipo de evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer][8] para empezar a explorar tus logs.

Para más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función de Lambda de Datadog][9].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_s3" >}}


### Eventos

La integración de Amazon S3 no incluye ningún evento.

### Checks de servicio

La integración de Amazon S3 no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3
[5]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/assets/metrics/metric-spec.yaml
[11]: https://docs.datadoghq.com/help/

