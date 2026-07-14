---
app_id: gremlin
app_uuid: 451a4863-1767-4c11-8831-d196ae4643d0
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: gremlin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10031
    source_type_name: Gremlin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Gremlin
  sales_email: support@gremlin.com
  support_email: support@gremlin.com
categories:
- 문제 추적
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md
display_on_public_website: true
draft: false
git_integration_title: gremlin
integration_id: gremlin
integration_title: Gremlin
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gremlin
public_title: Gremlin
short_description: Gremlin에서 발생하는 이벤트를 Datadog으로 전송
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Issue Tracking
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Gremlin에서 발생하는 이벤트를 Datadog으로 전송
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/gremlin-datadog/
  support: README.md#Support
  title: Gremlin
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog에서 Gremlin 공격을 직접 확인, 재실행, 중단할 수 있습니다.

Datadog [이벤트][1]와 Gremlin을 페어링하면 Datadog 워크플로우에 테스트 실패 컨텍스트를 효율적으로 추가할 수 있습니다.

- 대시보드 상단에 공격 이벤트를 오버레이하여 Gremlin이 언제 어떻게 메트릭에 영향을 미치는지 정확히 파악할 수 있습니다.
- Datadog [이벤트 스트림]에서 Gremlin 공격을 표시, 재실행, 중지하기[ 2]

![snapshot][3]

## 설정

### 설정

해당 통합을 활성화하려면 Datadog API 키를 Gremlin에 전달해야 합니다. 키를 전달하려면 [통합 페이지][4]에서 **Datadog** 행의 **추가** 버튼을 클릭합니다. **Datadog API 키**를 입력하라는 메시지가 표시됩니다. 입력을 완료하면 통합이 초기화됩니다.

- API 키: <span class="hidden-api-key">\${api_key}</span>

이제 [이벤트 스트림][2]의 통합에서 이벤트를 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

Gremlin 통합은 메트릭을 제공하지 않습니다.

### 이벤트

Gremlin 통합은 Gremlin에서 공격이 시작 또는 중지되면 [Datadog 이벤트 스트림][4]에 이벤트를 전송합니다.

### 서비스 점검

Gremlin 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Gremlin이 Datadog으로 Chaos Engineering 서비스를 모니터링하는 방법][6]

[1]: https://docs.datadoghq.com/ko/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/gremlin-datadog/