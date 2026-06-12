---
aliases:
- /ko/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: Datadog-MySQL 통합
title: SQL 서버 커스텀 메트릭 수집
---

본 지침에서는 SQL Server에서 커스텀 메트릭을 수집하는 방법을 설명합니다.

## 커스텀 쿼리

SQL Server 통합 서비스로 더 복잡한 커스텀 메트릭을 수집하려면 [에이전트 설정 디렉토리][5]의 루트에 있는 `conf.d/sqlserver.d/conf.yaml` 파일의 `custom_queries` 옵션을 사용하세요. 자세한 내용은 확인하려면 샘플 [sqlserver.d/conf.yaml][6]을 참조하세요.

### 설정

`custom_queries`에는 다음과 같은 옵션이 있습니다:

| 옵션        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 쿼리         | 예      | 실행할 SQL입니다. 간단한 구문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 행이 평가됩니다. 여러 줄 스크립트일 경우 파이프 문자(`\|')를 사용하세요.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 컬럼       | 예      | 각 컬럼을 나타내는 목록이 왼쪽에서 오른쪽으로 순차적으로 정렬되어 있습니다.<br><br>다음과 같은 두 가지 필수 데이터가 있습니다:<br> -`name`**: `metric_prefix`에 추가하여 전체 메트릭 이름을 구성하는 접미사입니다. `type` 을 `tag`으로 지정하면 해당 컬럼은 이 쿼리에서 수집한 모든 메트릭에 태그로 적용됩니다.<br> -`type`**: 제출 방법입니다(`gauge`, `count`, `rate` 등). `tag`로 설정하여 행의 각 메트릭에 이 컬럼에 있는 항목의 이름과 값(`<name>:<row_value>`)을 태그로 지정할 수도 있습니다. |
| 태그          | 아니요       | 각 메트릭에 적용할 정적 태그 목록입니다.


- 정의된 `columns`의 항목 중 최소 하나 이상은 메트릭 유형(`gauge`, `count`, `rate` 등)이어야 합니다.
- `columns`에 정의된 항목의 수는 쿼리가 반환한 컬럼의 수와 반드시 동일해야 합니다.
- `columns`에 정의된 항목의 순서는 쿼리가 반환한 순서와 반드시 동일해야 합니다.

  ```yaml
  custom_queries:
    - query: Select F3, F2, F1 from Table;
      columns:
        - {name: f3_metric_alias, type: gauge}
        - {name: f2_tagkey      , type: tag  }
        - {name: f1_metric_alias, type: count}
      [...]
  ```

### 예시

다음은 `testdb` 데이터베이스의 `company` 테이블입니다. 해당 테이블에는 직원 기록 세 개가 포함되어 있습니다:

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

아래의 SQL 쿼리는 Paul의 이름과 주소를 태그로 사용하여 Paul의 나이와 급여를 메트릭 값으로 캡처합니다.

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

해당 `custom_queries` YAML 구성:

```yaml
custom_queries:
  - query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: localisation
        type: tag
    tags:
      - 'query:custom'
```

SQL Server YAML 파일을 업데이트한 후, [Datadog 에이전트를 재시작][7]합니다.

#### 검증

결과를 확인하려면 [메트릭 탐색기][8]를 사용하여 메트릭을 검색하세요.

#### 디버깅

[에이전트의 상태 하위 명령어][9]를 실행하고 검사 섹션에서 `sqlserver`를 찾습니다.

```text
sqlserver
--------
  - instance #0 [ERROR]: 'Missing query parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

아울러, [에이전트 로그][10]에서 유용한 정보를 얻을 수 있습니다.

## 성능 카운터에서 메트릭 수집

기본적으로 [Datadog-SQL 서버 점검][1] 기능은 `sys.dm_os_performance_counters` 테이블에서 사용 가능한 메트릭 중 *일부*만 캡처합니다.

하단에서 성능 카운터의 기본 메트릭 수집 예시를 확인하세요. **참고**: 옵션으로 `tags`을 지정하여 메트릭과 함께 전송할 수 있습니다:

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

파라미터 설명:

| 매개 변수      | 설명                                           |
|----------------|-------------------------------------------------------|
| `name`         | Datadog 내부 메트릭의 이름입니다.                   |
| `counter_name` | [SQL 서버 데이터베이스 개체][2]의 카운터 이름입니다. |
| `tags`         | 키 목록: 값 태그 쌍의 목록입니다.                        |

카운터에 여러 인스턴스가 연결된 경우, `instance_name` 파라미터 이름으로 단일 인스턴스를 가져오도록 선택할 수 있습니다:

```yaml
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

더 세분화하고 싶다면 `object_name`으로 쿼리를 설정합니다:

```yaml
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

여러 인스턴스가 존재하는 카운터의 모든 인스턴스를 수집하려면, `instance_name` 파라미터의 대소문자를 구분하는 특수 값 `ALL`을 사용합니다. 해당 파라미터는 `tag_by` 값을 **요청**합니다. 본 예시에서는 `db:mydb1`, `db:mydb2`로 태그한 메트릭을 가져옵니다:

```yaml
custom_metrics:
  - name: sqlserver.db.commit_table_entries
    counter_name: Commit table entries
    instance_name: ALL
    tag_by: db
```

카운터를 가져오는 기본 테이블은 `sys.dm_os_performance_counters` 테이블입니다. Datadog-SQL 서버 점검은 `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks`, `sys.dm_io_virtual_file_stats` 도 지원합니다.

추가 테이블 중 하나에서 가져온 메트릭을 보고하려면 `table` 파라미터로 카운터 정의 테이블을 지정하고 `columns` 파라미터로 보고할 카운터 컬럼을 지정합니다:

```yaml
custom_metrics:
  - name: sqlserver.LCK_M_S
    table: sys.dm_os_wait_stats
    counter_name: LCK_M_S
    columns:
      - max_wait_time_ms
      - signal_wait_time_ms

```

상기 예시에서는 `sqlserver.LCK_M_S.max_wait_time.ms`, `sqlserver.LCK_M_S.signal_wait_time_ms` 메트릭 두 개를 보고합니다.

**참고**: `sys.dm_io_virtual_file_stats`, `sys.dm_os_memory_clerks` 같은 메트릭이 `counter_name`에 연결되어 있지 않은 경우 컬럼만 지정하면 됩니다:

```yaml
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

상기 예시에서는 각 데이터베이스 ID 및 파일 ID로 태그된 `sqlserver.io_file_stats.num_of_reads`, `sqlserver.io_file_stats.num_of_writes` 메트릭 두 개를 보고합니다.

## 커스텀 프로시저에서 메트릭 수집 (레거시)

데이터베이스에서 커스텀 메트릭을 수집하는 레거시 방법입니다. 약간의 설정만으로 사용할 수 있고, 실행할 수 있는 T-SQL 유형이 더 많으며 디버깅이 더 쉬운 `custom_queries` 파라미터를 사용할 것을 권장합니다. 커스텀 프로시저에서 메트릭을 수집하면 빌링에 영향을 줄 수 있는 대량의 커스텀 메트릭이 생성됩니다.

### 저장 프로시저 설정

Datadog 보고용 커스텀 메트릭을 수집하려면 임시 테이블을 설정해야 합니다. 해당 테이블에는 다음 컬럼이 있어야 합니다:

| 열   | 설명                                               |
|----------|-----------------------------------------------------------|
| `metric` | Datadog에 표시되는 메트릭의 이름입니다.          |
| `type`   | [메트릭 유형][3](게이지, 속도 또는 [히스토그램][4])입니다.    |
| `value`  | 메트릭의 값(반드시 실수로 변환 가능해야 함)입니다. |
| `tags`   | Datadog에 표시되는 태그이며, 쉼표로 구분됩니다.     |

마스터 데이터베이스 내에 다음과 같은 저장 프로시저가 생성됩니다:

```text
-- <PROCEDURE_NAME> 이름으로 저장 프로시저 생성
CREATE PROCEDURE [dbo].[<PROCEDURE_NAME>]
AS
BEGIN

  -- 임시 테이블 생성
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- 결과 세트에서 행 개수 삭제
  SET NOCOUNT ON;

  -- 변수 카운트를 생성하고 사용자 연결 수와 같게 설정 
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- #Datadog 테이블에 커스텀 메트릭 삽입
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- 저장 프로시저 실행 권한 부여
GRANT EXECUTE ON [dbo].[<PROCEDURE_NAME>] To Public
GO
```

저장 프로시저는 다음과 같은 커스텀 메트릭을 출력합니다:

* `sql.test.test`
* `sql.test.gauge`
* `sql.test.rate`
* `sql.test.histogram.95percentile`
* `sql.test.histogram.avg`
* `sql.test.histogram.count`
* `sql.test.histogram.max`
* `sql.test.histogram.median`

### SQL Server 통합 설정 업데이트

커스텀 프로시저에서 메트릭을 수집하려면 실행할 프로시저로 `sqlserver.d/conf.yaml` 파일 내에 새 인스턴스 정의를 생성합니다. 기존 구성을 위해서는 별도의 인스턴스가 필요합니다. 저장 프로시저가 있는 인스턴스는 저장 프로시저 외에는 아무것도 처리하지 않습니다. 예시:

```yaml
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    database: master
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    stored_procedure: "<PROCEDURE_NAME>"
    database: master
```

다음과 같이 지정할 수도 있습니다:

| 매개 변수                 | 설명                                                                               | 기본            |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------|
| `ignore_missing_database` | 지정한 DB가 서버에 존재하지 않는 경우 점검을 수행하지 않습니다.                  | `False`            |
| `proc_only_if`            | `stored_procedure`에 대한 호출을 실행하기 전에 본 SQL을 실행합니다. 1이 반환되면 프로시저를 호출합니다. |                    |
| `proc_only_if_database`   | `proc_only_if` SQL을 실행할 데이터베이스입니다.                                            | 데이터베이스 속성 |

**참고**: `proc_only_if` 보호 조건은 데이터베이스가 서버 간 이동 가능한 고가용성 시나리오에 유용합니다.

### 문제 해결

커스텀 메트릭 메트릭이 Datadog에 표지되지 않으면 에이전트 로그 파일을 확인하세요. 다음 오류가 표시된다면 `Could not call procedure <PROCEDURE_NAME>: You must supply -1 parameters for this stored procedure` 아래와 같은 문제 중 하나일 수 있습니다:

* `<PROCEDURE_NAME>`을 잘못 입력하셨습니다.
* 설정에서 지정한 데이터베이스 사용자 이름에 저장 프로시저를 실행할 수 있는 권한이 없을 수 있습니다.



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /ko/metrics/#metric-types
[4]: /ko/metrics/types/?tab=histogram#metric-types
[5]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[7]: /ko/agent/guide/agent-commands/#restart-the-agent
[8]: /ko/metrics/explorer/
[9]: /ko/agent/guide/agent-commands/#agent-status-and-information
[10]: /ko/agent/guide/agent-log-files