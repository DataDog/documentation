---
algolia:
  subcategory: Integraciones de Marketplace
app_id: iocs-dmi4apm
app_uuid: 29b4a34d-e40d-4975-ba55-4fc019685959
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: iocs_dmi4apm.ioconnect.dmi4apm.agent
      metadata_path: metadata.csv
      prefix: iocs_dmi4apm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9762172
    source_type_name: iocs_dmi4apm
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- nube
- marketplace
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dmi4apm
integration_id: iocs-dmi4apm
integration_title: Mule® para APM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dmi4apm
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: datadog.marketplace.ioconnect.dmi4apm.agent
  product_id: dmi4apm
  short_description: Precio por cada host
  tag: hosts
  unit_label: host
  unit_price: 50
public_title: Integración de Mule® para APM
short_description: Integración de Datadog y MuleSoft para la monitorización del rendimiento
  de las aplicaciones
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Developer Tools
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Integración de Datadog y MuleSoft para la monitorización del rendimiento
    de las aplicaciones
  media:
  - caption: 'DMI4APM: Logs de traces (trazas)'
    image_url: images/dmi_apm_logs.png
    media_type: imagen
  - caption: 'DMI4APM: Detalles de traces (trazas)'
    image_url: images/dmi_apm_trace.png
    media_type: imagen
  - caption: 'DMI4APM: Lista de traces (trazas)'
    image_url: images/dmi_apm_traces.png
    media_type: imagen
  - caption: 'DMI4APM: Span (tramo) distribuido'
    image_url: images/dmi_distributed_span.png
    media_type: imagen
  - caption: 'DMI4APM: Trace (traza) de span (tramo) distribuido'
    image_url: images/dmi_distributed_trace.png
    media_type: imagen
  - caption: 'DMI4APM: Lista de spans (tramos)'
    image_url: images/dmi_distributed.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Integración de Mule® para APM
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
MuleSoft es una empresa de software especializada en soluciones de integración y gestión de API. Su principal producto, Anypoint Platform, es una plataforma de integración que permite a los desarrolladores conectar aplicaciones, datos y dispositivos en entornos on-premises y en la nube.

Esta integración captura traces (trazas) de APM de las aplicaciones MuleSoft y proporciona información sobre el rendimiento y los problemas de las aplicaciones. Las traces (trazas) de APM permiten a los desarrolladores y equipos de operaciones obtener una visibilidad profunda del rendimiento de esta integración e identificar cuellos de botella, errores y degradación del rendimiento en tiempo real.

### **Instrumenta tus aplicaciones Mule con nuestro Datadog Mule 4 Connector**


Utiliza el conector de Datadog para Mule 4 con Datadog APM para obtener visibilidad con los dashboards de rendimiento predefinidos.

Mide el rendimiento de las operaciones en tus flujos de forma tan granular como sea necesario con spans (tramos).

También, correlaciona los logs generados dentro de una transacción en una única trace (traza) para acotar cualquier optimización del rendimiento o contexto de solución de problemas.


## Asistencia técnica
Tómate un momento para conocer el proceso de configuración de la integración de Datadog y Mule® para APM aquí: [Requisitos previos e instalación][7] y la [documentación del conector][8].

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia técnica de Nova a través de los siguientes canales:

- Ventas: [products.sales@novacloud.io][2]
- Asistencia técnica: [support_ddp@novacloud.io][6]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:products.sales@novacloud.io
[3]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: mailto:support_ddp@novacloud.io
[7]: https://docs.ioconnectservices.com/dmi4apm/apm-datadog-integration
[8]: https://docs.ioconnectservices.com/dmi4apm/apm-global-elements

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi4apm" target="_blank">adquiere esta aplicación en el Marketplace</a>.