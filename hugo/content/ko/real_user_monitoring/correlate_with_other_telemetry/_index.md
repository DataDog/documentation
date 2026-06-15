---
description: 추가 Datadog 제품으로 수집한 텔레메트리와 RUM 이벤트를 연결하는 방법에 관해 알아봅니다.
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 설명서
  text: 교차 제품 연결을 통한 트러블슈팅
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: 블로그
  text: RUM 이벤트와 APM 텔레메트리를 원활하게 연결하여 풀 스택을 가시화하기
title: RUM 이벤트를 다른 텔레메트리와 상호 연결하기
---

다양한 Datadog 프로덕트별로 데이터를 상호 연관시켜 단 몇 번의 클릭만으로 비즈니스에 미치는 영향을 추정하고 문제의 근본 원인을 찾을 수 있도록 도와드리는 컨텍스트를 제공합니다. 수신 데이터 간의 연결을 설정하여 탐색기와 대시보드에서 빠르게 피벗 작업을 할 수 있도록 도와드립니다.

## RUM과 로그 상호 연결

사용자 세션과 보기 이벤트에서 수집한 데이터를 로그와 상호 연결하여 애플리케이션 동작에 관해 더욱 깊은 인사이트를 얻고 트러블슈팅을 간소화할 수 있습니다. 설정 방법은 [로그와 RUM 연결]을 참고하세요.

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="RUM 작업 내 브라우저 로그" style="width:100%;" >}}

## RUM 및 트레이스 상호 연결

[RUM과 트레이스를 연결][2]하여 프런트엔드 보기에서 수집한 데이터와 백엔드의 트레이스 및 스팬을 상호 연관시킵니다. 이를 통해 스택의 어느 위치에서든 문제를 정확히 찾아내고 사용자 경험을 이해할 수 있습니다. 자세한 정보는 [RUM과 트레이스 연결][2]을 참고하세요.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM 및 트레이스" style="width:100%;">}}


## RUM과 신서틱 테스트 상호 연결

관련 RUM 이벤트 데이터를 조사해 신서틱 테스트의 데이터를 근본 원인까지 추적할 수 있습니다. [신서틱과 RUM을 연결][3]하여 신서틱 테스트를 더욱 면밀히 가시화하여 살펴볼 수 있습니다.

{{< img src="synthetics/guide/rum_in_synthetics/sessions_details_panel.png" alt="세션 세부 정보 사이드 패널" style="width:100%;" >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/correlate_with_other_telemetry/logs/
[2]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /ko/synthetics/guide/explore-rum-through-synthetics/