---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-sysdig
app_uuid: b3e22bb7-8fb1-45d5-ad65-2f63d6a42a79
assets:
  dashboards:
    CDS Activity Audit Overview: assets/dashboards/cds_sysdig_activity_audit_overview.json
    CDS Audit Tap Overview: assets/dashboards/cds_sysdig_audittap_overview.json
    CDS Policy Events Overview: assets/dashboards/cds_sysdig_policy_events_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10366
    source_type_name: crest_data_systems_sysdig
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- almacenes de datos
- rastreo
- kubernetes
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sysdig
integration_id: crest-data-systems-sysdig
integration_title: Sysdig
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sysdig
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: sysdig
  short_description: Tarifa plana mensual para la integración de sysdig.
  unit_price: 1995.0
public_title: Sysdig
short_description: Visualizar datos de Sysdig Syslog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Data Stores
  - Category::Containers
  - Category::Kubernetes
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualizar datos de Sysdig Syslog
  media:
  - caption: 'CDS Sysdig: información general de eventos de política'
    image_url: images/cds_sysdig_policy_events_overview.png
    media_type: imagen
  - caption: 'CDS Sysdig: información general de Audit Tap'
    image_url: images/cds_sysdig_audittap_overview.png
    media_type: imagen
  - caption: 'CDS Sysdig: información general de la auditoría de actividades'
    image_url: images/cds_sysdig_activity_audit_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Sysdig
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->



## Información general

* Sysdig es una plataforma de datos unificada que proporciona una solución potente y completa para la monitorización, seguridad y solución de problemas en entornos en contenedores y nativos en la nube. Monitoriza, asegura y soluciona problemas de hosts, clústeres de Kubernetes y cargas de trabajo.
* Sysdig Secure permite a los equipos proteger las compilaciones, detectar y responder a las amenazas en tiempo de ejecución y gestionar continuamente las configuraciones, los permisos y el cumplimiento de la nube.

Esta integración recopila logs de las **Event Forwarding Data Sources** (Fuentes de datos de reenvío de eventos) enumeradas a continuación:

*  Eventos de política de tiempo de ejecución
*  Auditoría de actividades
*  Toque de auditoría

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][2]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][7]
- Página web: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://docs.sysdig.com/en/docs/sysdig-secure/secure-events/event-forwarding/forwarding-to-syslog/#configure-syslog-event-forwarding
[5]: https://docs.sysdig.com/en/docs/administration/administration-settings/certificates-management/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sysdig.pdf
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sysdig" target="_blank">adquiere esta aplicación en el Marketplace</a>.