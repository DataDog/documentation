---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-sentinel-one
app_uuid: 76849771-0309-46bc-b498-36de630b0c98
assets:
  dashboards:
    CDS Sentinel One - Activity Details: assets/dashboards/cds_sentinel_one_activity_details.json
    CDS Sentinel One - Endpoint Details: assets/dashboards/cds_sentinel_one_endpoint_details.json
    CDS Sentinel One - Group & application Details: assets/dashboards/cds_sentinel_one_group_and_application_details.json
    CDS Sentinel One - Threat Details: assets/dashboards/cds_sentinel_one_threat_details.json
    CDS SentinelOne - Alerts Details: assets/dashboards/cds_sentinel_one_alert_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10417
    source_type_name: crest_data_systems_sentinel_one
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sentinel_one
integration_id: crest-data-systems-sentinel-one
integration_title: SentinelOne
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sentinel_one
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.sentinel_one
  product_id: sentinel-one
  short_description: Por endpoint de SentineOne al mes
  tag: endpoint_id
  unit_label: Endpoint de SentinelOne
  unit_price: 1.0
public_title: SentinelOne
short_description: Monitorización de los agentes, amenazas, actividades, grupos y
  aplicaciones de SentinelOne.
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
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorización de los agentes, amenazas, actividades, grupos y aplicaciones
    de SentinelOne.
  media:
  - caption: 'CDS SentinelOne: detalles del endpoint'
    image_url: images/cds_sentinel_one_endpoint_details.png
    media_type: imagen
  - caption: 'CDS SentinelOne: detalles del grupo y de la aplicación'
    image_url: images/cds_sentinel_one_group_and_application_details.png
    media_type: imagen
  - caption: 'CDS SentinelOne: detalles de la actividad'
    image_url: images/cds_sentinel_one_activity_details.png
    media_type: imagen
  - caption: 'CDS SentinelOne: detalles de la amenaza'
    image_url: images/cds_sentinel_one_threat_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: SentinelOne
  uninstallation: README.md#Uninstallation
---

<!--  FUENTE https://github.com/DataDog/marketplace -->


## Información general

SentinelOne es una plataforma de ciberseguridad empresarial que ofrece prevención, detección y respuesta unificadas en un entorno de seguridad. La plataforma Singularity de SentinelOne simplifica la protección moderna de endpoints, la nube y la identidad a través de una plataforma centralizada y autónoma para la ciberseguridad empresarial.  

Esta integración recopila los siguientes tipos de datos:  

* Actividades 
* Alertas 
* Agentes  
* Aplicaciones  
* Grupos  
* Amenazas   

## Compatibilidad

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][5]
- Ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]


[1]: 
https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Sentinel_One.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sentinel-one" target="_blank">adquiere esta aplicación en el Marketplace</a>.