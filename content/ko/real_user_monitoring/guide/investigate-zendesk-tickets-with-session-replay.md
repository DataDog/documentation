---
title: 세션 리플레이로 Zendesk 티켓 조사하기
---

## 개요

Zendesk 티켓에서 사용자가 보고한 문제를 트러블슈팅할 때, 엔지니어는 종종 문제가 발생한 컨텍스트를 이해하는 데 어려움을 겪습니다. Zendesk 및 세션 리플레이 통합을 활용하면, 지원 팀은 클릭 한 번으로 Zendesk 티켓에서 사용자의 컨텍스트를 즉시 재현할 수 있습니다. 이를 통해 지원 팀은 더욱 효율적으로 문제를 해결하고 고객에게 솔루션을 제공하는 데 소요되는 시간을 단축할 수 있습니다.

이 통합으로 지원 엔지니어는 다음 작업을 할 수 있습니다.
- 사용자 작업의 [세션 리플레이][3] 확인
- 관련 백엔드 호출 검사하기
- 관련 세션 리플레이를 하나의 재생 목록으로 정리하기


## 설정

Zendesk 통합을 설정하려면 [Datadog RUM용 Zendesk Marketplace 페이지][2]의 **설치 방법** 섹션을 완료하세요.

## Zendesk에서 세션 리플레이 살펴보기

다음에 따라 Zendesk 티켓과 연관된 세션 리플레이를 확인합니다.

1. Zendesk에서 티켓으로 이동합니다.
2. 오른쪽 사이드바에서 Datadog 아이콘을 클릭하면 세션 리플레이 목록을 확인합니다.
3. 세션 리플레이를 클릭하여 Datadog에서 확인합니다.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Zendesk에서 세선 리플레이 액세스하기" video=true >}}

세션 리플레이 페이지에서 사용자 작업 목록을 각 작업과 관련된 백엔드 호출과 함께 확인할 수 있습니다. 이벤트 위로 마우스를 올려 **Details**를 클릭하면 관련 트레이스, 오류 등을 볼 수 있습니다.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="'Details' 버튼이 강조 표시된, 세션 리플레이 이벤트에 마우스를 올리면 보이는 뷰" style="width:60%;" >}}

또한, 재생 목록에 세션 리플레이를 추가해 관련 이슈를 그룹화하여 쉽게 검색 및 공유할 수 있습니다. 자세한 내용은 [세션 리플레이 재생 목록 문서][4]를 참조하세요.

[1]: /ko/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /ko/real_user_monitoring/session_replay/browser/
[4]: /ko/real_user_monitoring/session_replay/playlists