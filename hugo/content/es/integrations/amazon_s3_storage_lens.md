---
app_id: amazon_s3_storage_lens
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon S3 Storage Lens.
further_reading:
- link: https://www.datadoghq.com/blog/amazon-s3-storage-lens-monitoring-datadog/
  tag: Blog
  text: Monitoriza y optimiza el almacenamiento en S3 con métricas de Amazon S3 Storage
    Lens.
title: Amazon S3 Storage Lens
---
## Información general

Amazon S3 Storage Lens proporciona una vista única del uso y la actividad del almacenamiento de Amazon S3. Puedes utilizar S3 Storage Lens para generar información resumida, como averiguar cuánto almacenamiento dispone toda la organización o cuáles son los buckets y prefijos que crecen con mayor rapidez. Identifica outliers en tus métricas de almacenamiento y, a continuación, profundiza para investigar el origen del pico de uso o actividad.

Habilita esta integración para ver todas tus métricas de S3 Storage Lens en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. Habilita [publicación de CloudWatch para S3 Storage Lens](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-lens-cloudwatch-enable-publish-option.html) en tu cuenta de AWS. Debes utilizar "Métricas y recomendaciones avanzadas" para utilizar esta función.
1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `S3 Storage Lens` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon S3 Storage Lens](https://app.datadoghq.com/integrations/amazon-s3-storage-lens).

**Nota:** Las métricas de S3 Storage Lens son métricas diarias y se publican en CloudWatch una vez al día.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.s3.storagelens.4xx_errors** <br>(gauge) | El número total de errores HTTP 4xx en el ámbito.<br>_Se muestra como error_ |
| **aws.s3.storagelens.5xx_errors** <br>(gauge) | El número total de errores de servidor HTTP 5xx en el ámbito.<br>_Se muestra como error_ |
| **aws.s3.storagelens.all_requests** <br>(gauge) | El número total de solicitudes HTTP realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.bytes_downloaded** <br>(gauge) | El número total de bytes descargados.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.bytes_uploaded** <br>(gauge) | El número total de bytes cargados.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.current_version_object_count** <br>(gauge) | El número total de objetos que son versión actual.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.current_version_storage_bytes** <br>(gauge) | El número total de bytes de la versión actual.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.delete_marker_object_count** <br>(gauge) | El número total de objetos con un marcador de borrado.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.delete_requests** <br>(gauge) | El número total de solicitudes HTTP DELETE realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.encrypted_object_count** <br>(gauge) | El número total de objetos que están cifrados con el cifrado del lado del servidor S3.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.encrypted_storage_bytes** <br>(gauge) | El número total de bytes que se cifran con el cifrado del lado del servidor S3.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.get_requests** <br>(gauge) | El número total de solicitudes HTTP GET realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.head_requests** <br>(gauge) | El número total de solicitudes HTTP HEAD realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.incomplete_multipart_upload_object_count** <br>(gauge) | El número total de objetos con cargas multiparte incompletas.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.incomplete_multipart_upload_storage_bytes** <br>(gauge) | El número total de bytes con cargas multiparte incompletas.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.list_requests** <br>(gauge) | El número total de solicitudes HTTP realizadas que enumeran contenido.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.non_current_version_object_count** <br>(gauge) | El número total de objetos que no son de la versión actual.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.non_current_version_storage_bytes** <br>(gauge) | El número total de bytes que no son de la versión actual.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.object_count** <br>(gauge) | El número total de objetos.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.object_lock_enabled_object_count** <br>(gauge) | El número total de objetos con Object Lock activado.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.object_lock_enabled_storage_bytes** <br>(gauge) | El número total de bytes con Object Lock activado.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.post_requests** <br>(gauge) | El número total de solicitudes HTTP POST realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.put_requests** <br>(gauge) | El número total de solictudes HTTP PUT realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.replicated_object_count** <br>(gauge) | El número total de objetos que se replican.<br>_Se muestra como objeto_ |
| **aws.s3.storagelens.replicated_storage_bytes** <br>(gauge) | El número total de bytes que se replican.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.select_requests** <br>(gauge) | Número total de solicitudes select realizadas.<br>_Se muestra como solicitud_ |
| **aws.s3.storagelens.select_returned_bytes** <br>(gauge) | El número total de bytes de select devueltos.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.select_scanned_bytes** <br>(gauge) | El número total de bytes de select escaneados.<br>_Se muestra como byte_ |
| **aws.s3.storagelens.storage_bytes** <br>(gauge) | El número total de bytes de almacenamiento.<br>_Se muestra como byte_ |

### Eventos

La integración de Amazon S3 Storage Lens no incluye ningún evento.

### Checks de servicio

La integración de Amazon S3 Storage Lens no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}