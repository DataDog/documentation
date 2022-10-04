---
description: 분석을 어디에서 시작하고 후속 진행해야 하는지 인사이트를 얻어보세요
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: RUM Explorer의 검색법을 자세히 알아보세요
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: 블로그
  text: RUM으로 Core Web Vital을 모니터링하세요
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: 블로그
  text: Datadog Mobile RUM으로 모바일 사용자 경험을 개선하세요
kind: 설명서
title: Watchdog Insights for RUM
---

## 개요

Datadog Real User Monitoring(RUM)은 RUM Explorer의 컨텍스트 인사이트와 관련하여 문제의 근본 원인을 파악하는 데 도움이 되는 Watchdog Insights를 제공합니다. Watchdog Insights는 서브셋에 영향을 주는 아웃라이어(outlier)와 성능의 병목 현상이 발생할 수 있는 부분을 파악하여 사용자의 전문 지식과 능력을 보완해줍니다.

이번 가이드에서는 Watchdog Insights를 이용해 `view.url_host:www.shopist.io`에 배포된 애플리케이션 인스턴스가 지정된 기간(예: 과거 1일)에 대부분의 오류를 일으켰다는 사실을 파악하는 사례를 보여드리겠습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## 내비게이션

Watchdog Insights 배너는 **RUM Explorer 결과** 페이지에 표시되며 현재 쿼리와 관련된 인사이트를 보여줍니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights 배너(숨김 상태)" style="width:100%;" >}}

모든 인사이트의 개요를 보려면 Watchdog Insight 배너를 확장하세요.

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights 배너(확장 상태)" style="width:100%;" >}}

전체 Watchdog Insight 패널에 액세스하려면 **View all**을 클릭하세요.

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights 사이드 패널" style="width:100%;" >}}

모든 인사이트에는 인터랙션이 임베딩되며, 트러블슈팅 정보가 기재된 사이드 패널이 포함되어 있습니다. 인사이트 인터랙션과 사이드 패널은 [Watchdog Insights 유형](#collections)에 따라 달라집니다.

## 컬렉션

### 오류 아웃라이어(outlier)

하나의 인사이트 유형에는 현재 쿼리에 일치하는 오류 특성을 포함하는 [패싯 태그 또는 속성][1] 등의 항목을 표시하는 오류 아웃라이어(outlier)가 있습니다. 오류 간에 통계적으로 과대평가된 `key:value` 쌍은 문제의 근본 원인을 파악하도록 돕는 힌트가 됩니다.

일반적인 오류 아웃라이어(outlier)의 예시로는 `env:staging`, `version:1234`, `browser.name:Chrome`이 있습니다.

**배너 카드** 및 **사이드 패널 카드** 화면에서 다음을 볼 수 있습니다.

* 항목 이름.
* 항목으로 인하여 발생한 오류와 전체적인 RUM 이벤트의 비율.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="오류 아웃라이어 배너 카드와 사이드 패널 카드 화면" style="width:100%;" >}}

**풀 사이드 패널**에서 항목과 RUM 오류의 시계열을 확인할 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="오류 아웃라이어 풀 사이드 패널" style="width:100%;" >}}

### 레이턴시 아웃라이어

다른 유형의 인사이트로는 성능의 병목과 관련되며 현재 쿼리와 일치하는 [패싯 태그 또는 속성][1] 등의 항목을 표시하는 레이턴시 아웃라이어가 있습니다. 기준(베이스라인)보다 성능이 낮은 `key:value` 쌍은 실제 사용자의 서브셋 사이에서 발생한 성능 병목 현상을 알아보는 힌트가 됩니다.

레이턴시 아웃라이어는 First Contentful Paint, First Input Delay, Cumulative Layout Shift 등의 [Core Web Vitals][2] 및 [Loading Time][3]에 대하여 계산합니다.

**배너 카드** 화면에서 다음을 볼 수 있습니다.

* 항목 이름.
* 항목과 잔여 데이터의 베이스라인을 포함하는 퍼포먼스 메트릭 값.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="레이턴시 아웃라이어 배너 카드 화면" style="width:100%;" >}}

**사이드 패널 카드** 화면에서 항목의 퍼포먼스 메트릭 시계열과 잔여 데이터의 베이스라인을 확인할 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="레이턴시 아웃라이어 사이드 패널 화면" style="width:100%;" >}}

**풀 사이드 패널** 화면에서 항목을 포함하는 RUM 이벤트 목록을 조회 가능합니다. [퍼포먼스 워터폴][4]에서는 성능 관련 문제의 근본 원인을 찾을 수 있습니다.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="레이턴시 아웃라이어 풀 사이드 패널 화면" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/logs/explorer/facets/
[2]: /kr/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /kr/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /kr/real_user_monitoring/explorer/?tab=facets#event-side-panel