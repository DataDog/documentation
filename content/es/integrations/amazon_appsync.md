---
app_id: amazon-appsync
app_uuid: fcd7b517-45ee-4281-8735-42728f4dc6c3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.appsync.latency
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.appsync.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 238
    source_type_name: Amazon AppSync
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS AppSync.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_appsync/
draft: false
git_integration_title: amazon_appsync
has_logo: true
integration_id: amazon-appsync
integration_title: AWS AppSync
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_appsync
public_title: AWS AppSync
short_description: Simplifica el desarrollo de aplicaciones con la API flexible y
  segura de AppSync para acceder y combinar datos de diversas fuentes.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Simplifica el desarrollo de aplicaciones con la API flexible y segura
    de AppSync para acceder y combinar datos de diversas fuentes.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS AppSync
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS AppSync simplifica el desarrollo de aplicaciones permitiéndote crear una API flexible para acceder, manipular y combinar datos de una o varias fuentes de datos de forma segura.

Activa esta integración para ver todas tus métricas de AppSync en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `AppSync` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS AppSync][3].

### Recopilación de logs

#### Activar logging

Configura AWS AppSync para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_appsync` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS AppSync en la consola AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_appsync" >}}


### Eventos

La integración de AWS AppSync no incluye ningún evento.

### Checks de servicio

La integración de AWS AppSync no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appsync
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_appsync/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/