---
algolia:
  subcategory: Marketplace 통합
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
- ai/ml
- log collection
custom_kind: integration
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
  short_description: Trulens Eval 통합 월별 정액 요금입니다.
  unit_price: 45.0
public_title: TruLens Eval
short_description: LLM 애플리케이션 실험을 모니터링하고 인사이트를 얻으세요
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
  - Category::Marketplace
  - Category::AI/ML
  - 제공::통합
  - 카테고리::로그 수집
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: LLM 애플리케이션 실험을 모니터링하고 인사이트를 얻으세요
  media:
  - caption: TruLens Eval - Overview
    image_url: images/crest_data_trulens_eval_overview.png
    media_type: image
  - caption: TruLens Eval - Troubleshooting
    image_url: images/crest_data_trulens_eval_troubleshooting.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: TruLens Eval
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

TruLens Eval은 피드백 함수를 사용하여 LLM 기반 애플리케이션의 품질과 효과를 객관적으로 측정할 수 있도록 지원하는 소프트웨어입니다. 피드백 함수는 입력, 출력 및 중간 결과의 품질을 프로그래밍 방식으로 평가하여 실험 평가를 신속하게 진행하고 확장할 수 있도록 지원합니다.

TruLens Eval 통합을 통해 다음을 할 수 있습니다.
* SQLAlchemy 호환 데이터베이스에서 데이터를 가져오고 Datadog에 레코드와 피드백을 전송합니다.
* 포함된 대시보드에서 LLM 애플리케이션 성능을 시각화하여 여러 LLM 애플리케이션 성능, 비용 등을 비교하는 등의 작업을 합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 이메일 지원: [datadog.integrations@crestdata.ai][10]
- 영업 이메일: [datadog-sales@crestdata.ai][9]
- 웹사이트: [crestdata.ai][4]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][8]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Crest Data의 Datadog Marketplace 통합으로 GenAI 애플리케이션 모니터링 강화][11]


[1]: https://docs.datadoghq.com/ko/agent/guide/
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.crestdata.ai/
[5]: https://docs.crestdata.ai/datadog-integrations-readme/TruLens_Eval.pdf
[6]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog-sales@crestdata.ai
[10]: mailto:datadog.integrations@crestdata.ai
[11]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-trulens-eval" target="_blank">Marketplace에서 구매하세요</a>.