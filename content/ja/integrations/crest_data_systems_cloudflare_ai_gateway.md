---
"algolia":
  "subcategory": Marketplace インテグレーション
"app_id": "crest-data-systems-cloudflare-ai-gateway"
"app_uuid": "0838799d-db9d-414e-b932-85a002445951"
"assets":
  "dashboards":
    "Cloudflare AI Gateway": assets/dashboards/crest_data_cloudflare_ai_gateway.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "11075719"
    "source_type_name": crest_data_systems_cloudflare_ai_gateway
  "logs":
    "source": crest-data-systems-cloudflare-ai-gateway
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- ai/ml
- クラウド
- marketplace
- ログの収集
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_cloudflare_ai_gateway"
"integration_id": "crest-data-systems-cloudflare-ai-gateway"
"integration_title": "Cloudflare AI Gateway"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_cloudflare_ai_gateway"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": cloudflare-ai-gateway
  "short_description": Flat fee per month for Cloudflare AI Gateway integration.
  "unit_price": !!float "45.0"
"public_title": "Cloudflare AI Gateway"
"short_description": "Gain insights into Cloudflare AI Gateway traffic."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::AI/ML"
  - "Category::Cloud"
  - "Category::Marketplace"
  - "Category::Log Collection"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Gain insights into Cloudflare AI Gateway traffic.
  "media":
  - "caption": Cloudflare AI Gateway
    "image_url": images/crest_data_cloudflare_ai_gateway.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cloudflare AI Gateway
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cloudflare's AI Gateway allows you to gain visibility and control over your AI apps. AI Gateway sits between your application and the AI APIs that your application makes requests to.

This integration uses Cloudflare AI Gateway as the source to collect data related to AI API requests, errors, cache, and tokens details. These data points can help you gather insights on how people are using your application.

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][3]
- Sales Email: [datadog-sales@crestdata.ai][4]
- Website: [crestdata.ai][5]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][13]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/
[2]: https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://crestdata.ai/
[6]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/agent/?tab=Linux
[11]: https://docs.datadoghq.com/account_management/api-app-keys
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Cloudflare_AI_Gateway.pdf
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cloudflare-ai-gateway" target="_blank">Click Here</a> to purchase this application.
