---
app_id: foundationdb
categories:
- 데이터 스토어
- 로그 수집
custom_kind: integration
description: FoundationDB 통합
integration_version: 3.3.1
media: []
supported_os:
- 리눅스
- macos
- windows
title: FoundationDB
---
## 개요

이 점검은 Datadog Agent를 통해 [FoundationDB](https://www.foundationdb.org/)를 모니터링합니다. FoundationDB 클러스터의 상태를 확인하는 것 외에도 다양한 메트릭을 수집하고, 필요시 FoundationDB 트랜잭션 로그도 수집합니다.

## 설정

점검 및 메트릭은 FoundationDB 클러스터 전체에 적용되며, 하나의 호스트에만 설치해야 합니다. 해당 호스트는 FoundationDB가 실행 중인 호스트일 필요는 없으며, FoundationDB에 접근 권한이 있는 호스트이면 됩니다.

### 설치

FoundationDB 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있지만, [FoundationDB 클라이언트](https://apple.github.io/foundationdb/downloads.html)가 설치되어 있어야 합니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. FoundationDB 메트릭 수집을 시작하려면 Agent 구성 디렉터리의 루트에서 `conf.d/` 폴더에 있는 `foundationdb.d/conf.yaml` 파일을 편집하세요.
   사용 가능한 모든 구성 옵션은 [샘플 foundationdb.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/foundationdb/datadog_checks/foundationdb/data/conf.yaml.example)을 참고하세요.

1. 확인할 클러스터는 [기본 위치](https://apple.github.io/foundationdb/administration.html#default-cluster-file)에서 클러스터 파일을 검색하여 결정합니다. 클러스터 파일이 다른 위치에 있는 경우,
   `cluster_file` 속성을 설정하세요. 체크 인스턴스당 하나의 클러스터만 모니터링할 수 있습니다.

1. 클러스터가 TLS를 사용하도록 구성된 경우(https://www.foundationdb.org/), 구성에 추가 속성을 설정해야 합니다. 이 속성들은 해당 클러스터에 연결하기 위해
   `fdbcli`에 제공된 TLS 관련 옵션 이름을 따릅니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

FoundationDB는 기본적으로 XML 로그를 기록하지만, Datadog 통합은 JSON 로그를 예상합니다. 따라서 FoundationDB 구성을 변경해야 합니다.

1. `foundationdb.conf`파일을 찾은 다음 `fdbserver` 섹션에서
   `json` 값을 얻기 위해 키 `trace_format`을 추가하거나 변경합니다. 또한,
   `logdir`를 기록해 둡니다.

   ```
   [fdbserver]
   ...
   logdir = /var/log/foundationdb
   trace_format = json
   ```

1. 변경 사항이 적용되도록 FoundationDB 서버를 재시작합니다.
   `logdir`에 있는 로그가 JSON으로 작성되었는지 확인합니다.

1. `datadog.yaml` 파일에서 로그 수집이 활성화되어 있는지 확인합니다.

   ```yaml
   logs_enabled: true
   ```

1. `foundationdb.d/conf.yaml` 파일의 `logs` 섹션에서 주석 처리를 해제하고
   경로를 FoundationDB 구성 파일에 있는 경로로 설정한 후
   `*.json`을 추가합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/foundationdb/*.json
       service: foundationdb
       source: foundationdb
   ```

1. Datadog Agent가 디렉터리 목록을 조회하고
   파일을 읽을 수 있는 권한을 가지고 있는지 확인하세요.

1. Datadog Agent를 재시작합니다.

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `foundationdb`                                             |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{}`                                                       |

##### 로그 수집

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "foundationdb", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) **Checks** 섹션에서 `foundationdb`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **foundationdb.clients.connected** <br>(gauge) | 클라이언트 버전별로 태그되고 연결된 클라이언트 수<br>_connection으로 표시됨_ |
| **foundationdb.cluster_generation** <br>(gauge) | |
| **foundationdb.coordinators** <br>(gauge) | 도달 가능성별로 태그된 코디네이터 수<br>_instance로 표시됨_ |
| **foundationdb.data.average_partition_size_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.least_operating_space_bytes_log_server** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.moving_data.in_flight_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.moving_data.in_queue_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.moving_data.total_written_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.partitions_count** <br>(gauge) | |
| **foundationdb.data.system_kv_size_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.total_disk_used_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.data.total_kv_size_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.datacenter_lag.seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.degraded_processes** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.excluded_machines** <br>(gauge) | <br>_host로 표시됨_ |
| **foundationdb.excluded_processes** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.fault_tolerance.max_zone_failures_without_losing_availability** <br>(gauge) | <br>_location으로 표시됨_ |
| **foundationdb.fault_tolerance.max_zone_failures_without_losing_data** <br>(gauge) | <br>_location으로 표시됨_ |
| **foundationdb.instances** <br>(count) | <br>_instance로 표시됨_ |
| **foundationdb.latency_probe.batch_priority_transaction_start_seconds** <br>(gauge) | 배치 우선순위 트랜잭션 시작 시간(초)<br>_second로 표시됨_ |
| **foundationdb.latency_probe.commit_seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.latency_probe.immediate_priority_transaction_start_seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.latency_probe.read_seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.latency_probe.transaction_start_seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.machines** <br>(gauge) | <br>_host로 표시됨_ |
| **foundationdb.maintenance_seconds_remaining** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.process.cpu.usage_cores** <br>(gauge) | <br>_core로 표시됨_ |
| **foundationdb.process.disk.busy** <br>(gauge) | <br>_fraction으로 표시됨_ |
| **foundationdb.process.disk.free_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.disk.reads.hz** <br>(gauge) | <br>_read로 표시됨_ |
| **foundationdb.process.disk.total_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.disk.writes.hz** <br>(gauge) | <br>_write로 표시됨_ |
| **foundationdb.process.memory.available_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.memory.limit_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.memory.unused_allocated_memory** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.memory.used_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.network.connection_errors.hz** <br>(gauge) | <br>_error로 표시됨_ |
| **foundationdb.process.network.connections_closed.hz** <br>(gauge) | <br>_connection으로 표시됨_ |
| **foundationdb.process.network.connections_established.hz** <br>(gauge) | <br>_connection으로 표시됨_ |
| **foundationdb.process.network.current_connections** <br>(gauge) | <br>_connection으로 표시됨_ |
| **foundationdb.process.network.megabits_received.hz** <br>(gauge) | |
| **foundationdb.process.network.megabits_sent.hz** <br>(gauge) | |
| **foundationdb.process.network.tls_policy_failures.hz** <br>(gauge) | <br>_error로 표시됨_ |
| **foundationdb.process.role.bytes_queried.counter** <br>(count) | <br>_query로 표시됨_ |
| **foundationdb.process.role.bytes_queried.hz** <br>(gauge) | <br>_query로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.count** <br>(count) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.max** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.min** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.p25** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.p90** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.commit_latency_statistics.p99** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.data_lag.seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.process.role.durability_lag.seconds** <br>(gauge) | <br>_second로 표시됨_ |
| **foundationdb.process.role.durable_bytes.counter** <br>(count) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.durable_bytes.hz** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.finished_queries.counter** <br>(count) | <br>_query로 표시됨_ |
| **foundationdb.process.role.finished_queries.hz** <br>(gauge) | <br>_query로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.count** <br>(count) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.max** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.min** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.p25** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.p90** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.grv_latency_statistics.default.p99** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.input_bytes.counter** <br>(count) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.input_bytes.hz** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.keys_queried.counter** <br>(count) | <br>_key로 표시됨_ |
| **foundationdb.process.role.keys_queried.hz** <br>(gauge) | <br>_key로 표시됨_ |
| **foundationdb.process.role.kvstore_available_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.kvstore_free_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.kvstore_inline_keys** <br>(gauge) | <br>_key로 표시됨_ |
| **foundationdb.process.role.kvstore_total_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.kvstore_total_nodes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.kvstore_total_size** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.kvstore_used_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.local_rate** <br>(gauge) | <br>_unit으로 표시됨_ |
| **foundationdb.process.role.low_priority_queries.counter** <br>(count) | <br>_query로 표시됨_ |
| **foundationdb.process.role.low_priority_queries.hz** <br>(gauge) | <br>_query로 표시됨_ |
| **foundationdb.process.role.mutation_bytes.counter** <br>(count) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.mutation_bytes.hz** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.mutations.counter** <br>(count) | <br>_item으로 표시됨_ |
| **foundationdb.process.role.mutations.hz** <br>(gauge) | <br>_item으로 표시됨_ |
| **foundationdb.process.role.query_queue_max** <br>(gauge) | <br>_query로 표시됨_ |
| **foundationdb.process.role.queue_disk_available_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.queue_disk_total_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.queue_length** <br>(gauge) | <br>_item으로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.count** <br>(count) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.max** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.min** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.p25** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.p90** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.read_latency_statistics.p99** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **foundationdb.process.role.stored_bytes** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.process.role.total_queries.counter** <br>(count) | <br>_query로 표시됨_ |
| **foundationdb.process.role.total_queries.hz** <br>(gauge) | <br>_query로 표시됨_ |
| **foundationdb.processes** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.cluster_controller** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.coordinator** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.data_distributor** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.log** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.master** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.proxy** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.ratekeeper** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.resolver** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.processes_per_role.storage** <br>(gauge) | <br>_process로 표시됨_ |
| **foundationdb.qos.batch_transactions_per_second_limit** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.qos.released_transactions_per_second** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.qos.transactions_per_second_limit** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.qos.worst_queue_bytes_log_server** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.qos.worst_queue_bytes_storage_server** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.workload.bytes.read.counter** <br>(count) | <br>_byte로 표시됨_ |
| **foundationdb.workload.bytes.read.hz** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.workload.bytes.written.counter** <br>(count) | <br>_byte로 표시됨_ |
| **foundationdb.workload.bytes.written.hz** <br>(gauge) | <br>_byte로 표시됨_ |
| **foundationdb.workload.keys.read.counter** <br>(count) | <br>_key로 표시됨_ |
| **foundationdb.workload.keys.read.hz** <br>(gauge) | <br>_key로 표시됨_ |
| **foundationdb.workload.operations.location_requests.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.location_requests.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.low_priority_reads.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.low_priority_reads.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.memory_errors.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.memory_errors.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.read_requests.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.read_requests.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.reads.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.reads.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.writes.counter** <br>(count) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.operations.writes.hz** <br>(gauge) | <br>_operation으로 표시됨_ |
| **foundationdb.workload.transactions.committed.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.committed.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.conflicted.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.conflicted.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.rejected_for_queued_too_long.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.rejected_for_queued_too_long.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_batch_priority.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_batch_priority.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_default_priority.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_default_priority.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_immediate_priority.counter** <br>(count) | <br>_transaction으로 표시됨_ |
| **foundationdb.workload.transactions.started_immediate_priority.hz** <br>(gauge) | <br>_transaction으로 표시됨_ |

### 서비스 점검

**foundationdb.check**

클러스터 상태를 조회하는 동안 오류가 발생하면 critical을 반환하고, 프로세스 상태가 저하된 경우 warning을 반환하며, 그렇지 않으면 ok를 반환합니다.

_Statuses: ok, warning, critical_

### 이벤트

FoundationDB 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.