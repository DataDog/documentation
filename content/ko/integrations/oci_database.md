---
app_id: oci-database
app_uuid: 9091c2d3-1ce1-4b02-bd68-57660acd766a
assets:
  dashboards:
    OCI-Database-Overview: assets/dashboards/oci-database-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.database.block_changes
      - oci.database.cpu_utilization
      - oci.database.current_logons
      - oci.database.execute_count
      - oci.database.parse_count
      - oci.database.storage_allocated
      - oci.database.storage_allocated_by_tablespace
      - oci.database.storage_used
      - oci.database.storage_used_by_tablespace
      - oci.database.storage_utilization
      - oci.database.storage_utilization_by_tablespace
      - oci.database.transaction_count
      - oci.database.user_calls
      - oci.database_cluster.asmdiskgroup_utilization
      - oci.database_cluster.cpu_utilization
      - oci.database_cluster.filesystem_utilization
      - oci.database_cluster.load_average
      - oci.database_cluster.memory_utilization
      - oci.database_cluster.node_status
      - oci.database_cluster.ocpus_allocated
      - oci.database_cluster.swap_utilization
      - oci.oracle_oci_database.allocated_storage_utilization_by_tablespace
      - oci.oracle_oci_database.apply_lag
      - oci.oracle_oci_database.apply_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.avg_gc_cr_block_receive_time
      - oci.oracle_oci_database.backup_duration
      - oci.oracle_oci_database.backup_size
      - oci.oracle_oci_database.block_changes
      - oci.oracle_oci_database.blocking_sessions
      - oci.oracle_oci_database.cputime
      - oci.oracle_oci_database.cpu_utilization
      - oci.oracle_oci_database.current_logons
      - oci.oracle_oci_database.dbtime
      - oci.oracle_oci_database.estimated_failover_time
      - oci.oracle_oci_database.execute_count
      - oci.oracle_oci_database.fraspace_limit
      - oci.oracle_oci_database.frautilization
      - oci.oracle_oci_database.gc_cr_blocks_received
      - oci.oracle_oci_database.gc_current_blocks_received
      - oci.oracle_oci_database.iops
      - oci.oracle_oci_database.io_throughput
      - oci.oracle_oci_database.interconnect_traffic
      - oci.oracle_oci_database.invalid_objects
      - oci.oracle_oci_database.logical_blocks_read
      - oci.oracle_oci_database.max_tablespace_size
      - oci.oracle_oci_database.memory_usage
      - oci.oracle_oci_database.monitoring_status
      - oci.oracle_oci_database.non_reclaimable_fra
      - oci.oracle_oci_database.ocpus_allocated
      - oci.oracle_oci_database.parse_count
      - oci.oracle_oci_database.parses_by_type
      - oci.oracle_oci_database.problematic_scheduled_dbmsjobs
      - oci.oracle_oci_database.process_limit_utilization
      - oci.oracle_oci_database.processes
      - oci.oracle_oci_database.reclaimable_fra
      - oci.oracle_oci_database.reclaimable_fraspace
      - oci.oracle_oci_database.recovery_window
      - oci.oracle_oci_database.redo_apply_rate
      - oci.oracle_oci_database.redo_generation_rate
      - oci.oracle_oci_database.redo_size
      - oci.oracle_oci_database.session_limit_utilization
      - oci.oracle_oci_database.sessions
      - oci.oracle_oci_database.storage_allocated
      - oci.oracle_oci_database.storage_allocated_by_tablespace
      - oci.oracle_oci_database.storage_used
      - oci.oracle_oci_database.storage_used_by_tablespace
      - oci.oracle_oci_database.storage_utilization
      - oci.oracle_oci_database.storage_utilization_by_tablespace
      - oci.oracle_oci_database.transaction_count
      - oci.oracle_oci_database.transactions_by_status
      - oci.oracle_oci_database.transport_lag
      - oci.oracle_oci_database.transport_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.unprotected_data_window
      - oci.oracle_oci_database.unusable_indexes
      - oci.oracle_oci_database.usable_fra
      - oci.oracle_oci_database.used_fraspace
      - oci.oracle_oci_database.user_calls
      - oci.oracle_oci_database.wait_time
      - oci.oracle_oci_database.dbmgmt_job_executions_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24362850
    source_type_name: OCI 데이터베이스
  monitors:
    An OCI Database is approaching CPU saturation: assets/monitors/oci-db-cpu.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- 클라우드
- oracle
- 메트릭
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_database
integration_id: oci-database
integration_title: OCI 데이터베이스
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_database
public_title: OCI 데이터베이스
short_description: OCI 데이터베이스(Base, RAC, Exadata)는 모든 애플리케이션에 안정적이고 확장 가능하며 안전한 데이터베이스
  솔루션을 제공합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI 데이터베이스(Base, RAC, Exadata)는 모든 애플리케이션에 안정적이고 확장 가능하며 안전한 데이터베이스
    솔루션을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI 데이터베이스
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Oracle Cloud Infrastructure(OCI)는 모든 워크로드를 위한 유연하고 안전한 고성능 데이터베이스를 제공합니다.

본 통합은 주요 메트릭을 수집하여 CPU 및 스토리지 사용량, 데이터베이스 로그온 및 연결 시도 성공 및 실패 횟수, 데이터베이스 작업, SQL 쿼리 및 트랜잭션을 모니터링하고 알림을 제공합니다.

다음 네임스페이스의 [Oracle Base Database][1] 및 [Exadata VM Cluster][2] 리소스에서 태그와 메트릭을 수집합니다.

- [`oci_database`][3]
- [`oci_database_cluster`][3]

[Oracle Database Management][4]가 활성화된 경우, 이 통합은 [`oracle_oci_database`][3] 네임스페이스를 통해 플릿 모니터링 및 SQL Tuning Advisor와 같은 기능의 메트릭도 수신합니다.

Oracle Database에 [Datadog Agent][5]를 설치하면 활성 세션, 디스크 사용량, 테이블 공간 사용량 등과 같은 추가 메트릭에 관한 실시간 인사이트를 얻을 수 있습니다.

Datadog의 [Database Monitoring (DBM)][6]을 활성화하여 쿼리 성능 및 데이터베이스 상태에 관한 향상된 인사이트를 얻으세요. Datadog DBM은 표준 통합 기능 외에도 쿼리 수준 메트릭, 실시간 및 과거 쿼리 스냅샷, 대기 이벤트 분석, 데이터베이스 부하, 쿼리 실행 계획, 차단 쿼리 인사이트를 제공합니다.

## 설정

### 설치

[Oracle Cloud Infrastructure][7] 통합을 설정한 후 `oci_database` 및 `oci_database_cluster` 네임스페이스가 [Connector Hub][8]에 포함되어 있는지 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oci_database" >}}


### 이벤트

OCI 데이터베이스 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

OCI 데이터베이스 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.oracle.com/database/base-database-service/
[2]: https://www.oracle.com/engineered-systems/exadata/database-service/
[3]: https://docs.oracle.com/en-us/iaas/database-management/doc/oracle-cloud-database-metrics.html
[4]: https://www.oracle.com/manageability/database-management/
[5]: https://docs.datadoghq.com/ko/integrations/oracle
[6]: https://docs.datadoghq.com/ko/database_monitoring/
[7]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure/
[8]: https://cloud.oracle.com/connector-hub/service-connectors
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_database/metadata.csv
[10]: https://docs.datadoghq.com/ko/help/