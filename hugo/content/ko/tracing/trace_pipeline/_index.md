---
aliases:
- /ko/tracing/ingestion/
- /ko/tracing/trace_ingestion/
- /ko/tracing/trace_retention_and_ingestion/
description: 스팬 수집을 제어하는 방법 알아보기
further_reading:
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: 학습 센터
  text: APM 속도 제한 및 보존
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: 아키텍처 센터
  text: '분산 트레이스 마스터하기: 데이터 볼륨 문제와 효율적인 샘플링을 위한 Datadog의 접근 방식'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: 아키텍처 센터
  text: '분산 트레이스 최적화: 예산 범위 내에서 중요 트레이스를 수집하기 위한 모범 사례'
title: 트레이스 파이프라인
---
{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="트레이스 파이프라인" >}}

계측된 애플리케이션에서 트레이스를 수집하여 애플리케이션에 대한 엔드투엔드 가시성을 확보하세요. [Trace Explorer][1]에서 분산 트레이스를 쿼리하고 시각화하여, 요청이 마이크로서비스를 거치는 흐름을 파악하고 오류 및 성능 문제를 쉽게 조사할 수 있습니다.

APM을 사용하면 트레이스의 **수집** 및 **보존**을 모두 완전히 사용자 지정할 수 있습니다.

## 수집 방식 {#ingestion-mechanisms}

세분화된 [수집 구성][2]을 통해 애플리케이션의 엔드투엔드 가시성을 확보할 수 있도록 트레이싱을 설정하세요. 애플리케이션 중단이나 응답하지 않는 서비스와 같은 성능 문제를 놓치지 않도록 모든 오류 및 고지연 트레이스를 포함하여 전체 트레이스를 수집하세요.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="서비스 설정" >}}


## Ingestion Controls {#ingestion-controls}

[Ingestion Control 페이지][3]는 서비스 전반의 수집량과 설정 구성을 간략히 보여줍니다.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control 페이지 개요" >}}

## Processing Pipelines {#processing-pipelines}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Processing Pipelines는 다음에서 지원되지 않습니다 {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

[Processing Pipelines][7]를 사용하여 수집 후 스팬 속성을 변환, 정규화 및 보강하세요. 애플리케이션 코드를 수정하지 않고도 서비스 전반의 속성 이름을 표준화하고, 일관되지 않은 키를 통합하며, 스팬 값에서 구조화된 데이터를 추출할 수 있습니다.

{{< img src="tracing/processing_pipelines/manage_pipelines.png" style="width:100%;" alt="Processing Pipelines" >}}

## 스팬에서 메트릭 생성{#generating-metrics-from-spans}

수집된 스팬에서 메트릭을 생성하고 이러한 사용자 지정 메트릭을 쿼리 및 비교에 사용할 수 있습니다. 자세한 내용은 [스팬에서 메트릭 생성][4]을 참조하세요.

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="스팬 기반 메트릭 그래프" >}}

## 트레이스 보존 {#trace-retention}

스팬이 수집되면 [보존 필터][5]에서 어떤 개별 스팬을 인덱싱하고 15일 동안 저장할지 결정합니다. Datadog 지능형 보존 필터는 애플리케이션 상태를 모니터링하는 데 도움이 되도록 대표적인는 스팬을 선별하여 자동으로 인덱싱합니다. 또한 사용자 조직의 목표에 중요한 추가 스팬을 인덱싱하도록 사용자 지정 보존 필터를 정의할 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="보존 필터 페이지" >}}

## 트레이스 사용량 메트릭 {#trace-usage-metrics}

[사용량 메트릭][6]을 읽으면 APM 예상 사용량 및 수집 이유 대시보드를 사용하여 수집 및 인덱싱된 데이터의 양을 추적하고 모니터링하는 방법을 알아보세요.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM 추정 사용량 대시보드" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ko/tracing/trace_pipeline/ingestion_controls
[4]: /ko/tracing/trace_pipeline/generate_metrics
[5]: /ko/tracing/trace_pipeline/trace_retention
[6]: /ko/tracing/trace_pipeline/metrics
[7]: /ko/tracing/trace_pipeline/processing_pipelines