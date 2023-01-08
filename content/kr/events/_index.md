---
aliases:
- /kr/guides/eventcorrelation/
- /kr/guides/markdown/
further_reading:
- link: /api/v1/events/
  tag: 설명서
  text: Datadog Events API
- link: /events/guides/recommended_event_tags/
  tag: 설명서
  text: Tagging Events에 대한 모범 사례
- link: https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/
  tag: 블로그
  text: Sensitive Data Scanner를 사용하여 이벤트에서 민감 데이터 식별 및 수정
kind: 설명서
title: Events
---

{{< img src="events/events-overview.png" alt="Events 익스플로러" >}}

## 시작하기

_Events_는 코드 배포, 서비스 상태, 설정 변경 또는 경고 모니터링과 같은 IT 운영의 관리 및 트러블슈팅과 관련된 주요 변경 사항의 기록입니다.

Datadog Events는 모든 소스의 이벤트를 한 곳에서 검색, 분석 및 필터링할 수 있는 통합 인터페이스를 제공합니다.

추가 설정 없이 Datadog Events는 에이전트 및 설치된 통합에서 수집한 이벤트를 자동으로 수집합니다.

[쿠버네티스(Kubernetes)][1], [도커(Docker)][2], [Jenkins][3], [Chef][4], [Puppet][5], [AWS ECS][6] 또는 [Autoscaling][7], [Sentry][8] 및 [Nagios][9]를 포함하여 100개 이상의 Datadog 통합이 이벤트 수집을 지원합니다. 

## Datadog에 커스텀 이벤트 보내기

[Datadog API][10], [Custom Agent Check][11], [DogStatsD][12] 또는 [Events Email API][13]를 사용하여 커스텀 이벤트를 제출할 수도 있습니다.

## Datadog Events 탐색

### 이벤트 익스플로러 및 분석

[Events Explorer][14]를 사용하여 Datadog에 들어오는 이벤트를 집계하고 봅니다. 속성별로 이벤트를 그룹화하거나 필터링하고 [이벤트 분석][15]을 사용하여 이벤트를 그래픽으로 표시합니다. [쿼리 구문][16]을 사용하여 불 및 와일드카드 연산자를 사용하여 이벤트를 필터링합니다.

{{< img src="events/events-explorer.mp4" alt="속성별 이벤트 정렬 및 분석 탐색" video=true >}}

### 대시보드 위젯의 소스로서의 이벤트

[그래프 위젯][17]에서 이벤트를 데이터 소스로 사용할 수 있습니다. 이벤트 검색 쿼리의 시계열, 표 및 상위 목록 위젯을 작성할 수 있습니다.

{{< img src="events/events-dashboard.mp4" alt="이벤트를 소스로 사용하는 그래프 위젯" video=true >}}

예를 들어, 모니터 경고 이벤트 추세를 분석하여 설정을 개선하고 경고 피로도를 줄이는 데 도움이 되는 [Monitor Notifications Overview][18] 대시보드를 확인하세요.

### 이벤트에서 커스텀 메트릭 생성

이벤트 검색 쿼리에서 15개월 동안 리텐션되는 [메트릭을 생성][15]하여 과거 이벤트 및 경고를 생성하고 모니터링합니다.

{{< img src="events/generate-metrics.png" alt="이벤트 검색 쿼리가 있는 메트릭 이미지." >}}

### 처리 파이프라인으로 이벤트 정규화 및 강화

_프로세서_는 이벤트 속성이 수집될 때 데이터 구조화 작업을 실행합니다. _파이프라인_은 순차적으로 실행되는 하나 이상의 프로세서로 구성됩니다. 이벤트 처리 파이프라인을 사용하여 다음을 수행할 수 있습니다.

- 속성을 다시 매핑하여 서로 다른 이벤트 소스를 정규화합니다. 예를 들어, 모든 곳에서 동일한 예약된 [서비스 태그][19]를 사용합니다.
- [Reference Table][20](베타)에 저장된 외부 데이터로 이벤트를 강화합니다. 예를 들어, 서비스 디렉터리에 서비스 이름을 매핑하여, 팀 소유권 정보, 대시보드 링크 또는 문서 링크로 이벤트를 보강합니다.

더 많은 프로세서 유형에 대한 지원이 개발 중입니다. 자세한 내용은 [지원팀에 문의][21]하세요.

[처리 파이프라인에 대해 자세히 알아보세요][22].

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /kr/agent/kubernetes/#event-collection
[2]: /kr/agent/docker/#events
[3]: /kr/integrations/jenkins/#events
[4]: /kr/integrations/chef/#report-handler
[5]: /kr/integrations/puppet/#events
[6]: /kr/integrations/amazon_ecs/#events
[7]: /kr/integrations/amazon_auto_scaling/#events
[8]: /kr/integrations/sentry/
[9]: /kr/integrations/nagios/#events
[10]: /kr/api/latest/events/#post-an-event
[11]: /kr/events/guides/agent/
[12]: /kr/events/guides/dogstatsd/
[13]: /kr/events/guides/email/
[14]: /kr/events/explorer/
[15]: /kr/events/explorer/#event-analytics
[16]: /kr/logs/explorer/search_syntax/
[17]: /kr/dashboards/widgets/alert_graph/
[18]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[19]: /kr/getting_started/tagging/unified_service_tagging/
[20]: /kr/integrations/guide/reference-tables/
[21]: /kr/help/
[22]: /kr/logs/log_configuration/processors/