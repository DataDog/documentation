---
description: 솔루션 또는 지원 조직에서 RUM 및 Session Replay를 도입하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/correlate_with_other_telemetry/apm/
  tag: 설명서
  text: RUM을 APM 트레이스와 연결하는 방법을 알아보세요.
- link: /session_replay/
  tag: 설명서
  text: Session Replay에 대해 알아보기
- link: /session_replay/dev_tools
  tag: 설명서
  text: Browser Dev Tools에 대해 알아보세요.
title: 기술 지원 워크플로에서 Session Replay 사용
---
## 개요 {#overview}

[Session Replay][1]를 사용하여 기술 솔루션 및 지원 팀이 고객 문제를 더 효과적으로 해결하도록 지원할 수 있습니다. RUM 및 Session Replay를 사용하면 특정 사용자 세션을 찾고, 사용자 여정을 관찰하며, 개발자 도구에 액세스하여 이벤트, 로그, 오류 및 속성을 확인할 수 있습니다. 

이 가이드는 조직에서 복제할 수 있고, 솔루션 팀이 워크플로에 통합하여 자산으로 활용할 수 있는 워크플로를 설명합니다.

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Shopist 애플리케이션의 사용자 세션에 대한 Session Replay 녹화" style="width:100%;">}}

## 사용자 문제 평가 {#assess-user-issues}

고객이 Datadog을 사용하다가 문제가 발생한다고 가정합니다. 기술 솔루션 팀은 고객이 Synthetics 다단계 API 테스트를 업데이트하거나 저장할 수 없다고 보고할 때 티켓을 생성하는 Zendesk 또는 ServiceNow와 같은 지원 솔루션을 사용할 수 있습니다. 

팀은 고객에게 추가 정보(특정 테스트 ID 및 [Browser Dev Tools][2]가 열려 있는 화면 녹화 등)를 요청하여 고객의 테스트가 업데이트되거나 저장되지 않는 문제에 대한 추가적인 맥락을 파악할 수 있습니다. 콘솔 오류가 기록되지 않았다면 팀은 다단계 API 테스트 문제를 조사하기 위한 단서를 얻을 수 없습니다. 

기술 솔루션 팀은 다음 질문에 대한 답을 파악하고자 할 수 있습니다.

- 고객이 겪고 있는 정확한 오류는 무엇입니까?
- 고객이 특정 문제(콘솔 오류나 오류 메시지 등)를 암시하는 인앱 알림을 보고 있습니까?
- 고객이 어떤 버튼을 어떤 순서로 클릭했습니까? 고객이 버튼을 클릭하기 전에 예상치 못한 동작이 발생했습니까?

## 근본 원인 조사 {#investigate-the-root-cause}

Datadog에서 고객의 사용자 여정을 조회하고 관련 백엔드 요청을 확인할 수 있는 방법이 있다면, 기술 솔루션 팀은 무엇이 이 문제를 일으키는지 더 잘 이해할 수 있을 것입니다.

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="RUM 뷰 액션과 관련된 APM 스택 트레이스" style="width:100%;">}}

APM 통합을 사용하면 웹 애플리케이션의 요청을 해당 백엔드 트레이스와 연결하여 RUM 이벤트에서 APM 트레이스 데이터에 액세스하고 {{< ui >}}Errors{{< /ui >}} 탭에서 백엔드 오류를 찾아낼 수 있습니다. 

자세한 내용은 [RUM과 트레이스 연결][3]을 참조하세요.

## Session Replay에서 사용자 세션 조회 {#watch-user-sessions-in-session-replay}

기술 솔루션 팀은 Zendesk와 같은 지원 플랫폼을 RUM 및 Session Replay와 같은 Datadog 제품과 연결하는 내부 도구를 보유하고 있을 수 있습니다. 예를 들어, Zendesk의 컨텍스트 링크를 사용하면 [RUM 탐색기][4]로 이동하고 검색 쿼리에 사용자 ID를 자동으로 입력할 수 있습니다. 이벤트 목록에서 개별 사용자 세션을 필터링하세요.

기술 솔루션 팀은 Session Replay를 사용하여 Datadog에서 사용자 여정의 복제본을 조회하고, Browser Dev Tools를 사용하여 프런트엔드에 나타날 수 있는 추가 오류에 액세스할 수 있습니다. 프런트엔드 오류 및 백엔드 트레이스에 액세스할 수 있는 기술 솔루션 팀은 RUM 및 Session Replay와 APM 통합을 사용하여 고객 문제를 해결할 수 있습니다.

Session Replay 녹화가 포함된 사용자 세션을 클릭하여 Datadog 플랫폼에서 사용자의 행동을 관찰하세요. Session Replay를 사용하여 해당 RUM 이벤트를 찾고 다단계 API 테스트를 저장하는 특정 `click` 액션을 식별할 수 있습니다. UI에서 {{< ui >}}Save{{< /ui >}}를 클릭하면 테스트의 구성을 저장하기 위한 백엔드 호출이 트리거됩니다.

## 백엔드 트레이스에서 오류 발견 {#uncover-errors-in-backend-traces}

다단계 API 테스트의 APM 트레이스에서 오류를 검사하는 동안 기술 솔루션 팀은 `​​https://properties.steps.items.properties.name/` 구성의 `maxLength`와 관련된 `APIInvalidInputError`를 발견할 수 있으며, 이는 테스트 저장 실패의 근본 원인으로 보입니다. 

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="RUM 뷰 액션과 관련된 APM 스택 트레이스" style="width:100%;">}}

다단계 API 테스트가 단계 이름의 글자 수 제한으로 인해 저장되지 않았습니다. 

## 사용자 문제 해결 {#resolve-user-problems}

이 고객 문제를 해결하기 위해 기술 솔루션 팀은 제품 팀에 테스트를 저장할 수 없을 때 상황에 맞는 도움말을 제공하도록 다단계 API 테스트 워크플로를 업데이트해 달라고 요청할 수 있습니다. 

프런트엔드 팀은 또한 사용자가 테스트 단계 이름의 최대 글자 수 제한을 초과할 때 알림을 받을 수 있도록 UI에 오류 메시지를 구현하도록 권장될 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/session_replay/
[2]: /ko/session_replay/dev_tools
[3]: /ko/real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer