---
aliases:
- /ko/tracing/trace_retention_and_ingestion/usage_metrics/
- /ko/tracing/trace_retention/usage_metrics/
- /ko/tracing/trace_ingestion/usage_metrics/
description: APM 사용량을 모니터링하는 방법 알아보기
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: 설명서
  text: 트레이스 수집
- link: /tracing/trace_pipeline/trace_retention/
  tag: 설명서
  text: 트레이스 보존
title: 메트릭 활용
---

## 개요

다음 인 앱 구성 페이지에서 APM의 수집 및 인덱싱된 볼륨을 설정할 수 있습니다.
- **[Ingestion Control 페이지][1]**에서 수집된 스팬 볼륨을 제어할 수 있습니다.
- **[Retention Filters 페이지][2]**에서 인덱싱된 스팬 수를 제어할 수 있습니다.

두 페이지 모두 **사용량 메트릭**에 기반해 운영됩니다.

계정에서 사용할 수 있는 메트릭에는 다음이 있습니다.

 - `datadog.estimated_usage.apm.ingested_bytes`(청구되는 차원)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans`(청구되는 차원)


이 같은 메트릭을 활용해 대시보드와 모니터에서 사용량을 가시화할 수 있습니다. 메트릭으로 사용할 수 있는 기본 대시보드 두 종류가 있습니다. 이 기본 대시보드를 사용해
APM 사용량과 수집 및 인덱싱된 스팬 볼륨을 모니터링할 수 있습니다.

Datadog APM 플랜에는 수집 및 인덱싱된 스팬이 포함되어 있습니다. 자세한 내용은 [Pricing 페이지][3]나 [가격 책정 예시 시나리오][4]를 참고하세요.

### 수집된 스팬 볼륨

수집된 스팬 사용량과 관련된 메트릭은 다음과 같습니다.

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

`datadog.estimated_usage.apm.ingested_bytes`로 사용량을 제어하세요. 데이터 수집의 경우 스팬이나 트레이스 수가 아니라 볼륨에 따라 가격이 책정됩니다. 이 메트릭은 `env`와 `service`로 태깅되기 때문에 수집 볼륨에 영향을 주는 환경과 서비스를 바로 확인할 수 있습니다.

이 메트릭은 `ingestion_reason`으로도 태깅되는데, 이를 통해 Datadog로 스팬을 전송하는 데 원인이 된 [수집 메커니즘][5]을 알 수 있습니다. 이 메커니즘은 Datadog 에이전트의 추적 라이브러리에 중첩되어 있습니다. 차원에 관한 자세한 정보는 [수집 이유 대시보드][6]를 참고하세요.

`datadog.estimated_usage.apm.ingested_traces` 메트릭은 초당 샘플된 요청 수를 측정하고 [헤드 기반 샘플링][7]에 따라 트레이스 수를 셉니다. 또 이 메트릭은 `env`와 `service`로 태깅되기 때문에 트레이스를 가장 많이 시작한 서비스를 바로 확인할 수 있습니다.

### 인덱싱된 스팬

`datadog.estimated_usage.apm.indexed_spans` 메트릭을 사용해 [태그 기반 보유 필터][2]에 따라 인덱싱된 스팬 수를 제어하세요.

이 메트릭은 `env`와 `service`로 태깅되기 때문에 인덱싱 사용량에 가장 많은 영향을 미친 환경과 서비스를 바로 확인할 수 있습니다.

## APM 트레이스 예측 사용량 대시보드

[APM 트레이스 사용량 대시보드][8]에는 위젯 그룹이 포함되어 있는데, 여기에서 수치가 높은 KPI와 추가 사용량 정보를 확인할 수 있습니다. 

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM 예측 사용량 대시보드" >}}

대시보드에서 다음 정보를 확인할 수 있습니다.

- 전역 사용량 메트릭
- 호스트, Fargate, AWS Lambda 포함 APM이 활성화된 인프라스트럭처
- `service`, `env`, `ingestion_reason`으로 구분된 수집 볼륨
- `service`와 `env`로 구분된 인덱싱 볼륨

## APM 수집 이유 대시보드

[APM 수집 이유 대시보드][6]에서는 각 수집 볼륨 소스에 관한 인사이트를 얻을 수 있습니다. 각 수집 사용량 메트릭이 `ingestion_reason` 차원으로 태깅되어 있기 때문에 APM 데이터를 가장 많이 생성하는 구성 옵션(Datadog 에이전트 구성 또는 추적 라이브러리 구성)과 제품(예: RUM 또는 신서틱 테스팅)을 확인할 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_ingestion_reasons.png" style="width:100%;" alt="APM 수집 이유 대시보드" >}}

각 수집 이유를 살펴보고 총 볼륨에 가장 많이 영향을 미친 환경과 서비스를 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/ingestion_controls
[2]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /ko/account_management/billing/apm_tracing_profiler/
[5]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[6]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm_estimated_usage