---
algolia:
  subcategory: Marketplace 통합
app_id: blink-blink
app_uuid: eaa3426f-383b-44b4-a7f9-ff9706ed37f8
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10327
    source_type_name: Blink_blink
author:
  homepage: https://blinkops.com
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
  vendor_id: blink-subscription
categories:
- orchestration
- 알림
- 자동화
- cloud
- 보안
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: blink_blink
integration_id: blink-blink
integration_title: Blink
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: blink_blink
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: blink
  short_description: 최대 5,000개 작업 및 사용자 10명
  unit_price: 500
public_title: Blink
short_description: Blink는 코드 없이 보안과 인프라스트럭처를 자동화할 수 있는 플랫폼입니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Orchestration
  - Category::Notifications
  - Category::Automation
  - "\b카테고리::클라우드"
  - 카테고리::보안
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Blink는 코드 없이 보안과 인프라스트럭처를 자동화할 수 있는 플랫폼입니다.
  media:
  - caption: 소통형 Blink 워크 플로우를 이용해 Datadog 인시던트를 생성하고 업데이트할 수 있습니다.
    image_url: images/incident.png
    media_type: image
  - caption: Blink 자동화 워크플로우 내에서 활성화된 Datadog 인시던트 전체 목록을 빠르게 참조할 수 있습니다.
    image_url: images/list-incidents.png
    media_type: image
  - caption: Datadog 인시던트에 대응해 자동화된 워크플로우를 생성하고 시작하려면 Blink 통합을 연결하세요.
    image_url: images/connection-creation.png
    media_type: image
  - caption: 계획된 Blink 자동화 워크플로우를 사용해 일반 이벤트의 Datadog 인시던트를 자동으로 생성할 수 있습니다.
    image_url: images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[Blink][1]는 코드를 최소로 사용하거나 전혀 사용하지 않고도(LNCN) 자동화된 인시던트 대응, 클라우드 네이티브 작업, 보안 작업 워크플로우를 활성화할 수 있는 플랫폼입니다. Blink를 사용하면 안전하고 신뢰할 수 있는 클라우드 네이티브 플랫폼에서 수동 작업을 소통형 자동 워크플로우로 변형할 수 있습니다. 각 스크립트나 티켓을 완전 관리형으로 자동화할 수 있습니다.

Blink의 사용자 인터페이스와 [자동화 라이브러리][2]에는 5,000개의 클라우드 네이티브 워크플로우고 있어 새 자동화 워크플로우를 생성하기가 매우 쉽습니다. Blink를 사용해 작업 병목 현상을 줄이면서 클라우드 효율성을 높이고 SLA의 경쟁성을 확보할 수 있습니다.

[기본 인터페이스][6]를 방문해 다음 내용에 관해 자세히 살펴보세요.

- Datadog 인시던트를 사용해 이벤트 기반 Blink 자동화 트리거
- Blink 내에 Datadog 인시던트를 자동으로 생성하고 업데이트
- Datadog Events Explorer에서 인시던트 도는 이벤트 확인
- Blink 자동화를 사용해 Datadog 인시던트를 자동으로 문제 해결 및 보강

Blink에 관한 더 자세한 정보는 [Blink 설명서][3]를 참고하세요.

## 지원

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://blinkops.com/
[2]: https://library.blinkops.com/
[3]: https://www.docs.blinkops.com/
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://app.datadoghq.com/integrations/blink
[7]: https://app.blinkops.com/signup
[8]: mailto:support@blinkops.com

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/blink-blink" target="_blank">Marketplace에서 구매하세요</a>.