---
aliases:
- /ko/guides/eventcorrelation/
- /ko/guides/markdown/
- /ko/events
further_reading:
- link: /api/latest/events/
  tag: 설명서
  text: Datadog Events API
- link: /service_management/events/guides/recommended_event_tags/
  tag: 설명서
  text: Tagging Events에 대한 모범 사례
- link: https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/
  tag: 블로그
  text: Sensitive Data Scanner를 사용하여 이벤트에서 민감 데이터 식별 및 수정
- link: https://app.datadoghq.com/event/configuration/quick-start
  tag: App
  text: 퀵 스타트 가이드
- link: https://www.datadoghq.com/blog/datadog-event-management
  tag: 블로그
  text: AIOps 기반 Event Management를 통해 더 빠르게 알림을 집계하고 상호 연관성을 파악하여 조치를 취하세요.
is_beta: true
title: Event Management
---

{{< img src="service_management/events/correlation/event_management.png" alt="이벤트 관리란?" style="width:100%;" >}}

## 개요

모든 소스의 이벤트를 수집하고, 강화하고, 정규화하고, 실행 가능한 인사이트로 상호 연관시킵니다(공개 베타 참조). Datadog은 모니터, Watchdog, Error Tracking 등 다양한 제품에서 자동으로 이벤트를 생성합니다. Agent 및 설치된 통합에서 생성된 이벤트를 추적할 수도 있습니다. Event Management는 타사의 알림 이벤트, 변경 요청, 배포, 구성 변경 등 모든 소스에서 이벤트를 수집할 수도 있습니다.

[Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [Amazon ECS][6], [Autoscaling][7], [Sentry][8], [Nagios][9]를 포함하여 100개 이상의 Datadog 통합에서 이벤트 수집이 지원됩니다.

## 구성 요소

{{< whatsnext desc="Event Management 기능:">}}
    {{< nextlink href="/service_management/events/ingest/" >}}<u>이벤트 수집</u> - Datadog에 이벤트를 보내는 방법 알아보기{{< /nextlink >}}
     {{< nextlink href="/service_management/events/pipelines_and_processors/">}}<u>파이프라인 및 프로세서</u> - 이벤트 강화 및 정규화{{< /nextlink >}}
    {{< nextlink href="/service_management/events/explorer/" >}}<u>Events Explorer</u> - Datadog으로 들어오는 이벤트의 알림 확인, 검색 및 전송{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/usage/" >}}<u>이벤트 사용</u> - 이벤트 분석, 조사 및 모니터링{{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/" >}}<u>상호 연관</u> - 알림 피로도 및 수신 티켓/알림 수 조정{{< /nextlink >}}

{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/kubernetes/#event-collection
[2]: /ko/agent/docker/#events
[3]: /ko/integrations/jenkins/#events
[4]: /ko/integrations/chef/#report-handler
[5]: /ko/integrations/puppet/#events
[6]: /ko/integrations/amazon_ecs/#events
[7]: /ko/integrations/amazon_auto_scaling/#events
[8]: /ko/integrations/sentry/
[9]: /ko/integrations/nagios/#events