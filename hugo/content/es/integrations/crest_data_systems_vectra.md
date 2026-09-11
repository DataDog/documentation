---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-vectra
app_uuid: e54f4b47-79b9-4b3c-9788-5716764c0bce
assets:
  dashboards:
    Vectra Cloud - Detection Events: assets/dashboards/crest_data_systems_vectra_detection_events.json
    Vectra Cloud - Detections: assets/dashboards/crest_data_systems_vectra_detections.json
    Vectra Cloud - Entities: assets/dashboards/crest_data_systems_vectra_entities.json
    Vectra Cloud - Entity Events: assets/dashboards/crest_data_systems_vectra_entity_events.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.crest_data_systems.vectra
      metadata_path: metadata.csv
      prefix: crest_data_systems
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28455858
    source_type_name: crest_data_systems_vectra
  logs:
    source: crest-data-systems-vectra
  monitors:
    Total Threat Detections Exceeds Limit: assets/monitors/crest_data_systems_total_threat_detections_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- nube
- marketplace
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_vectra
integration_id: crest-data-systems-vectra
integration_title: Vectra Cloud
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_vectra
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.vectra
  product_id: vectra
  short_description: Por entidad de Vectra Cloud al mes
  tag: entity_id
  unit_label: Entidad de Vectra Cloud
  unit_price: 1.0
public_title: Vectra Cloud
short_description: Recopila logs para entidades, detecciones, eventos de entidad y
  eventos de detección de Vectra Cloud.
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
  - Category::Cloud
  - Categoría::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Recopila logs para entidades, detecciones, eventos de entidad y eventos
    de detección de Vectra Cloud.
  media:
  - caption: 'Vectra Cloud: entidades'
    image_url: images/crest_data_systems_vectra_entities.png
    media_type: imagen
  - caption: 'Vectra Cloud: detecciones'
    image_url: images/crest_data_systems_vectra_detections.png
    media_type: imagen
  - caption: 'Vectra Cloud: eventos de entidad'
    image_url: images/crest_data_systems_vectra_entity_events.png
    media_type: imagen
  - caption: 'Vectra Cloud: evento de detección'
    image_url: images/crest_data_systems_vectra_detection_events.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Support
  title: Vectra Cloud
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Vectra AI Inc (Vectra AI) es un proveedor de soluciones de ciberseguridad, incluidas soluciones de detección y respuesta a amenazas. Vectra AI también proporciona seguridad en la nube, detecta ransomware, protege lugares de trabajo remotos, busca e investiga amenazas y ofrece investigaciones y servicios de riesgos y cumplimiento.

Esta integración recopila logs para los siguientes tipos de datos:

* Entidades
* Detecciones
* Eventos de entidad
* Eventos de detección

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][5]
- Ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]


[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Vectra.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-vectra" target="_blank">adquiere esta aplicación en el Marketplace</a>.