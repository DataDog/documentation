---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cisco-secure-workload
app_uuid: 5014e003-b478-4094-b618-69e9e3cf507a
assets:
  dashboards:
    Cisco Secure Workload - Enforcement: assets/dashboards/crest_data_systems_cisco_secure_workload_enforcement.json
    Cisco Secure Workload - Scope and Inventory: assets/dashboards/crest_data_systems_cisco_secure_workload_scope_and_inventory.json
    Cisco Secure Workload - Traffic Flow: assets/dashboards/crest_data_systems_cisco_secure_workload_traffic_flow.json
    Cisco Secure Workload - Vulnerabilities: assets/dashboards/crest_data_systems_cisco_secure_workload_vulnerabilities.json
    Cisco Secure Workload - Workload Details: assets/dashboards/crest_data_systems_cisco_secure_workload_workload_details.json
    Cisco Secure Workload - Workload Overview: assets/dashboards/crest_data_systems_cisco_secure_workload_workload_overview.json
    Cisco Secure Workload Overview: assets/dashboards/crest_data_systems_cisco_secure_workload_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cd.cisco.secure.workload.workload_stats_details.tx_packet_count
      metadata_path: metadata.csv
      prefix: cd.cisco.secure.workload
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 23600016
    source_type_name: crest_data_systems_cisco_secure_workload
  logs:
    source: crest-data-systems-cisco-secure-workload
  monitors:
    Agent Failed to Upgrade: assets/monitors/crest_data_systems_agent_upgrade_status_failed.json
    Agent Registration Failed: assets/monitors/crest_data_systems_agent_enforcer_registration_status_failed.json
    Potential Malicious Activity Detected from Consumer: assets/monitors/crest_data_systems_potential_malicious_activity_detected_from_consumer.json
    Potential Malicious Activity Detected from Provider: assets/monitors/crest_data_systems_potential_malicious_activity_detected_from_provider.json
    Total Active Internet Breach Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_active_internet_breach_vulnerabilities_exceeds_limit.json
    Total Critical Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_critical_vulnerabilities_exceeds_limit.json
    Total Easily Exploitable Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_easily_exploitable_vulnerabilities_exceeds_limit.json
    Total High Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_high_vulnerabilities_exceeds_limit.json
    Total Malware Exploitable Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_malware_exploitable_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- seguridad
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_secure_workload
integration_id: crest-data-systems-cisco-secure-workload
integration_title: Cisco Secure Workload
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_secure_workload
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cisco_secure_workload
  product_id: cisco-secure-workload
  short_description: Por carga de trabajo y mes
  tag: cds_cisco_secure_workload_workload
  unit_label: Carga de trabajo en Cisco Secure Workload
  unit_price: 1.0
public_title: Cisco Secure Workload
short_description: Monitoriza logs y métricas de cargas de trabajo, ejecución, tráfico
  e inventario de Cisco Secure Workload.
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
  - Categoría::Marketplace
  - Offering::Integration
  - Tipo de datos enviados::Logs
  - Submitted Data Type::Metrics
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Monitoriza logs y métricas de cargas de trabajo, ejecución, tráfico
    e inventario de Cisco Secure Workload.
  media:
  - caption: Cisco Secure Workload - Detalles de la carga de trabajo
    image_url: images/crest-data-systems-cisco-secure-workload-workload-details.png
    media_type: imagen
  - caption: Cisco Secure Workload - Flujo de tráfico
    image_url: images/crest-data-systems-cisco-secure-workload-traffic-flow.png
    media_type: imagen
  - caption: Cisco Secure Workload - Vulnerabilidades
    image_url: images/crest-data-systems-cisco-secure-workload-vulnerabilities.png
    media_type: imagen
  - caption: Información general de Cisco Secure Workload
    image_url: images/crest-data-systems-cisco-secure-workload-overview.png
    media_type: imagen
  - caption: Cisco Secure Workload - Contexto e inventario
    image_url: images/crest-data-systems-cisco-secure-workload-scope-and-inventory.png
    media_type: imagen
  - caption: Cisco Secure Workload - Información general de la carga de trabajo
    image_url: images/crest-data-systems-cisco-secure-workload-workload-overview.png
    media_type: imagen
  - caption: Cisco Secure Workload - Cumplimiento
    image_url: images/crest-data-systems-cisco-secure-workload-enforcement.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cisco Secure Workload
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Cisco Secure Workload es una solución de seguridad integral diseñada para proteger de amenazas y brechas las aplicaciones y cargas de trabajo en varios entornos, incluyendo infraestructuras on-premises y en la nube.

Esta integración monitoriza y visualiza las siguientes fuentes de datos como logs:
* Datos de inventario
* Flujo de tráfico
* Detalles de la carga de trabajo
* Paquetes de la carga de trabajo
* Vulnerabilidades de la carga de trabajo
* Datos de cumplimiento

Además, las métricas de estadísticas de carga de trabajo e inventario se ingieren como parte de esta integración.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data Systems a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][3]
- Página web: [crestdata.ai][4]
- Preguntas frecuentes: [Preguntas frecuentes sobre integraciones Crest Data del Marketplace Datadog][11]


[1]: https://www.cisco.com/c/en/us/td/docs/security/workload_security/secure_workload/user-guide/3_9/cisco-secure-workload-user-guide-on-prem-v39/secure-workload-openapis.html#task_911065
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://www.crestdatasys.com/datadog-integrations-readme/Cisco_Secure_Workload.pdf
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-secure-workload" target="_blank">adquiere esta aplicación en el Marketplace</a>.