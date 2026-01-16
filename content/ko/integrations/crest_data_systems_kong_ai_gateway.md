---
algolia:
  subcategory: Marketplace 통합
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
- log collection
- ai/ml
- marketplace
custom_kind: integration
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
  short_description: Kong AI Gateway 통합 월별 정액 요금입니다.
  unit_price: 45.0
public_title: Kong AI Gateway
short_description: Kong AI Gateway 데이터 시각화
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
  - 카테고리::로그 수집
  - Category::AI/ML
  - Category::Marketplace
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Kong AI Gateway 데이터 시각화
  media:
  - caption: Kong AI Gateway
    image_url: images/crest_data_kong_ai_gateway.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: Kong AI Gateway
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Kong Gateway는 업계에서 가장 신뢰받는 오픈 소스 API 게이트웨이입니다. Kong AI Gateway는 Kong Gateway를 기반으로 구축된 강력한 기능 모음으로, 개발자와 조직이 AI 기능을 빠르고 안전하게 효과적으로 도입할 수 있도록 설계되었습니다.

Kong AI Gateway 통합은 AI 프록시 로그에서 데이터를 수집하고 OOTB 대시보드를 통해 요청 및 응답 토큰 수나 사용된 LLM 공급자 및 모델과 같은 L7 메트릭에 관한 인사이트를 제공합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][5]
- 세일즈: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][7]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][11]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Crest Data의 Datadog Marketplace 통합으로 GenAI 애플리케이션 모니터링 강화][12]

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7
[2]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.konghq.com/hub/kong-inc/ai-proxy/configuration/
[4]: https://docs.konghq.com/hub/kong-inc/tcp-log/configuration/
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.crestdata.ai/
[8]: https://docs.datadoghq.com/ko/agent/
[9]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Kong_AI_Gateway.pdf
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-kong-ai-gateway" target="_blank">Marketplace에서 구매하세요</a>.