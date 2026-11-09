---
aliases:
- /ko/llm_observability/improve/experiments/analyzing_results/
- /ko/llm_observability/experiments/analyzing_results/
description: Agent Observability Offline Experiments 결과 분석 방법
title: 오프라인 실험 결과 분석
---
이 페이지에서는 Datadog의 Offline Experiments UI와 위젯에서 Agent Observability Offline Experiments 결과를 분석하는 방법을 설명합니다.

Experiment를 실행한 후 결과를 분석하여 성능 패턴을 파악하고 문제가 있는 레코드를 조사할 수 있습니다.

## Datadog의 Experiment 페이지 사용 {#using-the-experiment-page-in-datadog}

Offline Experiments 페이지에서 실험을 클릭하여 세부정보를 확인합니다.

{{< ui >}}Summary{{< /ui >}} 섹션에는 Experiment 실행 중에 기록된 평가, 요약 평가 및 메트릭이 포함되어 있습니다.

각 값은 유형에 따라 집계됩니다.
- **불리언**: 기록된 모든 값 중 `True`의 비율로 집계됩니다.
- **점수**: 기록된 모든 값의 평균으로 집계됩니다.
- **범주형**: 최빈값(분포에서 가장 빈번한 값)으로 집계됩니다.

{{< ui >}}Records{{< /ui >}} 섹션에는 데이터셋 입력에 대한 작업 실행과 관련된 트레이스가 포함되어 있습니다. 각 트레이스에는 에이전트를 통해 정보가 흐르는 방식을 보여주는 스팬 목록이 포함되어 있습니다.

(왼쪽에 있는) 패싯을 사용하여 평가 결과를 기반으로 레코드를 필터링하고 패턴을 찾아낼 수 있습니다.

### 결과 표 사용자 지정 {#customizing-the-results-table}

각 트레이스를 개별적으로 열지 않고도 가장 중요한 필드를 표시하도록 실험 결과 표를 사용자 지정할 수 있습니다.

#### 열 선택기 {#column-picker}

열 선택기를 사용하여 열을 켜거나 끄고, 드래그하여 순서를 변경하세요. 중첩된 JSON 경로를 추출하여 원시 JSON Blob 열(입력, 출력, 예상 출력)을 구조화된 필드로 구문 분석합니다. 언제든지 토글을 켜서 해당 열을 다시 표시할 수 있습니다.

표에는 각 실험 실행이 어떤 데이터셋 레코드를 대상으로 수행되었는지 보여주는 {{< ui >}}Record ID{{< /ui >}} 열이 포함되어 있습니다. 레코드당 여러 번 실행되는 오프라인 실험의 경우 레코드를 확장하여 해당 레코드의 모든 실행을 확인합니다.

#### 사용자 지정 열 {#custom-columns}

입력 키, 출력 키, 메타데이터 키와 같은 최상위 실험 스팬에서 특정 필드를 추출하여 별도의 표 열로 표시합니다. 이를 통해 레코드 간의 주요 속성을 한눈에 비교할 수 있습니다.

사용자 지정 열을 추가하려면 표 상단의 {{< ui >}}Add Column{{< /ui >}} 입력란에 필드 경로를 입력합니다.

| 소스          | 경로 형식                    | 예시                          |
| --------------- | ------------------------------ | -------------------------------- |
| 입력           | `@meta.input.<key>`           | `@meta.input.user_query`        |
| 출력          | `@meta.output.<key>`          | `@meta.output.result.status`    |
| 예상 출력 | `@meta.expected_output.<key>` | `@meta.expected_output.answer`  |
| 메타데이터        | `@meta.metadata.<key>`        | `@meta.metadata.scenario_type`  |
| 태그             | `<tag_key>`                    | `env`                            |

여러 개의 사용자 지정 열을 추가하고 열을 끌어다 놓아 순서를 변경할 수 있습니다. 열 구성은 프로젝트별로 브라우저의 로컬 스토리지에 저장됩니다.

#### 스팬 세부정보에서 빠른 작업 수행 {#quick-actions-from-the-span-detail}

스팬 세부정보 사이드 패널에서 루트 스팬을 볼 때 경로를 직접 입력하지 않고 컨텍스트 메뉴에서 필드 관련 작업을 바로 수행할 수 있습니다.

JSON 필드(입력, 출력, 예상 출력, 메타데이터)에서 다음 옵션을 사용할 수 있습니다.

- {{< ui >}}Copy key path{{< /ui >}}: 필드의 전체 경로(예: `@meta.input.user_query`)를 복사하여 사용자 지정 열 입력란, 검색창 또는 대시보드 위젯 쿼리에 붙여넣을 수 있습니다.
- {{< ui >}}Add column{{< /ui >}}: 클릭 한 번으로 필드를 결과 표의 사용자 지정 열로 추가합니다.
- {{< ui >}}Filter by / Exclude{{< /ui >}}: 필드의 키-값 쌍을 검색 쿼리에 추가하여 일치하는 레코드의 범위를 좁히거나 해당 레코드를 제외합니다. 리프 값(문자열, 숫자, 불리언)에만 사용할 수 있습니다.

태그에서 다음 옵션을 사용할 수 있습니다.

- {{< ui >}}Copy key{{< /ui >}}: 태그 키를 복사합니다(예: `env`).
- {{< ui >}}Copy to clipboard{{< /ui >}}: 값을 포함한 전체 태그를 복사합니다(예: `env:prod`).
- {{< ui >}}Add column{{< /ui >}}: 태그 키를 결과 표의 사용자 지정 열로 추가합니다.
- {{< ui >}}Filter by / Exclude{{< /ui >}}: 태그의 키-값 쌍을 검색 쿼리에 추가합니다.

<div class="alert alert-info">이 작업들은 트레이스의 루트 스팬에서 사용할 수 있습니다.</div>

### 특정 레코드 검색 {#searching-for-specific-records}

검색창을 사용하여 속성(데이터셋 레코드 데이터) 또는 실험 결과(출력 및 평가)를 기반으로 특정 레코드를 찾을 수 있습니다. 검색은 트레이스 수준에서 실행됩니다.

{{< img src="llm_observability/experiments/exp_details_search.png" alt="Agent Observability의 Experiment Details 화면 제목: '검색창 강조 표시'" style="width:100%;" >}}

<div class="alert alert-info">최대한 많은 데이터에 액세스하려면 <code>ddtrace-py >= 4.1.0</code>, 이 버전에는 다음과 같은 변경 사항이 포함되어 있기 때문입니다.

<ul>
<li>Offline Experiments 스팬에는 데이터셋 레코드의 메타데이터가 포함되어 있습니다. </li>
<li>Offline Experiments 스팬의 <code>input</code>, <code>output</code>및 <code>expected_output</code> 필드는 원래 형식 그대로 저장됩니다(즉, JSON으로 전송된 경우 쿼리 가능한 JSON으로 저장됩니다). </li>
<li>Offline Experiments 스팬과 하위 스팬에 다음 태그가 지정됩니다. <code>dataset_name</code>, <code>project_name</code>, <code>project_id</code>, <code>experiment_name</code> 검색을 쉽게 하기 위한 것입니다.</li>
</ul></div>

#### 키워드로 트레이스 찾기 {#find-traces-by-keyword}
키워드 검색은 사용 가능한 모든 정보(입력, 출력, 예상 출력, 메타데이터, 태그)에 대해 검색을 수행합니다.

#### 평가별로 트레이스 찾기 {#find-traces-by-evaluation}

평가를 기준으로 트레이스를 찾으려면 `@evaluation.<name>.value:<criteria>`를 검색합니다.

| 평가 유형 | 검색어 예시 |
| --------------- | ----------- |
| 불리언         | `@evaluation.has_risk_pred.value:true` |
| 점수           | `@evaluation.correctness.value:>=0.35` |
| 범주형     | `@evaluation.violation.value:(not_fun OR not_nice)` |

#### 실험 상태별 트레이스 찾기 {#find-traces-by-experiment-status}

실험 상태를 기준으로 트레이스를 찾으려면 `@experiment.status:<status>`를 검색합니다.

| 상태 | 검색어 예시 |
| ------ | ------------------- |
| 실행 중 | `@experiment.status:running` |
| 완료됨 | `@experiment.status:completed` |

#### 메트릭별 트레이스 찾기 {#find-traces-by-metric}

Offline Experiments는 소요 시간, 토큰 수 및 비용 메트릭을 자동으로 수집합니다.

| 메트릭               | 검색어 예시 |
| -------------------- | ------------------- |
| 소요 시간             | `@duration:>=9.5s ` |
| 토큰 수          | `@trace.total_tokens:>10000` |
| 예상 총 비용<br/>(나노달러 단위, 1나노달러 = 10<sup>-9</sup>달러) | `@trace.estimated_total_cost:>10000000` |


#### 태그별 트레이스 찾기 {#find-traces-by-tag}

태그를 사용하여 트레이스를 찾으려면 `<tag>:<value>`를 검색합니다. 예를 들어, `dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 `입니다.

사용 가능한 태그를 확인하려면 트레이스를 열어 해당 태그를 확인합니다.

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="Agent Observability의 실험 트레이스 사이드 패널 트레이스 태그를 찾을 수 있는 위치를 강조 표시한 화면" style="width:100%;" >}}


#### 입력, 출력, 예상 출력 또는 메타데이터별 트레이스 찾기 {#find-traces-by-input-output-expected-output-or-metadata}

입력, 출력, 예상 출력 또는 메타데이터에서 특정 키를 쿼리하려면 속성을 JSON으로 전송해야 합니다.

| 속성 | 형식 | 검색어 예시 |
| -------- | ------ | ------------------- |
| 입력 | `@meta.input.<key1>.<subkey1>:<value>` | `@meta.input.origin.country:"France"` |
| 출력 | `@meta.output.<key1>.<subkey1>:<value>` | `@meta.output.result.status:"success"` |
| 예상 출력 | `@meta.expected_output.<key1>.<subkey1>:<value>` | `@meta.expected_output.answer:"correct"`|
| 메타데이터 | `@meta.metadata.<key1>.<subkey1>:<value>` | `@meta.metadata.source:generated` |


##### JSON 배열 쿼리 {#querying-json-arrays}
단순 배열은 문자열로 평탄화되며, 이를 쿼리할 수 있습니다.

**예시 1**: 쿼리 가능한 JSON 배열

```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```

`@meta.output.action_matches:"^/cases/settings$"`를 검색하여 이 예시 배열을 쿼리할 수 있습니다.

**예시 2**: 쿼리 불가능한 JSON 배열

```
"output": {
  "expected_actions": [
    [
      "bonjour",
      "a_bientot"
    ],
    [
      "todobem",
      "click here"
    ]
  ],
}
```

이 예시에서 배열은 중첩되어 있어 쿼리할 수 없습니다.

## Offline Experiments 데이터로 위젯 사용 {#using-widgets-with-offline-experiments-data}

Offline Experiments 데이터를 사용하여 Dashboards와 Notebooks에서 위젯을 생성할 수 있습니다.
Datadog에서는 다음을 권장합니다.
- 데이터를 세분화하는 데 도움이 되는 모든 추가 정보(예: 난이도, 언어 등)를 데이터셋 레코드의 메타데이터에 입력합니다.
- 작업이 JSON 객체를 출력하도록 합니다.
- `ddtrace-py` 버전을 4.1.0 이상으로 업데이트합니다.


Offline Experiments 데이터를 사용하여 위젯을 생성하려면 {{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Offline Experiments{{< /ui >}}를 데이터 소스로 사용합니다. 그런 다음 [이 페이지의 검색 구문](#searching-for-specific-records)을 사용하여 그래프에 표시할 이벤트의 범위를 좁힙니다.

레코드 수준으로 데이터를 집계하려면 {{< ui >}}Traces{{< /ui >}}를 사용하고, 그렇지 않으면 {{< ui >}}All Spans{{< /ui >}}를 사용합니다.

실행 중이거나 완료된 오프라인 실험 간의 메트릭을 비교하려면 `@experiment.status`를 기준으로 그룹화하거나 필터링합니다.

### 위젯 예시 {#widget-examples}
#### 메타데이터 필드별 시간 경과에 따른 성능 그래프 표시 {#plotting-performance-over-time-broken-down-by-a-metadata-field}
{{< img src="llm_observability/experiments/widget-metadata.png" alt="Offline Experiments 데이터를 사용한 위젯 메타데이터 필드별 시간 경과에 따른 성능을 보여주는 그래프" style="width:100%;" >}}

<div class="alert alert-info">불리언 평가의 평균을 계산하려면 전체 트레이스에서 차지하는 비율을 <code>True</code> 수동으로 계산해야 합니다.</div>

#### 도구 사용 통계 표시 {#displaying-tool-usage-stats}
에이전트가 특정 도구를 호출해야 하는 상황에서 해당 도구의 호출 빈도를 파악하고 사용 통계를 확인하려면 다음과 같이 설정합니다.

{{< img src="llm_observability/experiments/widget-tool.png" alt="Offline Experiments 데이터를 사용한 위젯 여러 오프라인 실험에서 특정 도구의 사용 통계를 보여주는 그래프" style="width:100%;" >}}