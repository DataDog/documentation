---
aliases:
- /ko/real_user_monitoring/ai_investigations/single_view_ai_investigation/
description: Bits Chat에 특정 조회가 느린 이유를 질문하고, RUM 차트를 분석하고, 자연어로 RUM 작업을 수행하세요.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: 설명서
  text: RUM에서 Bits 사용
- link: /bits_ai/bits_chat/
  tag: 설명서
  text: Bits Chat
- link: /real_user_monitoring/explorer/events/
  tag: 설명서
  text: 이벤트 사이드 패널 보기
title: RUM에서 Bits Chat을 사용하세요.
---
## 개요 {#overview}

[Bits Chat][1]은 모든 RUM 페이지에서 사용할 수 있습니다. Bits Chat은 현재 페이지와 조회 중인 내용을 컨텍스트로 활용하며, 트레이스, 로그 및 프로필과 함께 RUM 데이터를 쿼리할 수 있습니다. 다음 용도로 사용하세요.

- [특정 조회가 느린 이유 확인](#find-out-why-a-view-is-slow)
- [차트 분석](#analyze-a-chart)
- [질문하고 작업 완료](#ask-questions-and-complete-tasks)

## 조회가 느린 이유 확인{#find-out-why-a-view-is-slow}

1. [RUM 탐색기[2] 또는 [Session Replay[3]에서 조회를 엽니다.
2. 조회 사이드 패널의 성능 섹션에서 **Ask Bits**를 클릭합니다.

Bits Chat이 열리고 해당 페이지의 로딩 과정을 조사합니다. [리소스][4], [긴 작업][5], [오류][6] 및 [사용자 작업][7]을 기반으로 해당 조회의 로딩 타임라인을 재구성하고, 근본 원인을 파악하기 위해 네 가지 소스를 검사합니다.

| 소스 | Bits가 검사하는 항목 |
|---|---|
| 앱 성능 | 메인 스레드 경합, 코드 실행 및 렌더링 지연과 같은 클라이언트 측 문제 |
| 제3자 | 애플리케이션에 의해 로드된 제3자 스크립트 및 라이브러리가 미치는 영향. |
| 서버 측 | [연관된 APM 트레이스][8]를 사용하여 조회에 영향을 미친 백엔드 지연 및 서버 측 오류 |
| 환경 | 사용자의 장치 및 네트워크 상태 |

Bits는 관련 이벤트로 연결되는 링크와 함께 우선순위가 지정된 발견 결과를 반환합니다. 그런 다음 "이 페이지에서 다른 사용자에게도 같은 문제가 발생하나요?" 또는 "여기서 가장 느린 백엔드 엔드포인트는 무엇인가요?"와 같은 후속 질문을 할 수 있습니다.

{{< img src="real_user_monitoring/bits_ai/ask-bits-view.png" alt="Ask Bits를 클릭한 후 Bits Chat이 열린 조회 사이드 패널에 느린 페이지 로딩에 대한 순위가 매겨진 발견 결과가 표시된 모습" style="width:100%;" >}}

## 차트 분석 {#analyze-a-chart}

RUM 요약 페이지에서 중요한 차트 또는 오류율 차트의 **Bits AI로 분석**을 클릭합니다. Bits Chat은 메트릭의 추세와 그 원인을 요약합니다.

{{< img src="real_user_monitoring/bits_ai/analyze-with-bits-chart.png" alt="검사 모드로 열린 RUM 로딩 시간 차트에서 Bits Chat이 지난 한 달간의 메트릭 추세를 요약하는 모습" style="width:100%;" >}}

## 질문하고 작업 완료 {#ask-questions-and-complete-tasks}

모든 RUM 페이지에서 자연어로 Bits Chat에 프런트엔드에 대해 질문하고, RUM 작업을 대신 수행하도록 요청할 수 있습니다. 예시는 다음과 같습니다.

- "현재 이 애플리케이션에서 INP가 가장 좋지 않은 페이지는 무엇이며, 어떤 상호작용이 원인인가요?"
- "지난 1시간 동안 결제 페이지에서 5xx 오류가 발생한 세션을 찾아 오류 유형별로 그룹화해 주세요." RUM 탐색기에서 Bits가 쿼리를 적용합니다.
- "어떤 함수가 LCP를 느리게 만들고 있나요?" RUM Profiling 페이지에서 이를 질문하세요.
- "오류가 발생한 세션의 25%를 보존하는 보존 필터를 생성해 주세요."
-"장바구니 페이지에서 주문 확인 페이지까지의 결제 과정을 추적하는 작업을 생성해 주세요."

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/
[2]: /ko/real_user_monitoring/explorer/
[3]: /ko/session_replay/
[4]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[6]: /ko/real_user_monitoring/error_tracking/
[7]: /ko/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[8]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/