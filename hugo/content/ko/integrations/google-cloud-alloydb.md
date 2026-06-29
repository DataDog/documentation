---
aliases:
- /ko/integrations/google_cloud_alloydb
app_id: google-cloud-alloydb
categories:
- cloud
- google cloud
- data stores
- log collection
custom_kind: integration
description: AlloyDB는 까다로운 트랜잭션 워크로드용 완전 관리형 PostgreSQL 호환 데이터베이스입니다.
media: []
title: Google Cloud AlloyDB
---
## 개요

AlloyDB는 까다로운 트랜잭션 워크로드를 위한 완전 관리형 PostgreSQL 호환 데이터베이스입니다. 
오픈 소스 PostgreSQL과 100% 호환성을 유지하면서 엔터프라이즈급 성능과 가용성을 제공합니다.

Google AlloyDB에서 메트릭을 가져와 다음을 수행할 수 있습니다.

- AlloyDB 클러스터의 성능을 시각화합니다.
- AlloyDB 인스턴스의 성능과 데이터베이스의 상관관계를 파악합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google AlloyDB 로그는 Google Cloud Logging으로 수집되어 클라우드 Pub/Sub 토픽을 통해 Dataflow 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog Dataflow 템플릿으로 로깅을 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

이 작업이 완료되면 Google AlloyDB 로그를 Google Cloud Logging에서 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동해 Google AlloyDB 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.alloydb.cluster.storage.usage** <br>(gauge) | 전체 클러스터의 총 AlloyDB 스토리지(바이트)<br>_byte로 표시_ |
| **gcp.alloydb.database.postgresql.backends_for_top_databases** <br>(gauge) | 인스턴스의 상위 500개 데이터베이스의 데이터베이스당 현재 연결 수.|
| **gcp.alloydb.database.postgresql.blks_hit_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 Postgres가 버퍼 캐시에서 요청된 블록을 찾은 횟수.|
| **gcp.alloydb.database.postgresql.blks_read_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 Postgres가 버퍼 캐시에 없어서 디스크에서 읽은 블록 수.|
| **gcp.alloydb.database.postgresql.committed_transactions_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 커밋된 총 트랜잭션 수.|
| **gcp.alloydb.database.postgresql.deadlock_count_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 인스턴스에서 감지된 교착 상태 총수.|
| **gcp.alloydb.database.postgresql.deleted_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리의 결과로 상위 500개 데이터베이스의 데이터베이스당 삭제된 행의 총수.<br>_byte로 표시_ |
| **gcp.alloydb.database.postgresql.fetched_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리의 결과로 상위 500개 데이터베이스의 데이터베이스당 불러온 행의 총수.|
| **gcp.alloydb.database.postgresql.inserted_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리의 결과로 상위 500개 데이터베이스의 데이터베이스당 주입한 행의 총수.|
| **gcp.alloydb.database.postgresql.insights.aggregate.execution_time** <br>(count) | 마지막 샘플링 이후 누적된 쿼리 실행 시간. 쿼리 실행에 관련된 모든 프로세스의 CPU 시간, I/O 대기 시간, 락 대기 시간, 프로세스 컨텍스트 전환 및 스케줄링의 합계.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.io_time** <br>(count) | 마지막 샘플링 이후 누적된 I/O 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.latencies** <br>(count) | 쿼리 레이턴시 분포.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.lock_time** <br>(count) | 마지막 샘플링 이후 누적 락 대기 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.row_count** <br>(count) | 마지막 샘플 이후 조회되거나 영향을 받은 행의 수.|
| **gcp.alloydb.database.postgresql.insights.aggregate.shared_blk_access_count** <br>(count) | 구문 실행 중 액세스한 공유 블록(일반 및 인덱싱된 테이블).|
| **gcp.alloydb.database.postgresql.insights.perquery.execution_time** <br>(count) | 사용자당, 데이터베이스당, 쿼리당 누적 실행 시간. 쿼리 실행과 관련된 모든 프로세스의 CPU 시간, I/O 대기 시간, 락 대기 시간, 프로세스 컨텍스트 전환 및 스케줄링의 합계.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.perquery.io_time** <br>(count) | 마지막 샘플 이후 누적 I/O 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.perquery.latencies** <br>(count) | 쿼리 레이턴시 분포.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.perquery.lock_time** <br>(count) | 마지막 샘플링 이후 누적 락 대기 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.perquery.row_count** <br>(count) | 마지막 샘플 이후 조회되거나 영향을 받은 행의 수.|
| **gcp.alloydb.database.postgresql.insights.perquery.shared_blk_access_count** <br>(count) | 구문 실행 중 액세스한 공유 블록(일반 및 인덱싱된 테이블).|
| **gcp.alloydb.database.postgresql.insights.pertag.execution_time** <br>(count) | 마지막 샘플링 이후 누적된 실행 시간. 쿼리 실행에 관련된 모든 프로세스의 CPU 시간, I/O 대기 시간, 락 대기 시간, 프로세스 컨텍스트 전환 및 스케줄링의 합계.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.pertag.io_time** <br>(count) | 마지막 샘플 이후 누적 I/O 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.pertag.latencies** <br>(count) | 쿼리 레이턴시 분포.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.pertag.lock_time** <br>(count) | 마지막 샘플링 이후 누적 락 대기 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.database.postgresql.insights.pertag.row_count** <br>(count) | 마지막 샘플 이후 조회되거나 영향을 받은 행의 수.|
| **gcp.alloydb.database.postgresql.insights.pertag.shared_blk_access_count** <br>(count) | 구문 실행 중 액세스된 공유 블록(일반 및 인덱싱된 테이블).|
| **gcp.alloydb.database.postgresql.new_connections_for_top_databases** <br>(count) | 인스턴스의 상위 500개 데이터베이스의 데이터베이스당 추가된 새 연결의 총수.|
| **gcp.alloydb.database.postgresql.returned_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리를 처리하는 동안 상위 500개 데이터베이스의 데이터베이스당 스캔한 행의 총수.|
| **gcp.alloydb.database.postgresql.rolledback_transactions_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 롤백된 총 트랜잭션 수.|
| **gcp.alloydb.database.postgresql.statements_executed_count** <br>(count) | operation_type별 데이터베이스당 인스턴스에서 실행된 실행문의 총 카운트. Query 인사이트가 활성화된 인스턴스에서만 사용할 수 있습니다.|
| **gcp.alloydb.database.postgresql.temp_bytes_written_for_top_databases** <br>(count) | 상위 500개 데이터베이스의 데이터베이스당 쿼리가 임시 파일을 기록한 총 데이터 양(바이트).<br>_byte로 표시_ |
| **gcp.alloydb.database.postgresql.temp_files_written_for_top_databases** <br>(count) | 상위 500개 데이터베이스에 Join 또는 Sort와 같은 내부 알고리즘을 실행하는 동안 데이터베이스당 데이터 작성에 사용되는 임시 파일의 수.|
| **gcp.alloydb.database.postgresql.tuples** <br>(gauge) | 인스턴스의 데이터베이스당 상태별 튜플(행)의 수. 해당 메트릭은 데이터베이스 수가 50개 미만인 경우에만 노출됩니다.|
| **gcp.alloydb.database.postgresql.updated_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리의 결과로 상위 500개 데이터베이스의 데이터베이스당 업데이트한 행의 총수.|
| **gcp.alloydb.database.postgresql.vacuum.oldest_transaction_age** <br>(gauge) | 커밋되지 않은 가장 오래된 트랜잭션의 현재 수명. 가장 오래된 트랜잭션 이후 시작된 트랜잭션의 수로 측정됩니다.|
| **gcp.alloydb.database.postgresql.vacuum.transaction_id_utilization** <br>(gauge) | AlloyDB 인스턴스가 사용하는 트랜잭션 ID 공간의 현재 백분율. Vacuum 처리되지 않은 트랜잭션의 수를 최대 20억 개 대비 백분율로 기록합니다.|
| **gcp.alloydb.database.postgresql.written_tuples_count_for_top_databases** <br>(count) | 인스턴스에서 쿼리의 결과로 상위 500개 데이터베이스의 데이터베이스당 작성된(주입, 업데이트, 삭제) 행의 총수.|
| **gcp.alloydb.instance.cpu.average_utilization** <br>(gauge) | 인스턴스의 모든 현재 서빙 노드의 평균 CPU 사용률로 0에서 100 사이 값으로 표시됩니다.|
| **gcp.alloydb.instance.cpu.maximum_utilization** <br>(gauge) | 인스턴스의 모든 현재 서빙 노드의 최대 CPU 사용률로 0에서 100 사이 값으로 표시됩니다.|
| **gcp.alloydb.instance.cpu.vcpus** <br>(gauge) | 인스턴스의 각 노드에 할당된 vCPU 수.|
| **gcp.alloydb.instance.memory.min_available_memory** <br>(gauge) | 인스턴스의 모든 현재 서빙 노드에서 사용 가능한 최소 메모리. 사용 가능한 메모리는 현재 사용 중이지만 잠재적으로 해제할 수 있는 메모리를 포함하여 VM이 할당할 수 있는 메모리의 추정치입니다(바이트).<br>_byte로 표시_ |
| **gcp.alloydb.instance.postgres.abort_count** <br>(count) | 인스턴스의 모든 서빙 노드에서 롤백된 트랜잭션 수.|
| **gcp.alloydb.instance.postgres.average_connections** <br>(gauge) | 인스턴스의 서빙 노드 전체에서 AlloyDB의 활성 및 유휴 연결의 평균 수.|
| **gcp.alloydb.instance.postgres.commit_count** <br>(count) | 인스턴스의 모든 서빙 노드에서 커밋된 트랜잭션 수.|
| **gcp.alloydb.instance.postgres.connections_limit** <br>(gauge) | AlloyDB 인스턴스의 노드당 연결 수의 현재 제한 값.|
| **gcp.alloydb.instance.postgres.instances** <br>(gauge) | 인스턴스의 노드 수와 해당 노드의 상태(업 또는 다운).|
| **gcp.alloydb.instance.postgres.replication.maximum_lag** <br>(gauge) | 인스턴스의 읽기 복제본을 제공하는 모든 인스턴스에 계산된 최대 복제 시간 지연. 복제 시간 지연은 replay_lag 값에 기반하여 산출됩니다.<br>_millisecond로 표시_ |
| **gcp.alloydb.instance.postgres.replication.maximum_secondary_lag** <br>(gauge) | 기본 클러스터에서 보조 클러스터로 복제되는 최대 복제 지연 시간. 복제 시간 지연은 replay_lag 값으로 산출됩니다.<br>_millisecond로 표시_ |
| **gcp.alloydb.instance.postgres.replication.network_lag** <br>(gauge) | 로컬에서 최신 WAL를 플러시한 시점부터 대기 서버가 이를 작성하고 플러시했다는(아직 적용되지는 않음) 알림을 받기까지 경과된 시간.<br>_millisecond로 표시_ |
| **gcp.alloydb.instance.postgres.replication.replicas** <br>(gauge) | 기본 인스턴스에 연결된 읽기 복제본의 수.|
| **gcp.alloydb.instance.postgres.total_connections** <br>(gauge) | 인스턴스의 서빙 노드 전체에서 AlloyDB 인스턴트의 활성 및 유휴 연결의 수.|
| **gcp.alloydb.instance.postgres.transaction_count** <br>(count) | 인스턴스의 모든 서빙 노드에서 커밋 및 롤백된 트랜잭션 수.|
| **gcp.alloydb.instance.postgresql.backends_by_state** <br>(gauge) | idle, active, idle_in_transaction, idle_in_transaction_aborted, disabled, fastpath_function_call 상태별로 그룹화된 인스턴스의 현재 연결 수.|
| **gcp.alloydb.instance.postgresql.backends_for_top_applications** <br>(gauge) | AlloyDB 인스턴스 현재 연결 수로, 상위 500개 애플리케이션의 애플리케이션별로 그룹화됨.|
| **gcp.alloydb.instance.postgresql.blks_hit** <br>(count) | Postgres가 버퍼 캐시에서 요청된 블록을 찾은 횟수.|
| **gcp.alloydb.instance.postgresql.blks_read** <br>(count) | Postgres가 버퍼 캐시에 없어서 디스크에서 읽은 블록 수.|
| **gcp.alloydb.instance.postgresql.deadlock_count** <br>(count) | 인스턴스에서 감지된 교착 상태 발생 수.|
| **gcp.alloydb.instance.postgresql.deleted_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 삭제된 행의 수.|
| **gcp.alloydb.instance.postgresql.fetched_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 불러온 행의 수.|
| **gcp.alloydb.instance.postgresql.inserted_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 삽입된 행의 수.|
| **gcp.alloydb.instance.postgresql.new_connections_count** <br>(count) | 인스턴스에 추가된 새 연결 수.|
| **gcp.alloydb.instance.postgresql.returned_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 스캔된 행의 수.|
| **gcp.alloydb.instance.postgresql.temp_bytes_written_count** <br>(count) | Join 또는 Sort와 같은 내부 알고리즘을 실행하는 동안 쿼리가 임시 파일에 기록한 총 데이터 양(바이트).<br>_byte로 표시_ |
| **gcp.alloydb.instance.postgresql.temp_files_written_count** <br>(count) | Join 또는 Sort와 같은 내부 알고리즘을 실행하는 동안 인스턴스에서 데이터 작성에 사용되는 임시 파일의 수.|
| **gcp.alloydb.instance.postgresql.updated_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 업데이트된 행의 수.|
| **gcp.alloydb.instance.postgresql.version** <br>(gauge) | Postgres 데이터베이스 버전(예: `POSTGRES_14`, `POSTGRES_15`).|
| **gcp.alloydb.instance.postgresql.wait_count** <br>(count) | 인스턴스의 각 대기 이벤트에 프로세스가 대기한 총 횟수.|
| **gcp.alloydb.instance.postgresql.wait_time** <br>(count) | 인스턴스의 각 대기 이벤트의 총 누적 대기 시간.<br>_microsecond로 표시_ |
| **gcp.alloydb.instance.postgresql.written_tuples_count** <br>(count) | 마지막 샘플링 이후 인스턴스에서 쿼리를 처리하는 동안 작성된 행의 수.|
| **gcp.alloydb.node.cpu.usage_time** <br>(gauge) | 이 노드의 CPU 사용률.|
| **gcp.alloydb.node.postgres.replay_lag** <br>(gauge) | 개별 노드의 지연 시간으로 `pg_stat_replication`의 replay_lag에서 가져온 값(밀리초).<br>_millisecond로 표시_ |
| **gcp.alloydb.node.postgres.uptime** <br>(gauge) | 이 노드의 데이터베이스 가용성 비율.|
| **gcp.alloydb.quota.storage_usage_per_cluster** <br>(gauge) | 클러스터당 스토리지 사용량.|
| **gcp.alloydb.quota.storage_usage_per_cluster.exceeded** <br>(count) | `alloydb.googleapis.com/storage_usage_per_cluster` 쿼터 메트릭의 제한을 초과한 시도 횟수.|
| **gcp.alloydb.quota.storage_usage_per_cluster.limit** <br>(gauge) | 쿼터 메트릭 `alloydb.googleapis.com/storage_usage_per_cluster`의 현재 제한값.|
| **gcp.alloydb.quota.storage_usage_per_cluster.usage** <br>(gauge) | 쿼터 메트릭 `alloydb.googleapis.com/storage_usage_per_cluster`의 현재 사용량.|

### 이벤트

Google AlloyDB 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google AlloyDB 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.