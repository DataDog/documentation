---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-upguard
app_uuid: e3923c3d-cfbe-4de6-8933-eaa6bc4df7b2
assets:
  dashboards:
    UpGuard: assets/dashboards/crest_data_systems_upguard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.upguard.organization.score_overall
      metadata_path: metadata.csv
      prefix: cds.upguard
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35272816
    source_type_name: crest_data_systems_upguard
  monitors:
    Critical risk detected: assets/monitors/crest_data_systems_critical_risk_detected.json
    Critical vulnerability detected: assets/monitors/crest_data_systems_critical_vulnerability_detected.json
    Domain score dropped below 600: assets/monitors/crest_data_systems_domain_score_dropped_below_600.json
    Exploited vulnerability detected: assets/monitors/crest_data_systems_known_exploited_vulnerability.json
    Identity breach detected: assets/monitors/crest_data_systems_identity_breach_vip_email.json
    Organization's Score dropped below 600: assets/monitors/crest_data_systems_organization_score_dropped_below_600.json
    Vendor score dropped below 600: assets/monitors/crest_data_systems_vendor_score_dropped_below_600.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- network
- recopilación de logs
- métricas
- seguimiento de problemas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_upguard
integration_id: crest-data-systems-upguard
integration_title: UpGuard
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_upguard
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: upguard
  short_description: Tarifa plana mensual.
  unit_price: 195.0
public_title: UpGuard
short_description: Información de UpGuard BreachSight, que ofrece calificaciones de
  seguridad de primera mano.
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
  - Category::Network
  - Category::Log Collection
  - Categoría::Métricas
  - Categoría::Seguimiento de problemas
  - Offering::Integration
  - Submitted Data Type::Logs
  - Tipo de datos enviados::Métricas
  configuration: README.md#Setup
  description: Información de UpGuard BreachSight, que ofrece calificaciones de seguridad
    de primera mano.
  media:
  - caption: 'UpGuard: información general de la organización'
    image_url: images/crest_data_systems_upguard_1.png
    media_type: imagen
  - caption: 'UpGuard: IPs y vulnerabilidades'
    image_url: images/crest_data_systems_upguard_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: UpGuard
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[**UpGuard**][1] es una solución de software que ayuda a las empresas a monitorizar riesgos propios y de terceros. Proporciona detección de vulnerabilidades, clasificaciones de seguridad, detección de infracciones y monitorización de cumplimiento para salvaguardar la infraestructura de TI. Con evaluaciones de riesgo continuas y alertas automatizadas, UpGuard garantiza una mitigación proactiva de las amenazas.

La integración te permite continuamente monitorizar tu postura de seguridad, detectar exposiciones de datos e identificar credenciales filtradas. Utiliza esta integración para recopilar **datos de riesgo de infracción** como métricas y **logs de auditoría** en Datadog.

### Dashboards
Esta integración incluye **un dashboard predefinido**:

1. **UpGuard**: monitoriza y visualiza puntuaciones de seguridad de primera mano, riesgos, dominios, IPs, vulnerabilidades, brechas, typosquatting y resúmenes de proveedores. También contiene una sección de **Notifications** (Notificaciones) que muestra importantes actividades de auditoría.


## Ayuda
Para solicitar asistencia o características, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][10]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][11]
- Página web: [crestdata.ai][12]
- FAQ: [FAQ de integraciones de Datadog Marketplace de Crest Data][3]


[1]: https://www.UpGuard.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/UpGuard.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://cyber-risk.upguard.com/settings/orgApi
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
[12]: https://www.crestdata.ai/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-upguard" target="_blank">adquiere esta aplicación en el Marketplace</a>.