---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-sybase-iq
app_uuid: 21c64335-f3d9-4e43-8d64-585892b65452
assets:
  dashboards:
    SAP Sybase IQ - Overview: assets/dashboards/crest_data_systems_sybase_iq_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.sybase_iq.network_stats.BytesReceived
      metadata_path: metadata.csv
      prefix: cds.sybase_iq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33927218
    source_type_name: crest_data_systems_sybase_iq
  monitors:
    Active Connections for Sybase IQ: assets/monitors/crest_data_active_connections_for_sybase_iq.json
    DBSpace Usage for Sybase IQ: assets/monitors/crest_data_dbspace_usage_for_sybase_iq.json
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
git_integration_title: crest_data_systems_sybase_iq
integration_id: crest-data-systems-sybase-iq
integration_title: SAP Sybase IQ
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sybase_iq
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.sybase_iq
  product_id: sybase-iq
  short_description: Por cada base de datos Sybase IQ al mes
  tag: cds_sybase_iq_database
  unit_label: Base de datos Sybase IQ activa
  unit_price: 195.0
public_title: SAP Sybase IQ
short_description: Monitoriza el rendimiento y el uso de las bases de datos SAP Sybase
  IQ.
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
  configuration: README.md#Configuración
  description: Monitoriza el rendimiento y el uso de las bases de datos SAP Sybase
    IQ.
  media:
  - caption: SAP Sybase ASE - información general
    image_url: images/crest_data_sybase_IQ_overview_1.png
    media_type: imagen
  - caption: SAP Sybase ASE - Información General (disco y conexión)
    image_url: images/crest_data_sybase_IQ_overview_2.png
    media_type: imagen
  - caption: SAP Sybase ASE - Información General (caché y DBSpace)
    image_url: images/crest_data_sybase_IQ_overview_3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: SAP Sybase IQ
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
SAP Sybase IQ, conocido por sus análisis de alta velocidad y sus capacidades de almacenamiento de datos a escala extrema, es una herramienta esencial para las empresas que requieren análisis de datos e informes eficientes. Mediante la integración con Datadog, las organizaciones pueden monitorizar directamente sus entornos Sybase IQ y obtener información sobre el rendimiento de la base de datos, el uso de recursos y el estado operativo.

Esta integración recopila estadísticas del servidor en tiempo real (CPU, disco, red uso, etc.) como métricas y eventos, lo que te permite visualizar el estado del servidor de base de datos en Datadog.

### Dashboards
Esta integración incluye un dashboard predefinido:

- **SAP Sybase IQ - Información general**: Realiza un seguimiento de las estadísticas de CPU, red, E/S de disco, conexión, caché y solicitudes en el intervalo_de_recopilación_mínimo.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][6]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][7]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ sobre integraciones Crest Data Datadog Marketplace][10]

### Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].


[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/help/
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/SybaseIQ.pdf
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://docs.datadoghq.com/es/agent/?tab=Linux

---
Esta aplicación está disponible a través del Datadog Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sybase-iq" target="_blank">adquiere esta aplicación en el Marketplace</a>.