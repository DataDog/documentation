---
aliases:
- /es/integrations/awsbilling/
- /es/integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage/
app_id: amazon-billing
app_uuid: 9409f423-8c1f-4a82-8632-1be74d52c028
assets:
  dashboards:
    aws_billing: assets/dashboards/amazon_billing_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.billing.estimated_charges
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.billing
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 158
    source_type_name: Amazon Billing
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
- cost management
custom_kind: integración
dependencies: []
description: Monitoriza gastos reales y estimados en tu cuenta de AWS.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_billing/
draft: false
git_integration_title: amazon_billing
has_logo: true
integration_id: amazon-billing
integration_title: AWS Billing and Cost Management
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_billing
public_title: AWS Billing and Cost Management
short_description: AWS Billing te permite realizar un seguimiento de tus predicciones
  y costes de facturación en AWS.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Métricas
  - Categoría::Nube
  - Categoría::Gestión de costes
  - Oferta::Integración
  configuration: README.md#Configuración
  description: AWS Billing te permite realizar un seguimiento de tus predicciones
    y costes de facturación en AWS.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS Billing and Cost Management
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Billing y Cost Management muestra tus cargos estimados y métricas de presupuesto.

Activa esta integración para ver tus métricas de AWS Billing and Cost Management en Datadog.

**Nota**: Esta integración requiere que el permiso `budgets:ViewBudget` esté completamente habilitado. Las métricas de facturación deben estar habilitadas en la consola de AWS. Para obtener más información sobre la configuración de AWS, consulta [la documentación de la integración de Amazon Web Services][1].

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Billing` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Billing][3].

### Recopilación de logs

#### Activar logging

Configura AWS Billing para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a generar logs en un bucket de S3, asegúrate de que `amazon_billing` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Billing en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Monitorización del uso de CloudWatch

Después de configurar tus permisos de AWS para añadir el permiso `budgets:ViewBudget`, puedes monitorizar CloudWatch Billing con esta integración.

Las métricas de AWS Billing están disponibles aproximadamente una vez cada 4 horas. Es posible que tengas que esperar 4 horas para que Datadog recopile las métricas.

Una vez que las métricas estén disponibles, consulta `aws.billing.estimated_charges` y `aws.billing.forecasted_charges`. Puedes utilizar estas métricas para realizar un seguimiento del uso de CloudWatch al filtrar el contexto hasta `service:amazoncloudwatch`. Puedes desglosar el gasto de cada cuenta de AWS mediante `max:account_id`.

La métrica `aws.billing.estimated_charges` es lo que AWS cree que es la factura CloudWatch hasta el momento para el mes en curso. Este valor se pone en 0 al principio de cada mes. La métrica `aws.billing.forecasted_charges` es tu factura de CloudWatch estimada para final de mes basada en el consumo actual.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_billing" >}}


### Eventos

La integración de AWS Billing and Cost Management no incluye eventos.

### Checks de servicio

La integración de AWS Billing and Cost Management no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-billing
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_billing/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/