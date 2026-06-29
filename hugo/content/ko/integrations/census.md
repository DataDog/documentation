---
app_id: census
app_uuid: 7f4f3919-5b0a-4b4b-93e5-7f0c035f3887
assets:
  dashboards:
    Census Overview: assets/대시보드/census_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - census.syncs.rows_processed
      - census.syncs.sync_completed
      metadata_path: metadata.csv
      prefix: census
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10336
    source_type_name: Census
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.getcensus.com/
  name: Census
  sales_email: sales@getcensus.com
  support_email: support@getcensus.com
categories:
- 자동화
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/census/README.md
display_on_public_website: true
draft: false
git_integration_title: census
integration_id: census
integration_title: Census
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: census
public_title: Census
short_description: Census 동기화 메트릭 및 이벤트를 Datadog에 전송하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Offering::Integration
  - Submitted Data Type::Events
  - 제출한 데이터 유형::메트릭
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Census 동기화 메트릭 및 이벤트를 Datadog에 전송하세요.
  media:
  - caption: Census 동기화 개요 - 대시보드
    image_url: images/census_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Census
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Census][1]는 리버스 ETL 플랫폼으로 데이터 웨어하우스를 마케팅 및 비즈니스 운영 허브로 전환하여 신뢰할 수 있는 실행 가능한 데이터를 팀에 제공합니다. 데이터 웨어하우스와 같은 데이터 소스에서 CRM, 광고 플랫폼 또는 기타 SaaS 앱과 같은 작업 시스템으로 데이터를 동기화하여 데이터를 운영할 수 있습니다.

Census는 Datadog와 통합되어 개발자가 Census 워크플로우를 모니터링하고 성공 및 실패한 동기화 횟수를 추적할 수 있도록 합니다. 이 통합은 [메트릭](#메트릭) 및 이벤트를 Census에서 Datadog로 전송합니다.

## 필수 요건

이 통합을 활성화하려면 Census Platform 티어(또는 그 이상)를 구독해야 합니다.

## 설정

1. [Census 계정][2]에 로그인합니다.
2. Datadog 계정에 연결하려는 Census 워크스페이스로 이동합니다.
3. 워크스페이스 설정 탭으로 이동한 다음 Datadog 타일에서 **설정**을 클릭합니다.
4. **연결**을 클릭하여 OAuth2를 통해 Datadog 계정에 연결합니다.
5. Datadog로 돌아가서 바로 사용할 수 있는 Census 대시보드를 엽니다.

### 검증

Census 워크스페이스에서 동기화를 실행하고 Datadog 계정에 있는 Census 대시보드에서 해당되는 메트릭과 이벤트를 확인합니다. 동기화를 위한 이벤트 및 메트릭이 동기화 완료 후 Datadog에 전송되기까지는 최대 2분이 소요될 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "census" >}}


### 서비스 점검

Census에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

이 통합은 동기화 완료 이벤트를 Datadog에 전송합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://www.getcensus.com/
[2]: https://app.getcensus.com/
[3]: https://github.com/DataDog/integrations-extras/blob/master/census/metadata.csv
[4]: https://docs.datadoghq.com/ko/help/