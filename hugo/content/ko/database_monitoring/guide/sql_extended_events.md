---
aliases:
- /ko/database_monitoring/sql_extended_events
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: 설명서
  text: SQL Server 설정하기
- link: /database_monitoring/guide/parameterized_queries/
  tag: 설명서
  text: 파라미터 값으로 쿼리 캡처 구성하기
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: Database Monitoring 문제 해결하기
title: SQL Server에서 쿼리 완료 및 쿼리 오류 캡처 구성하기
---
이 기능은 XE(확장 이벤트)를 사용하여 SQL Server 인스턴스에서 쿼리 완료 및 쿼리 오류 이벤트를 수집합니다. 다음에 대한 가시성을 제공합니다.
- 파라미터 값이 포함된 SQL 쿼리의 메트릭 및 동작
- 실행 중에 발생한 오류 및 시간 초과

여러 데이터베이스 시스템 전반의 쿼리 파라미터 캡처에 대한 자세한 내용은 [파라미터 값으로 쿼리 캡처 구성하기][1]를 참조하세요.

[1]: /ko/database_monitoring/guide/parameterized_queries/

이 데이터는 다음에 유용합니다.
- 성능 분석
- 앱 동작 디버깅
- 예기치 않은 오류 또는 시간 초과 감사


## 시작 전 참고 사항 {#before-you-begin}

이 가이드를 계속 진행하기 전에 [SQL Server][1] 인스턴스에 대한 Database Monitoring을 구성해야 합니다.


지원되는 데이터베이스
: SQL Server

지원되는 배포
: 모든 배포 유형.

지원되는 Agent 버전
: 7.67.0+

## 설정 {#setup}
{{< tabs >}}
{{% tab "Azure 외 SQL Server" %}}

1. SQL Server 인스턴스에서 다음 XE(확장 이벤트) 세션을 만듭니다. 이 세션은 인스턴스 내의 모든 데이터베이스에서 만들 수 있습니다.

`datadog_query_completions` XE 세션은 RPC 호출, SQL 배치 및 저장 프로시저에서 장기 실행 SQL 쿼리(1초 초과)를 캡처합니다.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO

CREATE EVENT SESSION datadog_query_completions ON SERVER -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON SERVER STATE = START;
GO
```

datadog_query_errors XE 세션은 [심각도 ≥ 11][1]인 SQL 오류와 쿼리 시간 초과([대응 필요 이벤트][2]라고도 함)를 캡처하여 Datadog이 쿼리 실패 및 시간 초과를 보고할 수 있도록 합니다.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
CREATE EVENT SESSION datadog_query_errors ON SERVER
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON SERVER STATE = START;
GO
```

   **참고**: Amazon RDS for SQL Server를 사용하는 경우, 이 옵션은 RDS 인스턴스에서 지원되지 않으므로 두 세션 구성에서 `MEMORY_PARTITION_MODE = PER_NODE` 라인을 제거하세요.

2. Datadog Agent 구성에서 `sqlserver.d/conf.yaml`의 `collect_xe`를 활성화합니다.
사용 가능한 모든 구성 옵션은 [샘플 conf.yaml.example][3]을 참조하세요.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
파라미터 값이 포함된 쿼리문을 수집하려면 `sqlserver.d/conf.yaml`의 `collect_raw_query_statement`를 활성화하세요. 파라미터 캡처에 대한 자세한 내용은 [파라미터 값으로 쿼리 캡처 구성하기][1]를 참조하세요.

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">원시 쿼리문에는 민감한 정보(예: 쿼리 텍스트의 비밀번호)나 개인 식별 정보가 포함될 수 있습니다. 이 옵션을 활성화하면 Datadog이 쿼리 샘플에 나타나는 원시 쿼리문을 수집할 수 있습니다. 이 옵션은 기본적으로 비활성화되어 있습니다.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
{{% /tab %}}

{{% tab "Azure DB" %}}

1. Azure SQL Server Database에서 다음의 XE(확장 이벤트) 세션을 만듭니다.

`datadog_query_completions` XE 세션은 RPC 호출, SQL 배치 및 저장 프로시저에서 장기 실행 SQL 쿼리(1초 초과)를 캡처합니다.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON DATABASE;
GO

CREATE EVENT SESSION datadog_query_completions ON DATABASE -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON DATABASE STATE = START;
GO
```

datadog_query_errors XE 세션은 [심각도 ≥ 11][1]인 SQL 오류와 쿼리 시간 초과([대응 필요 이벤트][2]라고도 함)를 캡처하여 Datadog이 쿼리 실패 및 시간 초과를 보고할 수 있도록 합니다.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON DATABASE;
GO
CREATE EVENT SESSION datadog_query_errors ON DATABASE
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON DATABASE STATE = START;
GO
```

2. Datadog Agent 구성에서 `sqlserver.d/conf.yaml`의 `collect_xe`를 활성화합니다.
사용 가능한 모든 구성 옵션은 [샘플 conf.yaml.example][3]을 참조하세요.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
파라미터 값이 포함된 쿼리문을 수집하려면 `sqlserver.d/conf.yaml`의 `collect_raw_query_statement`를 활성화하세요. 파라미터 캡처에 대한 자세한 내용은 [파라미터 값으로 쿼리 캡처 구성하기][1]를 참조하세요.

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">원시 쿼리문 및 실행 계획에는 민감한 정보(예: 쿼리 텍스트의 비밀번호)나 개인 식별 정보가 포함될 수 있습니다. 이 옵션을 활성화하면 Datadog이 쿼리 샘플 또는 실행 계획에 나타나는 원시 쿼리문 및 실행 계획을 수집할 수 있습니다. 이 옵션은 기본적으로 비활성화되어 있습니다.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example

{{% /tab %}}

{{< /tabs >}}

## 환경에 맞게 확장 이벤트 조정하기(선택 사항) {#tuning-extended-events-for-your-environment-optional}

특정 요구 사항에 더욱 부합하도록 확장 이벤트 세션을 사용자 지정할 수 있습니다.

### 쿼리 기간 임계값 {#query-duration-threshold}
기본 쿼리 기간 임계값은 `duration > 1000000`(1초)입니다. 이 값을 조정하여 캡처되는 쿼리 수를 제어하세요.

- **더 많은 쿼리 캡처**: 임계값을 낮추세요(예: 500ms의 경우 `duration > 500000`)
- **더 적은 쿼리 캡처**: 임계값을 높이세요(예: 5초의 경우 `duration > 5000000`)
<div class="alert alert-danger">임계값을 너무 낮게 설정하면 Datadog이 수집 간격당 가장 최근 이벤트 1,000개만 수집하므로 서버 성능에 영향을 미치는 과도한 이벤트 수집, 버퍼 오버플로로 인한 이벤트 손실, 불완전한 데이터 문제가 발생할 수 있습니다.</div>

### 메모리 할당 {#memory-allocation}
- 기본값은 `MAX_MEMORY = 1024 KB`입니다.
- 더 높은 값은 [SQL Server 내부 제한][3]으로 인해 데이터 손실이 발생할 수 있으므로 1024KB를 초과하지 마세요.
- 대용량 서버의 경우 최대값인 1024KB로 유지하는 것이 좋습니다.
- 트래픽이 적은 서버의 경우 512KB 설정이 충분할 수 있습니다.

### 이벤트 필터링 {#event-filtering}

이벤트 볼륨을 줄이려면 `WHERE` 절에 필터를 추가할 수 있습니다. 예를 들면 다음과 같습니다.

  ```sql
  WHERE (
      sql_text <> '' AND
      duration > 1000000 AND
      -- Add custom filters here
      database_name = 'YourImportantDB' AND -- Only track specific databases
      username <> 'datadog' -- Exclude Datadog Agent queries or specific users
  )
  ```

### 성능 고려 사항 {#performance-considerations}

확장 이벤트는 경량으로 설계되었지만 약간의 오버헤드가 발생할 수 있습니다. 성능 문제를 확인하는 경우 다음 작업을 고려하세요.

- [쿼리 기간 임계값 증가](#query-duration-threshold)를 통해 캡처되는 쿼리를 제한합니다.
- [더 구체적인 필터 추가](#event-filtering)를 통해 이벤트 볼륨을 줄입니다.
- 다음 명령을 실행하여 부하가 많은 기간에 하나 이상의 세션을 비활성화하세요.

```sql
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
```

### Azure 관련 고려 사항 {#azure-specific-considerations}

Azure SQL Database 환경은 일반적으로 리소스가 더욱 제한적입니다. 성능 영향을 최소화하려면 다음을 수행하세요.

- [더 제한적인 필터를 사용](#event-filtering)합니다(하위 계층 서비스 수준을 사용하는 경우).
- 탄력적 풀을 사용하는 경우 모든 데이터베이스에 걸친 성능 영향을 모니터링해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/setup_sql_server/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838