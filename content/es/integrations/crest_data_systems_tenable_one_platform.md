---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-tenable-one-platform
app_uuid: c6836683-9283-4e9e-ab31-c74998a0667b
assets:
  dashboards:
    CDS Tenable One Platform - IO - Asset Overview: assets/dashboards/cds_tenable_one_platform_io_asset_overview.json
    CDS Tenable One Platform - IO - Plugins Overview: assets/dashboards/cds_tenable_one_platform_io_plugin_overview.json
    CDS Tenable One Platform - IO - Vulnerability Overview: assets/dashboards/cds_tenable_one_platform_io_vulnerability_overview.json
    CDS Tenable One Platform - SC - Asset Overview: assets/dashboards/cds_tenable_one_platform_sc_asset_overview.json
    CDS Tenable One Platform - SC - Vulnerability Overview: assets/dashboards/cds_tenable_one_platform_sc_vulnerability_overview.json
    CDS Tenable One Platform - Sc - Plugins Overview: assets/dashboards/cds_tenable_one_platform_sc_plugin_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10358
    source_type_name: crest_data_systems_tenable_one_platform
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- la red
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_tenable_one_platform
integration_id: crest-data-systems-tenable-one-platform
integration_title: Tenable One Platform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_tenable_one_platform
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.tenable_one_platform
  product_id: tenable-one-platform
  short_description: Por activo de tenable_one_platform al mes
  tag: asset_id
  unit_label: Activo
  unit_price: 1.0
public_title: Tenable One Platform
short_description: Monitorización de las vulnerabilidades, los complementos y los
  activos de Tenable (io y sc)
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
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorización de las vulnerabilidades, los complementos y los activos
    de Tenable (io y sc)
  media:
  - caption: CDS Tenable One Platform - IO - Información general de la vulnerabilidad
    image_url: images/cds_tenable_one_platform_io_vulnerability_overview.png
    media_type: imagen
  - caption: CDS Tenable One Platform - IO - Información general de activos
    image_url: images/cds_tenable_one_platform_io_asset_overview.png
    media_type: imagen
  - caption: CDS Tenable One Platform - IO - Información general de los complementos
    image_url: images/cds_tenable_one_platform_io_plugin_overview.png
    media_type: imagen
  - caption: CDS Tenable One Platform - SC - Información general de la vulnerabilidad
    image_url: images/cds_tenable_one_platform_sc_vulnerability_overview.png
    media_type: imagen
  - caption: CDS Tenable One Platform - SC - Información general de activos
    image_url: images/cds_tenable_one_platform_sc_asset_overview.png
    media_type: imagen
  - caption: CDS Tenable One Platform - SC - Información general de los complementos
    image_url: images/cds_tenable_one_platform_sc_plugin_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable One Platform
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general  

Tenable es una empresa de ciberseguridad que ofrece diversos productos y servicios para ayudar a las organizaciones a gestionar y reducir sus riesgos cibernéticos.

Esta integración es compatible con Tenable.io y Tenable.sc.

**Tenable.io** es una plataforma basada en la nube que ofrece visibilidad continua y monitorización de los activos de una organización, tanto on-premises como en la nube. Combina la gestión de vulnerabilidades, el escaneado de aplicaciones web, la seguridad del contenedor y otras funciones para ofrecer una monitorización integral de la seguridad integral y una evaluación de riesgos.

**Tenable.sc** es una plataforma integral de gestión de vulnerabilidades que ofrece funciones de monitorización de redes continua, evaluación de vulnerabilidades y elaboración de informes. Ayuda a las organizaciones a identificar, evaluar y priorizar las vulnerabilidades en toda su infraestructura de TI, permitiendo esfuerzos de corrección eficaces.

Esta integración recopila los siguientes datos:  
* Vulnerabilidades
* Activos
* Complementos

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][12]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.tenable.com/vulnerability-management/Content/Settings/my-account/GenerateAPIKey.htm
[8]: https://docs.tenable.com/security-center/6_1/Content/GenerateAPIKey.htm
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Tenable_One_Platform.pdf
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-tenable-one-platform" target="_blank">adquiere esta aplicación en el Marketplace</a>.