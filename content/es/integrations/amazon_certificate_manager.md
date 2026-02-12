---
app_id: amazon-certificate-manager
app_uuid: 9eda4833-a2c0-4dcb-bf1c-7a868a0a59c3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.certificatemanager.days_to_expiry
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.certificatemanager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 330
    source_type_name: Amazon Certificate Manager
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
- suministro
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Certificate Manager.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_certificate_manager/
draft: false
git_integration_title: amazon_certificate_manager
has_logo: true
integration_id: amazon-certificate-manager
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_certificate_manager
public_title: AWS Certificate Manager
short_description: AWS Certificate Manager te permite aprovisionar, gestionar y desplegar
  fácilmente certificados SSL/TLS públicos y privados.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Category::Log Collection
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Configuración
  description: AWS Certificate Manager te permite aprovisionar, gestionar y desplegar
    fácilmente certificados SSL/TLS públicos y privados.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS Certificate Manager
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Certificate Manager te permite aprovisionar, gestionar y desplegar certificados SSL/TLS para su uso con servicios de AWS y recursos internos conectados.

Activa esta integración para ver todas tus métricas de Certificate Manager en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `CertificateManager` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Certificate Manager][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_certificate_manager" >}}


### Eventos

La integración de AWS Certificate Manager admite la caducidad de certificados y los eventos de cambio de estado de EventBridge.

### Checks de servicio

La integración de AWS Certificate Manager no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_certificate_manager/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/