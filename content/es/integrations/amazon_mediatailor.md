---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Elemental MediaTailor.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediatailor/
draft: false
git_integration_title: amazon_mediatailor
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaTailor
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediatailor
public_title: Integración de Datadog y AWS Elemental MediaTailor
short_description: Rastrea métricas clave de AWS Elemental MediaTailor.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Elemental MediaTailor es un servicio de personalización y monetización que permite la inserción escalable de anuncios en el servidor.

Habilita esta integración para ver todas tus métricas de Elemental MediaTailor en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MediaTailor` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Elemental MediaTailor][3].

### APM

#### Activar logging

Configura AWS Elemental MediaTailor para enviar logs ya sea a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediatailor` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaTailor en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mediatailor" >}}


### Eventos

La integración de AWS Elemental MediaTailor no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaTailor no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediatailor
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediatailor/amazon_mediatailor_metadata.csv
[8]: https://docs.datadoghq.com/es/help/