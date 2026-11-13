---
aliases:
- /ko/service_management/events/usage
- /ko/service_management/events/guides/usage/
further_reading:
- link: /logs/log_configuration/processors/
  tag: 설명서
  text: Pipelines 처리에 대해 알아보기
- link: /events/explorer/
  tag: 설명서
  text: Events Explorer로 이벤트 분류
title: 이벤트 사용
---
## 사용자 지정 메트릭 {#custom-metrics}

이벤트 검색 쿼리에서 15개월간 보존되는 [메트릭을 생성][5]하여 과거 이벤트 및 경보를 생성하고 모니터링하세요. 타임스탬프가 지난 20분 이내인 수집된 이벤트만 집계 대상으로 간주됩니다. 자세한 내용은 [Event Analytics][6]를 참조하세요.

{{< img src="events/guides/usage/generate-metrics.png" alt="이벤트 검색 쿼리가 포함된 메트릭 이미지." >}}

## 이벤트로 수행하는 작업의 예시 {#examples-of-what-to-do-with-events}

### 분류 기능 {#triage-features}

[Events Explorer][7]를 사용하여 Datadog으로 들어오는 이벤트를 집계하고 조회할 수 있습니다. 속성별로 이벤트를 그룹화하거나 필터링하고 Event Analytics를 사용하여 그래프로 표현하세요. 쿼리 검색 구문을 사용하여 불리언 및 와일드카드 연산자로 이벤트를 필터링하세요.

### 대시보드 {#dashboards}

{{< img src="events/guides/usage/events-dashboard.mp4" alt="이벤트를 소스로 사용하는 그래프 위젯" video=true >}}

[그래프 위젯][8]에서 이벤트를 데이터 소스로 사용하여 이벤트 검색 쿼리의 시계열, 표 및 상위 목록 위젯을 작성할 수 있습니다. 예를 들어, [Monitor Notifications Overview][9] 대시보드는 모니터링 경보 이벤트의 추세를 분석하여 구성을 개선하고 경보 피로도를 줄이는 데 도움이 됩니다.

#### 오버레이 {#overlays}

{{< img src="events/guides/usage/event_overlays.png" alt="예시 대시보드에서 이벤트 오버레이를 조회하는 옵션" style="width:100%;" >}}

오버레이는 그래프 위에 해당 이벤트를 시각화합니다. 대시보드의 [Event Overlays][10] 기능을 사용하여 최근 변경 사항이 애플리케이션이나 서비스의 성능 문제를 일으키는 시점을 파악하고 문제의 원인을 찾으세요. 

### 모니터 생성 {#create-a-monitor}

중요한 이벤트 쿼리를 기반으로 모니터 경보와 알림을 보냅니다. 경보를 구성하려면 [이벤트 모니터][11] 설명서를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/settings/pipelines
[4]: /ko/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /ko/events/explorer/analytics
[7]: /ko/events/explorer/
[8]: /ko/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /ko/dashboards/change_overlays/
[11]: /ko/monitors/types/event/