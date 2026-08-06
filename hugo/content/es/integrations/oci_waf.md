---
app_id: oci-waf
app_uuid: 9db0bb0a-05d6-44e7-a0f2-3f1352ed3780
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.waf.bandwidth
      - oci.waf.number_of_requests_detected
      - oci.waf.number_of_requests
      - oci.waf.traffic
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303379
    source_type_name: OCI Web Application Firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- nube
- oracle
- métricas
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_waf
integration_id: oci-waf
integration_title: OCI Web Application Firewall
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_waf
public_title: OCI Web Application Firewall
short_description: OCI Web Application Firewall (WAF) protege tus aplicaciones web
  de las amenazas más comunes con seguridad escalable y gestionada.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Web Application Firewall (WAF) protege tus aplicaciones web de
    las amenazas más comunes con seguridad escalable y gestionada.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Web Application Firewall
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Web Application Firewall (WAF) protege las aplicaciones del tráfico de Internet malicioso y no deseado con un servicio de firewall de aplicaciones web global, basado en la nube y compatible con PCI.

Esta integración te permite monitorizar y alertar sobre el estado, la capacidad y el rendimiento de tu firewall mediante la recopilación de métricas y etiquetas del espacio de nombres [oci_waf][1].

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud Infrastructure][2], comprueba que cualquier espacio de nombres mencionado anteriormente está incluido en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-waf" >}}


### Checks de servicios

OCI Web Application Firewall no incluye ningún check de servicio.

### Eventos

OCI Web Application Firewall no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/WAF/Reference/metricsalarms.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_waf/metadata.csv
[5]: https://docs.datadoghq.com/es/help/
