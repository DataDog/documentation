---
app_id: botprise
app_uuid: 91806afb-9bd7-4ab2-91e4-7c7f2d05780f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: botprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10113
    source_type_name: botprise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Botprise
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- events
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md
display_on_public_website: true
draft: false
git_integration_title: botprise
integration_id: botprise
integration_title: Botprise
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: botprise
public_title: Botprise
short_description: Botprise 통합으로 생성된 이벤트를 모니터링하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 생성된 이벤트를 모니터링할 수 있는 Botprise 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Botprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Botprise와 Datadog 통합으로 웹훅을 사용해 생성된 [Botprise][1] 이벤트를 Datadog으로 전송할 수 있습니다. 애플리케이션을 모니터링하고 Botprise가 정상적으로 작동하도록 도와줍니다.

![image-datadog-botprise-events][2]

## 설정

Botprise-Datadog 통합을 사용하려면 Botprise를 사용하는 고객이어야 합니다. Botprise와 관련한 자세한 정보는 [https://www.botprise.com/][1]를 참고하세요.

### 설치


### 설정
1. 랩 디바이스에 Datadog 에이전트를 설치하세요.
2. 설치를 완료하면 디바이스가 데이터를 Datadog로 전송하기 시작합니다. [Datadog 호스트 목록][3]에서 데이터를 확인할 수 있습니다.
3. Datadog에서 각 호스트별로 모니터를 생성하세요. Datadog는 모니터 규칙에 기반해 알림을 생성합니다.
4. 각 모니터별로 [메트릭][4]과 임계값을 구성하세요.
5. 수신 알림별로 [ServiceNow][5] 티켓을 생성하도록 모니터 구성을 수정하세요.
6. Datadog Rest API를 호출할 수 있도록 [API 키와 Application Key]를 생성하세요.


## 수집한 데이터

### 메트릭

Botprise 통합은 메트릭을 제공하지 않습니다.

### 서비스 검사

Botprise 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

모든 이벤트는 Datadog 이벤트 스트림으로 전송됩니다.

### 설정
Datadog API를 사용하려면 [API 키와 애플리케이션 키][6]를 입력해야 합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/ko/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/ko/help/