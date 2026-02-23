---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cisco-asa
app_uuid: 384341e7-e5b4-42a0-917d-a52db20ce507
assets:
  dashboards:
    CDS Cisco ASA - Application Firewall Details: assets/dashboards/cds_cisco_asa_application_firewall_details.json
    CDS Cisco ASA - Identity-Based Firewall Details: assets/dashboards/cds_cisco_asa_identity_based_firewall_details.json
    CDS Cisco ASA - Overview: assets/dashboards/cds_cisco_asa_overview.json
    CDS Cisco ASA - Transparent Firewall Details: assets/dashboards/cds_cisco_asa_transparent_firewall_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10384
    source_type_name: crest_data_systems_cisco_asa
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- seguridad
- la red
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_asa
integration_id: crest-data-systems-cisco-asa
integration_title: Cisco ASA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_asa
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-asa
  short_description: Tarifa plana mensual para la integración de Cisco-ASA.
  unit_price: 1995.0
public_title: Cisco ASA
short_description: Visualización de los datos Syslog de Cisco ASA
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
  - Category::Security
  - Category::Network
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualización de los datos Syslog de Cisco ASA
  media:
  - caption: 'CDS Cisco ASA: información general'
    image_url: images/cds_cisco_asa_overview.png
    media_type: imagen
  - caption: 'CDS Cisco ASA: detalles del firewall basado en identidades'
    image_url: images/cds_cisco_asa_identity_based_firewall_details.png
    media_type: imagen
  - caption: 'CDS Cisco ASA: detalles del firewall transparente'
    image_url: images/cds_cisco_asa_transparent_firewall_details.png
    media_type: imagen
  - caption: 'CDS Cisco ASA: detalles del firewall de aplicaciones'
    image_url: images/cds_cisco_asa_application_firewall_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ASA
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

* Cisco ASA (Adaptive Security Appliance) es un dispositivo de seguridad de red multifuncional producido por Cisco Systems. Combina varias funciones de seguridad, como firewall, VPN (Virtual Private Network), prevención de intrusiones y seguridad de contenidos. 
* Cisco ASA actúa como línea principal de defensa para redes protegiéndolas de accesos no autorizados, amenazas maliciosas y violaciones de datos.
* Cisco ASA es un dispositivo de seguridad versátil que ofrece una sólida protección para redes de diversos tamaños, desde pequeños negocios hasta grandes empresas. Combina múltiples funciones de seguridad en un único dispositivo, lo que simplifica la gestión de la seguridad de red y garantiza una infraestructura de red segura y fiable.

Este integración controla y visualiza las siguientes fuentes de datos:
* Firewall de aplicaciones
* Firewall transparente
* Firewall basado en identidades
* Autenticación de usuarios
* Sesión de usuario
* Sistema de detección de intrusos
* Sistema
* Interfaz de mando

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://www.cisco.com/c/en/us/td/docs/security/asa/asa916/configuration/firewall/asa-916-firewall-config/access-sfr.html
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ASA.pdf
[9]: https://docs.datadoghq.com/es/agent/?tab=Linux
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-asa" target="_blank">adquiere esta aplicación en el Marketplace</a>.