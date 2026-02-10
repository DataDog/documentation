---
title: 스팬 및 트레이스에서 커스텀 메트릭 생성
description: '수집된 스팬과 완료된 트레이스를 기반으로 커스텀 메트릭을 생성합니다.'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: '트레이스 수집을 사용자 지정하고 중요한 트레이스 보존'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: '보존한 트레이스에 따라 분석 쿼리 및 모니터 사용'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: '고급 트레이스 쿼리를 사용해 특정 트레이스에서 메트릭 만들기'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: '트레이스 메트릭으로 애플리케이션 트래픽을 100% 모니터링'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Terraform으로 스팬 기반 메트릭을 만들고 관리'
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Span-based metrics" >}}

수집한 스팬을 기반으로 커스텀 메트릭을 생성해 추세를 추적하고, 대시보드를 구동하고 모니터를 트리거하세요. 이는 전체 트레이스 분석용으로 보존되지 않은 스팬과 트레이스의 경우도 마찬가지입니다.

커스텀 메트릭은 Datadog APM이 수집한 스팬에서 만들어집니다. 그러한 스팬을 [보존 필터][1]로 인덱싱하는지 아닌지는 무관합니다. 스팬(개수, 기간 또는 커스텀 태그) 또는 트레이스(전체 트레이스 기간)에서 숫자 값을 추출해 15개월의 보존 기간을 설정해 장기 [커스텀 메트릭][3]으로 저장하세요.

**참고:**
\- Datadog은 애플리케이션 트래픽의 100%에 대하여 요청 수, 오류 발생률, 지연 분포도를 수집하는 [트레이스 메트릭][13]을 자동으로 생성합니다.
\- 커스텀 메트릭 생성에 사용할 수 있는 스팬의 종류는 사용자의 [APM 수집 제어 설정][12]에 따라 다릅니다. 샘플링이나 필터링에서 드롭된 스팬은 메트릭을 생성할 수 없습니다.


스팬 기반 커스텀 메트릭의 용도:
\- 스팬 수준 지연, 오류 발생률 또는 태그 수준 성능에 대한 세분화된 가시성 확보
\- 지연이 짧고 해상도가 높은 메트릭을 사용해 [이상][4] 또는 [예측][7] 모니터 구동.
\- 스팬 전체를 보존할 필요 없이 트렌딩 또는 알림에 사용할 주요 신호 추출.

#### 트레이스 기반 커스텀 메트릭을 사용하기 적합한 상황

Datadog에서는 [트레이스 쿼리][15]를 기반으로 메트릭을 생성할 수 있습니다.

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="Request access to the Preview!" >}}
트레이스 기반 커스텀 메트릭은 미리 보기 상태입니다. 액세스를 요청하려면 APM 지원팀에 티켓을 제출하고, 사용 사례를 간단하게 설명해 주세요.
{{< /callout >}}

트레이스 기반 커스텀 메트릭의 용도:
\- 트레이스 총 기간 또는 트레이스당 작업과 같은 트레이스 컨텍스트 전체에서 파생한 메트릭.
\- 트레이스 전체에 대한 지식이 필요한 조건에 대해 알림(예: N+1 쿼리 탐지 또는 팬아웃 패턴).
\- 트레이스 전체를 보존할 필요 없이 트렌딩 또는 알림에 사용할 주요 신호 추출.

## 스팬이나 트레이스에서 메트릭 만들기

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="How to create a metric" >}}

1. [**APM** > **Generate Metrics**][14](메트릭 생성)로 이동합니다.
2. **New Metric**(새 메트릭)을 클릭합니다.
3. [메트릭 명명 규칙][11]을 따라 메트릭의 이름을 지정합니다. `trace.*`로 시작하는 메트릭 이름은 허용되지 않습니다.
4. 메트릭 유형을 **스팬** 또는 **트레이스** 중에서 선택합니다. 둘 다 APM 검색 및 분석과 같은 [쿼리 구문][10]을 사용합니다.
5. 메트릭 쿼리를 정의하여 측정하려는 스팬이나 트레이스만 필터링하고 포함합니다.
6. 집계할 값을 선택합니다.
     - 일치하는 스팬 또는 트레이스를 모두 세려면 `*`를 선택합니다.
     - 숫자 속성을 입력하면(예를 들어 `@cassandra_row_count`) 수, 최솟값, 최댓값, 합계 또는 백분위수를 집계하고 추적합니다.
7. 그룹화 디멘션을 설정합니다. 기본적으로 메트릭에는 태그가 없으며, 사용자가 직접 추가해야 합니다. 아무 스팬 속성이나 태그를 사용해 메트릭 태그를 만듭니다.
8. 결과를 미리 보기하여 데이터 시각화와 실시간 미리 보기에서 일치하는 스팬 또는 트레이스를 통해 쿼리의 실시간 영향을 확인합니다.
9. **Create Metric**(메트릭 만들기)을 클릭합니다.

<div class="alert alert-danger"> 스팬 기반 메트릭은 <a href="/metrics/custom_metrics/">커스텀 메트릭</a>으로 간주하며 그에 따라 청구됩니다. 청구에 영향을 미치지 않도록 타임스탬프, 사용자 ID, 요청 ID 또는 세션 ID와 같이 바인딩되지 않았거나 카디널리티가 극히 높은 속성을 기준으로 그룹화하지 마세요.</div>


## 기존 메트릭 업데이트

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Edit an existing metrics" >}}

메트릭을 만들고 나면, 다음과 같은 두 개의 필드만 업데이트할 수 있습니다.

| 필드                                  | 이유                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| 스트림 필터 쿼리                    | 일치하는 스팬 세트를 메트릭으로 집계되도록 변경합니다.                                                         |
| 집계 그룹                     | 태그를 업데이트해 생성된 메트릭의 카디널리티를 관리합니다.                                                         |

**참고**: 메트릭 유형 또는 이름을 변경하려면 새 메트릭을 만들고 기존 것을 삭제하세요.


## 데이터 가용성

트레이스에서 생성한 메트릭은 트레이스가 완료되고 나면 방출됩니다. 실행 시간이 긴 트레이스의 경우, 지연도 그에 따라 증가합니다(예를 들어 45분 길이 트레이스의 메트릭은 트레이스가 완료될 때까지 방출될 수 없음).

모니터에서 트레이스 기반 커스텀 메트릭을 사용할 때는 오탐을 막으려면 이러한 지연을 감안해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_pipeline/trace_retention
[2]: /account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/metrics/#overview
[4]: /monitors/types/anomaly/#overview
[5]: /tracing/trace_explorer/
[6]: /tracing/trace_explorer/query_syntax/#analytics-query
[7]: /monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /tracing/trace_explorer/query_syntax/
[11]: /metrics/#naming-metrics
[12]: /tracing/trace_pipeline/ingestion_controls
[13]: /tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /tracing/trace_explorer/trace_queries
