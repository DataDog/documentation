---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-infoblox-ddi
app_uuid: d497c205-6215-4fcc-87d3-bb17c66fbeb7
assets:
  dashboards:
    CDS Infoblox DDI - DHCP Details: assets/dashboards/cds_infoblox_ddi_dhcp_details.json
    CDS Infoblox DDI - DNS Details: assets/dashboards/cds_infoblox_ddi_dns_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10383
    source_type_name: crest_data_systems_infoblox_ddi
author:
  homepage: https://www.crestdata.ai
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
git_integration_title: crest_data_systems_infoblox_ddi
integration_id: crest-data-systems-infoblox-ddi
integration_title: Infoblox DNS y DHCP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_infoblox_ddi
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: infoblox-ddi
  short_description: Tarifa plana mensual para la integración de Infoblox y DDI.
  unit_price: 95.0
public_title: Infoblox DNS y DHCP
short_description: Visualización de los datos Syslog de Infoblox DDI
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
  description: Visualización de los datos Syslog de Infoblox DDI
  media:
  - caption: 'CDS Infoblox DDI: detalles de DHCP'
    image_url: images/cds_infoblox_ddi_dhcp_details.png
    media_type: imagen
  - caption: 'CDS Infoblox DDI: detalles de DNS'
    image_url: images/cds_infoblox_ddi_dns_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Infoblox DNS y DHCP
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

* Infoblox DDI es una plataforma que automatiza y controla servicios de red de núcleo.
* Sus soluciones permiten a las organizaciones gestionar eficazmente las operaciones de DNS, DHCP e IPAM, simplificando las tareas de gestión de red y mejorando la fiabilidad y seguridad generales de red.
* Infoblox DDI se centra en proporcionar servicios de DNS y DHCP seguros para proteger contra amenazas y garantizar la integridad de la infraestructura de red.

Esta integración controla y visualiza las siguientes fuentes de datos:

* Logs de DHCP
* Logs de DNS

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-guide-vnios-deployment-on-vmware-vsphere
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.infoblox.com/space/NAG8/22252249/Using+a+Syslog+Server#Specifying-Syslog-Servers
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Infoblox_DDI.pdf
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-infoblox-ddi" target="_blank">adquiere esta aplicación en el Marketplace</a>.