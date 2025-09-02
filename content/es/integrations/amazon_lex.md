---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Lex.
doc_link: https://docs.datadoghq.com/integrations/amazon_lex/
draft: false
git_integration_title: amazon_lex
has_logo: true
integration_id: ''
integration_title: Amazon Lex
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_lex
public_title: Integración de Datadog y Amazon Lex
short_description: Rastrea métricas clave de Amazon Lex.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Lex es un servicio para crear interfaces conversacionales en aplicaciones que utilizan voz y texto.

Habilita esta integración para ver todas tus métricas de Lex en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Lex` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Lex][3].

### Recopilación de logs

#### Activar logging

Configura Amazon Lex para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_lex` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon Lex en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_lex" >}}


### Eventos

La integración de Amazon Lex no incluye ningún evento.

### Checks de servicios

La integración de Amazon Lex no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-lex
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lex/amazon_lex_metadata.csv
[8]: https://docs.datadoghq.com/es/help/