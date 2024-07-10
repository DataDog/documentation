---
description: Watchdog Insights로 RUM 애플리케이션의 이슈를 자세히 파악해 보세요.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: 블로그
  text: RUM으로 Core Web Vitals 모니터링
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: 블로그
  text: Datadog Mobile RUM으로 모바일 사용자 경험을 개선하세요
- link: /watchdog/insights
  tag: 설명서
  text: Watchdog Insights에 대해 알아보기
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: RUM 탐색기에서 검색하는 방법 알아보기
title: RUM을 위한 Watchdog Insights
---

## 개요

Datadog 실제 사용자 모니터링(RUM)은 RUM 탐색기에서 상황별 인사이트를 통해 문제의 근본 원인을 탐색하는 데 도움이 되는 Watchdog Insights를 제공합니다. Watchdog Insights는 사용자 하위 집합에 영향을 미치는 이상값과 잠재적인 성능 병목 현상을 추천하여 사용자의 전문 지식과 직관을 보완합니다.

자세한 내용은 [Watchdog Insights][1]를 참조하세요.

## 수집된 인사이트 탐색

분홍색 Watchdog Insights 배너가 [RUM 탐색기][2]에 나타나 일정 기간 동안의 검색 쿼리에 대한 인사이트를 표시합니다. 이 예는 Watchdog Insights가 주어진 시간 범위(예: 지난 하루)에 특정 양의 오류를 발생시킨 `view.url_host:www.shopist.io`의 배포된 애플리케이션 인스턴스에서 문제를 표시하는 방법을 보여줍니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="RUM 탐색기의 Watchdog Insights 배너 카드" style="width:100%;" >}}

[error](#error-outliers) 또는 [latency outlier](#latency-outliers)를 클릭하여 사이드 패널에 포함된 시각화와 상호 작용하고 영향을 받은 이벤트 목록에서 보기를 찾습니다. **View all**을 클릭하여 사이드 패널에서 모든 미해결 오류 이상값을 확인할 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card-3.png" alt="RUM 탐색기의 오류 이상값 배너 카드 및 사이드 패널 카드 보기" style="width:100%;" >}}

배너에 있는 카드 위에 마우스를 올려놓고 **Filter on Insight**를 클릭하여 비정상적인 인사이트 행동을 검색 쿼리에 추가합니다. 예를 들어, 특정 보기 경로 또는 `North America`와 같은 특정 대륙으로 범위를 좁힐 수 있습니다.

**View in Analytics**를 클릭하여 `Group into fields` 공식을 자동으로 설정하고 검색 쿼리 아래에서 `Visualize as` 유형을 선택하여 카드의 이상값 동작을 반영합니다. 예를 들어, 검색 공식에서 `synthetics.test_id`를 사용하여 Synthetic 테스트에서 비정상적으로 높은 오류율에 대한 시계열 그래프를 만들어 모니터 또는 대시보드로 내보낼 수 있습니다.

## 오류 이상값

오류 이상값은 현재 검색 쿼리와 일치하는 오류의 특성을 포함하는 [패싯 태그 또는 속성][3]과 같은 필드를 표시합니다. 오류들 중에서 통계적으로 과도하게 나타나는 `key:value`쌍은 문제의 근본 원인에 대한 힌트를 제공할 수 있습니다. 오류 이상값의 대표적인 예로는 `env:staging`, `version:1234` `browser.name:Chrome`이 있습니다.

**배너 카드** 화면에서 다음을 볼 수 있습니다.

* 필드 이름
* 필드가 기여하는 총 오류 및 전체 RUM 이벤트의 비율
* 관련된 태그

**전체 사이드 패널**에는 해당 필드를 포함하는 총 RUM 오류 수에 대한 시계열 그래프와 영향도를 나타내는 원형 차트 및 필드가 포함된 RUM 이벤트 목록이 표시됩니다.


{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Error Outlier 전체 사이드 패널" style="width:100%;" >}}

## 레이턴시 이상값

레이턴시 시간 이상값은 현재 검색 쿼리와 일치하는 성능 병목 현상과 관련된 [패싯 태그 또는 속성][3]과 같은 필드를 표시합니다. 기준선보다 성능이 나쁜 `key:value` 쌍은 실제 사용자 하위 집합의 성능 병목 현상에 대한 힌트를 제공할 수 있습니다.

지연 이상값은 First Contentful Paint, First Input Delay, Cumulative Layout Shift와 같은 [Core Web Vitals][4], 그리고 [Loading Time][5]에 대해 계산됩니다. 자세한 내용은 [모니터링 페이지 성능][4]을 참조하세요.

**배너 카드** 화면에서 다음을 볼 수 있습니다.

* 필드 이름
* 나머지 데이터에 대한 필드 및 기준선을 포함하는 성능 메트릭 값

**전체 사이드 패널**에서 `p50`, `p75`, `p99`, 및 `max`의 증분값을 X축으로 하는  성능 메트릭에 대한 시계열 그래프와 해당 필드를 포함하는 RUM 이벤트 목록을 볼 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="지연 이상값 전체 사이드 패널 보기" style="width:100%;" >}}

이 시계열 그래프에서 성능 문제의 근본 원인을 조사할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/watchdog/insights/
[2]: /ko/real_user_monitoring/explorer
[3]: /ko/real_user_monitoring/explorer/search/#facets
[4]: /ko/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[5]: /ko/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa