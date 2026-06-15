---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-cyberark-identity
app_uuid: 20b047e7-182f-4a90-b250-ba4405d3bc15
assets:
  dashboards:
    CyberArk Identity Application Dashboard: assets/dashboards/cds_cyberark_identity_application_overview.json
    CyberArk Identity MFA Dashboard: assets/dashboards/cds_cyberark_identity_mfa_details_security_overview.json
    CyberArk Identity User and Endpoint Dashboard: assets/dashboards/cds_cyberark_identity_user_and_endpoint_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.cyberark.identity.device.available_device_capacity
      metadata_path: metadata.csv
      prefix: cds.cyberark.identity
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10377
    source_type_name: crest_data_systems_cyberark_identity
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- gestión de eventos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cyberark_identity
integration_id: crest-data-systems-cyberark-identity
integration_title: CyberArk Identity
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cyberark_identity
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cyberark_identity
  product_id: cyberark-identity
  short_description: Por usuario de CyberArk Identity al mes
  tag: user_id
  unit_label: Usuario de CyberArk Identity
  unit_price: 1.0
public_title: CyberArk Identity
short_description: Monitoriza la información sobre MFA, dispositivos, usuarios y aplicaciones
  de CyberArk Identity.
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
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza la información sobre MFA, dispositivos, usuarios y aplicaciones
    de CyberArk Identity.
  media:
  - caption: Dashboard de MFA de CyberArk Identity
    image_url: images/crest_data_systems_cyberark_identity_mfa_details.png
    media_type: imagen
  - caption: Dashboard de usuario y endpoint de CyberArk Identity
    image_url: images/crest_data_systems_cyberark_identity_user_and_endpoint_details.png
    media_type: imagen
  - caption: Dashboard de aplicación de CyberArk Identity
    image_url: images/crest_data_systems_cyberark_identity_application_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: CyberArk Identity
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

CyberArk Identity proporciona una plataforma segura para gestionar el acceso a aplicaciones, endpoints e infraestructura de red. CyberArk Identity también ofrece análisis adaptables, auditoría de la actividad de los usuarios e informes integrados y personalizados, que están disponibles a través del portal de administración de Identity.

**Entre las características de CyberArk Identity se encuentran las siguientes:**

* **Aprovisionamiento de acceso automatizado:** aprovisionamiento y revocación dinámica del acceso a los recursos corporativos.
* **Orquestación de identidades:** simplifica y automatiza los procesos de identidades complejas.
* **Controles de cumplimiento:** establece controles de cumplimiento y certificación de acceso en toda la organización.
* **Informes exhaustivos:** utiliza informes de auditoría y dashboards detallados para obtener visibilidad de los permisos de acceso y los derechos.

* Esta integración utiliza CyberArk Identity como fuente para recopilar los datos relacionados con los usuarios, dispositivos, aplicaciones y detalles de MFA del portal utilizando el endpoint de consulta de redrock de CyberArk Identity.


## Agent

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
[7]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step1AddandconfiguretheOAuth2ClientAppintheIdentityAdministrationportal
[8]: https://docs.cyberark.com/Product-Doc/OnlineHelp/Idaptive/Latest/en/Content/Integrations/SIEM/SIEM.htm?TocPath=Administrator%7CIntegrations%7C_____4#Step2CreateaSIEMuserandaserviceaccountrole
[9]: https://docs.crestdata.ai/datadog-integrations-readme/CyberArk_Identity.pdf
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cyberark-identity" target="_blank">adquiere esta aplicación en el Marketplace</a>.