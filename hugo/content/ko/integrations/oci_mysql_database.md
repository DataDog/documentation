---
app_id: oci-mysql-database
app_uuid: 8600b5fa-cd4c-4003-b397-99d8784509c1
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.mysql_database.active_connections
      - oci.mysql_database.backup_failure
      - oci.mysql_database.backup_size
      - oci.mysql_database.backup_time
      - oci.mysql_database.cpu_utilization
      - oci.mysql_database.channel_failure
      - oci.mysql_database.channel_lag
      - oci.mysql_database.current_connections
      - oci.mysql_database.db_volume_read_bytes
      - oci.mysql_database.db_volume_read_operations
      - oci.mysql_database.db_volume_utilization
      - oci.mysql_database.db_volume_write_bytes
      - oci.mysql_database.db_volume_write_operations
      - oci.mysql_database.heat_wave_data_load_progress
      - oci.mysql_database.heat_wave_health
      - oci.mysql_database.heat_wave_statements
      - oci.mysql_database.memory_allocated
      - oci.mysql_database.memory_used
      - oci.mysql_database.memory_utilization
      - oci.mysql_database.network_receive_bytes
      - oci.mysql_database.network_transmit_bytes
      - oci.mysql_database.ocpus_allocated
      - oci.mysql_database.ocpus_used
      - oci.mysql_database.statement_latency
      - oci.mysql_database.statements
      - oci.mysql_database.storage_allocated
      - oci.mysql_database.storage_used
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26597073
    source_type_name: OCI MySQL Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- oracle
- 메트릭
- 데이터 저장소
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_mysql_database
integration_id: oci-mysql-database
integration_title: OCI HeatWave MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_mysql_database
public_title: OCI HeatWave MySQL
short_description: OCI HeatWave MySQL은 인메모리 쿼리 가속 기능을 통해 MySQL을 강화하여 빠른 실시간 분석을 제공합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI HeatWave MySQL은 인메모리 쿼리 가속 기능을 통해 MySQL을 강화하여 빠른 실시간 분석을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI HeatWave MySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

OCI HeatWave MySQL은 거래 및 레이크하우스 규모 분석을 위해 하나의 클라우드 서비스에서 자동화되고 통합된 생성 AI와 머신 러닝을 사용합니다.

이 통합을 사용하면 [oci_mysql_database][1] 네임스페이스에서 메트릭과 태그를 수집하여 MySQL DB 시스템의 현재 연결, 명령문 수, CPU 사용률 및 백업 시간을 모니터링하고 알림을 받을 수 있습니다.

## 설정

### 설치

[Oracle Cloud Infrastructure][2] 통합을 설정한 후 `oci_mysql_database` 네임스페이스가 [Connector Hub][3]에 포함되어 있는지 확인하세요.


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oci_mysql_database" >}}


### 서비스 점검

OCI MySQL Database는 서비스 점검을 포함하지 않습니다.

### 이벤트

OCI MySQL Database는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.oracle.com/en-us/iaas/mysql-database/doc/metrics.html
[2]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_mysql_database/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/