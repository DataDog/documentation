---
app_id: insightfinder
app_uuid: 144b8c72-b842-4257-9815-93aa63ad2da1
assets:
  dashboards:
    InsightFinder Dashboard: assets/dashboards/ifdashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: insightfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10253
    source_type_name: InsightFinder
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: InsightFinder
  sales_email: support@insightfinder.com
  support_email: support@insightfinder.com
categories:
- 경고
- 자동화
- 인시던트
- 알림
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/insightfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: insightfinder
integration_id: insightfinder
integration_title: InsightFinder
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: insightfinder
public_title: InsightFinder
short_description: InsightFinder로 Datdog에서 데이터를 통합해 분석하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Incidents
  - Category::Notifications
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: InsightFinder로 Datdog에서 데이터를 통합해 분석하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: InsightFinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[InsightFinder][1] AIOps에서는 사용자에게 영향이 있기 전에 시스템 및 애플리케이션 문제를 파악합니다. 사람이 관리할 필요 없는 기계 학습 기술을 이용해 이벤트, 로그, 메트릭, 변경 사항으로부터 배워 이상 징후를 감지하고 인시던트를 예측하고 중단 사태를 해결할 수 있습니다.

이 양방향 통합에서는 발전된 AIOps 기능을 제공합니다. InsightFinder에서 표준 API를 통해 Datadog에서 데이터를 수집하여 비즈니스에 영향이 발생하기 전에 이상 징후가 있는 이벤트를 찾아냅니다. 이 이상 징후 이벤트는 Datadog로 전송되고 팀에게 알려집니다.

## 설정

### 설치

통합을 구성하고 InsightFinder로 데이터를 보내려면 [InsightFinder-Datadog 통합][2]을 참고하세요. Datadog [API 키와 애플리케이션 키][3]가 필요합니다.


## 지원

[Datadog 지원팀][4]이나 [InsightFinder 지원팀][5]에 문의하세요.


[1]: https://insightfinder.com/
[2]: https://insightfinder.com/datadog-integration/
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/ko/help/
[5]: mailto:support@insightfinder.com