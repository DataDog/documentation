---
aliases:
- /es/integrations/amazon_cognito
app_id: amazon-cognito
categories:
- aws
- nube
- recopilación de logs
- móvil
custom_kind: integración
description: Crea identidades de usuario únicas, autentícate con los proveedores y
  almacena datos en la nube.
media: []
title: Amazon Cognito
---
## Información general

Amazon Cognito es un servicio que puedes utilizar para crear identidades únicas para tus usuarios, autenticar estas identidades con proveedores de identidad y guardar los datos de los usuarios móviles en la nube de AWS.

Habilita esta integración para ver tus métricas de Cognito Advanced Security en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Cognito` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon Cognito](https://app.datadoghq.com/integrations/amazon-cognito).

**Nota**: Advanced Security debe estar activado en AWS. Consulta la documentación de AWS para añadir [Advanced Security a un grupo de usuarios](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html).

### Recopilación de logs

#### Activar la generación de logs

Configura Amazon Cognito para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Solo se pueden enviar logs del grupo de usuarios. Amazon no admite el envío de otros logs de Cognito.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_cognito` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Datadog Forwarder Lambda](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Cognito en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.cognito.account_takeover_risk** <br>(count) | Solicitudes en las que Amazon Cognito ha detectado un riesgo de apropiación de cuenta.|
| **aws.cognito.compromised_credential_risk** <br>(count) | Solicitudes en las que Amazon Cognito ha detectado credenciales comprometidas.|
| **aws.cognito.federation_successes** <br>(count) | Proporciona el porcentaje de solicitudes de federación de identidades realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.federation_successes.sum** <br>(count) | Proporciona el número total de solicitudes de federación de identidades realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.federation_successes.samplecount** <br>(count) | Proporciona el número total de solicitudes de federación de identidades al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.federation_throttles** <br>(count) | Proporciona el número total de solicitudes de federación de identidades limitadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.no_risk** <br>(count) | Solicitudes en las que Amazon Cognito no ha identificado ningún riesgo.|
| **aws.cognito.override_block** <br>(count) | Solicitudes bloqueadas por Amazon Cognito debido a la configuración proporcionada por el desarrollador.|
| **aws.cognito.risk** <br>(count) | Solicitudes que Amazon Cognito ha marcado como riesgosas.|
| **aws.cognito.sign_in_successes** <br>(count) | Proporciona el porcentaje de solicitudes de autenticación de usuarios realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_in_successes.sum** <br>(count) | Proporciona el número total de solicitudes de autenticación de usuarios realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_in_successes.samplecount** <br>(count) | Proporciona el número total de solicitudes de autenticación de usuarios realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_in_throttles** <br>(count) | Proporciona el número total de solicitudes de autenticación de usuarios limitadas realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_up_successes** <br>(count) | Proporciona el porcentaje de solicitudes de registro de usuarios realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_up_successes.sum** <br>(count) | Proporciona el número total de solicitudes de registro de usuarios realizadas con éxito al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_up_successes.samplecount** <br>(count) | Proporciona el número total de solicitudes de registro de usuarios realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.sign_up_throttles** <br>(count) | Proporciona el número total de solicitudes de registro de usuarios limitadas realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.token_refresh_successes** <br>(count) | Proporciona el porcentaje de solicitudes exitosas para actualizar un token de Amazon Cognito, realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.token_refresh_successes.sum** <br>(count) | Proporciona el número total de solicitudes exitosas para actualizar un token de Amazon Cognito, realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.token_refresh_successes.samplecount** <br>(count) | Proporciona el número total de solicitudes para actualizar un token de Amazon Cognito, realizadas al grupo de usuarios de Amazon Cognito.|
| **aws.cognito.token_refresh_throttles** <br>(count) | Proporciona el número total de solicitudes limitadas para actualizar un token de Amazon Cognito, realizadas al grupo de usuarios de Amazon Cognito.|

### Eventos

La integración de Amazon Cognito no incluye eventos.

### Checks de servicio

La integración de Amazon Cognito no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).