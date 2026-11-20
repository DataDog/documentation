---
algolia:
  subcategory: Marketplace 통합
app_id: continuous-ai-netsuite
app_uuid: e458cb71-5229-4385-bfb1-0089221ff276
assets:
  dashboards:
    Netsuite Continuous AI Overview: assets/dashboards/netsuite_continuous_ai_overview.json
    Netsuite System, Script, Audit Logs: assets/dashboards/netsuite_continuous_ai_suiteql.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26840441
    source_type_name: Continuous AI NetSuite
author:
  homepage: https://www.continuous-ai.com
  name: Continuous AI
  sales_email: sales@continuous-ai.com
  support_email: support@continuous-ai.com
  vendor_id: continuous-ai
categories:
- 로그 수집
- marketplace
- cost management
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: continuous_ai_netsuite
integration_id: continuous-ai-netsuite
integration_title: NetSuite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/continuous_ai_netsuite_eula.pdf
manifest_version: 2.0.0
name: continuous_ai_netsuite
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: netsuite
  short_description: NetSuite 로그 데이터의 양과 관계없이 정액 구독료가 부과됩니다.
  unit_price: 299
public_title: NetSuite
short_description: NetSuite SuiteScript 성능 및 로그 수집 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Category::Cost Management
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: NetSuite SuiteScript 성능 및 로그 수집 모니터링
  media:
  - caption: NetSuite 개요 대시보드
    image_url: images/dashboard_overview.png
    media_type: 이미지
  - caption: NetSuite 개요 대시보드 - 성능 분석
    image_url: images/dashboard_perf.png
    media_type: 이미지
  - caption: NetSuite 개요 대시보드 - 스크립트 추적
    image_url: images/dashboard_exec.png
    media_type: 이미지
  - caption: NetSuite 개요 대시보드 - 원시 로그
    image_url: images/dashboard_raw.png
    media_type: 이미지
  - caption: NetSuite 시스템 로그
    image_url: images/dashboard_suiteql1.png
    media_type: 이미지
  - caption: NetSuite 시스템 로그 상세 정보
    image_url: images/dashboard_suiteql2.png
    media_type: 이미지
  - caption: NetSuite 로그인 감사 및 스크립트 로그
    image_url: images/dashboard_suiteql3.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: NetSuite
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

NetSuite는 기업에 재무 관리, 고객 관계 관리, 전자상거래를 위한 통합 플랫폼을 제공하는 클라우드 기반 ERP 소프트웨어 제품군입니다. 본 통합은 NetSuite에서 다음과 같은 표준 및 커스텀 기능에 관한 메트릭과 로그를 수집하고 보고합니다.

+ 표준 및 커스텀 SuiteScripts
+ Suitelets 및 Restlets
+ 스크립트 로그
+ 성능 및 스크립트 실행 시간
+ 오류 및 호환성 변경 사항
+ 사용자 활동

Datadog이 해당 텔레메트리 데이터를 추적하면 NetSuite 스크립트 실행에서 문제를 발견하고 성능을 추적하는 데 도움이 됩니다.

### 대시보드

본 통합은 즉시 사용할 수 있는 **Continuous AI NetSuite 대시보드**를 제공합니다. 해당 대시보드에는 시간이 지남에 따라 Datadog에 제출된 NetSuite 데이터가 표시되며, 특정 NetSuite 계정, 자회사 또는 부서로 검색 범위를 좁힐 수 있는 환경 변수가 포함되어 있습니다.

## 지원

지원이나 기능 요청이 있으시면 다음 채널을 통해 Continuous AI에 문의하세요.

- 고객지원: [support@continuous-ai.com][2]
- 영업: [sales@continuous-ai.com][4]

### 필수 조건

논의하고 싶은 구체적인 요구 사항이 있으신가요? 저희가 도와드리겠습니다! [sales@continuous-ai.com][4]로 문의하세요.

---

고객의 옵저버빌리티를 중요하게 생각합니다. Continuous AI.

[1]: https://docs.datadoghq.com/ko/getting_started/agent/
[2]: mailto:support@continuous-ai.com 
[3]: https://system.netsuite.com/pages/customerlogin.jsp?country=US
[4]: mailto:sales@continuous-ai.com
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/continuous-ai-netsuite" target="_blank">Marketplace에서 구매하세요</a>.