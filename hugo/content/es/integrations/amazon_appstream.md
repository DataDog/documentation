---
app_id: amazon-appstream
app_uuid: 0e3fae77-c278-49ea-a632-1d1b9a81f77c
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.appstream.actual_capacity
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: ''
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 237
    source_type_name: Amazon AppStream
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon AppStream.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_appstream/
draft: false
git_integration_title: amazon_appstream
has_logo: true
integration_id: amazon-appstream
integration_title: Amazon AppStream
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_appstream
public_title: Amazon AppStream
short_description: Un servicio seguro y totalmente gestionado para la transmición
  de aplicaciones de escritorio desde AWS a un navegador web.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Un servicio seguro y totalmente gestionado para la transmición de aplicaciones
    de escritorio desde AWS a un navegador web.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon AppStream
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon AppStream es un servicio totalmente gestionado de streaming de aplicaciones seguro que permite transmitir aplicaciones de escritorio de AWS a un navegador web.

Activa esta integración para ver todas tus métricas de AppStream en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `AppStream` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon AppStream][3].

### Recopilación de logs

#### Activar logging

Configura Amazon AppStream para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si inicias sesión en un bucket de S3, asegúrate de que `amazon_appstream` se establece como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon AppStream en la consola de AWS.

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_appstream" >}}


### Eventos

La integración de Amazon AppStream no incluye ningún evento.

### Checks de servicio

La integración de Amazon AppStream no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appstream
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_appstream/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/