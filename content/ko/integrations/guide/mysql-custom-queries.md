---
aliases:
- /ko/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
further_reading:
- link: /integrations/mysql
  tag: 설명서
  text: Datadog MySQL 통합
title: MySQL 커스텀 쿼리
---

Datadog MySQL 통합은 커스텀 쿼리에서 메트릭을 수집할 수 있습니다.

## 구성

[MySQL conf.yaml][1] 파일에서 세부 구성 정보를 따르세요. 다음은 추가로 고려해야 할 사항입니다.

### 데이터베이스 검증

[MySQL conf.yaml][1]에 커스텀 쿼리를 추가할 때는 참조되는 각 테이블에 검증된 데이터베이스가 있어야 합니다. 이는 테이블 앞에 데이터베이스 이름을 다음 형식으로 붙여서 설정합니다.

```sql
SELECT * FROM database_name.table_name WHERE...
```

데이터베이스 이름을 생략하면 `No database selected` 오류가 발생하고, Agent는 쿼리를 실행하지 못합니다.

### 메트릭 이름 지정

쿼리 메트릭에 적용된 이름은 접두사 없이 그대로 사용됩니다(예: `myapp.custom_query.test`).

### 수집 빈도

기본적으로 MySQL 점검은 15~20초마다 메트릭을 수집합니다. 다른 빈도로 메트릭을 쿼리하려면 전체 MySQL 점검 빈도를 낮춰야 합니다(이는 일반 `mysql.*` 메트릭 빈도에 영향을 미침). 또는 커스텀 예약 CRON 스크립트를 실행하여 [API][2] 또는 [DogStatsD][3]를 통해 메트릭을 제출할 수도 있습니다.

### 커스텀 쿼리 수

MySQL 점검에서 많은 수의 커스텀 쿼리를 실행하면 다른 Agent 점검이 지연될 수 있습니다. 많은 수의 커스텀 MySQL 쿼리에서 메트릭을 수집해야 하는 경우, 커스텀 예약 CRON 스크립트를 실행하여 [API][2] 또는 [DogStatsD][3]를 통해 메트릭을 제출하세요.

## 예시

다음 데이터가 포함된 테이블 `test_table`이 있는 `tester` 데이터베이스가 있습니다.

```text
col_1 | col_2 | col_3
---------------------
1     | a     | a
2     | b     | b
3     | c     | c
```

MySQL `conf.yaml`에 다음 커스텀 쿼리를 추가하면 `2` 값이 있는 메트릭 `myapp.custom_query.test.b`를 수집합니다.

```yaml
    custom_queries:
      - query: SELECT col_1 FROM tester.test_table WHERE col_2 = 'b'
        columns:
        - name: myapp.custom_query.test.b
          type: gauge
        tags:
        - tester:mysql
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[2]: /ko/api/
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/