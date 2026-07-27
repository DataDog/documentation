---
algolia:
  subcategory: Marketplace 통합
app_id: superwise-license
app_uuid: f15082a6-d0ed-4f6f-a315-f7cbcaae6823
assets: {}
author:
  homepage: https://www.superwise.ai
  name: Superwise
  sales_email: sales@superwise.ai
  support_email: support@superwise.ai
  vendor_id: superwise
categories:
- 인시던트
- marketplace
- 알림
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: superwise_license
integration_id: superwise-license
integration_title: Superwise 모델 옵저버빌리티
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: superwise_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.superwise
  product_id: license
  short_description: 모델당 월 단위로 과금되며, 규모가 커질수록 가격이 낮아집니다.
  tag: models
  unit_label: 모니터링 대상 모델
  unit_price: 199.0
public_title: Superwise 모델 옵저버빌리티
short_description: 셀프 서비스 ML 옵저버빌리티 및 모니터링 SaaS 플랫폼.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 셀프 서비스 ML 옵저버빌리티 및 모니터링 SaaS 플랫폼.
  media:
  - caption: Superwise는 ML 엔지니어링 팀이 프로덕션 환경에서 모델 상태를 모니터링하고, 탐지 및 해결 시간을 단축하도록 도와줍니다.
    image_url: images/1_4.png
    media_type: image
  - caption: Superwise 모델 옵저버빌리티 대시보드를 사용하면 모델 활동, 드리프트, 미해결 인시던트에 대한 즉각적인 가시성을 얻을
      수 있습니다.
    image_url: images/2_4.png
    media_type: image
  - caption: Superwise 인시던트를 사용하면 모니터링 정책 위반 사항을 자세히 살펴보고 근본 원인을 빠르게 파악할 수 있습니다.
    image_url: images/3_4.png
    media_type: image
  - caption: 모니터링 정책 빌더를 사용하면 메트릭, 기능, 하위 집단에 대한 정책을 쉽게 구성하고 이를 Datadog로 보낼 수 있습니다.
    image_url: images/4_4.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
  - resource_type: 설명서
    url: https://docs.superwise.ai
  support: README.md#Support
  title: Superwise 모델 옵저버빌리티
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
Superwise는 기업이 프로덕션 환경에서 머신러닝(ML) 모델의 상태를 모니터링하여, 추론 스트림 전반에 걸친 모델 성능 및 무결성 문제를 신속하게 감지할 수 있도록 지원합니다. Superwise는 모델 메트릭을 자동으로 보정하고, 이벤트를 분석하며, 이상 징후의 연관성을 파악해 ML 엔지니어링 팀과 실무자가 모델이 언제, 어디서, 왜 비정상적으로 동작하는지 쉽게 파악할 수 있도록 합니다. 이를 통해 문제가 비즈니스 결과에 영향을 미치기 전에 해결 시간을 단축할 수 있습니다.


Superwise 모델 옵저버빌리티 플랫폼을 사용하면 어떤 규모에서든 프로덕션 ML을 모니터링할 수 있습니다. Datadog Marketplace를 통해 Superwise 구독을 구매하면 14일 동안 무제한으로 모델을 사용할 수 있는 무료 체험판이 제공됩니다. 체험판이 만료되면 처음 3개 모델은 영구적으로 무료로 사용할 수 있으며, Superwise의 사용량 기반 요금제를 통해 언제든지 모니터링 규모를 늘리거나 줄일 수 있습니다. 자세한 내용은 [sales@superwise.ai][1]로 문의하세요.

이 타일에서 Superwise 구독을 구매할 수 있습니다. 이미 Superwise 계정이 있다면 [Superwise Integration 타일][2]을 클릭하여 Superwise Datadog 통합을 설정하세요.

Superwise 통합을 통해 Datadog 사용자는 기존 Datadog 워크플로 내에서 ML 모델을 전체적으로 모니터링하고, 모델 문제에 대한 심층적인 조사를 위해 Superwise 메트릭 및 인시던트를 포함하여 옵저버빌리티를 강화할 수 있습니다. Superwise 사용자는 비즈니스에 중요한 사용자 지정 메트릭을 Superwise 내에서 모니터링하도록 구성하고, 해당 정보를 Datadog에 전송하여 모든 사용 사례에 대한 옵저버빌리티를 확장할 수 있습니다.

## 지원

지원이나 기능 요청은 다음 채널을 통해 Superwise에 문의하세요.

- 이메일: [support@superwise.ai][3]

### 참고 자료

- [Datadog Marketplace에서 Superwise의 제품으로 모델 성능 모니터링][4]
- [Superwise 설명서][5]

[1]: mailto:sales@superwise.ai
[2]: https://app.datadoghq.com/integrations/superwise
[3]: mailto:support@superwise.ai
[4]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
[5]: https://docs.superwise.ai
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/superwise-license" target="_blank">Marketplace에서 구매하세요</a>.