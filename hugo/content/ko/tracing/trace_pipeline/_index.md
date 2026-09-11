---
aliases:
- /ko/tracing/ingestion/
- /ko/tracing/trace_ingestion/
- /ko/tracing/trace_retention_and_ingestion/
description: 스팬(span) 수집을 제어하는 방법 알아보기
title: 트레이스 파이프라인
---

{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="트레이스 파이프라인" >}}

트레이스 쿼리를 수집하여 애플리케이션에 대한 엔드투엔드 가시성을 확보하세요. [트레이스 탐색기][1]에서 분산된 트레이스를 쿼리하고 시각화하여 마이크로서비스를 통한 요청의 흐름을 파악하고 오류 및 성능 문제를 쉽게 조사할 수 있습니다.

애플리케이션 성능 모니터링(APM)을 사용하면 트레이스의 **수집**과 **보존**을 완벽히 커스터마이즈할 수 있습니다.

## 수집 매커니즘

트레이스 수집을 설정하고 [수집 설정][2]을 세분화하여 애플리케이션에 대해 엔드투엔드 가시성을 확보하세요. 모든 오류와 지연 시간이 긴 트레이스를 포함해 완벽하게 트레이스를 캡처하여 애플리케이션 중단 또는 미응답 서비스와 같은 성능 문제를 놓치지 마세요.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="서비스 설정" >}}


## 수집 제어

[수집 제어 페이지][3]는 서비스 전반의 수집량과 설정 구성을 간략히 보여줍니다.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="수집 제어 페이지 개요" >}}

## 스팬에서 메트릭 생성하기

수집된 스팬에서 메트릭을 생성하고 쿼리 및 비교를 위해 해당 커스텀 메트릭을 사용하세요. [스팬에서 메트릭 생성하기][4]에서 더 자세히 알아보세요.

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="스팬 기반 메트릭 그래프" >}}

## 트레이스 보존 기간

Datadog에서 스팬을 수집한 후 계정에 설정된 [보존 필터][5]에 따라 일부는 15일 동안 보관됩니다. Datadog 지능형 보존 필터는 트레이스의 일정 비율을 인덱싱하여 애플리케이션의 상태를 모니터링하도록 해줍니다. 또한 자체 커스텀 보존 필터를 정의하여 조직의 목표를 지원하는 데 필요한 트레이스 데이터를 인덱싱할 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="보존 필터 페이지" >}}

## 트레이스 사용량 메트릭

[사용량 메트릭][6]을 읽으면 애플리케이션 성능 모니터링(APM) 예상 사용량 및 수집 이유 대시보드를 사용하여 수집 및 인덱싱된 데이터의 양을 추적하고 모니터링하는 방법을 확인할 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM 예측 사용량 대시보드" >}}


[1]: /ko/tracing/trace_explorer
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ko/tracing/trace_pipeline/ingestion_controls
[4]: /ko/tracing/trace_pipeline/generate_metrics
[5]: /ko/tracing/trace_pipeline/trace_retention
[6]: /ko/tracing/trace_pipeline/metrics