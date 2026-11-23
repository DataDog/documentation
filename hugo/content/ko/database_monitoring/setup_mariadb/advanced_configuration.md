---
description: MariaDB Database Monitoring을 위한 고급 구성
title: MariaDB Database Monitoring을 위한 고급 구성
---
## `events_statements_summary_by_digest` 자르기 {#truncating-events-statements-summary-by-digest}

특정 워크로드에서는 `performance_schema`의 표를 유지 관리해야 합니다. 쿼리 통계는 행 수가 제한된 `performance_schema.events_statements_summary_by_digest` 표에 집계됩니다. 이 제한은 [`performance_schema_digests_size` 시스템 변수][1]로 지정됩니다. 표가 가득 차면 새로운 쿼리 다이제스트는 스키마와 쿼리 다이제스트가 null인 통합 행(catch-all row)에 기록되므로 Agent가 해당 행에 포함된 쿼리를 구분할 수 없게 됩니다.

정확한 쿼리별 메트릭이 손실되는 것을 방지하려면 모든 새 쿼리가 수집될 수 있도록 유지 관리 단계로 이 테이블을 주기적으로 잘라내세요.

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

표를 자르는 주기를 결정하려면 아래 쿼리를 실행하여 이 통합 행에 초당 전송되는 문 수를 확인합니다. 값이 0보다 크면 표가 가득 찬 상태이므로 표를 잘라야 합니다.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## 동일한 표 여러 개 처리 {#handling-many-identical-tables}

이름을 제외하고 테이블 정의가 동일하도록 데이터베이스를 여러 테이블로 분할하면 쿼리 수가 많아지거나 정규화된 쿼리가 발생할 수 있습니다.

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

이러한 경우 `replace_digits` 옵션을 사용하여 해당 쿼리를 하나의 정규화된 쿼리로 추적하면 모든 관련 메트릭을 단일 쿼리로 집계할 수 있습니다. 이를 통해 DBM 할당량에 포함되는 서로 다른 정규화된 쿼리 수를 줄일 수 있으며, MariaDB 성능 스키마의 다이제스트 제한에는 영향을 미치지 않습니다.

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent의 데이터베이스 인스턴스 구성에서 `obfuscator_options` 아래에 `replace_digits` 옵션을 추가합니다.

```yaml
init_config:

instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## 샘플링 비율 높이기 {#raising-the-sampling-rate}

실행 빈도가 비교적 낮거나 실행 속도가 빠른 쿼리가 있다면 `collection_interval` 값을 낮춰 샘플링 비율을 높이고 샘플을 더 자주 수집합니다.

Datadog Agent의 데이터베이스 인스턴스 구성에서 `collection_interval`을 설정합니다. 기본값은 1입니다. 값을 낮춰 간격을 줄입니다.

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

**참고**: 동일한 데이터베이스에 대해 MariaDB 통합 검사를 여러 인스턴스에서 실행하는 경우 모든 인스턴스에 동일한 `collection_interval` 값을 사용합니다. 동일한 메트릭에 서로 다른 수집 간격을 사용하면 메트릭에 이상이 발생할 수 있습니다.

[1]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables#performance_schema_digests_size