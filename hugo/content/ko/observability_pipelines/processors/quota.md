---
description: Quota 프로세서를 사용하여 로깅 트래픽을 측정하고, 일일 할당량에 도달한 후 로그를 유지, 삭제 또는 라우팅하는 방법을
  알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Quota 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

Quota 프로세서는 지정한 필터와 일치하는 로그에 대한 로깅 트래픽을 측정합니다. 이 프로세서는 UTC 자정에 재설정되는 고정된 24시간 기간을 사용합니다. 기간 내에서 구성된 일일 할당량이 충족되면 프로세서는 추가 로그를 유지 또는 삭제하거나 스토리지 버킷으로 전송할 수 있습니다. 예를 들어, 프로세서가 지난 24시간 동안 특정 서비스로부터 천만 개의 이벤트를 수신한 후 새 로그를 삭제하거나 로그를 삭제하지 않고 경보를 발생시키도록 이 프로세서를 구성할 수 있습니다.

`service`, `env`, `status`와 같은 필드 기반 파티셔닝을 사용할 수도 있습니다. 각 고유 필드는 자체 일일 할당량 제한이 있는 별도의 할당량 버킷을 사용합니다. 자세한 내용은 [파티션 예시](#partition-example)를 참조하세요.

**참고**: 파이프라인은 할당량의 이름을 사용하여 Worker의 여러 Remote Configuration 배포에서 동일한 할당량을 식별합니다.

### 제한 {#limits}

- 각 파이프라인에는 최대 1,000개의 버킷이 있을 수 있습니다. 버킷 제한을 늘려야 하는 경우 [지원팀에 문의][5]하세요.
- Quota 프로세서는 Datadog 조직 내의 모든 Worker 간에 동기화됩니다. 이 동기화에는 조직당 기본적으로 최대 100개의 Worker 제한이 있습니다(Worker 버전 2.16 이상인 경우 300개). 조직의 Worker 수가 이 제한을 초과하는 경우:
    - 프로세서는 계속 실행되지만 다른 Worker와 올바르게 동기화되지 않아 할당량 제한에 도달한 이후에도 로그가 전송될 수 있습니다.
    - Worker는 `Failed to sync quota state` 오류를 출력합니다.
    - 조직당 기본 Worker 수를 늘리려면 [지원팀에 문의][5]하세요.
- Quota 프로세서는 1분당 몇 번씩 Worker 간의 개수를 주기적으로 동기화합니다. 따라서 프로세서에 설정된 제한은 Worker 수와 로그 처리량에 따라 초과될 수 있습니다. Datadog은 프로세서가 분당 수신할 것으로 예상되는 로그 볼륨보다 한 자릿수 이상 더 크게 제한을 설정할 것을 권장합니다. Quota 프로세서와 함께 Throttle 프로세서를 사용하여 분당 허용되는 로그 수를 제한함으로써 이러한 짧은 급증을 제어할 수 있습니다.

## 설정 {#setup}

Quota 프로세서를 설정하려면 다음 단계를 따르세요.
1. Quota 프로세서 이름을 입력합니다.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 일일 제한에 포함됩니다. 자세한 내용은 [검색 구문][6]을 참조하세요.
    - 할당량 필터와 일치하고 일일 할당량 내에 있는 로그는 파이프라인의 다음 단계로 전송됩니다.
    - 할당량 필터와 일치하지 않는 로그는 파이프라인의 다음 단계로 전송됩니다.
1. {{< ui >}}Unit for quota{{< /ui >}} 드롭다운 메뉴에서 할당량을 `Events` 수로 측정할지, 아니면 바이트 단위 `Volume`으로 측정할지 선택합니다.
1. 일일 할당량 제한을 설정하고 원하는 할당량의 크기 단위를 선택합니다.
1. 선택 사항: 특정 서비스 또는 리전 필드에 할당량을 설정하려면 {{< ui >}}Add Field{{< /ui >}}를 클릭합니다.
   1. 파티셔닝하려는 기준 필드 이름을 입력합니다. 자세한 내용은 [파티션 예시](#partition-example)를 참조하세요.
      1. 파티션과 일치하는 이벤트에만 할당량을 적용하려면 {{< ui >}}Ignore when missing{{< /ui >}}을 선택합니다. 자세한 내용은 [Ignore when missing 예시](#example-for-the-ignore-when-missing-option)를 참조하세요.
      1. 선택 사항: 파티셔닝된 필드에 대해 서로 다른 할당량을 설정하려면 {{< ui >}}Overrides{{< /ui >}}를 클릭합니다.
         - CSV 구조화 방법에 대한 예시를 보려면 {{< ui >}}Download as CSV{{< /ui >}}를 클릭합니다.
         - 재정의 CSV를 끌어다 놓아 업로드합니다. {{< ui >}}Browse{{< /ui >}}를 클릭하여 업로드할 파일을 선택할 수도 있습니다. 자세한 내용은 [재정의 예시](#overrides-example)를 참조하세요.
   1. 다른 파티션을 추가하려면 {{< ui >}}Add Field{{< /ui >}}를 클릭합니다.
1. {{< ui >}}When quota is met{{< /ui >}} 드롭다운 메뉴에서 할당량이 충족되었을 때 원하는 옵션을 {{< ui >}}drop events{{< /ui >}}, {{< ui >}}keep events{{< /ui >}}, {{< ui >}}send events to overflow destination{{< /ui >}} 중에서 선택합니다.
   1. {{< ui >}}send events to overflow destination{{< /ui >}}을 선택하면 클라우드 스토리지 옵션: **Amazon S3**, **Azure Blob** 및 **Google Cloud**와 함께 오버플로 대상이 추가됩니다.
   1. 오버플로 로그를 보내려는 클라우드 스토리지를 선택합니다. 클라우드 스토리지: [Amazon S3][2], [Azure Blob Storage][3] 또는 [Google Cloud Storage][4]에 대한 설정 지침을 참조하세요.

### 예시 {#examples}

#### 파티션 예시 {#partition-example}

특정 서비스나 리전에 할당량을 설정하려면 {{< ui >}}Partition by{{< /ui >}}를 사용하세요. 예를 들어, 하루에 10개 이벤트에 대한 할당량을 설정하고 `service` 필드별로 이벤트를 그룹화하려면 {{< ui >}}Partition by{{< /ui >}} 필드에 `service`를 입력합니다.

#### 'ignore when missing' 옵션의 예시 {#example-for-the-ignore-when-missing-option}

파티션과 일치하는 이벤트에만 할당량을 적용하려면 {{< ui >}}Ignore when missing{{< /ui >}}을 선택합니다. 예를 들어, Worker가 다음과 같은 이벤트 세트를 수신하고

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

{{< ui >}}Ignore when missing{{< /ui >}}이 선택되면 Worker는 다음과 같이 동작합니다.
- `service:a` 및 `source:foo`가 포함된 로그용 세트를 생성합니다.
- `service:b` 및 `source:bar`가 포함된 로그용 세트를 생성합니다.
- 마지막 세 가지 이벤트를 무시합니다.

할당량은 마지막 세 개의 이벤트가 아닌 두 개의 로그 세트에 적용됩니다.

{{< ui >}}Ignore when missing{{< /ui >}}이 선택되지 않으면 5개 이벤트 모두에 할당량이 적용됩니다.

#### 재정의 예시 {#overrides-example}

`service`별로 파티셔닝하고 두 가지 서비스: `a` 및 `b`가 있는 경우, 재정의를 사용하여 각 서비스에 서로 다른 할당량을 적용할 수 있습니다. 예를 들어, `service:a`의 할당량 제한을 5,000바이트로 설정하고 `service:b`의 제한을 50개 이벤트로 설정하려는 경우 재정의 규칙은 다음과 같습니다.

| 서비스 | 유형   | 제한 |
| ------- | ------ | ----- |
|  `a`    | 바이트  | 5,000 |
|  `b`    | 이벤트 | 50    |

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][7] 및 [프로세서 버퍼 메트릭][8]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][9] 설명서를 참조하세요.

### Quota 메트릭 {#quota-metrics}

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그가 이러한 메트릭의 `quota`입니다.

`pipelines.quota_reached_events_total`
: **설명**: 구성된 할당량 제한에 도달한 후 수신되어 삭제된 이벤트 수입니다.
: **메트릭 유형**: 개수

`pipelines.quota_reached_event_bytes_total`
: **설명**: 구성된 할당량 제한에 도달한 후 수신되어 삭제된 이벤트의 크기(바이트)입니다.
: **메트릭 유형**: 개수

`pipelines.quota_overflow_destination_sent_events_total`
: **설명**: 할당량 제한에 도달했을 때 보조 오버플로 대상으로 라우팅된 이벤트 수입니다.
: **메트릭 유형**: 개수

`pipelines.quota_fill`
: **설명**: 속도 제한 할당량 버킷의 현재 채우기 수준이며, 값 범위는 `0`에서 `100`까지입니다.
: **메트릭 유형**: 게이지

`pipelines.quotas_usage`
: **설명**: 모든 할당량 버킷의 총 채우기 수준이며, 값 범위는 `0`에서 `100`까지입니다.
: **메트릭 유형**: 게이지

`pipelines.quota_limit_events`
: **설명**: 할당량 규칙에 대해 구성된 간격당 최대 이벤트 처리량입니다.
: **메트릭 유형**: 게이지

`pipelines.quota_limit_bytes`
: **설명**: 할당량 규칙에 대해 구성된 간격당 최대 바이트 처리량입니다.
: **메트릭 유형**: 게이지

`pipelines.quotas_count`
: **설명**: 현재 추적 중인 활성 속도 제한 할당량 버킷의 수입니다.
: **메트릭 유형**: 게이지

[1]: /ko/monitors/types/metric/?tab=threshold
[2]: /ko/observability_pipelines/destinations/datadog_archives/
[3]: /ko/observability_pipelines/destinations/azure_storage/
[4]: /ko/observability_pipelines/destinations/google_cloud_storage/
[5]: /ko/help/
[6]: /ko/observability_pipelines/search_syntax/logs/
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/