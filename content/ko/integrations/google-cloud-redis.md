---
aliases:
- /ko/integrations/google_cloud_redis
app_id: google-cloud-redis
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: integration
description: 확장 가능하고 안전하며 고가용성 인프라스트럭처에서 제공되는 관리형 인메모리 데이터 저장소 서비스.
media: []
title: Google Cloud Redis
---
## 개요

Redis용 Google Cloud Memorystore는 확장 가능하고 안전하며 가용성 높은 인프라스트럭처에 구축된 완전관리형 인메모리 데이터 스토어 서비스를 제공합니다.

Datadog Google Cloud Platform 통합을 사용하여 Redis용 Google Cloud Memorystore에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Memorystore for Redis 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Memorystore Redis 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Memorystore for Redis 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.redis.clients.blocked** <br>(gauge) | 차단된 클라이언트 수.|
| **gcp.redis.clients.connected** <br>(gauge) | 클라이언트 연결 수.<br>_connection으로 표시_ |
| **gcp.redis.cluster.clients.average_connected_clients** <br>(gauge) | 클러스터 전체의 평균 현재 클라이언트 연결 수.|
| **gcp.redis.cluster.clients.maximum_connected_clients** <br>(gauge) | 클러스터 전체의 최대 현재 클라이언트 연결 수.|
| **gcp.redis.cluster.clients.total_connected_clients** <br>(gauge) | 이 클러스터의 현재 클라이언트 연결 수.|
| **gcp.redis.cluster.commandstats.total_calls_count** <br>(count) | Redis 명령 수.|
| **gcp.redis.cluster.commandstats.total_usec_count** <br>(count) | 명령당 총 소요 시간.<br>_microsecond로 표시_ |
| **gcp.redis.cluster.cpu.average_utilization** <br>(gauge) | 클러스터 전체의 평균 CPU 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.cpu.maximum_utilization** <br>(gauge) | 클러스터 전체의 최대 CPU 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.cross_cluster_replication.secondary_average_replication_offset_diff** <br>(gauge) | 기본 샤드(shard)와 보조 샤드(shard) 간의 평균 복제 오프셋의 차이.<br>_byte로 표시_ |
| **gcp.redis.cluster.cross_cluster_replication.secondary_maximum_replication_offset_diff** <br>(gauge) | 기본 샤드(shard)와 보조 샤드(shard) 간의 최대 복제 오프셋의 차이.<br>_byte로 표시_ |
| **gcp.redis.cluster.cross_cluster_replication.secondary_replication_links** <br>(gauge) | 기본 클러스터와 보조 클러스터 간의 복제 링크 수.|
| **gcp.redis.cluster.keyspace.total_keys** <br>(gauge) | 클러스터 인스턴스에 저장된 키의 수.|
| **gcp.redis.cluster.memory.average_utilization** <br>(gauge) | 클러스터 전체의 평균 메모리 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.memory.maximum_utilization** <br>(gauge) | 클러스터 전체의 최대 메모리 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.memory.size** <br>(gauge) | 클러스터 메모리 크기.<br>_byte로 표시됨_ |
| **gcp.redis.cluster.memory.total_used_memory** <br>(gauge) | 클러스터 메모리 총 사용량.<br>_byte로 표시됨_ |
| **gcp.redis.cluster.node.clients.blocked_clients** <br>(gauge) | 이 클러스터 노드가 차단한 클라이언트 연결 수.|
| **gcp.redis.cluster.node.clients.connected_clients** <br>(gauge) | 이 클러스터 노드에 연결된 클라이언트 수.|
| **gcp.redis.cluster.node.commandstats.calls_count** <br>(count) | 1분 동안 클러스터 노드에서 해당 명령에 발생한 총 호출 수.|
| **gcp.redis.cluster.node.commandstats.usec_count** <br>(count) | 해당 클러스터 노드에서 명령당 소요된 총 시간.<br>_microsecond로 표시_ |
| **gcp.redis.cluster.node.cpu.utilization** <br>(gauge) | 해당 클러스터 노드의 CPU 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.node.cross_cluster_replication.follower_replication_offset_diff** <br>(gauge) | 복제 노드가 보고한, 해당 복제 노드와 그 팔로워 노드 간의 복제 오프셋 차이(바이트)<br>_byte로 표시_ |
| **gcp.redis.cluster.node.cross_cluster_replication.role** <br>(gauge) | 해당 노드의 클러스터간 복제 역할.|
| **gcp.redis.cluster.node.keyspace.total_keys** <br>(gauge) | 클러스터 노드에 저장된 키의 수.|
| **gcp.redis.cluster.node.memory.usage** <br>(gauge) | 클러스터 노드의 메모리 총 사용량.<br>_byte로 표시_ |
| **gcp.redis.cluster.node.memory.utilization** <br>(gauge) | 해당 클러스터 노드의 메모리 사용률(0.0~1.0 사이의 값).|
| **gcp.redis.cluster.node.persistence.aof_fsync_errors_count** <br>(count) | 클러스터 노드에서 발생한 AOF fsync 오류 수.|
| **gcp.redis.cluster.node.persistence.aof_fsync_lag** <br>(gauge) | 클러스터 노드의 메모리와 영구 저장소 간의 AOF 지연.<br>_second로 표시_ |
| **gcp.redis.cluster.node.persistence.aof_last_bgrewrite_status** <br>(gauge) | 클러스터 노드에서 마지막 AOF bgrewrite 작업이 성공했는지 여부를 나타냅니다.|
| **gcp.redis.cluster.node.persistence.aof_last_write_status** <br>(gauge) | 클러스터 노드에서 마지막 AOF 쓰기 작업이 성공했는지 여부를 나타냅니다.|
| **gcp.redis.cluster.node.persistence.aof_rewrites_count** <br>(count) | 클러스터 노드의 AOF 재작성 횟수.|
| **gcp.redis.cluster.node.persistence.auto_restore_count** <br>(count) | 클러스터 노드의 덤프 파일에서 복구한 횟수.|
| **gcp.redis.cluster.node.persistence.current_save_keys_total** <br>(gauge) | 현재 저장 작업 시작 시점의 키 수.|
| **gcp.redis.cluster.node.persistence.rdb_bgsave_in_progress** <br>(gauge) | 클러스터 노드에서 현재 RDB BGSAVE가 진행 중인지 여부를 나타냅니다.|
| **gcp.redis.cluster.node.persistence.rdb_last_bgsave_status** <br>(gauge) | 클러스터 노드에서 마지막 BGSAVE 작업이 성공했는지 여부를 나타냅니다.|
| **gcp.redis.cluster.node.persistence.rdb_last_save_age** <br>(gauge) | 마지막으로 성공한 스냅샷 이후 경과된 시간을 초 단위로 측정합니다.<br>_second로 표시_ |
| **gcp.redis.cluster.node.persistence.rdb_next_save_time_until** <br>(gauge) | 다음 스냅샷까지 남은 시간을 초 단위로 측정합니다.<br>_second로 표시_ |
| **gcp.redis.cluster.node.persistence.rdb_saves_count** <br>(count) | 클러스터 노드에서 발생한 RDB 저장 수.|
| **gcp.redis.cluster.node.replication.offset** <br>(gauge) | 클러스터 노드의 복제 오프셋 바이트를 측정합니다.<br>_byte로 표시_ |
| **gcp.redis.cluster.node.server.uptime** <br>(gauge) | 클러스터 노드의 업타임을 측정합니다.<br>_second로 표시_ |
| **gcp.redis.cluster.node.stats.connections_received_count** <br>(count) | 클러스터 노드에서 지난 1분 동안 생성된 총 클라이언트 연결 수.|
| **gcp.redis.cluster.node.stats.evicted_keys_count** <br>(count) | 클러스터 노드에서 삭제된 키의 수.|
| **gcp.redis.cluster.node.stats.expired_keys_count** <br>(count) | 클러스터 노드에서 발생한 키 만료 이벤트의 수.|
| **gcp.redis.cluster.node.stats.keyspace_hits_count** <br>(count) | 클러스터 노드에서 키 조회에 성공한 횟수.|
| **gcp.redis.cluster.node.stats.keyspace_misses_count** <br>(count) | 클러스터 노드에서 키 조회에 실패한 횟수.|
| **gcp.redis.cluster.node.stats.net_input_bytes_count** <br>(count) | 클러스터 노드가 수신한 수신 네트워크 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.cluster.node.stats.net_output_bytes_count** <br>(count) | 클러스터 노드에서 전송한 발신 네트워크 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.cluster.node.stats.rejected_connections_count** <br>(count) | 클러스터 노드의 maxclients 제한으로 인해 거부된 연결 수.|
| **gcp.redis.cluster.persistence.aof_fsync_lags.avg** <br>(gauge) | 클러스터 전체에서 메모리와 영구 저장소 간의 AOF 지연의 평균 분포.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.aof_fsync_lags.samplecount** <br>(gauge) | 클러스터 전체에서 메모리와 영구 저장소 간의 AOF 지연 분포의 샘플 수.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.aof_fsync_lags.sumsqdev** <br>(gauge) | 클러스터 전체에서 메모리와 영구 저장소 간의 AOF 지연 분포의 제곱 편차합.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.aof_rewrite_count** <br>(count) | 클러스터 전체에서 AOF 재작성 횟수.|
| **gcp.redis.cluster.persistence.rdb_last_success_ages.avg** <br>(gauge) | 클러스터 전체에서 RDB 스냅샷 생성 후 평균 경과 시간.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.rdb_last_success_ages.samplecount** <br>(gauge) | 클러스터 전체에서 RDB 스냅샷 생성 후 경과 시간의 샘플 수.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.rdb_last_success_ages.sumsqdev** <br>(gauge) | 클러스터 전체에서 RDB 스냅샷 생성 후 경과 시간의 제곱 편차합.<br>_second로 표시_ |
| **gcp.redis.cluster.persistence.rdb_saves_count** <br>(count) | 클러스터 전체에서 RDB 저장 횟수.|
| **gcp.redis.cluster.replication.average_ack_lag** <br>(gauge) | 클러스터 전체에서 복제본의 평균 복제 확인(ACK) 지연 시간(초).<br>_second로 표시_ |
| **gcp.redis.cluster.replication.average_offset_diff** <br>(gauge) | 클러스터 전체의 평균 복제 오프셋 차이(바이트).<br>_byte로 표시_ |
| **gcp.redis.cluster.replication.maximum_ack_lag** <br>(gauge) | 클러스터 전체에서 복제본의 최대 복제 확인(ACK) 지연 시간(초).<br>_second로 표시_ |
| **gcp.redis.cluster.replication.maximum_offset_diff** <br>(gauge) | 클러스터 전체의 최대 복제 오프셋 차이(바이트).<br>_byte로 표시_ |
| **gcp.redis.cluster.stats.average_evicted_keys** <br>(gauge) | 메모리 용량으로 인해 삭제된 키의 평균 개수.|
| **gcp.redis.cluster.stats.average_expired_keys** <br>(gauge) | 키 만료 이벤트의 평균 횟수.|
| **gcp.redis.cluster.stats.average_keyspace_hits** <br>(gauge) | 클러스터 전체에서 키 조회에 성공한 평균 횟수.|
| **gcp.redis.cluster.stats.average_keyspace_misses** <br>(gauge) | 클러스터 전체에서 키 조회에 실패한 평균 횟수.|
| **gcp.redis.cluster.stats.maximum_evicted_keys** <br>(gauge) | 메모리 용량으로 인해 삭제된 키의 최대 개수.|
| **gcp.redis.cluster.stats.maximum_expired_keys** <br>(gauge) | 키 만료 이벤트의 최대 횟수.|
| **gcp.redis.cluster.stats.maximum_keyspace_hits** <br>(gauge) | 클러스터 전체에서 키 조회에 성공한 최대 횟수.|
| **gcp.redis.cluster.stats.maximum_keyspace_misses** <br>(gauge) | 클러스터 전체에서 키 조회에 실패한 최대 횟수.|
| **gcp.redis.cluster.stats.total_connections_received_count** <br>(count) | 지난 1분 동안 생성된 클라이언트 연결 수.|
| **gcp.redis.cluster.stats.total_evicted_keys_count** <br>(count) | 메모리 용량으로 인해 삭제된 키의 총 개수.|
| **gcp.redis.cluster.stats.total_expired_keys_count** <br>(count) | 키 만료 이벤트의 총 횟수.|
| **gcp.redis.cluster.stats.total_keyspace_hits_count** <br>(count) | 클러스터 전체에서 키 조회에 성공한 총 횟수.|
| **gcp.redis.cluster.stats.total_keyspace_misses_count** <br>(count) | 클러스터 전체에서 키 조회에 실패한 총 횟수.|
| **gcp.redis.cluster.stats.total_net_input_bytes_count** <br>(count) | 클러스터가 수신한 수신 네트워크 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.cluster.stats.total_net_output_bytes_count** <br>(count) | 클러스터에서 전송한 발신 네트워크 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.cluster.stats.total_rejected_connections_count** <br>(count) | maxclients 제한으로 인해 거부된 클라이언트 연결 수.|
| **gcp.redis.commands.calls** <br>(count) | 이 명령의 총 호출 수.|
| **gcp.redis.commands.total_time** <br>(gauge) | 이 명령이 지난 1초 동안 실행되는 데 걸린 시간(마이크로초).<br>_microsecond로 표시_ |
| **gcp.redis.commands.usec_per_call** <br>(gauge) | 명령별 1분 동안 호출당 소요된 평균 시간.<br>_second로 표시_ |
| **gcp.redis.keyspace.avg_ttl** <br>(gauge) | 이 데이터베이스 키의 평균 TTL.<br>_millisecond로 표시_ |
| **gcp.redis.keyspace.keys** <br>(gauge) | 이 데이터베이스에 저장된 키의 개수.<br>_key로 표시_ |
| **gcp.redis.keyspace.keys_with_expiration** <br>(gauge) | 이 데이터베이스에서 만료 시간이 설정된 키의 개수.<br>_key로 표시_ |
| **gcp.redis.persistence.rdb.bgsave_in_progress** <br>(gauge) | RDB 저장 중임을 나타내는 플래그.|
| **gcp.redis.rdb.enabled** <br>(gauge) | 스냅샷이 RDB 모드인지 여부를 나타냅니다.|
| **gcp.redis.rdb.recovery.attempts_since_last_success** <br>(gauge) | 마지막 복구 시도 성공 이후 복구 시도 횟수를 나타냅니다.|
| **gcp.redis.rdb.recovery.elapsed_time** <br>(gauge) | RDB 스냅샷에서 진행 중인 복구 작업의 경과 시간이 증가하고 있음을 나타냅니다. 0은 복구가 유휴 상태이거나 완료되었음을 의미합니다.<br>_second로 표시_ |
| **gcp.redis.rdb.recovery.estimated_recovery_time** <br>(gauge) | 마지막으로 성공한 스냅샷을 사용하여 복구 시 예상 복구 시간을 나타냅니다.<br>_second로 표시_ |
| **gcp.redis.rdb.recovery.estimated_remaining_time** <br>(gauge) | RDB 스냅샷에서 복구 작업 완료까지 남은 시간을 나타냅니다. 0은 복구가 유휴 상태이거나 완료되었음을 의미합니다.<br>_second로 표시_ |
| **gcp.redis.rdb.recovery.in_progress** <br>(gauge) | RDB 스냅샷에서 복구 작업이 진행 중인지 여부를 나타냅니다. 메트릭 값이 true면 복구가 진행 중입니다.|
| **gcp.redis.rdb.recovery.last_duration** <br>(gauge) | 마지막 스냅샷을 복원하는 데 걸린 시간을 나타냅니다.<br>_second로 표시_ |
| **gcp.redis.rdb.recovery.last_status** <br>(gauge) | 가장 최근 복구 상태를 나타냅니다.|
| **gcp.redis.rdb.recovery.loaded_bytes_count** <br>(count) | 복구 중 로드된 바이트 수를 나타냅니다. 값이 0이면 복구가 활성화되지 않은 상태입니다.<br>_byte로 표시_ |
| **gcp.redis.rdb.recovery.total_bytes_count** <br>(count) | 스냅샷의 크기를 나타냅니다(바이트).<br>_byte로 표시_ |
| **gcp.redis.rdb.snapshot.attempt_count** <br>(count) | 매분 스냅샷 시도 횟수를 나타냅니다.|
| **gcp.redis.rdb.snapshot.elapsed_time** <br>(gauge) | 현재 스냅샷 생성 작업의 경과 시간이 계속 증가함을 나타냅니다.<br>_second로 표시_ |
| **gcp.redis.rdb.snapshot.in_progress** <br>(gauge) | RDB 스냅샷이 진행 중인지 여부를 나타냅니다. 메트릭 값이 true면 RDB 스냅샷이 진행 중입니다.|
| **gcp.redis.rdb.snapshot.last_status** <br>(gauge) | 가장 최근의 스냅샷 시도 상태를 표시합니다.|
| **gcp.redis.rdb.snapshot.last_success_age** <br>(gauge) | 마지막으로 성공한 스냅샷이 시작된 이후 경과된 시간입니다.<br>_second로 표시_ |
| **gcp.redis.rdb.snapshot.last_success_duration** <br>(gauge) | 실패한 시도를 제외하고 마지막으로 성공한 스냅샷을 작성하는 데 필요한 총 시간을 나타냅니다.<br>_second로 표시_ |
| **gcp.redis.rdb.snapshot.time_until_next_run** <br>(gauge) | 다음 예약된 스냅샷까지 남은 시간(초).<br>_second로 표시_ |
| **gcp.redis.replication.master.slaves.lag** <br>(gauge) | 레플리카가 기본보다 지연되는 시간(초).<br>_second로 표시_ |
| **gcp.redis.replication.master.slaves.offset** <br>(gauge) | 복제본이 확인(ACK)한 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.replication.master_repl_offset** <br>(gauge) | 마스터 노드가 생성하여 복제본으로 전송한 바이트 수. 복제본의 복제 바이트 오프셋과 비교할 수 있습니다.<br>_byte로 표시_ |
| **gcp.redis.replication.offset_diff** <br>(gauge) | 복제본으로 아직 복제되지 않은 바이트 수. 마스터 노드의 복제 바이트 오프셋과 복제본의 복제 바이트 오프셋의 차이입니다.<br>_byte로 표시_ |
| **gcp.redis.replication.role** <br>(gauge) | 노드 역할을 나타내는 값을 반환합니다. 1은 마스터 노드, 0은 복제본을 뜻합니다.|
| **gcp.redis.search.attributes** <br>(gauge) | 벡터 검색의 속성 수를 나타냅니다.|
| **gcp.redis.search.background_indexing_in_progress** <br>(gauge) | 백그라운드 인덱싱이 진행 중인지 여부를 나타냅니다. 메트릭 값이 true면 백그라운드 인덱싱이 진행 중입니다.|
| **gcp.redis.search.indexed_hash_keys** <br>(gauge) | 벡터 검색에서 인덱싱된 해시 키의 개수를 나타냅니다.|
| **gcp.redis.search.indexes** <br>(gauge) | 벡터 검색의 인덱스 수를 나타냅니다.|
| **gcp.redis.search.query_requests_count** <br>(count) | 쿼리 요청 횟수를 나타냅니다.|
| **gcp.redis.search.used_memory_bytes** <br>(gauge) | 벡터 검색에서 사용된 메모리를 나타냅니다(바이트).<br>_byte로 표시_ |
| **gcp.redis.server.uptime** <br>(gauge) | 업타임 시간(초).<br>_second로 표시_ |
| **gcp.redis.stats.cache_hit_ratio** <br>(gauge) | 캐시 적중률(분수).|
| **gcp.redis.stats.connections.total** <br>(gauge) | 서버가 수락한 총 연결 수.<br>_connection으로 표시_ |
| **gcp.redis.stats.cpu_utilization** <br>(gauge) | 시스템/사용자 및 부모/자식 관계에 따라 분류된, Redis 서버가 사용한 CPU 사용량(초).<br>_second로 표시_ |
| **gcp.redis.stats.cpu_utilization_main_thread** <br>(count) | 시스템/사용자 공간 및 부모/자식 관계에 따라 분류된, Redis 서버 메인 스레드가 사용한 CPU 초.<br>_second로 표시_ |
| **gcp.redis.stats.evicted_keys** <br>(count) | 최대 메모리 제한으로 인해 삭제된 키의 개수.<br>_key로 표시_ |
| **gcp.redis.stats.expired_keys** <br>(count) | 키 만료 이벤트의 총 횟수.<br>_key로 표시_ |
| **gcp.redis.stats.keyspace_hits** <br>(count) | 메인 딕셔너리에서 키 조회에 성공한 횟수.<br>_key로 표시_ |
| **gcp.redis.stats.keyspace_misses** <br>(count) | 메인 딕셔너리에서 키 조회에 실패한 횟수.<br>_key로 표시_ |
| **gcp.redis.stats.memory.maxmemory** <br>(gauge) | Redis가 사용 가능한 최대 메모리 용량.<br>_byte로 표시_ |
| **gcp.redis.stats.memory.system_memory_overload_duration** <br>(count) | 인스턴스가 시스템 메모리 과부하 모드 상태인 시간(마이크로초).<br>_microsecond로 표시_ |
| **gcp.redis.stats.memory.system_memory_usage_ratio** <br>(gauge) | 최대 시스템 메모리 대비 메모리 사용량 비율.<br>_fraction으로 표시_ |
| **gcp.redis.stats.memory.usage** <br>(gauge) | Redis가 할당한 총 바이트 수.<br>_byte로 표시_ |
| **gcp.redis.stats.memory.usage_ratio** <br>(gauge) | 최대 메모리에 대비 메모리 사용량 비율.<br>_fraction으로 표시_ |
| **gcp.redis.stats.network_traffic** <br>(count) | redis와 주고받은 총 바이트 수(명령 자체, 페이로드 데이터, 구분자 바이트 포함).<br>_byte로 표시_ |
| **gcp.redis.stats.pubsub.channels** <br>(gauge) | 클라이언가 구독하는 Pub/Sub 채널의 전역 개수.|
| **gcp.redis.stats.pubsub.patterns** <br>(gauge) | 클라이언가 구독하는 Pub/Sub 패턴의 전역 개수.|
| **gcp.redis.stats.reject_connections_count** <br>(count) | maxclients 제한으로 인해 거부된 연결 수.|

### 이벤트

Redis용 Google Cloud Memorystore 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Redis용 Google Cloud Memorystore 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.