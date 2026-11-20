---
algolia:
  subcategory: Marketplace 통합
app_id: statsig-statsig
app_uuid: 289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10188
    source_type_name: Statsig 라이선스
author:
  homepage: https://www.statsig.com
  name: Statsig
  sales_email: serviceadmin@statsig.com
  support_email: support@statsig.com
  vendor_id: statsig
categories:
- 설정 및 배포
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: statsig-statsig
integration_id: statsig-statsig
integration_title: Statsig
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: statsig-statsig
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.statsig.log
  product_id: statsig
  short_description: Statsig 로그 이벤트 1,000건당 단위 요금
  tag: 이벤트
  unit_label: Statsig 로그 이벤트 1,000건
  unit_price: 0.1
public_title: Statsig
short_description: 고객이 선호하는 기능을 더 빠르게 빌드, 측정 및 출시
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 고객이 선호하는 기능을 더 빠르게 빌드, 측정 및 출시하기
  media:
  - caption: Feature Gate를 활용하여 새로운 기능을 안전하게 배포 및 타겟팅
    image_url: images/tile_gates.png
    media_type: image
  - caption: 모든 Feature Gate에 자동 생성되는 Pulse 결과를 통해 해당 기능이 주요 메트릭에 미치는 영향을 관찰하세요.
    image_url: images/tile_pulse.png
    media_type: image
  - caption: Ultrasound를 사용하여 메트릭에 긍정적 또는 부정적 영향을 미치는 기능을 식별하세요.
    image_url: images/tile_ultrasound.png
    media_type: image
  - caption: 기능 배포가  Datadog 프로덕션 스택의 나머지에 어떤 영향을 미치는지 파악하세요.
    image_url: images/tile_datadog_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/
  support: README.md#Support
  title: Statsig
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[Statsig][1]는 기업이 기능을 출시하기 전에 프로덕션 환경에서 안전하게 A/B 테스트를 진행하여 제품 논쟁과 비용이 크게 드는 배포 실수를 방지할 수 있도록 지원합니다. Statsig가 특별한 이유는 이벤트를 로깅하기만 하면 실험이 자동 실행되어 별도의 설정 없이도 모든 신규 기능의 영향을 확인할 수 있다는 점입니다. 다른 플랫폼에서는 실행하려는 모든 실험에 메트릭을 생성하고, 샘플 크기를 계산하고, 사용자를 세분화해야 하기에 기능의 성능을 파악하기 어렵습니다. Statsig는 다릅니다. 이러한 번거로운 작업을 자동화하여 A/B 테스트가 항상 자동 실행되므로 기능의 성능을 언제나 파악할 수 있습니다.

전직 Facebook 엔지니어들로 구성된 팀으로, 수백 명의 팀 사용자가 수천 개의 기능을 정확하게 실행할 수 있는 동일한 인프라를 모든 사용자에게 제공하기 위해 Statsig를 만들었습니다.

Datadog Marketplace에서 해당 제품으로 Statsig 플랫폼을 사용할 수 있습니다. Statsig 기존 고객인 경우 [Datadog Statsig 통합][2]으로 Datadog에 계정을 연결하여 통합을 설정합니다.

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Statsig Metrics" >}}

## 수집한 데이터

### 메트릭

본 통합에서 제공하는 메트릭 목록을 보려면[metadata.csv][3]를 참조하세요.

### 이벤트

Statsig 통합은 Statsig에서 Datadog로 구성 변경 이벤트를 전송합니다. 예를 들어 업데이트되었거나 새로운 기능 게이트나 새로운 통합을 전송합니다.

## 지원

지원 또는 기능 요청은 다음 채널을 통해 Statsig 지원 팀에 문의해 주세요.

- 이메일: [support@statsig.com][4] 
- 지원: [Statsig][5]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Statsig 제품으로 기능 릴리스를 모니터링하세요.][6]

[1]: https://www.statsig.com
[2]: https://app.datadoghq.com/integrations/statsig
[3]: https://console.statsig.com/sign_up
[4]: mailto:support@statsig.com
[5]: https://www.statsig.com/contact
[6]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/statsig-statsig" target="_blank">Marketplace에서 구매하세요</a>.