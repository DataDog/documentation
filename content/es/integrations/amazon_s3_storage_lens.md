---
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon S3 Storage Lens.
doc_link: https://docs.datadoghq.com/integrations/amazon_s3_storage_lens
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/amazon-s3-storage-lens-monitoring-datadog/
  tag: Blog
  text: Monitoriza y optimiza el almacenamiento en S3 con métricas de Amazon S3 Storage
    Lens.
git_integration_title: amazon_s3_storage_lens
has_logo: true
integration_id: ''
integration_title: Amazon S3 Storage Lens
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_s3_storage_lens
public_title: Integración de Datadog y Amazon S3 Storage Lens
short_description: Rastrea métricas clave de Amazon S3 Storage Lens.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon S3 Storage Lens proporciona una vista única del uso y la actividad del almacenamiento de Amazon S3. Puedes utilizar S3 Storage Lens para generar información resumida, como averiguar cuánto almacenamiento dispone toda la organización o cuáles son los buckets y prefijos que crecen con mayor rapidez. Identifica outliers en tus métricas de almacenamiento y, a continuación, profundiza para investigar el origen del pico de uso o actividad.

Habilita esta integración para ver todas tus métricas de S3 Storage Lens en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. Habilita [Publicación de CloudWatch para S3 Storage Lens][2] en tu cuenta de AWS. Debes utilizar "Advanced metrics and recommendations" (Métricas y recomendaciones avanzadas) para utilizar esta función.
2. En la [página de la integración de AWS][3], asegúrate de que `S3 Storage Lens` está habilitado en la pestaña `Metric Collection`.
3. Instala la [integración de Datadog y Amazon S3 Storage Lens][4].

**Nota:** Las métricas de S3 Storage Lens son métricas diarias y se publican en CloudWatch una vez al día.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_s3_storage_lens" >}}


### Eventos

La integración de Amazon S3 Storage Lens no incluye ningún evento.

### Checks de servicios

La integración de Amazon S3 Storage Lens no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-lens-cloudwatch-enable-publish-option.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3-storage-lens
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3_storage_lens/amazon_s3_storage_lens_metadata.csv
[6]: https://docs.datadoghq.com/es/help/
