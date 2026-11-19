---
aliases:
- /ko/database_monitoring/custom_metrics/exploring_custom_metrics
description: custom_queries 옵션을 사용하여 자체 데이터베이스 표에서 메트릭을 수집하고 Database Monitoring에서
  확인하세요.
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /metrics/types/
  tag: 설명서
  text: 메트릭 유형
title: Database Monitoring의 Custom Metrics
---
`custom_queries`를 사용하여 Agent의 데이터베이스 사용자가 읽을 수 있는 모든 표에서 메트릭을 수집하세요. 이를 통해 Datadog에서 사용할 수 있는 데이터가 Database Monitoring이 기본적으로 수집하는 쿼리 성능 메트릭을 넘어 애플리케이션 상태 표, 비즈니스 카운터, 대기열 깊이 등으로 확장됩니다.

## 시작하기 전에 {#before-you-begin}

Datadog Agent가 설치되어 있고 데이터베이스 통합이 구성되어 있어야 합니다. Agent의 데이터베이스 사용자에게는 쿼리하는 모든 표에 대한 `SELECT` 권한이 필요합니다.

## 구성 {#configuration}

통합의 `conf.yaml` 파일에 `custom_queries`를 추가하세요. 목록의 각 항목은 하나의 SQL 쿼리를 실행하고 해당 출력 열을 메트릭 또는 태그에 매핑합니다.

| 옵션 | 필수 | 설명 |
| --- | --- | --- |
| `metric_prefix` | 아니요 | 이 쿼리에서 내보내는 모든 메트릭은 이 접두사로 시작합니다. |
| `query` | 예 | 실행할 SQL입니다. 반환된 모든 행이 평가됩니다. 멀티라인 쿼리에는 파이프 문자(`\|`)를 사용하세요. |
| `columns` | 예 | `SELECT`와 동일한 순서의 열 목록입니다. 각 열에는 `name`과 `type`이 필요합니다. `type`을 `gauge`, `count`, `rate` 또는 다른 [메트릭 유형][1]으로 설정하여 메트릭을 내보내거나, `tag`로 설정하여 이 쿼리의 모든 메트릭에 열 값을 태그로 적용하세요. |
| `tags` | 아니요 | 이 쿼리의 모든 메트릭에 적용되는 정적 태그 목록입니다. |
| `collection_interval` | 아니요 | Agent가 쿼리를 실행하는 빈도(초 단위)입니다. 기본값: 15초마다. |

`metric_prefix`를 설정하면 메트릭 이름은 `<metric_prefix>.<column_name>`이 됩니다. 그렇지 않으면 통합의 기본 접두사가 적용됩니다. 예를 들어, Postgres 메트릭 이름은 `postgresql.<column_name>`이고 MySQL 메트릭 이름은 `<column_name>`이 됩니다.

**참고:**
- `columns` 항목 수는 쿼리에서 반환된 열 수와 같아야 합니다.
- `columns` 항목의 순서는 쿼리에서 반환된 열의 순서와 일치해야 합니다.
- `columns`의 항목 중 하나 이상은 메트릭 유형(`tag`이 아님)이어야 합니다.

### 열 유형 {#column-types}

사용자 지정 쿼리의 각 열에는 메트릭이 집계되고 표시되는 방식을 제어하는 유형이 할당됩니다.

| 유형 | 설명 |
| --- | --- |
| `gauge` | 증가하거나 감소할 수 있는 값(예: 표 크기)입니다. |
| `count` | 마지막 수집 이후의 이벤트 수입니다. |
| `rate` | 초당 비율입니다. |
| `monotonic_count` | 증가만 하는 카운터입니다. |
| `monotonic_gauge` | 단조 증가하는 게이지입니다. |
| `temporal_percent` | 시간의 백분율입니다. |
| `time_elapsed` | 시간 단위의 기간입니다. |
| `tag` | 메트릭을 그룹화하거나 필터링하며, 자체 그래프로 표시되지 않습니다. |

`count` 및 `monotonic_count` 열은 `sum`으로 집계됩니다. 다른 모든 메트릭 유형은 `avg`로 집계됩니다.

## 예시 {#examples}

{{< tabs >}}
{{% tab "PostgreSQL" %}}

`postgres.d/conf.yaml` 파일에 `custom_queries`를 추가하세요.

쿼리가 `datadog` 사용자가 아직 액세스할 수 없는 표에서 데이터를 읽는 경우, 먼저 권한을 부여해야 합니다.

```sql
GRANT SELECT ON <TABLE_NAME> TO datadog;
```

**예시:** 다음 `company` 표에는 직원 레코드가 포함되어 있습니다.

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

`name` 및 `address`를 태그로 사용하여 `age` 및 `salary`를 메트릭으로 수집하려면 다음 단계를 따르세요.

```yaml
custom_queries:
  - metric_prefix: postgresql.employee
    query: SELECT age, salary, name, address FROM company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

파일을 업데이트한 후 [Agent를 다시 시작][2]합니다.

전체 구성 참조는 [Postgres Custom Metrics 수집][3]을 참조하세요.

[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
{{% /tab %}}

{{% tab "MySQL" %}}

`mysql.d/conf.yaml` 파일에 `custom_queries`를 추가하세요.

**중요:** 모든 표 참조에는 데이터베이스 이름(`database_name.table_name`)이 포함되어야 합니다. 데이터베이스 이름을 생략하면 Agent가 `No database selected` 오류와 함께 실패합니다.

**예시:** `testdb` 데이터베이스의 다음 `company` 표에는 직원 레코드가 포함되어 있습니다.

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

`name` 및 `address`를 태그로 사용하여 `age` 및 `salary`를 메트릭으로 수집하려면 다음 단계를 따르세요.

```yaml
custom_queries:
  - metric_prefix: mysql.employee
    query: SELECT age, salary, name, address FROM testdb.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

파일을 업데이트한 후 [Agent를 다시 시작][2]합니다.

전체 구성 참조는 [MySQL 사용자 지정 쿼리][3]를 참조하세요.

[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: /ko/integrations/guide/mysql-custom-queries/
{{% /tab %}}

{{% tab "SQL Server" %}}

SQL Server는 Custom Metrics를 수집하는 두 가지 방식인 [사용자 지정 쿼리](#custom-queries)와 [성능 카운터](#performance-counters)를 지원합니다.

### 사용자 지정 쿼리 {#custom-queries}

모든 표에서 메트릭을 수집하려면 `sqlserver.d/conf.yaml` 파일에 `custom_queries`를 추가하세요.

**예시:** `testdb`의 다음 `company` 표에는 직원 레코드가 포함되어 있습니다.

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

`name` 및 `address`를 태그로 사용하여 `age` 및 `salary`를 메트릭으로 수집하려면 다음 단계를 따르세요.

```yaml
custom_queries:
  - metric_prefix: sqlserver.employee
    query: SELECT age, salary, name, address FROM testdb.dbo.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

### 성능 카운터 {#performance-counters}

`custom_metrics`를 사용하여 `sys.dm_os_performance_counters` 및 기타 시스템 DMV에서 메트릭을 수집하세요.

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
```

| 옵션 | 필수 | 설명 |
| --- | --- | --- |
| `name` | 예 | Datadog의 메트릭 이름입니다. |
| `counter_name` | 예 | `sys.dm_os_performance_counters`의 카운터 이름입니다. |
| `instance_name` | 아니요 | 특정 카운터 인스턴스입니다. 모든 인스턴스를 수집하려면 `ALL`을 사용하세요(`tag_by` 필요). |
| `tag_by` | 아니요 | `instance_name: ALL`일 때 인스턴스를 구분하는 데 사용되는 태그 이름입니다. |

파일을 업데이트한 후 [Agent를 다시 시작][2]합니다.

성능 카운터 세부 정보 및 레거시 저장 프로시저 메서드를 포함한 전체 구성 참조는 [SQL Server Custom Metrics 수집][3]을 참조하세요.

[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: /ko/integrations/guide/collect-sql-server-custom-metrics/
{{% /tab %}}
{{< /tabs >}}

## 검증 {#validation}

Agent가 실행된 후 [Metrics Explorer][4]에서 메트릭을 검색하세요.

구성 오류를 검사하려면 [Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 통합을 찾으세요.

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

## Custom Metrics 탐색 {#explore-custom-metrics}

{{< ui >}}Custom Metrics{{< /ui >}} 섹션은 데이터베이스 인스턴스 세부 정보 페이지에 나타나며 Datadog Agent 구성에서 정의한 모든 사용자 지정 쿼리에 대한 시계열 그래프를 표시합니다.

Datadog Agent의 데이터베이스 통합에서 `custom_queries`를 구성한 경우, 이 섹션은 해당 쿼리를 자동으로 검색하고 각 메트릭 열을 시계열 그래프로 시각화합니다. 그래프는 현재 데이터베이스 인스턴스로 범위가 지정됩니다. 이를 통해 비즈니스별 또는 환경별 데이터베이스 메트릭을 표준 Database Monitoring 메트릭과 함께 한곳에서 모두 모니터링할 수 있습니다. 사용자 지정 쿼리가 구성되지 않은 경우 Custom Metrics 섹션은 숨겨집니다.

### Agent 구성 예시 {#example-agent-configuration}

다음 PostgreSQL 예시는 표 크기 및 표당 행 수를 추적합니다.

```yaml
init_config:

instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
    custom_queries:
      - metric_prefix: postgresql.custom
        query: |
          SELECT
            table_name,
            pg_total_relation_size(quote_ident(table_name)) AS total_bytes,
            n_live_tup                                       AS live_rows,
            n_dead_tup                                       AS dead_rows
          FROM information_schema.tables
          JOIN pg_stat_user_tables USING (table_name)
          WHERE table_schema = 'public'
        columns:
          - name: table_name
            type: tag
          - name: total_bytes
            type: gauge
          - name: live_rows
            type: gauge
          - name: dead_rows
            type: gauge
        collection_interval: 60
        tags:
          - env:production
          - service:my-app
```

이 구성은 `table_name`별로 분류된 세 가지 메트릭을 생성합니다.

- `postgresql.custom.total_bytes`
- `postgresql.custom.live_rows`
- `postgresql.custom.dead_rows`

세 가지 모두 인스턴스 세부 정보 페이지의 Custom Metrics 섹션에 별도의 시계열 그래프로 나타납니다.

### 소스 SQL 조회 {#view-the-source-sql}

각 그래프의 오른쪽 상단 모서리에는 {{< ui >}}View SQL query{{< /ui >}} 버튼이 있습니다. 이 버튼을 클릭하면 메트릭을 생성하는 원시 SQL 문이 표시되므로 측정 대상을 이해하고 감사할 수 있습니다.

### 수집 간격 {#collection-interval}

섹션 부제목에는 메트릭이 수집되는 빈도가 표시됩니다(예: "collected every 15s"). 간격이 다른 여러 사용자 지정 쿼리가 있는 경우 범위가 표시됩니다(예: "collected every 15s-60s").

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/types/
[4]: /ko/metrics/explorer/
[5]: /ko/agent/configuration/agent-commands/#agent-status-and-information