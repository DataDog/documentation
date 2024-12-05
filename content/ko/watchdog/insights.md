---
description: Watchdog Insights를 사용하여 검색 쿼리와 일치하는 이상 징후 및 아웃라이어를 확인합니다.
further_reading:
- link: /logs/explorer/watchdog_insights/
  tag: 설명서
  text: Watchdog Insights for Logs
- link: /real_user_monitoring/explorer/watchdog_insights/
  tag: 설명서
  text: Watchdog Insights for RUM
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: 블로그
  text: Watchdog Insights를 통한 강화된 트러블슈팅
- link: https://www.datadoghq.com/blog/watchdog-insights-apm/
  tag: 블로그
  text: Watchdog Insights for APM으로 오류 및 레이턴시 패턴을 자동으로 감지
title: Watchdog Insights
---

## 개요

인시던트 조사에는 시행 착오가 필요합니다. 특정 영역에 익숙한 엔지니어는 경험에 따라 잠재적인 문제를 어디에서 먼저 찾아야 하는지 알고 있습니다. Watchdog Insights를 사용하면 미숙한 엔지니어를 포함한 모든 엔지니어가 가장 중요한 데이터에 주의를 기울이고 인시던트 조사를 가속화할 수 있습니다.

Datadog 대부분에서 Watchdog는 두 가지 유형의 인사이트를 반환합니다.

- **이상**: Watchdog이 조직의 데이터를 스캔하여 찾은 활성 검색 쿼리와 일치하는 모든 사전 계산된 [Watchdog 경고][11]입니다. [Watchdog 알림 탐색기][12]에서 전체 목록에 액세스하세요.
- **아웃라이어(Outlier)**: 활성 쿼리와 일치하는 제품 데이터를 기준으로 계산되며, 일부 이벤트 유형(예: 오류)에서 너무 자주 나타나거나 일부 연속 메트릭을 상향 조정하는 경우(예: 지연) 태그가 아웃라이어로 표시됩니다.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="5가지 로그 이상이 있는 Watchdog Insights 배너를 표시하는 로그 탐색기" style="width:100%;" >}}

## 인사이트 탐색

Watchdog Insights 캐러셀은 다음 제품 페이지 상단 근처에 있습니다.

- [로그 탐색기][1]
- APM:
    - [트레이스 탐색기][2]
    - [서비스 페이지][3]
    - [리소스 페이지][4]
    - [데이터베이스 탐색기][5]
    - [프로파일 탐색기][6]
- 인프라:
    - [프로세스 탐색기[7]
    - [서버리스 탐색기][8]
    - [쿠버네티스(Kubernetes) 탐색기][9]
- [실제 사용자 모니터링(RUM) 탐색기][10]
- [오류 추적 이슈 사이드 패널][13]

개요를 보려면 캐러셀을 확장하세요. 우선순위가 가장 높은 인사이트('`Insight type`, `State`, `Status`, `Start time`, `Anomaly type` 기준)가 왼쪽에 표시됩니다.

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="웹 스토어 서비스의 새로운 오류 로그, 제품 추천 서비스의 오류 로그 급증, 제품 추천 서비스의 오류 로그 급증 등 세 가지 이상을 보여주는 로그 탐색기의 Watchdog Insights 캐러셀" style="width:100%;">}}

패널을 확장하려면 **View all**를 클릭하세요. Watchdog Insights의 세로 목록이 포함된 사이드 패널이 오른쪽에서 열립니다. 각 항목은 요약 카드보다 더 많은 정보가 포함된 상세 보기를 보여줍니다.

모든 아웃라이어는 트러블슈팅 정보가 포함된 상호 작용 및 사이드 패널과 함께 제공됩니다. 각 인사이트 상호 작용 및 사이드 패널은 Watchdog 인사이트 유형에 따라 다릅니다.

### 인사이트 쿼리 필터링

Watchdog 인사이트와 일치하도록 현재 보기를 상세화하려면 인사이트 요약 카드의 오른쪽 상단 모서리 위로 마우스를 가져갑니다. 두 개의 아이콘이 나타납니다. 툴팁 **인사이트 필터링**이 있는 역삼각형 아이콘을 클릭하세요. 페이지가 새로고침되고 인사이트에 해당하는 항목 목록이 표시됩니다.

{{< img src="watchdog/filter_on_insight.png" alt="인사이트 컨텍스트 스타일에 대해 탐색기 필터링" style="width:70%;">}}

### 아웃라이어 공유

제공된 아웃라이어를 공유하려면 인사이트 패널에서 클릭하여 상세 정보가 담긴 사이드 패널을 엽니다. **상세 정보 패널 상단의 **링크 복사** 버튼을 클릭합니다.

{{< img src="watchdog/share-outlier.png" alt="링크 복사 방법을 표시하는 아웃라이어 사이드 패널" style="width:80%;">}}

아웃라이어에 대한 링크는 기본 데이터 보존 기간 이후 만료됩니다. 예를 들어 아웃라이어을 빌드하는 데 사용된 로그가 15일 동안 유지되는 경우 아웃라이어에 대한 링크는 15일 후에 로그와 함께 만료됩니다.

## 아웃라이어 유형

{{< tabs >}}
{{% tab "Log Management" %}}

### 오류 이상값

오류 아웃라이어는 현재 쿼리와 일치하는 오류 특성을 포함하는 [패싯 태그 또는 속성][1]과 같은 필드를 표시합니다. 오류 중 통계적으로 과도하게 나타나는 `key:value` 쌍은 문제의 근본 원인에 대한 힌트를 제공합니다.

오류 아웃라이어의 대표적인 예에는 `env:staging`, `docker_image:acme:3.1` 및 `http.useragent_details.browser.family:curl`이 있습니다.

배너 카드 보기에서 다음을 확인할 수 있습니다.

  * 필드 이름
  * 필드가 기여하는 전체 로그 및 오류의 비율

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="총 오류의 73.3%를 나타내는 빨간색 막대와 총 오류의 8.31%를 나타내는 파란색 막대를 표시하는 오류 아웃라이어 카드" style="width:50%;" >}}

전체 사이드 패널에서 다음을 확인할 수 있습니다.

  * 필드를 포함하는 오류 로그의 시계열
  * 오류 로그와 연결된 태그
  * [로그 패턴][2] 전체 목록

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="오류 아웃라이어 사이드 패널" style="width:100%;" >}}

[1]: /ko/logs/explorer/facets/
[2]: /ko/logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

Watchdog 인사이트 캐러셀을 사용할 수 있는 모든 APM 페이지에서 APM 아웃라이어를 사용할 수 있습니다.
 - [트레이스 탐색기](/tracing/trace_explorer/?tab=listview)
 - [서비스 페이지](/tracing/services/service_page/)
 - [리소스 페이지](/tracing/services/resource_page/)

### 오류 이상값

오류 아웃라이어는 현재 쿼리와 일치하는 오류 특성이 포함된 태그와 같은 필드를 표시합니다. 오류 중 통계적으로 과도하게 나타나는 `key:value` 쌍은 문제의 근본 원인에 대한 힌트를 제공합니다.

오류 아웃라이어의 대표적인 예에는 `env:staging`, `availability_zone:us-east-1a`, `cluster_name:chinook` 및 `version:v123456`이 있습니다.

배너 카드 보기에서 다음을 확인할 수 있습니다.

  * 필드 이름
  * 필드가 기여하는 전체 트레이스 및 오류 비율

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="총 오류의 24.2%를 나타내는 빨간색 막대와 총 오류의 12.1%를 나타내는 파란색 막대를 표시하는 오류 아웃라이어 카드" style="width:30%;" >}}

전체 사이드 패널에서 다음을 확인할 수 있습니다.

  * 필드를 포함하는 오류 트레이스의 시계열
  * 오류 트레이스와 종종 관련되어 있는 태그
  * 관련된 오류 추적 이슈와 실패 스팬 전체 목록

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="오류 아웃라이어 사이드 패널" style="width:100%;" >}}

### 지연 이상값

지연 아웃라이어는 현재 검색 쿼리와 일치하는 성능 병목 현상과 관련된 태그와 같은 필드를 표시합니다. 기준보다 성능이 낮은 `key:value` 쌍은 APM 스팬 하위 집합 간의 성능 병목 현상에 대한 힌트를 제공할 수 있습니다.

지연 아웃라이어는 스팬 기간 동안 계산됩니다.

배너 카드 보기에서 다음을 확인할 수 있습니다.

* 필드 이름
* 태그가 포함된 범위의 지연 시간 분포와 나머지 데이터의 기준선
* 아웃라이어 태그에 대한 관심 지연 시간 값의 백분위수 및 나머지 데이터에 대한 기준과의 차이

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="지연 아웃라이어 배너 카드" style="width:30%;" >}}

전체 사이드 패널에서 태그 및 기준에 대한 지연 분포 그래프를 볼 수 있습니다. X축에는 해당 필드를 포함하는 APM 이벤트 목록과 `p50`, `p75`, `p99` 및 `max`의 증분이 있습니다.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="지연 아웃라이어 전체 사이드 패널 보기" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Profiling" %}}

### 잠금 경합 아웃라이어

배너 카드 보기에서 다음을 확인할 수 있습니다.

  * 영향 대상 서비스 이름
  * 영향 대상 스레드 수
  * 잠재적 CPU 절약(및 예상 비용 절감액)

{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="잠금 경합에 대한 프로파일링 인사이트" style="width:50%;">}}

전체 사이드 패널에서 잠금 경합을 해결하는 방법에 대한 지침을 확인할 수 있습니다.

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="잠금 경합 아웃라이어를 해결하는 방법에 대한 모든 정보가 포함된 사이드 패널" style="width:100%;">}}

### 쓰레기 수집 아웃라이어

배너 카드 보기에서 다음을 확인할 수 있습니다.

  * 영향 대상 서비스 이름
  * 쓰레기 수집을 수행하는 데 사용되는 CPU 시간(양)

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="쓰레기 수집에 대한 프로파일링 인사이트" style="width:30%;">}}

전체 사이드 패널에서 쓰레기 수집을 더 효과적으로 설정하여 CPU 시간을 확보할 수 있는 방법에 대한 지침을 확인할 수 있습니다.

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="쓰레기 컬렉션 아웃라이어를 해결하는 방법에 대한 모든 정보가 포함된 사이드 패널" style="width:100%;">}}

### 정규식 컴파일 아웃라이어

배너 카드 보기에서 다음을 확인할 수 있습니다.

  * 영향 대상 서비스 이름
  * 정규식 컴파일링에 사용되는 CPU 시간(양)

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="정규식 컴파일에 대한 프로파일링 인사이트" style="width:30%;">}}

전체 사이드 패널에서 정규식 컴파일 시간을 개선하는 방법에 대한 지침과 코드 내에서 개선될 수 있는 함수 예시를 확인할 수 있습니다.

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="정규식 컴파일 아웃라이어를 해결하는 방법에 대한 모든 정보가 포함된 사이드 패널" style="width:100%;">}}

{{% /tab %}}
{{% tab "Databases" %}}

데이터베이스 모니터링의 경우 Watchdog에는 다음 메트릭에 대한 인사이트가 나타납니다.

- `CPU`
- `Commits `
- `IO`
- `Background`
- `Concurrency`
- `Idle`

인사이트 캐러셀을 사용하여 하나 이상의 아웃라이어의 영향을 받은 데이터베이스를 찾으세요.

{{< img src="watchdog/side_panel_dbm_insights.png" alt="인사이트와 함께 데이터베이스를 필터링하는 캐러셀" style="width:100%;">}}

그러면 데이터베이스에 오버레이가 설정됩니다. 분홍색 알약 모양이 다양한 인사이트를 강조하고 상황에 대한 추가 정보를 제공합니다.

{{< img src="watchdog/overlay_database_insight.png" alt="데이터베이스에 상황을 강조 표시하는 Watchdog 인사이트 오버레이" style="width:100%;">}}

{{% /tab %}}
{{% tab "RUM" %}}

### 오류 아웃라이어

상황을 강조하기 위해 데이터베이스에 대한 Watchdog 인사이트 오버레이 오류 아웃라이어는 현재 검색 쿼리와 일치하는 오류의 특성을 포함하는 [패싯 태그 또는 속성][3]과 같은 필드를 표시합니다. 오류 중 통계적으로 과도하게 표현된 `key:value` 쌍은 문제의 근본 원인에 대한 힌트를 제공할 수 있습니다. 오류 아웃라이어의 일반적인 예로는 `env:staging`, `version:1234` 및 `browser.name:Chrome`가 있습니다.

배너 카드 보기에서 다음을 확인할 수 있습니다.

* 필드 이름
* 필드가 기여하는 총 오류 및 전체 RUM 이벤트의 비율
* 관련된 태그

전체 사이드 패널에서는 해당 필드가 포함된 RUM 이벤트 목록 및 영향 원형 차트와 함께 해당 필드의 총 RUM 오류 수에 대한 시계열 그래프를 볼 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Error Outlier 전체 사이드 패널" style="width:100%;" >}}

### 지연 아웃라이어

지연 아웃라이어는 현재 검색 쿼리와 일치하는 성능 병목 현상과 관련된 [패싯 태그 또는 속성][1]과 같은 필드를 표시합니다. 기준보다 성능이 낮은 `key:value` 쌍은 실제 사용자 하위 집합의 성능 병목 현상에 대한 힌트를 제공할 수 있습니다.

First Contentful Paint, First Input Delay, Cumulative Layout Shift 및 [로딩 시간][3] 등 [핵심 웹 바이탈][2]에 대해 지연 아웃라이어가 계산됩니다. 자세한 내용은 [페이지 성능 모니터링][2]을 참조하세요.

배너 카드 보기에서 다음을 확인할 수 있습니다.

* 필드 이름
* 나머지 데이터에 대한 필드 및 기준선을 포함하는 성능 메트릭 값

전체 사이드 패널에서 성능 지표에 대한 시계열 그래프를 볼 수 있습니다. X축에는 해당 필드를 포함하는 RUM 이벤트 목록과 함께 `p50`, `p75`, `p99` 및 `max`의 증분이 표시됩니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="지연 이상값 전체 사이드 패널 보기" style="width:100%;" >}}

[1]: /ko/real_user_monitoring/explorer/search/#facets
[2]: /ko/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /ko/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Serverless" %}}

서버리스 인프라의 경우 Watchdog는 다음 인사이트를 제공합니다.

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

인사이트 캐러셀을 사용하여 하나 이상의 아웃라이어에 영향을 받는 서버리스 기능을 찾으세요.

{{< img src="watchdog/side_panel_serverless_facet_insights.png" alt="인사이트를 사용해 서버리스 기능을 필터링하는 패싯" style="width:30%;">}}

그러면 해당 기능에 오버레이가 설정됩니다. 분홍색 알약 모양이 각기 다른 인사이트를 강조하고 상황에 대한 추가 정보를 제공합니다.

{{< img src="watchdog/overlay_serverless_insight.png" alt="발생 상황을 강조 표시하는 기능에 대한 Watchdog 인사이트 오버레이" style="width:100%;">}}

[1]: /ko/serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processes" %}}

프로세스 탐색기의 경우 Watchdog 인사이트 캐러셀은 프로세스 탐색기의 현재 컨텍스트에 대한 [모든 프로세스 이상][1]을 반영합니다.

[1]: /ko/watchdog/#overview
{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스 탐색기의 경우 Watchdog 인사이트 캐러셀은 쿠버네티스 탐색기의 현재 컨텍스트에 대한 [모든 쿠버네티스 이상][1]을 반영합니다.

[1]: /ko/watchdog/#overview
{{% /tab %}}
{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/apm/traces
[3]: /ko/tracing/services/service_page/
[4]: /ko/tracing/services/resource_page/
[5]: https://app.datadoghq.com/databases/list
[6]: https://app.datadoghq.com/profiling/search
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/orchestration/overview/pod
[10]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aview
[11]: /ko/watchdog/#overview
[12]: https://app.datadoghq.com/watchdog
[13]: https://app.datadoghq.com/rum/error-tracking