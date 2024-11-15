---
app_id: neoload
app_uuid: 3d16e6da-7ac2-47b4-95c0-0d221686f05a
assets:
  dashboards:
    NeoLoad Performance Testing: assets/dashboards/neoload_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: NeoLoad.Controller.User.Load
      metadata_path: metadata.csv
      prefix: NeoLoad.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10317
    source_type_name: neoload
  logs: {}
author:
  homepage: https://www.tricentis.com/products/performance-testing-neoload
  name: Tricentis
  sales_email: sales@tricentis.com
  support_email: support@tricentis.com
categories:
- 알림
- 테스트
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neoload/README.md
display_on_public_website: true
draft: false
git_integration_title: neoload
integration_id: neoload
integration_title: NeoLoad
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: neoload
public_title: NeoLoad
short_description: NeLoad 성능 테스트 결과 모니터링 및 분석
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: NeLoad 성능 테스트 결과 모니터링 및 분석
  media:
  - caption: NeLoad Performance Testing 대시보드
    image_url: images/neoload-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NeoLoad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Tricentis NeoLoad][1]를 사용하면 API와 마이크로서비스의 크기 조정 성능 테스트를 간편하게 할 수 있을 뿐 아니라 프로토콜과 브라우저 기반 용량을 통해 엔드 투 엔드 애플리케이션 테스트도 할 수 있습니다.

NeoLoad 통합을 사용해 NeoLoad 테스트 성능 메트릭을 추적할 수 있습니다.

- NeoLoad에서 애플리케이션 성능과 로드 테스팅 메트릭을 연결하세요.
- Datadog에서 기본 대시보드 상자나 [Metric Explorer][2]을 사용해 처리량, 오류, 성능과 같은 NeoLoad 메트릭을 분석하고 가시화하세요.

## 설정

### 설정

NeoLoad 구성과 관련한 자세한 지침을 보려면 [NeoLoad 설명서][3]를 참고하세요. NeoLoad 버전 9.1부터는 NeoLoad에 있는 Datadog Connector의 **Push Counters** 구성에서 어떤 메트릭을 전송할지 선택할 수 있습니다.

Datadog에서 NeoLoad 통합을 설치해 기본 NeoLoad 대시보드를 대시보드 목록에 추가하세요.


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "neoload" >}}


### 이벤트

NeoLoad의 모든 성능 테스트 이벤트는 [Datadog Events Explorer][5]로 전송됩니다.
NeoLoad에서 성능 테스트가 시작 및 종료될 때 Datadog API로 이벤트를 전송합니다.
NeoLoad에 있는 Datadog Connector의 **Push Counters** 구성에서 옵션을 설정하세요. NeoLoad 9.1부터 사용할 수 있습니다.

## 트러블슈팅

도움이 필요하시나요? [Datadog 지원팀][6]에 문의하거나 [Tricentis NeoLoad 지원팀][7]에 문의하세요.

[1]: https://www.tricentis.com/products/performance-testing-neoload
[2]: /ko/metrics/explorer
[3]: https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm
[4]: https://github.com/DataDog/integrations-extras/blob/master/neoload/metadata.csv
[5]: https://docs.datadoghq.com/ko/events/
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://support-hub.tricentis.com/