---
categories:
- aws
- nube
- recopilación de logs
- mobile
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Cognito.
doc_link: https://docs.datadoghq.com/integrations/amazon_cognito/
draft: false
git_integration_title: amazon_cognito
has_logo: true
integration_id: ''
integration_title: Amazon Cognito
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_cognito
public_title: Integración de Datadog y Amazon Cognito
short_description: Rastrea métricas clave de Amazon Cognito.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Cognito es un servicio que puedes utilizar para crear identidades únicas para tus usuarios, autenticar estas identidades con proveedores de identidad y guardar los datos de los usuarios móviles en la nube de AWS.

Habilita esta integración para ver tus métricas de Cognito Advanced Security en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Cognito` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Cognito][3].

**Nota**: Advanced Security debe estar activado en AWS. Consulta la documentación de AWS para añadir [Advanced Security a un grupo de usuarios][4].

### Recopilación de logs

#### Activar logging

Configura Amazon Cognito para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Solo se pueden enviar logs del grupo de usuarios. Amazon no admite el envío de otros logs de Cognito.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_cognito` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][5].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Cognito en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][6]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-cognito" >}}


### Eventos

La integración de Amazon Cognito no incluye ningún evento.

### Checks de servicios

La integración de Amazon Cognito no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cognito
[4]: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[9]: https://docs.datadoghq.com/es/help/