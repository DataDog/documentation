---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-pfsense
app_uuid: 39d6eaf5-ff21-4fd6-a3c5-cbbad9b8a449
assets:
  dashboards:
    pfSense - DHCP: assets/dashboards/crest_data_systems_pfsense_DHCP_Details.json
    pfSense - Firewall: assets/dashboards/crest_data_systems_pfsense_Firewall_Details.json
    pfSense - NGINX: assets/dashboards/crest_data_systems_pfsense_NGINX_Details.json
    pfSense - OpenVPN: assets/dashboards/crest_data_systems_pfsense_OpenVPN_Details.json
    pfSense - Overview: assets/dashboards/crest_data_systems_pfsense_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.pfsense.packet_length
      metadata_path: metadata.csv
      prefix: cds.pfsense
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10347
    source_type_name: crest_data_systems_pfsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- la red
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_pfsense
integration_id: crest-data-systems-pfsense
integration_title: pfSense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_pfsense
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.pfsense
  product_id: pfsense
  short_description: Por instancia de pfSense al mes
  tag: cds_pfsense_host
  unit_label: Instancia de pfSense
  unit_price: 95.0
public_title: pfSense
short_description: Monitorización del reenvío de logs desde pfSense
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
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorización del reenvío de logs desde pfSense
  media:
  - caption: 'pfSense: dashboard de información general'
    image_url: images/crest_data_systems_pfsense_overview.png
    media_type: imagen
  - caption: 'pfSense: dashboard de firewall'
    image_url: images/crest_data_systems_pfsense_Firewall_Details.png
    media_type: imagen
  - caption: 'pfsense: dashboard de OpenVPN'
    image_url: images/crest_data_systems_pfsense_OpenVPN_Details.png
    media_type: imagen
  - caption: 'pfSense: dashboard de DHCP'
    image_url: images/crest_data_systems_pfsense_DHCP_Details.png
    media_type: imagen
  - caption: 'pfSense: dashboard de NGINX'
    image_url: images/crest_data_systems_pfsense_NGINX_Details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: pfSense
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

pfSense es una distribución de código abierto personalizada de FreeBSD que está específicamente adaptada para su uso como firewall y router que puede ser gestionado a través de una interfaz web.

Esta integración monitoriza logs para firewalls, OpenVPN, NGINX y DHCP desde pfSense CE. Esta integración también captura métricas y proporciona información sobre la longitud de los paquetes y los bytes enviados por solicitud desde los logs recopilados.

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: datadog.integrations@crestdata.ai
- Correo electrónico de ventas: datadog-sales@crestdata.ai
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.netgate.com/pfsense/en/latest/monitoring/logs/settings.html
[6]: https://docs.netgate.com/pfsense/en/latest/config/general.html#localization
[7]: mailto:datadog.integrations@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/pFsense.pdf
[9]: https://docs.datadoghq.com/es/agent/?tab=Linux
[10]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-pfsense" target="_blank">adquiere esta aplicación en el Marketplace</a>.