---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Elemental MediaPackage.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediapackage/
draft: false
git_integration_title: amazon_mediapackage
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaPackage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediapackage
public_title: Integración de Datadog y AWS Elemental MediaPackage
short_description: Rastrea métricas clave de AWS Elemental MediaPackage.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Elemental MediaPackage es un servicio de empaquetado y originación de vídeos justo a tiempo que ofrece flujos de vídeo de gran seguridad, escalabilidad y fiabilidad a una amplia variedad de dispositivos de reproducción.

Habilita esta integración para ver todas tus métricas de Elemental MediaPackage en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MediaPackage` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Elemental MediaPackage][3].

### APM

#### Activar logging

Configura AWS Elemental MediaPackage para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediapackage` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaPackage en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mediapackage" >}}


### Eventos

La integración de AWS Elemental MediaPackage no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaPackage no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediapackage
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediapackage/amazon_mediapackage_metadata.csv
[8]: https://docs.datadoghq.com/es/help/