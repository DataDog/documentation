---
app_id: split
app_uuid: 690989fe-dca5-4394-b38a-86f9770dd470
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: split.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10008
    source_type_name: Split
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Split
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- notifications
- event management
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split/README.md
display_on_public_website: true
draft: false
git_integration_title: split
integration_id: split
integration_title: Split
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: split
public_title: Split
short_description: 엔지니어링 팀과 제품 팀을 위한 기능 실험 플랫폼
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::알림
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 엔지니어링 팀과 제품 팀을 위한 기능 실험 플랫폼
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Split
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Split][1]은 [관리형 출시][2]를 위한 플랫폼으로, 모든 규모의 비즈니스가 고객에게 대상 기능을 제공하는 쉽고 안전한 방법을 제공함으로써 뛰어난 사용자 경험을 제공하는 한편, 위험을 완화할 수 있도록 해줍니다.

Split을 Datadog와 통합하면 다음 이점을 누릴 수 있습니다.

- 이벤트 스트림에서 Split changelogs를 포함하여 컨텍스트의 기능 변경 사항을 확인할 수 있습니다.
- 기능 영향과 애플리케이션 성능 연계
- 심각한 문제 발생 전 이를 방지하세요. Datadog 메트릭 및 알림을 기반으로 선제적으로 기능을 비활성화하세요.

Splite 기능 플래그를 사용해 실제 사용자 모니터링(RUM) 데이터를 강화하여 성능과 행동 변화를 명확히 확인하려면 [Split-RUM 통합 페이지][3]를 참조하세요.

## 설정

- **In Datadog**: API 키( <span class="hidden-api-key">\${api_key}</span>)를 생성합니다.

- **In Split**: **Admin Settings**으로 이동해 **Integrations**을 클릭한 다음 Marketplace로 이동합니다. Datadog 옆에 있는 추가를 클릭합니다.<br/>

![Split Screenshot][4]

- Datadog API 키를 붙여넣고 저장을 클릭합니다.

![Split Screenshot][5]

Split 데이터가 Datadog로 유입됩니다.

### 기능 플래그 추적 통합

[RUM 브라우저 SDK]를 사용하여 기능 플래그 추적을 설정하는 방법에 대한 정보는 [Split-RUM 통합 페이지][3]를 참고하세요.

## 수집한 데이터

### 메트릭

Split 점검은 어떠한 메트릭도 포함하지 않습니다.

### 이벤트

Split listing/de-listing 이벤트를 [Datadog 이벤트 스트림][6]으로 푸시합니다.

### 서비스 점검

Split 점검은 어떠한 서비스 점검도 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://docs.datadoghq.com/ko/integrations/split-rum/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[6]: https://docs.datadoghq.com/ko/events/
[7]: https://docs.datadoghq.com/ko/help/