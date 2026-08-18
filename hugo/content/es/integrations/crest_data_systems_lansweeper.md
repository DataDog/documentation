---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-lansweeper
app_uuid: bdf1e9ea-650d-45d9-875b-cc2dc0609d16
assets:
  dashboards:
    Lansweeper - Inventory: assets/dashboards/cds_lansweeper_inventory.json
    Lansweeper - Vulnerabilities: assets/dashboards/cds_lansweeper_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems.lansweeper
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32856075
    source_type_name: crest_data_systems_lansweeper
  logs:
    source: crest_data_systems_lansweeper
author:
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- network
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_lansweeper
integration_id: crest-data-systems-lansweeper
integration_title: Lansweeper
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_lansweeper
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.lansweeper
  product_id: lansweeper
  short_description: Por recurso Lansweeper al mes
  tag: asset_key
  unit_label: Recursos Lansweeper
  unit_price: 0.03
public_title: Lansweeper
short_description: Monitoriza datos de inventario y vulnerabilidades de Lansweeper.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza datos de inventario y vulnerabilidades de Lansweeper.
  media:
  - caption: Lansweeper - Inventario
    image_url: images/cds_lansweeper_inventory.png
    media_type: imagen
  - caption: Lansweeper - Vulnerabilidades
    image_url: images/cds_lansweeper_vulnerabilities.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Lansweeper
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
[**Lansweeper**][1] es una solución de gestión de recursos TI y de análisis de red que proporciona información detallada sobre hardware, software y vulnerabilidades en diferentes entornos.

Esta integración te permite recopilar y visualizar datos de inventario y vulnerabilidades de Lansweeper. Si aprovechas las sólidas capacidades de análisis de Lansweeper, podrás visualizar:

- **Datos de inventario**: Sitios, recursos, software y datos de cuentas autorizadas.
- **Vulnerabilidades**

Esta integración incluye dos dashboards predefinidos:

1. **Inventario de Lansweeper**: Monitoriza y visualiza los datos de sitios, recursos, software y cuentas autorizadas, recopilados en un `interval_for_inventory` definido por el usuario.
2. **Vulnerabilidades de Lansweeper**: Muestra los datos de vulnerabilidades recopilados en el `min_collection_interval`.

> **Nota**: Solo los sitios con un plan de suscripción Lansweeper **Pro** o superior tienen acceso a los datos de vulnerabilidades.

## Asistencia
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][11]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][12]
- Página web: [crestdata.ai][13]
- FAQ: [FAQ de integraciiones de Crest Data Datadog Marketplace][3]


[1]: https://www.lansweeper.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Lansweeper.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://app.lansweeper.com/my-profile/dev-tools/applications/all
[6]: https://developer.lansweeper.com/docs/data-api/reference/types/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
[13]: https://www.crestdata.ai/
---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizar esta aplicación, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-lansweeper" target="_blank">adquiérela en el Marketplace</a>.