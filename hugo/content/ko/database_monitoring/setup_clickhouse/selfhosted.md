---
description: 자체 호스팅 ClickHouse용 Database Monitoring을 설치하고 구성하세요.
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /integrations/clickhouse/
  tag: 설명서
  text: ClickHouse 통합
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: Database Monitoring 문제 해결하기
- link: /database_monitoring/guide/database_identifier/
  tag: 설명서
  text: 데이터베이스 식별자 지정하기
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: 설명서
  text: 에이전트를 7.84 이상으로 업그레이드하기
title: 자체 호스팅 ClickHouse용 Database Monitoring 설정하기
---
<div class="alert alert-info">
이 기능은 미리 보기로 제공되며 Datadog Agent v7.78 이상이 필요합니다. Datadog Database Monitoring for ClickHouse 미리 보기에 참여하는 고객은 미리 보기 기간 동안 발생한 사용량에 대해 <strong>요금이 청구되지 않습니다</strong>. 추가 활성화는 필요하지 않습니다. 시작하려면 아래 설정 지침을 따르세요.
</div>

ClickHouse용 Datadog Database Monitoring(DBM)은 쿼리 메트릭, 실시간 쿼리 샘플 및 완료된 쿼리 레코드를 수집하여 전체 플릿에서 문제를 해결하고 쿼리 성능을 최적화할 수 있도록 ClickHouse 클러스터에 대한 심층적인 가시성을 제공합니다.

## 시작 전 참고 사항{#before-you-begin}

지원되는 ClickHouse 버전
: 23.x 이상(23.x, 24.x, 25.x) 권장 최소 버전: 23.8 LTS

지원되는 Agent 버전
: 7.78+

## 수집된 데이터 {#data-collected}

Database Monitoring은 ClickHouse에서 다음 데이터를 수집합니다.

**데이터베이스 인스턴스**
: 버전, 호스트 이름 및 구성을 포함한 인스턴스 정보를 주기적으로 수집합니다(5분마다). `tags` 옵션에 정의된 사용자 지정 태그는 환경, 리전, 클러스터 또는 기타 사용자 지정 차원별로 필터링하고 그룹화할 수 있도록 인스턴스에 추가됩니다.

**쿼리 메트릭**
: 실행된 쿼리의 집계 성능 메트릭으로, 시간 경과에 따른 쿼리 동작과 추세를 분석할 수 있습니다. `system.query_log`에서 수집됩니다.

**쿼리 샘플**
: 현재 실행 중인 쿼리의 특정 시점 스냅샷을 `system.processes`에서 1초 간격으로 캡처합니다. ClickHouse 쿼리는 종종 1초 이내에 완료되므로 실행 시간이 짧은 쿼리는 샘플에 항상 포함되지 않을 수 있습니다.

**쿼리 완료**
: 성공적으로 실행된 모든 쿼리를 캡처하는 개별 완료 쿼리 실행 기록입니다. 샘플링 중 관찰되지 않은 실행 시간이 짧은 쿼리를 포함하여 모든 쿼리 활동을 빠짐없이 확인하려면 쿼리 완료를 쿼리 샘플과 함께 사용하세요.

**실행 계획**
: 쿼리 성능 진단을 위해 쿼리 완료에서 관찰된 쿼리가 참조하는 테이블에 대해 `EXPLAIN`을 실행하여 수집한 쿼리 실행 계획입니다. `SELECT` 문(`WITH` 쿼리 포함)만 실행 계획 수집을 지원합니다. 실행 계획을 포함하여 수집된 모든 데이터는 난독화됩니다. 이 수집에는 [Setup](#setup)에 설명된 시스템 테이블 액세스 외에도 모니터링되는 쿼리가 참조하는 테이블에 대한 `SELECT` 액세스 권한이 필요합니다.

**파트 및 병합**
: 활성 파트, 분리된 파트, 백그라운드 병합, 보류 중인 뮤테이션, 복제 대기열 깊이를 포함한 스토리지 상태 데이터가 `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue`, `system.merge_tree_settings`에서 수집됩니다. 이는 중단된 병합이나 증가하는 복제 백로그와 같은 스토리지 및 복제 문제를 식별하는 데 도움이 됩니다.

**비동기 삽입**
: 비동기 삽입 활동으로, Agent 7.83 이상에서 사용할 수 있으며 기본적으로 비활성화되어 있습니다. `system.asynchronous_inserts`의 보류 중인 버퍼 스냅샷은 플러시 대기 중인 데이터의 양과 각 버퍼의 플러시 예정 시간을 보여줍니다. `system.asynchronous_insert_log`의 플러시 레코드는 각 플러시의 성공 여부와 기록된 바이트 수 및 행 수를 보여줍니다. 이는 실패하는 플러시와 플러시되는 속도보다 더 빠르게 증가하는 버퍼를 식별하는 데 도움이 됩니다.

## 설정 {#setup}

### 1단계: Datadog Agent 액세스 권한 부여{#step-1-grant-datadog-agent-access}

전용 `datadog` 사용자를 생성합니다.

```sql
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

시스템 테이블에 필요한 권한을 부여합니다.

```sql
GRANT SELECT ON system.metrics TO datadog;
GRANT SELECT ON system.events TO datadog;
GRANT SELECT ON system.asynchronous_metrics TO datadog;
GRANT SELECT ON system.errors TO datadog;
GRANT SELECT ON system.parts TO datadog;
GRANT SELECT ON system.replicas TO datadog;
GRANT SELECT ON system.dictionaries TO datadog;
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT SELECT ON system.query_log TO datadog;
GRANT SELECT ON system.processes TO datadog;
GRANT SELECT ON system.detached_parts TO datadog;
GRANT SELECT ON system.merges TO datadog;
GRANT SELECT ON system.mutations TO datadog;
GRANT SELECT ON system.replication_queue TO datadog;
GRANT SELECT ON system.merge_tree_settings TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

`system.processes` 및 `system.query_log` 권한은 DBM 쿼리 수집에 필요합니다. `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` 및 `system.merge_tree_settings` 권한은 파트 및 병합(스토리지 상태) 수집에 필요합니다. `system.macros`, `system.clusters`, `system.settings`, `system.table_engines` 및 `system.one` 권한은 각 인스턴스의 클러스터, 호스팅 유형 및 노드를 식별하는 데 필요합니다. 나머지 권한은 핵심 ClickHouse 인프라 메트릭을 수집할 수 있도록 합니다.

<div class="alert alert-info">
위 권한으로 쿼리 메트릭, 쿼리 샘플, 쿼리 완료, 파트 및 병합을 수집할 수 있습니다. 이 권한은 Agent에 애플리케이션 데이터에 대한 액세스 권한을 부여하지 <strong>않습니다</strong>.
</div>

#### 필요시: 실행 계획 수집을 위한 액세스 권한 부여 {#optional-grant-access-for-explain-plan-collection}

실행 계획 수집에는 위의 시스템 테이블뿐만 아니라 모니터링되는 쿼리가 참조하는 테이블에 대한 `SELECT` 액세스 권한이 필요합니다.

```sql
GRANT SELECT ON <database>.* TO datadog;
```

이 권한이 제공되지 않으면 Agent는 해당 테이블에 대한 쿼리에 `EXPLAIN`을 실행할 수 없습니다. 쿼리 메트릭, 샘플 및 완료는 계속 작동하지만 영향을 받는 쿼리의 실행 계획은 수집되지 않으며 Datadog은 해당 쿼리에 대한 수집 오류를 표시합니다.

#### 필요시 : 비동기 삽입 모니터링을 위한 액세스 권한 부여 {#optional-grant-access-for-async-insert-monitoring}

비동기 삽입 모니터링을 활성화하는 경우(Agent 7.83 이상) 비동기 삽입 시스템 테이블에 대한 액세스 권한을 부여합니다.

```sql
GRANT SELECT ON system.asynchronous_inserts TO datadog;
GRANT SELECT ON system.asynchronous_insert_log TO datadog;
```

`system.asynchronous_inserts`는 보류 중인 버퍼 스냅샷(`collect_pending_async_inserts`)에 필요합니다. `system.asynchronous_insert_log`는 플러시 레코드(`collect_async_inserts`)에 필요합니다. 둘 다 활성화하려면 인스턴스 구성에 다음을 추가하세요.

```yaml
    collect_pending_async_inserts:
      enabled: true
    collect_async_inserts:
      enabled: true
```

### 2단계: Agent 구성 {#step-2-configure-the-agent}

자체 호스팅 배포의 경우 Datadog Agent는 각 ClickHouse 노드에 개별적으로 연결되어야 합니다. 노드마다 별도의 `instances` 항목을 추가하세요. 단일 Agent는 동일한 구성 파일에 여러 인스턴스를 정의하여 여러 노드를 모니터링할 수 있습니다.

<div class="alert alert-info">
이 통합은 네이티브 TCP 프로토콜(포트 9000/9440)이 아닌 ClickHouse <strong>HTTP 인터페이스</strong>(포트 8123/8443)를 사용합니다.
</div>

- **HTTP** (기본값): 포트 `8123`
- **HTTPS/TLS**: `tls_verify: true`를 사용하는 포트 `8443`

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: clickhouse-node-01.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-01

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10

  # Add an entry for each additional node
  - dbm: true
    server: clickhouse-node-02.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-02

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10
```

## 데이터베이스 식별자 사용자 지정 {#customizing-the-database-identifier}

`database_identifier` 옵션은 데이터베이스 인스턴스가 DBM에 표시되는 방식을 제어합니다. 이는 기본 `server:port` 형식 대신 의미 있고 사람이 읽을 수 있는 식별자를 사용하려는 경우 유용합니다.

```yaml
instances:
  - dbm: true
    server: clickhouse-01
    port: 8123
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
```

`env:production`, `server: clickhouse-01`, `port: 8123`을 사용하면 다음과 같은 결과가 생성됩니다.

| 템플릿 | 결과 |
|----------|--------|
| `$server:$port` (기본값) | `clickhouse-01:8123` |
| `$env-$server:$port` | `production-clickhouse-01:8123` |

## 구성 참조 {#configuration-reference}

### 연결 설정{#connection-settings}

| 필드 | 유형 | 필수 | 기본값 | 설명 |
|-------|------|----------|---------|-------------|
| `server` | 문자열 | 예 | - | ClickHouse 서버의 호스트 이름 또는 IP 주소입니다. |
| `port` | 정수 | 아니요 | `8123` | HTTP 포트입니다. HTTPS/TLS의 경우 `8443`을 사용하세요. Agent는 네이티브 TCP 프로토콜(포트 9000)이 아닌 HTTP 인터페이스를 사용합니다. |
| `username` | 문자열 | 아니요 | `default` | Agent가 인증에 사용하는 ClickHouse 사용자 계정입니다. Datadog은 권한이 제한된 전용 `datadog` 사용자 계정을 권장합니다. |
| `password` | 문자열 | 아니요 | - | 지정된 사용자에 대한 비밀번호입니다. |
| `db` | 문자열 | 아니요 | `default` | 연결할 데이터베이스입니다. 대부분의 메트릭은 시스템 테이블에서 가져오므로 `default`가 일반적으로 적합합니다. |

### TLS 설정 {#tls-settings}

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `tls_verify` | 불리언 | `false` | TLS를 활성화합니다. HTTPS(포트 8443)를 사용할 때 `true`로 설정하세요. |
| `verify` | 불리언 | `true` | 서버의 SSL 인증서를 검증합니다. 프로덕션 환경에서 `false`로 설정하는 것은 보안 위험이 있습니다. |
| `tls_ca_cert` | 문자열 | - | 사용자 지정 CA 인증서 파일 경로입니다. ClickHouse가 내부 또는 자체 서명 인증서로 구성된 경우 사용하세요. |

### DBM 설정 {#dbm-settings}

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `dbm` | 불리언 | `false` | Database Monitoring을 활성화합니다. 쿼리 메트릭, 샘플 및 완료 수집에 필요합니다. |

### 데이터베이스 식별자 {#database-identifier}

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `database_identifier.template` | 문자열 | `$server:$port` | 고유 데이터베이스 식별자 템플릿입니다. 지원되는 변수는 `$server`, `$port` 및 모든 사용자 지정 태그 키(예: `$env`, `$region`)입니다. 사용자 지정 태그를 사용하여 환경 전반의 인스턴스를 구분하세요. `$env-$server:$port` |

### 쿼리 메트릭 {#query-metrics}

`system.query_log`에서 집계된 쿼리 통계를 수집합니다.

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `query_metrics.enabled` | 불리언 | `true` | 쿼리 메트릭 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `query_metrics.collection_interval` | 숫자 | `10` | 수집 간격(초)입니다. |

### 쿼리 샘플 {#query-samples}

`system.processes`에서 현재 실행 중인 쿼리를 수집합니다.

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `query_samples.enabled` | 불리언 | `true` | 쿼리 샘플 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `query_samples.collection_interval` | 숫자 | `1` | 수집 간격(초)입니다. |
| `query_samples.payload_row_limit` | 정수 | `1000` | 스냅샷당 최대 활성 쿼리 수입니다. |

### 쿼리 완료 {#query-completions}

`system.query_log`에서 개별 완료된 쿼리의 레코드를 수집합니다.

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `query_completions.enabled` | 불리언 | `true` | 쿼리 완료 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `query_completions.collection_interval` | 숫자 | `10` | 수집 간격(초)입니다. |
| `query_completions.samples_per_hour_per_query` | 숫자 | `15` | 고유 쿼리 서명당 시간당 수집되는 최대 샘플 수입니다. |

### 보류 중인 비동기 삽입 {#pending-async-inserts}

`system.asynchronous_inserts`에서 보류 중인 비동기 삽입 버퍼의 스냅샷을 수집합니다. Agent 7.83 이상이 필요합니다.

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `collect_pending_async_inserts.enabled` | 불리언 | `false` | 보류 중인 비동기 삽입 버퍼 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `collect_pending_async_inserts.collection_interval` | 숫자 | `10` | 수집 간격(초)입니다. |
| `collect_pending_async_inserts.max_samples_per_collection` | 정수 | `1000` | 실행당 수집되는 최대 버퍼 수입니다. |

### 비동기 삽입 플러시 {#async-insert-flushes}

`system.asynchronous_insert_log`에서 개별 비동기 삽입 플러시 레코드를 수집합니다. Agent 7.83 이상이 필요합니다.

| 필드 | 유형 | 기본값 | 설명 |
|-------|------|---------|-------------|
| `collect_async_inserts.enabled` | 불리언 | `false` | 비동기 삽입 플러시 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `collect_async_inserts.collection_interval` | 숫자 | `60` | 수집 간격(초)입니다. |
| `collect_async_inserts.max_samples_per_collection` | 정수 | `1000` | 실행당 수집되는 최대 플러시 레코드 수입니다. |

{{< partial name="whats-next/whats-next.html" >}}