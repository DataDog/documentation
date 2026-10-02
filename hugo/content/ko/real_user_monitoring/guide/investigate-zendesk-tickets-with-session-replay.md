---
description: Session Replay를 Zendesk와 통합하여, 지원 팀이 티켓에서 직접 Session Replay를 확인하며 사용자
  문제를 해결할 수 있도록 지원하세요.
title: Session Replay로 Zendesk 티켓 조사하기
---
## 개요 {#overview}

Zendesk 티켓에서 사용자가 보고한 문제를 해결할 때 엔지니어는 문제가 발생한 컨텍스트를 이해하는 데 어려움을 겪는 경우가 많습니다. Zendesk와 Session Replay 통합을 통해 지원 팀은 클릭 한 번으로 Zendesk 티켓에서 사용자의 컨텍스트를 즉시 재현할 수 있습니다. 이를 통해 지원 팀은 더 효율적으로 문제를 해결하고 고객에게 솔루션을 제공하는 데 걸리는 시간을 단축할 수 있습니다.

이 통합으로 지원 엔지니어는 다음 작업을 할 수 있습니다.
- 사용자 작업의 [Session Replay][3] 확인하기
- 관련 백엔드 호출 검사하기
- 관련 Session Replay를 하나의 재생 목록으로 정리하기


## 설정 {#setup}

Zendesk 통합을 설정하려면 [Datadog RUM용 Zendesk Marketplace 페이지][2]의 **설치 방법** 섹션을 완료하세요.

## Zendesk에서 Session Replay 살펴보기 {#explore-a-session-replay-from-zendesk}

다음에 따라 Zendesk 티켓과 연관된 Session Replay를 확인합니다.

1. Zendesk에서 티켓으로 이동합니다.
2. 오른쪽 사이드바에서 Datadog 아이콘을 클릭하여 Session Replay 목록을 확인합니다.
3. Session Replay를 클릭하여 Datadog에서 확인합니다.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Zendesk에서 Session Replay 액세스하기" video=true >}}

Session Replay 페이지에서는 각 작업과 관련된 백엔드 호출과 함께 사용자 작업 목록을 볼 수 있습니다. 이벤트에 마우스를 올린 후, {{< ui >}}Details{{< /ui >}}를 클릭하여 관련 트레이스, 오류 등을 확인하세요.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="Details 버튼이 강조 표시된 Session Replay 이벤트의 마우스 오버 화면" style="width:60%;" >}}

또한 Session Replay를 재생 목록에 추가하여 관련 문제를 그룹화하면 더 쉽게 탐색하고 공유할 수 있습니다. 자세한 내용은 [Session Replay 재생 목록 설명서][4]를 참조하세요.

[1]: /ko/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /ko/session_replay/
[4]: /ko/session_replay/playlists