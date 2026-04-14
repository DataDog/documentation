---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cisco-mds
app_uuid: 7eba883f-8c0d-4908-be90-53433acef180
assets:
  dashboards:
    Cisco MDS - CDP and Cores Details: assets/dashboards/crest_data_cisco_mds_cdp_and_core_details.json
    Cisco MDS - CPU and Memory Details: assets/dashboards/crest_data_cisco_mds_cpu_and_memory_details.json
    Cisco MDS - Diagnostic Test Results Details: assets/dashboards/crest_data_cisco_mds_diagnostic_test_results_details.json
    Cisco MDS - Environment Details: assets/dashboards/crest_data_cisco_mds_environment_details.json
    Cisco MDS - FCS and FLOGI Session Details: assets/dashboards/crest_data_cisco_mds_fcs_and_flogi_session_details.json
    Cisco MDS - Interface Details: assets/dashboards/crest_data_cisco_mds_interface_details.json
    Cisco MDS - Inventory and Users Details: assets/dashboards/crest_data_cisco_mds_inventory_and_users_details.json
    Cisco MDS - Module Details: assets/dashboards/crest_data_cisco_mds_module_details.json
    Cisco MDS - Port Channel Details: assets/dashboards/crest_data_cisco_mds_port_channel_details.json
    Cisco MDS - System Log Details: assets/dashboards/crest_data_cisco_mds_system_log_details.json
    Cisco MDS - Topology Details: assets/dashboards/crest_data_cisco_mds_topology_details.json
    Cisco MDS - VSAN Details: assets/dashboards/crest_data_cisco_mds_vsan_details.json
    Cisco MDS - Zone Details: assets/dashboards/crest_data_cisco_mds_zone_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11931276
    source_type_name: crest_data_systems_cisco_mds
  logs:
    source: crest-data-systems-cisco-mds
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- la red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_mds
integration_id: crest-data-systems-cisco-mds
integration_title: Cisco MDS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_mds
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cisco_mds
  product_id: cisco-mds
  short_description: Por host al mes
  tag: cds_cisco_mds_instance
  unit_label: Instancia de Cisco MDS
  unit_price: 95.0
public_title: Cisco MDS
short_description: Monitorizar los logs de switch de Cisco MDS
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
  - Offering::Integration
  - Submitted Data Type::Logs
  - Category::Network
  configuration: README.md#Setup
  description: Monitorizar los logs de switch de Cisco MDS
  media:
  - caption: 'Cisco MDS: CDP y detalles principales'
    image_url: images/crest_data_cisco_mds_cdp_and_core_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles de CPU y memoria'
    image_url: images/crest_data_cisco_mds_cpu_and_memory_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles de los resultados de los tests de diagnóstico'
    image_url: images/crest_data_cisco_mds_diagnostic_test_results_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles de entorno'
    image_url: images/crest_data_cisco_mds_environment_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles de la interfaz'
    image_url: images/crest_data_cisco_mds_interface_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles del módulo'
    image_url: images/crest_data_cisco_mds_module_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles del canal de puertos'
    image_url: images/crest_data_cisco_mds_port_channel_details.png
    media_type: imagen
  - caption: 'Cisco MDS: detalles de la zona'
    image_url: images/crest_data_cisco_mds_zone_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco MDS
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Cisco Multilayer Director Switch (MDS) hace referencia a una familia de switches y directores de  Storage Area Network (SAN) fabricados por Cisco Systems. Las SAN son redes especializadas que facilitan el acceso a dispositivos de almacenamiento en bloque, como matrices de discos, bibliotecas de cinta y otros dispositivos de almacenamiento.

Los switches de Cisco MDS están diseñados para proporcionar una conectividad fiable y de alto rendimiento para dispositivos de almacenamiento en un entorno de SAN. Ofrecen funciones y capacidades específicamente adaptadas para redes de almacenamiento, como la compatibilidad con el protocolo Fibre Channel. Fibre Channel es una tecnología de red de alta velocidad utilizada habitualmente en SAN para conectar servidores y dispositivos de almacenamiento.

Esta integración controla y visualiza las siguientes fuentes de datos:

- Esenciales
- Resultados de los tests de diagnóstico
- Entorno
- FCS
- FLOGI Session
- Interfaz
- Inventario
- Usuarios
- Módulo
- Canal de puerto
- CPU
- Memoria
- Log de sistema
- Topología
- VSAN
- Zona

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQs: [Crest Data Datadog Marketplace Integrations FAQ][14]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#concept_1BB6AE2F8269406D9D0B7656F65CF316
[8]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/nx-os/configuration/guides/sysmgnt/sysmgmt_fm_4_2/sysmgmt_fm_4_2_cg/log.html#wp1184487
[9]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#id_10718
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.datadoghq.com/es/help/
[12]: https://docs.datadoghq.com/es/account_management/api-app-keys
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_MDS.pdf
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-mds" target="_blank">adquiere esta aplicación en el Marketplace</a>.