---
description: 데이터 웨어하우스 전반에서 신선도, 행 수, 열 수준 메트릭 및 사용자 지정 SQL 쿼리를 모니터링합니다.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /data_observability/quality_monitoring/
  tag: 설명서
  text: Quality Monitoring
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터링 음소거를 위한 가동 중지 예약
- link: /monitors/status/
  tag: 설명서
  text: 모니터링 상태 확인
title: Data Observability 모니터
---
## 개요 {#overview}

[Data Observability][1] 모니터는 계절성, 추세 및 사용자 피드백을 학습하는 이상 징후 탐지를 사용하여 지연된 데이터, 불완전한 로드 및 예기치 않은 값 변경이 다운스트림 대시보드, AI 애플리케이션 또는 비즈니스 결정에 영향을 미치기 전에 이를 포착합니다. 엔드투엔드 데이터 및 코드 계보와 결합된 이 모니터들은 팀이 문제를 조기에 탐지하고, 다운스트림 영향을 평가하며, 올바른 소유자에게 라우팅하도록 돕습니다.

Data Observability 모니터는 다음 메트릭 유형을 지원합니다.

**표 수준 메트릭 유형:**
| 메트릭 유형 | 설명 |
|---|---|
| 신선도 | 표가 마지막으로 업데이트된 후 경과된 시간을 추적합니다. |
| 행 수 | 표 또는 보기의 행 수를 추적합니다. |
| 커스텀 SQL | SQL 쿼리에서 반환된 사용자 지정 메트릭 값을 추적합니다. |

**열 수준 메트릭 유형:**
| 메트릭 유형 | 설명 |
|---|---|
| 신선도 | 날짜/시간 열에서 확인된 가장 최근 날짜를 추적합니다. |
| 고유성 | 고유 값의 백분율을 추적합니다. |
| Null 여부 | Null 값의 백분율을 추적합니다. |
| 카디널리티 | 고유 값의 수를 추적합니다. |
| 0 백분율 | 0과 같은 값의 백분율을 추적합니다. |
| 음수 백분율 | 음수 값의 백분율을 추적합니다. |
| 최소/최대/평균/합계/표준 편차 | 열 값 전반의 통계적 측정값을 추적합니다. |

Datadog은 가능할 경우 웨어하우스 시스템 메타데이터(예: `INFORMATION_SCHEMA`)에서 행 수 및 신선도와 같은 메트릭을 수집합니다. 이렇게 하면 웨어하우스에 대해 쿼리를 실행하지 않아도 되므로 컴퓨팅 비용이 절감됩니다. 모든 웨어하우스가 시스템 메타데이터를 노출하는 것은 아닙니다. 시스템 메타데이터에서 수집할 수 없는 메트릭의 경우, 모니터가 웨어하우스에 직접 쿼리를 실행하여 값을 계산합니다.

Data Observability 모니터를 사용하려면 최소 하나 이상의 지원되는 데이터 웨어하우스(예: [Snowflake][3], [Databricks][4] 또는 [BigQuery][5])에 [Quality Monitoring][2]이 설정되어 있어야 합니다.

Data Observability는 [모니터 생성 흐름][13]의 첫 번째 단계에서 선택하는 네 가지 모니터 유형을 제공합니다.

| 모니터 유형 | 모니터링 대상 |
|---|---|
| 데이터 품질 | 테이블 및 열에 대한 신선도, 행 수, 열 수준 메트릭. |
| [소스-대상](#source-to-target-monitors) | 소스 자산과 대상 자산 간 동일한 메트릭의 차이. |
| [스키마 변경](#schema-change-monitors) | 웨어하우스에서 추가, 제거, 이름 변경 또는 유형이 변경된 필드. |
| 작업 | 실패한 작업 실행. |

별도로 명시되지 않는 한, 아래 섹션에서는 데이터 품질 모니터 유형에 대해 설명합니다.

## 모니터 생성 {#monitor-creation}

Datadog에서 Data Observability 모니터를 생성하려면 [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] 또는 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Data Observability{{< /ui >}}][6]로 이동하세요 기존의 모든 Data Observability 모니터를 보려면 [Data Observability 모니터 페이지][7]를 참조하세요

## 모니터링 데이터 선택 {#choose-data-to-monitor}

먼저 {{< ui >}}Table{{< /ui >}} 수준 또는 {{< ui >}}Column{{< /ui >}} 수준 중 무엇을 모니터링할지 선택합니다.

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="모니터링할 데이터 선택: 엔터티 유형 선택기, 쿼리 입력 및 계보 관계 필터" style="width:60%;" >}}

그런 다음 {{< ui >}}Edit{{< /ui >}} 탭을 사용하여 검색 필드에 `key:value` 필터를 입력하여 테이블, 보기 또는 열을 검색합니다.

**이름 또는 위치별 필터링:**

| 필터 | 예시 | 설명 |
|---|---|---|
| 이름 | `name:USERS*` | 이름으로 일치시킵니다. `*` 와일드카드를 지원합니다. |
| 스키마 | `schema:PROD` | 스키마별로 일치시킵니다. |
| 데이터베이스 | `database:ANALYTICS_DB` | 데이터베이스별로 일치시킵니다. |
| 계정 | `account:my_account` | 계정별로 일치시킵니다. |

**태그로 필터링:**

태그 키를 필터 키로 사용하여 데이터 에셋에 적용된 모든 태그를 필터링합니다. 예를 들어, 에셋에 `owner`, `platform` 또는 `environment` 태그가 적용된 경우 해당 태그를 직접 검색합니다.

| 예시 | 설명 |
|---|---|
| `owner:data-platform-team` | `owner:data-platform-team`으로 태그된 에셋을 일치시킵니다. |
| `platform:snowflake` | `platform:snowflake`으로 태그된 에셋을 일치시킵니다. |
| `environment:production` | `environment:production`으로 태그된 에셋을 일치시킵니다. |

태그 필터는 이름 필터와 동일한 `*` 와일드카드 및 따옴표를 지원합니다(예: `owner:data-*` 또는 `platform:"Snowflake Prod"`).

**계산된 속성으로 필터링:**

사용자 지정 태그 외에도 Datadog은 필터링할 수 있는 데이터 에셋의 속성을 계산합니다. 사용 가능한 계산된 속성은 다음과 같습니다.

| 속성 | 값 | 설명 |
|---|---|---|
| `lineage_score` | `0.00`, `0.10`, `0.30`, `0.50`, `0.70`, `0.90` 또는 `1.00` |  동일한 유형의 다른 에셋과 비교하여 얼마나 많은 다운스트림 에셋이 의존하는지에 따라 리니지 그래프에서 에셋이 얼마나 연결되어 있는지를 나타내는 상대적 척도입니다. 값이 높을수록 다운스트림 소비자가 의존하는 테이블, 뷰, 열임을 나타냅니다. |

`lineage_score`는 연속적인 값을 취하는 대신 위에 나열된 개별 계층으로 버킷화되므로 해당 정확한 값 중 하나로 필터링합니다. 단일 계층을 일치시키거나 `OR`로 계층을 결합합니다. 예를 들어, `lineage_score:1.00`은 가장 많이 의존되는 자산을 반환하고, `lineage_score:(0.90 OR 1.00)`은 상위 2개 계층을 반환합니다.

이러한 필터를 `AND` 또는 `OR`와 결합하고, 괄호를 사용하여 조건을 그룹화하며, `-`를 접두사로 사용하여 제외합니다.

**예시:**

| 목표 | 쿼리 |
|---|---|
| 임시 표를 제외한 PROD 스키마의 모든 표 | `schema:PROD AND -name:TEMP*` |
| 모든 타임스탬프 열 | `name:*_AT OR name:*_TIMESTAMP` |
| 특정 데이터베이스에 대해 PROD 또는 STAGING에 있는 표 | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |
| 특정 팀이 소유한 표 | `owner:data-platform-team` |
| 데이터베이스에서 가장 많이 의존되는 표 | `database:ANALYTICS_DB AND lineage_score:1.00` |

**계보 관계별 필터:**

계보 그래프에서 다른 자산과 연결된 자산으로 선택 범위를 좁히려면 {{< ui >}}Add Relation Filter{{< /ui >}}를 클릭합니다 {{< ui >}}Upstream of{{< /ui >}} 또는 {{< ui >}}Downstream of{{< /ui >}}를 선택한 다음, 특정 자산을 선택하거나 동일한 `key:value` 필터를 사용하여 자산 집합을 일치시킵니다. 예를 들어, 중요한 대시보드의 상위에 있는 모든 표를 모니터링하거나, 특정 소스 표의 하위에 있는 모든 열을 모니터링합니다.

**계층 관계별 필터:**

계보 그래프에서 다른 자산의 상위 또는 하위 자산으로 선택 범위를 좁히려면 {{< ui >}}Add Relation Filter{{< /ui >}}를 클릭합니다. {{< ui >}}Parent of{{< /ui >}} 또는 {{< ui >}}Child of{{< /ui >}}를 선택한 다음, 특정 자산을 선택하거나 동일한 `key:value` 필터를 사용하여 자산 집합을 일치시킵니다. 예를 들어, `revenue` 열이 있는 모든 표나 중요한 스키마 내에 있는 모든 표를 모니터링합니다

단일 모니터는 최대 5,000개의 표, 뷰 또는 열을 추적할 수 있습니다. 이 제한은 늘릴 수 없습니다. 쿼리가 더 많은 항목과 일치하는 경우, 여러 모니터로 나누세요

## 메트릭 유형 선택{#select-your-metric-type}

추적하려는 데이터 품질 신호를 기반으로 메트릭 유형을 선택합니다. 각 모니터는 하나의 메트릭 유형을 추적합니다.

{{< tabs >}}
{{% tab "신선도" %}}

{{< ui >}}Freshness{{< /ui >}} 메트릭 유형은 예상 시간 창 내에 데이터가 업데이트되지 않은 경우를 감지합니다. 다운스트림 보고서나 모델에 영향을 미치기 전에 오래된 데이터를 포착하는 데 사용하세요.

- **표 신선도**는 표가 마지막으로 업데이트된 이후 경과된 시간을 추적합니다. 표 신선도는 뷰나 시스템 메타데이터에서 표에 대한 업데이트된 타임스탬프를 제공하지 않는 데이터 웨어하우스에는 사용할 수 없습니다. 대신 열 수준 신선도를 사용하세요.
- **열 신선도**는 날짜/시간 열에서 확인된 가장 최근 날짜를 추적합니다.

{{% /tab %}}
{{% tab "행 개수" %}}

{{< ui >}}Row Count{{< /ui >}} 메트릭 유형은 표의 행 개수 변화를 추적합니다. 파이프라인 오류나 업스트림 문제를 나타낼 수 있는 예상치 못한 데이터 감소 또는 급증을 감지하는 데 사용하세요

{{% /tab %}}
{{% tab "열 메트릭" %}}

{{< ui >}}Column{{< /ui >}} 메트릭 유형은 열 수준 메트릭을 추적하여 데이터 드리프트나 품질 저하를 감지합니다. 다음 중에서 선택하세요.

| 메트릭 | 설명 |
|---|---|
| {{< ui >}}Uniqueness{{< /ui >}} | 열에서 고유한 값의 비율입니다. |
| {{< ui >}}Nullness{{< /ui >}} | 열에서 null인 값의 비율입니다. |
| {{< ui >}}Cardinality{{< /ui >}} | 열에 있는 고유 값의 개수입니다. |
| {{< ui >}}Percent Zero{{< /ui >}} | 열에서 0과 같은 값의 비율입니다. |
| {{< ui >}}Percent Negative{{< /ui >}} | 열에서 음수인 값의 비율입니다. |
| {{< ui >}}Min{{< /ui >}} | 열에 있는 모든 값의 최솟값입니다. |
| {{< ui >}}Max{{< /ui >}} | 열에 있는 모든 값의 최댓값입니다. |
| {{< ui >}}Mean{{< /ui >}} | 열에 있는 모든 값의 평균값입니다. |
| {{< ui >}}Standard Deviation{{< /ui >}} | 열에 있는 값들 사이의 변동을 측정한 값입니다. |
| {{< ui >}}Sum{{< /ui >}} | 열에 있는 모든 값의 합계입니다. |

<div class="alert alert-info">일부 열 메트릭은 특정 열 유형에서만 사용할 수 있습니다. 숫자 메트릭(0 비율, 음수 비율, 최솟값, 최댓값, 평균, 표준 편차, 합계)은 숫자 열이 필요합니다.</div>

{{% /tab %}}
{{% tab "커스텀 SQL" %}}

{{< ui >}}Custom SQL{{< /ui >}} 메트릭 유형은 사용자가 정의한 SQL 쿼리에 의해 반환된 사용자 지정 메트릭 값을 추적합니다. 비즈니스별 데이터 품질 규칙 모니터링과 같이 기본 제공 메트릭 유형이 사용 사례를 다루지 못할 때 사용하세요.

1. 쿼리에서 반환된 값을 설명하는 모델 유형을 선택하세요.
    - {{< ui >}}Default{{< /ui >}}: 쿼리가 스칼라 값을 반환합니다. 대부분의 경우에 사용하세요.
    - {{< ui >}}Freshness{{< /ui >}}: 쿼리가 현재 시간과 이벤트가 마지막으로 발생한 시간 사이의 차이(초 단위)를 반환합니다.
    - {{< ui >}}Percentage{{< /ui >}}: 쿼리가 0에서 100 사이의 백분율 값을 반환합니다.
2. `dd_value`로 별칭이 지정된 단일 값을 반환하는 SQL 쿼리를 작성하세요. 예: `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`
3. 쿼리 구문을 확인하려면 {{< ui >}}Validate{{< /ui >}}를 클릭합니다.

SQL 쿼리에 `GROUP BY` 절이 포함된 경우, {{< ui >}}Group by{{< /ui >}} 필드에 그룹화된 열을 쉼표로 구분된 목록으로 나열합니다(예: `column_a, column_b`). 각 그룹은 독립적으로 평가됩니다.

**참고**: 각 사용자 지정 SQL 모니터는 청구 목적상 개별 모니터링 대상 테이블로 계산됩니다.

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="사용자 지정 SQL 모니터 생성을 위한 입력 필드입니다." style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 모니터 설정 {#configure-monitor}

### 감지 방법 {#detection-method}

감지 방법을 선택하세요.

- {{< ui >}}Anomalies{{< /ui >}}: 메트릭이 예상 패턴에서 벗어날 때 경보를 보냅니다. 임계값은 필요하지 않습니다. 이상 모델은 기본 데이터 업데이트 빈도에 따라 **3~7일**(주말 포함)이 소요됩니다. 학습 기간 동안 모니터는 경보를 발생시키지 않으며 파란색으로 표시됩니다. 학습이 완료되면 모니터는 정상 상태일 때 녹색으로, 이상치 상태일 때 빨간색으로 표시됩니다.
- {{< ui >}}Thresholds{{< /ui >}}: 메트릭이 고정 값 기준을 지날 때 경보를 보냅니다. 비교 연산자(`above`, `above or equal to`, `below`, `below or equal to`, `equal to` 또는 `not equal to`)를 설정하고 {{< ui >}}Critical{{< /ui >}} 임계값을 정의하세요(필수). 선택적으로 {{< ui >}}Warning{{< /ui >}} 임계값을 정의할 수도 있습니다. 자세한 내용은 [Configure Monitors][8]를 참조하세요.

### WHERE 절 {#where-clause}

모니터가 평가하는 데이터를 필터링하려면 {{< ui >}}WHERE{{< /ui >}} 절을 추가하세요. 이는 특정 데이터 세그먼트나 최근 레코드만 모니터링할 때 유용합니다. 예를 들면 다음과 같습니다.

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — 지난주의 행만 모니터링합니다.
- `region = 'US'` — 특정 지역의 데이터만 모니터링합니다.

### Group by {#group-by}

{{< ui >}}Group by{{< /ui >}} 절을 추가하여 단일 모니터를 여러 그룹으로 분할하고 각 그룹을 독립적으로 평가할 수 있습니다. 예를 들어, 행 개수 모니터를 `REGION` 열별로 그룹화하면 각 지역에 대해 별도의 경보가 생성됩니다.

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="GROUP BY 차원을 선택하기 위한 입력 필드입니다." style="width:80%;" >}}

기본 제한은 모니터당 500개 그룹입니다. 이 제한을 늘리려면 [지원팀에 문의][9]하세요.

### 모델 구성 {#model-configuration}

{{< ui >}}Anomalies{{< /ui >}} 감지 방법을 사용하는 모니터의 경우 {{< ui >}}Model configuration{{< /ui >}}을 확장하여 모델의 동작 방식을 구체화합니다.

| 설정| 설명|
|---|---|
| {{< ui >}}Alert after N consecutive anomalies{{< /ui >}} | 모니터가 경고를 보내기 전까지 연속으로 실패한 평가 횟수입니다. 분리된 스파이크를 억제하도록 이 설정을 구성합니다. |
| {{< ui >}}Minimum upper bound size{{< /ui >}} | 모델이 상한에서 데이터를 얼마나 엄격하게 추적할지 제한합니다. |
| {{< ui >}}Minimum lower bound size{{< /ui >}} | 모델이 하한에서 데이터를 얼마나 엄격하게 추적할지 제한합니다. |

{{< ui >}}If data is missing to evaluate{{< /ui >}} 드롭다운 메뉴에서 평가할 데이터를 사용할 수 없을 때 모니터가 보고할 내용을 선택하세요.

### 모니터 일정 {#monitor-schedule}

모니터가 데이터를 평가하는 빈도를 설정하세요.

- {{< ui >}}Scheduled{{< /ui >}}: 모니터가 고정된 주기로 실행됩니다. {{< ui >}}Run this monitor{{< /ui >}} 아래에서 {{< ui >}}Hourly{{< /ui >}}, {{< ui >}}Every 3 hours{{< /ui >}}, {{< ui >}}Every 6 hours{{< /ui >}}, {{< ui >}}Every 12 hours{{< /ui >}}, {{< ui >}}Daily{{< /ui >}} 또는 {{< ui >}}Custom schedule{{< /ui >}}을 선택합니다.
- {{< ui >}}Manual{{< /ui >}} (미리 보기): 모니터가 프로그래밍 방식으로 트리거될 때만 실행됩니다. 모델링이 유용하도록 충분한 과거 데이터를 축적하려면 [Data Observability API][10]를 사용하여 일정에 따라 이러한 모니터를 실행합니다. UI는 행 수 및 신선도와 같은 기본 메트릭을 지원하지 않으므로 이 워크플로는 사용자 지정 또는 열 수준 메트릭에 적용됩니다.

고유한 일정을 정의하려면 {{< ui >}}Custom schedule{{< /ui >}}를 선택하고 cron 표현식을 입력합니다. 사용자 지정 일정은 15분마다 실행될 수 있습니다. {{< ui >}}Preview times{{< /ui >}}는 현지 시간대의 다음 몇 번의 실행을 나열하므로 저장하기 전에 표현식을 확인할 수 있습니다.

### 경보 조건 설정 {#set-alert-conditions}

집계 유형을 선택합니다.

- {{< ui >}}Simple Alert{{< /ui >}}: 모니터링되는 테이블이나 열이 조건을 충족할 때 단일 알림을 보냅니다.
- {{< ui >}}Multi Alert{{< /ui >}}: 조건을 충족하는 각 그룹에 대해 알림을 보냅니다. 경보 세분성을 제어하려면 그룹화할 차원(`table`, `schema`, `database` 등)을 사용자 지정합니다. 예를 들어 `schema`별로 그룹화하면 스키마당 하나의 경보만 전송되므로, 영향을 받는 모든 테이블을 하나로 묶어 노이즈를 줄일 수 있습니다.

### 알림 예시 {#example-notification}

{{< tabs >}}
{{% tab "임계값" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Data quality issue detected on {{database.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{% tab "이상" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{database.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 소스-대상 모니터 {#source-to-target-monitors}

<div class="alert alert-info">소스-대상 모니터는 미리 보기 상태입니다. 액세스를 요청하려면 Datadog 담당자나 <a href="/help/">지원 팀</a>에 문의하세요.</div>

소스-대상 모니터는 두 데이터 자산의 동일한 메트릭을 비교하고 두 값이 다를 때 경보를 보냅니다. 다른 Data Observability 모니터는 단일 자산의 신선도나 완전성을 추적합니다. 소스-대상 모니터는 대상에 도착한 복사본이 소스에서 나간 것과 일치하는지 추적합니다.

파이프라인이 시스템 간에 데이터를 이동할 때 부분적인 실패는 실패처럼 보이지 않는 경우가 많습니다. 100,000개의 행이 소스 테이블을 떠나고 99,850개의 행이 대상에 도착하면, 대상의 행 수 모니터만으로는 그럴듯한 값으로 보입니다. 두 자산을 비교하면 차이가 드러납니다.

소스-대상 모니터를 사용하여 다음을 수행하세요.

- Postgres에서 Databricks로의 복제를 검증합니다.
- 동일한 Snowflake 계정 내의 두 데이터베이스(예: 품질 데이터베이스와 프로덕션 데이터베이스)를 조정합니다.
- 전환 전에 Redshift에서 BigQuery로의 마이그레이션을 검증하기 위해 두 시스템을 나란히 실행하고 일치하는지 확인합니다.
- 변환 과정에서 입력과 출력 사이에 행이 누락되지 않았는지 확인합니다.

소스-대상 모니터는 GovCloud를 제외한 모든 리전에서 사용할 수 있습니다.

### 소스-대상 모니터 만들기 {#create-a-source-to-target-monitor}

1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6]로 이동하여 {{< ui >}}Source to Target{{< /ui >}}을 선택합니다.
2. {{< ui >}}Choose source{{< /ui >}}에서 소스 데이터가 있는 웨어하우스를 선택한 다음 비교할 데이터를 선택합니다.
3. {{< ui >}}Choose target{{< /ui >}}에서 대상에 대해서도 동일하게 수행합니다. 소스와 대상은 서로 다른 데이터 웨어하우스에 있거나 동일한 웨어하우스에 있을 수 있습니다.
4. {{< ui >}}Select your metric type{{< /ui >}}에서 비교할 메트릭을 선택합니다. 소스-대상 모니터는 행 수, 신선도, null 여부, 고유성, 카디널리티 및 {{< ui >}}Custom SQL{{< /ui >}}을 포함하여 다른 Data Observability 모니터와 동일한 메트릭 유형을 지원합니다.
5. 비교가 표시되는 방식을 제어하려면 {{< ui >}}Format{{< /ui >}}을 설정합니다.
    - {{< ui >}}Difference{{< /ui >}}: 대상 값에서 소스 값을 뺀 값입니다. 음수 값은 대상이 소스보다 작음을 의미합니다.
    - {{< ui >}}% Difference{{< /ui >}}: 소스 값에 대한 백분율로 표시된 동일한 차이입니다.
6. [모니터 구성](#configure-monitor)에 설명된 대로 감지 방법, 예약 및 알림을 구성합니다.

{{< ui >}}Preview Monitor Evaluation{{< /ui >}} 패널에는 식별된 소스 및 대상과 선택한 메트릭의 미리 보기가 표시됩니다.

모니터링되는 자산이 대상이므로 모니터는 대상의 상태 페이지에 나타납니다.

### 사용자 지정 메트릭 비교{#compare-a-custom-metric}

메트릭 유형이 {{< ui >}}Custom SQL{{< /ui >}}인 경우 소스에 대한 쿼리 하나와 대상에 대한 쿼리 하나를 제공합니다. 이 메트릭 유형에는 {{< ui >}}WHERE{{< /ui >}} 절이 허용되지 않습니다. 각 쿼리에 필터링을 포함하세요.

### 평가 {#evaluation}

소스와 대상 간의 차이는 자체 메트릭으로 기록되므로 소스-대상 모니터는 이상 감지를 포함한 다른 Data Observability 모니터와 동일한 감지 방법으로 평가됩니다. 양쪽 모두 동기화된 일정에 따라 측정되므로 각 웨어하우스의 기본 수집 주기를 따르는 대신 두 값이 동시에 캡처됩니다.

## 스키마 변경 모니터{#schema-change-monitors}

<div class="alert alert-info">스키마 변경 모니터는 미리 보기 상태입니다.</div>

스키마 변경 모니터는 데이터의 내용이 변경될 때가 아니라 데이터의 구조가 변경될 때 경고합니다. 열이 삭제되거나, 이름이 변경되거나, 다른 데이터 유형으로 전환되는 경우와 같이 다운스트림 파이프라인이나 대시보드가 중단되기 전에 업스트림 변경 사항을 포착하는 데 사용합니다.

스키마 변경 모니터는 데이터베이스, 스키마, 표 및 열 전반에서 네 가지 유형의 변경 사항을 감지합니다.

| 변경 유형 | 설명 |
|---|---|
| 추가됨 | 데이터베이스, 스키마, 표 또는 열이 생성되었습니다. |
| 제거됨 | 데이터베이스, 스키마, 표 또는 열이 삭제되었습니다. |
| 이름 변경됨 | 표 또는 열의 이름이 변경되었습니다. |
| 유형 변경됨 | 열의 데이터 유형이 `INTEGER`에서 `STRING`으로 변경되었습니다. |

스키마 변경은 Snowflake, BigQuery, Databricks 및 Redshift에 대해 감지됩니다.

### 스키마 변경 모니터 만들기 {#create-a-schema-change-monitor}

1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Schema Change{{< /ui >}}][11]로 이동합니다.
2. {{< ui >}}Choose data to monitor{{< /ui >}}에서 감시할 웨어하우스를 선택합니다.
3. [모니터 구성](#configure-monitor)에 설명된 대로 알림을 구성합니다.

스키마 변경 모니터는 측정된 값이 경계를 넘는 것이 아니라 구조적 변경에 대해 경고하므로 메트릭 유형이나 감지 방법을 사용하지 않습니다.

### 감지된 스키마 변경 찾아보기 {#browse-detected-schema-changes}

모니터를 만들지 않고 Datadog이 감지한 변경 사항을 보려면 [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Schema Changes{{< /ui >}}][12]로 이동합니다. 플랫폼, 계정, 데이터베이스, 스키마 또는 변경 유형별로 필터링하고 항목을 확장하여 영향을 받는 열과 해당 데이터 유형을 확인합니다.

변경 사항은 Datadog이 웨어하우스에서 스키마 메타데이터를 다음에 수집하고 현재 구조를 이전에 수집한 구조와 비교할 때 감지됩니다.

## 모니터 예시 {#example-monitors}

{{< tabs >}}
{{% tab "행 수 감소" %}}

파이프라인 오류나 데이터 누락을 나타낼 수 있는 행 수의 상당한 감소를 감지합니다.

1. {{< ui >}}Table{{< /ui >}} > {{< ui >}}Row Count{{< /ui >}}를 선택하고 대상 표(예: `ANALYTICS_DB.PROD.EVENTS`)를 선택합니다.
2. {{< ui >}}Anomalies{{< /ui >}}를 감지 방법으로 선택합니다. 행 수가 과거 기준선에서 벗어나면 모니터가 트리거됩니다.

{{% /tab %}}
{{% tab "오래된 표" %}}

중요한 표가 예상 시간 내에 업데이트되지 않았을 때 경고합니다.

1. {{< ui >}}Table{{< /ui >}} > {{< ui >}}Freshness{{< /ui >}}를 선택하고 대상 표(예: `ANALYTICS_DB.PROD.ORDERS`)를 선택합니다.
2. {{< ui >}}Thresholds{{< /ui >}}를 감지 방법으로 선택합니다.
3. {{< ui >}}Alert threshold{{< /ui >}}를 **6시간**으로 설정하고 선택적으로 {{< ui >}}Warning threshold{{< /ui >}}를 **4시간**으로 설정합니다.

{{% /tab %}}
{{% tab "Null 비율 급증" %}}

열의 null 비율이 정상 수준을 초과할 때 감지하며, 이는 데이터 수집 문제를 나타낼 수 있습니다.

1. {{< ui >}}Column{{< /ui >}} > {{< ui >}}Nullness{{< /ui >}}를 선택하고 대상 열(예: `ANALYTICS_DB.PROD.USERS.EMAIL`)을 선택합니다.
2. {{< ui >}}Anomalies{{< /ui >}}를 감지 방법으로 선택합니다.

{{% /tab %}}
{{% tab "소스와 대상 간에 손실된 행" %}}

복제 또는 마이그레이션 후 소스 표와 대상 표 사이에서 누락된 행을 감지합니다.

1. {{< ui >}}Source to Target{{< /ui >}}을 선택한 다음 소스 표(예: `POSTGRES_DB.PUBLIC.ORDERS`)와 대상 표(예: `ANALYTICS_DB.PROD.ORDERS`)를 선택합니다.
2. {{< ui >}}Row Count{{< /ui >}}를 메트릭 유형으로 선택하고 {{< ui >}}Format{{< /ui >}}을 {{< ui >}}Difference{{< /ui >}}로 설정합니다.
3. {{< ui >}}Anomalies{{< /ui >}}를 감지 방법으로 선택합니다.

{{% /tab %}}
{{< /tabs >}}

## 경계 주석 달기{#annotate-bounds}

**이상** 감지 방법을 사용하는 모니터의 경우, 경계 범위를 주석으로 달아 피드백을 제공하고 시간이 지남에 따라 모델을 개선할 수 있습니다. 인프라 메트릭과 달리 데이터 품질 메트릭은 비즈니스별로 다른 경우가 많으므로, 주석을 사용하여 데이터에 어떤 동작이 정상인지 모델에 학습시킵니다.

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="모니터 경계에 주석을 달기 위한 호버 메뉴입니다." style="width:90%;" >}}

모니터의 상태 페이지에서 {{< ui >}}Annotate Bounds{{< /ui >}}를 클릭하고, 차트에서 시간 범위를 선택한 다음, 다음 주석 중 하나를 선택합니다.

| 주석 | 설명 |
|---|---|
| {{< ui >}}Expected{{< /ui >}} | 경계를 확장하여 표시된 동작을 영구적으로 포함합니다. |
| {{< ui >}}Reset for now{{< /ui >}} | 동작을 OK로 표시하되, 다시 발생하면 경고합니다. |
| {{< ui >}}Missed alert{{< /ui >}} | 경계를 축소하여 이 동작에 대해 경고합니다. |
| {{< ui >}}Ignore{{< /ui >}} | 경계를 모델링할 때 주석이 달린 데이터를 제외합니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_observability/
[2]: /ko/data_observability/quality_monitoring/
[3]: /ko/data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /ko/data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /ko/data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: https://app.datadoghq.com/monitors/create/data-quality
[7]: https://app.datadoghq.com/data-obs/monitors
[8]: /ko/monitors/configuration/?tab=thresholdalert#thresholds
[9]: /ko/help/
[10]: /ko/api/latest/data-observability/
[11]: https://app.datadoghq.com/monitors/create/schema-change
[12]: https://app.datadoghq.com/data-obs/schema-changes
[13]: https://app.datadoghq.com/monitors/create/data-quality