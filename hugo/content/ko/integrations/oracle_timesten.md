---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-oracle-timesten
app_uuid: bddd0f6a-efe0-4e3f-bff4-46df8bb839f9
assets:
  dashboards:
    Oracle TimesTen: assets/dashboards/oracle_timesten.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.oracle_timesten.reportduration
      metadata_path: metadata.csv
      prefix: rapdev.oracle_timesten.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10116
    source_type_name: Oracle TimesTen
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 캐싱(caching)
- 데이터 스토어
- marketplace
- oracle
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_timesten
integration_id: rapdev-oracle-timesten
integration_title: Oracle TimesTen
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: oracle_timesten
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.oracle_timesten
  product_id: oracle-timesten
  short_description: 호스트별 유닛 비용
  tag: 호스트
  unit_label: Oracle Times Ten 데이터베이스
  unit_price: 500
public_title: Oracle TimesTen
short_description: Oracle TimesTen 데이터베이스 성능 모니터링
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::캐싱(Caching)
  - 카테고리::데이터 저장
  - Category::Marketplace
  - Category::Oracle
  - Offering::Integration
  - Supported OS::Linux
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Oracle TimesTen 데이터베이스 성능 모니터링
  media:
  - caption: Oracle TimesTen Datadog 통합
    image_url: images/video.png
    media_type: 비디오
    vimeo_id: 630489692
  - caption: 상태 개요
    image_url: images/1.png
    media_type: image
  - caption: 복제 메트릭
    image_url: images/2.png
    media_type: image
  - caption: SQL 통계
    image_url: images/3.png
    media_type: image
  - caption: 대시보드 개요
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle TimesTen
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Oracle TimesTen 통합으로 TimesTen 인메모리 데이터베이스를 모니터링할 수 있습니다. 본 통합은 200개 이상의 메트릭을 다루며 상위 쿼리, 데이터베이스 상태, 실행 시간 등에 대한 세부 정보를 제공합니다.

본  통합에는 TimesTen 데이터베이스의 상태 개요 및 메트릭을 표시하는 기본 제공 대시보드가 포함되어 있습니다.

## 지원

지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-oracle-timesten" target="_blank">Marketplace에서 구매하세요</a>.