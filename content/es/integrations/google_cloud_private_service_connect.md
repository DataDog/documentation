---
app_id: google-cloud-private-service-connect
app_uuid: e4c77d0b-1c96-4484-85a5-7066ca938f98
assets:
  dashboards:
    google-cloud-private-service-connect: assets/dashboards/google_cloud_private_service_connect_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - gcp.gce.private_service_connect.consumer.open_connections
      - gcp.gce.private_service_connect.producer.open_connections
      metadata_path: metadata.csv
      prefix: gcp.gce.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9347815
    source_type_name: Google Cloud Private Service Connect
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- la red
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_private_service_connect
integration_id: google-cloud-private-service-connect
integration_title: Google Cloud Private Service Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_private_service_connect
public_title: Google Cloud Private Service Connect
short_description: Monitorizar tus conexiones Private Service
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Google Cloud
  - Categoría::Red
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar tus conexiones Private Service
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Google Cloud Private Service Connect
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

[Google Cloud Private Service Connect][1] es una función de Google Cloud Networking que permite a los consumidores acceder a servicios gestionados de forma privada desde dentro de tu red VPC, ofreciéndoles seguridad en la transferencia de los datos, como un ahorro de costes de sobrecarga (egreso) de red. También permite a los productores alojar y exponer sus servicios a otros clientes de Google Cloud, ofreciendo una conexión privada entre su servicio y los consumidores.

Activa esta integración para visualizar conexiones, transferencia de datos y paquetes perdidos a través de Private Service Connect. A través de esta integración, Datadog recopila métricas importantes de tus conexiones Private Service Connect., tanto de productores como de consumidores.

## Configuración

### Instalación

### Configuración

Para recopilar métricas, esta integración utilizará las credenciales que configuraste en la [integración principal de Google Cloud Platform][2].

Datadog también ofrece la funcionalidad de Private Service Connect que te permite transmitir métricas, trazas (traces) y logs desde tu entorno Google Cloud a Datadog a través de un enlace privado, sin pasar por la Internet pública, lo que te permite ahorrar en costes de egreso de red y te proporciona más seguridad para tus datos en tránsito. Para ello, consulta nuestra [guía de centros de datos compatibles][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-private-service-connect" >}}


### Checks de servicio

Google Cloud Private Service Connect no incluye checks de servicios.

### Eventos

Google Cloud Private Service Connect no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/integrations/google-cloud-private-service-connect
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
[3]: https://docs.datadoghq.com/es/agent/guide/gcp-private-service-connect/?site=us5
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_private_service_connect/metadata.csv
[5]: https://docs.datadoghq.com/es/help/
