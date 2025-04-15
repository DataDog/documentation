---
algolia:
  subcategory: Marketplace 통합
app_id: zebrium-zebrium
app_uuid: 3e2a6d39-2057-4cb5-bc0e-5610a43afaf7
assets: {}
author:
  homepage: https://www.zebrium.com
  name: Zebrium
  sales_email: hello@zebrium.com
  support_email: support@zebrium.com
  vendor_id: zebrium
categories:
- 알림
- 자동화
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zebrium_zebrium
integration_id: zebrium-zebrium
integration_title: Zebrium Root Cause as a Service
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zebrium_zebrium
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.zebrium.zebrium
  product_id: zebrium
  short_description: Zebrium 가격은 로그 이벤트 양에 따라 결정됩니다.
  tag: 코어
  unit_label: 수집된 백만 개의 로그 이벤트
  unit_price: 0.3
public_title: Zebrium Root Cause as a Service
short_description: Zebrium은 문제의 근본 원인을 대시보드에 직접 표시합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Notifications
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Zebrium은 문제의 근본 원인을 대시보드에 직접 표시합니다.
  media:
  - caption: '동영상: Datadog을 위한 Root Cause Finder '
    image_url: images/Zebrium_Root_Cause_as_a_Service_thumb.png
    media_type: 비디오
    vimeo_id: 703040365
  - caption: 두 가지 근본 원인 감지(세로선의 빨간색 점)를 표시하는 Zebrium 위젯.
    image_url: images/Zebrium_Root_Cause_Finder_Widget.png
    media_type: image
  - caption: 사이드 패널에 Zebrium 근본 원인 요약이 표시됩니다.
    image_url: images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    media_type: image
  - caption: Zebrium 근본 원인 보고서 세부 정보(Zebrium UI).
    image_url: images/Zebrium_Root_Cause_Report_Details.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/
  support: README.md#Support
  title: Zebrium Root Cause as a Service
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

**Datadog Marketplace에서 Zebrium SaaS 라이선스에 가입하세요.**

문제가 있다는 것을 알지만 그 원인이 무엇인지 확실하지 않은 경우, [Zebrium][1]은 Datadog 대시보드에 직접 근본 원인을 자동으로 표시합니다. Zebrium의 솔루션은 머신 러닝을 로그에 적용하지만 데이터를 수동으로 훈련하거나 규칙을 설정할 필요가 없으며 24시간 이내에 정확성을 달성합니다.

Zebrium을 사용하는 방법은 간단합니다. 문제를 해결할 때 여기저기 파헤치는 대신 Datadog 대시보드에서 Zebrium 앱으로 스크롤하여 해당 탐지 항목을 살펴보세요.

Zebrium 고객이 되면 Zebrium과 Datadog 간의 두 가지 통합 지점, 즉 1) 사용자 정의 대시보드 위젯이 있는 Zebrium Datadog 앱과 2) Zebrium에서 이벤트 및 메트릭을 전송하는 Datadog 통합을 사용할 수 있습니다. 설치하려면 [Integrations 페이지][4]를 방문하여 Zebrium을 검색하세요.

## 지원

지원이나 기능 요청은 다음 채널을 통해 Zebrium에 문의하세요.

- 이메일: [support@zebrium.com][2]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog과 Zebrium으로 근본 원인을 더 빠르게 찾아보세요][5]

[1]: https://www.zebrium.com
[2]: mailto:support@zebrium.com
[3]: https://cloud.zebrium.com
[4]: https://app.datadoghq.com/integrations
[5]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/

---
이 애플리케이션은 Marketplace를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/blink-blink" target="_blank">여기를 클릭</a>하세요.