---
app_id: amazon-config
app_uuid: 43ee05ac-8a93-4328-92e7-3bfe76d7839e
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - aws.config.configuration_recorder_insufficient_permissions_failure
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.config.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 376
    source_type_name: Amazon Config
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_config
integration_id: amazon-config
integration_title: AWS Config
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_config
public_title: AWS Config
short_description: AWS Config te permite auditar y evaluar la configuración de tus
  recursos de AWS.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Configuración
  description: AWS Config te permite auditar y evaluar la configuración de tus recursos
    de AWS.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS Config
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

[AWS Config][1] proporciona una vista detallada de la configuración de recursos AWS en tu cuenta de AWS.
Esta incluye la relación entre los recursos y su antigua configuración,
para que puedas ver cómo cambian las relaciones y configuraciones a lo largo del tiempo.

Activa esta integración para ver todas tus métricas de AWS Config en Datadog. Utiliza [eventos](#events) para monitorizar los cambios en tus configuraciones, detectados por AWS Config.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services][2].

### Recopilación de cambios en recursos

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" header="Únete a esta vista previa." >}}
  La <strong>Recopilación de cambios en recursos</strong> está en vista previa, pero puedes solicitar acceso fácilmente. Utiliza este formulario para enviar tu solicitud hoy mismo.
{{< /callout >}}

Puedes recibir eventos en Datadog cuando AWS Config detecta cambios en el historial y en los snapshots de tu configuración. Crea y configura los recursos necesarios con el siguiente stack tecnológico de [CloudFormation][3] o configura manualmente un [Amazon Data Firehose][4] para reenviar tus eventos de AWS Config.

{{< tabs >}}
{{% tab "Terraform" %}}

Puedes utilizar el [módulo config-changes-datadog de Terraform][1] para empezar a compartir tus datos de AWS Config con Datadog. Consulta el [repositorio terraform-aws-config-changes-datadog][2] para ver un ejemplo para empezar, junto con una descripción detallada de cada parámetro que puedes especificar.

[1]: https://registry.terraform.io/modules/DataDog/config-changes-datadog/aws/latest
[2]: https://github.com/DataDog/terraform-aws-config-changes-datadog?tab=readme-ov-file#aws-config-change-streaming-module
{{% /tab %}}
{{% tab "CloudFormation" %}}

[![Launch Stack][1]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

**Nota**: Si tu cuenta de Datadog **no** se encuentra en el [sitio Datadog][2] US1, selecciona el valor `DatadogSite` correspondiente a tu sitio Datadog:

| Sitio Datadog   | Valor **DatadogSite** |
| -------------  | --------------------- |
| EU             | datadoghq.eu          |
| US3            | us3.datadoghq.com     |
| US5            | us5.datadoghq.com     |
| AP1            | ap1.datadoghq.com     |

[1]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[2]: https://docs.datadoghq.com/es/getting_started/site/
{{% /tab %}}
{{% tab "Manual" %}}

Sigue estos pasos para configurar manualmente el reenvío de eventos de AWS Config a través de Amazon Data Firehose.

#### Requisitos previos

1. Cuenta de AWS integrada con Datadog.
   - El rol IAM de la integración Datadog debe tener el permiso `s3:GetObject` relativo al bucket, con los datos de configuración en él.
2. Se configura un [tema SNS][1] para recibir eventos de AWS Config.
3. Se configura un [bucket de S3][2] para recibir eventos de más de 256 kB como copias de seguridad.
4. Se configura una [clave de acceso][3]. Asegúrate de que tienes tu clave de API Datadog.

#### Crear un flujo Amazon Data Firehose

1. En la consola de AWS, haz clic en **Create Firehose Stream** (Crear flujo de Firehose).
   - Para **Source** (Fuente), selecciona `Direct PUT`.
   - Para **Destination** (Destino), selecciona `Datadog`.
2. En la sección **Destination settings** (Configuración del destino), elige la **URL del endpoint HTTP** correspondiente a tu [sitio Datadog][4]:

| Sitio Datadog   | URL del destino                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| US1            | `https://cloudplatform-intake.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`      |
| US3            | `https://cloudplatform-intake.us3.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| US5            | `https://cloudplatform-intake.us5.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| EU             | `https://cloudplatform-intake.datadoghq.eu/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`       |
| AP1            | `https://cloudplatform-intake.ap1.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |

3. Para **Authentication** (Autenticación), ingresa el valor de tu [clave de API Datadog][5] o selecciona un secreto de AWS Secrets Manager que contenga el valor.
4. Para **Content encoding** (Codificación del contenido), ingresa `GZIP`.
5. Para **Retry duration** (Duración del reintento), ingresa `300`.
6. Haz clic en **Add parameter** (Añadir parámetro).
   - Para **Key** (Clave), ingresa `dd-s3-bucket-auth-account-id`.
   - Para **Value** (Valor), ingresa el ID de 12 dígitos de tu cuenta de AWS.
6. En **Buffer hints** (Hints de buffer), configura el **tamaño del buffer** en `4 MiB`.
7. En **Backup settings** (Configuración de copia de seguridad), selecciona un bucket de S3 como copia de seguridad.
8. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).

#### Configurar métodos de entrega de AWS Config

1. En la [página de AWS Config][6], abre el panel lateral izquierdo y haz clic en **Settings** (Configuración).
2. Haz clic en **Edit** (Editar).
3. En la sección **Delivery method** (Método de entrega), selecciona o crea el bucket de S3 para recibir eventos de más de 256 kB como copias de seguridad.
4. Haz clic en la casilla que se encuentra debajo de **Amazon SNS topic** (Tema Amazon SNS) y selecciona o crea el tema SNS para recibir eventos de AWS Config.
5. Haz clic en **Save** (Guardar).

#### Suscribe el flujo de Amazon Data Firehose a un tema SNS

1. Sigue los pasos en la [guía para desarrolladores de SNS][7]. Asegúrate de que el **rol de suscripción** tiene los siguientes permisos:
   - `firehose:DescribeDeliveryStream`
   - `firehose:ListDeliveryStreams`
   - `firehose:ListTagsForDeliveryStream`
   - `firehose:PutRecord`
   - `firehose:PutRecordBatch`
2. Confirma que los datos fluyen a Datadog en la pestaña **Monitoring** (Monitorización) de Firehose.

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
[4]: https://docs.datadoghq.com/es/getting_started/site/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://console.aws.amazon.com/config/home
[7]: https://docs.aws.amazon.com/sns/latest/dg/firehose-endpoints-subscribe.html
{{% /tab %}}
{{< /tabs >}}

### Recopilación de métricas

1. En la [página de la integración AWS][5], asegúrate de que `Config` está activado en la pestaña `Metric Collection`.
2. Instala la integración [Datadog - AWS Config][6].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_config" >}}


<!-- ### Eventos

La integración AWS Config recopila eventos relacionados con [cambios en los recursos AWS](#resource-change-collection). -->

#### Validación

Inspecciona los cambios de configuración en la pestaña **Recent Changes** (Cambios recientes) disponible en el panel lateral del recurso en el [Catálogo de recursos][7]. También puedes ir a la [página Gestión de eventos][8] y consultar `source:amazon_config` para confirmar que los datos fluyen a tu cuenta de Datadog.

### Checks de servicio

La integración de AWS Config no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:
- [Solucionar problemas de cambios en la infraestructura más rápidamente con Cambios recientes en el Catálogo de recursos][10]


[1]: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://docs.aws.amazon.com/cloudformation/
[4]: https://aws.amazon.com/firehose/
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://app.datadoghq.com/integrations/amazon-config
[7]: https://docs.datadoghq.com/es/infrastructure/resource_catalog/
[8]: https://app.datadoghq.com/event/overview
[9]: https://docs.datadoghq.com/es/help/
[10]: https://www.datadoghq.com/blog/recent-changes-tab/