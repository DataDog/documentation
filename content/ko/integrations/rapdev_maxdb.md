---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-maxdb
app_uuid: f30ae17c-d58a-43f4-a8a6-693279394101
assets:
  dashboards:
    RapDev MaxDB Dashboard: assets/dashboards/rapdev_maxdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.maxdb.db_state
      metadata_path: metadata.csv
      prefix: rapdev.maxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10131
    source_type_name: RapDev MaxDB
  monitors:
    Data volume usage is high: assets/monitors/rapdev_maxdb_data_volume_usage.json
    Database connection is failing: assets/monitors/rapdev_maxdb_connection_check.json
    Database is not online: assets/monitors/rapdev_maxdb_state.json
    Lock utilization is high: assets/monitors/rapdev_maxdb_lock_utilization.json
    Log area usage is high: assets/monitors/rapdev_maxdb_log_area_usage.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 캐싱
- 데이터 저장소
- marketplace
- sap
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_maxdb
integration_id: rapdev-maxdb
integration_title: MaxDB
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_maxdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.maxdb
  product_id: maxdb
  short_description: DB당 유닛 비용
  tag: db
  unit_label: 데이터베이스
  unit_price: 50
public_title: MaxDB
short_description: MaxDB 데이터베이스의 볼륨, 캐시, 스키마, 테이블 등 모니터링하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: MaxDB 데이터베이스의 볼륨, 캐시, 스키마, 테이블 등 모니터링하기
  media:
  - caption: 데이터베이스 상태 및 데이터/로그 메트릭
    image_url: images/1.png
    media_type: image
  - caption: 데이터베이스 캐시 메트릭
    image_url: images/2.png
    media_type: image
  - caption: 세션, OMS 및 스키마 메트릭
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: MaxDB
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 개요

MaxDB 통합은 MaxDB 인스턴트의 데이터 및 로그 영역, 볼륨, 캐시, 세션, 락(lock) 및 기타 메트릭을 모니터링하여 데이터베이스가 정상적으로 실행되는지 확인합니다. 본 통합에는 데이터베이스별로 필터링할 수 있는 대시보드와 데이터베이스 호스트가 함께 제공됩니다. MaxDB 통합에는 데이터베이스의 전반적인 서비스 상태와 관련된 몇 가지 일반 메트릭 모니터링도 함께 제공됩니다.

### 모니터링
1. MaxDB 연결 점검
2. MaxDB 상태
3. MaxDB 데이터 볼륨 사용량
4. MaxDB 락(lock) 사용율
5. MaxDB 로그 영역 사용량

## 지원

지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io 
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222 

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-maxdb" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.