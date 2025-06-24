---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-armis
app_uuid: a9673290-7000-49d9-9f19-bbf049e6b746
assets:
  dashboards:
    Armis - Alerts: assets/dashboards/crest_data_systems_armis_alerts.json
    Armis - Device Application: assets/dashboards/crest_data_systems_armis_device_applications.json
    Armis - Devices: assets/dashboards/crest_data_systems_armis_devices.json
    Armis - Overview: assets/dashboards/crest_data_systems_armis_overview.json
    Armis - Policies: assets/dashboards/crest_data_systems_armis_policies.json
    Armis - Users: assets/dashboards/crest_data_systems_armis_users.json
    Armis - Vulnerabilities: assets/dashboards/crest_data_systems_armis_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20667054
    source_type_name: crest_data_systems_armis
  logs:
    source: crest-data-systems-armis
  monitors:
    Total Critical Alerts Exceeds Limit: assets/monitors/crest_data_systems_total_critical_alerts_exceeds_limit.json
    Total Open Critical Vulnerabilities Exceeds Limit: assets/monitors/crest_data_systems_total_open_critical_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- nube
- marketplace
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_armis
integration_id: crest-data-systems-armis
integration_title: Armis Centrix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_armis
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.armis
  product_id: armis
  short_description: Por inquilino por mes
  tag: cds_armis_tenant
  unit_label: Inquilino de Armis
  unit_price: 195.0
public_title: Armis Centrix
short_description: Recopila logs para alertas, vulnerabilidades, dispositivos, aplicaciones
  de dispositivos, políticas y usuarios de Armis.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Nube
  - Category::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Recopila logs para alertas, vulnerabilidades, dispositivos, aplicaciones
    de dispositivos, políticas y usuarios de Armis.
  media:
  - caption: 'Armis: alertas'
    image_url: images/crest-data-systems-armis-alerts.png
    media_type: imagen
  - caption: 'Armis: dispositivos'
    image_url: images/crest-data-systems-armis-devices.png
    media_type: imagen
  - caption: 'Armis: aplicaciones de dispositivos'
    image_url: images/crest-data-systems-armis-device-applications.png
    media_type: imagen
  - caption: 'Armis: políticas'
    image_url: images/crest-data-systems-armis-policies.png
    media_type: imagen
  - caption: 'Armis: usuarios'
    image_url: images/crest-data-systems-armis-users.png
    media_type: imagen
  - caption: 'Armis: vulnerabilidades'
    image_url: images/crest-data-systems-armis-vulnerabilities.png
    media_type: imagen
  - caption: 'Armis: información general'
    image_url: images/crest-data-systems-armis-overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Armis Centrix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Armis CentrixTM, la plataforma de gestión de exposición cibernética, está impulsada por el motor de inteligencia de activos con IA de Armis, que ve, asegura, protege y gestiona miles de millones de activos en todo el mundo en tiempo real. Su plataforma basada en la nube mitiga proactivamente los riesgos de los activos cibernéticos, corrige las vulnerabilidades, bloquea las amenazas y protege toda tu superficie de ataque.

Esta integración mejora las capacidades del cliente al ofrecer supervisión en tiempo real y gestión proactiva de los riesgos cibernéticos, garantizando así la protección continua de sus activos digitales y la defensa frente a posibles amenazas. Monitoriza tus alertas, actividades, vulnerabilidades, dispositivos, aplicaciones de dispositivos, políticas y usuarios de Armis.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data Systems a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][3]
- Página web: [crestdata.ai][4]
- FAQs: [Crest Data Datadog Marketplace Integrations FAQ][12]


[1]: https://integration-crestdata.armis.com/settings/api-management
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/help/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/es/agent/?tab=Linux
[10]: https://docs.datadoghq.com/es/account_management/api-app-keys
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Armis.pdf
[12]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-armis" target="_blank">adquiere esta aplicación en el Marketplace</a>.