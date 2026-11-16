---
description: 표, 열, 인덱스를 포함한 데이터베이스 스키마를 탐색하고 분석하세요.
title: 데이터베이스 스키마 탐색
---
스키마를 사용하면 데이터 모델의 성능, 사용량, 변경 사항을 모니터링하여 문제를 더 빠르게 식별하고 해결할 수 있습니다.

<div class="alert alert-info">스키마 추적은 PostgreSQL, SQL Server, MySQL에서 사용할 수 있습니다.</div>

{{< img src="database_monitoring/dbm-schemas-page.png" alt="Datadog에서 추적된 데이터베이스 표 및 스키마 수준 메트릭을 표시하는 Schemas 페이지" style="width:100%;" >}}

## 구성 {#configuration}

스키마 기능을 활성화하려면 Database Monitoring 구성에 `collect_schemas` 파라미터를 추가하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    collect_schemas:
      enabled: true
    ## Optional: Connect to a different database if needed for `custom_queries`
    # dbname: '<DB_NAME>'
```

### 스키마 수집 조정 {#tuning-schema-collection}

사용 가능한 `collect_schemas` 옵션과 기본값은 데이터베이스 엔진에 따라 다릅니다.

{{< tabs >}}
{{% tab "Postgres" %}}

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `enabled` | `true` | 스키마 수집을 비활성화하려면 `false`로 설정합니다. Datadog Agent 버전 7.80.0 이상에서 기본적으로 활성화됩니다. |
| `max_tables` | `300` | Agent가 인스턴스에서 수집하는 최대 표 수입니다. 이 제한을 초과하는 표는 수집되지 않습니다. |
| `max_columns` | `50` | Agent가 표당 수집하는 최대 열 수입니다. |
| `max_query_duration` | `60` | 스키마 정보를 수집하는 쿼리의 최대 기간(초)입니다. |
| `collection_interval` | `600` | 스키마 수집 실행 간격(초)입니다. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```

<div class="alert alert-info">파티션이 PostgreSQL의 제한에 포함되는지 여부는 <code>max_tables</code> 파티셔닝 방법에 따라 다릅니다. 선언적 파티셔닝(<code>PARTITION BY</code>, PostgreSQL 10 이상)은 파티션 수와 관계없이 표를 한 번 계산하지만 상속 파티셔닝(<code>INHERITS</code>, PostgreSQL 9.6의 유일한 옵션)은 상위 항목과 각 하위 항목을 별도로 계산합니다. 이는 상속 파티셔닝된 데이터베이스가 예상보다 훨씬 더 적은 논리적 표로 기본 제한인 300개에 도달하여 다른 표가 포함될 여지를 줄일 수 있음을 의미합니다. Schemas 페이지에서 표가 누락된 경우 상속 파티셔닝을 확인하고 그에 따라 <code>max_tables</code> 를 늘리세요.</div>

`max_tables`를 늘리면 각 수집 실행 비용이 증가합니다. 표 수가 많은 인스턴스에서는 데이터베이스의 부하를 줄이기 위해 `max_query_duration` 및 `collection_interval`을 늘리는 것도 고려하세요.
{{% /tab %}}

{{% tab "SQL Server" %}}

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `enabled` | `false` | 스키마 수집을 활성화하려면 `true`로 설정합니다. |
| `max_tables` | `300` | Agent가 인스턴스에서 수집하는 최대 표 수입니다. 이 제한을 초과하는 표는 수집되지 않습니다. |
| `collection_interval` | `600` | 스키마 수집 실행 간격(초)입니다. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```
{{% /tab %}}

{{% tab "MySQL" %}}

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `enabled` | `false` | 스키마 수집을 활성화하려면 `true`로 설정합니다. |
| `collection_interval` | `600` | 스키마 수집 실행 간격(초)입니다. |
| `max_execution_time` | `60` | 스키마 정보를 수집하는 쿼리의 최대 기간(초)입니다. |

```yaml
collect_schemas:
  enabled: true
  collection_interval: 300
```
{{% /tab %}}
{{< /tabs >}}

## Tables 개요 {#tables-overview}

Tables 개요에는 데이터베이스 전체에서 추적된 모든 표가 표 이름별로 그룹화되어 목록으로 제공되며, 다음과 같은 열이 포함됩니다.

| 열         | 설명                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \# Variants    | 모든 호스트에 있는 표의 고유 버전 수입니다.                                                                                                                                           |
| \# Instances   | 모든 호스트에 있는 총 표 인스턴스 수입니다. 예를 들어, 표에 각각 7개와 8개의 인스턴스를 가진 두 개의 변형이 있는 경우 총 인스턴스 수는 15개입니다.                         |
| \# Columns     | 모든 호스트에 있는 모든 표 변형의 고유 열 수입니다. 예를 들어, 한 변형에 A, B, C 열이 있고 다른 변형에 A, B, D 열이 있는 경우 총 고유 열은 4개(A, B, C, D)입니다. |
| Databases      | 모든 호스트에서 이 표를 포함하는 모든 데이터베이스의 이름입니다.                                                                                                                                       |
| Schemas        | 모든 호스트에서 이 표가 나타나는 스키마입니다.                                                                                                                                                |
| Database Hosts | 이 표가 존재하는 호스트입니다.                                                                                                                                                                   |

각 표 행을 확장하여 표 변형 및 다음과 같은 열을 조회할 수 있습니다.

| 열         | 설명                                                            |
|----------------|------------------------------------------------------------------------|
| Variant ID     | 이 표의 변형(버전)에 대한 고유 식별자입니다.               |
| \# Instances   | 이 변형에 대한 이 표의 인스턴스 수입니다.                    |
| \# Columns     | 이 표 변형의 고유 열 수입니다.                        |
| Databases      | 이 표 변형을 포함하는 데이터베이스의 알파벳순 정렬 목록입니다. |
| Schemas        | 이 표 변형을 포함하는 스키마의 알파벳순 정렬 목록입니다.   |
| Database Hosts | 이 표 변형이 나타나는 호스트의 알파벳순 정렬 목록입니다.  |

### 표 변형 세부 정보 조회 {#viewing-table-variant-details}

표 변형에 대한 세부 정보를 조회하려면 해당 행을 클릭하여 표 변형 패널을 여세요.

{{< img src="database_monitoring/table-variant-panel.png" alt="인벤토리 표에 대한 열 정의 및 인덱스를 보여주는 표 변형 패널" style="width:100%;" >}}

이 패널에서는 변형(버전)에 대한 다음과 같은 정보를 보여줍니다.

- {{< ui >}}Definition{{< /ui >}}: 이 표 변형에 대한 열, 인덱스 및 외래 키를 포함합니다.
- {{< ui >}}Table Instances{{< /ui >}}: 이 표 변형과 연결된 모든 인스턴스입니다.
- {{< ui >}}Metrics{{< /ui >}}: 표 크기, 순차 스캔 및 기타 관련 메트릭입니다(기본값: 지난 7일).
- {{< ui >}}Queries{{< /ui >}}: 이 표 변형과 관련된 쿼리입니다(기본값: 지난 7일).
- {{< ui >}}Changes{{< /ui >}}: 이 표 변형에 영향을 주는 스키마 변경 사항입니다(기본값: 지난 7일).

### 표 인스턴스 세부 정보 조회 {#viewing-table-instance-details}

특정 표 인스턴스에 대한 세부 정보를 조회하려면 표 변형 패널에서 {{< ui >}}Table Instances{{< /ui >}} 탭으로 이동하고 행을 클릭하세요.

{{< img src="database_monitoring/table-instance-details.png" alt="인벤토리 표에 대한 열 및 인덱스 세부 정보를 표시하는 표 인스턴스 패널입니다." style="width:100%;" >}}

이렇게 하면 표 변형 패널과 유사한 보기가 열립니다. 여기에는 선택된 표 인스턴스에 대한 다음과 같은 정보가 표시됩니다.

- {{< ui >}}Definition{{< /ui >}}: 이 표 인스턴스에 대한 열, 인덱스 및 외래 키를 포함합니다.
- {{< ui >}}Metrics{{< /ui >}}: 표 크기, 순차 스캔 및 기타 관련 메트릭입니다(기본값: 지난 7일).
- {{< ui >}}Queries{{< /ui >}}: 이 표 인스턴스와 관련된 쿼리입니다(기본값: 지난 7일).
- {{< ui >}}Changes{{< /ui >}}: 이 표 인스턴스에 영향을 주는 스키마 변경 사항입니다(기본값: 지난 7일).

## Recommendations {#recommendations}

Recommendations에는 표 전반의 잠재적 스키마 최적화 기회가 강조 표시됩니다.

각 권장 사항에는 다음이 포함됩니다.

- 누락된 기본 키 또는 비효율적인 인덱스와 같이 탐지된 문제
- 문제가 중요한 이유 및 문제가 데이터베이스 성능 또는 무결성에 미치는 영향에 대한 설명
- 제안된 수정 사항(영향을 받는 데이터베이스에서 실행할 수 있는 SQL 문인 경우가 많음)

권장 사항은 집계 형식(페이지 상단) 및 표별로 제공되며, 각 해당 표에 관련 권장 사항이 표시됩니다. 자세한 내용은 [Recommendations][1]를 참조하세요.

## Metrics 개요 {#metrics-overview}

Metrics 개요에는 각 DBMS에서 추적된 표와 관련된 메트릭에 대한 대시보드가 표시됩니다.

{{< img src="database_monitoring/metrics-overview.png" alt="추적된 데이터베이스 인스턴스 전반의 총 표 인스턴스 수 및 주요 활동 메트릭을 보여주는 Metrics 개요" style="width:100%;" >}}

각 대시보드에는 다음과 같은 메트릭이 포함됩니다.

- Total Table Instance Count  
- Fastest Changing Instances (%)  
- Fastest Changes Instances (bytes)  
- Most Accessed Instances
- Largest Instances  
- Instances with Most Live Rows  
- Instances with the Largest Index Sizes  
- Instances with Access Exclusive Locks  
- Instances with Most Dead Rows  
- Instances with the Longest Last Vacuum Age  
- Instances with the Longest Last Auto Vacuum Age

[1]: /ko/database_monitoring/recommendations
[2]: https://app.datadoghq.com/databases/list