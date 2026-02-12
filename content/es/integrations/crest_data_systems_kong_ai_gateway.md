---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-kong-ai-gateway
app_uuid: e49ae7ee-3c15-4c85-9fc8-63afd32ca547
assets:
  dashboards:
    Kong AI Gateway: assets/dashboards/crest_data_kong_ai_gateway.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11070879
    source_type_name: crest_data_systems_kong_ai_gateway
  logs:
    source: crest-data-systems-kong-ai-gateway
  monitors:
    Total Tokens used exceeds limit: assets/monitors/crest_data_total_tokens_limits_exceeded.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- recopilación de logs
- ia/ml
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_kong_ai_gateway
integration_id: crest-data-systems-kong-ai-gateway
integration_title: Kong AI Gateway
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_kong_ai_gateway
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: kong-ai-gateway
  short_description: Tarifa plana mensual para la integración de Kong AI Gateway.
  unit_price: 45.0
public_title: Gateway de Kong AI
short_description: Visualización de los datos de Kong AI Gateway
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
  - Category::Log Collection
  - Category::AI/ML
  - Category::Marketplace
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Visualización de los datos de Kong AI Gateway
  media:
  - caption: Kong AI Gateway
    image_url: images/crest_data_kong_ai_gateway.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: Kong AI Gateway
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Kong Gateway es la gateway de API de código abierto más fiable del sector. Kong AI Gateway es un potente conjunto de funciones construidas sobre Kong Gateway diseñadas para ayudar a que desarrolladores y organizaciones adopten eficazmente las capacidades de IA de forma rápida y segura.

Esta integración de Kong AI Gateway recopila datos de logs de proxy de IA y proporciona dashboards predefinidos para obtener información sobre métricas L7, como el número de tokens de solicitud y respuesta o los proveedores y modelos LLM utilizados.

## Compatibilidad

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][7]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Mejora tu monitorización de aplicación de IA generativa con integraciones de Datadog Marketplace de Crest Data][12]

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7
[2]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.konghq.com/hub/kong-inc/ai-proxy/configuration/
[4]: https://docs.konghq.com/hub/kong-inc/tcp-log/configuration/
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.crestdata.ai/
[8]: https://docs.datadoghq.com/es/agent/
[9]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Kong_AI_Gateway.pdf
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-kong-ai-gateway" target="_blank">adquiere esta aplicación en el Marketplace</a>.