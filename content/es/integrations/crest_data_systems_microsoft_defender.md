---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-microsoft-defender
app_uuid: 137062cb-83a8-4c46-83e6-7a84efa859ef
assets:
  dashboards:
    CDS Microsoft 365 Defender - Alerts: assets/dashboards/cds_ms_365_defender_alerts_overview.json
    CDS Microsoft 365 Defender - Cloud App Events: assets/dashboards/cds_ms_365_defender_cloudapp.json
    CDS Microsoft 365 Defender - Email Events: assets/dashboards/cds_ms_365_defender_emails.json
    CDS Microsoft 365 Defender - Endpoint Software: assets/dashboards/cds_ms_365_defender_software_overview.json
    CDS Microsoft 365 Defender - Endpoint Threats and Vulnerabilities: assets/dashboards/cds_ms_365_defender_threats_and_vulnerabilities_overview.json
    CDS Microsoft 365 Defender - Endpoints: assets/dashboards/cds_ms_365_defender_endpoints.json
    CDS Microsoft 365 Defender - Identity: assets/dashboards/cds_ms_365_defender_identities.json
    CDS Microsoft 365 Defender - Incidents: assets/dashboards/cds_ms_365_defender_incidents_overview.json
    CDS Microsoft 365 Defender - Investigations: assets/dashboards/cds_ms_365_defender_investigations.json
    CDS Microsoft 365 Defender - Overview: assets/dashboards/cds_ms_365_defender_overview.json
    CDS Microsoft 365 Defender - Secure Score Control Profile: assets/dashboards/cds_ms_365_defender_securescore_controlprofile.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - cds.ms.defender.endpoint.organization_exposure_level
      - cds.ms.365.defender.organization_exposure_level
      metadata_path: metadata.csv
      prefix: cds.ms.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10263
    source_type_name: crest_data_systems_microsoft_defender
  monitors:
    Missing KBs of Endpoint: assets/monitors/cds_missing_kbs_of_endpoint.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- incidentes
- marketplace
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_microsoft_defender
integration_id: crest-data-systems-microsoft-defender
integration_title: Microsoft 365 Defender
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_microsoft_defender
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.microsoft_defender
  product_id: microsoft-defender
  short_description: El costo especificado es por endpoint/usuario activo al mes.
  tag: cds_ms_defender_endpoint_active_endpoint
  unit_label: Endpoint/usuario activo de Microsoft 365 Defender
  unit_price: 1.0
public_title: Microsoft 365 Defender
short_description: Proporciona detalles sobre endpoints, vulnerabilidades, alertas
  e incidentes
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Proporciona detalles sobre endpoints, vulnerabilidades, alertas e incidentes
  media:
  - caption: CDS Microsoft 365 Defender - Endpoints
    image_url: images/cds_ms_365_defender_endpoints.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender- Endpoint de software
    image_url: images/cds_ms_365_defender_software.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Amenazas y vulnerabilidades para endpoints
    image_url: images/cds_ms_365_defender_vulnerability.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Alertas
    image_url: images/cds_ms_365_defender_alerts.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Incidentes
    image_url: images/cds_ms_365_defender_incidents.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Eventos de correo electrónico
    image_url: images/cds_ms_365_defender_emails.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Eventos de aplicaciones en la nube
    image_url: images/cds_ms_365_defender_cloudapp.png
    media_type: imagen
  - caption: CDS Microsoft 365 Defender - Identidad
    image_url: images/cds_ms_365_defender_identity.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft 365 Defender
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Microsoft 365 Defender es una serie de defensa empresarial unificada pre y post brecha que coordina de forma nativa la detección, prevención, investigación y respuesta en todos los endpoints, identidades, correo electrónico y aplicaciones para proporcionar protección integrada contra ataques sofisticados.

Esta integración recopila datos de logs de alertas, incidentes, endpoints, identidades, correo electrónico, puntuaciones de seguridad, perfiles de control de puntuaciones seguras, software, vulnerabilidades e investigaciones de Microsoft 365 Defender.

## Asistencia técnica

Para solicitar asistencia técnica o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia técnica: [datadog.integrations@crestdata.ai][9]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][4]
- FAQ: [FAQ de Integraciones de marketplace de Crest Data y Datadog][2]

[1]: https://docs.crestdata.ai/datadog-integrations-readme/Microsoft_365_defender.pdf
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[3]: https://docs.datadoghq.com/es/agent/?tab=Linux
[4]: https://www.crestdata.ai/microsoft-365-defender-integration/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://docs.crestdata.ai/datadog-integrations-readme/datadog_ms_defender_365_script.pdf
[12]: https://github.com/crestdatasystems/datadog-crest_data_microsoft_defender/blob/master/azure_app_registrator.py
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-microsoft-defender" target="_blank">adquiere esta aplicación en el Marketplace</a>.