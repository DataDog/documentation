---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-rapid7
app_uuid: 388017a0-e4cc-45ad-b038-c2141abf20c1
assets:
  dashboards:
    RapDev rapid7 Investigations: assets/dashboards/rapdev_rapid7_investigations.json
    RapDev rapid7 Overview: assets/dashboards/rapdev_rapid7_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.rapid7.logs.processed
      metadata_path: metadata.csv
      prefix: rapdev.rapid7.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10191
    source_type_name: RapDev Rapid7
  logs:
    source: rapid7
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 로그 수집
- marketplace
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_rapid7
integration_id: rapdev-rapid7
integration_title: Rapid7
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_rapid7
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: rapid7
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 500
public_title: Rapid7
short_description: Rapid7 로그 및 조사 활동 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Rapid7 로그 및 조사 활동 모니터링
  media:
  - caption: 조사
    image_url: images/R7_investigations_dash_redacted.png
    media_type: image
  - caption: 상위 레벨 상태
    image_url: images/rapdev_rapid7_dashboard_.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rapid7
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
본 통합은 현재 열려 있거나 최근 종료된 Rapid7 조사의 상태를 추적합니다. 이 통합은 이벤트가 열리거나 종료될 때 이벤트 스트림에 게시되며, 조사 ID를 중심으로 이벤트를 집계합니다.

점검의 로그 부분(활성화된 경우)은 Rapid7 REST API를 사용하여 IDR 로그 스트림을 쿼리합니다. 본 통합은 Rapid7 플랫폼 레벨 로그로 간주되지 않는 모든 로그를 반환합니다. 해당 로그는 Datadog으로 제출됩니다. **참고:** 해당 로그를 제출하면 [Datadog 로그 관리 요금 스트럭처](https://www.datadoghq.com/pricing/?product=log-management#log-management)에 따라 Datadog 요금 플랜에 기반하여 추가 요금이 부과될 수도 있습니다. 이러한 로그는 보통 Rapid7 엔드포인트 에이전트 요약과 해당 시점의 프로세스 상태로 구성됩니다. 

### 대시보드
1. 이 통합에는 Rapid 7 조사를 요약해 보여주는 기본 대시보드가 제공됩니다.
2. 이 통합에는 로그 기반 대시보드 예제도 포함되어 있습니다. 해당 대시보드는 통합을 설치하면 사용할 수 있지만, 데이터 플로를 보려면 R7 로그 소스에 대한 패싯을 생성해야 합니다.

### 이벤트
본 통합은 신규 개시/종료 조사에 대한 Datadog 이벤트를 생성합니다. 본 통합은 ID를 기반으로 조사의 상태를 추적하고 함께 생성된 개시 및 종료 이벤트를 집계합니다.

### 메트릭
점검당 처리된 로그 카운트는 메트릭으로 보고됩니다.

### 로그 수집
로그 수집은 옵션이며 기본적으로 비활성화되어 있습니다.
본 통합은 Rapid7 로그 API를 호출하여 마지막 시간 간격에서 사용할 수 있는 모든 로그를 쿼리합니다. 기본 시간 간격은 마지막 1분입니다.
Rapid7 insightIDR [로그 검색 문서][5]에 자세히 설명된 대로 특정 [로그 세트][4]를 지정하여 해당 로그만 가져올 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원 팀: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[5]: https://docs.rapid7.com/insightidr/log-search/

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-rapid7" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.