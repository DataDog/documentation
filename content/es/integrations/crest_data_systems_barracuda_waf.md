---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-barracuda-waf
app_uuid: 6d143b10-1da5-44e6-9143-19506722385f
assets:
  dashboards:
    CDS Barracuda WAF - Access Details: assets/dashboards/cds_barracuda_waf_access_details.json
    CDS Barracuda WAF - Audit Details (WAAS): assets/dashboards/cds_barracuda_waf_audit_details_waas.json
    CDS Barracuda WAF - Audit Details (WAF): assets/dashboards/cds_barracuda_waf_audit_details_waf.json
    CDS Barracuda WAF - Event Details: assets/dashboards/cds_barracuda_waf_event_details.json
    CDS Barracuda WAF - Network Firewall Details: assets/dashboards/cds_barracuda_waf_network_firewall_details.json
    CDS Barracuda WAF - System Details: assets/dashboards/cds_barracuda_waf_system_details.json
    CDS Barracuda WAF - Web Firewall Details: assets/dashboards/cds_barracuda_waf_web_firewall_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10380
    source_type_name: crest_data_systems_barracuda_waf
  monitors:
    'Server Responding with Status Code lying in Range: [400-599]': assets/monitors/cds_server_response_error_status_code.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- gestión de eventos
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_barracuda_waf
integration_id: crest-data-systems-barracuda-waf
integration_title: Barracuda WAF
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_barracuda_waf
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: barracuda-waf
  short_description: Tarifa plana mensual para la integración de Barracuda WAF.
  unit_price: 295.0
public_title: Barracuda WAF
short_description: Visualización de los datos de Barracuda WAF y Barracuda WAAS a
  través de Syslog o API
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
  - Category::Event Management
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualización de los datos de Barracuda WAF y Barracuda WAAS a través
    de Syslog o API
  media:
  - caption: 'CDS Barracuda WAF: detalles de acceso'
    image_url: images/cds_barracuda_waf_access_details.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles de auditoría (WAF)'
    image_url: images/cds_barracuda_waf_audit_details_waf.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles de auditoría (WAAS)'
    image_url: images/cds_barracuda_waf_audit_details_waas.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles del firewall de red'
    image_url: images/cds_barracuda_waf_network_firewall_details.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles del sistema'
    image_url: images/cds_barracuda_waf_system_details.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles del firewall web'
    image_url: images/cds_barracuda_waf_web_firewall_details.png
    media_type: imagen
  - caption: 'CDS Barracuda WAF: detalles de evento'
    image_url: images/cds_barracuda_waf_event_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Barracuda WAF
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Esta integración de Barracuda WAF monitoriza y visualiza Barracuda WAF así como Barracuda WAAS.

### Barracuda Web Application Firewall (WAF)

**Barracuda Web Application Firewall (WAF)** es una solución de seguridad diseñada para proteger las aplicaciones web de varios tipos de ciberamenazas y ataques. Actúa como gateway entre el servidor de aplicaciones web e Internet, mediante la monitorización y el filtrado del tráfico entrante y saliente para garantizar la seguridad y disponibilidad de la aplicación. 

### Barracuda Web Application Firewall as-a-service (WAAS)

**Barracuda WAF-as-a-Service (WAAS)** proporciona seguridad de aplicaciones de nivel empresarial en la nube sin la sobrecarga administrativa de un dispositivo. Con Barracuda WAF-as-a-Service, puedes proteger tus aplicaciones en cuestión de minutos, independientemente de dónde estén alojadas. No hay nada que desplegar, escalar, dimensionar ni mantener.

### Funciones

| Producto | Método | Logs capturados | Enlace de referencia de documentos | 
  | ---- | ----------- | -------- | --------- | 
  | WAF | Syslog | Firewall de red, Acceso, Firewall web, Auditoría, Sistema| [Barracuda WAF][9]|
  | WAAS | Syslog | Firewall web, Acceso, Evento| [Syslog de Barracuda WAAS][10]|
  | WAAS  | API | Firewall web, Acceso, Auditoría| [API de Barracuda WAAS][11]|


## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][2]
- Ventas: [datadog-sales@crestdata.ai][3]
- Página web: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][15]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767342/adding-a-syslog-server
[8]: https://campus.barracuda.com/product/WAAS/doc/91980986/managing-administrator-roles/
[9]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767349/exporting-log-formats/
[10]: https://campus.barracuda.com/product/WAAS/doc/79462622/log-export
[11]: https://blog.barracuda.com/2021/10/18/barracuda-waf-as-a-service-rest-api
[12]: https://docs.crestdata.ai/datadog-integrations-readme/barracuda_WAF.pdf
[13]: https://docs.datadoghq.com/es/agent/?tab=Linux
[14]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[15]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-barracuda-waf" target="_blank">adquiere esta aplicación en el Marketplace</a>.