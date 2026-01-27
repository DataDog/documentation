---
app_id: proxysql
categories:
- 데이터 저장소
- 로그 수집
- 캐싱
custom_kind: 통합
description: ProxySQL 메트릭 및 로그를 수집합니다.
integration_version: 7.2.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: ProxySQL
---
## 개요

이 점검은 Datadog Agent를 통해 [ProxySQL](https://proxysql.com/)을 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

ProxySQL 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

#### SSL 활성화

완전 SSL/TLS 검증을 사용해 ProxySQL에 연결하려면 `conf.yaml`에서 `tls_verify` 옵션을 활성화합니다. SSL/TLS에 연결할 때 필요한 인증서와 비밀번호를 포함하세요.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. ProxySQL 성능 데이터를 수집하려면 [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에 있는 `conf.d/` 폴더에서 `proxysql.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 proxysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 원하는 로그 파일을 `proxysql.d/conf.yaml` 파일에 추가하여 ProxySQL 로그 수집을 시작하세요.

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

   `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 proxysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

#### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `proxysql`                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `proxysql`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **proxysql.active_transactions** <br>(gauge) | 현재 트랜잭션을 처리 중인 클라이언트 연결 수<br>_transaction으로 표시됨_ |
| **proxysql.all_backends.count** <br>(gauge) | 모든 MySQL 서버 수와 온라인 상태 여부<br>_node로 표시됨_ |
| **proxysql.backend.query_time_pct** <br>(gauge) | 백엔드와의 통신을 위해 네트워크 호출에 소요된 시간(총 시간 대비 비율)<br>_percent로 표시됨_ |
| **proxysql.backends.count** <br>(gauge) | 연결된 MySQL 서버 수<br>_node로 표시됨_ |
| **proxysql.client.connections_aborted** <br>(gauge) | 초당 클라이언트 연결 실패 또는 비정상적으로 종료된 연결 수<br>_connection으로 표시됨_ |
| **proxysql.client.connections_connected** <br>(gauge) | 현재 연결된 클라이언트 연결<br>_connection으로 표시됨_ |
| **proxysql.client.connections_created** <br>(gauge) | 초당 생성된 클랑이언트 연결 수<br>_connection으로 표시됨_ |
| **proxysql.client.connections_non_idle** <br>(gauge) | 현재 메인 워커 스레드에서 처리 중인 클라이언트 연결 수<br>_connection으로 표시됨_ |
| **proxysql.client.statements.active_total** <br>(gauge) | 클라이언트가 사용 중인 프리페어드 스테이트먼트 수<br>_unit으로 표시됨_ |
| **proxysql.client.statements.active_unique** <br>(gauge) | 현재 클라이언트가 사용 중인 고유한 프리페어드 스테이트먼트 수<br>_unit으로 표시됨_ |
| **proxysql.frontend.user_connections** <br>(gauge) | 사용자별 프런트엔드 연결 수<br>_connection으로 표시_ |
| **proxysql.frontend.user_max_connections** <br>(gauge) | 사용자가 생성할 수 있는 최대 프런트엔드 연결 수(mysql_users.max_connections에 정의됨)<br>_connection으로 표시됨_ |
| **proxysql.memory.auth_memory** <br>(gauge) | 인증 모듈에서 사용자 자격 증명 및 속성을 저장하는 데 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_active** <br>(gauge) | 애플리케이션이 할당한 페이지의 바이트 수<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_allocated** <br>(gauge) | 애플리케이션에서 할당한 바이트<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_mapped** <br>(gauge) | 할당자가 매핑한 익스텐트의 바이트<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_metadata** <br>(gauge) | 메타데이터에 할당된 바이트<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_resident** <br>(gauge) | 할당자가 매핑한, 물리적으로 상주하는 데이터 페이지 바이트 수<br>_byte로 표시됨_ |
| **proxysql.memory.jemalloc_retained** <br>(gauge) | 애플리케이션에서 할당한 바이트<br>_byte로 표시됨_ |
| **proxysql.memory.query_digest_memory** <br>(gauge) | stats_mysql_query_digest 관련 데이터 저장에 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.memory.sqlite3_memory_bytes** <br>(gauge) | 내장 SQLite에서 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.memory.stack_memory_admin_threads** <br>(gauge) | 어드민 스레드 스택에서 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.memory.stack_memory_cluster_threads** <br>(gauge) | 클러스터 스레드 스택에서 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.memory.stack_memory_mysql_threads** <br>(gauge) | MySQL 스레드 스택에서 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.mysql.backend_buffers_bytes** <br>(gauge) | 백엔드 연결 관련 버퍼의 메모리 사용량<br>_byte로 표시됨_ |
| **proxysql.mysql.frontend_buffers_bytes** <br>(gauge) | 프런트엔드 연결과 관련된 버퍼(읽기/쓰기 버퍼 및 기타 큐)의 메모리 사용량<br>_byte로 표시됨_ |
| **proxysql.mysql.monitor_workers** <br>(gauge) | 모니터 스레드 수<br>_worker로 표시됨_ |
| **proxysql.mysql.session_internal_bytes** <br>(gauge) | ProxySQL이 MySQL 세션 처리에 사용하는 기타 메모리<br>_byte로 표시됨_ |
| **proxysql.mysql.thread_workers** <br>(gauge) | MySQL Thread 워커 수(예: 'mysql-threads')<br>_worker로 표시됨_ |
| **proxysql.performance.command.cnt_100ms** <br>(count) | 50밀리초를 초과하고 100밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_100us** <br>(count) | 100마이크로초 내에 실행된 특정 유형의 명령 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_10ms** <br>(count) | 5밀리초를 초과하고 10밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_10s** <br>(count) | 5초를 초과하고 10초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_1ms** <br>(count) | 500마이크로초를 초과하고 1밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_1s** <br>(count) | 500밀리초를 초과하고 1초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_500ms** <br>(count) | 100밀리초를 초과하고 500밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_500us** <br>(count) | 100마이크로초를 초과하고 500마이크로초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_50ms** <br>(count) | 10밀리초를 초과하고 50밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_5ms** <br>(count) | 1밀리초를 초과하고 5밀리초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_5s** <br>(count) | 1초를 초과하고 5초 이내에 실행된 특정 유형의 명령어 수<br>_command로 표시됨_ |
| **proxysql.performance.command.cnt_infs** <br>(count) | 실행 시간이 10초를 초과한 명령 수<br>_command로 표시됨_ |
| **proxysql.performance.command.total_count** <br>(count) | 특정 유형의 명령이 실행된 횟수<br>_command로 표시됨_ |
| **proxysql.performance.command.total_time_pct** <br>(gauge) | 전체 시간 대비 특정 유형 명령 실행에 소요된 총 시간의 비율(%)<br>_percent로 표시됨_ |
| **proxysql.pool.bytes_data_recv** <br>(gauge) | 백엔드에서 수신한 데이터 양<br>_byte로 표시됨_ |
| **proxysql.pool.bytes_data_sent** <br>(gauge) | 백엔드로 전송한 데이터 양<br>_byte로 표시됨_ |
| **proxysql.pool.conn_failure** <br>(gauge) | 연결 풀에서 연결을 사용할 수 없어 새 연결을 생성해야 하거나 백엔드를 사용할 수 없는 경우 초당 요청 수<br>_connection으로 표시됨_ |
| **proxysql.pool.conn_immediate** <br>(gauge) | MySQL Thread가 자체 로컬 연결 풀 캐시에서 초당 가져온 연결 수<br>_connection으로 표시됨_ |
| **proxysql.pool.conn_success** <br>(gauge) | 연결 풀에 이미 연결이 있는 경우 초당 요청 수<br>_connection으로 표시됨_ |
| **proxysql.pool.connections_error** <br>(gauge) | 연결 설정에 실패한 횟수<br>_connection으로 표시됨_ |
| **proxysql.pool.connections_free** <br>(gauge) | 현재 사용되지 않고 비어 있는 연결 수. 이는 백엔드 서버로 쿼리를 전송할 때의 시간 비용을 최소화하기 위해 열린 상태로 유지됩니다.<br>_connection으로 표시됨_ |
| **proxysql.pool.connections_ok** <br>(gauge) | 연결 설정에 성공한 횟수<br>_connection으로 표시됨_ |
| **proxysql.pool.connections_used** <br>(gauge) | 현재 ProxySQL이 백엔드 서버로 쿼리를 전송하는 데 사용 중인 연결 수<br>_connection으로 표시됨_ |
| **proxysql.pool.latency_ms** <br>(gauge) | Monitor에서 보고된 현재 핑 시간<br>_millisecond로 표시됨_ |
| **proxysql.pool.latency_us** <br>(gauge) | Monitor에서 보고된 현재 핑 시간<br>_microsecond로 표시됨_ |
| **proxysql.pool.memory_bytes** <br>(gauge) | 연결 풀에서 연결 메타데이터를 저장하는 데 사용되는 메모리<br>_byte로 표시됨_ |
| **proxysql.pool.queries** <br>(gauge) | 이 특정 백엔드 서버로 전송된 쿼리 수<br>_query로 표시됨_ |
| **proxysql.query_cache.bytes_in** <br>(gauge) | Query Cache에 초당 전송되는 바이트 수<br>_byte로 표시됨_ |
| **proxysql.query_cache.bytes_out** <br>(gauge) | Query Cache에서 초당 읽어들이는 바이트 수<br>_byte로 표시됨_ |
| **proxysql.query_cache.entries** <br>(gauge) | 현재 Query Cache에 저장된 엔트리 수<br>_entry로 표시됨_ |
| **proxysql.query_cache.get.count** <br>(gauge) | Query Cache에 대한 초당 읽기 요청 수<br>_query로 표시됨_ |
| **proxysql.query_cache.get_ok.count** <br>(gauge) | 초당 성공적으로 실행된 Query Cache 읽기 요청 수<br>_query로 표시됨_ |
| **proxysql.query_cache.memory_bytes** <br>(gauge) | Query Cache의 메모리 사용량<br>_byte로 표시됨_ |
| **proxysql.query_cache.purged** <br>(gauge) | TTL 만료로 인해 Query Cache에서 초당 삭제되는 엔트리 수<br>_entry로 표시됨_ |
| **proxysql.query_cache.set.count** <br>(gauge) | Query Cache에 대한 초당 쓰기 요청 수<br>_query로 표시됨_ |
| **proxysql.query_processor_time_pct** <br>(gauge) | 쿼리 프로세서(내부 모듈)에서 쿼리 조치 결정에 소요된 시간(총 시간 대비 백분율)<br>_percent로 표시됨_ |
| **proxysql.query_rules.rule_hits** <br>(gauge) | 쿼리 규칙이 트래픽과 일치한 횟수<br>_hit으로 표시됨_ |
| **proxysql.questions** <br>(gauge) | 초당 실행되는 클라이언트 요청/명령문 수<br>_question으로 표시됨_ |
| **proxysql.server.connections_aborted** <br>(gauge) | 초당 백엔드 실패 또는 부적절한 연결 종료 횟수<br>_connection으로 표시됨_ |
| **proxysql.server.connections_connected** <br>(gauge) | 현재 연결된 백엔드 연결<br>_connection으로 표시됨_ |
| **proxysql.server.connections_created** <br>(gauge) | 초당 생성되는 백엔드 연결 수<br>_connection으로 표시됨_ |
| **proxysql.server.statements.active_total** <br>(gauge) | 현재 모든 백엔드 연결에서 사용 가능한 프리페어드 스테이트먼트 수<br>_unit으로 표시됨_ |
| **proxysql.server.statements.active_unique** <br>(gauge) | 현재 모든 백엔드 연결에서 사용 가능한, 고유한 프리페어드 스테이트먼트 수<br>_unit으로 표시됨_ |
| **proxysql.slow_queries** <br>(gauge) | 실행 시간이 'mysql-long_query_time' 밀리초보다 긴 초당 쿼리 수<br>_query로 표시됨_ |
| **proxysql.statements.cached** <br>(gauge) | proxysql이 메타데이터를 보유한 전역 프리페어드 스테이트먼트 수<br>_unit으로 표시됨_ |
| **proxysql.uptime** <br>(gauge) | ProxySQL의 총 가동 시간(초)<br>_second로 표시됨_ |

### 이벤트

ProxySQL 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**proxysql.can_connect**

Agent가 ProxySQL에 연결할 수 없으면 `CRITICAL`을 반환하고, 그 외에는 `OK`를 반환합니다.

_상태: ok, critical_

**proxysql.backend.status**

ProxySQL이 백엔드 호스트를 SHUNNED 또는 OFFLINE_HARD로 간주하면 `CRITICAL`을 반환합니다. 백엔드 호스트가 `OFFLINE_SOFT`면 `WARNING`를 반환하고, 그 외에는 `OK`를 반환합니다.

_Statuses: ok, warning, critical_

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀](https://docs.datadoghq.com/help)에 문의하세요.