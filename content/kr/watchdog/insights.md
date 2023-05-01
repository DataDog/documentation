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
kind: 설명서
title: Watchdog Insights
---

## 개요

Datadog Watchdog은 백그라운드에서 지속적으로 실행되어 조직의 전체 데이터 세트에서 이상 징후를 검색합니다. Datadog UI를 탐색할 때 Watchdog Insights는 활성 검색 쿼리와 일치하는 이상 징후를 필터링하고 우선 순위별로 정렬한 목록을 표시합니다.

인시던트 조사에는 시행 착오가 필요합니다. 특정 영역에 익숙한 엔지니어는 경험에 따라 잠재적인 문제를 어디에서 먼저 찾아야 하는지 알고 있습니다. Watchdog Insights를 사용하면 미숙한 엔지니어를 포함한 모든 엔지니어가 가장 중요한 데이터에 주의를 기울이고 인시던트 조사를 가속화할 수 있습니다.

### 이상 징후 유형

각 인사이트는 사용자 하위 집합에 영향을 미치는 하나의 아웃라이어 또는 이상 징후를 강조 표시합니다. 제품 영역에 따라 Watchdog Insights는 다양한 유형의 이상 징후를 표시합니다. 그 예는 다음과 같습니다.
- 로그, 트레이스 및 RUM 보기의 오류 및 레이턴시 아웃라이어
- 오류 로그 급증
- 새 오류 로그
- 교착 상태의 스레드
- 준비되지 않은 Kubernetes 포드의 높은 비율

### 우선 순위 지정

Watchdog은 목록의 시작 부분에 가장 중요한 인사이트를 배치하기 위해 여러 요인을 조합하여 인사이트를 정렬합니다. Watchdog이 고려하는 요소에는 다음이 포함될 수 있습니다.
- 상태(진행 중 및 해결됨)
- 상태(경고, 오류 또는 위험)
- 시작 시간
- 이상 징후 유형

## 사용법

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="웹 스토어 서비스의 새로운 오류 로그, 제품 추천 서비스의 오류 로그 급증, 제품 추천 서비스의 오류 로그 급증 등 세 가지의 이상 징후를 보여주는 로그 탐색기의 Watchdog Insights 배너" >}}

Watchdog Insights 배너는 각 페이지 상단 근처에 있습니다. 개요를 보려면 배너를 펼치십시오. 우선 순위가 가장 높은 인사이트가 왼쪽에 나타납니다. Watchdog에서 문제를 찾을 수 없는 경우 배너는 회색이 됩니다.

### 인사이트 필터링

Watchdog Insight와 일치하도록 현재 보기를 정제하려면 인사이트 요약 카드의 오른쪽 상단 모서리 위로 마우스를 가져갑니다. 두 개의 아이콘이 나타납니다. 툴팁 **Filter on Insight**가 있는 역삼각형 아이콘을 클릭합니다. 인사이트에 해당하는 항목 목록을 표시하도록 페이지가 새로고침됩니다.

### 사이드 패널

패널을 확장하려면 **View all**를 클릭하세요. Watchdog Insights의 세로 목록이 포함된 사이드 패널이 오른쪽에서 열립니다. 각 항목은 요약 카드보다 더 많은 정보가 포함된 상세 보기를 보여줍니다.

{{< img src="watchdog/log_explorer_watchdog_insights_panel.png" alt="로그 탐색기 내의 Watchdog Insights 사이드 패널 보기. 상단 영역에는 시간 경과에 따른 오류 상태의 막대 그래프가 표시됩니다. 하나의 로그 이상 징후 카드가 'New error logs were detected on service:web-store.'" >}}

### 상세 보기

인사이트를 자세히 보려면 개별 카드를 클릭하세요. 전체 사이드 패널은 오른쪽에서 열립니다.

{{< img src="watchdog/profiler_watchdog_insight.png" alt="'Lock Pressure is high in service:product-recommendation' 타이틀이 지정된 Watchdog Insights 전체 사이드 패널 보기'" >}}

클릭 한 번으로 인사이트를 공유하려면 전체 사이드 패널에서 **Copy Link** 버튼을 클릭하세요. 인사이트를 생성한 쿼리로 클립보드가 채워집니다.

## Watchdog 인사이트 살펴보기

[Infrastructure][1], [APM][2], [Log Management][3] 및 [RUM][4]의 네 가지 제품 영역에서 Watchdog Insights를 찾을 수 있습니다.

### 인프라스트럭처

Watchdog Insights는 [Live Containers][5]의 Kubernetes 탐색기 탭에 나타납니다.

1. 왼쪽 탐색창에서 **Infrastructure** 위로 마우스를 가져갑니다.
2. **Kubernetes**를 클릭합니다.
3. 페이지 상단에서 **Explorer** 탭을 선택합니다.
4. **Select Resources** 상자에서 Kubernetes 리소스 유형 중 하나를 선택합니다.
5. 상단에 Watchdog Insights 패널이 있는 Kubernetes 리소스 목록이 나타납니다.

### APM

Watchdog Insights는 APM 내의 여러 페이지에 나타납니다.
- [Trace Explorer][6]
- [Continuous Profiler][7]
- [Service Page][8]
- [Resource Page][9]

### 로그 관리

로그 관리 UI에서 Watchdog Insights를 찾으려면 다음 단계를 수행하세요.
1. 왼쪽 탐색창에서 **Logs** 위로 마우스를 가져갑니다.
2. **Search**를 클릭합니다.

분홍색 Watchdog Insights 배너가 로그 위 화면 중앙에 나타납니다.

자세한 내용은 [Watchdog Insights for Logs][10]를 참조하세요.

### RUM

RUM UI에서 Watchdog Insights를 찾으려면 다음 단계를 수행하세요.
1. 왼쪽 탐색창에서 **UX Monitoring** 위로 마우스를 가져갑니다.
2. **Sessions & Replays**를 클릭합니다.
3. 페이지 상단의 **In** 드롭다운은 현재 **Sessions** 수준에 있음을 보여줍니다. 드롭다운을 **Views**로 변경합니다.

분홍색 Watchdog Insights 배너는 보기 위의 화면 중앙에 나타납니다.

자세한 내용은 [Watchdog Insights for RUM][11]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview/pod
[2]: https://app.datadoghq.com/apm/home
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/rum/explorer
[5]: /kr/infrastructure/livecontainers/#kubernetes-resources-view
[6]: /kr/tracing/trace_explorer/
[7]: /kr/tracing/profiler/
[8]: /kr/tracing/services/service_page/
[9]: /kr/tracing/services/resource_page/
[10]: /kr/logs/explorer/watchdog_insights/
[11]: /kr/real_user_monitoring/explorer/watchdog_insights/