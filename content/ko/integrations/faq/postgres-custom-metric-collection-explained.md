---
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: Postgres 통합
kind: faq
title: Postgres 커스텀 메트릭 수집
---

Postgres 통합 서비스로 커스텀 메트릭을 수집하려면 [에이전트 설정 디렉토리][1] 루트에 있는 `conf.d/postgres.d/conf.yaml` 파일의 `custom_queries` 옵션을 사용하세요. 자세한 내용은 확인하려면 [postgres.d/conf.yaml][2]을 참조하세요.

**참고**: 추가 테이블을 쿼링하는 커스텀 메트릭을 생성하는 경우, 해당 테이블에 대한 `SELECT` 권한을 Postgres 사용자에게 부여해야 할 수도 있습니다. 예: `grant SELECT on <TABLE_NAME> to <USER>;`

## 설정

`custom_queries`에는 다음과 같은 옵션이 있습니다:

| 옵션        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metric_prefix | 예      | 각 메트릭은 선택한 접두사로 시작합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 쿼리         | 예      | 실행할 SQL입니다. 간단한 구문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 줄이 평가됩니다. 여러 줄 스크립트일 경우 파이프를 사용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 컬럼       | 예      | 각 컬럼을 나타내는 목록이 왼쪽에서 오른쪽으로 순차 정렬되어 있습니다.<br><br>다음과 같은 필수 데이터 두 가지가 있습니다:<br> -**`name`**: metric_prefix에 추가하여 전체 메트릭 이름을 구성하는 접두사입니다. `type`을 `tag`으로 지정하면 해당 컬럼은 이 쿼리에서 수집한 모든 메트릭에 태그로 적용됩니다.<br> -**`type`**: 제출 방법입니다(`gauge`, `count`, `rate` 등). `tag`로 설정하여 행의 각 메트릭에 이 컬럼에 있는 항목의 이름과 값(`<name>:<row_value>`)을 태그로 지정할 수도 있습니다. |
| 태그          | 아니요       | 각 메트릭에 적용할 정적 태그 목록입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### 참고

- 정의된 `columns`의 항목 중 최소 하나 이상은 메트릭 유형(`gauge`, `count`, `rate` 등)이어야 합니다.
- `columns`에 정의된 항목의 수는 쿼리가 반환한 컬럼의 수와 동일해야 합니다.
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


## 예시

### 데이터베이스 및 테이블

다음은 `testdb` 데이터베이스의 `company` 테이블입니다. 테이블에는 직원 3명의 기록이 포함되어 있습니다.

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

### SQL 쿼리에서 YAML 설정

목표는 Paul의 이름과 주소를 태그로 사용하여 Paul의 나이와 급여를 메트릭 값으로 캡처하는 것입니다.

SQL 쿼리:

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

해당 `custom_queries` YAML 구성:

```yaml
custom_queries:
  - metric_prefix: postgresql
    query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
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
      - query:custom
```

Postgres YAML 파일을 업데이트한 후 [Datadog 에이전트를 재시작][3]합니다.

### 검증

결과를 확인하려면 [메트릭 탐색기][4]로 메트릭을 검색하세요.

{{< img src="integrations/faq/sql_metric_explorer.png" alt="sql_metric_explorer" >}}

### 디버깅

[에이전트의 상태 하위 명령을 실행][5]하고 점검 섹션에서 `postgres`를 검색합니다.

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

아울러, [에이전트 로그][6]에서 유용한 정보를 얻을 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[3]: /ko/agent/guide/agent-commands/#restart-the-agent
[4]: /ko/metrics/explorer/
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: /ko/agent/guide/agent-log-files/