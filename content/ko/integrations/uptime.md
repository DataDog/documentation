---
app_id: uptime
app_uuid: 937f96ea-644f-4903-9f74-cdc5e8b46dd8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: uptime.response_time
      metadata_path: metadata.csv
      prefix: uptime
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10001
    source_type_name: Uptime
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Uptime
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- metrics
- event management
- os & system
- testing
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md
display_on_public_website: true
draft: false
git_integration_title: uptime
integration_id: uptime
integration_title: Uptime.com
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptime
public_title: Uptime.com
short_description: 가동 시간과 성능 모니터링을 간편하게
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::알림
  - Category::Metrics
  - Category::Event Management
  - Category::OS & 시스템
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 가동 시간과 성능 모니터링을 간편하게
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Uptime.com
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Uptime.com은 웹 애플리케이션과 API에 대한 실시간 알림과 상세한 성능 분석을 제공하는 종합 웹사이트 모니터링 서비스입니다.

Uptime.com과 Datadog의 통합은 Uptime.com의 모니터링과 Datadog의 플랫폼을 결합하여 모니터링 기능을 향상시킵니다. 주요 기능은 다음과 같습니다.

- Uptime.com 알림은 Datadog에서 해당 이벤트를 자동으로 생성합니다.
- Datadog 이벤트에는 낮은 우선순위를 할당하고 추적을 위해 주석을 달 수 있습니다.
- Datadog에서 점검 응답 시간을 메트릭으로 추적합니다.
- 메트릭은 1분 간격 점검에서 얻은 5개의 데이터 포인트로 5분마다 업데이트됩니다.

이러한 통합을 통해 성능 문제를 사전에 식별하고 해결하여 가동 중지 시간을 최소화하고 전반적인 사이트 안정성을 개선할 수 있습니다.

![Uptime.com 그래프][1]

## 설정

### 설정

Uptime 계정 내에서 Datadog 통합을 활성화하려면 [Notifications > Integrations][2]로 이동한 다음 새 푸시 알림 프로필을 추가할 때 공급자 유형으로 Datadog을 선택하세요.

다음은 Uptime 계정 내에서 Datadog을 구성할 때 표시되는 필드에 대한 설명입니다:
shell
- Name: Datadog 프로필에 지정할 참조용 이름입니다. Uptime 계정 내에서 여러 공급자 프로필을 구성하는 데 도움이 될 수 있습니다.

- API 키: <span class="hidden-api-key">\${api_key}</span>

- Application Key: <span class="app_key" data-name="uptime"></span>

Datadog 프로필을 구성한 후, _Alerting > Contacts_ 아래에 있는 연락처 그룹에 프로필을 할당하세요. 프로필은 연락처 그룹 내 **Push Notifications** 필드에서 할당됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "uptime" >}}


### 이벤트

Uptime 통합은 알림이 발생하거나 해결될 때  Datadog Event Stream에 이벤트를 보냅니다.

### 서비스 점검

Uptime 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/ko/help/