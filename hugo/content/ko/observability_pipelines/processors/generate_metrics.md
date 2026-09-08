---
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: 로그 기반 메트릭 생성 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

KPI와 같은 추세를 장기간 추적하기 위해 다양한 유형의 로그가 사용됩니다. 로그에서 메트릭을 생성하는 것은 CDN 로그, VPC 흐름 로그, 방화벽 로그, 네트워크 로그와 같은 대용량 로그의 로그 데이터를 요약하는 비용 효율적인 방법입니다. Generate Metrics 프로세서를 사용하여 쿼리와 일치하는 로그에서 카운트, 게이지 또는 분포 메트릭을 생성하고 해당 메트릭을 목적지로 전송합니다.

**참고**: 로그에서 생성되어 Datadog으로 라우팅된 메트릭은 [Custom Metrics][1]이며 이에 따라 요금이 청구됩니다. 자세한 내용은 [Custom Metrics 요금 청구][2]를 참조하세요.

## 설정 {#setup}

프로세서를 설정하려면 다음 단계를 따르세요.

{{< ui >}}Manage Metrics{{< /ui >}}를 클릭하여 새 메트릭을 생성하거나 기존 메트릭을 편집하세요. 그러면 사이드 패널이 열립니다.

- 아직 메트릭을 생성하지 않은 경우, [메트릭 추가](#add-a-metric) 섹션에 설명된 대로 메트릭 파라미터를 입력하여 메트릭을 생성합니다.
- 이미 메트릭을 생성한 경우, 개요 표에서 해당 메트릭의 행을 클릭하여 편집하거나 삭제합니다. 검색 창을 사용하여 이름으로 원하는 메트릭을 찾은 다음, 해당 메트릭을 선택하여 편집하거나 삭제하세요. {{< ui >}}Add Metric{{< /ui >}}을 클릭하여 다른 메트릭을 추가하세요.

### 메트릭 추가 {#add-a-metric}

<div class="alert alert-warning">Generate Metrics 프로세서는 로그의 <code>timestamp</code> 필드를 사용하여 메트릭의 타임스탬프를 설정합니다. 로그의 <code>timestamp</code> 필드가 문자열 값인 경우, 로그의 처리 시점이 대신 사용됩니다. 자세한 내용은 <a href="#convert-string-timestamp-to-timestamp-format">문자열 타임스탬프를 타임스탬프 형식으로 변환</a>을 참조하세요.</div>

1. 필터 쿼리를 입력합니다. 자세한 내용은 [로그 검색 구문][5]을 참조하세요. 
   - 필터와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
   - **참고**: 하나의 프로세서가 여러 메트릭을 생성할 수 있으므로 각 메트릭에 대해 서로 다른 필터 쿼리를 정의할 수 있습니다.
1. 메트릭 이름을 입력합니다.
1. {{< ui >}}Define parameters{{< /ui >}} 섹션에서 메트릭 유형(카운트, 게이지 또는 분포)을 선택합니다. [카운트 메트릭 예시](#count-metric-example) 및 [분포 메트릭 예시](#distribution-metric-example)를 참조하세요. 자세한 내용은 [메트릭 유형](#metrics-types)을 참조하세요.
    - 게이지 및 분포 메트릭 유형의 경우, 생성된 메트릭의 값으로 사용할 숫자(또는 구문 분석 가능한 숫자 문자열) 값을 가진 로그 필드를 선택하세요.
    - 분포 메트릭 유형의 경우, 로그 필드 값으로 (구문 분석 가능한) 숫자 배열을 사용할 수 있으며, 이 배열은 생성된 메트릭의 샘플 세트로 사용됩니다.
    - {{< ui >}}Group by{{< /ui >}} 필드는 메트릭 값을 그룹화하는 방식을 결정합니다. 예를 들어, 수백 개의 호스트가 네 개의 리전에 분산되어 있는 경우, 리전별로 그룹화하면 각 리전마다 하나의 선을 그래프에 표시할 수 있습니다. {{< ui >}}Group by{{< /ui >}} 설정에 나열된 필드는 구성된 메트릭의 태그로 설정됩니다.
1. {{< ui >}}Add Metric{{< /ui >}}을 클릭합니다.

### 메트릭 목적지 구성{#configure-a-metrics-destination}

{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!">}}
로그에서 생성된 메트릭을 Splunk HEC, Elasticsearch 또는 HTTP/S 클라이언트 목적지로 전송하는 기능은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 계정 관리자에게 문의하세요.
{{< /callout >}}

<div class="alert alert-info">생성된 메트릭을 <a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> 이외의 목적지로 전송하는 옵션은 Worker 버전 2.18 이상에서 사용할 수 있습니다.<br><br>이미 Generate Metrics 프로세서가 있는 기존 파이프라인을 Worker 버전 2.18 이상으로 업그레이드한 후 Datadog Metrics 이외의 목적지를 선택하려는 경우, 다음 단계를 수행해야 합니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;1. 기존 Generate Metrics 프로세서를 삭제합니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. 새 Generate Metrics 프로세서를 추가하고 구성합니다.</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="Select a destination이 강조 표시된 Generate Metrics 프로세서" style="width:50%;" >}}

1. Generate Metrics 프로세서에서 **Add Metrics Destination**을 클릭합니다.<br>**참고**: Pipeline Simulation을 사용하는 경우, 파이프라인 페이지로 돌아가 메트릭 목적지를 구성하세요. Pipeline Simulation 페이지 오른쪽 상단 모서리에 있는 **Back to pipeline**을 클릭하세요.
1. 기본 목적지는 [Datadog Metrics][6]입니다. 다른 목적지를 선택하려면 Datadog Metrics 목적지에서 연필 아이콘을 클릭하고 **Change metrics destination**을 선택하세요.
1. 목적지를 선택하고 특정 [목적지][7]에 대한 설정 지침을 따릅니다.

## 메트릭 유형{#metrics-types}

로그에서 다음 유형의 메트릭을 생성할 수 있습니다. 자세한 내용은 [메트릭 유형][3] 및 [분포][4] 문서를 참조하세요.

| 메트릭 유형  | 설명                                                                                                                                         | 예시                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNT        | 시간 간격 내의 총 이벤트 발생 횟수입니다. 0으로 재설정할 수는 있지만 값을 줄일 수는 없습니다.                                          | `status:error`가 포함된 로그 수를 계산하려는 경우                                     |
| GAUGE        | 보고되는 시점의 값에 대한 스냅샷입니다.                                                                                                   | 각 호스트의 최신 CPU 사용률을 추적하려는 경우                                        |
| DISTRIBUTION | 원시 값을 Datadog으로 전송하여, 메트릭을 보고하는 모든 호스트에 걸쳐 백분위수 집계(예: p95, p99)를 전역적으로 서버 측에서 계산합니다. | API 엔드포인트를 제공하는 모든 호스트에서 `response_time_seconds`의 전역 p95를 확인하려는 경우 |

### 카운트 메트릭 예시 {#count-metric-example}

다음은 `status:error` 로그 예시입니다.

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

`"status":"error"`를 포함하는 로그 수를 계산하고 `env` 및 `host`로 그룹화하는 카운트 메트릭을 생성하려면 다음 정보를 입력하세요.

| 입력 파라미터 | 값               |
|------------------|---------------------|
| 필터 쿼리     | `@status:error`     |
| 메트릭 이름      | `status_error_total`|
| 메트릭 유형      | 카운트               |
| 그룹 기준         | `env`, `prod`       |

### 분포 메트릭 예시 {#distribution-metric-example}

다음은 API 응답 로그 예시입니다.

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

API 호출에 걸리는 평균 시간을 측정하는 분포 메트릭을 생성하려면 다음 정보를 입력하세요.

| 입력 파라미터       | 값                   |
|------------------------|-------------------------|
| 필터 쿼리           | `@method`               |
| 메트릭 이름            | `status_200_response`   |
| 메트릭 유형            | 분포            |
| 로그 속성 선택 | `response_time_seconds` |
| 그룹 기준               | `method`                |

## 문자열 타임스탬프를 타임스탬프 형식으로 변환 {#convert-string-timestamp-to-timestamp-format}

Generate Metrics 프로세서는 로그 필드가 타임스탬프 유형인 경우에만 로그 `timestamp` 필드를 사용하여 메트릭 타임스탬프를 설정할 수 있습니다. `timestamp` 필드가 문자열인 경우, 로그의 처리 시점이 대신 사용됩니다. 로그 `timestamp`를 사용하려면 로그를 Generate Metrics 프로세서로 전송하기 전에 문자열을 타임스탬프 유형으로 변환해야 합니다.

문자열 타임스탬프를 타임스탬프 형식으로 변환하려면 다음 단계를 따르세요.

1. 파이프라인에서 Generate Metrics 프로세서 앞에 [커스텀 프로세서][8]를 추가합니다.
1. 다음 사용자 지정 스크립트가 포함된 함수를 추가합니다.
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][10] 및 [프로세서 버퍼 메트릭][11]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][12] 문서를 참조하세요.

### Generate Metrics 프로세서 메트릭 {#generate-metrics-processor-metrics}

- 개별 구성 요소별로 필터링하거나 그룹화하려면 `component_id` 태그를 사용하세요.
- 이 프로세서의 메트릭에서 `component_type` 태그는 `generate_metrics`입니다.

`pipelines.generated_metrics_from_logs_total`
: **설명**: 프로세서가 로그 이벤트에서 생성한 메트릭 수입니다.
: **메트릭 유형**: 카운트

[1]: /ko/metrics/custom_metrics/
[2]: /ko/account_management/billing/custom_metrics/
[3]: /ko/metrics/types/
[4]: /ko/metrics/distributions/
[5]: /ko/observability_pipelines/search_syntax/logs/
[6]: /ko/observability_pipelines/destinations/datadog_metrics/
[7]: /ko/observability_pipelines/destinations/?tab=metrics#destinations
[8]: /ko/observability_pipelines/processors/custom_processor/#setup
[9]: /ko/observability_pipelines/processors/custom_processor/#parse_timestamp
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/