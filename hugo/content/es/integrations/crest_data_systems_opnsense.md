---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-opnsense
app_uuid: 0adf83e0-cc01-4d1e-aa88-1a48d6eac7a3
assets:
  dashboards:
    OPNsense - DHCP: assets/dashboards/crest_data_systems_opnsense_dhcp.json
    OPNsense - Firewall Details: assets/dashboards/crest_data_systems_opnsense_firewall_details.json
    OPNsense - Intrusion Detection: assets/dashboards/crest_data_systems_opnsense_intrusion_detection.json
    OPNsense - Overview: assets/dashboards/crest_data_systems_opnsense_overview.json
    OPNsense - Unbound DNS: assets/dashboards/crest_data_systems_opnsense_unbound_dns.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31831185
    source_type_name: crest_data_systems_opnsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- network
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_opnsense
integration_id: crest-data-systems-opnsense
integration_title: OPNsense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_opnsense
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: opnsense
  short_description: Tarifa plana mensual para la integración de OPNsense.
  unit_price: 95.0
public_title: OPNsense
short_description: Monitorización del reenvío de logs desde OPNsense
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
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Monitorización del reenvío de logs desde OPNsense
  media:
  - caption: Información general sobre OPNsense
    image_url: images/crest_data_systems_opnsense_overview.png
    media_type: imagen
  - caption: Detalles del firewall de OPNsense
    image_url: images/crest_data_systems_opnsense_firewall_details.png
    media_type: imagen
  - caption: DHCP de OPNsense
    image_url: images/crest_data_systems_opnsense_dhcp.png
    media_type: imagen
  - caption: DNS sin límites de OPNsense
    image_url: images/crest_data_systems_opnsense_unbound_dns.png
    media_type: imagen
  - caption: IDS de OPNsense
    image_url: images/crest_data_systems_opnsense_ids.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: OPNsense
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

OPNsense es una plataforma de enrutamiento y firewall de código abierto basada en FreeBSD y diseñada para la gestión avanzada del tráfico y la seguridad de la red.

Esta integración analiza los logs recibidos para los firewalls, DHCP, DNS sin límites y detección de intrusiones desde OPNsense a través de la red vía UDP, los monitoriza y permite visualizarlos en Datadog.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: datadog.integrations@crestdata.ai
- Correo electrónico de ventas: datadog-sales@crestdata.ai
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.opnsense.org/manual/settingsmenu.html#logging
[6]: mailto:datadog.integrations@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/OPNsense.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-opnsense" target="_blank">adquiere esta aplicación en el Marketplace</a>.