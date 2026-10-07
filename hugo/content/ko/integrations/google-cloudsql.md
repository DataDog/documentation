---
aliases:
- /ko/integrations/google_cloudsql
app_id: google-cloudsql
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: integration
description: Postgres, MySQL, SQL Server용 간편한 완전 관리 및 관계형 데이터베이스 서비스
media: []
title: Google CloudSQL
---
## 개요

Google Cloud SQL은 완전관리형 데이터베이스 서비스로, 클라우드에서 SQL 데이터베이스를 쉽게 설정, 유지, 관리 및 운영할 수 있습니다.

Google Cloud SQL 메트릭을 수집하면 다음을 할 수 있습니다.

- Cloud SQL 데이터베이스의 성능을 시각화합니다.
- Cloud SQL 데이터베이스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

#### 메트릭 수집

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

#### 설정

커스텀 Cloud SQL 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

#### 로그 수집

{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Google Cloud SQL 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud SQL 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud SQL 로그를 필터링하세요.
1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

{{< /site-region >}}

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.cloudsql.database.active_directory.domain_reachable** <br>(gauge) | 인스턴스가 연결된 Managed Active Directory 도메인에서 도메인 컨트롤러에 핑을 전송할 수 있는지 여부를 나타냅니다. 해당 값이 false면 Windows 인증이 정상 작동하지 않을 수 있습니다.|
| **gcp.cloudsql.database.active_directory.instance_available** <br>(gauge) | 현재 Windows 인증을 사용하여 인스턴스를 사용할 수 있는지 여부를 나타냅니다.|
| **gcp.cloudsql.database.auto_failover_request_count** <br>(count) | 인스턴스 자동 페일오버 요청 수의 델타 값.<br>_request로 표시_ |
| **gcp.cloudsql.database.available_for_failover** <br>(gauge) | 인스턴스에서 페일오버 작업을 수행할 수 있는 경우 이 값은 0보다 큽니다.|
| **gcp.cloudsql.database.cpu.reserved_cores** <br>(gauge) | 이 데이터베이스에 예약된 코어 수<br>_core로 표시_ |
| **gcp.cloudsql.database.cpu.usage_time** <br>(gauge) | 누적 CPU 사용 시간.<br>_second로 표시_ |
| **gcp.cloudsql.database.cpu.utilization** <br>(gauge) | 현재 사용 중인 예약 CPU 비율(분수).<br>_fraction으로 표시_ |
| **gcp.cloudsql.database.data_cache.bytes_used** <br>(gauge) | 데이터 캐시 사용량(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.data_cache.quota** <br>(gauge) | 최대 데이터 캐시 크기(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.disk.bytes_used** <br>(gauge) | 사용된 디스크 공간.<br>_byte로 표시_ |
| **gcp.cloudsql.database.disk.bytes_used_by_data_type** <br>(gauge) | 데이터 사용량(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.disk.quota** <br>(gauge) | 최대 데이터 디스크 크기(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.disk.read_ops_count** <br>(count) | 디스크 읽기 I/O 작업.<br>_operation으로 표시_ |
| **gcp.cloudsql.database.disk.utilization** <br>(gauge) | 현재 사용 중인 디스크 할당량 비율(분수).<br>_fraction으로 표시_ |
| **gcp.cloudsql.database.disk.write_ops_count** <br>(count) | 디스크 쓰기 I/O 작업.<br>_operation으로 표시_ |
| **gcp.cloudsql.database.instance_state** <br>(gauge) | Cloud SQL 인스턴스의 서비스 상태.|
| **gcp.cloudsql.database.memory.components** <br>(gauge) | 데이터베이스의 사용량, 캐시, 여유 메모리를 백분율로 나타내는 메모리 통계 컴포넌트.|
| **gcp.cloudsql.database.memory.quota** <br>(gauge) | 최대 RAM(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.memory.total_usage** <br>(gauge) | 버퍼 캐시를 포함한 총 RAM 사용량(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.memory.usage** <br>(gauge) | RAM 사용량(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.memory.utilization** <br>(gauge) | 현재 사용 중인 메모리 할당량의 비율(분수).<br>_fraction으로 표시_ |
| **gcp.cloudsql.database.mysql.aborted_clients_count** <br>(count) | 마지막 샘플링 이후 클라이언트가 연결을 정상 종료하지 않고 종료되어 중단된 연결.|
| **gcp.cloudsql.database.mysql.aborted_connects_count** <br>(count) | 마지막 샘플링 이후 MySQL 서버에 연결하려 시도했으나 실패한 횟수.|
| **gcp.cloudsql.database.mysql.connections_count** <br>(count) | 마지막 샘플링 이후 MySQL 서버에 연결 시도 횟수(성공 또는 실패).|
| **gcp.cloudsql.database.mysql.ddl_operations_count** <br>(count) | 마지막 샘플링 이후 MySQL DDL 작업.|
| **gcp.cloudsql.database.mysql.dml_operations_count** <br>(count) | 마지막 샘플링 이후 MySQL DML 작업.|
| **gcp.cloudsql.database.mysql.handler_operations_count** <br>(count) | 마지막 샘플링 이후 MySQL 핸들러 작업.|
| **gcp.cloudsql.database.mysql.innodb.active_transactions** <br>(gauge) | 활성 트랜잭션(처리 중인 트랜잭션) 세부 정보 수로, 괄호 안의 값은 `innodb_transaction_state` (`Total/running/lock_wait/rolling_back/committing`)를 뜻합니다.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_longest_time** <br>(gauge) | 현재 활성화된 InnoDB 트랜잭션 중 가장 긴 트랜잭션 시간.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_rows_locked** <br>(gauge) | 현재 활성화된 InnoDB 트랜잭션으로 인해 잠긴 행의 수.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_rows_modified** <br>(gauge) | 현재 활성화된 InnoDB 트랜잭션으로 인해 수정된 행의 수.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_total_time** <br>(gauge) | 현재 활성화된 InnoDB 트랜잭션의 지속 시간.<br>_second로 표시_ |
| **gcp.cloudsql.database.mysql.innodb.adaptive_hash_operation_count** <br>(count) | 마지막 샘플링 이후 AHI를 유지하기 위해 실행한 총 내부 행 작업(행 추가, 업데이트, 삭제).|
| **gcp.cloudsql.database.mysql.innodb.ahi_search_count** <br>(count) | InnoDB AHI의 총 검색 작업과 마지막 샘플링 이후 해당 작업의 효율성.|
| **gcp.cloudsql.database.mysql.innodb.buffer_flush_sync_waits_count** <br>(count) | 마지막 샘플링 이후 InnoDB가 동기 버퍼 플러시 작업을 수행하며 사용자 트랜잭션을 차단한 횟수.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_pages** <br>(gauge) | InnoDB 버퍼 풀 페이지 수로 innodb_page_type 필드는 각 상태의 InnoDB 페이지 수를 저장합니다.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_read_requests_count** <br>(count) | 마지막 샘플링 이후 InnoDB 버퍼 풀의 논리적 읽기 요청 수.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_reads_count** <br>(count) | 마지막 샘플링 이후 InnoDB가 버퍼 풀에서 충족시킬 수 없어 디스크에서 직접 읽어야 했던 논리적 읽기 수.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_write_requests_count** <br>(count) | 마지막 샘플링 이후 InnoDB 버퍼 풀이 수행한 쓰기 작업 수.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.cache_hit_count** <br>(count) | 이 인스턴스의 데이터 캐시 히트 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.cache_miss_count** <br>(count) | 이 인스턴스의 데이터 캐시 미스 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.pages** <br>(gauge) | Mysqls E+ 데이터 캐시 기능의 InnoDB 페이지 수.|
| **gcp.cloudsql.database.mysql.innodb.data_fsyncs_count** <br>(count) | 마지막 샘플링 이후 InnoDB fsync() 호출 횟수.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_fsyncs** <br>(gauge) | MySQL 서버에서 대기 중인 fsync() 작업의 수.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_reads** <br>(gauge) | MySQL 서버에서 보류 중인 읽기 작업의 수.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_writes** <br>(gauge) | MySQL 서버에서 보류 중인 쓰기 작업의 수.|
| **gcp.cloudsql.database.mysql.innodb.deadlocks_count** <br>(count) | 마지막 샘플링 이후의 데드락 상태.|
| **gcp.cloudsql.database.mysql.innodb.dictionary_memory** <br>(gauge) | InnoDB 딕셔너리 캐시에 할당된 메모리.<br>_byte로 표시됨_ |
| **gcp.cloudsql.database.mysql.innodb.history_list_length** <br>(gauge) | 이전 버전 행의 수정 사항을 저장하는 데 사용되는 undo 로그의 크기를 나타냅니다.|
| **gcp.cloudsql.database.mysql.innodb.ibuf_merge_operation_count** <br>(count) | 마지막 샘플링 이후 변경 버퍼링 작업으로 병합된 레코드 유형의 총 개수.|
| **gcp.cloudsql.database.mysql.innodb.ibuf_merges_count** <br>(count) | 마지막 샘플링 이후 변경 버퍼 병합의 총 횟수. 모든 변경 버퍼 작업의 효율성을 나타냅니다.|
| **gcp.cloudsql.database.mysql.innodb.innodb_log_waits_count** <br>(count) | InnoDB 로그 버퍼의 여유 공간이 확보될 때까지 대기한 트랜잭션의 총 수로, innodb_log_buffer_size 구성을 조정하는 데 도움이 됩니다.|
| **gcp.cloudsql.database.mysql.innodb.lock_timeout_count** <br>(count) | 마지막 샘플링 이후의 행 락(lock) 대기 타임아웃 횟수.|
| **gcp.cloudsql.database.mysql.innodb.lsn** <br>(gauge) | InnoDB current/flushed/last_checkpoint 로그 시퀀스 번호 값.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.innodb.operation_disk_io_count** <br>(count) | 마지막 샘플링 이후 InnoDB가 수행한 디스크 I/O 작업.|
| **gcp.cloudsql.database.mysql.innodb.os_log_fsyncs_count** <br>(count) | 마지막 샘플링 이후 로그 파일의 InnoDB fsync() 호출 횟수.|
| **gcp.cloudsql.database.mysql.innodb.os_log_pending_fsyncs** <br>(gauge) | MySQL 서버에서 InnoDB redo 로그 파일에 대기 중인 fsync() 작업의 수.|
| **gcp.cloudsql.database.mysql.innodb.os_log_pending_writes** <br>(gauge) | MySQL 서버에서 InnoDB redo 로그 파일에 대기 중인 쓰기 작업의 수.|
| **gcp.cloudsql.database.mysql.innodb.pages_read_count** <br>(count) | 마지막 샘플링 이후 InnoDB 페이지 읽기 수.|
| **gcp.cloudsql.database.mysql.innodb.pages_written_count** <br>(count) | 마지막 샘플링 이후 InnoDB 페이지 쓰기 수.|
| **gcp.cloudsql.database.mysql.innodb.row_lock_time** <br>(gauge) | InnoDB 테이블의 행 락(lock) 획득에 소요된 총 시간.<br>_ millisecond로 표시됨_ |
| **gcp.cloudsql.database.mysql.innodb.row_lock_waits_count** <br>(count) | 마지막 샘플링 이후 InnoDB 테이블에서 행 락(lock)을 대기한 작업 횟수.|
| **gcp.cloudsql.database.mysql.innodb.row_operations_count** <br>(count) | InnoDB 행 작업.|
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_dirty** <br>(gauge) | InnoDB 버퍼 풀에서 아직 플러시되지 않은 페이지의 수.<br>_page로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_free** <br>(gauge) | InnoDB 버퍼 풀에서 사용되지 않은 페이지의 수.<br>_page로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_total** <br>(gauge) | InnoDB 버퍼 풀 페이지의 총 수.<br>_page로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_data_fsyncs** <br>(count) | InnoDB fsync 호출 횟수.<br>_operation으로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_os_log_fsyncs** <br>(count) | 로그 파일의 InnoDB fsync 호출 횟수.<br>_operation으로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_pages_read** <br>(count) | InnoDB 페이지 읽기 수.<br>_page로 표시_ |
| **gcp.cloudsql.database.mysql.innodb_pages_written** <br>(count) | InnoDB 페이지 쓰기 수.<br>_page로 표시_ |
| **gcp.cloudsql.database.mysql.max_connections** <br>(gauge) | MySQL max_connections 구성 값.|
| **gcp.cloudsql.database.mysql.memory.by_code_area** <br>(gauge) | 각 코드 영역에 할당된 메모리로 MySQL performance_schema에서 보고합니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.memory.by_event** <br>(gauge) | 각 이벤트에 할당된 메모리로, performance_schema에서 보고합니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.memory.global** <br>(gauge) | 총 할당된 메모리로, performance_schema에서 보고합니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.open_table_definitions** <br>(gauge) | 현재 캐시된 테이블 정의의 수.|
| **gcp.cloudsql.database.mysql.open_tables** <br>(gauge) | 현재 열려 있는 테이블 수.|
| **gcp.cloudsql.database.mysql.opened_table_count** <br>(count) | 마지막 샘플링 이후 열린 테이블의 수.|
| **gcp.cloudsql.database.mysql.opened_table_definitions_count** <br>(count) | 마지막 샘플링 이후 캐시된 테이블 정의의 수.|
| **gcp.cloudsql.database.mysql.queries** <br>(count) | 서버에서 실행된 쿼리 문의 수.<br>_query로 표시_ |
| **gcp.cloudsql.database.mysql.questions** <br>(count) | 서버에서 실행된 질의 문 수. 클라이언트가 서버로 전송한 문만 포함하며, 저장된 프로그램 내에서 실행된 문은 포함하지 않습니다.<br>_question으로 표시_ |
| **gcp.cloudsql.database.mysql.received_bytes_count** <br>(count) | MySQL 프로세스가 수신한 바이트 수의 델타 값.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.replication.last_io_errno** <br>(gauge) | I/O 스레드를 중지하게 한 가장 최근 오류의 오류 번호.<br>_second로 표시_ |
| **gcp.cloudsql.database.mysql.replication.last_sql_errno** <br>(gauge) | SQL 스레드를 중지하게 한 가장 최근 오류의 오류 번호.<br>_second로 표시_ |
| **gcp.cloudsql.database.mysql.replication.seconds_behind_master** <br>(gauge) | 읽기 복제본이 마스터보다 지연된 근사 시간(초).<br>_second로 표시_ |
| **gcp.cloudsql.database.mysql.replication.slave_io_running** <br>(gauge) | 마스터의 바이너리 로그를 읽는 I/O 스레드가 실행 중인지 여부를 나타냅니다. 가능한 값은 Yes, No, Connecting입니다.|
| **gcp.cloudsql.database.mysql.replication.slave_io_running_state** <br>(gauge) | 마스터의 바이너리 로그를 읽는 I/O 스레드가 실행 중인지 여부를 나타냅니다. 가능한 값은 Yes, No, Connecting이며, 'state' 필드를 통해 노출됩니다.|
| **gcp.cloudsql.database.mysql.replication.slave_sql_running** <br>(gauge) | 릴레이 로그에서 이벤트를 실행하는 SQL 스레드가 실행 중인지 여부를 나타냅니다.|
| **gcp.cloudsql.database.mysql.replication.slave_sql_running_state** <br>(gauge) | 릴레이 로그에서 이벤트를 실행하는 SQL 스레드가 실행 중인지 여부를 나타냅니다. 값은 'state' 필드를 통해 노출됩니다.|
| **gcp.cloudsql.database.mysql.sent_bytes_count** <br>(count) | MySQL 프로세스가 전송한 바이트 수의 델타값.<br>_byte로 표시_ |
| **gcp.cloudsql.database.mysql.slow_queries_count** <br>(count) | long_query_time 초보다 오래 걸린 총 쿼리 수.|
| **gcp.cloudsql.database.mysql.thread_cache_size** <br>(gauge) | MySQL `thread_cache_size` 구성의 값.|
| **gcp.cloudsql.database.mysql.thread_state** <br>(gauge) | `information_schema.processlist` 테이블을 쿼리하여 스레드를 실행 중인 상태로, 해당 정보는 락(lock) 또는 경합 문제를 이해하는 데 도움이 됩니다.|
| **gcp.cloudsql.database.mysql.threads** <br>(gauge) | 스레드 수입니다. `threads_cached`는 스레드 캐시에 있는 스레드를, `threads_connected`는 현재 열려 있는 연결을, `threads_running`는 대기 상태가 아닌 스레드를 나타냅니다.|
| **gcp.cloudsql.database.mysql.threads_created_count** <br>(count) | 마지막 샘플링 이후 연결을 처리하기 위해 생성된 스레드입니다.|
| **gcp.cloudsql.database.mysql.tmp_disk_tables_created_count** <br>(count) | 마지막 샘플링 이후 문을 실행하는 동안 MySQL 서버에서 생성한 내부 온디스크 임시 테이블입니다.|
| **gcp.cloudsql.database.mysql.tmp_files_created_count** <br>(count) | 마지막 샘플링 이후 MySQL 서버에서 생성한 임시 파일.|
| **gcp.cloudsql.database.mysql.tmp_tables_created_count** <br>(count) | 마지막 샘플링 이후 생성된 MySQL 임시 파일.|
| **gcp.cloudsql.database.network.connections** <br>(gauge) | Cloud SQL 인스턴스에 대한 연결 수.<br>_connection으로 표시_ |
| **gcp.cloudsql.database.network.received_bytes_count** <br>(count) | 네트워크를 통해 수신된 바이트 수의 델타 값.<br>_byte로 표시_ |
| **gcp.cloudsql.database.network.sent_bytes_count** <br>(count) | 네트워크를 통해 전송된 바이트 수.<br>_byte로 표시_ |
| **gcp.cloudsql.database.postgresql.backends_in_wait** <br>(gauge) | Postgres 인스턴스에서 대기 상태인 백엔드 수.<br>_connection으로 표시_ |
| **gcp.cloudsql.database.postgresql.blocks_read_count** <br>(count) | 이 데이터베이스에서 읽은 디스크 블록 수. 소스 필드는 실제 디스크 읽기와 버퍼 캐시 읽기를 구분합니다.|
| **gcp.cloudsql.database.postgresql.data_cache.hit_count** <br>(count) | 이 인스턴스에 대한 데이터 캐시 히트 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.postgresql.data_cache.hit_ratio** <br>(gauge) | 이 인스턴스에서 데이터 캐시 히트 읽기 작업의 비율.|
| **gcp.cloudsql.database.postgresql.data_cache.miss_count** <br>(count) | 이 인스턴스에 대한 데이터 캐시 미스 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.postgresql.deadlock_count** <br>(count) | 이 데이터베이스에서 감지된 데드락 발생 건 수.|
| **gcp.cloudsql.database.postgresql.external_sync.initial_sync_complete** <br>(gauge) | Postgres External Server (ES) 복제본의 모든 데이터베이스가 초기 동기화를 완료하고 소스에서 변경 사항을 복제하고 있는지 여부를 나타냅니다.|
| **gcp.cloudsql.database.postgresql.external_sync.max_replica_byte_lag** <br>(gauge) | Postgres External Server (ES) 복제의 복제 지연량(바이트). 복제본의 모든 DB에서 집계됩니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.execution_time** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 실행 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.io_time** <br>(gauge) | 데이터베이스별 사용자당 누적 I/O 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.avg** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 지연 시간 분포의 평균.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.p95** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 지연 시간 분포의 95번째 백분위수.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.p99** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 지연 시간 분포의 99번째 백분위수.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.samplecount** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 지연 시간 분포의 샘플 수.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.sumsqdev** <br>(gauge) | 데이터베이스별 사용자당 누적 쿼리 지연 시간 분포의 제곱 편차합.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.lock_time** <br>(gauge) | 데이터베이스별 사용자당 누적 락(lock) 대기 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.row_count** <br>(count) | 데이터베이스당 검색되거나 영향을 받은 누적 행 수.|
| **gcp.cloudsql.database.postgresql.insights.aggregate.shared_blk_access_count** <br>(count) | 문 실행으로 액세스한 공유 블록의 누적 수.|
| **gcp.cloudsql.database.postgresql.insights.perquery.execution_time** <br>(gauge) | 사용자별, 데이터베이스별, 쿼리별 누적 실행 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.io_time** <br>(gauge) | 쿼리별 사용자당 누적 I/O 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.latencies** <br>(gauge) | 쿼리별 사용자당 쿼리 지연 시간 분포.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.lock_time** <br>(gauge) | 쿼리별 사용자당 누적 락(lock) 대기 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.row_count** <br>(count) | 쿼리당 검색되거나 영향을 받은 누적 행 수.|
| **gcp.cloudsql.database.postgresql.insights.perquery.shared_blk_access_count** <br>(count) | 쿼리당 문 실행으로 액세스한 공유 블록의 누적 수.|
| **gcp.cloudsql.database.postgresql.insights.pertag.execution_time** <br>(gauge) | 사용자별, 데이터베이스별, 태그별 누적 실행 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.io_time** <br>(gauge) | 사용자별, 데이터베이스별, 태그별 누적 I/O 작성 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.latencies** <br>(gauge) | 사용자별, 데이터베이스별, 태그별 쿼리 지연 시간 분포.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.lock_time** <br>(gauge) | 사용자별, 데이터베이스별, 태그별 누적 락(lock) 대기 시간.<br>_microsecond로 표시_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.row_count** <br>(count) | 검색되거나 영향을 받은 누적 행 수|
| **gcp.cloudsql.database.postgresql.insights.pertag.shared_blk_access_count** <br>(count) | 문 실행으로 액세스한 공유 블록의 누적 수.|
| **gcp.cloudsql.database.postgresql.new_connection_count** <br>(count) | Postgres 인스턴스에 추가된 신규 연결의 수.|
| **gcp.cloudsql.database.postgresql.num_backends** <br>(gauge) | Cloud SQL PostgreSQL 인스턴스에 대한 연결 수.<br>_connection으로 표시_ |
| **gcp.cloudsql.database.postgresql.num_backends_by_application** <br>(gauge) | 애플리케이션별로 그룹화된, Cloud SQL PostgreSQL 인스턴스 연결 수.<br>_connection으로 표시_ |
| **gcp.cloudsql.database.postgresql.num_backends_by_state** <br>(gauge) | 상태별로 그룹화된, Cloud SQL PostgreSQL 인스턴스 연결 수.<br>_connection으로 표시_ |
| **gcp.cloudsql.database.postgresql.replication.replica_byte_lag** <br>(gauge) | 복제본 지연량(바이트).<br>_byte로 표시_ |
| **gcp.cloudsql.database.postgresql.statements_executed_count** <br>(count) | PostgreSQL 인스턴스에서 실행된 문의 총 수.|
| **gcp.cloudsql.database.postgresql.temp_bytes_written_count** <br>(count) | 데이터베이스당 쿼리가 임시 파일에 기록한 총 데이터 양(바이트).|
| **gcp.cloudsql.database.postgresql.temp_files_written_count** <br>(count) | Join 또는 Sort와 같은 알고리즘을 실행하는 동안 데이터 작성에 사용되는 임시 파일의 총 수.|
| **gcp.cloudsql.database.postgresql.transaction_count** <br>(count) | 트랜잭션 수의 델타 값.<br>_transaction으로 표시됨_ |
| **gcp.cloudsql.database.postgresql.transaction_id_count** <br>(count) | 트랜잭션 ID 수의 델타 값. 'action' 태그는 작업 유형을 나타내며, 이는 `assigned`(인스턴스에 할당되고 사용된 트랜잭션 ID 수) 또는 `frozen`(VACUUM freeze 작업으로 재공급된 트랜잭션 ID 수) 중 하나입니다.|
| **gcp.cloudsql.database.postgresql.transaction_id_utilization** <br>(gauge) | Cloud SQL PostgreSQL 인스턴스에서 사용된 트랜잭션 ID의 현재 사용률(퍼센트). 값은 일반적으로 0.0~1.0 사이의 숫자로 표시되며, 차트에서는 0%~100% 사이의 퍼센트 값으로 표시됩니다.|
| **gcp.cloudsql.database.postgresql.tuple_size** <br>(gauge) | 데이터베이스의 튜플(행) 수.|
| **gcp.cloudsql.database.postgresql.tuples_fetched_count** <br>(count) | PostgreSQL 인스턴스에서 데이터베이스당 쿼리의 결과로 불러온 행의 총 수.|
| **gcp.cloudsql.database.postgresql.tuples_processed_count** <br>(count) | 특정 데이터베이스에서 insert, update, delete 등의 작업으로 처리된 튜플(행)의 수.|
| **gcp.cloudsql.database.postgresql.tuples_returned_count** <br>(count) | PostgreSQL 인스턴스에서 데이터베이스당 쿼리 처리 중 스캔된 행의 총 수.|
| **gcp.cloudsql.database.postgresql.vacuum.oldest_transaction_age** <br>(gauge) | Cloud SQL PostgreSQL 인스턴스에서 아직 vacuum 처리되지 않은 가장 오래된 트랜잭션의 연령(age)입니다. 가장 오래된 트랜잭션 이후 발생한 트랜잭션 수로 측정합니다.|
| **gcp.cloudsql.database.replication.log_archive_failure_count** <br>(count) | 복제 로그 파일 아카이브 시도 실패 횟수.|
| **gcp.cloudsql.database.replication.log_archive_success_count** <br>(count) | 복제 로그 파일 아카이브 시도 성공 횟수.|
| **gcp.cloudsql.database.replication.network_lag** <br>(gauge) | 프라이머리 바이너리 로그에서 복제본의 I/O 스레드까지 도달하는 시간을 나타냅니다.<br>_second로 표시_ |
| **gcp.cloudsql.database.replication.replica_lag** <br>(gauge) | 읽기 복제본이 프라이머리보다 지연되는 시간(초).<br>_second로 표시_ |
| **gcp.cloudsql.database.replication.state** <br>(gauge) | 복제의 현재 서비스 상태입니다.|
| **gcp.cloudsql.database.sqlserver.audits_size** <br>(gauge) | 인스턴스에 저장된 SQLServer 감사 파일의 크기(바이트)를 추적합니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.audits_upload_count** <br>(count) | SQLServer 감사 파일이 GCS 버킷에 업로드된 총 횟수와 업로드 성공 여부를 카운트합니다.|
| **gcp.cloudsql.database.sqlserver.connections.connection_reset_count** <br>(count) | SQL Server 서비스를 마지막으로 재시작한 이후 연결 풀에서 시작된 총 로그인 횟수.|
| **gcp.cloudsql.database.sqlserver.connections.login_attempt_count** <br>(count) | SQL Server 서비스를 마지막으로 재시작한 이후 총 로그인 시도 횟수. 풀링된 연결은 포함하지 않습니다.|
| **gcp.cloudsql.database.sqlserver.connections.logout_count** <br>(count) | SQL Server 서비스를 마지막으로 재시작한 이후 로그아웃 작업의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.connections.processes_blocked** <br>(gauge) | 현재 차단된 프로세스 수.|
| **gcp.cloudsql.database.sqlserver.data_cache.hit_count** <br>(count) | 이 인스턴스에 대한 데이터 캐시 히트 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.data_cache.hit_ratio** <br>(gauge) | 이 인스턴스의 데이터 캐시 히트 읽기 작업의 성공률.|
| **gcp.cloudsql.database.sqlserver.data_cache.miss_count** <br>(count) | 이 인스턴스에 대한 데이터 캐시 미스 읽기 작업의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.databases** <br>(gauge) | 시스템 데이터베이스를 제외한 인스턴스의 현재 데이터베이스 수.|
| **gcp.cloudsql.database.sqlserver.external_sync.primary_to_replica_connection_health** <br>(gauge) | 프라이머리에서 복제본으로 복제 업데이트를 푸시할 수 있는 연결이 있는지 여부를 나타냅니다.|
| **gcp.cloudsql.database.sqlserver.memory.buffer_cache_hit_ratio** <br>(gauge) | 버퍼 캐시에서 디스크를 읽지 않고 찾은 페이지의 현재 비율. 해당 비율은 총 캐시 히트 수를 총 캐시 조회 수로 나눈 값입니다.<br>_percent로 표시_ |
| **gcp.cloudsql.database.sqlserver.memory.checkpoint_page_count** <br>(count) | 체크포인트나 모든 더티 페이지를 플러시하는 기타 작업으로 인해 디스크로 플러시된 페이지의 총 수.|
| **gcp.cloudsql.database.sqlserver.memory.free_list_stall_count** <br>(count) | 사용 가능한 페이지가 확보될 때까지 대기한 요청의 총 수.|
| **gcp.cloudsql.database.sqlserver.memory.lazy_write_count** <br>(count) | 버퍼 관리자의 Lazy Writer가 기록한 버퍼의 총 수. Lazy Writer는 오래된 더티 버퍼(다른 페이지에 재사용되기 전에 디스크에 반드시 다시 기록해야 하는 변경 내용을 포함한 버퍼)를 일괄 플러시하여 사용자 프로세스가 사용할 수 있도록 하는 시스템 프로세스입니다.|
| **gcp.cloudsql.database.sqlserver.memory.memory_grants_pending** <br>(gauge) | 워크스페이스 메모리 할당을 기다리는 현재 프로세스 수.|
| **gcp.cloudsql.database.sqlserver.memory.page_life_expectancy** <br>(gauge) | 현재 버퍼 풀에서 페이지가 참조되지 않은 상태로 유지되는 시간(초).<br>_second로 표시_ |
| **gcp.cloudsql.database.sqlserver.memory.page_operation_count** <br>(count) | 물리적 데이터베이스 페이지의 읽기 또는 쓰기 작업의 총 횟수. 이 통계치는 모든 데이터베이스에서 물리적 페이지 읽기 또는 쓰기 작업을 집계합니다.|
| **gcp.cloudsql.database.sqlserver.replication.bytes_sent_to_replica_count** <br>(count) | 원격 가용성 복제본로 전송된 총 바이트 수. 비동기 복제본의 경우 압축 전, 동기화 복제본의 경우 압축하지 않은 바이트 수입니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.replication.log_apply_pending_queue** <br>(gauge) | 현재 모든 데이터베이스 복제본에 적용 대기 중인 로그 블록의 수.|
| **gcp.cloudsql.database.sqlserver.replication.log_bytes_received_count** <br>(count) | 모든 데이터베이스에 보조 복제본이 수신한 로그 레코드의 총량.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.replication.recovery_queue** <br>(gauge) | 보조 복제본 로그 파일에서 아직 재실행(redo)되지 않은 로그 레코드의 현재 용량(킬로바이트).<br>_kilobyte로 표시_ |
| **gcp.cloudsql.database.sqlserver.replication.redone_bytes_count** <br>(count) | 모든 보조 데이터베이스에서 재실행(redo)된 로그 레코드의 총량.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.replication.resent_message_count** <br>(count) | 재전송된 Always On 메시지의 총 개수. 재전송 메시지는 전송을 시도했지만 전송이 완료되지 않아 다시 전송해야 하는 메시지입니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.active_workers** <br>(gauge) | 현재 활성 상태인 워커 수. 활성 워커는 선점할 수 없으며, 관련 작업이 있고 실행 중, 실행 대기 중, 또는 일시 중단된 상태여야 합니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.by_status** <br>(gauge) | 현재 특정 상태를 보고하는 스케줄러의 수.|
| **gcp.cloudsql.database.sqlserver.schedulers.current_tasks** <br>(gauge) | 스케줄러와 연결된 현재 작업의 수. 해당 카운트에는 워커가 실행하기를 기다리는 작업과 현재 대기 중이거나 실행 중인 작업(SUSPENDED 또는 RUNNABLE 상태)이 포함됩니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.current_workers** <br>(gauge) | 스케줄러에 연결된 현재 워커 수. 작업이 할당되지 않은 워커도 포함됩니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.pending_disk_io** <br>(gauge) | 완료 대기 중인 대기 I/O의 현재 수. 각 스케줄러는 컨텍스트 스위치마다 완료 여부를 확인하는 대기 I/O 목록이 있습니다. 해당 카운트는 요청 삽입 시 증가, 요청 완료 시 감소합니다. 이 수치는 I/O 상태를 나타내지 않습니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.runnable_tasks** <br>(gauge) | 실행 대기열에서 스케줄링을 기다리는 워커의 현재 수로, 해당 워커들은 작업이 할당된 상태입니다.|
| **gcp.cloudsql.database.sqlserver.schedulers.work_queue** <br>(gauge) | 보류 대기열에 있는 현재 작업 수. 워커가 작업을 선택하기를 기다리는 상태입니다.|
| **gcp.cloudsql.database.sqlserver.server_principals** <br>(gauge) | 인스턴스의 현재 서버 주체의 수.|
| **gcp.cloudsql.database.sqlserver.sql_agent.jobs** <br>(gauge) | 인스턴스의 SQL Server 작업의 현재 개수.|
| **gcp.cloudsql.database.sqlserver.transactions.batch_request_count** <br>(count) | 수신된 트랜잭션-SQL 명령 배치의 총 수.|
| **gcp.cloudsql.database.sqlserver.transactions.deadlock_count** <br>(count) | 데드락(deadlock)을 유발한 락(lock) 요청의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.transactions.forwarded_record_count** <br>(count) | 포워드 레코드 포인터를 통해 불러온 레코드의 총 수.|
| **gcp.cloudsql.database.sqlserver.transactions.full_scan_count** <br>(count) | 무제한 전체 스캔의 총 횟수. 기본 테이블 또는 전체 인덱스 스캔일 수 있습니다.|
| **gcp.cloudsql.database.sqlserver.transactions.lock_wait_count** <br>(count) | 호출자가 대기해야 했던 락(lock) 요청의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.transactions.lock_wait_time** <br>(count) | 락(lock) 요청 승인까지 대기한 총 시간.<br>_millisecond로 표시_ |
| **gcp.cloudsql.database.sqlserver.transactions.log_bytes_flushed_count** <br>(count) | 플러시된 총 로그 바이트 수.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.transactions.page_split_count** <br>(count) | 인덱스 페이지가 오버플로되어 발생한 페이지 분할의 총 개수.|
| **gcp.cloudsql.database.sqlserver.transactions.probe_scan_count** <br>(count) | 인덱스 또는 기본 테이블에서 조건에 맞는 최대 하나의 행을 찾기 위해 사용한 프로브 스캔의 총 횟수.|
| **gcp.cloudsql.database.sqlserver.transactions.sql_compilation_count** <br>(count) | SQL 컴파일 총 횟수.|
| **gcp.cloudsql.database.sqlserver.transactions.sql_recompilation_count** <br>(count) | SQL 재컴파일 총 횟수.|
| **gcp.cloudsql.database.sqlserver.transactions.transaction_count** <br>(count) | 시작된 총 트랜잭션 수.|
| **gcp.cloudsql.database.sqlserver.xevents_size** <br>(gauge) | 인스턴스에 저장된 SQLServer XEvents 파일의 크기(바이트)를 추적합니다.<br>_byte로 표시_ |
| **gcp.cloudsql.database.sqlserver.xevents_upload_count** <br>(count) | SQLServer XEvents 파일이 GCS 버킷에 업로드된 총 횟수와 업로드 성공 여부를 카운트합니다.|
| **gcp.cloudsql.database.swap.bytes_used** <br>(gauge) | 데이터베이스 컨테이너가 사용하는 스왑 공간.<br>_byte로 표시_ |
| **gcp.cloudsql.database.swap.pages_swapped_in_count** <br>(count) | 시스템 부팅 후 디스크에서 스왑 인(swap-in)된 총 페이지 수.<br>_byte로 표시_ |
| **gcp.cloudsql.database.swap.pages_swapped_out_count** <br>(count) | 시스템 부팅 후 디스크에서 스왑 아웃(swap-out)된 총 페이지 수.<br>_byte로 표시_ |
| **gcp.cloudsql.database.up** <br>(gauge) | 서버가 가동 중인지 여부를 나타냅니다.|
| **gcp.cloudsql.database.uptime** <br>(gauge) | 인스턴스가 실행된 시간(초).<br>_second로 표시_ |
| **gcp.cloudsql.per_database.postgresql.external_sync.initial_sync_complete** <br>(gauge) | 외부 서버(ES) 복제본에 있는 각 데이터베이스의 마이그레이션 단계. 외부 서버에서 복제 중인 인스턴스에만 적용됩니다.|
| **gcp.cloudsql.per_database.postgresql.external_sync.replication_byte_lag** <br>(gauge) | 외부 서버(ES) 복제본에 있는 각 데이터베이스의 복제 지연량(바이트). 외부 서버에 복제 중인 인스턴스에만 적용됩니다.|

### 이벤트

Google Cloud SQL 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**gcp.cloudsql.database.state**
Cloud SQL 인스턴스의 현재 서비스 상태입니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.