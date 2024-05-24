---
description: Postgres 데이터베이스 모니터링을 위한 고급 설정
kind: 설명서
title: Postgres 데이터베이스 모니터링을 위한 고급 설정
---

## 많은 관계 처리

Postgres 데이터베이스에 (수천 개의) 많은 관계가 있는 경우, Datadog에서는 해당 데이터베이스의 인스턴스 구성에 `collect_database_size_metrics: false`을 추가할 것을 권장합니다. 이 설정을 비활성화하면  Agent는 데이터베이스 크기 통계를 수집하는 `pg_database_size()` 함수를 실행하지 않으므로, 테이블 수가 많은 인스턴스에서는 성능이 저하됩니다.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

또한, 테이블 정의가 이름을 제외하고 동일하도록 데이터를 테이블 간에 분할하면, 쿼리 수가 많아지거나 정규화된 쿼리가 발생할 수 있습니다:

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
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## 샘플링 속도 높이기

상대적으로 자주 발생하지 않거나 빨리 실행되는 쿼리가 있는 경우 `collection_interval` 값을 낮춰 샘플링 속도를 높이면 표본을 더 자주 수집할 수 있습니다.

Datadog Agent의 데이터베이스 인스턴스 설정에서 `collection_interval`을 설정합니다. 기본값은 1초이며 <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L332C9-L336" target="_blank">`postgres/conf.yaml.example`</a>에서 볼 수 있습니다.

값을 더 작은 간격으로 낮춥니다:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```