---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-sybase
app_uuid: 3aafbab1-a91b-4566-a6ce-88323867cb8b
assets:
  dashboards:
    SAP Sybase ASE - Overview: assets/dashboards/crest_data_sybase_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.sybase.monNetworkIO.BytesSent
      metadata_path: metadata.csv
      prefix: cds.sybase
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8061915
    source_type_name: crest_data_systems_sybase
  monitors:
    Sybase CPU Utilization is high: assets/monitors/crest_data_cpu_utilization_for_sybase.json
    Sybase CPU Utilization is reaching its limit: assets/monitors/crest_data_forecast_cpu_utilization_for_sybase.json
    Sybase Disk Utilization is high: assets/monitors/crest_data_disk_utilization_for_sybase.json
    Sybase Disk Utilization is reaching its limit: assets/monitors/crest_data_forecast_disk_utilization_for_sybase.json
    Sybase Global Heap Utilization is high: assets/monitors/crest_data_global_heap_utilization_for_sybase.json
    Sybase Global Heap Utilization is reaching its limit: assets/monitors/crest_data_forecast_global_heap_utilization_for_sybase.json
    Sybase I/O Utilization is high: assets/monitors/crest_data_io_utilization_for_sybase.json
    Sybase I/O Utilization is reaching its limit: assets/monitors/crest_data_forecast_io_utilization_for_sybase.json
    Sybase Memory Utilization is high: assets/monitors/crest_data_memroy_utilization_for_sybase.json
    Sybase Memory Utilization is reaching its limit: assets/monitors/crest_data_forecast_memory_utilization_for_sybase.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- almacenes de datos
- marketplace
- events
- sap
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sybase
integration_id: crest-data-systems-sybase
integration_title: SAP Sybase ASE
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sybase
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.sybase
  product_id: sybase
  short_description: Por instancia de sybase al mes
  tag: cds_sybase_host
  unit_label: Instancia de Sybase activa
  unit_price: 195.0
public_title: SAP Sybase ASE
short_description: Monitorización del rendimiento y el uso de los servidores de SAP
  Sybase ASE
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Marketplace
  - Category::Alerting
  - Category::SAP
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitorización del rendimiento y el uso de los servidores de SAP Sybase
    ASE
  media:
  - caption: 'SAP Sybase ASE: información general'
    image_url: images/crest_data_sybase_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: SAP Sybase ASE
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

SAP Adaptive Server Enterprise (ASE), también conocido como Sybase, es un sistema de gestión de bases de datos relacionales. Se trata de un servidor de bases de datos SQL de alto rendimiento que utiliza un modelo de gestión relacional para satisfacer la creciente demanda de rendimiento, fiabilidad y eficiencia en todos los sectores.

Esta integración obtiene estadísticas del servidor en tiempo real, como la utilización de la CPU del sistema, la utilización de la CPU de E/S, las estadísticas de red y mucho más, lo que te permite visualizar el estado de tu servidor de bases de datos en dashboards de Datadog.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][7]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][8]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]



[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.devart.com/odbc/ase/
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sybase.pdf
[10]: https://docs.datadoghq.com/es/account_management/api-app-keys
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.datadoghq.com/es/agent/?tab=Linux

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sybase" target="_blank">adquiere esta aplicación en el Marketplace</a>.