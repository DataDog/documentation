---
algolia:
  subcategory: Marketplace 통합
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
- ai/ml
- 클라우드
- marketplace
- log collection
custom_kind: integration
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
  short_description: Cloudflare AI Gateway 통합에 대한 월 정액 요금입니다.
  unit_price: 45.0
public_title: Cloudflare AI Gateway
short_description: Cloudflare AI Gateway 트래픽에 대한 인사이트를 확보하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Category::AI/ML
  - 카테고리::클라우드
  - Category::Marketplace
  - 카테고리::로그 수집
  - 제공::통합
  - 제출한 데이터 유형::로그
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Cloudflare AI Gateway 트래픽에 대한 인사이트를 확보하세요.
  media:
  - caption: Cloudflare AI Gateway
    image_url: images/crest_data_cloudflare_ai_gateway.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudflare AI Gateway
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Cloudflare의 AI Gateway를 사용하면 AI 앱에 대한 가시성을 확보하고 제어할 수 있습니다. AI 게이트웨이는 애플리케이션과 애플리케이션이 요청하는 AI API 사이에 위치합니다.

이 통합은 Cloudflare AI Gateway를 소스로 사용하여 AI API 요청, 오류, 캐시 및 토큰 세부 정보와 관련된 데이터를 수집합니다. 이러한 데이터 포인트를 통해 사용자들의 애플리케이션 사용 방식에 대한 인사이트를 얻을 수 있습니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][3]
- 세일즈: [datadog-sales@crestdata.ai][4]
- 웹사이트: [crestdata.ai][5]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][13]

[1]: https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/
[2]: https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://crestdata.ai/
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ko/account_management/api-app-keys
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Cloudflare_AI_Gateway.pdf
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cloudflare-ai-gateway" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.