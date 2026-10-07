---
aliases:
- /es/integrations/amazon_config
app_id: amazon-config
categories:
- aws
- métricas
- nube
custom_kind: integración
description: AWS Config te permite auditar y evaluar la configuración de tus recursos
  de AWS.
integration_version: 1.0.0
media: []
title: AWS Config
---
## Información general

[AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html) proporciona una vista detallada de la configuración de recursos AWS en tu cuenta de AWS.
Esto incluye cómo se relacionan los recursos entre sí y cómo fueron configurados en el pasado,
para que puedas ver cómo cambian las configuraciones y las relaciones a lo largo del tiempo.

Habilita esta integración para ver todas las métricas de AWS Config en Datadog. Usa [eventos](#events) para monitorizar los cambios en tus configuraciones detectados por AWS Config.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de cambios de recursos

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" header="Únete a la vista previa" >}}
<strong>La recopilación de cambios de recursos</strong> está en vista previa, pero puedes solicitar acceso de forma sencilla. Utiliza este formulario para enviar tu solicitud hoy mismo.
{{< /callout >}}

Puedes recibir eventos en Datadog cuando AWS Config detecta cambios en tus snapshots y tu historial de configuración. Crea y configura los recursos necesarios con el siguiente stack tecnológico de [CloudFormation](https://docs.aws.amazon.com/cloudformation/) o configura manualmente un [Amazon Data Firehose](https://aws.amazon.com/firehose/) para reenviar tus eventos de AWS Config.

{{< tabs >}}

{{% tab "Terraform" %}}

Puedes utilizar el [módulo config-changes-datadog de Terraform](https://registry.terraform.io/modules/DataDog/config-changes-datadog/aws/latest) para empezar a compartir tus datos de configuración de AWS con Datadog. Consulta el [repositorio terraform-aws-config-changes-datadog](https://github.com/DataDog/terraform-aws-config-changes-datadog?tab=readme-ov-file#aws-config-change-streaming-module) para ver un ejemplo para empezar, así como descripciones detalladas de cada parámetro que puedes especificar.

{{% /tab %}}

{{% tab "CloudFormation" %}}

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

**Nota**: Si tu cuenta de Datadog **no** se encuentra en el [sitio Datadog](https://docs.datadoghq.com/getting_started/site/) US1, selecciona el valor `DatadogSite` que corresponda a tu sitio Datadog:

| Sitio web de Datadog   | Valor **DatadogSite** |
| -------------  | --------------------- |
| UE             | datadoghq.eu          |
| US3            | us3.datadoghq.com     |
| US5            | us5.datadoghq.com     |
| AP1            | ap1.datadoghq.com     |

{{% /tab %}}

{{% tab "Manual" %}}

Sigue estos pasos para configurar de manera manual el reenvío de eventos de AWS Config a través de Amazon Data Firehose.

#### Requisitos previos

1. Una cuenta de AWS integrada con Datadog.
   - El rol de IAM de la integración de Datadog debe tener el permiso `s3:GetObject` contra el bucket que contiene los datos de Config.
1. Se configura un [tema SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html) para recibir los eventos de AWS Config.
1. Se configura un [bucket S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) para recibir eventos de más de 256 kB como copia de seguridad.
1. Se configura una [clave de acceso](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). Asegúrate de que dispones de tu clave de API Datadog.

#### Crear un flujo (stream) de Amazon Data Firehose

1. En la consola AWS, haz clic en **Create Firehose stream** (Crear flujo de Firehose).
   - En **Source** (Fuente), selecciona `Direct PUT`.
   - En **Destination** (Destino), selecciona `Datadog`.
1. En la sección **Destination Settings** (Configuración del destino), elige la **URL del endpoint HTTP** que corresponda a tu [sitio Datadog](https://docs.datadoghq.com/getting_started/site/):

| Sitio web de Datadog   | URL de destino                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| US1            | `https://cloudplatform-intake.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`      |
| US3            | `https://cloudplatform-intake.us3.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| US5            | `https://cloudplatform-intake.us5.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| UE             | `https://cloudplatform-intake.datadoghq.eu/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`       |
| AP1            | `https://cloudplatform-intake.ap1.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |

3. En **Authentication** (Autenticación), ingresa el valor de tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys) o selecciona un secreto de AWS Secrets Manager que contenga el valor.
1. En **Content encoding** (Codificación del contenido), ingresa `GZIP`.
1. En **Retry duration** (Duración del reintento), ingresa `300`.
1. Haz clic en **Add parameter** (Añadir parámetro).
   - En **Key** (Clave), ingresa `dd-s3-bucket-auth-account-id`.
   - En **Value** (Valor), ingresa tu ID de cuenta de 12 dígitos de AWS.
1. En **Buffer hints** (Sugerencias de búfer), establece el **Buffer size** (Tamaño del búfer) en `4 MiB`.
1. En **Backup settings** (Configuración de copia de seguridad), selecciona un bucket de copia de seguridad de S3.
1. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).

#### Configurar métodos de entrega para AWS Config

1. En la página de [AWS Config](https://console.aws.amazon.com/config/home), abre el panel lateral izquierdo y haz clic en **Settings** (Configuración).
1. Haz clic en **Edit** (Editar).
1. En la sección **Delivery Method** (Método de entrega), selecciona o crea el bucket de S3 para recibir eventos de más de 256 kB como copia de seguridad.
1. Haz clic en la casilla de verificación bajo **Amazon SNS topic** (Tema de Amazon SNS), y selecciona o crea el tema de SNS para recibir eventos de AWS Config.
1. Haz clic en **Save** (Guardar).

#### Suscribir el flujo de Amazon Data Firehose a un tema de SNS

1. Sigue los pasos indicados en la [Guía para desarrolladores de SNS](https://docs.aws.amazon.com/sns/latest/dg/firehose-endpoints-subscribe.html). Asegúrate de que el **rol de suscripción** tiene los siguientes permisos:
   - `firehose:DescribeDeliveryStream`
   - `firehose:ListDeliveryStreams`
   - `firehose:ListTagsForDeliveryStream`
   - `firehose:PutRecord`
   - `firehose:PutRecordBatch`
1. Confirma que los datos fluyan a Datadog en la pestaña **Monitoring** (Monitorización) de Firehose.

{{% /tab %}}

{{< /tabs >}}

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Config` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración Datadog - AWS Config](https://app.datadoghq.com/integrations/amazon-config).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.config.configuration_recorder_insufficient_permissions_failure** <br>(count) | Número de intentos fallidos de acceso a permisos debido a que la política de roles IAM para el grabador de configuraciones no tiene permisos suficientes.|
| **aws.config.configuration_items_recorded** <br>(count) | Número de elementos de configuración grabados para cada tipo de recurso o todos los tipos de recursos<br>_Se muestra como elemento_ |
| **aws.config.config_history_export_failed** <br>(count) | Número de exportaciones fallidas del historial de configuración a tu bucket de Amazon S3.|
| **aws.config.config_snapshot_export_failed** <br>(count) | Número de exportaciones fallidas de snapshots de configuración a tu bucket de Amazon S3.|
| **aws.config.change_notifications_delivery_failed** <br>(count) | Número de entregas fallidas de notificaciones de cambio al tema de Amazon SNS para tu canal de entrega.|
| **aws.config.compliance_score** <br>(gauge) | Porcentaje de combinaciones regla-recurso conformes en un paquete de conformidad en comparación con el total de combinaciones regla-recurso posibles<br>_Se muestra como porcentaje_ |

<!-- ### Eventos

La integración de AWS Config recopila eventos relacionados con [cambios de recursos AWS](#resource-change-collection). -->

#### Validación

Inspecciona los cambios de configuración en la pestaña **Recent Changes** (Cambios recientes) disponible en el panel lateral del recurso en el [Catálogo de recursos](https://docs.datadoghq.com/infrastructure/resource_catalog/). También puedes ir a la [página Gestión de eventos](https://app.datadoghq.com/event/overview) y consultar `source:amazon_config` para validar que los datos fluyen a tu cuenta de Datadog.

### Checks de servicio

La integración de AWS Config no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Soluciona más rápidamente los problemas relacionados con los cambios en la infraestructura gracias a los cambios recientes del Catálogo de recursos](https://www.datadoghq.com/blog/recent-changes-tab/)