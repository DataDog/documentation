---
algolia:
  subcategory: Marketplace 통합
app_id: nerdvision
app_uuid: dace6217-8e5b-4b96-ae65-b0b58d44cc3e
assets:
  dashboards:
    NerdVision Overview: assets/dashboards/overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nerdvision.clients
      metadata_path: metadata.csv
      prefix: nerdvision.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10140
    source_type_name: NerdVision
author:
  homepage: https://nerd.vision
  name: NerdVision
  sales_email: support@nerd.vision
  support_email: support@nerd.vision
  vendor_id: nerdvision
categories:
- 로그 수집
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: nerdvision
integration_id: nerdvision
integration_title: NerdVision
integration_version: ''
is_public: true
kind: 통합
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: nerdvision
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: Datadog.marketplace.nerdvision.clients
  product_id: 클라이언트
  short_description: 디버깅 및 데이터 수집 도구
  tag: 호스트 이름
  unit_label: client
  unit_price: 2
public_title: NerdVision
short_description: NET용 라이브 디버거, 자바(Java), 파이썬(Python) 및 노드
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: NET용 라이브 디버거, 자바(Java), 파이썬(Python) 및 노드
  media:
  - caption: NerdVision의 인터랙티브 디버거입니다.
    image_url: images/debugger.png
    media_type: image
  - caption: NerdVision에서 캡처한 오류 목록입니다.
    image_url: images/error_list.png
    media_type: image
  - caption: Datadog의 NerdVision 대시보드입니다.
    image_url: images/screenshot_datadog.png
    media_type: image
  - caption: NerdVision의 스냅샷 세부 정보입니다.
    image_url: images/snapshot_details.png
    media_type: image
  - caption: NerdVision의 스냅샷 목록입니다.
    image_url: images/snapshot_list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NerdVision
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

### NerdVision이란 무엇인가요?

NerdVision은 언제든지 애플리케이션에 대한 심층적인 인사이트를 수집할 수 있는 라이브 디버깅 플랫폼입니다. NerdVision
을 사용하면 애플리케이션에 트레이스포인트를 설치하여 애플리케이션을 다시 시작하거나 코드를 변경하지 않고도
코드를 변경하지 않고도 데이터를 수집할 수 있습니다.

가입 후 통합에서 대시보드를 생성하고 NerdVision 그룹의 모든 이벤트 및 로그를 Datadog 
조직에 동기화합니다. 

#### 감시자 및 조건문

조건문을 사용하여 트레이스포인트의 트리거를 관심 있는 특정 사례로 좁히세요. 감시자를 추가하여 컨텍스트를 개선하고 
문제에 가장 중요하거나 변수 캡처의 일부가 아닌 데이터를 포함할 수 있습니다.

### NerdVision Datadog 대시보드

Datadog 대시보드 에서는 코드의 어느 부분에서 트레이스포인트가 트리거되는지 확인하는 데 필요한 인사이트를 얻을 수 있습니다. 다음을 수행할 수 있습니다.
디버그 활동의 핫스팟을 식별할 수 있습니다.

### 이벤트

트리거되는 각 트레이스포인트는 Datadog에 이벤트로 전송되며, 여기에는 적절한 태그 링크가 포함되어 있어 NerdVision에서 데이터를 볼 수 있습니다. 
트레이스포인트를 사용하면 트레이스포인트가 트리거된 프레임에서 활성화된 전체 스택과 변수를 
수집할 수 있습니다.

### 로그

동적 로깅을 사용하면 코드의 어느 지점에서나 새 로그 메시지를 삽입하여 누락된 데이터를 추가할 수 있습니다. 트리거되는 각 로그 메시지
가 트리거되면 NerdVision에서 처리되는 즉시 Datadog와 동기화됩니다.

### 메트릭

NerdVision은 온라인 클라이언트 및 트레이스포인트 트리거를 위한 메트릭 를 제작합니다.

### 서비스 점검

NerdVision에는 서비스 점검아 포함되어 있지 않습니다.

## 지원

지원 또는 기능 요청이 필요한 경우 다음 채널을 통해 NerdVision에 문의하세요:

- 이메일: [support@nerd.vision][4]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog 마켓플레이스에서 NerdVision 통합으로 데이터 디버깅을 모니터링하세요][5].
- [NerdVision 설명서][6]

[1]: https://app.nerd.vision
[2]: https://app.nerd.vision/setup
[3]: https://app.nerd.vision
[4]: mailto:support@nerd.vision
[5]: https://www.datadoghq.com/blog/monitor-nerdvision-datadog-marketplace/
[6]: https://docs.nerd.vision/
---
이 애플리케이션은 마켓플레이스를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 이 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/nerdvision" target="_blank">여기를 클릭하세요</a>.