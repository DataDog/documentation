---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cisco-ise
app_uuid: 68dcc9fc-a128-42be-b122-28e68e04c4ed
assets:
  dashboards:
    CDS Cisco ISE - Authentication Details: assets/dashboards/cds_cisco_ise_authentication_details.json
    CDS Cisco ISE - Client Provisioning Details: assets/dashboards/cds_cisco_ise_client_provisioning_details.json
    CDS Cisco ISE - Compliance Details: assets/dashboards/cds_cisco_ise_compliance_details.json
    CDS Cisco ISE - Device Details: assets/dashboards/cds_cisco_ise_device_details.json
    CDS Cisco ISE - Overview: assets/dashboards/cds_cisco_ise_overview.json
    CDS Cisco ISE - Posture Details: assets/dashboards/cds_cisco_ise_posture_details.json
    CDS Cisco ISE - Profiler Details: assets/dashboards/cds_cisco_ise_profiler_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10364
    source_type_name: crest_data_systems_cisco_ise
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- seguridad
- recopilación de logs
- aprovisionamiento
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_ise
integration_id: crest-data-systems-cisco-ise
integration_title: Cisco ISE
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_ise
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-ise
  short_description: Tarifa plana mensual para la integración de Cisco ISE.
  unit_price: 1995.0
public_title: Cisco ISE
short_description: Visualización de datos Syslog de Cisco ISE
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
  - Category::Log Collection
  - Category::Provisioning
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualización de datos Syslog de Cisco ISE
  media:
  - caption: 'CDS Cisco ISE: información general'
    image_url: images/cds_cisco_ise_overview.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles de autenticación'
    image_url: images/cds_cisco_ise_authentication_details.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles del perfil'
    image_url: images/cds_cisco_ise_profiler_details.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles del dispositivo'
    image_url: images/cds_cisco_ise_device_details.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles de la postura'
    image_url: images/cds_cisco_ise_posture_details.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles de cumplimiento'
    image_url: images/cds_cisco_ise_compliance_details.png
    media_type: imagen
  - caption: 'CDS Cisco ISE: detalles de aprovisionamiento del cliente'
    image_url: images/cds_cisco_ise_client_provisioning_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ISE
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Cisco Identity Services Engine (ISE) es una plataforma de políticas de control de acceso e identidades de nueva generación que permite a las empresas cumplir las normativas, mejorar la seguridad de la infraestructura y agilizar sus operaciones de servicio. La arquitectura única de Cisco ISE permite a las empresas recopilar información contextual en tiempo real de redes, usuarios y dispositivos.  

A continuación, el administrador puede utilizar esa información para tomar decisiones de gobernanza proactivas vinculando la identidad a varios elementos de red, como conmutadores de acceso, controladores LAN inalámbricos (WLC), gateway de Virtual Private Network (VPN) y conmutadores de centros de datos.

Esta integración tiene visualizaciones para los siguientes tipos de logs:
   * Autenticación
   * Postura 
   * Perfilador
   * Aprovisionamiento del cliente

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][3]
- Página web: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][9]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ISE.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-ise" target="_blank">adquiere esta aplicación en el Marketplace</a>.