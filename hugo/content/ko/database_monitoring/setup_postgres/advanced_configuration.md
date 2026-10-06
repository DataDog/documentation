---
description: Postgres Database Monitoring을 위한 고급 설정
title: Postgres Database Monitoring을 위한 고급 설정
---
## 많은 관계 처리 {#handling-many-relations}

Postgres 데이터베이스에 많은 수의 관계(수천 개)가 있는 경우, Datadog은 해당 데이터베이스의 인스턴스 설정에 `collect_database_size_metrics: false`를 추가할 것을 권장합니다. 이 설정이 비활성화되면 Agent는 데이터베이스 크기 통계를 수집하는 `pg_database_size()` 함수를 실행하지 않습니다. 이 함수는 테이블 수가 많은 인스턴스에서 성능이 저하됩니다.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

또한, 테이블 정의가 이름을 제외하고 동일하도록 데이터를 테이블 간에 분할하면, 정규화된 쿼리가 많이 생성될 수 있습니다.

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

이러한 경우 `replace_digits` 옵션을 사용하여 이러한 쿼리를 단일 정규화된 쿼리로 추적하면 해당 쿼리에 대한 모든 메트릭이 단일 쿼리로 롤업됩니다.

```sql
SELECT * FROM daily_aggregates_?
```

Datadog Agent에서 데이터베이스 인스턴스 설정에 `replace_digits` 옵션을 추가합니다.

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

파티셔닝은 스키마 수집에도 영향을 미칩니다. 기본 선언적 파티셔닝(`PARTITION BY`)을 사용하여 파티셔닝된 표는 파티션 수와 관계없이 `collect_schemas`에 대한 `max_tables` 제한에 대해 하나의 테이블로 계산됩니다. 위의 `daily_aggregates_*` 테이블과 같이 테이블 상속(`INHERITS`)을 사용하여 파티셔닝된 테이블은 각 파티션을 개별적으로 계산하므로, 이 패턴을 사용하는 데이터베이스는 전체 범위를 다루기 위해 더 높은 `max_tables` 제한이 필요할 수 있습니다. 자세한 내용은 [스키마 수집 조정][2]을 참조하세요.

## 샘플링 속도 향상 {#raising-the-sampling-rate}

실행 빈도가 비교적 낮거나 실행 시간이 짧은 쿼리가 있다면 `collection_interval` 값을 낮춰 샘플링 빈도를 높이고 실행 계획을 더 자주 수집하세요.

Datadog Agent의 데이터베이스 인스턴스 설정에서 `collection_interval`을 설정합니다. 기본값은 1초이며 <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example" target="_blank">`postgres/conf.yaml.example`</a>에서 확인할 수 있습니다.

값을 더 작은 간격으로 낮춥니다.

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

## 열 통계 수집 구성하기 {#configuring-column-statistics-collection}

열 통계 수집은 주기적인 일정에 따라 `pg_stats`(`n_distinct`, `null_frac`, `avg_width`, `correlation`, `most_common_freqs`)에서 열별 통계를 읽습니다. 이를 위해서는 모든 모니터링되는 데이터베이스에 `datadog.column_statistics()` 함수가 존재해야 합니다. 함수 정의는 [자체 호스팅용 Postgres에 Database Monitoring 설정하기][1]를 참조하세요.

함수가 존재하면 Postgres 인스턴스 설정에서 수집을 활성화하고 조정합니다.

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
      collection_interval: 3600   # seconds between collection runs; default 3600 (hourly)
      max_tables: 500              # maximum tables to collect per run; default 500
```

| 옵션 | 기본값 | 변경 시기 |
| --- | --- | --- |
| `enabled` | `false` | `true`로 설정하여 열 통계 수집을 활성화합니다. |
| `collection_interval` | `3600` | 더 빠른 통계 응답을 원하면 낮추고(`pg_stats`에 대한 쿼리 수 증가), 매우 크거나 바쁜 클러스터에서는 쿼리 부하를 줄이기 위해 높입니다. |
| `max_tables` | `500` | 전체 범위를 원한다면, 500개를 초과하는 테이블이 있는 데이터베이스를 모니터링하는 경우 올리세요. 수집 비용을 제한하려면 내리세요. 이 제한은 `collect_schemas` 아래의 `max_tables` 옵션(기본값: `300`)과 별개입니다. |

열 통계가 채워지려면 기본 표에 대해 `ANALYZE`(또는 autoanalyze)가 최소 한 번 이상 실행되어야 합니다. 통계가 수집되지 않은 표의 경우 `pg_stats`은 비어 있습니다.

[1]: /ko/database_monitoring/setup_postgres/selfhosted/#create-the-column-statistics-function
[2]: /ko/database_monitoring/schema_explorer/#tuning-schema-collection