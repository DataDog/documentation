---
aliases:
- /es/integrations/awscloudsearch/
app_id: amazon-cloudsearch
app_uuid: f5ef1e25-4926-4272-a7ef-d489c32714f2
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: aws.cloudsearch.successful_requests
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.cloudsearch.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 168
    source_type_name: Amazon CloudSearch
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza un seguimiento del uso de índices, del recuento de solicitudes
  correctas, etc.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/awscloudsearch/
draft: false
git_integration_title: amazon_cloudsearch
has_logo: true
integration_id: amazon-cloudsearch
integration_title: Amazon CloudSearch
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_cloudsearch
public_title: Amazon CloudSearch
short_description: Servicio rentable gestionado en la nube para crear, gestionar y
  ampliar soluciones de búsqueda.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Servicio rentable gestionado en la nube para crear, gestionar y ampliar
    soluciones de búsqueda.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Amazon CloudSearch
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon CloudSearch es un servicio administrado en la nube de AWS que hace que sea sencillo y rentable configurar, administrar y escalar una solución de búsqueda.

Habilita esta integración para ver en Datadog todas tus métricas de CloudSearch.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `CloudSearch` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon CloudSearch][3].

### Recopilación de logs

#### Activar logging

Configura Amazon CloudSearch para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_cloudsearch` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon CloudSearch en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_cloudsearch" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon CloudSearch no incluye ningún evento.

### Checks de servicio

La integración de Amazon CloudSearch no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudsearch
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_cloudsearch/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/