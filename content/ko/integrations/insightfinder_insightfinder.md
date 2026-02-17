---
algolia:
  subcategory: Marketplace 통합
app_id: insightfinder-insightfinder-license
app_uuid: 6f2fcb70-c087-412a-b221-360ba6a1c68f
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10299
    source_type_name: InsightFinder License
author:
  homepage: https://insightfinder.com/
  name: InsightFinder
  sales_email: info@insightfinder.com
  support_email: support@insightfinder.com
  vendor_id: insightfinder
categories:
- 경고
- marketplace
- 알림
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: insightfinder_insightfinder
integration_id: insightfinder-insightfinder-license
integration_title: InsightFinder
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: insightfinder_insightfinder
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.insightfinder.insightfinder
  product_id: insightfinder
  short_description: AIOps 기반의 인시던트 예측 및 조사 플랫폼
  tag: 노드
  unit_label: 노드 모니터링
  unit_price: 10
public_title: InsightFinder
short_description: 인시던트 조사 및 예방을 위한 인간 중심의 AI 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 인시던트 조사 및 예방을 위한 인간 중심 AI 플랫폼
  media:
  - caption: 인시던트 예측 및 조사를 위한 InsightFinder AIOps 플랫폼.
    image_url: images/InsightFinder_healthview.png
    media_type: image
  - caption: 전체적인 상태를 볼 수 있는 InsightFinder AIOps 플랫폼 대시보드.
    image_url: images/InsightFinder_dashboard.png
    media_type: image
  - caption: InsightFinder 인시던트 조사 및 조치.
    image_url: images/InsightFinder_investigation.png
    media_type: image
  - caption: InsightFinder 예측.
    image_url: images/InsightFinder_prediction.png
    media_type: image
  - caption: InsightFinder 메트릭 이상 감지.
    image_url: images/InsightFinder_metric.png
    media_type: image
  - caption: InsightFinder 로그 분석.
    image_url: images/InsightFinder_log.png
    media_type: image
  - caption: Datadog이 만든 InsightFinder OOTB 대시보드.
    image_url: images/InsightFinder_dd_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
  support: README.md#Support
  title: InsightFinder
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
DevSecOps, DataOps, MLOps, IT 운영, SRE 팀은 복잡한 현대 IT 아키텍처에서 발생하는 인프라, 데이터, 보안 문제를 예측하고 예방하기 위해 [InsightFinder][1]를 원스톱 AI 인텔리전스 엔진으로 활용합니다. 사고 예측, 비지도 머신러닝, 패턴 기반 자동 복구를 위한 독자적인 특허 기술을 기반으로, InsightFinder 플랫폼은 머신 데이터를 지속적으로 학습하여 비즈니스에 영향을 미치기 전에 모든 문제를 파악하고 해결합니다.

고객은 InsightFinder를 무료 체험하고 Datadog 및 기타 인기 있는 DevSecOps, IT 운영 관리(ITOM), IT 서비스 관리(ITSM) 도구와의 사전 구축된 통합을 통해 빠르게 가치를 얻을 수 있습니다.

## 지원

지원이나 기능 요청이 있으나요? 다음 채널을 통해 InsightFinder에 문의하세요.

- 이메일: [support@insightfinder.com][4]
- [Datadog 지원팀][5]에 문의

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 InsightFinder 제품을 구매해 인시던트를 더 빠르게 파악하고 해결하세요][6]

[1]: https://insightfinder.com/
[2]: https://app.insightfinder.com/
[3]: https://insightfinder.com/datadog-integration/
[4]: mailto:support@insightfinder.com
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/insightfinder-insightfinder-license" target="_blank">Marketplace에서 구매하세요</a>.