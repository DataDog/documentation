---
app_id: blink
app_uuid: f2bd43a7-bbc5-4f69-89b7-437afbbff9fd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10316
    source_type_name: Blink
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.blinkops.com/
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
categories:
- 자동화
- cloud
- 인시던트
- 알림
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/blink/README.md
display_on_public_website: true
draft: false
git_integration_title: blink
integration_id: blink
integration_title: Blink
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: blink
public_title: Blink
short_description: Blink는 보안 및 인프라스트럭처를 위한 코드가 필요 없는 자동화 플랫폼입니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - "\b카테고리::클라우드"
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blink는 코드 없이 보안과 인프라스트럭처를 자동화할 수 있는 플랫폼입니다.
  media:
  - caption: 소통형 Blink 워크 플로우를 이용해 Datadog 인시던트를 생성하고 업데이트할 수 있습니다.
    image_url: images/incident.png
    media_type: image
  - caption: Blink 자동화 워크플로우 내에서 활성화된 Datadog 인시던트 전체 목록을 빠르게 참조할 수 있습니다.
    image_url: images/list-incidents.png
    media_type: image
  - caption: Datadog 인시던트에 대응해 자동화된 워크플로우를 생성하고 시작하려면 Blink 통합을 연결하세요./
    image_url: images/connection-creation.png
    media_type: image
  - caption: Datadog에서 인시던트를 생성하는 자동으로 예약된 Blink Automation입니다.
    image_url: images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: support@blinkops.com
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Blink][1]는 자동화된 인시던트 대응, 클라우드 기반 운영 및 보안 운영 워크플로를 지원하는 low-code/no-code (LCNC) 플랫폼입니다. Blink는 수동 작업을 클라우드 네이티브 플랫폼의 보안과 안정성을 기반으로 하는 인터랙티브 자동화로 전환합니다. 모든 스크립트나 티켓은 완전 관리형 자동화가 됩니다.

사용자 인터페이스와 [자동화 라이브러리][2]에는 사전 제작된 Datadog 기반 자동화 및 사용 사례가 함께 제공됩니다. Blink를 사용하면 운영 병목 ​​현상을 줄이면서 더 나은 클라우드 효율성과 더욱 경쟁력 있는 SLA를 달성할 수 있습니다.

이 기본 통합을 통해 다음을 수행할 수 있습니다.

- Datadog 인시던트를 사용하여 이벤트 기반 Blink 자동화를 트리거합니다.
- Blink 내에서 Datadog 인시던트를 자동으로 생성하고 업데이트합니다.
- Blink의 Datadog Events Explorer에서 사건이나 이벤트를 확인합니다.
- Blink 자동화를 사용하여 Datadog 인시던트를 자동으로 강화하고 해결합니다.

Blink에 관한 더 자세한 정보는 [Blink 설명서][3]를 참고하세요.

## 설정

Datadog 워크스페이스를 Blink에 연결하는 방법은 [해당 문서][4]를 참조하세요.

## 삭제

통합을 제거하려면 Blink 워크스페이스에서 해당 Datadog 연결을 삭제하기만 하면 됩니다.

삭제되면 이전 인증 또는 액세스 토큰이 취소됩니다.

## 수집한 데이터

### 이벤트

이 통합은 Blink 내에서 관련 인시던트를 검색하고 업데이트할 수 있는 Datadog에 이벤트와 인시던트를 보냅니다.

### 모니터

Blink에서 Datadog 모니터를 확인하고, 수정하며, 생성할 수 있습니다.

### 메트릭

Blink에는 메트릭이 포함되어 있지 않지만 Blink 자동화에 사용하기 위해 Datadog 환경에서 메트릭을 쿼리하고 나열할 수 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Blink 고객지원][5]에 문의하세요.

[1]: https://www.blinkops.com/
[2]: https://library.blinkops.com/automations?vendors=Datadog
[3]: https://www.docs.blinkops.com/docs/integrations/datadog/actions
[4]: https://www.docs.blinkops.com/docs/integrations/datadog
[5]: mailto:support@blinkops.com