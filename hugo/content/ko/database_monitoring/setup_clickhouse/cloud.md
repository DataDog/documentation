---
description: ClickHouse Cloud용 Database Monitoring 설치 및 구성
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /integrations/clickhouse/
  tag: 설명서
  text: ClickHouse 통합
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: Database Monitoring 문제 해결
- link: /database_monitoring/guide/database_identifier/
  tag: 설명서
  text: 데이터베이스 식별자 지정
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: 설명서
  text: 7.84 이전 Agent 버전에서 ClickHouse 통합 업그레이드
title: ClickHouse Cloud용 Database Monitoring 설정
---
이 기능은 미리 보기로 제공되고 있으며, Datadog Agent v7.84 이상이 필요합니다. 7.84 이전 버전의 Agent로 ClickHouse용 Database Monitoring을 설정한 경우, Agent 업그레이드 전에 추가 권한을 부여하려면 [ClickHouse 통합 업그레이드](/database_monitoring/guide/clickhouse_agent_upgrade/)를 참조하세요. Datadog Database Monitoring for ClickHouse 미리 보기에 참여하는 고객은 미리 보기 기간 동안 발생한 사용량에 대해 **요금이 청구되지 않습니다**. 추가 활성화는 필요하지 않습니다. 시작하려면 아래 설정 지침을 따르세요.

ClickHouse용 Datadog Database Monitoring(DBM)은 쿼리 메트릭, 실시간 쿼리 샘플 및 완료된 쿼리 레코드를 수집하여 전체 플릿의 문제를 해결하고 쿼리 성능을 최적화할 수 있도록 ClickHouse Cloud 서비스에 대한 심층적인 가시성을 제공합니다.

## 시작하기 전에 {#before-you-begin}

지원되는 Agent 버전
: 7.84+

## 수집된 데이터 {#data-collected}

Database Monitoring은 ClickHouse에서 다음 데이터를 수집합니다.

**데이터베이스 인스턴스**
: 버전, 호스트 이름 및 구성을 포함한 인스턴스 정보를 주기적으로 수집합니다(5분마다). `tags` 옵션에 정의된 사용자 지정 태그는 환경, 리전, 서비스 또는 기타 사용자 지정 디멘션을 기준으로 필터링하고 그룹화할 수 있도록 인스턴스에 추가됩니다.

**쿼리 메트릭**
: 실행된 쿼리의 집계 성능 메트릭으로, 시간 경과에 따른 쿼리 동작과 추세를 분석할 수 있습니다. `system.query_log`에서 수집됩니다.

**쿼리 샘플**
: 현재 실행 중인 쿼리의 특정 시점 스냅샷을 `system.processes`에서 1초 간격으로 캡처합니다. ClickHouse 쿼리는 종종 1초 이내에 완료되므로 실행 시간이 짧은 쿼리는 샘플에 항상 포함되지 않을 수 있습니다.

**쿼리 완료**
: 성공적으로 실행된 모든 쿼리를 캡처하는 개별 완료 쿼리 실행 기록입니다. 샘플링 중 관찰되지 않은 실행 시간이 짧은 쿼리를 포함하여 모든 쿼리 활동을 빠짐없이 확인하려면 쿼리 완료를 쿼리 샘플과 함께 사용하세요.

**설명 계획**
: 쿼리 성능 진단을 위해 쿼리 완료에서 관찰된 쿼리가 참조하는 테이블에 대해 `EXPLAIN`을 실행하여 수집한 쿼리 실행 계획입니다. `SELECT` 문(`WITH` 쿼리 포함)만 설명 계획 수집을 지원합니다. 설명 계획을 포함하여 수집된 모든 데이터는 난독화됩니다. 이 수집에는 [Setup](#setup)에 설명된 시스템 테이블 액세스 외에도 모니터링되는 쿼리가 참조하는 테이블에 대한 `SELECT` 액세스 권한이 필요합니다.

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
GRANT SHOW ON *.* TO datadog;
```

`system.processes` 및 `system.query_log` 권한은 DBM 쿼리 수집에 필요합니다. `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` 및 `system.merge_tree_settings` 권한은 파트 및 병합(스토리지 상태) 수집에 필요합니다. 데이터베이스 이름, 표 이름, 열 및 보기와 같은 메타데이터를 자동으로 탐색하려면 `SHOW` 권한이 필요합니다. 나머지 권한은 핵심 ClickHouse 인프라 메트릭을 수집할 수 있도록 합니다.

복제본 간 쿼리를 허용하려면 `REMOTE` 권한을 부여합니다.

```sql
GRANT REMOTE ON *.* TO datadog;
```

Agent가 ClickHouse의 `clusterAllReplicas()` 표 함수를 사용하여 단일 엔드포인트를 통해 ClickHouse Cloud 서비스의 모든 복제본에 있는 데이터를 집계하므로 `REMOTE` 권한이 필요합니다. 이 권한은 노드 간 쿼리 실행을 허용하지만, 위에서 명시적으로 부여한 권한 외에 추가 데이터베이스나 표에 대한 액세스 권한을 부여하지 **않습니다**. `ON *.*` 구문은 ClickHouse에서 이 권한 유형에 필수로 요구하는 구문이며 데이터 액세스 범위를 확장하지 않습니다.

위 권한으로 쿼리 메트릭, 쿼리 샘플, 쿼리 완료, 파트 및 병합을 수집할 수 있습니다. 이 권한은 Agent에 애플리케이션 데이터에 대한 액세스 권한을 부여하지 **않습니다**.

#### 필요시: 설명 계획 수집을 위한 액세스 권한 부여 {#optional-grant-access-for-explain-plan-collection}

설명 계획 수집에는 위의 시스템 테이블뿐만 아니라 모니터링되는 쿼리가 참조하는 테이블에 대한 `SELECT` 액세스 권한도 필요합니다.

```sql
GRANT SELECT ON <database>.* TO datadog;
```

이 권한이 제공되지 않으면 Agent는 해당 테이블에 대한 쿼리에 `EXPLAIN`을 실행할 수 없습니다. 쿼리 메트릭, 샘플 및 완료는 계속 작동하지만 영향을 받는 쿼리의 설명 계획은 수집되지 않으며 Datadog은 해당 쿼리에 대한 수집 오류를 표시합니다.

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

ClickHouse Cloud의 경우 Agent가 서비스 엔드포인트에 직접 연결합니다. 데이터는 개별 노드가 아닌 서비스 수준에서 수집되며, 모든 복제본의 데이터가 집계됩니다.

자동 일시 중지가 활성화된 서버리스 ClickHouse 배포에서는 DBM 수집 활동으로 인해 유휴 기간에도 클러스터가 일시 중지되지 않아 청구 요금에 영향을 미칠 수 있습니다.

이 통합은 ClickHouse **HTTP 인터페이스**(포트 8443)를 사용하며, 네이티브 TCP 프로토콜(포트 9440)은 사용하지 않습니다.

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    username: datadog
    password: <PASSWORD>

    # Required for ClickHouse Cloud
    tls_verify: true
    verify: true
    single_endpoint_mode: true

    tags:
      - env:production
      - deployment:cloud

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

ClickHouse Cloud에는 `single_endpoint_mode: true`가 필요합니다. 이 설정을 활성화하면 `clusterAllReplicas()` 쿼리를 사용하여 단일 엔드포인트 뒤에 있는 모든 노드에서 데이터를 수집할 수 있습니다.

활성화하면 Agent는 `clusterAllReplicas()`를 사용하여 엔드포인트 뒤에 있는 모든 노드의 시스템 표 메트릭(`system.events`, `system.metrics`, `system.asynchronous_metrics` 및 `system.errors`)을 쿼리합니다. 결과로 생성된 각 시리즈에 `clickhouse_node` 태그가 지정되므로 노드별 데이터를 구분할 수 있습니다. 이 노드별 수집에는 Agent 버전 7.83.0 이상이 필요합니다.

이 설정을 사용하지 않으면 Agent가 수집 주기마다 서로 다른 노드에 연결될 수 있습니다. `clickhouse.query.failed.count`와 같은 노드별 누적 카운터에서는 매번 동일한 소스에서 카운터 값을 읽지 않으면 일관성이 유지되지 않아 부정확한 값이 생성됩니다.

## 데이터베이스 식별자 사용자 지정 {#customizing-the-database-identifier}

`database_identifier` 옵션은 데이터베이스 인스턴스가 DBM에 표시되는 방식을 제어합니다. Datadog은 식별 및 그룹화를 위해 서비스 이름을 사용자 지정 태그로 사용할 것을 권장합니다.

```yaml
instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
      - service_name:user-service
```

`env:production`, `server: xyz.us-east-2.aws.clickhouse.cloud` 및 `port: 8443`을 사용하면 다음과 같은 결과가 생성됩니다.


| 템플릿                  | 결과                                               |
| ------------------------- | ---------------------------------------------------- |
| `$server:$port`(기본값) | `xyz.us-east-2.aws.clickhouse.cloud:8443`            |
| `$env-$server:$port`      | `production-xyz.us-east-2.aws.clickhouse.cloud:8443` |




## 구성 참조 {#configuration-reference}



### 연결 설정{#connection-settings}


| 필드      | 유형    | 필수 | 기본값   | 설명                                                                                                                 |
| ---------- | ------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `server`   | 문자열  | 예      | -         | ClickHouse Cloud 서비스 호스트 이름(예: `xyz.us-east-2.aws.clickhouse.cloud`)입니다.                                      |
| `port`     | 정수 | 아니요       | `8123`    | HTTP 포트입니다. ClickHouse Cloud(HTTPS)에는 `8443`을 사용합니다.                                                                         |
| `username` | 문자열  | 아니요       | `default` | Agent가 인증할 때 사용하는 ClickHouse 사용자 계정입니다. Datadog은 권한이 제한된 전용 `datadog` 사용자 계정을 권장합니다. |
| `password` | 문자열  | 아니요       | -         | 지정된 사용자에 대한 비밀번호입니다.                                                                                            |
| `db`       | 문자열  | 아니요       | `default` | 연결할 데이터베이스입니다. 대부분의 메트릭은 시스템 테이블에서 가져오므로 `default`가 일반적으로 적합합니다.                          |




### TLS 설정 {#tls-settings}


| 필드         | 유형    | 기본값 | 설명                                                                                                     |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `tls_verify`  | 불리언 | `false` | TLS를 활성화합니다. ClickHouse Cloud에 필요합니다.                                                                      |
| `verify`      | 불리언 | `true`  | 서버의 SSL 인증서를 검증합니다. 프로덕션 환경에서 `false`로 설정하는 것은 보안 위험이 있습니다.                        |
| `tls_ca_cert` | 문자열  | -       | 사용자 지정 CA 인증서 파일 경로입니다. 퍼블릭 CA의 인증서를 사용하는 ClickHouse Cloud에는 필요하지 않습니다. |




### DBM 설정 {#dbm-settings}


| 필드                  | 유형    | 기본값 | 설명                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbm`                  | 불리언 | `false` | Database Monitoring을 활성화합니다. 쿼리 메트릭, 샘플 및 완료 수집에 필요합니다.                                                                                                                                                                                                                                              |
| `single_endpoint_mode` | 불리언 | `false` | ClickHouse Cloud에 필요합니다. `clusterAllReplicas()` 쿼리를 사용하여 단일 엔드포인트 뒤에 있는 모든 노드에서 데이터를 수집할 수 있습니다. 또한 노드별 표준 시스템 표 메트릭(`clickhouse_node` 태그 지정)을 수집하므로 누적 카운터에서 정확한 노드별 값을 보고할 수 있습니다. 노드별 수집을 위해서는 Agent 버전 7.83.0 이상이 필요합니다. |




### 데이터베이스 식별자 {#database-identifier}


| 필드                          | 유형   | 기본값         | 설명                                                                                                                                          |
| ------------------------------ | ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `database_identifier.template` | 문자열 | `$server:$port` | 고유 데이터베이스 식별자 템플릿입니다. 지원되는 변수는 `$server`, `$port` 및 모든 사용자 지정 태그 키(예: `$env`, `$service_name`)입니다. |




### 쿼리 메트릭 {#query-metrics}

`system.query_log`에서 집계된 쿼리 통계를 수집합니다.


| 필드                               | 유형    | 기본값 | 설명                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_metrics.enabled`             | 불리언 | `true`  | 쿼리 메트릭 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `query_metrics.collection_interval` | 숫자  | `10`    | 수집 간격(초)입니다.                        |




### 쿼리 샘플 {#query-samples}

`system.processes`에서 현재 실행 중인 쿼리를 수집합니다.


| 필드                               | 유형    | 기본값 | 설명                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_samples.enabled`             | 불리언 | `true`  | 쿼리 샘플 수집을 활성화합니다. `dbm: true`가 필요합니다. |
| `query_samples.collection_interval` | 숫자  | `1`     | 수집 간격(초)입니다.                        |
| `query_samples.payload_row_limit`   | 정수 | `1000`  | 스냅샷당 최대 활성 쿼리 수입니다.         |




### 쿼리 완료 {#query-completions}

`system.query_log`에서 개별 완료된 쿼리의 레코드를 수집합니다.


| 필드                                          | 유형    | 기본값 | 설명                                                    |
| ---------------------------------------------- | ------- | ------- | -------------------------------------------------------------- |
| `query_completions.enabled`                    | 불리언 | `true`  | 쿼리 완료 수집을 활성화합니다. `dbm: true`가 필요합니다.     |
| `query_completions.collection_interval`        | 숫자  | `10`    | 수집 간격(초)입니다.                                |
| `query_completions.samples_per_hour_per_query` | 숫자  | `15`    | 고유 쿼리 서명당 시간당 수집되는 최대 샘플 수입니다. |

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