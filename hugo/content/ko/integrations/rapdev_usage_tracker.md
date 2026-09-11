---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-usage-tracker
app_uuid: a7bdd804-96cb-422f-ab2b-46adcf1f5b5f
assets: {}
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- metrics
- alerting
- 비용 관리
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_usage_tracker
integration_id: rapdev-usage-tracker
integration_title: 사용량 트래커
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rapdev_usage_tracker
pricing:
- includes_assets: true
  private_offer_only: true
  product_id: usage-tracker
  short_description: 강화된 알림을 통한 Datadog 사용량 모니터링
  unit_price: null
public_title: 사용량 트래커
short_description: 강화된 알림을 통한 Datadog 사용량 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - 카테고리::메트릭
  - Category::Alerting
  - Category::Cost Management
  - Offering::Professional Service
  - Queried Data Type::Logs
  - Queried Data Type::Metrics
  configuration: README.md#Setup
  description: 강화된 알림을 통한 Datadog 사용량 모니터링
  media:
  - caption: 사용량 트래커 주간 보고
    image_url: images/weekly_report.png
    media_type: image
  - caption: 계정 사용량을 표시하는 대시보드
    image_url: images/dashboard.png
    media_type: image
  - caption: 사용량 트래커 알림 이메일 예
    image_url: images/alert_email.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 사용량 트래커
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

RapDev는 엔터프라이즈 규모의 Datadog 구현에 중점을 둔 Datadog 골드 파트너입니다. 100개 이상의 성공적인 구현과 25개 이상의 Datadog Marketplace 통합을 통해 Datadog에 대한 RapDev의 전문 지식을 바탕으로 2022년과 2023년 올해의 Datadog 솔루션 통합 파트너 상을 수상했습니다.

**사용량 트래커**를 사용하면 예상치 못한 비용이 발생하기 전에 사용량 급증을 모니터링할 수 있습니다. 주요 이점은 다음과 같습니다.
1. **가시성**: Datadog 사용량에 대한 가시성과 실행 가능한 인사이트를 확보하여 옵저버빌리티 솔루션에서 최적의 결과를 얻을 수 있습니다.
2. **편리성**: 받은편지함에서 바로 알림을 받고 사용량 급증을 진단하는 데 필요한 데이터에 액세스할 수 있습니다.
3. **실행 가능한 인사이트**: 즉시 사용 가능한 대시보드를 사용하여 기본 구성 문제 및 사용량 변경 사항을 식별하는 데 필요한 컨텍스트를 얻습니다.

이는 호스팅 서비스입니다. 시작하기 위해 RapDev는 다음 정보에 접근합니다.
- Datadog 계정의 API 키
- 다음 범위의 Datadog 계정에 대한 애플리케이션 키:
    - `metrics_read`
    - `events_read`
    - `timeseries_query`
- Datadog 사이트 위치 (예: US1, US3, US5, EU1)
- 알림을 받을 연락처 이메일

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

- 이메일: [support@rapdev.io][2]
- 채팅: [rapdev.io][3]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

원하는 통합을 찾을 수 없나요? 조직에 필요한 중요 기능이 빠져있나요? 저희에게 [메시지][2]를 보내주세요.

[1]: mailto:sales@rapdev.io
[2]: mailto:support@rapdev.io
[3]: https://www.rapdev.io/#Get-in-touch

---
이 애플리케이션은 Marketplace를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-usage-tracker" target="_blank">여기를 클릭</a>하세요.