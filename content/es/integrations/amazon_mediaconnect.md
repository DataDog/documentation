---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Elemental MediaConnect.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediaconnect/
draft: false
git_integration_title: amazon_mediaconnect
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaConnect
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediaconnect
public_title: Integración de Datadog y AWS Elemental MediaConnect
short_description: Rastrea métricas clave de AWS Elemental MediaConnect.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Elemental MediaConnect es un servicio de transporte para vídeos en directo.

Habilita esta integración para ver todas tus métricas de Elemental MediaConnect en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MediaConnect` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Elemental MediaConnect][3].

### APM

#### Activar logging

Configura AWS Elemental MediaConnect para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediaconnect` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaConnect en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mediaconnect" >}}


### Eventos

La integración de AWS Elemental MediaConnect no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaConnect no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconnect
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconnect/amazon_mediaconnect_metadata.csv
[8]: https://docs.datadoghq.com/es/help/