---
app_id: amazon-connect
app_uuid: 26f2d726-70d9-4de6-ba22-141747160066
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.connect.calls_per_interval
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.connect.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 241
    source_type_name: Amazon Connect
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Amazon Connect.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_connect/
draft: false
git_integration_title: amazon_connect
has_logo: true
integration_id: amazon-connect
integration_title: Amazon Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_connect
public_title: Amazon Connect
short_description: Amazon Connect ofrece una configuración de autoservicio y permite
  un compromiso dinámico, personal y natural del cliente.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Amazon Connect ofrece una configuración de autoservicio y permite un
    compromiso dinámico, personal y natural del cliente.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Amazon Connect
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon Connect ofrece una configuración autogestionada y permite una interacción dinámica, personal y natural con el cliente.

Activa esta integración para ver todas tus métricas de Connect en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Connect` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Connect][3].

### Recopilación de logs

#### Activar logging

Configura Amazon Connect para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_connect` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Connect en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_connect" >}}


### Eventos

La integración de Amazon Connect no incluye ningún evento.

### Checks de servicio

La integración de Amazon Connect no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-connect
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_connect/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/