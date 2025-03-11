---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integration
dependencies: []
description: Rastrea métricas clave de Amazon Translate.
doc_link: https://docs.datadoghq.com/integrations/amazon_translate/
draft: false
git_integration_title: amazon_translate
has_logo: true
integration_id: ''
integration_title: Amazon Translate
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_translate
public_title: Integración de Amazon Translate con Datadog
short_description: Rastrea métricas clave de Amazon Translate.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Translate es un servicio de traducción automática neuronal para traducir texto desde y hacia el inglés en una amplia gama de idiomas admitidos.

Habilita esta integración para ver todas tus métricas de Translate en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `Translate` esté habilitado en la pestaña `Metric Collection`.
2. Instala la [integración Amazon Translate en Datadog][3].

### APM

#### Activar logging

Configura Amazon Translate para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_translate` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda de Datadog Forwarder][4].
2. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Translate en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_translate" >}}


### Eventos

La integración Amazon Translate no incluye eventos.

### Checks de servicios

La integración Amazon Translate no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-translate
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_translate/amazon_translate_metadata.csv
[8]: https://docs.datadoghq.com/es/help/