---
description: MySQL 데이터베이스 모니터링을 위한 고급 설정
kind: 설명서
title: MySQL 데이터베이스 모니터링을 위한 고급 설정
---

## `events_statements_summary_by_digest` 잘라내기

특정 워크로드에서는 `performance_schema`의 테이블에 대한 유지 관리가 필요합니다. 쿼리 통계는 `performance_schema.events_statements_summary_by_digest` 테이블에서 집계되므로 행 수에 제한이 있습니다. 이 제한은 [`performance_schema_digests_size` 시스템 변수][1]에 의해 지정됩니다. 테이블이 가득 차면 새 쿼리 다이제스트는 널 스키마와 널 쿼리 다이제스트가 있는 catch-all 행에서 추적되므로 Agent가 해당 행을 구성하는 쿼리를 구분할 수 없습니다.

정확한 쿼리별 메트릭이 손실되는 것을 방지하려면 유지 관리 단계로 이 테이블을 주기적으로 잘라내어 모든 새 쿼리를 수집할 수 있도록 하세요:


```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

잘림 빈도를 확인하려면 아래 쿼리를 실행하여 초당 catch-all 행으로 전송되는 문 수를 확인하세요. 값이 0보다 크면 테이블이 꽉 차서 잘려야 함을 의미합니다.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## 다수의 동일한 테이블 처리

이름을 제외하고 테이블 정의가 동일하도록 데이터베이스를 여러 테이블로 분할하면 쿼리 수가 많거나 정규화된 쿼리가 발생할 수 있습니다:

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

이러한 경우 `replace_digits` 옵션을 사용해 해당 쿼리를 하나의 정규화된 쿼리로 추적하여 해당 쿼리에 대한 모든 메트릭이 하나의 쿼리로 롤업되도록 합니다:

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent에서 데이터베이스 인스턴스 설정에 `replace_digits` 옵션을 추가합니다:

```yaml
init_config:

instances:
  - dbm: true
    ...
    replace_digits: true
```

## 샘플링 속도 높이기

상대적으로 자주 발생하지 않거나 빨리 실행되는 쿼리가 있는 경우 `collection_interval` 값을 낮춰 샘플링 속도를 높이면 표본을 더 자주 수집할 수 있습니다.

Datadog Agent의 데이터베이스 인스턴스 설정에서 `collection_interval`을 설정합니다. 기본값은 1입니다. 값을 더 작은 간격으로 줄입니다:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size