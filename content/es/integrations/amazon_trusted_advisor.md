---
app_id: amazon_trusted_advisor
categories:
- aws
- nube
- gestión de costes
- recopilación de logs
- suministro
custom_kind: integración
description: Rastrea métricas clave de AWS Trusted Advisor.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: Blog
  text: Monitorizar los límites de servicio de AWS Trusted Advisor con Datadog
title: AWS Trusted Advisor
---
## Información general

AWS Trusted Advisor es una herramienta en línea que te brinda orientación en tiempo real para ayudarte a aprovisionar tus recursos respetando las prácticas recomendadas de AWS.

Habilita esta integración para ver todas tus métricas de Trusted Advisor en Datadog.

**Nota**: Esta integración solo funciona para clientes de AWS con un plan de soporte Business o Enterprise.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la consola de IAM, añade `support:describe*` y `support:refresh*` como acción en el campo de documento de política. Para obtener más información sobre la API de AWS Support, consulta [Acciones, recursos y claves de condición para AWS Support](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html).
1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Trusted Advisor` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS Trusted Advisor](https://app.datadoghq.com/integrations/amazon-trusted-advisor).

### Recopilación de logs

#### Activar logging

Configura AWS Trusted Advisor para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_trusted_advisor` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Trusted Advisor en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.advisor.service_limit.max** <br>(gauge) | Límite máximo del servicio Amazon Trusted Advisor|
| **aws.advisor.service_limit.usage** <br>(gauge) | Limitación del uso del servicio Amazon Trusted Advisor|
| **aws.advisor.service_limit.usage_ratio** <br>(gauge) | Relación de uso del límite de servicio Amazon Trusted Advisor|
| **aws.trustedadvisor.red_resources** <br>(gauge) | Número de recursos de Trusted Advisor en estado rojo (ERROR).<br>_Se muestra como recurso_ |
| **aws.trustedadvisor.service_limit_usage** <br>(gauge) | El porcentaje de utilización de los recursos con respecto a un límite de servicio.<br>_Se muestra como porcentaje_ |
| **aws.trustedadvisor.yellow_resources** <br>(gauge) | Número de recursos de Trusted Advisor en estado amarillo (WARN).<br>_Se muestra como recurso_ |

### Eventos

La integración AWS Trusted Advisor no incluye eventos.

### Checks de servicio

La integración AWS Trusted Advisor no incluye checks de servicios.

## Dashboard

Para completar datos en tu dashboard de la integración AWS Trusted Advisor:

1. Configura los permisos de soporte.
   - En la consola de IAM, añade `support:describe*` y `support: refresh*` como una acción en el cuadro de texto del documento de política.
1. Ten un plan de soporte de AWS actualizado.

El dashboard de Datadog Trusted Advisor necesita acceso al conjunto completo de [checks de AWS Trusted Advisor](https://aws.amazon.com/premiumsupport/trustedadvisor). AWS solo está disponible para los planes actualizados de AWS Support. Asegúrate de que tu plan de AWS incluye acceso completo.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}