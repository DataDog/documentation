---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-togetherai
app_uuid: b7a02f76-1a8c-42bd-8f1f-99c33f26803d
assets:
  dashboards:
    TogetherAI Overview: assets/dashboards/crest_data_togetherai_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18080733
    source_type_name: crest_data_systems_togetherai
  logs:
    source: crest-data-systems-togetherai
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- ia/ml
- marketplace
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_togetherai
integration_id: crest-data-systems-togetherai
integration_title: TogetherAI
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_togetherai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: togetherai
  short_description: Tarifa plana mensual para la integración de TogetherAI.
  unit_price: 95.0
public_title: TogetherAI
short_description: Obtén información sobre los trabajos de ajuste de TogetherAI, los
  eventos de trabajo y los archivos.
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
  - Category::AI/ML
  - Category::Marketplace
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los trabajos de ajuste de TogetherAI, los eventos
    de trabajo y los archivos.
  media:
  - caption: 'TogetherAI: información general del ajuste'
    image_url: images/cds_togetherai_finetuning_overview.png
    media_type: imagen
  - caption: 'TogetherAI: detalles del ajuste'
    image_url: images/cds_togetherai_finetuning_details.png
    media_type: imagen
  - caption: 'TogetherAI: archivos'
    image_url: images/cds_togetherai_files.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: TogetherAI
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[TogetherAI][1] es una plataforma basada en la nube diseñada específicamente para apoyar el desarrollo y despliegue de modelos de IA generativa de código abierto. Proporciona una sólida infraestructura que facilita la creación, el entrenamiento y la gestión de varios modelos de IA, permitiendo a los desarrolladores crear sofisticadas soluciones de IA con facilidad. Para facilitar el acceso a sus servicios, TogetherAI proporciona un conjunto de APIs que permiten a los desarrolladores integrar capacidades de IA en sus aplicaciones sin problemas.

Utilizando la API de TogetherAI, esta integración puede acceder y recuperar sin problemas la información esencial necesaria para el ajuste de los modelos de IA. Esto incluye datos sobre el trabajo de ajuste, los eventos de trabajo y los archivos. 


## Compatibilidad

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][3]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][4]
- Página web: [crestdata.ai][5]
- FAQs: [Crest Data Datadog Marketplace Integrations FAQ][13]



[1]: https://www.together.ai/
[2]: https://docs.together.ai/reference/authentication-1
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://www.crestdata.ai/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.datadoghq.com/es/account_management/api-app-keys
[12]: https://www.crestdatasys.com/datadog-integrations-readme/TogetherAI.pdf
[13]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[14]: https://docs.datadoghq.com/es/help/
[15]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-togetherai" target="_blank">adquiere esta aplicación en el Marketplace</a>.