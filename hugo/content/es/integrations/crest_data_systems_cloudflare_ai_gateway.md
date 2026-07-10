---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cloudflare-ai-gateway
app_uuid: 0838799d-db9d-414e-b932-85a002445951
assets:
  dashboards:
    Cloudflare AI Gateway: assets/dashboards/crest_data_cloudflare_ai_gateway.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11075719
    source_type_name: crest_data_systems_cloudflare_ai_gateway
  logs:
    source: crest-data-systems-cloudflare-ai-gateway
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- ia/ml
- nube
- marketplace
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cloudflare_ai_gateway
integration_id: crest-data-systems-cloudflare-ai-gateway
integration_title: Cloudflare AI Gateway
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cloudflare_ai_gateway
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cloudflare-ai-gateway
  short_description: Tarifa plana mensual para la integración de Cloudflare AI Gateway.
  unit_price: 45.0
public_title: Cloudflare AI Gateway
short_description: Obtén información sobre el tráfico de Cloudflare AI Gateway.
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
  - Category::Cloud
  - Category::Marketplace
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Obtén información sobre el tráfico de Cloudflare AI Gateway.
  media:
  - caption: Cloudflare AI Gateway
    image_url: images/crest_data_cloudflare_ai_gateway.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudflare AI Gateway
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

AI Gateway de Cloudflare te permite obtener visibilidad y control sobre tus aplicaciones de IA. AI Gateway se sitúa entre tu aplicación y las API de IA a las que esta realiza solicitudes.

Esta integración utiliza Cloudflare AI Gateway como fuente para recopilar datos relacionados con solicitudes a la API de IA, errores, caché y detalles de tokens. Estos puntos de datos pueden ayudar a recopilar información sobre cómo los usuarios utilizan tu aplicación.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][3]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][4]
- Página web: [crestdata.ai][5]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][13]

[1]: https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/
[2]: https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://crestdata.ai/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/agent/?tab=Linux
[11]: https://docs.datadoghq.com/es/account_management/api-app-keys
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Cloudflare_AI_Gateway.pdf
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cloudflare-ai-gateway" target="_blank">adquiere esta aplicación en el Marketplace</a>.