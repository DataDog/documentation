---
app_id: embrace-mobile
app_uuid: 86988058-9b89-45a8-b92f-5473a96e4a36
assets:
  dashboards:
    Embrace Overview: assets/dashboards/embrace_mobile_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - embrace.session_total.five_minute
      - embrace.session_total.hourly
      - embrace.session_total.daily
      - embrace.crash_total.five_minute
      - embrace.crash_total.hourly
      - embrace.crash_total.daily
      - embrace.users_total.daily
      metadata_path: metadata.csv
      prefix: embrace.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25653134
    source_type_name: Embrace
author:
  homepage: https://embrace.io
  name: Embrace
  support_email: support@embrace.io
categories:
- 문제 추적
- 메트릭
- 모바일
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/embrace_mobile/README.md
display_on_public_website: true
draft: false
git_integration_title: embrace_mobile
integration_id: embrace-mobile
integration_title: Embrace Mobile
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: embrace_mobile
public_title: Embrace Mobile
short_description: iOS, Android, React Native 및 Unity의 모바일 옵저버빌리티
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::이슈 추적
  - 카테고리::메트릭
  - Category::Mobile
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: iOS, Android, React Native 및 Unity의 모바일 옵저버빌리티
  media:
  - caption: Embrace의 사용자 세션 재생은 시간 기반 시각화로 모든 사용자 세션의 전체 기술 및 동작 세부 정보를 제공합니다. 문제를
      수동으로 재현할 필요 없이 근본 원인을 즉시 식별합니다.
    image_url: images/embrace_session.jpg
    media_type: image
  - caption: 타이밍, 결과 및 사용자 작업을 추적하여 주요 사용자 흐름을 최적화합니다. 느리거나 멈춘 경험에 불만을 품은 사용자가 이탈하는
      지점을 빠르게 파악하고 문제를 해결하여 참여도와 매출을 높일 수 있습니다.
    image_url: images/embrace_app_performance.jpg
    media_type: image
  - caption: 실시간 대시보드로 주요 메트릭을 모니터링하세요. 성능, 안정성, 참여도, 수익 창출 등을 쉽게 추적하여 팀이 관심 있는 데이터에
      집중할 수 있습니다.
    image_url: images/embrace_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Embrace Mobile
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Embrace][1]는 성능 최적화, 문제 우선순위 지정 및 해결, 모니터링(기능, 릴리스,커스텀 세그먼트)에 대해 모바일 팀이 최적의 사용자 경험을 제공할 수 있도록 지원하는 모바일 옵저버빌리티 및 데이터 플랫폼입니다.
Embrace의 핵심은 복잡한 모바일 데이터를 실행 가능한 데이터로 전환하는 것입니다. 모든 사용자 경험에 대한 포괄적인 세션 수준 데이터를 수집함으로써 강력한 인사이트를 제공하고 성장을 촉진합니다.

앱 설치 후 Embrace는 주요 모바일 상태 메트릭을 추적하는 대시보드를 제공합니다. 모든 회귀의 경우 수동으로 재현할 필요 없이 영향을 받는 모든 사용자 세션의 전체 세부 정보를 조사할 수 있습니다.

## 설정

1. 무료 평가판을 시작하고 [Embrace 문서][2]를 참고하세요. **Datadog에서 메트릭을 확인하기 전 먼저 이 문서의 지침을 따라야 합니다.**
1. Embrace 통합 설정을 완료한 후 Datadog으로 다시 이동하여 두 플랫폼을 모두 연결하세요.
1. 크리덴셜로 로그인하여 Embrace 계정을 인증하고 Datadog에 연결하세요.

## 지원

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://docs.datadoghq.com/ko/help/