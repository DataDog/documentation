---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-trulens-eval
app_uuid: 91fe78a3-7bd7-41d6-b24f-d41056112644
assets:
  dashboards:
    Trulens Eval - Overview: assets/dashboards/crest_data_trulens_eval_overview.json
    Trulens Eval - Troubleshooting: assets/dashboards/crest_data_trulens_eval_troubleshooting.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12043594
    source_type_name: crest_data_systems_trulens_eval
  logs:
    source: crest-data-systems-trulens-eval
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- ia/ml
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_trulens_eval
integration_id: crest-data-systems-trulens-eval
integration_title: TruLens Eval
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_trulens_eval
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: trulens-eval
  short_description: Tarifa plana mensual para la integración de Trulens Eval.
  unit_price: 45.0
public_title: TruLens Eval
short_description: Monitorización y profundización en los experimentos de aplicación
  del LLM
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
  - Category::AI/ML
  - Offering::Integration
  - Category::Log Collection
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorización y profundización en los experimentos de aplicación del
    LLM
  media:
  - caption: 'TruLens Eval: información general'
    image_url: images/crest_data_trulens_eval_overview.png
    media_type: imagen
  - caption: 'TruLens Eval: solucionar problemas'
    image_url: images/crest_data_trulens_eval_troubleshooting.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: TruLens Eval
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

TruLens Eval es un software que te ayuda a medir objetivamente la calidad y eficacia de tus aplicaciones basadas en LLM utilizando las funciones de retroalimentación. Las funciones de retroalimentación ayudan a evaluar mediante programación la calidad de las entradas, salidas y resultados intermedios, de forma que puedas agilizar y escalar la evaluación de un experimento.

Esta integración de TruLens Eval te permite:
* Obtener datos de una base de datos SQLAlchemy compatible y enviar registros y comentarios a Datadog
* Visualizar el rendimiento de la aplicación de LLM en los dashboards incluidos para tomar medidas como comparar el rendimiento de varias aplicaciones de LLM, el coste, etc.

## Compatibilidad

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][10]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][9]
- Página web: [crestdata.ai][4]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][8]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Mejora tu monitorización de aplicación de IA generativa con integraciones de Datadog Marketplace de Crest Data][11]


[1]: https://docs.datadoghq.com/es/agent/guide/
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.crestdata.ai/
[5]: https://docs.crestdata.ai/datadog-integrations-readme/TruLens_Eval.pdf
[6]: https://docs.datadoghq.com/es/agent/?tab=Linux
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog-sales@crestdata.ai
[10]: mailto:datadog.integrations@crestdata.ai
[11]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-trulens-eval" target="_blank">adquiere esta aplicación en el Marketplace</a>.