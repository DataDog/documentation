---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-commvault
app_uuid: dd1aca96-e034-4812-8ff3-f5a6e9aa36c1
assets:
  dashboards:
    Commvault - Commcell , Jobs and SLA Details: assets/dashboards/crest_data_commvault_commcell_jobs_sla.json
    Commvault - Environment, Server and Space Utilization Details: assets/dashboards/crest_data_commvault_environment_server_space.json
    Commvault - Job Operations: assets/dashboards/crest_data_commvault_job_operations.json
    Commvault - Monitoring: assets/dashboards/crest_data_commvault_monitoring.json
    Commvault - Storage and Library: assets/dashboards/crest_data_commvault_storage_library.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.commvault.freeSpace
      metadata_path: metadata.csv
      prefix: cds.commvault.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 13830234
    source_type_name: crest_data_systems_commvault
  logs:
    source: crest-data-systems-commvault
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- métricas
- recopilación de logs
- almacenes de datos
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_commvault
integration_id: crest-data-systems-commvault
integration_title: Commvault
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_commvault
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.commvault
  product_id: commvault
  short_description: Por espacio de almacenamiento de Terabyte utilizado al mes
  tag: terrabyte_count
  unit_label: Commvault Storagepool Used Space (TB)
  unit_price: 99.0
public_title: Commvault
short_description: Monitorización de logs de Commvault
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
  - Category::Metrics
  - Category::Log Collection
  - Category::Data Stores
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitorización de logs de Commvault
  media:
  - caption: 'Commvault: operaciones de trabajo'
    image_url: images/crest_data_commvault_job_operations.png
    media_type: imagen
  - caption: 'Commvault: Commcell, trabajos y detalles de SLA'
    image_url: images/crest_data_commvault_jobs_and_sla_details.png
    media_type: imagen
  - caption: 'Commvault: monitorización'
    image_url: images/crest_data_commvault_monitoring.png
    media_type: imagen
  - caption: 'Commvault: detalles de utilización de espacio y servidores'
    image_url: images/crest_data_commvault_server_and_space_utilization_details.png
    media_type: imagen
  - caption: 'Commvault: almacenamiento y biblioteca'
    image_url: images/crest_data_commvault_storage_and_library.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Commvault
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Commvault simplifica la gestión de datos y la copia de seguridad en diferentes plataformas en la nube y configuraciones locales. Garantiza la seguridad de los datos, el cumplimiento normativo, la escalabilidad y la eficiencia en diversos entornos, y proporciona un control centralizado de las copias de seguridad, la recuperación y los procesos de archivo.

Esta integración de Commvault monitoriza y visualiza tanto la nube/SaaS como las instalaciones on-premises.

La integración de Commvault y Datadog recupera datos para los siguientes endpoints:

- Dashboard
- Almacenamiento
    - Operaciones de librería
    - Operaciones de grupos de almacenamiento
    - Almacenamiento local
- Monitorización
    - Operaciones de alerta
- Operaciones de trabajo

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]


[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/es/agent/?tab=Linux
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Commvault.pdf
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-commvault" target="_blank">adquiere esta aplicación en el Marketplace</a>.
