---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-dataminr
app_uuid: 67cf1858-6c79-4c78-82a6-2971c750197e
assets:
  dashboards:
    'Dataminr : Alerts': assets/dashboards/crest_data_systems_dataminr_alerts.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: ''
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 29480493
    source_type_name: crest_data_systems_dataminr
  logs:
    source: crest_data_systems_dataminr
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- network
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dataminr
integration_id: crest-data-systems-dataminr
integration_title: Dataminr
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dataminr
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: dataminr
  short_description: Tarifa plana mensual para la integración de Dataminr.
  unit_price: 195.0
public_title: Dataminr
short_description: Monitorizar las alertas de Dataminr
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorizar las alertas de Dataminr
  media:
  - caption: 'Dataminr: alertas'
    image_url: images/crest_data_systems_dataminr_alerts.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Dataminr
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Dataminr es una plataforma de datos y análisis en tiempo real que utiliza algoritmos de machine learning para monitorizar y analizar grandes cantidades de fuentes de datos disponibles públicamente, como redes sociales, noticias y blogs, con el fin de identificar información crítica eventos emergentes.

Esta integración proporciona un flujo de trabajo racionalizado para la monitorización de alertas de alta prioridad y mejora su toma de decisiones operativas, lo que en última instancia conduce a una gestión más proactiva e informada de los riesgos y oportunidades.

La integración de Dataminr y Datadog permite recopilar y visualizar los datos de alertas de Dataminr como logs en Datadog.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai][5]
- Ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ de integraciones de Datadog Marketplace de Crest Data][10]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Dataminr.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dataminr" target="_blank">adquiere esta aplicación en el Marketplace</a>.