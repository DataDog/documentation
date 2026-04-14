---
aliases:
- /es/integrations/amazon_billing
app_id: amazon-billing
categories:
- aws
- métricas
- nube
- cost management
custom_kind: integración
description: AWS Billing te permite hacer un seguimiento de tus previsiones y costes
  de facturación en AWS.
media: []
title: AWS Billing y Cost Management
---
## Información general

AWS Billing y Cost Management muestra tus cargos estimados y métricas de presupuesto.

Active esta integración para ver tus métricas de AWS Billing y Cost Management en Datadog.

**Nota**: Esta integración requiere que el permiso `budgets:ViewBudget` esté completamente habilitado. Las métricas de facturación deben estar habilitadas en la consola de AWS. Para obtener más información sobre la configuración de AWS, consulta [la documentación de integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Config` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración Datadog - AWS Billing](https://app.datadoghq.com/integrations/amazon-billing).

### Recopilación de logs

#### Activar logging

Configura AWS Billing para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_billing` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Billing en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Monitorización del uso de CloudWatch

Después de configurar tus permisos de AWS para añadir el permiso `budgets:ViewBudget`, puedes monitorizar la facturación de CloudWatch con esta integración.

Las métricas de AWS Billing están disponibles aproximadamente una vez cada 4 horas. Es posible que tengas que esperar 4 horas para que Datadog recopile las métricas.

Una vez que las métricas estén disponibles, consulta `aws.billing.estimated_charges` y `aws.billing.forecasted_charges`. Puedes utilizar estas métricas para realizar un seguimiento del uso de CloudWatch al filtrar el contexto hasta `service:amazoncloudwatch`. Puedes desglosar el gasto de cada cuenta de AWS mediante `max:account_id`.

La métrica `aws.billing.estimated_charges` es lo que AWS cree que es la factura CloudWatch hasta el momento para el mes en curso. Este valor se pone en 0 al principio de cada mes. La métrica `aws.billing.forecasted_charges` es tu factura de CloudWatch estimada para final de mes basada en el consumo actual.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.billing.estimated_charges** <br>(gauge) | Cargos estimados por el uso de AWS. Puede tratarse de los cargos estimados de un servicio o de un resumen de los gastos estimados de todos los servicios.<br>_Se muestra en dólares_ |
| **aws.billing.actual_spend** <br>(gauge) | Gastos reales del periodo de tu plan.<br>_Se muestra en dólares_ |
| **aws.billing.budget_limit** <br>(gauge) | Límite de gastos del periodo de tu plan.<br>_Se muestra en dólares_ |
| **aws.billing.forecasted_spend** <br>(gauge) | Gastos previstos para el periodo de tu plan.<br>_Se muestran en dólares_ |

### Eventos

La integración de AWS Billing y Cost Management no incluye eventos.

### Checks de servicio

La integración de AWS Billing y Cost Management no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).