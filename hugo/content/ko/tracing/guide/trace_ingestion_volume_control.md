---
description: 비용을 관리하면서 관측 가능성을 유지할 수 있도록 APM 트레이싱 메커니즘을 사용하여 스팬 수집 볼륨을 제어하는 방법을 알아보세요.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: 설명서
  text: Ingestion Control 페이지
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: 아키텍처 센터
  text: '분산 트레이스 마스터하기: 데이터 볼륨 문제와 효율적인 샘플링을 위한 Datadog의 접근 방식'
title: APM 분산 트레이싱을 통해 수집 볼륨 제어하기
---
## 개요 {#overview}

[Ingestion Control 페이지][1]에서는 에이전트와 SDK의 모든 서비스에 대한 수집 구성을 세부적으로 확인할 수 있습니다. 모든 [수집 메커니즘][2]은 공개적으로 문서화되어 있으며 구성 가능합니다.

Ingestion Control 페이지를 사용하면 스팬 볼륨을 완전히 파악하고 제어할 수 있습니다. 따라서 다음을 수행할 수 있습니다.
- 비즈니스 및 관측 가능성 목표와 가장 관련성이 높은 데이터를 수집합니다.
- 사용하지 않는 트레이스 데이터를 Datadog 플랫폼으로 전송하지 않아 네트워크 비용을 절감합니다.
- 전반적인 비용을 제어하고 관리합니다.

## 트레이스 수집 볼륨 감소의 영향 {#effects-of-reducing-trace-ingestion-volume}

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="전체 트레이스의 25%가 수집된 상태를 보여주는 APM 수집 샘플링" style="width:70%;" >}}

특정 서비스의 수집 볼륨을 줄이더라도 **요청, 오류 및 지연 시간 [메트릭][3]**(Requests, Errors, Duration을 의미하는 RED 메트릭)은 샘플링 구성과 관계없이 애플리케이션 트래픽의 100%를 기반으로 계산되므로 100% 정확하게 유지됩니다. 이 메트릭은 Datadog APM 구매 시 포함됩니다. 애플리케이션 트래픽을 전체적으로 파악하려면 이 메트릭을 사용하여 대시보드, 모니터 및 SLO를 생성하고 서비스 또는 리소스의 잠재적 오류를 식별할 수 있습니다.

**참고**: 애플리케이션과 서비스가 OpenTelemetry 라이브러리로 계측되어 있고 SDK 수준 및/또는 수집기 수준에서 샘플링을 설정한 경우, APM 메트릭은 기본적으로 **샘플링된** 데이터셋을 기반으로 합니다. 자세한 내용은 [OpenTelemetry를 사용한 수집 샘플링][4]을 참조하세요.

<div class="alert alert-info">샘플링되지 않은 OpenTelemetry 데이터에서 APM 메트릭을 계산하려면 <a href="/opentelemetry/setup/collector_exporter/#span-metrics-connector"><code>span_metrics</code> 커넥터</a>를 모든 샘플링 프로세서 앞에 배치하세요. Datadog Connector는 기존 구성에서 동일한 결과를 제공합니다. 자세한 내용은 <a href="/opentelemetry/ingestion_sampling/">OpenTelemetry를 사용한 수집 샘플링</a>을 참조하세요.</div>

트레이스 데이터는 반복성이 높으므로 수집 샘플링을 사용하더라도 문제 조사에 필요한 트레이스 샘플을 계속 사용할 수 있습니다. 처리량이 많은 서비스의 경우 일반적으로 모든 요청을 수집할 필요는 없습니다. 중요한 문제라면 여러 트레이스에서 증상이 나타나기 때문입니다. Ingestion Control을 사용하면 예산 범위 내에서 문제 해결에 필요한 가시성을 확보할 수 있습니다.

#### 스팬 기반 메트릭 {#metrics-from-spans}

[스팬 기반 메트릭][5]은 수집된 스팬을 기반으로 합니다.

수집 샘플링 비율을 줄이면 **count** 유형 메트릭에 영향을 미칩니다. **Distribution** 유형 메트릭(예: `duration` 측정값)은 샘플링이 대부분 균일하게 이루어지므로 영향을 받지 않으며, 지연 시간 분포는 계속해서 실제 트래픽을 대표합니다.

#### 모니터 {#monitors}

[스팬 기반 메트릭](#metrics-from-spans)을 사용하는 모든 **메트릭** 모니터는 수집 볼륨 감소의 영향을 받습니다. **트레이스.__** 메트릭을 기반으로 하는 메트릭 모니터는 트래픽의 100%를 기준으로 계산되므로 정확하게 유지됩니다.

개수 기반 [{{< ui >}}Trace analytics{{< /ui >}}][6] 모니터도 영향을 받습니다. 모니터 관리 페이지에서 `type:trace-analytics` 모니터를 찾아 트레이스 분석 모니터가 생성되어 있는지 확인하세요.

## 서비스 수집 구성 평가 {#assess-your-services-ingestion-configuration}

애플리케이션 계측의 현재 상태를 평가하려면 에이전트 및 SDK 구성에 대한 자세한 정보를 제공하는 [Trace Ingestion Control 페이지][1]를 활용하세요.

### 월간 수집 할당량 내 사용 여부 확인 {#understanding-if-you-are-within-your-monthly-ingestion-allocation}

수집 월간 사용량 KPI를 사용하여 모든 APM 호스트에 걸쳐 합산된 APM 호스트당 월간 수집 스팬 할당량 150GB 대비 예상 사용량을 확인하세요.

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="전체 인프라의 월간 가용 용량 23.3TB 대비 예상 월간 사용량 170%를 표시하는 Ingestion Overage KPI" style="width:40%;" >}}

### 고급 APM 사용량 조사 {#advanced-apm-usage-investigation}

각 서비스에 대해 수집 구성을 조사할 수 있습니다. 서비스 행을 클릭하여 서비스 수집 요약을 확인하면 다음 정보가 표시됩니다.
- {{< ui >}}Ingestion reason breakdown{{< /ui >}}: 수집 볼륨을 발생시키는 [수집 메커니즘][2]
- {{< ui >}}Top sampling decision makers{{< /ui >}}: [기본 수집 메커니즘][7]과 관련하여 수집된 스팬의 샘플링 결정을 내리는 업스트림 서비스

[기본 제공 대시보드][8]를 사용하여 수집 사용량 및 볼륨과 관련된 과거 추세에 대한 추가 인사이트를 얻을 수도 있습니다. 이 대시보드를 복제하여 위젯을 편집하고 추가 분석을 수행하세요.

## 수집 볼륨 감소{#reduce-your-ingestion-volume}

### 대부분의 수집 볼륨을 차지하는 서비스 식별 {#identify-services-responsible-for-most-of-the-ingestion-volume}

대부분의 수집 볼륨을 차지하는 서비스를 식별하려면 표를 {{< ui >}}Downstream Bytes/s{{< /ui >}}로 정렬하세요. 이 열을 통해 대부분의 샘플링 결정을 내리는 서비스를 파악할 수 있으며, 이러한 결정은 다운스트림 서비스에도 영향을 미칩니다.

서비스가 트레이스를 시작하는 경우 **Downstream Bytes/s**에는 해당 서비스가 샘플링 결정을 내린 다운스트림 서비스에서 수신되는 스팬 볼륨도 포함됩니다.

{{< ui >}}Traffic Breakdown{{< /ui >}} 열은 서비스의 샘플링 구성을 잘 보여줍니다.

서비스의 Downstream Bytes/s와 샘플링 비율(트래픽 분석 열의 파란색으로 채워진 영역으로 표시)이 모두 높은 경우 이 서비스의 샘플링 비율을 낮추면 수집 볼륨이 크게 감소할 것으로 예상됩니다.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="APM 수집 샘플링은 99%의 완전한 트레이스가 수집되었음을 보여주며, 이는 샘플링이 없음을 의미합니다." style="width:70%;" >}}

### Agent 수준에서 수집 샘플링 비율 전역 구성 {#globally-configure-the-ingestion-sampling-rate-at-the-agent-level}

{{< ui >}}Configuration{{< /ui >}} 열은 서비스에 샘플링 규칙이 구성되어 있는지 여부를 알려줍니다. 상위 서비스에 `AUTOMATIC` 구성 레이블이 지정된 경우 **Agent 구성**을 변경하면 모든 서비스의 볼륨을 전역적으로 줄일 수 있습니다.

Agent 수준에서 수집 볼륨을 줄이려면 `DD_APM_TARGET_TPS`(기본값 `10`)를 구성하여 헤드 기반 샘플링 볼륨의 비중을 줄이세요. [기본 샘플링 메커니즘][7]에 대해 자세히 알아보세요.

**참고**: 이 구성 옵션은 **Datadog SDK**를 사용할 때만 적용됩니다. Agent의 OTLP Ingest가 OpenTelemetry로 계측된 애플리케이션에서 데이터를 수집하는 경우 `DD_APM_TARGET_TPS`를 수정해도 SDK에 적용되는 샘플링 비율은 변경되지 않습니다.

또한 [오류][9] 및 [희귀][10] 트레이스의 볼륨을 줄이려면 다음 단계를 따르세요.
- 오류 샘플링 비중을 줄이려면 `DD_APM_ERROR_TPS`를 구성하세요.
- 희귀 트레이스 샘플링을 중지하려면 `DD_APM_DISABLE_RARE_SAMPLER`를 true로 설정하세요.

### 라이브러리 수준에서 서비스별 수집 샘플링 비율을 독립적으로 구성 {#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level}

처리량이 많은 일부 서비스의 샘플링 비율을 구성하면 할당량을 '초과'하는 수집 볼륨의 대부분을 줄일 수 있습니다.

서비스를 클릭하여 {{< ui >}}Service Ingestion Summary{{< /ui >}}를 조회하세요. 사이드 패널의 {{< ui >}}Ingestion reasons breakdown{{< /ui >}}을 확인하면 각 메커니즘이 차지하는 수집 볼륨 비중을 한눈에 볼 수 있습니다.

수집 볼륨의 대부분이 헤드 기반 샘플링(`auto` 또는 `rule`)으로 인해 발생하는 경우 SDK 수준에서 샘플링 규칙을 설정하여 볼륨을 조정할 수 있습니다.

{{< ui >}}Manage Ingestion Rate{{< /ui >}} 버튼을 클릭하여 서비스의 샘플링 비율을 구성하세요. 서비스 언어와 적용할 수집 샘플링 비율을 선택하세요.

**참고:** 구성 변경 사항을 적용하려면 애플리케이션을 재배포해야 합니다. Datadog은 [환경 변수][11]를 설정하여 변경 사항을 적용할 것을 권장합니다.

### OpenTelemetry를 사용한 트레이스 샘플링{#trace-sampling-with-opentelemetry}

애플리케이션과 서비스가 OpenTelemetry 라이브러리로 계측되고 OpenTelemetry Collector를 사용하는 경우 다음 OpenTelemetry 샘플링 기능을 사용할 수 있습니다.

- [TraceIdRatioBased][12] 및 [ParentBased][13]는 **SDK** 수준에서 trace_id를 기반으로 결정론적 헤드 기반 샘플링을 구현할 수 있는 두 가지 내장 샘플러입니다.
- [Tail Sampling Processor][14] 및 [Probabilistic Sampling Processor][15]를 사용하면 **Collector** 수준에서 일련의 규칙을 기반으로 트레이스를 샘플링할 수 있습니다.

두 옵션 중 하나를 사용하면 샘플링된 데이터에 기반한 [APM 메트릭](#effects-of-reducing-trace-ingestion-volume)이 생성됩니다.

## 수집 사유 용어집 {#ingestion-reasons-glossary}

_대부분의 수집 볼륨을 차지하는 수집 메커니즘 파악_

트레이스를 샘플링하는 기본 메커니즘은 헤드 기반 샘플링입니다. 트레이스를 샘플링할지 여부는 트레이스 수명 주기 초기에 결정되며, 항상 전체 트레이스를 조회하고 분석할 수 있도록 요청 컨텍스트를 통해 다운스트림으로 전파됩니다.

헤드 기반 샘플링은 SDK 또는 Datadog Agent에서 구성할 수 있습니다.

| 수집 사유   | 위치             | 수집 메커니즘 설명 | 기본값 |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Datadog Agent는 샘플링 비율을 SDK에 전달합니다.    | Agent당 초당 트레이스 10개 |
| `rule`             | [트레이싱 라이브러리](#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level) | 특정 서비스에 대해 라이브러리에 정의된 샘플링 비율   | null                 |


다른 여러 수집 사유가 Ingestion Control 페이지에 표시되고 `datadog.estimated_usage.apm.ingested_bytes` 메트릭의 태그로도 제공됩니다. 다음 수집 사유가 수집 볼륨에 영향을 줄 수 있습니다.

| 수집 사유   | 위치             | 수집 메커니즘 설명 | 기본값 |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | 헤드 기반 샘플링에서 포착되지 않은 오류를 샘플링합니다.             | Agent당 초당 트레이스 10개(규칙이 정의된 경우 null) |
| `rare`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             |  희귀 트레이스를 샘플링합니다(스팬 태그 집합의 모든 조합을 포착합니다).        | Agent당 초당 트레이스 5개(규칙이 정의된 경우 null) |
| `manual`             | 인코드         | 스팬과 그 하위 스팬을 유지 또는 삭제하도록 코드에서 결정을 재정의합니다.    | null |
| `analytics`          | Agent 및 트레이싱 라이브러리 | 전체 트레이스 없이 개별 스팬을 샘플링하는 [지원이 중단된 수집 메커니즘][16]입니다.   | null                 |

또한 다른 제품으로 인해 샘플링된 스팬 볼륨이 발생할 수 있습니다.

- `synthetics` 및 `synthetics-browser`: API 및 브라우저 테스트는 테스트에 의해 생성된 트레이스에 연결됩니다.
- `rum`: 웹 및 모바일 애플리케이션의 요청은 해당 백엔드 트레이스에 연결됩니다.
- `lambda` 및 `xray`: X-Ray 또는 Datadog 라이브러리로 계측된 AWS Lambda 함수에서 생성된 트레이스

[수집 메커니즘 문서][2]에서 수집 사유에 대해 자세히 알아보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/ingestion_controls
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ko/tracing/metrics/metrics_namespace/
[4]: /ko/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[5]: /ko/tracing/trace_pipeline/generate_metrics/
[6]: /ko/monitors/types/apm/?tab=analytics
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: /ko/tracing/trace_pipeline/metrics/
[9]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[10]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[11]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
[12]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[13]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[16]: /ko/tracing/legacy_app_analytics