---
aliases:
- /ko/logs/explorer/insights
description: 분석을 어디에서 시작하고 후속 진행해야 하는지 인사이트를 얻어보세요
further_reading:
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: 블로그
  text: Watchdog Insight로 로그 조사 가속화하기
- link: logs/explorer/side_panel
  tag: 설명서
  text: 자세한 내용은 로그 사이드 패널에서 확인하세요.
- link: logs/explorer/#list-of-logs
  tag: 설명서
  text: 로그 탐색기에 대해 더 알아보기
title: Watchdog Insights for Logs
---

## 개요

Datadog 로그 관리는 로그 탐색기에서 상황별 인사이트를 통해 인시던트를 더 빠르게 해결할 수 있도록 Watchdog Insight를  제공합니다. Watchdog Insight는 의심스러운 이상 (징후), 아웃라이어(outlier) 및 일부 사용자에게 영향을 미치는 잠재적인 성능 병목 현상을 표시하여 사용자의 전문성과 직감을 보완하는 역할을 합니다.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="5가지 로그 이상이 있는 Watchdog Insights 배너를 표시하는 로그 탐색기" style="width:100%;" >}}

## 내비게이션

Watchdog Insight 배너는 [로그 탐색기][1]에 표시되며 현재 쿼리에 대한 인사이트를 표시합니다.

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="The Watchdog Insights banner in the collapsed view" style="width:100%;" >}}

모든 인사이트의 개요를 보려면 Watchdog Insight 배너를 확장하세요.

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="The Watchdog Insights banner showing three error outliers" style="width:100%;" >}}

전체 Watchdog Insight 사이드 패널에 액세스하려면 **모두 보기**를 클릭하세요.

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="The Watchdog Insights side panel showing more details about the error outliers" style="width:100%;" >}}

모든 인사이트는 양방향 소통 방식으로 제공되며 트러블슈팅 정보가 있는 사이드 패널을 포함하고 있습니다. 각 상호 작용돠 사이드 패널은 Watchdog Insight 유형에 따라 다릅니다.

## 인사이트 유형

[Watchdog Insight][8]는 특정 태그에서 탐지된 이상 (징후) 및 아웃라이어(outlier)를 표시하여 이슈의 근본 원인을 조사할 수 있도록 합니다. [Insight][9]는 애플리케이션 성능 모니터링(APM), 연속 프로파일러, 로그 관리, 인프라스트럭처 데이터에서 발견되며 여기에는 `service` 태그가 포함됩니다. 로그 관리에 따라 두 가지 유형의 Watchdog Insight가 있습니다.

- [로그 이상 탐지](#log-anomaly-detection)
- [오류 아웃라이어(outlier)](#error-outliers)

### 로그 이상 탐지

수집된 로그는 수집 수준에서 분석되며, Watchdog는 `environment`, `service`, `source` 및 `status` 태그 뿐만 아니라 탐지된 패턴에 대한 집계를 수행합니다.
이렇게 집계된 로그에서 다음과 같은 이상 동작이 있는지 검사합니다.

- 경고 또는 오류 상태의 로그 발생.
- 경고 또는 오류 상태 로그의 갑작스러운 증가.


로그는 로그 탐색기에 인사이트로 표시됩니다.해당 로그는 검색 컨텍스트 및 역할에 적용된 모든 제한 사항과 일치합니다.

{{< img src="logs/explorer/watchdog_insights/log-anomalies-light-cropped.mp4" alt="A user scrolling through the details of a specific insight" video="true">}}

특정 인사이트를 클릭하면 탐지된 이상에 대한 전체 설명과 이에 기여한 패턴 목록을 확인할 수 있습니다.

Watchdog에서 특히 심각하다고 판단하는 이상 징후는 [Watchdog 알림 피드][6]에도 표시되며 [Watchdog 로그 모니터링][7]을 설정하여 알림을 받을 수 있습니다.
심각한 이상은 다음과 같이 정의됩니다.

* 오류 로그 포함
* 최소 10분 이상 지속 (일시적 오류는 배제할 목적)
* 상당히 크게 증가한 경우(약간 증가한 경우는 배제할 목적)

로그 탐색기에서 로그를 검색하는 방법에 대한 자세한 정보는 [로그검색 구문][2] 및 [커스텀 시간 프레임][3]을 참조하세요.

### 오류 아웃라이어(outlier)

오류 아웃라이어(outlier)는 현재 쿼리와 일치하는 오류의 특성을 포함하는 [패싯 태그 또는 속성][4]과 같은 필드를 표시합니다. 오류 중 통계적으로 과다하게 나타나는 `key:value` 쌍은 이슈의 근본 원인에 대한 힌트를 제공합니다.

오류 아웃라이어의 대표적인 예에는 `env:staging`, `docker_image:acme:3.1` 및 `http.useragent_details.browser.family:curl`이 있습니다.

**배너 카드** 화면에서 다음을 볼 수 있습니다.

  * 항목 이름.
  * 해당 필드가 기여하는 오류 및 전체 로그 비율입니다.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="총 오류의 73.3%를 나타내는 빨간색 막대와 총 오류의 8.31%를 나타내는 파란색 막대를 표시하는 오류 아웃라이어 카드" style="width:50%;" >}}

**사이드 패널 카드** 보기에서 해당 필드와 함께 오류 로그의 기본 [로그 패턴][5]을 볼 수 있습니다.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:100%;" >}}

**전체 사이드 패널** 보기에서 확인할 수 있습니다.

  * 필드가 포함된 로그 오류의 시계열입니다.
  * 보통 오류 로그와 관계된 태그입니다.
  * [로그 패턴][5]의 포괄적인 목록입니다.

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="오류 아웃라이어 사이드 패널" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/logs
[2]: /ko/logs/search-syntax
[3]: /ko/dashboards/guide/custom_time_frames
[4]: /ko/logs/explorer/facets/
[5]: /ko/logs/explorer/analytics/patterns
[6]: https://app.datadoghq.com/watchdog
[7]: /ko/monitors/types/watchdog/
[8]: /ko/watchdog/
[9]: /ko/watchdog/insights/?tab=logmanagement#outlier-types