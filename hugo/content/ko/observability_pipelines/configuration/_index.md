---
description: 파이프라인을 구성하는 소스, 프로세서 및 목적지 구성 요소와 이를 빌드 및 배포하는 방법에 대해 알아보세요.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: 설명서
  text: Pipelines 설정하기
- link: observability_pipelines/configuration/install_the_worker/
  tag: 설명서
  text: Worker 설치하기
- link: observability_pipelines/configuration/live_capture/
  tag: 설명서
  text: Live Capture에 대해 자세히 알아보기
- link: observability_pipelines/troubleshooting
  tag: 설명서
  text: 문제 해결하기
title: 구성
---
## 개요 {#overview}

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="두 개의 프로세서 그룹과 두 개의 목적지로 이동하는 소스가 있는 파이프라인 페이지" style="width:100%;" >}}

Observability Pipelines를 사용하면 데이터를 수집하고 자체 인프라 내에서 {{< tooltip text="logs, metrics, and traces" tooltip="사용 사례 및 가격 책정에 대해 논의하려면 계정 관리자에게 문의하세요." >}} 을 처리한 다음 데이터를 여러 목적지로 라우팅할 수 있습니다. 파이프라인은 세 가지 핵심 구성 요소로 구성됩니다.

- [소스][1]: Datadog Agent와 같은 도구로부터 데이터를 수신합니다.
- [프로세서][2]: 데이터를 변환, 보강 또는 필터링합니다.
- [목적지][3]: 데이터가 전송되는 위치입니다(예: Datadog, Amazon S3, Splunk, Google Security Operations, Microsoft Sentinel).

다음 방법 중 하나를 사용하여 파이프라인을 빌드 및 배포하여 데이터를 수집, 변환 및 라우팅하세요.

 - [파이프라인 UI][4]
 - [API][5]
 - [Terraform][6]

## 파이프라인 유형 {#pipeline-types}

파이프라인에는 두 가지 유형이 있습니다.

{{< tabs >}}
{{% tab "로그" %}}

[로그 템플릿][1] 중 하나를 사용하여 로그 파이프라인을 생성하세요.

- 로그 아카이브
- 로그 이중 전송
- 로그 기반 메트릭 생성
- 로그 보강
- 로그 볼륨 제어
- 민감한 데이터 마스킹
- 로그 분할

소스, 프로세서 및 목적지 설정에 대한 자세한 내용은 [파이프라인 설정하기][2]를 참조하세요.

[1]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "메트릭" %}}

[메트릭 태그 거버넌스][1] 템플릿을 사용하여 메트릭 파이프라인을 생성하세요.

소스, 프로세서 및 목적지 설정에 대한 자세한 내용은 [파이프라인 설정하기][2]를 참조하세요.

### 메트릭 데이터 {#metrics-data}

Observability Pipelines로 전송되는 메트릭에는 다음이 포함됩니다.

- `name`: 메트릭 이름입니다.
- `kind`: 메트릭에는 두 가지 종류가 있습니다.
  - `absolute` 메트릭: 보고 시점의 측정값을 나타냅니다.
  - `incremental` 메트릭: 마지막 보고된 값 이후의 측정값 변화를 나타내며, 시스템이 이를 시간에 따라 집계합니다.
- `value`: [메트릭 유형입니다. ](#metric-types)
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp`: 메트릭이 생성된 날짜와 시간입니다.
- `tags`: `host`와 같은 태그를 포함합니다.

수신된 메트릭이 `incremental`인지 `absolute`인지는 소스에 따라 다릅니다. 예를 들어, OpenTelemetry의 메트릭은 [시간성][4]에 따라 증분형이거나 절대형일 수 있습니다. 다음 표는 델타 및 누적 시간성과 함께 전송된 OTel 카운터 메트릭의 예입니다.

| 메트릭 종류 | 증분형                      | 절대형                               |
|-------------|----------------------------------|----------------------------------------|
| 카운터     | 델타로 전송: `+2`, `+4`, `+6` | 누적 합계로 전송: `2`, `6`, `10` |

메트릭 예시:

```
{
  "name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
    "agent":"core",
    "domain":"https://7-72-3-app.agent.datadoghq.com",
    "host":"COMP-YGVQDJG75L",
    "source_type_name":"System",
    "env:prod"
  },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

### 메트릭 유형 {#metric-types}

사용 가능한 메트릭 유형:

| 메트릭 유형  | 설명                                                                                                                                                       | 예시                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER      | 한 시간 간격 내의 총 이벤트 발생 횟수입니다. 0으로 재설정할 수는 있지만 값을 줄일 수는 없습니다.                                                        | `status:error`가 포함된 로그 수를 계산하려는 경우.                                     |
| GAUGE        | 보고되는 시점의 값에 대한 스냅샷입니다.                                                                                                                 | 각 호스트의 최신 CPU 사용률을 추적하려는 경우.                                   |
| HISTOGRAM    | 한 시간 간격 내에 Datadog Agent가 호스트별로 계산한 후 Datadog으로 전송하는 통계 집계(`avg`, `min`, `max`, `count`, `median`, 백분위수)입니다. | 각 웹 서버에서 호스트별 요청 지연 시간 집계가 필요한 경우.                          |
| DISTRIBUTION | Datadog으로 전송된 원시 값으로, 한 시간 간격으로 메트릭을 보고하는 모든 호스트에 걸쳐 전역적으로 서버 측에서 백분위수 집계가 계산됩니다.             | API 엔드포인트의 전역 p95 지연 시간을 해당 엔드포인트를 제공하는 모든 호스트에 걸쳐 계산하려는 경우.  |

자세한 정보는 [메트릭 유형][3]을 참조하세요.

[1]: /ko/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: /ko/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

{{% /tab %}}

{{% tab "트레이스" %}}

다음을 수집, 처리 및 전송할 수 있습니다. {{< tooltip text="traces" tooltip="액세스 권한을 요청하려면 계정 관리자에게 문의하세요." >}} [트레이스 샘플링][1] 템플릿을 사용하여 다른 목적지로 전송합니다.

소스, 프로세서 및 목적지 설정에 대한 자세한 내용은 [파이프라인 설정하기][2]를 참조하세요.

[1]: /ko/observability_pipelines/configuration/explore_templates/?tab=traces#trace-sampling
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/sources/
[2]: /ko/observability_pipelines/processors/
[3]: /ko/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ko/api/latest/observability-pipelines/#create-a-new-pipeline
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs