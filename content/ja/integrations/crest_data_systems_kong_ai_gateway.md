---
algolia:
  subcategory: Marketplace インテグレーション
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
- ログの収集
- ai/ml
- marketplace
custom_kind: インテグレーション
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
  short_description: Flat fee per month for Kong AI Gateway integration.
  unit_price: 45.0
public_title: Kong AI Gateway
short_description: Visualize Kong AI Gateway data
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
  description: Visualize Kong AI Gateway data
  media:
  - caption: Kong AI Gateway
    image_url: images/crest_data_kong_ai_gateway.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Kong AI Gateway
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Kong Gateway is the industry's most trusted open source API gateway. Kong AI Gateway is a powerful set of features built on top of Kong Gateway designed to help developers and organizations effectively adopt AI capabilities quickly and securely.

This Kong AI Gateway Integration collects data from AI proxy logs and provides OOTB dashboards to gain insights into L7 metrics, such as the number of request and response tokens or the LLM providers and models used.

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][5]
- Sales Email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][7]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][11]

[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7
[2]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.konghq.com/hub/kong-inc/ai-proxy/configuration/
[4]: https://docs.konghq.com/hub/kong-inc/tcp-log/configuration/
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.crestdata.ai/
[8]: https://docs.datadoghq.com/ja/agent/
[9]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Kong_AI_Gateway.pdf
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-kong-ai-gateway" target="_blank">Click Here</a> to purchase this application.