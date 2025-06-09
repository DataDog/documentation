---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-nutanix
app_uuid: 53711ca7-b5f8-4472-b921-e70a3103ede4
assets:
  dashboards:
    RapDev Nutanix Cluster Overview: assets/dashboards/rapdev_nutanix_overview_dashboard.json
    RapDev Nutanix Clusters Dashboard: assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    RapDev Nutanix Hosts and Disks Dashboard: assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    RapDev Nutanix Protection Domain Dashboard: assets/dashboards/rapdev_nutanix_protection_domain_dashboard.json
    RapDev Nutanix VMs Dashboard: assets/dashboards/rapdev_nutanix_vms_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.nutanix.clusters.count
      metadata_path: metadata.csv
      prefix: rapdev.nutanix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10138
    source_type_name: RapDev Nutanix
  logs: {}
  monitors:
    CPU utilization is high: assets/monitors/nutanix_cpu_monitor.json
    Compression saving ratio is low: assets/monitors/nutanix_compression_saving_monitor.json
    Deduplication ratio is low: assets/monitors/nutanix_deduplication_monitor.json
    Storage is reaching saturation: assets/monitors/nutanix_storage_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_nutanix
integration_id: rapdev-nutanix
integration_title: Nutanix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_nutanix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.nutanix
  product_id: nutanix
  short_description: 코어별 유닛 비용
  tag: 코어
  unit_label: Nutanix 호스트 코어
  unit_price: 7.0
public_title: Nutanix
short_description: Nutanix 리소스 사용량을 모니터링하여 환경을 보다 잘 이해하기
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Nutanix 리소스 사용량을 모니터링하여 환경을 보다 잘 이해하기
  media:
  - caption: Nutanix 개요 대시보드
    image_url: images/4.png
    media_type: image
  - caption: Nutanix VM 대시보드
    image_url: images/5.png
    media_type: image
  - caption: Nutanix 클러스터 대시보드
    image_url: images/6.png
    media_type: image
  - caption: Nutanix 호스트 및 디스크 대시보드
    image_url: images/7.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Nutanix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
Nutanix 통합은 스토리지, CPU 사용량, 읽기/쓰기 IOPS 및 기타 메트릭을 Nutanix 클러스터 내에서 모니터링하여 환경이 항상 최적의 성능으로 실행되도록 보장합니다. 본 통합으로 4개의 대시보드가 포함되어 있어 Nutanix 클러스터를 개요에서 확인할 수 있으며 잠재적인 성능 저하를 세분화하여 정확히 파악할 수 있습니다. 또한 Nutanix 통합에는 스토리지 사용률 및 중복 제거 절감과 같은 주요 메트릭 모니터링이 함께 제공되며, 이는 Nutanix 환경의 전체 성능 유지에 필수적인 요소입니다.

### 모니터링

1. Nutanix 클러스터 스토리지 사용률
2. Nutanix 클러스터 CPU 사용률
3. Nutanix 클러스터 중복 제거 절감률
4. Nutanix 클러스터 압축 절감률

### 대시보드

1. RapDev Nutanix 개요
2. RapDev Nutanix 클러스터
3. RapDev Nutanix 호스트 및 디스크
4. RapDev Nutanix VM

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 이메일: support@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-nutanix" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.